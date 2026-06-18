/* ArchCanvas server — serves the built React app and proxies LLM requests.
 * Keys never reach the browser: precedence is user-pasted key (per request)
 * over the Heroku config var for that provider. */
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json({ limit: "200kb" }));

const PORT = process.env.PORT || 3000;

const PROVIDERS = {
  anthropic: {
    envKey: "ANTHROPIC_API_KEY",
    model: process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6",
    call: async (key, model, prompt) => {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": key,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model,
          max_tokens: 1500,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error?.message || `Anthropic error ${r.status}`);
      return (d.content || []).map(b => b.text || "").join("\n");
    },
  },
  openai: {
    envKey: "OPENAI_API_KEY",
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    call: async (key, model, prompt) => {
      const r = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model,
          max_tokens: 1500,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error?.message || `OpenAI error ${r.status}`);
      return d.choices?.[0]?.message?.content || "";
    },
  },
  gemini: {
    envKey: "GOOGLE_API_KEY",
    model: process.env.GEMINI_MODEL || "gemini-2.0-flash",
    call: async (key, model, prompt) => {
      const r = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        }
      );
      const d = await r.json();
      if (!r.ok) throw new Error(d.error?.message || `Gemini error ${r.status}`);
      return (d.candidates?.[0]?.content?.parts || []).map(p => p.text || "").join("\n");
    },
  },
};

/* very small in-memory rate limit: 30 generations / 10 min / IP */
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const windowStart = now - 10 * 60 * 1000;
  const list = (hits.get(ip) || []).filter(t => t > windowStart);
  list.push(now);
  hits.set(ip, list);
  return list.length > 30;
}

app.post("/api/generate", async (req, res) => {
  try {
    const { provider, apiKey, prompt } = req.body || {};
    const p = PROVIDERS[provider];
    if (!p) return res.status(400).json({ error: "Unknown provider." });
    if (!prompt || typeof prompt !== "string" || prompt.length > 8000)
      return res.status(400).json({ error: "Invalid prompt." });
    if (rateLimited(req.ip))
      return res.status(429).json({ error: "Too many requests — try again in a few minutes." });

    const key = (apiKey && String(apiKey).trim()) || process.env[p.envKey];
    if (!key)
      return res.status(400).json({
        error: `No API key available for this provider. Paste a key in the panel, or set ${p.envKey} on the server.`,
      });

    const text = await p.call(key, p.model, prompt);
    res.json({ text });
  } catch (err) {
    console.error("generate failed:", err.message);
    res.status(502).json({ error: err.message || "Upstream model request failed." });
  }
});

app.get("/api/health", (_req, res) => res.json({ ok: true }));

/* static frontend */
const dist = path.join(__dirname, "dist");
app.use(express.static(dist));
app.get("*", (_req, res) => res.sendFile(path.join(dist, "index.html")));

app.listen(PORT, () => console.log(`ArchCanvas running on :${PORT}`));
