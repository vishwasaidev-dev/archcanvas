import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Database, Box, Zap, Code2, Plug, Globe, HardDrive, User, Radio, Frame,
  Trash2, Undo2, Upload, Sparkles, ZoomIn, ZoomOut, Maximize,
  MousePointer2, Spline, X, Loader2, FileJson, Image as ImageIcon,
  LayoutTemplate, ArrowUpToLine, ArrowDownToLine, ChevronDown
} from "lucide-react";

/* ---- Brand icon SVG components (inline, no external dependency) ---- */
const BrandSalesforce = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path d="M20 8c2.8-3 6.7-4.8 11-4.8 5.8 0 10.8 3.2 13.5 8 2-.8 4.2-1.2 6.5-1.2 8.3 0 15 6.7 15 15s-6.7 15-15 15c-1 0-2-.1-3-.3C46 43.5 42 46 37.5 46c-2 0-3.9-.5-5.5-1.4C29.8 47.3 26.6 49 23 49c-4.8 0-9-2.7-11.2-6.6C10.6 42.8 9.3 43 8 43 3.6 43 0 39.4 0 35c0-2.8 1.4-5.3 3.5-6.8C2.5 26.5 2 24.8 2 23c0-5.5 4.5-10 10-10 .9 0 1.8.1 2.7.4C16.5 10.8 18.1 9.2 20 8z" fill="#00A1E0"/>
    <path d="M14 28l2-5 5 4 5-6 2 4 5-8 2 11H14z" fill="white"/>
  </svg>
);
const BrandMuleSoft = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="22" fill="#00A0DF"/>
    <text x="24" y="30" textAnchor="middle" fontSize="18" fontWeight="bold" fill="white" fontFamily="Arial">M</text>
  </svg>
);
const BrandHeroku = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="10" fill="#430098"/>
    <path d="M12 40V8h6v14l10-14h8L24 22l12 18h-8L18 26v14h-6z" fill="white"/>
  </svg>
);
const BrandSlack = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path d="M18 6a4 4 0 00-4 4v4H6a4 4 0 000 8h4v4H6a4 4 0 000 8h4v6h8V30h4v10h8V30h4a4 4 0 000-8h-4v-4h4a4 4 0 000-8h-4V6h-8v10h-4V6h-8zm0 18h4v4h-4v-4zm12 0h4v4h-4v-4z" fill="#E01E5A"/>
    <path d="M30 6a4 4 0 014 4v4h6a4 4 0 010 8h-4v4h4a4 4 0 010 8h-4v6h-8V30h-4v10H12V24a4 4 0 014-4h4v-4h-4a4 4 0 010-8h4V6h8z" fill="#36C5F0" opacity="0.7"/>
  </svg>
);
const BrandSnowflake = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="22" fill="#29B5E8"/>
    <path d="M24 6v36M12 15l24 18M36 15L12 33" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
    <circle cx="24" cy="6" r="3" fill="white"/>
    <circle cx="24" cy="42" r="3" fill="white"/>
    <circle cx="6" cy="15" r="3" fill="white"/>
    <circle cx="42" cy="15" r="3" fill="white"/>
    <circle cx="6" cy="33" r="3" fill="white"/>
    <circle cx="42" cy="33" r="3" fill="white"/>
  </svg>
);
const BrandAWS = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="8" fill="#232F3E"/>
    <path d="M14 28c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V20c0-1.1-.9-2-2-2H16c-1.1 0-2 .9-2 2v8z" fill="#FF9900"/>
    <path d="M8 34l4-4h24l4 4H8z" fill="#FF9900"/>
    <text x="24" y="27" textAnchor="middle" fontSize="9" fontWeight="bold" fill="white" fontFamily="Arial">AWS</text>
  </svg>
);
const BrandSAP = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="8" fill="#003366"/>
    <text x="24" y="30" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white" fontFamily="Arial">SAP</text>
  </svg>
);
const BrandDataCloud = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="22" fill="#0176D3"/>
    <path d="M12 28a8 8 0 018-8h8a8 8 0 110 16H20a8 8 0 01-8-8z" fill="white" opacity="0.9"/>
    <circle cx="24" cy="20" r="5" fill="white"/>
    <path d="M19 32l5-8 5 8" stroke="#0176D3" strokeWidth="2" fill="none"/>
  </svg>
);

/* ================================================================== */
/*  ArchCanvas v2 — follows the Salesforce Diagrams "kit of parts":   */
/*  Header (title + description + key), Cards (icon / title /         */
/*  attributes / footer), Containers, elbow Connectors with Pills.    */
/* ================================================================== */

const T = {
  bgApp: "#0D1320", panel: "#161F32", panelBorder: "#26334E",
  ink: "#E8EEF9", inkDim: "#8DA0BF", inkFaint: "#5A6B88",
  accent: "#4CA6F8", accentDeep: "#0176D3", danger: "#F87171",
  // light "paper" canvas — official diagrams are light, WCAG-friendly
  paper: "#EFF4FB", paperDot: "#BCC9DD",
  cardBg: "#FFFFFF", cardBorder: "#C3D0E2", cardInk: "#16243B",
  cardInkDim: "#5A6B88", edge: "#64748B",
  fontBody: "'IBM Plex Sans', -apple-system, 'Segoe UI', sans-serif",
  fontMono: "'IBM Plex Mono', ui-monospace, 'SF Mono', monospace",
};

const NODE_TYPES = {
  standardObject: { label: "Standard Object",   color: "#0B7DD7", Icon: Database },
  customObject:   { label: "Custom Object",     color: "#0E9F6E", Icon: Box },
  automation:     { label: "Flow / Automation", color: "#D9590B", Icon: Zap },
  apex:           { label: "Apex / Code",       color: "#7C3AED", Icon: Code2 },
  integration:    { label: "Integration / API", color: "#B45309", Icon: Plug },
  external:       { label: "External System",   color: "#475569", Icon: Globe },
  dataStore:      { label: "Data Store",        color: "#0D9488", Icon: HardDrive },
  persona:        { label: "User / Persona",    color: "#DB2777", Icon: User },
  platformEvent:  { label: "Platform Event",    color: "#C026D3", Icon: Radio },
  zone:           { label: "Zone / Container",  color: "#64748B", Icon: Frame },
  // ── Brand nodes ──────────────────────────────────────────────────
  salesforce:     { label: "Salesforce",        color: "#00A1E0", Icon: BrandSalesforce },
  mulesoft:       { label: "MuleSoft",          color: "#00A0DF", Icon: BrandMuleSoft },
  heroku:         { label: "Heroku",            color: "#6762A6", Icon: BrandHeroku },
  slack:          { label: "Slack",             color: "#E01E5A", Icon: BrandSlack },
  snowflake:      { label: "Snowflake",         color: "#29B5E8", Icon: BrandSnowflake },
  aws:            { label: "AWS",               color: "#FF9900", Icon: BrandAWS },
  sap:            { label: "SAP",               color: "#003366", Icon: BrandSAP },
  dataCloud:      { label: "Data Cloud",        color: "#0176D3", Icon: BrandDataCloud },
};
const TYPE_KEYS = Object.keys(NODE_TYPES);
const AI_TYPES = TYPE_KEYS.filter(k => k !== "zone");

const DEF = { w: 200, h: 72 };
const DEF_ZONE = { w: 430, h: 260 };
const MIN = { w: 150, h: 56 };
const MIN_ZONE = { w: 220, h: 130 };

let _id = 500;
const nid = (p = "n") => `${p}${++_id}`;
const isZone = n => n.type === "zone";
const cx2 = n => n.x + n.w, cy2 = n => n.y + n.h;

/* ---------------- connection side helpers -------------------------- */
function sidePoint(n, side) {
  switch (side) {
    case "left":   return { x: n.x,           y: n.y + n.h / 2 };
    case "top":    return { x: n.x + n.w / 2, y: n.y };
    case "bottom": return { x: n.x + n.w / 2, y: n.y + n.h };
    default:       return { x: n.x + n.w,     y: n.y + n.h / 2 }; // right
  }
}
function nearestSide(n, px, py) {
  return ["right","left","top","bottom"].reduce((best, s) => {
    const sp = sidePoint(n, s), bsp = sidePoint(n, best);
    return Math.hypot(px-sp.x,py-sp.y) < Math.hypot(px-bsp.x,py-bsp.y) ? s : best;
  }, "left");
}

/* ---------------- elbow connector routing -------------------------- */
// S = stub length: connector always exits/enters perpendicular to its handle before routing.
// Handles all 16 fromSide×toSide combos without running along node edges.
const S = 36;
function elbow(a, b, fromSide = "right", toSide = "left") {
  const { x: x1, y: y1 } = sidePoint(a, fromSide);
  const { x: x2, y: y2 } = sidePoint(b, toSide);
  // Exit stub: leave source perpendicularly
  const ex = fromSide === "right" ? x1 + S : fromSide === "left" ? x1 - S : x1;
  const ey = fromSide === "bottom" ? y1 + S : fromSide === "top" ? y1 - S : y1;
  // Entry stub: approach target perpendicularly from outside
  const nx = toSide === "right" ? x2 + S : toSide === "left" ? x2 - S : x2;
  const ny = toSide === "bottom" ? y2 + S : toSide === "top" ? y2 - S : y2;
  // Single corner: horizontal exit bends at (nx, ey); vertical exit bends at (ex, ny)
  const horiz = fromSide === "right" || fromSide === "left";
  const cx = horiz ? nx : ex;
  const cy = horiz ? ey : ny;
  return {
    d: `M ${x1},${y1} L ${ex},${ey} L ${cx},${cy} L ${nx},${ny} L ${x2},${y2}`,
    mx: (ex + nx) / 2, my: (ey + ny) / 2,
  };
}

/* ---------------- layered auto-layout ----------------------------- */
function autoLayout(nodes, edges) {
  const depth = {}, incoming = {};
  nodes.forEach(n => { incoming[n.id] = 0; });
  edges.forEach(e => { if (incoming[e.to] !== undefined) incoming[e.to]++; });
  const q = nodes.filter(n => incoming[n.id] === 0).map(n => n.id);
  q.forEach(id => { depth[id] = 0; });
  let guard = 0;
  const queue = [...q];
  while (queue.length && guard++ < 5000) {
    const cur = queue.shift();
    edges.filter(e => e.from === cur).forEach(e => {
      const d = (depth[cur] ?? 0) + 1;
      if ((depth[e.to] ?? -1) < d) { depth[e.to] = d; queue.push(e.to); }
    });
  }
  nodes.forEach(n => { if (depth[n.id] === undefined) depth[n.id] = 0; });
  const cols = {};
  nodes.forEach(n => { (cols[depth[n.id]] = cols[depth[n.id]] || []).push(n); });
  const out = nodes.map(n => ({ ...n }));
  Object.entries(cols).forEach(([d, list]) => list.forEach((n, i) => {
    const t = out.find(o => o.id === n.id);
    t.x = 60 + Number(d) * 290; t.y = 60 + i * 120;
  }));
  return out;
}

/* ---------------- templates --------------------------------------- */
const mk = (id, type, label, x, y, extra = {}) => ({
  id, type, label, x, y,
  w: extra.w ?? (type === "zone" ? DEF_ZONE.w : DEF.w),
  h: extra.h ?? (type === "zone" ? DEF_ZONE.h : DEF.h),
  attrs: extra.attrs || [], footer: extra.footer || "", fill: extra.fill ?? false,
});
const me = (from, to, label = "", style = "solid") => ({ id: nid("e"), from, to, label, style });

const TEMPLATES = [
  {
    name: "Lead to Cash",
    desc: "Solution architecture from lead capture through CPQ and ERP billing.",
    header: { title: "Lead-to-Cash Solution Architecture", desc: "How leads are captured, scored, converted and priced, and how orders reach the ERP. Audience: sales ops & integration team." },
    build: () => {
      const z1 = mk("z1", "zone", "Salesforce Sales Cloud", 320, 60, { w: 580, h: 360 });
      const n = [
        z1,
        mk("p1", "persona", "Sales Rep", 50, 150, { footer: "Profile: Sales User" }),
        mk("i1", "integration", "Web-to-Lead", 50, 300, { footer: "POST /servlet/WebToLead" }),
        mk("o1", "standardObject", "Lead", 370, 130, { attrs: ["Status", "LeadSource", "Score__c"], h: 96, footer: "Lead" }),
        mk("a1", "automation", "Lead Scoring Flow", 650, 130, { footer: "Record-Triggered" }),
        mk("o2", "standardObject", "Opportunity", 370, 290, { footer: "Opportunity" }),
        mk("x1", "apex", "CPQ Pricing Service", 650, 290, { footer: "QuoteService.cls" }),
        mk("e1", "external", "ERP (SAP)", 990, 220, { footer: "Order & invoice system" }),
      ];
      const e = [
        me("p1", "o1", "creates"), me("i1", "o1", "creates"),
        me("o1", "a1", "triggers"), me("a1", "o2", "converts"),
        me("o2", "x1", "prices"), me("x1", "e1", "REST callout", "dashed"),
      ];
      return { nodes: n, edges: e };
    },
  },
  {
    name: "Service Case Management",
    desc: "Case intake from a portal, routing, knowledge and Slack escalation.",
    header: { title: "Service Cloud — Case Management", desc: "Case lifecycle from customer portal submission through omni-channel routing, knowledge lookup and escalation. Dashed lines are async/events." },
    build: () => {
      const n = [
        mk("z1", "zone", "Service Cloud", 330, 50, { w: 590, h: 380 }),
        mk("p1", "persona", "Customer", 50, 220, { footer: "Experience Cloud user" }),
        mk("i1", "integration", "Experience Cloud Site", 50, 360, { footer: "help.acme.com" }),
        mk("o1", "standardObject", "Case", 380, 110, { attrs: ["Origin", "Priority", "SLA__c"], h: 96, footer: "Case" }),
        mk("a1", "automation", "Omni-Channel Routing", 670, 110, { footer: "Queue-based" }),
        mk("d1", "dataStore", "Knowledge Base", 380, 300, { footer: "Knowledge__kav" }),
        mk("v1", "platformEvent", "Case Escalation Event", 670, 300, { footer: "Case_Escalated__e" }),
        mk("e1", "external", "Slack #support", 1000, 300, { footer: "Workflow webhook" }),
      ];
      const e = [
        me("p1", "o1", "submits"), me("i1", "o1", "creates"),
        me("o1", "a1", "routes"), me("a1", "d1", "suggests"),
        me("o1", "v1", "publishes", "dashed"), me("v1", "e1", "notifies", "dashed"),
      ];
      return { nodes: n, edges: e };
    },
  },
  {
    name: "Integration Landscape",
    desc: "Three-zone system landscape: org, middleware, enterprise systems.",
    header: { title: "Enterprise Integration Landscape", desc: "Systems of record and how they connect through middleware. Solid = synchronous API, dashed = async/event-driven." },
    build: () => {
      const n = [
        mk("z1", "zone", "Salesforce Org", 40, 60, { w: 330, h: 360 }),
        mk("z2", "zone", "Middleware", 450, 60, { w: 300, h: 360 }),
        mk("z3", "zone", "Enterprise Systems", 830, 60, { w: 330, h: 360 }),
        mk("o1", "standardObject", "Account", 90, 120, { footer: "Account" }),
        mk("o2", "customObject", "Subscription__c", 90, 230, { footer: "Subscription__c" }),
        mk("v1", "platformEvent", "Sync Events", 90, 340, { footer: "Account_Sync__e" }),
        mk("m1", "mulesoft", "MuleSoft Anypoint", 500, 170, { attrs: ["Account API", "Billing API"], h: 96, footer: "Anypoint Platform" }),
        mk("e1", "sap", "SAP ERP", 880, 120, { footer: "Customer master" }),
        mk("e2", "external", "Billing System", 880, 240, { footer: "Zuora" }),
        mk("d1", "snowflake", "Snowflake DW", 880, 350, { footer: "Data Warehouse" }),
      ];
      const e = [
        me("o1", "m1", "sync"), me("o2", "m1", "sync"),
        me("v1", "m1", "events", "dashed"),
        me("m1", "e1", "upsert"), me("m1", "e2", "invoice"),
        me("m1", "d1", "stream", "dashed"),
      ];
      return { nodes: n, edges: e };
    },
  },
  {
    name: "Heroku + Salesforce App",
    desc: "Heroku app connected to Salesforce via External Objects and REST API.",
    header: { title: "Heroku + Salesforce Connected Architecture", desc: "Customer-facing Heroku web app reading and writing Salesforce data via Heroku Connect and REST API. Dashed = async/event." },
    build: () => {
      const n = [
        mk("z1", "zone", "Heroku", 40, 50, { w: 390, h: 320 }),
        mk("z2", "zone", "Salesforce", 520, 50, { w: 400, h: 320 }),
        mk("p1", "persona", "Customer", 40, 230, { footer: "End user" }),
        mk("h1", "heroku", "Heroku Web App", 90, 110, { attrs: ["Node.js / Python"], footer: "customer.acme.com" }),
        mk("h2", "heroku", "Heroku Connect", 90, 240, { footer: "Postgres ↔ SF Sync" }),
        mk("h3", "dataStore", "Heroku Postgres", 90, 360, { footer: "heroku-postgres" }),
        mk("s1", "salesforce", "Sales Cloud", 570, 110, { attrs: ["Account", "Contact", "Opportunity"], h: 96, footer: "Salesforce Org" }),
        mk("s2", "automation", "REST Callout Flow", 570, 250, { footer: "Record-Triggered" }),
        mk("s3", "apex", "Apex REST API", 820, 180, { footer: "ExternalAppAPI.cls" }),
      ];
      const e = [
        me("p1", "h1", "uses"),
        me("h1", "s3", "REST", "solid"),
        me("h1", "h2", "sync trigger", "dashed"),
        me("h2", "h3", "read/write"),
        me("h2", "s1", "bidirectional sync"),
        me("s1", "s2", "triggers", "dashed"),
        me("s3", "s1", "query/update"),
      ];
      return { nodes: n, edges: e };
    },
  },
  {
    name: "Slack + Salesforce Notifications",
    desc: "Real-time Slack alerts from Salesforce flows, platform events and Apex.",
    header: { title: "Salesforce → Slack Notification Architecture", desc: "How Salesforce record changes, approvals and escalations surface as Slack messages. Dashed = async/event-driven." },
    build: () => {
      const n = [
        mk("z1", "zone", "Salesforce", 40, 50, { w: 560, h: 360 }),
        mk("z2", "zone", "Slack", 700, 50, { w: 300, h: 360 }),
        mk("o1", "standardObject", "Opportunity", 90, 120, { attrs: ["Stage", "Amount"], footer: "Opportunity" }),
        mk("o2", "standardObject", "Case", 90, 250, { attrs: ["Priority", "Status"], footer: "Case" }),
        mk("a1", "automation", "Stage Change Flow", 340, 120, { footer: "Record-Triggered" }),
        mk("a2", "automation", "Escalation Flow", 340, 250, { footer: "Scheduled / Record" }),
        mk("v1", "platformEvent", "Deal Alert Event", 340, 370, { footer: "Deal_Alert__e" }),
        mk("x1", "apex", "Slack Webhook Apex", 550, 240, { footer: "SlackNotifier.cls" }),
        mk("sl1", "slack", "#deals Channel", 750, 120, { footer: "deal-alerts" }),
        mk("sl2", "slack", "#support Channel", 750, 250, { footer: "support-escalations" }),
        mk("sl3", "slack", "Deal Room Bot", 750, 370, { footer: "DealRoom Automator" }),
      ];
      const e = [
        me("o1", "a1", "stage change", "dashed"),
        me("o2", "a2", "priority = high", "dashed"),
        me("a1", "x1", "callout"),
        me("a2", "x1", "callout"),
        me("a1", "v1", "publishes", "dashed"),
        me("v1", "sl3", "event", "dashed"),
        me("x1", "sl1", "webhook"),
        me("x1", "sl2", "webhook"),
      ];
      return { nodes: n, edges: e };
    },
  },
  {
    name: "Data Cloud Pipeline",
    desc: "Salesforce Data Cloud ingesting, unifying and activating customer data.",
    header: { title: "Salesforce Data Cloud — Ingestion to Activation", desc: "How raw data from CRM, web and data warehouse flows into Data Cloud, gets unified into customer profiles, and activates downstream. Dashed = streaming." },
    build: () => {
      const n = [
        mk("z1", "zone", "Sources", 30, 40, { w: 260, h: 380 }),
        mk("z2", "zone", "Data Cloud", 380, 40, { w: 360, h: 380 }),
        mk("z3", "zone", "Activation", 840, 40, { w: 300, h: 380 }),
        mk("s1", "salesforce", "Sales Cloud", 60, 100, { footer: "CRM data" }),
        mk("s2", "salesforce", "Service Cloud", 60, 210, { footer: "Case & contact" }),
        mk("s3", "snowflake", "Snowflake", 60, 320, { footer: "Behavioural data" }),
        mk("dc1", "dataCloud", "Data Ingestion", 410, 100, { footer: "Batch + streaming" }),
        mk("dc2", "dataCloud", "Identity Resolution", 410, 220, { attrs: ["Match rules", "Merge policies"], h: 96, footer: "Unified Profile" }),
        mk("dc3", "dataCloud", "Calculated Insights", 410, 360, { footer: "Segment scoring" }),
        mk("a1", "automation", "Segment Activation", 860, 120, { footer: "Flow / Activation" }),
        mk("e1", "external", "Marketing Cloud", 860, 240, { footer: "Journey Builder" }),
        mk("e2", "slack", "Slack Alerts", 860, 360, { footer: "Rep notifications" }),
      ];
      const e = [
        me("s1", "dc1", "CRM connector"),
        me("s2", "dc1", "CRM connector"),
        me("s3", "dc1", "Data stream", "dashed"),
        me("dc1", "dc2", "unify"),
        me("dc2", "dc3", "score"),
        me("dc2", "a1", "segment", "dashed"),
        me("dc3", "a1", "insights", "dashed"),
        me("a1", "e1", "activate"),
        me("a1", "e2", "notify", "dashed"),
      ];
      return { nodes: n, edges: e };
    },
  },
  {
    name: "MuleSoft API Hub",
    desc: "MuleSoft Anypoint connecting Salesforce, SAP, AWS and partner systems.",
    header: { title: "MuleSoft API-Led Connectivity", desc: "Three-tier API-led architecture: Experience, Process, and System APIs. Salesforce is the system of engagement, SAP and AWS are systems of record." },
    build: () => {
      const n = [
        mk("z1", "zone", "Experience APIs", 30, 40, { w: 230, h: 380 }),
        mk("z2", "zone", "Process APIs", 360, 40, { w: 230, h: 380 }),
        mk("z3", "zone", "System APIs", 700, 40, { w: 280, h: 380 }),
        mk("p1", "persona", "Mobile App", 50, 110, { footer: "iOS / Android" }),
        mk("p2", "persona", "Partner Portal", 50, 240, { footer: "B2B portal" }),
        mk("p3", "salesforce", "Salesforce UI", 50, 350, { footer: "Lightning App" }),
        mk("m1", "mulesoft", "Customer Exp. API", 390, 110, { footer: "customer-exp-api" }),
        mk("m2", "mulesoft", "Order Process API", 390, 240, { footer: "order-process-api" }),
        mk("m3", "mulesoft", "Inventory API", 390, 360, { footer: "inventory-api" }),
        mk("e1", "salesforce", "Salesforce CRM", 730, 110, { footer: "Account / Order" }),
        mk("e2", "sap", "SAP S/4HANA", 730, 240, { footer: "ERP / Inventory" }),
        mk("e3", "aws", "AWS S3 / Lambda", 730, 360, { footer: "File storage / compute" }),
      ];
      const e = [
        me("p1", "m1", "REST"), me("p2", "m1", "REST"),
        me("p3", "m2", "REST"),
        me("m1", "e1", "System API"),
        me("m2", "m3", "delegates"),
        me("m2", "e1", "System API"),
        me("m3", "e2", "System API"),
        me("m3", "e3", "S3 put", "dashed"),
      ];
      return { nodes: n, edges: e };
    },
  },
];

/* ================================================================== */
export default function SalesforceDiagrammer() {
  const t0 = TEMPLATES[0].build();
  const [nodes, setNodes] = useState(t0.nodes);
  const [edges, setEdges] = useState(t0.edges);
  const [header, setHeader] = useState(TEMPLATES[0].header);
  const [sel, setSel] = useState(null);
  const [pan, setPan] = useState({ x: 0, y: 30 });
  const [zoom, setZoom] = useState(0.92);
  const [mode, setMode] = useState("select");
  const [linking, setLinking] = useState(null);
  const [connectFrom, setConnectFrom] = useState(null);
  const [aiOpen, setAiOpen] = useState(false);
  const [tplOpen, setTplOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiBusy, setAiBusy] = useState(false);
  const [aiErr, setAiErr] = useState("");
  const [aiReplace, setAiReplace] = useState(true);
  const [provider, setProvider] = useState("anthropic");
  const [apiKey, setApiKey] = useState("");   // in-memory only, never persisted
  const [toast, setToast] = useState("");
  const [customShapes, setCustomShapes] = useState([]); // {id, name, url (data URL)}
  const [ctxMenu, setCtxMenu] = useState(null); // {x, y, id, kind}

  const canvasRef = useRef(null);
  const dragRef = useRef(null);
  const resizeRef = useRef(null);
  const panRef = useRef(null);
  const history = useRef([]);
  const fileRef = useRef(null);
  const svgImportRef = useRef(null);

  const selNode = sel?.kind === "node" ? nodes.find(n => n.id === sel.id) : null;
  const selEdge = sel?.kind === "edge" ? edges.find(e => e.id === sel.id) : null;

  const snapshot = useCallback(() => {
    history.current.push({ nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)) });
    if (history.current.length > 60) history.current.shift();
  }, [nodes, edges]);
  const undo = useCallback(() => {
    const p = history.current.pop();
    if (p) { setNodes(p.nodes); setEdges(p.edges); setSel(null); }
  }, []);
  const flash = m => { setToast(m); setTimeout(() => setToast(""), 2200); };
  const toCanvas = (cx, cy) => {
    const r = canvasRef.current.getBoundingClientRect();
    return { x: (cx - r.left - pan.x) / zoom, y: (cy - r.top - pan.y) / zoom };
  };

  /* ---------- node ops ---------- */
  const addNode = (type, opts = {}) => {
    snapshot();
    const r = canvasRef.current?.getBoundingClientRect();
    const z = isZone({ type });
    const w = opts.w ?? (z ? DEF_ZONE.w : DEF.w), h = opts.h ?? (z ? DEF_ZONE.h : DEF.h);
    const cx = opts.x ?? (r ? (r.width / 2 - pan.x) / zoom - w / 2 : 200);
    const cy = opts.y ?? (r ? (r.height / 2 - pan.y) / zoom - h / 2 : 150);
    const j = () => opts.x != null ? 0 : (Math.random() - 0.5) * 50;
    const label = opts.label ?? (type === "custom" ? "Custom" : NODE_TYPES[type].label);
    const n = { id: nid(), type, label, x: cx + j(), y: cy + j(), w, h, attrs: [], footer: "", fill: false,
                ...(opts.shapeId ? { shapeId: opts.shapeId } : {}),
                ...(opts.svgUrl  ? { svgUrl:  opts.svgUrl  } : {}) };
    setNodes(ns => z ? [n, ...ns] : [...ns, n]);
    setSel({ kind: "node", id: n.id });
  };

  /* ---------- SVG import ---------- */
  const readSvgFile = (file, onDone) => {
    const reader = new FileReader();
    reader.onload = e => onDone(e.target.result); // data URL
    reader.readAsDataURL(file);
  };
  const importSvgToPalette = file => {
    if (!file) return;
    readSvgFile(file, url => {
      const id = nid("svg");
      setCustomShapes(cs => [...cs, { id, name: file.name, url }]);
      flash(`SVG imported: ${file.name}`);
    });
  };

  const deleteSelection = useCallback(() => {
    if (!sel) return;
    snapshot();
    if (sel.kind === "node") {
      setNodes(ns => ns.filter(n => n.id !== sel.id));
      setEdges(es => es.filter(e => e.from !== sel.id && e.to !== sel.id));
    } else setEdges(es => es.filter(e => e.id !== sel.id));
    setSel(null);
  }, [sel, snapshot]);

  const deleteById = (id, kind) => {
    snapshot();
    if (kind === "node") {
      setNodes(ns => ns.filter(n => n.id !== id));
      setEdges(es => es.filter(e => e.from !== id && e.to !== id));
    } else {
      setEdges(es => es.filter(e => e.id !== id));
    }
    setSel(null); setCtxMenu(null);
  };

  const onCtxMenu = (e, id, kind) => {
    e.preventDefault(); e.stopPropagation();
    setSel({ kind, id });
    setCtxMenu({ x: e.clientX, y: e.clientY, id, kind });
  };

  const bringFront = () => { if (!selNode) return; snapshot(); setNodes(ns => [...ns.filter(n => n.id !== selNode.id), selNode]); };
  const sendBack  = () => { if (!selNode) return; snapshot(); setNodes(ns => [selNode, ...ns.filter(n => n.id !== selNode.id)]); };

  /* ---------- pointers ---------- */
  const onNodeDown = (e, node) => {
    e.stopPropagation();
    if (mode === "connect") {
      if (!connectFrom) setConnectFrom(node.id);
      else if (connectFrom !== node.id) {
        snapshot();
        const p2 = toCanvas(e.clientX, e.clientY);
        setEdges(es => [...es, { id: nid("e"), from: connectFrom, to: node.id, label: "", style: "solid",
                                 fromSide: "right", toSide: nearestSide(node, p2.x, p2.y) }]);
        setConnectFrom(null); setMode("select");
      }
      return;
    }
    setSel({ kind: "node", id: node.id });
    const p = toCanvas(e.clientX, e.clientY);
    // dragging a zone carries the cards inside it
    let group = [];
    if (isZone(node)) {
      group = nodes.filter(m => m.id !== node.id &&
        m.x + m.w / 2 > node.x && m.x + m.w / 2 < cx2(node) &&
        m.y + m.h / 2 > node.y && m.y + m.h / 2 < cy2(node)
      ).map(m => ({ id: m.id, dx: m.x - node.x, dy: m.y - node.y }));
    }
    dragRef.current = { id: node.id, ox: p.x - node.x, oy: p.y - node.y, moved: false, group };
  };

  const onHandleDown = (e, node, side = "right") => {
    e.stopPropagation();
    const p = toCanvas(e.clientX, e.clientY);
    setLinking({ from: node.id, side, x: p.x, y: p.y });
  };

  const onResizeDown = (e, node, dir) => {
    e.stopPropagation();
    snapshot();
    resizeRef.current = { id: node.id, dir, sx: e.clientX, sy: e.clientY, ow: node.w, oh: node.h };
  };

  const onCanvasDown = e => {
    setSel(null); setConnectFrom(null); setTplOpen(false); setCtxMenu(null);
    panRef.current = { sx: e.clientX, sy: e.clientY, px: pan.x, py: pan.y };
  };

  const onMove = e => {
    if (resizeRef.current) {
      const { id, dir, sx, sy, ow, oh } = resizeRef.current;
      const dx = (e.clientX - sx) / zoom, dy = (e.clientY - sy) / zoom;
      setNodes(ns => ns.map(n => {
        if (n.id !== id) return n;
        const min = isZone(n) ? MIN_ZONE : MIN;
        return {
          ...n,
          w: dir.includes("e") ? Math.max(min.w, ow + dx) : n.w,
          h: dir.includes("s") ? Math.max(min.h, oh + dy) : n.h,
        };
      }));
    } else if (dragRef.current) {
      const p = toCanvas(e.clientX, e.clientY);
      const { id, ox, oy, group } = dragRef.current;
      if (!dragRef.current.moved) { snapshot(); dragRef.current.moved = true; }
      const nx = p.x - ox, ny = p.y - oy;
      setNodes(ns => ns.map(n => {
        if (n.id === id) return { ...n, x: nx, y: ny };
        const g = group.find(m => m.id === n.id);
        return g ? { ...n, x: nx + g.dx, y: ny + g.dy } : n;
      }));
    } else if (linking) {
      const p = toCanvas(e.clientX, e.clientY);
      setLinking(l => ({ ...l, x: p.x, y: p.y }));
    } else if (panRef.current) {
      const { sx, sy, px, py } = panRef.current;
      setPan({ x: px + (e.clientX - sx), y: py + (e.clientY - sy) });
    }
  };

  const onUp = e => {
    if (linking) {
      const p = toCanvas(e.clientX, e.clientY);
      // hit-test topmost (last in array) non-source node
      const target = [...nodes].reverse().find(n =>
        n.id !== linking.from && !isZone(n) &&
        p.x >= n.x && p.x <= cx2(n) && p.y >= n.y && p.y <= cy2(n));
      if (target) {
        const toSide = nearestSide(target, p.x, p.y);
        snapshot();
        setEdges(es => [...es, { id: nid("e"), from: linking.from, to: target.id, label: "", style: "solid",
                                 fromSide: linking.side || "right", toSide }]);
      }
      setLinking(null);
    }
    dragRef.current = null; panRef.current = null; resizeRef.current = null;
  };

  const onWheel = e => {
    e.preventDefault();
    const r = canvasRef.current.getBoundingClientRect();
    const mx = e.clientX - r.left, my = e.clientY - r.top;
    const nz = Math.min(2.2, Math.max(0.3, zoom * (e.deltaY < 0 ? 1.1 : 0.9)));
    setPan(p => ({ x: mx - ((mx - p.x) / zoom) * nz, y: my - ((my - p.y) / zoom) * nz }));
    setZoom(nz);
  };

  useEffect(() => {
    const h = e => {
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "Delete" || e.key === "Backspace") deleteSelection();
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") { e.preventDefault(); undo(); }
      if (e.key === "Escape") { setMode("select"); setConnectFrom(null); setSel(null); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [deleteSelection, undo]);

  const fitView = () => {
    if (!nodes.length) return;
    const minX = Math.min(...nodes.map(n => n.x)) - 60;
    const minY = Math.min(...nodes.map(n => n.y)) - 60;
    const maxX = Math.max(...nodes.map(cx2)) + 60;
    const maxY = Math.max(...nodes.map(cy2)) + 60;
    const r = canvasRef.current.getBoundingClientRect();
    const z = Math.min(1.3, Math.min(r.width / (maxX - minX), r.height / (maxY - minY)));
    setZoom(z);
    setPan({ x: (r.width - (maxX - minX) * z) / 2 - minX * z, y: (r.height - (maxY - minY) * z) / 2 - minY * z });
  };

  const loadTemplate = tpl => {
    snapshot();
    const { nodes: n, edges: e } = tpl.build();
    setNodes(n); setEdges(e); setHeader(tpl.header); setSel(null); setTplOpen(false);
    setTimeout(fitView, 50);
    flash(`Template loaded: ${tpl.name}`);
  };
  const blankCanvas = () => {
    snapshot(); setNodes([]); setEdges([]);
    setHeader({ title: "Untitled Architecture", desc: "Describe the purpose and audience of this diagram." });
    setSel(null); setTplOpen(false);
  };

  /* ---------- export / import ---------- */
  const downloadBlob = (blob, name) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = name; a.click();
    URL.revokeObjectURL(url);
  };
  const exportJSON = () => {
    downloadBlob(new Blob([JSON.stringify({ header, nodes, edges, customShapes }, null, 2)], { type: "application/json" }), "sf-architecture.json");
    flash("Diagram saved as JSON");
  };
  const importJSON = e => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const d = JSON.parse(reader.result);
        if (!Array.isArray(d.nodes) || !Array.isArray(d.edges)) throw new Error();
        snapshot();
        setNodes(d.nodes.map(n => ({ w: isZone(n) ? DEF_ZONE.w : DEF.w, h: isZone(n) ? DEF_ZONE.h : DEF.h, attrs: [], footer: "", fill: false, ...n })));
        setEdges(d.edges.map(ed => ({ style: "solid", ...ed })));
        if (d.header) setHeader(d.header);
        if (Array.isArray(d.customShapes)) setCustomShapes(d.customShapes);
        setSel(null); flash("Diagram loaded"); setTimeout(fitView, 50);
      } catch { flash("That file isn't a valid diagram JSON"); }
    };
    reader.readAsText(f); e.target.value = "";
  };

  /* ---------- export SVG/PNG with kit-of-parts header + key ---------- */
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const cardSVG = (n, ox, oy) => {
    const t = NODE_TYPES[n.type] || { color: T.accent, label: "Custom" };
    const x = n.x - ox, y = n.y - oy;
    if (n.type === "custom") {
      const shapeUrl = n.svgUrl || customShapes.find(s => s.id === n.shapeId)?.url;
      const labelH = n.h >= 50 ? 22 : 0;
      let s = `<g><rect x="${x}" y="${y}" width="${n.w}" height="${n.h}" rx="9" fill="#FFFFFF" stroke="${T.cardBorder}" stroke-width="1.2"/>`;
      if (shapeUrl) s += `<image href="${shapeUrl}" x="${x+4}" y="${y+4}" width="${n.w-8}" height="${n.h-labelH-8}" preserveAspectRatio="xMidYMid meet"/>`;
      if (labelH) s += `<line x1="${x}" y1="${y+n.h-labelH}" x2="${x+n.w}" y2="${y+n.h-labelH}" stroke="${T.cardBorder}" stroke-width="1"/>
        <text x="${x+n.w/2}" y="${y+n.h-7}" text-anchor="middle" font-size="11" fill="${T.cardInk}" font-family="sans-serif">${esc(n.label)}</text>`;
      return s + "</g>";
    }
    if (isZone(n)) {
      return `<g><rect x="${x}" y="${y}" width="${n.w}" height="${n.h}" rx="10" fill="${t.color}10" stroke="${t.color}" stroke-width="1.4" stroke-dasharray="7 5"/>
        <text x="${x + 14}" y="${y + 22}" font-size="12" font-weight="600" letter-spacing="1" fill="${t.color}" font-family="sans-serif">${esc(n.label.toUpperCase())}</text></g>`;
    }
    const showAttrs = n.attrs?.length && n.h >= 92;
    const showFooter = n.footer && n.h >= 86;
    const footH = showFooter ? 22 : 0;
    let s = `<g><rect x="${x}" y="${y}" width="${n.w}" height="${n.h}" rx="9" fill="${n.fill ? t.color + "14" : "#FFFFFF"}" stroke="${T.cardBorder}" stroke-width="1.2"/>
      <rect x="${x}" y="${y}" width="5" height="${n.h}" rx="2.5" fill="${t.color}"/>
      <text x="${x + 18}" y="${y + 19}" font-size="8.5" letter-spacing="1.2" fill="${T.cardInkDim}" font-family="monospace">${esc(t.label.toUpperCase())}</text>
      <text x="${x + 18}" y="${y + 38}" font-size="13.5" font-weight="600" fill="${T.cardInk}" font-family="sans-serif">${esc(n.label)}</text>`;
    if (showAttrs) n.attrs.slice(0, Math.floor((n.h - 56 - footH) / 16)).forEach((a, i) => {
      s += `<text x="${x + 18}" y="${y + 56 + i * 16}" font-size="10.5" fill="${T.cardInkDim}" font-family="sans-serif">• ${esc(a)}</text>`;
    });
    if (showFooter) s += `<rect x="${x + 1}" y="${y + n.h - footH}" width="${n.w - 2}" height="${footH - 1}" rx="0" fill="#F2F6FC"/>
      <line x1="${x + 1}" y1="${y + n.h - footH}" x2="${x + n.w - 1}" y2="${y + n.h - footH}" stroke="${T.cardBorder}" stroke-width="1"/>
      <text x="${x + 18}" y="${y + n.h - 7}" font-size="9.5" fill="${T.cardInkDim}" font-family="monospace">${esc(n.footer)}</text>`;
    return s + "</g>";
  };

  const buildExportSVG = () => {
    const pad = 60;
    const minX = Math.min(...nodes.map(n => n.x)) - pad;
    const minY = Math.min(...nodes.map(n => n.y)) - pad;
    const maxX = Math.max(...nodes.map(cx2)) + pad;
    const maxY = Math.max(...nodes.map(cy2)) + pad;
    const W = Math.max(900, maxX - minX);
    const usedTypes = [...new Set(nodes.map(n => n.type))];
    const hasDashed = edges.some(e => e.style === "dashed");
    // Header: ≥10% of diagram height, full width (kit-of-parts)
    const keyH = 30;
    const headH = Math.max(96, Math.round((maxY - minY) * 0.12)) + keyH;
    const H = headH + (maxY - minY);
    let s = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <defs><marker id="arr" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="${T.edge}"/></marker></defs>
      <rect width="${W}" height="${H}" fill="#F7FAFF"/>
      <rect width="${W}" height="${headH}" fill="#FFFFFF"/>
      <line x1="0" y1="${headH}" x2="${W}" y2="${headH}" stroke="${T.cardBorder}" stroke-width="1"/>
      <rect x="0" y="0" width="${W}" height="5" fill="${T.accentDeep}"/>
      <text x="28" y="40" font-size="22" font-weight="700" fill="${T.cardInk}" font-family="sans-serif">${esc(header.title)}</text>
      <text x="28" y="64" font-size="12" fill="${T.cardInkDim}" font-family="sans-serif">${esc(header.desc)}</text>`;
    // Key row
    let kx = 28;
    const ky = headH - 12;
    s += `<text x="${kx}" y="${ky}" font-size="9" letter-spacing="1.5" fill="${T.cardInkDim}" font-family="monospace">KEY</text>`;
    kx += 44;
    usedTypes.forEach(k => {
      const t = NODE_TYPES[k];
      s += `<rect x="${kx}" y="${ky - 9}" width="10" height="10" rx="3" fill="${t.color}"/>
        <text x="${kx + 15}" y="${ky}" font-size="10" fill="${T.cardInk}" font-family="sans-serif">${esc(t.label)}</text>`;
      kx += 15 + t.label.length * 5.6 + 22;
    });
    if (hasDashed) {
      s += `<line x1="${kx}" y1="${ky - 4}" x2="${kx + 26}" y2="${ky - 4}" stroke="${T.edge}" stroke-width="1.6"/>
        <text x="${kx + 31}" y="${ky}" font-size="10" fill="${T.cardInk}" font-family="sans-serif">sync</text>`;
      kx += 65;
      s += `<line x1="${kx}" y1="${ky - 4}" x2="${kx + 26}" y2="${ky - 4}" stroke="${T.edge}" stroke-width="1.6" stroke-dasharray="5 4"/>
        <text x="${kx + 31}" y="${ky}" font-size="10" fill="${T.cardInk}" font-family="sans-serif">async / event</text>`;
    }
    const oy = minY - headH;
    // zones first (already first in array order)
    nodes.forEach(n => { if (isZone(n)) s += cardSVG(n, minX, oy); });
    edges.forEach(ed => {
      const a = nodes.find(n => n.id === ed.from), b = nodes.find(n => n.id === ed.to);
      if (!a || !b) return;
      const { d, mx, my } = elbow({ ...a, x: a.x - minX, y: a.y - oy }, { ...b, x: b.x - minX, y: b.y - oy }, ed.fromSide || "right", ed.toSide || "left");
      s += `<path d="${d}" fill="none" stroke="${T.edge}" stroke-width="1.6" ${ed.style === "dashed" ? 'stroke-dasharray="6 5"' : ""} marker-end="url(#arr)"/>`;
      if (ed.label) {
        const pw = ed.label.length * 6.2 + 18;
        s += `<rect x="${mx - pw / 2}" y="${my - 10}" width="${pw}" height="20" rx="10" fill="#FFFFFF" stroke="${T.cardBorder}"/>
          <text x="${mx}" y="${my + 4}" text-anchor="middle" font-size="10.5" fill="${T.cardInk}" font-family="monospace">${esc(ed.label)}</text>`;
      }
    });
    nodes.forEach(n => { if (!isZone(n)) s += cardSVG(n, minX, oy); });
    return s + "</svg>";
  };

  const exportPNG = () => {
    if (!nodes.length) { flash("Nothing to export yet"); return; }
    const svg = buildExportSVG();
    const img = new Image();
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = img.width * 2; c.height = img.height * 2;
      const ctx = c.getContext("2d");
      ctx.scale(2, 2); ctx.drawImage(img, 0, 0);
      c.toBlob(b => { downloadBlob(b, "sf-architecture.png"); flash("PNG exported with header & key"); });
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  /* ---------- AI (via backend proxy — supports multiple providers) ---------- */
  const runAI = async () => {
    if (!aiPrompt.trim() || aiBusy) return;
    setAiBusy(true); setAiErr("");
    const fullPrompt = `You are a Salesforce solution architect. Convert the description into an architecture diagram.

Respond with ONLY a JSON object, no markdown fences, no prose:
{"title":"...","description":"one sentence on purpose/audience","nodes":[{"id":"a1","label":"Opportunity","type":"standardObject","attrs":["Stage","Amount"],"footer":"Opportunity"}],"edges":[{"from":"a1","to":"a2","label":"triggers","style":"solid"}]}

Rules:
- "type" must be one of: ${AI_TYPES.join(", ")}
- attrs: 0-3 short field/detail strings (optional). footer: API name or system detail (optional).
- edge style: "solid" for sync/process, "dashed" for async/events/callouts.
- Short labels. 4 to 12 nodes. Edges flow left-to-right from actors toward downstream systems.

Description: ${aiPrompt}`;
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider, apiKey: apiKey.trim() || undefined, prompt: fullPrompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      const text = data.text || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean.slice(clean.indexOf("{"), clean.lastIndexOf("}") + 1));
      const newNodes = (parsed.nodes || []).map(n => ({
        id: String(n.id), label: String(n.label || "Node"),
        type: AI_TYPES.includes(n.type) ? n.type : "external",
        attrs: Array.isArray(n.attrs) ? n.attrs.slice(0, 3).map(String) : [],
        footer: String(n.footer || ""), fill: false,
        x: 0, y: 0, w: DEF.w, h: (Array.isArray(n.attrs) && n.attrs.length) ? 100 : DEF.h,
      }));
      const ids = new Set(newNodes.map(n => n.id));
      const newEdges = (parsed.edges || [])
        .filter(e => ids.has(String(e.from)) && ids.has(String(e.to)))
        .map(e => ({ id: nid("e"), from: String(e.from), to: String(e.to), label: String(e.label || ""), style: e.style === "dashed" ? "dashed" : "solid" }));
      if (!newNodes.length) throw new Error("empty");
      snapshot();
      const laid = autoLayout(newNodes, newEdges);
      if (aiReplace) {
        setNodes(laid); setEdges(newEdges);
        if (parsed.title) setHeader({ title: String(parsed.title), desc: String(parsed.description || "") });
      } else {
        const off = nodes.length ? Math.max(...nodes.map(cy2)) + 90 : 0;
        setNodes(ns => [...ns, ...laid.map(n => ({ ...n, y: n.y + off }))]);
        setEdges(es => [...es, ...newEdges]);
      }
      setSel(null); setAiOpen(false); setAiPrompt("");
      setTimeout(fitView, 60);
      flash(`Generated ${laid.length} components — drag, resize and refine`);
    } catch (err) {
      console.error("LLM API error:", err);
      setAiErr(String(err.message || "").includes("key")
        ? err.message
        : "Couldn't generate a diagram from that. Check the provider/key or try rephrasing.");
    } finally { setAiBusy(false); }
  };

  /* ---------- inspector mutations ---------- */
  const patchSelNode = patch => setNodes(ns => ns.map(n => n.id === selNode.id ? { ...n, ...patch } : n));
  const patchSelEdge = patch => setEdges(es => es.map(e => e.id === selEdge.id ? { ...e, ...patch } : e));

  const btn = active => ({
    display: "flex", alignItems: "center", gap: 6, padding: "7px 11px",
    background: active ? "rgba(76,166,248,0.16)" : "transparent",
    border: `1px solid ${active ? T.accent : T.panelBorder}`,
    borderRadius: 8, color: active ? T.accent : T.inkDim, cursor: "pointer",
    fontSize: 12.5, fontFamily: T.fontBody, fontWeight: 500, whiteSpace: "nowrap",
  });
  const fieldStyle = {
    padding: "6px 9px", background: T.bgApp, border: `1px solid ${T.panelBorder}`,
    borderRadius: 7, color: T.ink, fontSize: 12.5, fontFamily: T.fontBody,
  };

  const linkSrc = linking ? nodes.find(n => n.id === linking.from) : null;
  const usedTypes = [...new Set(nodes.map(n => n.type))];

  return (
    <div style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column", background: T.bgApp, color: T.ink, fontFamily: T.fontBody, overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-thumb { background: ${T.panelBorder}; border-radius: 4px; }
        button:focus-visible, input:focus-visible, textarea:focus-visible, select:focus-visible { outline: 2px solid ${T.accent}; outline-offset: 1px; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
      `}</style>

      {/* ============ Top bar ============ */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: T.panel, borderBottom: `1px solid ${T.panelBorder}`, flexWrap: "wrap", position: "relative", zIndex: 30 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginRight: 6 }}>
          <span style={{ fontWeight: 600, fontSize: 14.5 }}>ArchCanvas</span>
          <span style={{ fontFamily: T.fontMono, fontSize: 10, color: T.inkFaint, letterSpacing: "0.08em" }}>KIT-OF-PARTS v2</span>
        </div>

        <div style={{ position: "relative" }}>
          <button style={btn(tplOpen)} onClick={() => setTplOpen(o => !o)}>
            <LayoutTemplate size={14} /> Templates <ChevronDown size={12} />
          </button>
          {tplOpen && (
            <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, width: 300, background: T.panel, border: `1px solid ${T.panelBorder}`, borderRadius: 11, padding: 8, boxShadow: "0 14px 36px rgba(0,0,0,0.5)", zIndex: 50 }}>
              {TEMPLATES.map(tpl => (
                <button key={tpl.name} onClick={() => loadTemplate(tpl)}
                  style={{ display: "block", width: "100%", textAlign: "left", padding: "9px 11px", background: "transparent", border: "none", borderRadius: 8, cursor: "pointer", color: T.ink }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(76,166,248,0.1)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{tpl.name}</div>
                  <div style={{ fontSize: 11.5, color: T.inkDim, marginTop: 2, lineHeight: 1.4 }}>{tpl.desc}</div>
                </button>
              ))}
              <div style={{ height: 1, background: T.panelBorder, margin: "6px 4px" }} />
              <button onClick={blankCanvas}
                style={{ display: "block", width: "100%", textAlign: "left", padding: "9px 11px", background: "transparent", border: "none", borderRadius: 8, cursor: "pointer", color: T.inkDim, fontSize: 12.5 }}>
                Start from a blank canvas
              </button>
            </div>
          )}
        </div>

        <button style={btn(mode === "select")} onClick={() => { setMode("select"); setConnectFrom(null); }}><MousePointer2 size={14} /> Select</button>
        <button style={btn(mode === "connect")} onClick={() => setMode(m => m === "connect" ? "select" : "connect")}><Spline size={14} /> Connect</button>
        <button style={btn(false)} onClick={undo} title="Undo (Ctrl+Z)"><Undo2 size={14} /></button>

        <div style={{ width: 1, height: 22, background: T.panelBorder, margin: "0 2px" }} />
        <button style={btn(false)} onClick={() => setZoom(z => Math.min(2.2, z * 1.15))}><ZoomIn size={14} /></button>
        <button style={btn(false)} onClick={() => setZoom(z => Math.max(0.3, z / 1.15))}><ZoomOut size={14} /></button>
        <button style={btn(false)} onClick={fitView}><Maximize size={14} /> Fit</button>

        <div style={{ flex: 1 }} />
        <button style={btn(false)} onClick={exportJSON}><FileJson size={14} /> Save</button>
        <button style={btn(false)} onClick={() => fileRef.current?.click()}><Upload size={14} /> Load</button>
        <input ref={fileRef} type="file" accept=".json" style={{ display: "none" }} onChange={importJSON} />
        <button style={btn(false)} onClick={exportPNG}><ImageIcon size={14} /> PNG</button>
        <button
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", background: `linear-gradient(135deg, ${T.accentDeep}, ${T.accent})`, border: "none", borderRadius: 8, color: "#fff", cursor: "pointer", fontSize: 12.5, fontWeight: 600, fontFamily: T.fontBody }}
          onClick={() => setAiOpen(o => !o)}>
          <Sparkles size={14} /> Generate with AI
        </button>
      </div>

      {/* ============ Diagram header strip (kit-of-parts Header) ============ */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "8px 16px", background: "#FFFFFF", borderBottom: `1px solid ${T.cardBorder}`, borderTop: `4px solid ${T.accentDeep}` }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <input value={header.title} onChange={e => setHeader(h => ({ ...h, title: e.target.value }))}
            style={{ display: "block", width: "100%", border: "none", background: "transparent", color: T.cardInk, fontSize: 16.5, fontWeight: 700, fontFamily: T.fontBody, padding: 0 }} />
          <input value={header.desc} onChange={e => setHeader(h => ({ ...h, desc: e.target.value }))}
            placeholder="Describe what this diagram covers, its purpose, and the audience"
            style={{ display: "block", width: "100%", border: "none", background: "transparent", color: T.cardInkDim, fontSize: 11.5, fontFamily: T.fontBody, padding: 0, marginTop: 1 }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0, flexWrap: "wrap", maxWidth: "44%" }}>
          <span style={{ fontFamily: T.fontMono, fontSize: 9, letterSpacing: "0.14em", color: T.cardInkDim }}>KEY</span>
          {usedTypes.slice(0, 7).map(k => (
            <span key={k} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10.5, color: T.cardInk }}>
              <span style={{ width: 9, height: 9, borderRadius: 3, background: NODE_TYPES[k].color }} />
              {NODE_TYPES[k].label}
            </span>
          ))}
        </div>
      </div>

      {/* ============ Body ============ */}
      <div style={{ flex: 1, display: "flex", minHeight: 0, position: "relative" }}>

        {/* Palette */}
        <div style={{ width: 198, background: T.panel, borderRight: `1px solid ${T.panelBorder}`, padding: 12, overflowY: "auto", flexShrink: 0 }}>
          <div style={{ fontFamily: T.fontMono, fontSize: 10, letterSpacing: "0.12em", color: T.inkFaint, marginBottom: 10 }}>CARDS</div>
          {["standardObject","customObject","automation","apex","integration","external","dataStore","persona","platformEvent","zone"].map(k => {
            const t = NODE_TYPES[k];
            return (
              <button key={k} onClick={() => addNode(k)}
                style={{ display: "flex", alignItems: "center", gap: 9, width: "100%", padding: "8px 10px", marginBottom: 6, background: "rgba(255,255,255,0.025)", border: `1px solid ${T.panelBorder}`, borderRadius: 9, color: T.ink, cursor: "pointer", fontSize: 12.5, fontFamily: T.fontBody, textAlign: "left" }}>
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 26, height: 26, borderRadius: 7, background: `${t.color}26`, color: t.color === "#475569" ? "#9FB2CC" : t.color, flexShrink: 0, filter: "brightness(1.35)" }}>
                  <t.Icon size={14} />
                </span>
                {t.label}
              </button>
            );
          })}
          <div style={{ height: 1, background: T.panelBorder, margin: "10px 0 8px" }} />
          <div style={{ fontFamily: T.fontMono, fontSize: 10, letterSpacing: "0.12em", color: T.inkFaint, marginBottom: 10 }}>BRANDS</div>
          {["salesforce","mulesoft","heroku","slack","snowflake","aws","sap","dataCloud"].map(k => {
            const t = NODE_TYPES[k];
            return (
              <button key={k} onClick={() => addNode(k)}
                style={{ display: "flex", alignItems: "center", gap: 9, width: "100%", padding: "8px 10px", marginBottom: 6, background: "rgba(255,255,255,0.025)", border: `1px solid ${T.panelBorder}`, borderRadius: 9, color: T.ink, cursor: "pointer", fontSize: 12.5, fontFamily: T.fontBody, textAlign: "left" }}>
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 26, height: 26, borderRadius: 7, background: `${t.color}26`, flexShrink: 0 }}>
                  <t.Icon size={14} />
                </span>
                {t.label}
              </button>
            );
          })}
          <div style={{ marginTop: 12, padding: 10, borderRadius: 9, background: "rgba(76,166,248,0.06)", border: "1px solid rgba(76,166,248,0.18)", fontSize: 11, lineHeight: 1.55, color: T.inkDim }}>
            Select a card to resize it from its edges, edit attributes & API-name footer, or change its stacking order. Zones drag their contents with them.
          </div>

          {/* ── Custom SVG shapes ── */}
          <div style={{ height: 1, background: T.panelBorder, margin: "12px 0 10px" }} />
          <div style={{ fontFamily: T.fontMono, fontSize: 10, letterSpacing: "0.12em", color: T.inkFaint, marginBottom: 8 }}>CUSTOM SVG</div>
          <label style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "7px 10px", marginBottom: 8, background: "rgba(76,166,248,0.07)", border: `1px dashed ${T.accent}55`, borderRadius: 9, color: T.accent, cursor: "pointer", fontSize: 12, fontFamily: T.fontBody }}>
            <Upload size={13} /> Import SVG…
            <input type="file" accept=".svg,image/svg+xml" ref={svgImportRef} style={{ display: "none" }}
              onChange={e => { importSvgToPalette(e.target.files[0]); e.target.value = ""; }} />
          </label>
          {customShapes.length === 0 && (
            <div style={{ fontSize: 10.5, color: T.inkFaint, lineHeight: 1.55 }}>
              Drop a .svg onto the canvas, or use Import above. Shapes appear here and can be placed like any card.
            </div>
          )}
          {customShapes.map(s => (
            <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
              <button onClick={() => addNode("custom", { shapeId: s.id, label: s.name.replace(/\.svg$/i, "") })}
                style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, padding: "6px 8px", background: "rgba(255,255,255,0.025)", border: `1px solid ${T.panelBorder}`, borderRadius: 8, color: T.ink, cursor: "pointer", fontSize: 11.5, fontFamily: T.fontBody, textAlign: "left", minWidth: 0 }}>
                <img src={s.url} style={{ width: 24, height: 24, objectFit: "contain", borderRadius: 4, background: "#fff", flexShrink: 0 }} />
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name.replace(/\.svg$/i, "")}</span>
              </button>
              <button onClick={() => setCustomShapes(cs => cs.filter(c => c.id !== s.id))}
                style={{ background: "none", border: "none", color: T.inkFaint, cursor: "pointer", padding: 4, flexShrink: 0, display: "flex" }}>
                <X size={12} />
              </button>
            </div>
          ))}
        </div>

        {/* Canvas (paper) */}
        <div ref={canvasRef}
          onMouseDown={onCanvasDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp} onWheel={onWheel}
          onDragOver={e => e.preventDefault()}
          onDrop={e => {
            e.preventDefault();
            const file = [...e.dataTransfer.files].find(f => f.name.toLowerCase().endsWith(".svg") || f.type === "image/svg+xml");
            if (!file) return;
            const r = canvasRef.current.getBoundingClientRect();
            const dropX = (e.clientX - r.left - pan.x) / zoom - DEF.w / 2;
            const dropY = (e.clientY - r.top - pan.y) / zoom - DEF.h / 2;
            readSvgFile(file, url => {
              addNode("custom", { svgUrl: url, label: file.name.replace(/\.svg$/i, ""), x: dropX, y: dropY });
              flash(`${file.name} dropped onto canvas`);
            });
          }}
          onContextMenu={e => e.preventDefault()}
          style={{ flex: 1, position: "relative", overflow: "hidden", background: T.paper,
            cursor: panRef.current ? "grabbing" : mode === "connect" ? "crosshair" : "default",
            backgroundImage: `radial-gradient(${T.paperDot} 1px, transparent 1px)`,
            backgroundSize: `${22 * zoom}px ${22 * zoom}px`,
            backgroundPosition: `${pan.x}px ${pan.y}px` }}>

          <div style={{ position: "absolute", inset: 0, transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, transformOrigin: "0 0" }}>

            {/* zones render under edges */}
            {nodes.filter(isZone).map(n => {
              const t = NODE_TYPES[n.type];
              const isSel = sel?.kind === "node" && sel.id === n.id;
              return (
                <div key={n.id} onMouseDown={e => onNodeDown(e, n)} onContextMenu={e => onCtxMenu(e, n.id, "node")}
                  style={{ position: "absolute", left: n.x, top: n.y, width: n.w, height: n.h,
                    background: `${t.color}0d`, border: `1.6px dashed ${isSel ? T.accentDeep : t.color}`,
                    borderRadius: 12, cursor: "grab",
                    boxShadow: isSel ? `0 0 0 3px ${T.accentDeep}26` : "none" }}>
                  <div style={{ position: "absolute", top: 8, left: 13, fontFamily: T.fontMono, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.1em", color: t.color }}>
                    {n.label.toUpperCase()}
                  </div>
                  {isSel && <>
                    <ResizeHandle dir="e"  node={n} onDown={onResizeDown} />
                    <ResizeHandle dir="s"  node={n} onDown={onResizeDown} />
                    <ResizeHandle dir="se" node={n} onDown={onResizeDown} />
                  </>}
                </div>
              );
            })}

            {/* edges */}
            <svg style={{ position: "absolute", top: 0, left: 0, width: 8000, height: 8000, overflow: "visible", pointerEvents: "none" }}>
              <defs>
                <marker id="arrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill={T.edge} /></marker>
                <marker id="arrowSel" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill={T.accentDeep} /></marker>
              </defs>
              {edges.map(ed => {
                const a = nodes.find(n => n.id === ed.from), b = nodes.find(n => n.id === ed.to);
                if (!a || !b) return null;
                const { d, mx, my } = elbow(a, b, ed.fromSide || "right", ed.toSide || "left");
                const isSel = sel?.kind === "edge" && sel.id === ed.id;
                const pw = ed.label ? ed.label.length * 6.4 + 18 : 0;
                return (
                  <g key={ed.id}>
                    <path d={d} fill="none" stroke="transparent" strokeWidth={14} style={{ pointerEvents: "stroke", cursor: "pointer" }}
                      onMouseDown={e => { e.stopPropagation(); setSel({ kind: "edge", id: ed.id }); }}
                      onContextMenu={e => onCtxMenu(e, ed.id, "edge")} />
                    <path d={d} fill="none" stroke={isSel ? T.accentDeep : T.edge} strokeWidth={isSel ? 2.3 : 1.6}
                      strokeDasharray={ed.style === "dashed" ? "6 5" : "none"}
                      markerEnd={isSel ? "url(#arrowSel)" : "url(#arrow)"} style={{ pointerEvents: "none" }} />
                    {ed.label && (
                      <g style={{ pointerEvents: "none" }}>
                        <rect x={mx - pw / 2} y={my - 10} width={pw} height={20} rx={10}
                          fill="#FFFFFF" stroke={isSel ? T.accentDeep : T.cardBorder} strokeWidth={isSel ? 1.6 : 1} />
                        <text x={mx} y={my + 4} textAnchor="middle" fontSize={10.5} fill={T.cardInk} fontFamily={T.fontMono}>{ed.label}</text>
                      </g>
                    )}
                  </g>
                );
              })}
              {linking && linkSrc && (() => {
                const fs = linking.side || "right";
                const { x: sx, y: sy } = sidePoint(linkSrc, fs);
                const ex2 = fs === "right" ? sx + S : fs === "left" ? sx - S : sx;
                const ey2 = fs === "bottom" ? sy + S : fs === "top" ? sy - S : sy;
                const tx = linking.x, ty = linking.y;
                const horiz2 = fs === "right" || fs === "left";
                const cx2 = horiz2 ? tx : ex2, cy2 = horiz2 ? ey2 : ty;
                return <path d={`M ${sx},${sy} L ${ex2},${ey2} L ${cx2},${cy2} L ${tx},${ty}`}
                  fill="none" stroke={T.accentDeep} strokeWidth={1.8} strokeDasharray="5 4" />;
              })()}
            </svg>

            {/* cards */}
            {nodes.filter(n => !isZone(n)).map(n => {
              const isSel = sel?.kind === "node" && sel.id === n.id;
              const isSrc = connectFrom === n.id;
              const SIDES = [["right",{right:-7,top:"50%",transform:"translateY(-50%)"}],["left",{left:-7,top:"50%",transform:"translateY(-50%)"}],["top",{top:-7,left:"50%",transform:"translateX(-50%)"}],["bottom",{bottom:-7,left:"50%",transform:"translateX(-50%)"}]];

              /* ── custom SVG node ── */
              if (n.type === "custom") {
                const shapeUrl = n.svgUrl || customShapes.find(s => s.id === n.shapeId)?.url;
                const labelH = n.h >= 50 ? 24 : 0;
                const borderCol = isSel || isSrc ? T.accentDeep : T.cardBorder;
                return (
                  <div key={n.id} onMouseDown={e => onNodeDown(e, n)} onContextMenu={e => onCtxMenu(e, n.id, "node")}
                    onDoubleClick={e => { e.stopPropagation(); setSel({ kind: "node", id: n.id }); setTimeout(() => document.getElementById("label-input")?.focus(), 30); }}
                    style={{ position: "absolute", left: n.x, top: n.y, width: n.w, height: n.h,
                      background: T.cardBg, border: `1.4px solid ${borderCol}`,
                      borderRadius: 9, cursor: mode === "connect" ? "crosshair" : "grab",
                      boxShadow: isSel ? `0 0 0 3px ${T.accentDeep}30, 0 10px 22px rgba(22,36,59,0.18)` : "0 3px 10px rgba(22,36,59,0.10)",
                      userSelect: "none" }}>
                    {/* image wrapper clips to rounded card bounds without clipping the handles */}
                    <div style={{ position: "absolute", inset: 0, borderRadius: 9, overflow: "hidden", pointerEvents: "none" }}>
                      {shapeUrl
                        ? <img src={shapeUrl} draggable={false} style={{ width: "100%", height: n.h - labelH, objectFit: "contain", display: "block", padding: 6 }} />
                        : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: n.h - labelH, fontSize: 10, color: T.inkFaint }}>SVG missing</div>
                      }
                      {labelH > 0 && (
                        <div style={{ height: labelH, background: T.cardBg, borderTop: `1px solid ${T.cardBorder}`, display: "flex", alignItems: "center", padding: "0 8px", fontSize: 11, fontWeight: 500, color: T.cardInk, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {n.label}
                        </div>
                      )}
                    </div>
                    {SIDES.map(([side, pos]) => (
                      <div key={side} onMouseDown={e => onHandleDown(e, n, side)} title={`Connect from ${side}`}
                        style={{ position: "absolute", width: 11, height: 11, borderRadius: "50%", background: T.paper, border: `2.5px solid ${T.accentDeep}`, cursor: "crosshair", zIndex: 2, ...pos }} />
                    ))}
                    {isSel && <>
                      <ResizeHandle dir="e" node={n} onDown={onResizeDown} />
                      <ResizeHandle dir="s" node={n} onDown={onResizeDown} />
                      <ResizeHandle dir="se" node={n} onDown={onResizeDown} />
                    </>}
                  </div>
                );
              }

              const t = NODE_TYPES[n.type];
              const showFooter = n.footer && n.h >= 86;
              const footH = showFooter ? 22 : 0;
              const showAttrs = n.attrs?.length > 0 && n.h >= 92;
              return (
                <div key={n.id} onMouseDown={e => onNodeDown(e, n)} onContextMenu={e => onCtxMenu(e, n.id, "node")}
                  onDoubleClick={e => { e.stopPropagation(); setSel({ kind: "node", id: n.id }); setTimeout(() => document.getElementById("label-input")?.focus(), 30); }}
                  style={{
                    position: "absolute", left: n.x, top: n.y, width: n.w, height: n.h,
                    background: n.fill ? `linear-gradient(180deg, ${t.color}1a, ${t.color}0d), #FFFFFF` : T.cardBg,
                    border: `1.4px solid ${isSel || isSrc ? t.color : T.cardBorder}`,
                    borderRadius: 9, cursor: mode === "connect" ? "crosshair" : "grab",
                    boxShadow: isSel ? `0 0 0 3px ${t.color}30, 0 10px 22px rgba(22,36,59,0.18)` : "0 3px 10px rgba(22,36,59,0.10)",
                    userSelect: "none", transition: "box-shadow 0.12s, border-color 0.12s",
                  }}>
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 5, borderRadius: "9px 0 0 9px", background: t.color }} />
                  <div style={{ display: "flex", gap: 9, padding: "10px 12px 0 16px", height: n.h - footH, overflow: "hidden" }}>
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: 7, background: `${t.color}1a`, color: t.color, flexShrink: 0, marginTop: 2 }}>
                      <t.Icon size={15} />
                    </span>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontFamily: T.fontMono, fontSize: 8.5, letterSpacing: "0.12em", color: T.cardInkDim }}>{t.label.toUpperCase()}</div>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: T.cardInk, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{n.label}</div>
                      {showAttrs && (
                        <div style={{ marginTop: 4 }}>
                          {n.attrs.map((a, i) => (
                            <div key={i} style={{ fontSize: 10.5, color: T.cardInkDim, lineHeight: 1.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>• {a}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {showFooter && (
                    <div style={{ position: "absolute", left: 5, right: 0, bottom: 0, height: footH, background: "#F2F6FC", borderTop: `1px solid ${T.cardBorder}`, borderRadius: "0 0 8px 0", display: "flex", alignItems: "center", padding: "0 11px", fontFamily: T.fontMono, fontSize: 9.5, color: T.cardInkDim, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                      {n.footer}
                    </div>
                  )}
                  {[["right",{right:-7,top:"50%",transform:"translateY(-50%)"}],["left",{left:-7,top:"50%",transform:"translateY(-50%)"}],["top",{top:-7,left:"50%",transform:"translateX(-50%)"}],["bottom",{bottom:-7,left:"50%",transform:"translateX(-50%)"}]].map(([side,pos])=>(
                    <div key={side} onMouseDown={e=>onHandleDown(e,n,side)} title="Drag to connect"
                      style={{position:"absolute",width:11,height:11,borderRadius:"50%",background:T.paper,border:`2.5px solid ${t.color}`,cursor:"crosshair",zIndex:2,...pos}}/>
                  ))}
                  {isSel && <>
                    <ResizeHandle dir="e"  node={n} onDown={onResizeDown} />
                    <ResizeHandle dir="s"  node={n} onDown={onResizeDown} />
                    <ResizeHandle dir="se" node={n} onDown={onResizeDown} />
                  </>}
                </div>
              );
            })}
          </div>

          {mode === "connect" && (
            <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", padding: "7px 14px", background: "#fff", border: `1px solid ${T.accentDeep}`, borderRadius: 20, fontSize: 12, color: T.accentDeep, fontWeight: 500 }}>
              {connectFrom ? "Now click the target card" : "Click the source card"}
            </div>
          )}

          {toast && (
            <div style={{ position: "absolute", top: 12, right: 12, padding: "8px 14px", background: T.panel, border: `1px solid ${T.panelBorder}`, borderRadius: 9, fontSize: 12.5, color: T.ink, boxShadow: "0 6px 18px rgba(0,0,0,0.35)" }}>
              {toast}
            </div>
          )}

          {/* ---------- Inspector ---------- */}
          {(selNode || selEdge) && (
            <div style={{ position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", background: T.panel, border: `1px solid ${T.panelBorder}`, borderRadius: 11, boxShadow: "0 10px 28px rgba(0,0,0,0.45)", flexWrap: "wrap", maxWidth: "92%" }}>
              <span style={{ fontFamily: T.fontMono, fontSize: 10, color: T.inkFaint, letterSpacing: "0.08em" }}>{selNode ? "CARD" : "CONNECTOR"}</span>

              <input id="label-input" value={selNode ? selNode.label : selEdge.label}
                onChange={e => selNode ? patchSelNode({ label: e.target.value }) : patchSelEdge({ label: e.target.value })}
                placeholder={selEdge ? "pill label (e.g. callout)" : "title"}
                style={{ ...fieldStyle, width: 160 }} />

              {selNode && !isZone(selNode) && <>
                <select value={selNode.type} onChange={e => { snapshot(); patchSelNode({ type: e.target.value }); }} style={fieldStyle}>
                  {TYPE_KEYS.filter(k => k !== "zone").map(k => <option key={k} value={k}>{NODE_TYPES[k].label}</option>)}
                </select>
                <input value={selNode.attrs.join(", ")} onChange={e => patchSelNode({ attrs: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
                  placeholder="attributes, comma-separated" style={{ ...fieldStyle, width: 180 }} />
                <input value={selNode.footer} onChange={e => patchSelNode({ footer: e.target.value })}
                  placeholder="footer / API name" style={{ ...fieldStyle, width: 140, fontFamily: T.fontMono, fontSize: 11.5 }} />
                <label style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11.5, color: T.inkDim, cursor: "pointer" }}>
                  <input type="checkbox" checked={selNode.fill} onChange={e => patchSelNode({ fill: e.target.checked })} /> fill
                </label>
              </>}

              {selEdge && (
                <select value={selEdge.style} onChange={e => { snapshot(); patchSelEdge({ style: e.target.value }); }} style={fieldStyle}>
                  <option value="solid">solid — sync / process</option>
                  <option value="dashed">dashed — async / event</option>
                </select>
              )}

              {selNode && <>
                <button onClick={bringFront} title="Bring to front" style={btn(false)}><ArrowUpToLine size={13} /></button>
                <button onClick={sendBack} title="Send to back" style={btn(false)}><ArrowDownToLine size={13} /></button>
              </>}

              <button onClick={deleteSelection} title="Delete"
                style={{ display: "flex", padding: 7, background: "rgba(248,113,113,0.12)", border: "1px solid rgba(248,113,113,0.35)", borderRadius: 7, color: T.danger, cursor: "pointer" }}>
                <Trash2 size={13} />
              </button>
            </div>
          )}
        </div>

        {/* AI panel */}
        {aiOpen && (
          <div style={{ width: 300, background: T.panel, borderLeft: `1px solid ${T.panelBorder}`, padding: 16, display: "flex", flexDirection: "column", gap: 12, flexShrink: 0, overflowY: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, fontWeight: 600, fontSize: 13.5 }}>
                <Sparkles size={15} color={T.accent} /> Generate diagram
              </div>
              <button onClick={() => setAiOpen(false)} style={{ background: "none", border: "none", color: T.inkFaint, cursor: "pointer", display: "flex" }}><X size={15} /></button>
            </div>
            <p style={{ margin: 0, fontSize: 12, lineHeight: 1.55, color: T.inkDim }}>
              Describe the architecture in plain language. The model builds kit-of-parts cards with attributes, API-name footers, and sync/async connectors — then you refine by hand.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontFamily: T.fontMono, fontSize: 9.5, letterSpacing: "0.12em", color: T.inkFaint }}>MODEL PROVIDER</label>
              <select value={provider} onChange={e => setProvider(e.target.value)}
                style={{ padding: "8px 9px", background: T.bgApp, border: `1px solid ${T.panelBorder}`, borderRadius: 8, color: T.ink, fontSize: 12.5, fontFamily: T.fontBody }}>
                <option value="anthropic">Anthropic — Claude</option>
                <option value="openai">OpenAI — GPT</option>
                <option value="gemini">Google — Gemini</option>
              </select>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontFamily: T.fontMono, fontSize: 9.5, letterSpacing: "0.12em", color: T.inkFaint }}>API KEY (OPTIONAL)</label>
              <input type="password" value={apiKey} onChange={e => setApiKey(e.target.value)}
                placeholder="Uses the server's key if left empty"
                autoComplete="off"
                style={{ padding: "8px 9px", background: T.bgApp, border: `1px solid ${T.panelBorder}`, borderRadius: 8, color: T.ink, fontSize: 12.5, fontFamily: T.fontMono }} />
              <span style={{ fontSize: 10.5, color: T.inkFaint, lineHeight: 1.45 }}>
                Sent only to this app's server for the request. Kept in memory — never stored.
              </span>
            </div>
            <textarea value={aiPrompt} onChange={e => setAiPrompt(e.target.value)}
              placeholder={"e.g. A customer submits a case from Experience Cloud. A record-triggered flow assigns it, Apex enriches it from SAP via MuleSoft, and a platform event notifies support in Slack."}
              rows={7}
              style={{ resize: "vertical", padding: 10, background: T.bgApp, border: `1px solid ${T.panelBorder}`, borderRadius: 9, color: T.ink, fontSize: 12.5, fontFamily: T.fontBody, lineHeight: 1.5 }} />
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: T.inkDim, cursor: "pointer" }}>
              <input type="checkbox" checked={aiReplace} onChange={e => setAiReplace(e.target.checked)} />
              Replace current canvas (also sets the header)
            </label>
            {aiErr && <div style={{ fontSize: 12, color: T.danger, lineHeight: 1.5 }}>{aiErr}</div>}
            <button onClick={runAI} disabled={aiBusy || !aiPrompt.trim()}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "10px 0", background: aiBusy || !aiPrompt.trim() ? "#2A3850" : `linear-gradient(135deg, ${T.accentDeep}, ${T.accent})`, border: "none", borderRadius: 9, color: aiBusy || !aiPrompt.trim() ? T.inkFaint : "#fff", fontWeight: 600, fontSize: 13, cursor: aiBusy ? "wait" : "pointer", fontFamily: T.fontBody }}>
              {aiBusy ? <><Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} /> Generating…</> : <>Generate diagram</>}
            </button>
          </div>
        )}
      </div>

      {/* ── Context menu ── */}
      {ctxMenu && (
        <div onMouseDown={e => e.stopPropagation()}
          style={{ position: "fixed", left: ctxMenu.x, top: ctxMenu.y, zIndex: 200,
            background: T.panel, border: `1px solid ${T.panelBorder}`, borderRadius: 9,
            padding: 4, boxShadow: "0 8px 28px rgba(0,0,0,0.5)", minWidth: 150 }}>
          {ctxMenu.kind === "node" && <>
            <button onClick={() => { const n = nodes.find(x => x.id === ctxMenu.id); if (n) { snapshot(); setNodes(ns => [...ns.filter(x => x.id !== n.id), n]); } setCtxMenu(null); }}
              style={{ display:"flex", alignItems:"center", gap:8, width:"100%", padding:"7px 12px", background:"none", border:"none", borderRadius:6, color:T.ink, cursor:"pointer", fontSize:12.5, fontFamily:T.fontBody }}>
              <ArrowUpToLine size={13}/> Bring to front
            </button>
            <button onClick={() => { const n = nodes.find(x => x.id === ctxMenu.id); if (n) { snapshot(); setNodes(ns => [n, ...ns.filter(x => x.id !== n.id)]); } setCtxMenu(null); }}
              style={{ display:"flex", alignItems:"center", gap:8, width:"100%", padding:"7px 12px", background:"none", border:"none", borderRadius:6, color:T.ink, cursor:"pointer", fontSize:12.5, fontFamily:T.fontBody }}>
              <ArrowDownToLine size={13}/> Send to back
            </button>
            <div style={{ height:1, background:T.panelBorder, margin:"3px 0" }}/>
          </>}
          <button onClick={() => deleteById(ctxMenu.id, ctxMenu.kind)}
            style={{ display:"flex", alignItems:"center", gap:8, width:"100%", padding:"7px 12px", background:"none", border:"none", borderRadius:6, color:T.danger, cursor:"pointer", fontSize:12.5, fontFamily:T.fontBody }}>
            <Trash2 size={13}/> Delete
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------------- resize handles ---------------- */
function ResizeHandle({ dir, node, onDown }) {
  const base = { position: "absolute", background: "#FFFFFF", border: `2px solid ${T.accentDeep}`, zIndex: 3 };
  const styles = {
    e:  { ...base, right: -5, top: "50%", transform: "translateY(-50%)", width: 9, height: 22, borderRadius: 5, cursor: "ew-resize" },
    s:  { ...base, bottom: -5, left: "50%", transform: "translateX(-50%)", width: 22, height: 9, borderRadius: 5, cursor: "ns-resize" },
    se: { ...base, right: -6, bottom: -6, width: 12, height: 12, borderRadius: 4, cursor: "nwse-resize" },
  };
  return <div style={styles[dir]} onMouseDown={e => onDown(e, node, dir)} title="Drag to resize" />;
}
