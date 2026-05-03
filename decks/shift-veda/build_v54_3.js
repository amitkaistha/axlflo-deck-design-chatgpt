"use strict";

/**
 * SHIFT to Scale — v5.4.2 build
 * Principles applied:
 * - Guardrails, not cages: build.js owns creative composition.
 * - Number-led slides are used selectively as visual anchors, not everywhere.
 * - Icons are embedded inside content blocks when useful; avoid floating decoration.
 * - Cream boxes are soft emphasis: no left bars, max one per slide.
 * - Accent strips are 0.04" globally; tables/components do not get decorative side bars unless they are cards.
 * - Content fidelity is respected; layout adapts when content is dense.
 */

const pptxgen = require("pptxgenjs");
const fs = require("fs");
const path = require("path");
const E = require("../../lib/engine");

const repoRoot = path.resolve(__dirname, "../..");
const outDir = path.join(repoRoot, "output");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const pptxPath = path.join(outDir, "shift_to_scale_veda_proof_v54_2.pptx");
const manifestPath = path.join(outDir, "shift_to_scale_veda_proof_v54_2_manifest.json");

const pptx = new pptxgen();
pptx.author = "Amit Kaistha, AxlFlo";
pptx.company = "AxlFlo LLC";
pptx.subject = "SHIFT to Scale — VEDA proof deck";
pptx.title = "SHIFT to Scale — Every Player. Messi-Level.";
pptx.lang = "en-US";
pptx.theme = { headFontFace:"Segoe UI", bodyFontFace:"Segoe UI", lang:"en-US" };
pptx.defineLayout({ name:"AXLFLO", width:10, height:5.625 });
pptx.layout = "AXLFLO";
pptx.margin = 0;
pptx.layout = "AXLFLO";

const C = E.C;
const SEQ = E.SEQ;
const FOOTER = "SHIFT to Scale™ is a proprietary framework by AxlFlo LLC.";
const DISCLAIMER = "SHIFT to SCALE is a proprietary framework by AxlFlo LLC";
const ENGINE_VERSION = "AxlFlo Deck Engine v5.4.2";
const BUILD_VERSION = "Build v5.4.2 · pptxgenjs 3.12.0 · May 2026";
const CREAM_BORDER = "E0D6B8";
const STRIP = 0.04;

function spaced(s) { return String(s || "").toUpperCase().split("").join(" "); }

function darkBase(sl, gb) { sl.background = { color:C.inkNavy }; E.addGradBar(sl, gb); }
function whiteBase(sl, gb, tag, title) {
  sl.background = { color:C.white };
  E.addGradBar(sl, gb);
  sl.addShape(pptx.ShapeType.rect, { x:0.04, y:0, w:9.96, h:1.12, fill:{ color:C.inkNavy } });
  sl.addText(spaced(tag), { x:0.25, y:0.07, w:9.4, h:0.22, fontFace:"Segoe UI", fontSize:9, charSpacing:3, color:C.coolGrey, margin:0 });
  sl.addText(title, { x:0.25, y:0.30, w:9.4, h:0.65, fontFace:"Segoe UI", fontSize:26, bold:true, color:C.white, margin:0, fit:"shrink" });
}
function addDarkTitle(sl, tag, title, size=27) {
  E.addSectionLabel(sl, spaced(tag));
  sl.addText(title, { x:0.22, y:0.40, w:9.35, h:0.62, fontFace:"Segoe UI", fontSize:size, bold:true, color:C.white, margin:0, fit:"shrink" });
}
function addFooter(sl, num, dark=true, text=FOOTER) {
  if (dark) E.addDarkFooter(sl, text, num);
  else {
    sl.addShape(pptx.ShapeType.rect, { x:0.04, y:5.27, w:9.96, h:0.355, fill:{ color:C.inkNavy } });
    sl.addText(text, { x:0.2, y:5.29, w:8.8, h:0.26, fontFace:"Segoe UI", fontSize:11, italic:true, color:C.mustardGold, margin:0, fit:"shrink" });
    sl.addText(String(num), { x:9.3, y:5.29, w:0.5, h:0.26, fontFace:"Segoe UI", fontSize:9, color:C.coolGrey, align:"right", margin:0 });
  }
}
function addCreamQuote(sl, text, y, h=0.55, fontSize=12.2) {
  // Cream box rule: no accent bar, soft border + shadow, max one cream box per slide.
  sl.addShape(pptx.ShapeType.rect, { x:0.35, y, w:9.25, h, fill:{ color:C.cream }, line:{ color:CREAM_BORDER, width:0.5 }, shadow:E.shadow() });
  sl.addText(text, { x:0.55, y:y+0.09, w:8.85, h:h-0.15, fontFace:"Segoe UI", fontSize, italic:true, color:C.cardNavy, margin:0, fit:"shrink", valign:"mid" });
}
function addBottomBar(sl, text, y=4.64, dark=true) {
  sl.addShape(pptx.ShapeType.rect, { x:0.22, y, w:9.52, h:0.44, fill:{ color:C.cream }, line:{ color:CREAM_BORDER, width:0.5 }, shadow:E.shadow() });
  sl.addText(text, { x:0.42, y:y+0.08, w:9.05, h:0.25, fontFace:"Segoe UI", fontSize:12.4, bold:true, color:C.inkNavy, margin:0, fit:"shrink", align:"center" });
}
function addPlainBottomLine(sl, text, y=4.55, dark=true) {
  sl.addText(text, { x:0.55, y, w:8.9, h:0.28, fontFace:"Segoe UI", fontSize:13, italic:true, color: dark ? C.mustardGold : C.inkNavy, margin:0, fit:"shrink", align:"center" });
}
function addCard(sl, x, y, w, h, stripe, heading, body, opts={}) {
  const fill = opts.fill || C.cardNavy;
  const line = opts.line || C.cardBorder;
  const headingColor = opts.headingColor || C.white;
  const bodyColor = opts.bodyColor || C.white;
  const fsH = opts.headingSize || 12.6;
  const fsB = opts.bodySize || 10.8;
  sl.addShape(pptx.ShapeType.rect, { x, y, w, h, fill:{ color:fill }, line:{ color:line, width:0.5 }, shadow:E.shadow() });
  if (stripe) sl.addShape(pptx.ShapeType.rect, { x, y, w:STRIP, h, fill:{ color:stripe } });
  const icon = opts.icon;
  const iconGap = icon ? 0.48 : 0;
  if (icon) {
    sl.addText(icon, { x:x+0.14, y:y+0.14, w:0.45, h:0.42, fontFace:"Segoe UI Symbol", fontSize:opts.iconSize||24, bold:true, color:opts.iconColor||C.white, margin:0, align:"center", valign:"mid", fit:"shrink" });
  }
  if (heading) sl.addText(heading, { x:x+0.13+iconGap, y:y+0.10, w:w-0.24-iconGap, h:0.29, fontFace:"Segoe UI", fontSize:fsH, bold:true, color:headingColor, margin:0, fit:"shrink" });
  if (body) sl.addText(body, { x:x+0.13, y:y+(heading?0.50:0.12), w:w-0.24, h:h-(heading?0.58:0.2), fontFace:"Segoe UI", fontSize:fsB, color:bodyColor, margin:0, fit:"shrink", breakLine:false, valign:"top" });
}
function addStatCard(sl, x, y, w, h, stat, label, color) {
  sl.addShape(pptx.ShapeType.rect, { x, y, w, h, fill:{ color:C.white }, line:{ color:"E1E4F0", width:0.5 }, shadow:E.shadow() });
  sl.addShape(pptx.ShapeType.rect, { x, y, w, h:STRIP, fill:{ color } });
  sl.addText(stat, { x:x+0.18, y:y+0.43, w:w-0.36, h:0.58, fontFace:"Segoe UI", fontSize:40, bold:true, color, align:"center", margin:0, fit:"shrink" });
  sl.addText(label, { x:x+0.25, y:y+1.25, w:w-0.5, h:0.55, fontFace:"Segoe UI", fontSize:11, color:"444444", align:"center", margin:0, fit:"shrink" });
}
function addVersionPill(sl, text, x, y, w, color) {
  sl.addShape(pptx.ShapeType.rect, { x, y, w, h:0.23, fill:{ color }, line:{ color, width:0.5 } });
  sl.addText(text, { x:x+0.05, y:y+0.065, w:w-0.1, h:0.1, fontFace:"Segoe UI", fontSize:7.5, bold:true, color:C.white, align:"center", margin:0, fit:"shrink" });
}
function addFileComponent(sl, x, y, w, h, file, body, type, color, icon) {
  const live = type === "Live";
  const fill = live ? "FFF9EC" : "F4F6FF";
  const border = live ? "C07010" : C.borderLight;
  sl.addShape(pptx.ShapeType.rect, { x, y, w, h, fill:{ color:fill }, line:{ color:border, width:0.55 }, shadow:E.shadow() });
  sl.addText(icon, { x:x+0.15, y:y+0.20, w:0.36, h:0.32, fontFace:"Segoe UI Symbol", fontSize:22, bold:true, color, align:"center", margin:0, fit:"shrink" });
  sl.addText(file, { x:x+0.65, y:y+0.15, w:w-2.0, h:0.18, fontFace:"Segoe UI", fontSize:9.2, bold:true, color, margin:0, fit:"shrink" });
  sl.addText(body, { x:x+0.65, y:y+0.42, w:w-0.9, h:h-0.48, fontFace:"Segoe UI", fontSize:8.5, color:"4D4D4D", margin:0, fit:"shrink", breakLine:false });
  addVersionPill(sl, type, x+w-1.4, y+0.10, 1.2, live ? "C07010" : "BDB2E9");
}

function addSlide1(gb) {
  const sl = pptx.addSlide(); darkBase(sl, gb); E.addLogoArea(sl, pptx);
  sl.addText("SHIFT to Scale™", { x:0.45, y:0.72, w:5.7, h:0.65, fontFace:"Segoe UI", fontSize:40, bold:true, color:C.white, margin:0, fit:"shrink" });
  sl.addShape(pptx.ShapeType.rect, { x:0.45, y:1.55, w:5.45, h:0.36, fill:{ color:C.cardNavy }, line:{ color:C.cardBorder, width:0.5 } });
  sl.addText("From Prompt to System. From Individual to Enterprise.", { x:0.62, y:1.67, w:5.1, h:0.12, fontFace:"Segoe UI", fontSize:11.5, color:C.coolGrey, margin:0, fit:"shrink" });
  sl.addText("AI adoption starts with a SHIFT. ROI requires a System.", { x:0.45, y:2.18, w:5.6, h:0.34, fontFace:"Segoe UI", fontSize:17, color:C.white, margin:0, fit:"shrink" });
  sl.addShape(pptx.ShapeType.rect, { x:0.45, y:2.82, w:4.95, h:0.035, fill:{ color:C.purple } });
  sl.addText("Amit Kaistha · amit.kaistha@axlflo.ai", { x:0.45, y:3.12, w:5.4, h:0.23, fontFace:"Segoe UI", fontSize:11.5, color:C.coolGrey, margin:0, fit:"shrink" });
  E.addTitleFooter(sl, DISCLAIMER, "Every player. Messi-level. That's the system.", 1);
  return { num:1, type:"T", label:"Cover", bg:"dark", gradientBar:true };
}

function addSlide2(gb) {
  const sl = pptx.addSlide(); whiteBase(sl, gb, "THE REAL QUESTION", "Every Team Has a Messi. Not Every Team Wins.");
  sl.addText("The best AI user in your organisation is already saving 3–4 hours a week. They've figured out the prompts. They've redesigned their workflow. They produce output nobody else can match.\n\nAnd that's exactly the problem.\n\nWhen AI performance depends on one exceptional individual — it isn't a capability. It's a dependency. The moment that person leaves, the performance goes with them.\n\nGreat football teams aren't built around one player's genius. They're built around a system that makes every player perform at their ceiling. The same principle applies to enterprise AI.", { x:0.42, y:1.35, w:5.1, h:2.78, fontFace:"Segoe UI", fontSize:12.2, color:C.inkNavy, margin:0, fit:"shrink", breakLine:false });
  addCreamQuote(sl, "\"Messi didn't make Barcelona great. Barcelona's system made Messi unstoppable — and turned every player around him into a champion.\"", 4.2, 0.55, 12.2);
  sl.addShape(pptx.ShapeType.ellipse, { x:6.2, y:1.55, w:2.8, h:2.8, fill:{ color:C.cardWhite }, line:{ color:C.borderLight, width:0.5 }, shadow:E.shadow() });
  sl.addText("1", { x:6.65, y:1.78, w:1.9, h:1.0, fontFace:"Segoe UI", fontSize:70, bold:true, color:C.indigoBlue, align:"center", margin:0 });
  sl.addText("GREAT PLAYER", { x:6.45, y:2.77, w:2.25, h:0.18, fontFace:"Segoe UI", fontSize:11, bold:true, color:C.inkNavy, align:"center", margin:0 });
  sl.addText("≠", { x:7.15, y:3.03, w:0.8, h:0.4, fontFace:"Segoe UI", fontSize:28, bold:true, color:C.purple, align:"center", margin:0 });
  sl.addText("GREAT SYSTEM", { x:6.45, y:3.42, w:2.25, h:0.18, fontFace:"Segoe UI", fontSize:11, bold:true, color:C.fieryCoral, align:"center", margin:0 });
  addFooter(sl, 2, false, "The dependency is the risk. The system is the asset.");
  return { num:2, type:"N", label:"Hook", bg:"white", gradientBar:true };
}

function addSlide3(gb) {
  const sl = pptx.addSlide(); darkBase(sl, gb); addDarkTitle(sl, "THE PROBLEM", "Most AI Deployments Create Stars. Not Systems.");
  const cards = [
    ["⚡", "The Prompt Dependency", "Output quality is determined by who's asking. The power user gets great results. Everyone else gets noise. The gap widens every week."],
    ["☰", "Context Lives in the Conversation", "Rules exist in someone's head. Every session starts from scratch. There's no institutional memory — no way to make expert learning available to the next person."],
    ["↯", "Drift Is Invisible Until It's Expensive", "Rules accumulate informally. Outputs become inconsistent. Nobody knows what changed or when. The system looked fine until it didn't."]
  ];
  cards.forEach((c,i)=>addCard(sl, 0.28+i*3.18, 1.35, 2.95, 2.55, SEQ[3][i], c[1], c[2], { icon:c[0], bodySize:10.8, headingSize:12.0 }));
  addBottomBar(sl, "This is not a technology problem. It is a design problem. And it compounds.", 4.32, true);
  addFooter(sl, 3, true, "The first failure is treating personal expertise as enterprise capability.");
  return { num:3, type:"I", label:"Problem", bg:"dark", gradientBar:true };
}

function addSlide4(gb) {
  const sl = pptx.addSlide(); whiteBase(sl, gb, "THE COST OF WAITING", "Every Week Without a System, the Gap Widens.");
  const stats = [
    ["70%", "of AI pilots never reach full production scale", C.indigoBlue],
    ["11%", "of employees become power users within 6 months", C.deepIndigo],
    ["4.3×", "gap in time savings between power users and everyone else", C.darkMagenta],
    ["0", "organisations that closed the gap through training alone", C.fieryCoral]
  ];
  stats.forEach((s,i)=>addStatCard(sl, 0.22+i*2.45, 1.42, 2.28, 2.75, s[0], s[1], s[2]));
  addPlainBottomLine(sl, "The adoption gap is not a training problem. It is a structural problem. Without a system, your best people get better and everyone else stays flat — permanently.", 4.42, false);
  addFooter(sl, 4, false, "Numbers should reveal the operating problem, not decorate the slide.");
  return { num:4, type:"D", label:"Cost of Waiting", bg:"white", gradientBar:true };
}

function addSlide5(gb) {
  const sl = pptx.addSlide(); darkBase(sl, gb); addDarkTitle(sl, "THE CORE TRUTH", "AI Is an Amplifier.", 34);
  sl.addText("It Amplifies Everything — Including the Mess.", { x:0.22, y:1.08, w:8.5, h:0.35, fontFace:"Segoe UI", fontSize:17.5, italic:true, color:C.mustardGold, margin:0, fit:"shrink" });
  const cards = [
    ["✓", "Strong systems get stronger.", "A well-designed workflow through AI produces consistent, high-quality output at speed. It compounds — every user who follows the system makes it better."],
    ["!", "Broken systems break faster.", "A disorganised process run through AI produces disorganised output — at higher volume and higher speed. AI doesn't fix broken. It scales it."],
    ["↗", "The gap widens by default.", "Without a system, your best people get better. Everyone else stays flat. The adoption gap is structural — it does not close on its own."]
  ];
  cards.forEach((c,i)=>addCard(sl, 0.28+i*3.18, 1.63, 2.95, 2.65, SEQ[3][i], c[1], c[2], { icon:c[0], iconSize:26, bodySize:10.6, headingSize:11.7 }));
  addFooter(sl, 5, true, "The question is not whether your people are using AI. It's what the AI is amplifying.");
  return { num:5, type:"I", label:"Core Truth", bg:"dark", gradientBar:true };
}

function addSlide6(gb) {
  const sl = pptx.addSlide(); darkBase(sl, gb); addDarkTitle(sl, "THE SHIFT IN THINKING", "What If Enterprise AI Doesn't Live in Software at All?", 26.5);
  addCreamQuote(sl, "\"Most people using AI are prompting. Very few are engineering.\"", 1.18, 0.50, 13);
  sl.addText("Most organisations are searching for the right tool. The right licence. The right vendor. The right dashboard.\n\nThat's the wrong search.\n\nThe companies getting real results from AI are not running better software. They are running better systems. Structured context — logic, rules, governance — stored in a form that AI can read, execute against, and maintain consistently across every user, every session, every day.", { x:0.35, y:1.90, w:5.45, h:2.12, fontFace:"Segoe UI", fontSize:11.8, color:C.white, margin:0, fit:"shrink", breakLine:false });
  addCard(sl, 6.15, 1.85, 3.35, 0.62, C.indigoBlue, "Storage + permissions + logic", "the new software", { icon:"▦", bodySize:11.2, headingSize:11.6 });
  addCard(sl, 6.15, 2.62, 3.35, 0.62, C.purple, "The flat file", "the operating system", { icon:"▤", bodySize:11.2, headingSize:11.6 });
  addCard(sl, 6.15, 3.39, 3.35, 0.62, C.fieryCoral, "The AI", "the engine", { icon:"⚙", bodySize:11.2, headingSize:11.6 });
  addPlainBottomLine(sl, "The system is what scales.", 4.47, true);
  addFooter(sl, 6, true, "The next enterprise application may just be structured context.");
  return { num:6, type:"N", label:"Insight", bg:"dark", gradientBar:true };
}

function addSlide7(gb) {
  const sl = pptx.addSlide(); whiteBase(sl, gb, "THE FRAMEWORK", "SHIFT to Scale™ — Five Pillars. One System.");
  sl.addText("SHIFT is not a training programme. It is a change architecture — designed to move AI from individual performance to enterprise capability.", { x:0.35, y:1.20, w:9.3, h:0.28, fontFace:"Segoe UI", fontSize:11.3, italic:true, color:C.inkNavy, margin:0, fit:"shrink" });
  const rows = [
    ["S", "Strategise", "Define use cases by role before deploying AI. Align to business outcomes, not feature lists.", "Deployment becomes a solution looking for a problem. Adoption never sticks."],
    ["H", "Habits & Champions", "Build a network of peer champions who model new behaviour in real workflows — not trainers, peers.", "Knowledge stays with the power user. The adoption gap never closes."],
    ["I", "Implement", "Deploy with governance: output review protocols, quality gates, rules about how rules change.", "AI produces volume, not value. Quality is inconsistent. Trust erodes."],
    ["F", "Fluency by Role", "Role-specific prompt libraries, workflow templates, execution cards. Right depth for the right moment.", "Generic AI training produces generic results. The gap between expert and average stays wide."],
    ["T", "Track & Prove", "Measure behaviour change, output quality, and ROI — not just logins and licences activated.", "The programme dies in the next budget cycle. Adoption is claimed. ROI is not proven."]
  ];
  const y0=1.62, rh=0.53;
  rows.forEach((r,i)=>{
    const y=y0+i*(rh+0.06), color=SEQ[5][i];
    sl.addShape(pptx.ShapeType.rect, { x:0.35, y, w:9.3, h:rh, fill:{ color:i%2?C.lightTint:C.white }, line:{ color:"E8EAF6", width:0.35 } });
    sl.addShape(pptx.ShapeType.rect, { x:0.35, y, w:STRIP, h:rh, fill:{ color } });
    sl.addText(r[0], { x:0.52, y:y+0.13, w:0.24, h:0.2, fontFace:"Segoe UI", fontSize:15, bold:true, color:color, align:"center", margin:0 });
    sl.addText(r[1], { x:0.92, y:y+0.09, w:1.45, h:0.24, fontFace:"Segoe UI", fontSize:10.5, bold:true, color:C.inkNavy, margin:0, fit:"shrink" });
    sl.addText(r[2], { x:2.55, y:y+0.07, w:3.2, h:0.34, fontFace:"Segoe UI", fontSize:8.2, color:C.inkNavy, margin:0, fit:"shrink" });
    sl.addText(r[3], { x:5.95, y:y+0.07, w:3.45, h:0.34, fontFace:"Segoe UI", fontSize:8.2, color:C.inkNavy, margin:0, fit:"shrink" });
  });
  addBottomBar(sl, "SHIFT is the journey. Scale is the destination.", 4.54, false);
  addFooter(sl, 7, false, "Five pillars. One operating system for adoption.");
  return { num:7, type:"F", label:"Framework", bg:"white", gradientBar:true };
}

function addSlide8(gb) {
  const sl = pptx.addSlide(); darkBase(sl, gb); addDarkTitle(sl, "SHIFT IN PRACTICE", "We Built It. Here Is What We Learned.", 28);
  sl.addText("A complex AI system — built from scratch, governed by a rulebook, versioned across every iteration, validated by a QA gate before any major version shipped. No vendor. No SaaS. Five design decisions.", { x:0.30, y:1.12, w:9.1, h:0.43, fontFace:"Segoe UI", fontSize:11.2, italic:true, color:C.coolGrey, margin:0, fit:"shrink" });
  const cards = [
    ["01", "Separate the concern", "Logic lives in a file. The conversation is execution. Rules are read from a governed source — never re-stated per session."],
    ["02", "Version everything", "Every rule change is logged, dated, rationale-documented. When something breaks, you know exactly what changed and when."],
    ["03", "Govern how rules change", "Rules need meta-rules. What triggers a version bump? What requires full review? What can ship as a patch?"],
    ["04", "Build a QA gate", "Before any major version ships, 20 functional tests run. If any fail, the version doesn't ship."],
    ["05", "Separate execution from governance", "The daily doc is not the rules doc. One is for speed. The other is for integrity. They must stay separate."]
  ];
  [[0.30,1.80,4.7,1.18],[5.20,1.80,4.45,1.18],[0.30,3.25,2.98,1.20],[3.52,3.25,2.98,1.20],[6.74,3.25,2.91,1.20]].forEach((b,i)=>{
    const [x,y,w,h]=b, col=SEQ[5][i], c=cards[i];
    sl.addShape(pptx.ShapeType.rect, { x, y, w, h, fill:{ color:C.cardNavy }, line:{ color:C.cardBorder, width:0.5 }, shadow:E.shadow() });
    sl.addShape(pptx.ShapeType.rect, { x, y, w, h:STRIP, fill:{ color:col } });
    sl.addText(c[0], { x:x+0.16, y:y+0.18, w:0.56, h:0.24, fontFace:"Segoe UI", fontSize:16, bold:true, color:C.mustardGold, margin:0 });
    sl.addText(c[1], { x:x+0.16, y:y+0.55, w:w-0.3, h:0.18, fontFace:"Segoe UI", fontSize:11.3, bold:true, color:C.white, margin:0, fit:"shrink" });
    sl.addText(c[2], { x:x+0.16, y:y+0.81, w:w-0.28, h:0.30, fontFace:"Segoe UI", fontSize:i<2?8.9:8.2, color:C.coolGrey, margin:0, fit:"shrink", breakLine:false });
  });
  addFooter(sl, 8, true, "Proof matters more than posture.");
  return { num:8, type:"I", label:"Proof of Concept", bg:"dark", gradientBar:true };
}

function addSlide9(gb) {
  const sl = pptx.addSlide(); whiteBase(sl, gb, "THE ARCHITECTURE", "A Flat File Is Not a Document. It's an Operating System.");
  sl.addText("Every file has a role. Every role has a boundary. Nothing overlaps — by design.", { x:0.35, y:1.18, w:8.6, h:0.23, fontFace:"Segoe UI", fontSize:11, italic:true, color:"555555", margin:0 });
  const left = [
    ["ENGINE.md", "Source of truth. AI reads this every session. Never overridden by the conversation.", "Versioned", C.indigoBlue, "⚙"],
    ["VALIDATION.md", "Captures cases the engine doesn't cover. Prevents silent failures.", "Versioned", C.deepIndigo, "▣"],
    ["QUICKREF.md", "60–70% faster to load. Built for the operator. Fluency by role, built in.", "Versioned", C.purple, "☷"],
    ["SECTOR.md", "Separates context from core logic. Updated independently.", "Versioned", C.darkMagenta, "▰"]
  ];
  const right = [
    ["RULEBOOK.md", "The constitution. Governs all other files. The system's immune system.", "Versioned", C.fieryCoral, "▐"],
    ["TEST_SUITE.md", "The gate. No major version ships without 20/20 passing. Named after real incidents.", "Versioned", C.indigoBlue, "◇"],
    ["LOG.md", "Institutional memory. What ran, failed, corrected. Never deleted.", "Live", "C07010", "●"],
    ["CHANGELOG.md", "The system's biography. Audit trail.", "Live", "C07010", "↗"]
  ];
  left.forEach((r,i)=>addFileComponent(sl, 0.35, 1.58+i*0.78, 4.55, 0.58, ...r));
  right.forEach((r,i)=>addFileComponent(sl, 5.15, 1.58+i*0.78, 4.55, 0.58, ...r));
  addFooter(sl, 9, false, "Live files update continuously. Versioned files change only with intent. The separation is the governance model.");
  return { num:9, type:"D", label:"Architecture", bg:"white", gradientBar:true };
}

function addSlide10(gb) {
  const sl = pptx.addSlide(); darkBase(sl, gb); addDarkTitle(sl, "THE OUTCOME", "The Goal Was Never One Messi. It Was a Team Where Everyone Plays Like One.", 23.5);
  sl.addText("When the expertise is in the architecture — not the operator — something changes. A junior analyst and a senior director working from the same system produce the same quality of output. New team members onboard in days because the system carries the institutional knowledge.", { x:0.35, y:1.15, w:8.9, h:0.76, fontFace:"Segoe UI", fontSize:11.2, color:C.coolGrey, margin:0, fit:"shrink", breakLine:false });
  const cards = [
    ["✓", "Consistent output across every operator.", "The best practice is in the file, not the person. Everyone executes from the same playbook."],
    ["⟳", "Institutional memory that compounds.", "Every refinement, corrected edge case and lesson learned is documented, versioned and available from day one."],
    ["↘", "Onboarding time cut dramatically.", "New team members don't start from scratch. They start from the system. Ramp time measured in days, not quarters."]
  ];
  cards.forEach((c,i)=>addCard(sl, 0.28+i*3.18, 2.12, 2.95, 1.45, SEQ[3][i], c[1], c[2], { icon:c[0], headingSize:11.1, bodySize:9.5 }));
  addBottomBar(sl, "You don't build a world-class team by finding better players. You build one by designing a system that elevates every player you have.", 4.33, true);
  addFooter(sl, 10, true, "The system makes excellence transferable.");
  return { num:10, type:"N", label:"Messi Payoff", bg:"dark", gradientBar:true };
}

function addSlide11(gb) {
  const sl = pptx.addSlide(); whiteBase(sl, gb, "THE PATH", "12 Months From Prompt to System");
  const phases = [
    ["01", "Weeks 1–6", "Diagnose & Design", "Audit usage by role. Identify expertise dependency. Define 3–5 priority use cases. Begin governance design."],
    ["02", "Weeks 7–16", "Architect & Activate", "Build system structure. Role execution cards. Champions network. Rulebook and logic files. Baseline metrics."],
    ["03", "Weeks 17–32", "Scale & Govern", "Deploy across teams. Champions carry it forward. Onboarding updates. QA gate runs. Version governance live."],
    ["04", "Weeks 33–52", "Prove & Extend", "ROI documentation. Regressions logged and tested. System extended to next use cases. Continuous improvement begins."]
  ];
  phases.forEach((p,i)=>{
    const x = 0.35+i*2.35, col = SEQ[4][i];
    sl.addShape(pptx.ShapeType.rect, { x, y:1.34, w:2.15, h:2.90, fill:{ color:C.cardWhite }, line:{ color:C.borderLight, width:0.5 }, shadow:E.shadow() });
    sl.addShape(pptx.ShapeType.rect, { x, y:1.34, w:2.15, h:STRIP, fill:{ color:col } });
    sl.addText(p[0], { x:x+0.16, y:1.58, w:1.8, h:0.38, fontFace:"Segoe UI", fontSize:26, bold:true, color:col, align:"center", margin:0 });
    sl.addText(p[1], { x:x+0.18, y:2.06, w:1.78, h:0.16, fontFace:"Segoe UI", fontSize:9.2, bold:true, color:col, align:"center", margin:0, fit:"shrink" });
    sl.addText(p[2], { x:x+0.16, y:2.35, w:1.83, h:0.26, fontFace:"Segoe UI", fontSize:11.3, bold:true, color:C.inkNavy, align:"center", margin:0, fit:"shrink" });
    sl.addText(p[3], { x:x+0.16, y:2.85, w:1.83, h:0.84, fontFace:"Segoe UI", fontSize:7.7, color:C.inkNavy, margin:0, fit:"shrink", breakLine:false, valign:"top" });
  });
  addBottomBar(sl, "\"Adoption is not a training event. It is a system design project with a beginning, a middle, and proof.\"", 4.57, false);
  addFooter(sl, 11, false, "The roadmap turns usage into capability.");
  return { num:11, type:"P", label:"Roadmap", bg:"white", gradientBar:true };
}

function addSlide12(gb) {
  const sl = pptx.addSlide(); darkBase(sl, gb); addDarkTitle(sl, "HOW IT SCALES", "Built to Scale. Not Because It's Big. Because It's Designed Right.", 25.5);
  sl.addText("Most AI programmes are designed for pilots. This is designed for production. The difference is not ambition. It is architecture.", { x:0.30, y:1.08, w:9.0, h:0.32, fontFace:"Segoe UI", fontSize:11.2, italic:true, color:C.coolGrey, margin:0, fit:"shrink" });
  const cards = [
    ["▦", "Systematised fluency.", "Role-specific execution cards take what one person figured out and make it available to five hundred."],
    ["●", "A champions network that compounds.", "Champions are the feedback loop — collecting what breaks, what works, and what the system doesn't yet cover."],
    ["⚙", "Governance that grows with the organisation.", "The rulebook, QA gate and changelog get more valuable with every version."]
  ];
  cards.forEach((c,i)=>addCard(sl, 0.28+i*3.18, 1.58, 2.95, 1.55, SEQ[3][i], c[1], c[2], { icon:c[0], bodySize:9.7, headingSize:11.3 }));
  addStatCard(sl, 0.45, 3.48, 2.9, 0.86, "1–6", "Use case definition + governance design → 10–20 pilot users", C.indigoBlue);
  addStatCard(sl, 3.55, 3.48, 2.9, 0.86, "7–16", "Champions network → 100–300 users", C.purple);
  addStatCard(sl, 6.65, 3.48, 2.9, 0.86, "17–52", "Full deployment → enterprise-wide with documented ROI", C.fieryCoral);
  addFooter(sl, 12, true, "Pilots test possibility. Systems produce repeatability.");
  return { num:12, type:"D", label:"How It Scales", bg:"dark", gradientBar:true };
}

function addSlide13(gb) {
  const sl = pptx.addSlide(); darkBase(sl, gb); E.addLogoArea(sl, pptx);
  sl.addText("Let's Build Your AI System. Not Just Your AI Adoption.", { x:0.42, y:0.38, w:5.45, h:0.70, fontFace:"Segoe UI", fontSize:24.5, bold:true, color:C.white, margin:0, fit:"shrink" });
  sl.addShape(pptx.ShapeType.rect, { x:0.42, y:1.20, w:5.15, h:0.035, fill:{ color:C.fieryCoral } });
  sl.addText("AxlFlo is an advisory firm that helps organisations move from AI experimentation to AI that runs their operations. We don't sell software. We build the system that makes your AI investment pay off.", { x:0.42, y:1.38, w:5.15, h:0.64, fontFace:"Segoe UI", fontSize:11.1, color:C.coolGrey, margin:0, fit:"shrink", breakLine:false });
  sl.addText("Every player. Messi-level. That's the system.", { x:0.42, y:2.18, w:5.15, h:0.34, fontFace:"Segoe UI", fontSize:17, bold:true, color:C.mustardGold, margin:0, fit:"shrink" });
  const tiers = [
    ["01", "Discovery Session", "Free · 60 min", "We map your current AI usage, identify where output depends on individual expertise, and show you what a governed system looks like for your organisation."],
    ["02", "SHIFT Sprint", "8 weeks", "Use cases defined. Execution cards built. Champions activated. Governance live. Your first cohort producing consistent, measurable results."],
    ["03", "Full Scale Programme", "12 months", "End-to-end system architecture. Champions network. QA gate. Version governance. ROI reporting. The full build — from prompt to system."]
  ];
  tiers.forEach((t,i)=>{
    const y = 0.62 + i*1.12, col = SEQ[3][i];
    sl.addShape(pptx.ShapeType.rect, { x:6.05, y, w:3.6, h:0.92, fill:{ color:C.cardNavy }, line:{ color:C.cardBorder, width:0.5 }, shadow:E.shadow() });
    sl.addShape(pptx.ShapeType.rect, { x:6.05, y, w:STRIP, h:0.92, fill:{ color:col } });
    sl.addText(t[0], { x:6.20, y:y+0.18, w:0.48, h:0.26, fontFace:"Segoe UI", fontSize:18, bold:true, color:col, margin:0, fit:"shrink" });
    sl.addText(t[1], { x:6.78, y:y+0.13, w:1.82, h:0.20, fontFace:"Segoe UI", fontSize:11.2, bold:true, color:C.white, margin:0, fit:"shrink" });
    sl.addText(t[2], { x:8.62, y:y+0.13, w:0.82, h:0.20, fontFace:"Segoe UI", fontSize:9.4, bold:true, color:C.coolGrey, align:"right", margin:0, fit:"shrink" });
    sl.addText(t[3], { x:6.78, y:y+0.40, w:2.72, h:0.34, fontFace:"Segoe UI", fontSize:8.2, color:C.coolGrey, margin:0, fit:"shrink", breakLine:false });
  });
  sl.addText("Amit Kaistha · Founder, AxlFlo", { x:0.42, y:3.88, w:5.0, h:0.20, fontFace:"Segoe UI", fontSize:11.3, bold:true, color:C.white, margin:0, fit:"shrink" });
  sl.addText("amit.kaistha@axlflo.ai · axlflo.ai", { x:0.42, y:4.17, w:5.0, h:0.20, fontFace:"Segoe UI", fontSize:11, color:C.coolGrey, margin:0, fit:"shrink" });
  E.addTitleFooter(sl, DISCLAIMER, "Every player. Messi-level. That's the system.", 13);
  return { num:13, type:"X", label:"CTA", bg:"dark", gradientBar:true };
}

function addSlide14(gb) {
  const sl = pptx.addSlide(); darkBase(sl, gb);
  sl.addText("Disclaimer", { x:0.62, y:0.65, w:4.8, h:0.55, fontFace:"Segoe UI", fontSize:30, bold:true, color:C.white, margin:0, fit:"shrink" });
  const disclaimer = [
    "SHIFT to SCALE is a proprietary framework developed by AxlFlo LLC. All methodologies, processes, playbooks and training content described in this document are the intellectual property of AxlFlo and may not be reproduced, distributed or repurposed without written consent.",
    "This document is for informational and proposal purposes only. The case studies, metrics and outcomes presented are based on prior engagements and are not guarantees of future results. Performance outcomes depend on organizational readiness, executive sponsorship, technology environment and deployment scope.",
    "Microsoft, Microsoft 365, Copilot, Viva, Azure, Teams, SharePoint and related trademarks are the property of Microsoft Corporation. AxlFlo is an independent consultancy and is not affiliated with or endorsed by Microsoft unless explicitly stated.",
    "All data cited from third-party sources is attributed where applicable and used under fair-use principles for educational and advisory purposes.",
    "For questions regarding licensing, usage rights or partnership terms, please contact amit.kaistha@axlflo.ai"
  ].join("\n\n");
  sl.addText(disclaimer, { x:0.62, y:1.45, w:8.45, h:2.78, fontFace:"Segoe UI", fontSize:11.1, color:C.coolGrey, margin:0, fit:"shrink", breakLine:false, valign:"top" });
  sl.addShape(pptx.ShapeType.rect, { x:0.62, y:1.24, w:3.4, h:0.035, fill:{ color:C.fieryCoral } });
  sl.addText("Built on AxlFlo Master Design System v5.4", { x:0.45, y:5.03, w:4.0, h:0.16, fontFace:"Segoe UI", fontSize:8, italic:true, color:C.mustardGold, margin:0, fit:"shrink" });
  sl.addText(`Deck Engine: ${ENGINE_VERSION} · ${BUILD_VERSION}`, { x:0.45, y:5.22, w:6.7, h:0.16, fontFace:"Segoe UI", fontSize:7.5, color:"6F7895", margin:0, fit:"shrink" });
  sl.addText("SHIFT to SCALE is a proprietary framework by AxlFlo LLC", { x:0.45, y:5.42, w:5.5, h:0.15, fontFace:"Segoe UI", fontSize:7.5, color:C.coolGrey, margin:0, fit:"shrink" });
  sl.addText("14", { x:9.32, y:5.38, w:0.45, h:0.16, fontFace:"Segoe UI", fontSize:8.5, color:C.coolGrey, align:"right", margin:0 });
  return { num:14, type:"S", label:"Disclaimer", bg:"dark", gradientBar:true };
}

(async () => {
  const gb = await E.makeGradientBar();
  const slides = [
    addSlide1(gb), addSlide2(gb), addSlide3(gb), addSlide4(gb),
    addSlide5(gb), addSlide6(gb), addSlide7(gb), addSlide8(gb),
    addSlide9(gb), addSlide10(gb), addSlide11(gb), addSlide12(gb),
    addSlide13(gb), addSlide14(gb)
  ];
  await pptx.writeFile({ fileName:pptxPath });
  fs.writeFileSync(manifestPath, JSON.stringify({ expectedSlides:slides.length, slides }, null, 2));
  console.log("Built", pptxPath);
  console.log("Manifest", manifestPath);
})();
