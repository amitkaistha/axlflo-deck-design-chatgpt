"use strict";

const pptxgen = require("pptxgenjs");
const fs = require("fs");
const path = require("path");
const E = require("../../lib/engine");

const repoRoot = path.resolve(__dirname, "../..");
const outDir = path.join(repoRoot, "output");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const pptxPath = path.join(outDir, "shift_to_scale_veda_proof_v54.pptx");
const manifestPath = path.join(outDir, "shift_to_scale_veda_proof_v54_manifest.json");

const pptx = new pptxgen();
pptx.author = "Amit Kaistha, AxlFlo";
pptx.company = "AxlFlo LLC";
pptx.subject = "SHIFT to Scale — VEDA proof deck";
pptx.title = "SHIFT to Scale — Every Player. Messi-Level.";
pptx.lang = "en-US";
pptx.theme = {
  headFontFace: "Segoe UI",
  bodyFontFace: "Segoe UI",
  lang: "en-US"
};
pptx.defineLayout({ name: "AXLFLO", width: 10, height: 5.625 });
pptx.layout = "AXLFLO";

const C = E.C;
const SEQ = E.SEQ;
const FOOTER = "SHIFT to Scale™ is a proprietary framework by AxlFlo LLC.";
const DISCLAIMER = "SHIFT to SCALE is a proprietary framework by AxlFlo LLC";

function darkBase(sl, gb) {
  sl.background = { color: C.inkNavy };
  E.addGradBar(sl, gb);
}

function whiteBase(sl, gb, tag, title) {
  sl.background = { color: C.white };
  E.addGradBar(sl, gb);
  E.addWhiteHeader(sl, pptx, spaced(tag), title);
}

function spaced(s) {
  if (!s) return "";
  return String(s).toUpperCase().split("").join(" ");
}

function addDarkTitle(sl, tag, title, size=27) {
  E.addSectionLabel(sl, spaced(tag));
  sl.addText(title, { x:0.22, y:0.40, w:9.35, h:0.62, fontFace:"Segoe UI", fontSize:size, bold:true, color:C.white, margin:0, fit:"shrink" });
}

function addDarkSubtitle(sl, text, y=1.06) {
  sl.addText(text, { x:0.22, y, w:9.45, h:0.36, fontFace:"Segoe UI", fontSize:13.5, italic:true, color:C.coolGrey, margin:0, fit:"shrink" });
}

function addFooter(sl, num, dark=true, text=FOOTER) {
  if (dark) E.addDarkFooter(sl, text, num); else E.addWhiteFooter(sl, pptx, text, num);
}

function addCreamQuote(sl, text, y, h=0.55, fontSize=12.2) {
  sl.addShape(pptx.ShapeType.rect, { x:0.35, y, w:9.25, h, fill:{ color:C.cream }, shadow:E.shadow() });
  sl.addText(text, { x:0.55, y:y+0.09, w:8.85, h:h-0.15, fontFace:"Segoe UI", fontSize, italic:true, color:C.cardNavy, margin:0, fit:"shrink", valign:"mid" });
}

function addBottomBar(sl, text, y=4.66, dark=true) {
  sl.addShape(pptx.ShapeType.rect, { x:0.22, y, w:9.52, h:0.44, fill:{ color: dark ? C.cream : C.cream }, shadow:E.shadow() });
  sl.addShape(pptx.ShapeType.rect, { x:0.22, y, w:0.07, h:0.44, fill:{ color:C.fieryCoral } });
  sl.addText(text, { x:0.42, y:y+0.08, w:9.05, h:0.25, fontFace:"Segoe UI", fontSize:12.4, bold:true, color:C.inkNavy, margin:0, fit:"shrink", align:"center" });
}

function addCard(sl, x, y, w, h, stripe, heading, body, opts={}) {
  const fill = opts.fill || C.cardNavy;
  const line = opts.line || C.cardBorder;
  const headingColor = opts.headingColor || C.white;
  const bodyColor = opts.bodyColor || C.white;
  const fsH = opts.headingSize || 12.6;
  const fsB = opts.bodySize || 10.8;
  const stripeW = opts.stripeW || 0.035;
  sl.addShape(pptx.ShapeType.rect, { x, y, w, h, fill:{ color:fill }, line:{ color:line, width:0.5 }, shadow:E.shadow() });
  if (stripe) sl.addShape(pptx.ShapeType.rect, { x, y, w:stripeW, h, fill:{ color:stripe } });
  if (heading) sl.addText(heading, { x:x+0.13, y:y+0.10, w:w-0.22, h:0.26, fontFace:"Segoe UI", fontSize:fsH, bold:true, color:headingColor, margin:0, fit:"shrink" });
  if (body) sl.addText(body, { x:x+0.13, y:y+(heading?0.44:0.12), w:w-0.24, h:h-(heading?0.52:0.2), fontFace:"Segoe UI", fontSize:fsB, color:bodyColor, margin:0, fit:"shrink", breakLine:false, valign:"top" });
}

function addBulletText(sl, text, x, y, w, h, opts={}) {
  sl.addText(text, { x, y, w, h, fontFace:"Segoe UI", fontSize:opts.fontSize||10.7, color:opts.color||C.white, margin:0, fit:"shrink", breakLine:false, valign:"top", bold:opts.bold||false, italic:opts.italic||false });
}

function addPill(sl, text, x, y, w, color, fs=10.5) {
  sl.addShape(pptx.ShapeType.roundRect, { x, y, w, h:0.32, rectRadius:0.06, fill:{ color }, line:{ color, width:0.5 } });
  sl.addText(text, { x:x+0.05, y:y+0.09, w:w-0.1, h:0.12, fontFace:"Segoe UI", fontSize:fs, bold:true, color:C.white, align:"center", margin:0, fit:"shrink" });
}

function addStat(sl, stat, label, x, y, w, stripe, dark=true) {
  const fill = dark ? C.cardNavy : C.cardWhite;
  const tc = dark ? C.white : C.inkNavy;
  sl.addShape(pptx.ShapeType.rect, { x, y, w, h:0.82, fill:{ color:fill }, line:{ color: dark ? C.cardBorder : C.borderLight, width:0.5 }, shadow:E.shadow() });
  sl.addShape(pptx.ShapeType.rect, { x, y, w, h:0.055, fill:{ color:stripe } });
  sl.addText(stat, { x:x+0.13, y:y+0.2, w:1.08, h:0.32, fontFace:"Segoe UI", fontSize:22, bold:true, color:stripe, margin:0, fit:"shrink" });
  sl.addText(label, { x:x+1.18, y:y+0.18, w:w-1.32, h:0.42, fontFace:"Segoe UI", fontSize:9.7, color:tc, margin:0, fit:"shrink" });
}

function addTable(sl, x, y, w, h, headers, rows, colWidths, opts={}) {
  const headerH = opts.headerH || 0.33;
  const rowH = (h - headerH) / rows.length;
  let cx = x;
  headers.forEach((head, i) => {
    const cw = w * colWidths[i];
    sl.addShape(pptx.ShapeType.rect, { x:cx, y, w:cw, h:headerH, fill:{ color: opts.headerFill || C.inkNavy }, line:{ color: opts.line || C.borderLight, width:0.5 } });
    sl.addText(head, { x:cx+0.05, y:y+0.09, w:cw-0.1, h:0.14, fontFace:"Segoe UI", fontSize:8.7, bold:true, color:C.white, margin:0, fit:"shrink" });
    cx += cw;
  });
  rows.forEach((row, r) => {
    cx = x;
    const fill = r % 2 === 0 ? C.white : C.lightTint;
    row.forEach((cell, i) => {
      const cw = w * colWidths[i];
      sl.addShape(pptx.ShapeType.rect, { x:cx, y:y+headerH+r*rowH, w:cw, h:rowH, fill:{ color:fill }, line:{ color: opts.line || "E8EAF6", width:0.35 } });
      sl.addText(cell, { x:cx+0.05, y:y+headerH+r*rowH+0.05, w:cw-0.1, h:rowH-0.08, fontFace:"Segoe UI", fontSize:opts.fontSize||7.3, color:C.inkNavy, margin:0, fit:"shrink", breakLine:false, valign:"top" });
      cx += cw;
    });
  });
}

function addSlide1(gb) {
  const sl = pptx.addSlide();
  darkBase(sl, gb);
  E.addLogoArea(sl, pptx);
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
  const sl = pptx.addSlide();
  whiteBase(sl, gb, "THE REAL QUESTION", "Every Team Has a Messi. Not Every Team Wins.");
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
  const sl = pptx.addSlide();
  darkBase(sl, gb);
  addDarkTitle(sl, "THE PROBLEM", "Most AI Deployments Create Stars. Not Systems.");
  const cards = [
    ["The Prompt Dependency", "Output quality is determined by who's asking. The power user gets great results. Everyone else gets noise. The gap widens every week."],
    ["Context Lives in the Conversation", "Rules exist in someone's head. Every session starts from scratch. There's no institutional memory — no way to take what the expert figured out and make it available to the next person."],
    ["Drift Is Invisible Until It's Expensive", "Rules accumulate informally. Outputs become inconsistent. Nobody knows what changed or when. The system looked fine until it didn't."]
  ];
  cards.forEach((c,i)=>addCard(sl, 0.28+i*3.18, 1.35, 2.95, 2.55, SEQ[3][i], c[0], c[1], { bodySize:11.0 }));
  addBottomBar(sl, "This is not a technology problem. It is a design problem. And it compounds.", 4.32, true);
  addFooter(sl, 3, true, "The first failure is treating personal expertise as enterprise capability.");
  return { num:3, type:"I", label:"Problem", bg:"dark", gradientBar:true };
}

function addSlide4(gb) {
  const sl = pptx.addSlide();
  darkBase(sl, gb);
  addDarkTitle(sl, "THE CORE TRUTH", "AI Is an Amplifier. It Amplifies Everything — Including the Mess.", 25.5);
  const cards = [
    ["Strong systems get stronger.", "A well-designed workflow run through AI produces consistent, high-quality output at speed. The system gets better as more people use it correctly."],
    ["Broken systems break faster.", "A disorganised process run through AI produces disorganised output — faster and at higher volume. AI doesn't fix broken. It scales it."],
    ["The gap widens by default.", "Without a system, your best people get better. Everyone else stays flat. The adoption gap is not a training problem — it is a structural problem."]
  ];
  cards.forEach((c,i)=>addCard(sl, 0.28+i*3.18, 1.34, 2.95, 2.6, SEQ[3][i], c[0], c[1], { bodySize:11.0 }));
  addBottomBar(sl, "The question is not whether your people are using AI. It's what the AI is amplifying.", 4.30, true);
  addFooter(sl, 4, true, "AI does not repair the operating model. It reveals it.");
  return { num:4, type:"I", label:"Core Truth", bg:"dark", gradientBar:true };
}

function addSlide5(gb) {
  const sl = pptx.addSlide();
  darkBase(sl, gb);
  addDarkTitle(sl, "THE SHIFT IN THINKING", "What If Enterprise AI Doesn't Live in Software at All?", 26.5);
  addCreamQuote(sl, "\"Most people using AI are prompting. Very few are engineering.\"", 1.18, 0.50, 13);
  sl.addText("Most organisations are searching for the right tool. The right licence. The right vendor. The right dashboard.\n\nThat's the wrong search.\n\nThe companies getting real results from AI are not running better software. They are running better systems. Structured context — logic, rules, governance — stored in a form that AI can read, execute against, and maintain consistently across every user, every session, every day.", { x:0.35, y:1.90, w:5.45, h:2.12, fontFace:"Segoe UI", fontSize:11.8, color:C.white, margin:0, fit:"shrink", breakLine:false });
  addCard(sl, 6.15, 1.85, 3.35, 0.62, C.indigoBlue, "Storage + permissions + logic", "the new software", { bodySize:11.2, headingSize:12.3 });
  addCard(sl, 6.15, 2.62, 3.35, 0.62, C.purple, "The flat file", "the operating system", { bodySize:11.2, headingSize:12.3 });
  addCard(sl, 6.15, 3.39, 3.35, 0.62, C.fieryCoral, "The AI", "the engine", { bodySize:11.2, headingSize:12.3 });
  addBottomBar(sl, "The system is what scales.", 4.32, true);
  addFooter(sl, 5, true, "The next enterprise application may just be structured context.");
  return { num:5, type:"N", label:"Insight", bg:"dark", gradientBar:true };
}

function addSlide6(gb) {
  const sl = pptx.addSlide();
  whiteBase(sl, gb, "THE FRAMEWORK", "SHIFT to Scale™ — Five Pillars. One System.");
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
    sl.addShape(pptx.ShapeType.rect, { x:0.35, y, w:0.08, h:rh, fill:{ color } });
    sl.addText(r[0], { x:0.52, y:y+0.13, w:0.24, h:0.2, fontFace:"Segoe UI", fontSize:15, bold:true, color:color, align:"center", margin:0 });
    sl.addText(r[1], { x:0.92, y:y+0.09, w:1.45, h:0.24, fontFace:"Segoe UI", fontSize:10.5, bold:true, color:C.inkNavy, margin:0, fit:"shrink" });
    sl.addText(r[2], { x:2.55, y:y+0.07, w:3.2, h:0.34, fontFace:"Segoe UI", fontSize:8.2, color:C.inkNavy, margin:0, fit:"shrink" });
    sl.addText(r[3], { x:5.95, y:y+0.07, w:3.45, h:0.34, fontFace:"Segoe UI", fontSize:8.2, color:C.inkNavy, margin:0, fit:"shrink" });
  });
  addBottomBar(sl, "SHIFT is the journey. Scale is the destination.", 4.54, false);
  addFooter(sl, 6, false, "Five pillars. One operating system for adoption.");
  return { num:6, type:"F", label:"Framework", bg:"white", gradientBar:true };
}

function addSlide7(gb) {
  const sl = pptx.addSlide();
  darkBase(sl, gb);
  addDarkTitle(sl, "SHIFT IN PRACTICE", "We Built It. Here Is What We Learned.", 28);
  addDarkSubtitle(sl, "The SHIFT framework was not designed in a boardroom. It was tested in a real build — a complex AI research system built from scratch, governed by a rulebook, versioned across every iteration, and validated by a QA gate before any major version shipped.", 1.05);
  const cards = [
    ["Separate the concern.", "The logic lives in a file. The conversation is for execution. Rules are not re-stated every session — they are read from a governed source of truth."],
    ["Version everything.", "Every rule change is logged, dated, and rationale-documented. When something breaks, you know exactly what changed and when. Rollback is always possible."],
    ["Govern how rules change.", "Rules need meta-rules. What triggers a version bump? What requires a full review? What can ship as a patch?"],
    ["Build a QA gate.", "Before any major version ships, 20 functional scenario tests run. If any fail, the version doesn't ship."],
    ["Separate execution from governance.", "The document you use daily is not the same document that governs the rules. One is built for speed. The other is built for integrity."]
  ];
  cards.forEach((c,i)=>{
    const x = 0.3 + (i%3)*3.15;
    const y = i<3 ? 1.68 : 3.22;
    const w = i<3 ? 2.9 : 4.45;
    const x2 = i===3 ? 0.98 : i===4 ? 5.0 : x;
    addCard(sl, x2, y, w, 1.22, SEQ[5][i], c[0], c[1], { bodySize:8.9, headingSize:11.5 });
  });
  addBottomBar(sl, "These are not software engineering principles borrowed for AI. They are the same principles — applied to a new medium.", 4.64, true);
  addFooter(sl, 7, true, "Proof matters more than posture.");
  return { num:7, type:"I", label:"Proof of Concept", bg:"dark", gradientBar:true };
}

function addSlide8(gb) {
  const sl = pptx.addSlide();
  whiteBase(sl, gb, "THE SYSTEM STRUCTURE", "This Is What a Governed AI System Looks Like.");
  sl.addText("Every file has a role. Every role has a boundary. Nothing overlaps — by design.", { x:0.35, y:1.18, w:9.3, h:0.23, fontFace:"Segoe UI", fontSize:11, italic:true, color:C.inkNavy, margin:0 });
  const rows = [
    ["ENGINE.md", "Master logic — scoring rules, formula, thresholds, decision conditions", "Versioned", "The source of truth. AI reads this every session. Never overridden by conversation."],
    ["VALIDATION.md", "Edge cases, boundary conditions, exception flags", "Versioned", "Captures the cases the main engine doesn't cover. Prevents silent failures."],
    ["QUICKREF.md", "Daily execution card — lightweight, optimised for speed", "Versioned", "60–70% faster to load. Built for the operator, not the archivist."],
    ["SECTOR.md", "Context layer — macro signals, sector rotation, external conditions", "Versioned", "Separates environmental context from core logic. Updated independently."],
    ["RULEBOOK.md", "Meta-governance — rules about how rules work, version triggers, gate conditions", "Versioned", "The constitution. Governs the other files. Without this, the system has no immune system."],
    ["TEST_SUITE.md", "20 functional scenario cards — Tier A, Tier B, Tier C", "Versioned", "The QA gate. No major version ships without 20/20 passing. Named after real incidents."],
    ["LOG.md", "Live session record — append only", "Live", "Institutional memory. What ran, what failed, what was corrected. Never deleted."],
    ["CHANGELOG.md", "Full version history — every change, every reason", "Live", "Audit trail. The system's biography."]
  ];
  addTable(sl, 0.3, 1.52, 9.4, 2.74, ["File", "Role", "Type", "Why It Exists"], rows, [0.18,0.36,0.13,0.33], { fontSize:6.2, headerH:0.28 });
  sl.addShape(pptx.ShapeType.rect, { x:0.3, y:1.52, w:0.055, h:2.74, fill:{ color:C.indigoBlue } });
  addBottomBar(sl, "Live files update continuously. Versioned files change only with intent. The separation is not cosmetic — it is the governance model.", 4.50, false);
  addFooter(sl, 8, false, "Governance becomes real when the architecture makes drift visible.");
  return { num:8, type:"D", label:"Architecture", bg:"white", gradientBar:true };
}

function addSlide9(gb) {
  const sl = pptx.addSlide();
  darkBase(sl, gb);
  addDarkTitle(sl, "THE OUTCOME", "The Goal Was Never One Messi. It Was a Team Where Everyone Plays Like One.", 23.5);
  sl.addText("When the expertise is in the architecture — not the operator — something changes.\n\nA junior analyst and a senior director working from the same system produce the same quality of output. A new team member onboards in days, not months, because the system carries the institutional knowledge. A power user who leaves doesn't take the capability with them — because the capability was never theirs alone.\n\nThis is what removing subjectivity at scale actually looks like.\n\nNot better prompts. A system that makes the prompt almost irrelevant.", { x:0.35, y:1.18, w:4.8, h:2.45, fontFace:"Segoe UI", fontSize:11.3, color:C.white, margin:0, fit:"shrink", breakLine:false });
  const cards = [
    ["Consistent output across every operator.", "The best practice is in the file, not the person. Everyone executes from the same playbook."],
    ["Institutional memory that compounds.", "Every refinement, every corrected edge case, every lesson learned — documented, versioned, available to the next person from day one."],
    ["Onboarding time cut dramatically.", "New team members don't start from scratch. They start from the system. Ramp time measured in days, not quarters."]
  ];
  cards.forEach((c,i)=>addCard(sl, 5.55, 1.18+i*0.92, 4.1, 0.76, SEQ[3][i], c[0], c[1], { bodySize:8.9, headingSize:10.6 }));
  addBottomBar(sl, "You don't build a world-class team by finding better players. You build one by designing a system that elevates every player you have.", 4.34, true);
  addFooter(sl, 9, true, "The system makes excellence transferable.");
  return { num:9, type:"N", label:"Messi Payoff", bg:"dark", gradientBar:true };
}

function addSlide10(gb) {
  const sl = pptx.addSlide();
  whiteBase(sl, gb, "THE PATH", "12 Months From Prompt to System");
  const phases = [
    ["Phase 1", "Weeks 1–6: Diagnose & Design", "Audit current AI usage patterns by role. Identify where output depends on individual expertise. Define 3–5 priority use cases. Begin governance design: what files are needed, what rules need documenting, what the QA gate looks like for this organisation."],
    ["Phase 2", "Weeks 7–16: Architect & Activate", "Build the system structure. Role-specific execution cards. Champions network activated — peers, not trainers. First version of the rulebook and master logic files. Baseline metrics established."],
    ["Phase 3", "Weeks 17–32: Scale & Govern", "System deployed across teams. Champions carry it forward. New onboarding updated — team members join the system, not just the organisation. First QA gate runs. Version governance live."],
    ["Phase 4", "Weeks 33–52: Prove & Extend", "Full ROI documentation. Regressions logged and tested. System extended to next tier of use cases. The programme transitions from deployment mode to continuous improvement — the system now evolves itself."]
  ];
  phases.forEach((p,i)=>{
    const x = 0.35+i*2.35;
    const col = SEQ[4][i];
    sl.addShape(pptx.ShapeType.rect, { x, y:1.35, w:2.15, h:2.95, fill:{ color:C.cardWhite }, line:{ color:C.borderLight, width:0.5 }, shadow:E.shadow() });
    sl.addShape(pptx.ShapeType.rect, { x, y:1.35, w:2.15, h:0.07, fill:{ color:col } });
    sl.addText(p[0], { x:x+0.12, y:1.58, w:1.9, h:0.18, fontFace:"Segoe UI", fontSize:10, bold:true, color:col, align:"center", margin:0 });
    sl.addText(p[1], { x:x+0.12, y:1.86, w:1.9, h:0.38, fontFace:"Segoe UI", fontSize:11, bold:true, color:C.inkNavy, align:"center", margin:0, fit:"shrink" });
    sl.addText(p[2], { x:x+0.12, y:2.40, w:1.9, h:1.48, fontFace:"Segoe UI", fontSize:8.0, color:C.inkNavy, margin:0, fit:"shrink", breakLine:false, valign:"top" });
  });
  addBottomBar(sl, "\"Adoption is not a training event. It is a system design project with a beginning, a middle, and proof.\"", 4.57, false);
  addFooter(sl, 10, false, "The roadmap turns usage into capability.");
  return { num:10, type:"P", label:"Roadmap", bg:"white", gradientBar:true };
}

function addSlide11(gb) {
  const sl = pptx.addSlide();
  darkBase(sl, gb);
  addDarkTitle(sl, "HOW IT SCALES", "Built to Scale. Not Because It's Big. Because It's Designed Right.", 25.5);
  addDarkSubtitle(sl, "Most AI programmes are designed for pilots. This is designed for production. The difference is not ambition. It is architecture.", 1.03);
  const cards = [
    ["Systematised fluency.", "Role-specific execution cards take what one person figured out and make it available to five hundred. Fluency stops being individual. It becomes institutional."],
    ["A champions network that compounds.", "Champions are not evangelists. They are the feedback loop — collecting what breaks, what works, what the system doesn't yet cover."],
    ["Governance that grows with the organisation.", "The rulebook, the QA gate, the changelog — they don't get heavier as the organisation grows. They get more valuable."]
  ];
  cards.forEach((c,i)=>addCard(sl, 0.28+i*3.18, 1.58, 2.95, 1.55, SEQ[3][i], c[0], c[1], { bodySize:9.7, headingSize:11.6 }));
  addStat(sl, "1–6", "Use case definition + governance design → 10–20 pilot users", 0.45, 3.55, 2.9, C.indigoBlue, true);
  addStat(sl, "7–16", "Champions network → 100–300 users", 3.55, 3.55, 2.9, C.purple, true);
  addStat(sl, "17–52", "Full deployment → enterprise-wide with documented ROI", 6.65, 3.55, 2.9, C.fieryCoral, true);
  addFooter(sl, 11, true, "Pilots test possibility. Systems produce repeatability.");
  return { num:11, type:"D", label:"How It Scales", bg:"dark", gradientBar:true };
}

function addSlide12(gb) {
  const sl = pptx.addSlide();
  darkBase(sl, gb);
  E.addLogoArea(sl, pptx);
  sl.addText("Let's Build Your AI System. Not Just Your AI Adoption.", { x:0.42, y:0.42, w:5.35, h:0.78, fontFace:"Segoe UI", fontSize:25.5, bold:true, color:C.white, margin:0, fit:"shrink" });
  sl.addText("AxlFlo is an advisory firm that helps organisations move from AI experimentation to AI that runs their operations. We don't sell software. We build the system that makes your AI investment pay off.", { x:0.42, y:1.32, w:5.2, h:0.68, fontFace:"Segoe UI", fontSize:11.5, color:C.coolGrey, margin:0, fit:"shrink", breakLine:false });
  const tiers = [
    ["Discovery Session", "Free · 60 min", "We map your current AI usage, identify where output depends on individual expertise, and show you what a governed system looks like for your organisation."],
    ["SHIFT Sprint", "8 weeks", "Use cases defined. Execution cards built. Champions activated. Governance live. Your first cohort producing consistent, measurable results."],
    ["Full Scale Programme", "12 months", "End-to-end system architecture. Champions network. QA gate. Version governance. ROI reporting. The full build — from prompt to system."]
  ];
  tiers.forEach((t,i)=>addCard(sl, 0.42, 2.15+i*0.68, 5.1, 0.58, SEQ[3][i], `${i+1}. ${t[0]} (${t[1]})`, t[2], { bodySize:8.1, headingSize:10.3 }));
  sl.addShape(pptx.ShapeType.rect, { x:0.42, y:4.35, w:5.1, h:0.035, fill:{ color:C.fieryCoral } });
  sl.addText("Amit Kaistha · Founder, AxlFlo\namit.kaistha@axlflo.ai · axlflo.ai", { x:0.42, y:4.55, w:5.0, h:0.36, fontFace:"Segoe UI", fontSize:11, color:C.coolGrey, margin:0, fit:"shrink" });
  sl.addText("Every player. Messi-level. That's the system.", { x:5.96, y:4.38, w:3.65, h:0.38, fontFace:"Segoe UI", fontSize:17, bold:true, color:C.mustardGold, align:"center", margin:0, fit:"shrink" });
  sl.addShape(pptx.ShapeType.rect, { x:6.15, y:4.86, w:3.2, h:0.035, fill:{ color:C.fieryCoral } });
  sl.addShape(pptx.ShapeType.rect, { x:6.15, y:4.95, w:3.2, h:0.025, fill:{ color:C.fieryCoral } });
  E.addTitleFooter(sl, DISCLAIMER, "Every player. Messi-level. That's the system.", 12);
  return { num:12, type:"X", label:"CTA", bg:"dark", gradientBar:true };
}

(async () => {
  const gb = await E.makeGradientBar();
  const slides = [
    addSlide1(gb), addSlide2(gb), addSlide3(gb), addSlide4(gb),
    addSlide5(gb), addSlide6(gb), addSlide7(gb), addSlide8(gb),
    addSlide9(gb), addSlide10(gb), addSlide11(gb), addSlide12(gb)
  ];
  await pptx.writeFile({ fileName: pptxPath });
  const manifest = { expectedSlides: slides.length, slides };
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log("Built", pptxPath);
  console.log("Manifest", manifestPath);
})();
