"use strict";

const fs = require("fs");
const path = require("path");
const pptxgen = require("pptxgenjs");
const {
  FiActivity,
  FiAlertTriangle,
  FiArchive,
  FiBarChart2,
  FiCheckCircle,
  FiClipboard,
  FiClock,
  FiCompass,
  FiCpu,
  FiDatabase,
  FiEye,
  FiFileText,
  FiFlag,
  FiGitBranch,
  FiLayers,
  FiLock,
  FiRepeat,
  FiShield,
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiZap
} = require("react-icons/fi");
const E = require("../../lib/engine");
const { formatValidationReport, validateDeckFiles } = require("../../lib/deckValidation");
const { getRendererForSlide } = require("../../lib/slideRegistry");

const repoRoot = path.resolve(__dirname, "../..");
const deckDir = process.env.AXLFLO_DECK_DIR
  ? path.resolve(repoRoot, process.env.AXLFLO_DECK_DIR)
  : __dirname;
const outputBase = process.env.AXLFLO_OUTPUT_BASENAME || "shift_to_scale_from_fresh_json";
const contentPath = path.join(deckDir, "content.json");
const legacyInputPath = path.join(deckDir, "slides.json");
const inputPath = fs.existsSync(contentPath) ? contentPath : legacyInputPath;
const layoutPlanPath = path.join(deckDir, "layout.plan.json");
const outDir = path.join(repoRoot, "output");
const outputPath = path.join(outDir, `${outputBase}.pptx`);
const manifestPath = path.join(outDir, `${outputBase}_manifest.json`);

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const validation = validateDeckFiles(inputPath, layoutPlanPath);
console.log(formatValidationReport(validation, path.basename(inputPath)));
if (!validation.ok) process.exit(1);
validation.warnings.forEach(warning => console.warn(`Pre-render validation warning: ${warning}`));

const deckJson = validation.deckJson;
const layoutPlan = validation.layoutPlan;
const planBySlide = new Map((layoutPlan.slides || []).map(plan => [plan.slide, plan]));
const slides = (deckJson.slides || []).map((slide, idx) => ({
  ...slide,
  layout_plan: planBySlide.get(idx + 1) || {}
}));
const C = E.C;
const STRIP = 0.04;
const LEGAL_FOOTER = deckJson.deck?.footer || "SHIFT to SCALE™ is a proprietary framework by AxlFlo LLC.";
let ICONS = {};

const pptx = new pptxgen();
pptx.author = `${deckJson.deck?.author || "AxlFlo"} · ${deckJson.deck?.email || ""}`;
pptx.company = "AxlFlo LLC";
pptx.subject = deckJson.deck?.subtitle || deckJson.deck?.title || "SHIFT to SCALE";
pptx.title = deckJson.deck?.title || "SHIFT to SCALE";
pptx.lang = "en-US";
pptx.theme = { headFontFace: "Segoe UI", bodyFontFace: "Segoe UI", lang: "en-US" };
pptx.defineLayout({ name: "AXLFLO", width: 10, height: 5.625 });
pptx.layout = "AXLFLO";
pptx.margin = 0;

function spaced(s) {
  return String(s || "").toUpperCase().split("").join(" ");
}

function addText(sl, text, x, y, w, h, opts = {}) {
  sl.addText(text || "", {
    x, y, w, h,
    fontFace: "Segoe UI",
    margin: 0,
    breakLine: false,
    fit: "shrink",
    ...opts
  });
}

function darkBase(sl, gb) {
  sl.background = { color: C.inkNavy };
  E.addGradBar(sl, gb);
}

function whiteBase(sl, gb, section, title) {
  sl.background = { color: C.white };
  E.addGradBar(sl, gb);
  sl.addShape(pptx.ShapeType.rect, { x: 0.04, y: 0, w: 9.96, h: 1.12, fill: { color: C.inkNavy } });
  addText(sl, spaced(section), 0.25, 0.07, 9.4, 0.22, { fontSize: 9, charSpacing: 3, color: C.coolGrey });
  addText(sl, title, 0.25, 0.30, 9.4, 0.65, { fontSize: 25, bold: true, color: C.white });
}

function addFooter(sl, num, dark = true, text = "") {
  const footerText = text || "";
  if (dark) {
    E.addDarkFooter(sl, footerText, num);
    return;
  }
  sl.addShape(pptx.ShapeType.rect, { x: 0.04, y: 5.27, w: 9.96, h: 0.355, fill: { color: C.inkNavy } });
  addText(sl, footerText, 0.2, 5.29, 8.8, 0.26, { fontSize: 11, italic: true, color: C.mustardGold });
  addText(sl, String(num), 9.3, 5.29, 0.5, 0.26, { fontSize: 9, color: C.coolGrey, align: "right" });
}

function addCreamBox(sl, text, y, h = 0.48, fontSize = 12) {
  sl.addShape(pptx.ShapeType.rect, {
    x: 0.35, y, w: 9.25, h,
    fill: { color: C.cream },
    line: { color: "E0D6B8", width: 0.5 },
    shadow: E.shadow()
  });
  addText(sl, text, 0.55, y + 0.08, 8.85, h - 0.12, {
    fontSize,
    italic: true,
    color: C.cardNavy,
    valign: "mid"
  });
}

function addTitle(sl, section, title, size = 27) {
  E.addSectionLabel(sl, spaced(section));
  const titleH = title.length > 60 ? 0.88 : 0.68;
  addText(sl, title, 0.22, 0.38, 9.35, titleH, {
    fontSize: size,
    bold: true,
    color: C.white,
    valign: "top"
  });
}

function addCard(sl, x, y, w, h, stripe, title, body, opts = {}) {
  const fill = opts.fill || C.cardNavy;
  const line = opts.line || C.cardBorder;
  const titleColor = opts.titleColor || C.white;
  const bodyColor = opts.bodyColor || C.coolGrey;
  sl.addShape(pptx.ShapeType.rect, {
    x, y, w, h,
    fill: { color: fill },
    line: { color: line, width: 0.5 },
    shadow: E.shadow()
  });
  if (stripe) sl.addShape(pptx.ShapeType.rect, { x, y, w: STRIP, h, fill: { color: stripe } });
  const iconData = opts.iconData || getIconFor(title);
  const iconSize = opts.iconSize || 0.18;
  const titleBandY = y + (opts.titleY || 0.13);
  const titleBandH = opts.titleH || 0.34;
  const iconY = titleBandY + Math.max(0, (titleBandH - iconSize) / 2);
  const titleX = iconData ? x + 0.43 : x + 0.16;
  const titleW = iconData ? w - 0.58 : w - 0.32;
  if (iconData) {
    sl.addImage({ data: iconData, x: x + 0.16, y: iconY, w: iconSize, h: iconSize });
  }
  addText(sl, title, titleX, titleBandY, titleW, titleBandH, {
    fontSize: opts.titleSize || 12,
    bold: true,
    color: titleColor,
    valign: "mid"
  });
  addText(sl, body, x + 0.16, y + 0.58, w - 0.32, h - 0.72, {
    fontSize: opts.bodySize || 9.5,
    color: bodyColor,
    valign: "top"
  });
}

function getIconFor(title = "") {
  const t = title.toLowerCase();
  if (t.includes("prompt")) return ICONS.prompt;
  if (t.includes("context") || t.includes("memory")) return ICONS.context;
  if (t.includes("drift") || t.includes("regression")) return ICONS.drift;
  if (t.includes("system") || t.includes("architecture")) return ICONS.system;
  if (t.includes("govern") || t.includes("rule")) return ICONS.governance;
  if (t.includes("qa") || t.includes("gate") || t.includes("prove")) return ICONS.qa;
  if (t.includes("version")) return ICONS.version;
  if (t.includes("operator") || t.includes("champion") || t.includes("user")) return ICONS.people;
  if (t.includes("mandate") || t.includes("strategise") || t.includes("target")) return ICONS.target;
  if (t.includes("quick") || t.includes("fluency") || t.includes("execution")) return ICONS.execution;
  if (t.includes("onboarding") || t.includes("scale")) return ICONS.scale;
  if (t.includes("tool") || t.includes("software")) return ICONS.tool;
  if (t.includes("dependency") || t.includes("risk")) return ICONS.risk;
  if (t.includes("strong") || t.includes("consistent")) return ICONS.strong;
  if (t.includes("broken") || t.includes("noise")) return ICONS.warning;
  if (t.includes("storage") || t.includes("file")) return ICONS.file;
  if (t.includes("ai")) return ICONS.ai;
  return ICONS.default;
}

async function buildIcons() {
  const defs = {
    ai: FiCpu,
    context: FiArchive,
    default: FiActivity,
    drift: FiEye,
    execution: FiClipboard,
    file: FiFileText,
    governance: FiShield,
    people: FiUsers,
    prompt: FiZap,
    qa: FiCheckCircle,
    risk: FiAlertTriangle,
    scale: FiTrendingUp,
    strong: FiTarget,
    system: FiLayers,
    target: FiCompass,
    tool: FiDatabase,
    version: FiGitBranch,
    warning: FiAlertTriangle,
    roadmap: FiFlag,
    lock: FiLock,
    repeat: FiRepeat,
    chart: FiBarChart2,
    clock: FiClock
  };
  const entries = await Promise.all(Object.entries(defs).map(async ([key, icon]) => {
    const data = await E.iconToBase64(icon, `#${C.white}`, 128);
    return [key, data];
  }));
  ICONS = Object.fromEntries(entries);
}

function renderCover(s, i, gb) {
  const sl = pptx.addSlide();
  darkBase(sl, gb);
  E.addLogoArea(sl, pptx);
  addText(sl, s.title, 0.45, 0.78, 5.7, 0.65, { fontSize: 39, bold: true, color: C.white });
  sl.addShape(pptx.ShapeType.rect, { x: 0.45, y: 1.55, w: 5.45, h: 0.34, fill: { color: C.cardNavy }, line: { color: C.cardBorder, width: 0.5 } });
  addText(sl, s.subtitle, 0.62, 1.65, 5.1, 0.14, { fontSize: 11.5, color: C.coolGrey });
  addText(sl, s.tagline, 0.45, 2.18, 5.6, 0.42, { fontSize: 17, color: C.white });
  sl.addShape(pptx.ShapeType.rect, { x: 0.45, y: 2.82, w: 4.95, h: 0.035, fill: { color: C.purple } });
  addText(sl, s.byline, 0.45, 3.08, 5.4, 0.22, { fontSize: 11, color: C.coolGrey });
  E.addTitleFooter(sl, "", s.closing, i);
}

function renderHook(s, i, gb) {
  const sl = pptx.addSlide();
  darkBase(sl, gb);
  addTitle(sl, s.section, s.title, 27);
  addText(sl, s.body.join("\n\n"), 0.38, 1.35, 5.25, 2.55, {
    fontSize: 12,
    color: C.white,
    valign: "top"
  });
  (s.cards || []).forEach((card, idx) => {
    addCard(sl, 5.95, 1.88 + idx * 1.12, 3.55, 0.92, E.SEQ[3][idx], card.title, card.body, {
      titleSize: 12,
      bodySize: 9.2
    });
  });
  addCreamBox(sl, `"${s.quote}"`, 4.38, 0.45, 10.6);
  addFooter(sl, i, true, s.closing);
}

function renderCards(s, i, gb) {
  const sl = pptx.addSlide();
  darkBase(sl, gb);
  addTitle(sl, s.section, s.title, s.title.length > 58 ? 23 : 26);
  addText(sl, s.intro || "", 0.35, 1.22, 9.2, 0.66, {
    fontSize: 11.3,
    color: C.white,
    valign: "top"
  });
  const cards = s.cards || [];
  const plan = s.layout_plan || {};
  const plannedRender = plan.render_as;
  if (plannedRender === "processCycle" && cards.length > 3) {
    cards.forEach((c, idx) => {
      const x = 0.48 + idx * 1.86;
      sl.addShape(pptx.ShapeType.ellipse, {
        x: x + 0.55, y: 1.78, w: 0.46, h: 0.46,
        fill: { color: E.SEQ[5][idx] },
        line: { color: E.SEQ[5][idx], width: 0.5 }
      });
      addText(sl, String(idx + 1).padStart(2, "0"), x + 0.55, 1.91, 0.46, 0.14, {
        fontSize: 9,
        bold: true,
        color: C.white,
        align: "center"
      });
      addCard(sl, x, 2.38, 1.55, 1.66, E.SEQ[5][idx], c.title, c.body, {
        titleSize: 8.6,
        bodySize: 6.7,
        titleH: 0.30
      });
    });
  } else if (plannedRender === "numberProofCards" && cards.length <= 3) {
    cards.forEach((c, idx) => {
      const x = 0.45 + idx * 3.1;
      sl.addShape(pptx.ShapeType.rect, {
        x, y: 2.00, w: 2.75, h: 1.95,
        fill: { color: C.cardNavy },
        line: { color: C.cardBorder, width: 0.5 },
        shadow: E.shadow()
      });
      sl.addShape(pptx.ShapeType.rect, { x, y: 2.00, w: 2.75, h: STRIP, fill: { color: E.SEQ[3][idx] } });
      addText(sl, String(idx + 1).padStart(2, "0"), x + 0.20, 2.25, 2.3, 0.48, {
        fontSize: 34,
        bold: true,
        color: E.SEQ[3][idx],
        align: "center"
      });
      addText(sl, c.title, x + 0.20, 2.95, 2.35, 0.28, {
        fontSize: 10.5,
        bold: true,
        color: C.white,
        align: "center"
      });
      addText(sl, c.body, x + 0.22, 3.35, 2.30, 0.38, {
        fontSize: 7.5,
        color: C.coolGrey,
        align: "center"
      });
    });
  } else if (cards.length <= 3) {
    cards.forEach((c, idx) => addCard(sl, 0.38 + idx * 3.15, 2.18, 2.85, 1.78, E.SEQ[3][idx], c.title, c.body));
  } else {
    cards.forEach((c, idx) => {
      const row = Math.floor(idx / 3);
      const col = idx % 3;
      const isLastWide = cards.length === 5 && idx === 4;
      const x = isLastWide ? 5.08 : 0.35 + col * 3.18;
      const y = 2.02 + row * 1.32;
      const w = isLastWide ? 4.5 : 2.86;
      addCard(sl, x, y, w, 1.06, E.SEQ[5][idx], c.title, c.body, {
        titleSize: 10.6,
        bodySize: 7.5,
        titleH: 0.26
      });
    });
  }
  if (s.quote) addCreamBox(sl, `"${s.quote}"`, 4.38, 0.42, 10.6);
  addFooter(sl, i, true, s.closing);
}

function renderInsight(s, i, gb) {
  const sl = pptx.addSlide();
  darkBase(sl, gb);
  addTitle(sl, s.section, s.title, 25);
  addText(sl, s.body.join("\n\n"), 0.38, 1.35, 5.55, 2.48, { fontSize: 11.2, color: C.white, valign: "top" });
  (s.cards || []).forEach((c, idx) => addCard(sl, 6.22, 1.45 + idx * 0.92, 3.25, 0.78, E.SEQ[3][idx], c.title, c.body, {
    titleSize: 9.4,
    bodySize: 8.3,
    titleH: 0.24
  }));
  addCreamBox(sl, `"${s.quote}"`, 4.38, 0.42, 10.6);
  addFooter(sl, i, true, s.closing);
}

function renderTable(s, i, gb) {
  const sl = pptx.addSlide();
  whiteBase(sl, gb, s.section, s.title);
  addText(sl, s.intro, 0.35, 1.26, 9.25, 0.34, { fontSize: 10.4, color: C.inkNavy });
  const y0 = 1.78;
  const widths = [0.55, 1.45, 3.9, 3.55];
  const xs = [0.35, 0.95, 2.45, 6.45];
  s.columns.forEach((col, idx) => addText(sl, col, xs[idx], y0, widths[idx], 0.20, { fontSize: 8.2, bold: true, color: C.inkNavy }));
  (s.rows || []).forEach((r, idx) => {
    const y = y0 + 0.36 + idx * 0.54;
    sl.addShape(pptx.ShapeType.rect, { x: 0.35, y, w: 9.28, h: 0.45, fill: { color: idx % 2 ? C.white : C.lightTint }, line: { color: C.borderLight, width: 0.35 } });
    addText(sl, r[0], xs[0], y + 0.09, widths[0], 0.18, { fontSize: 13, bold: true, color: E.SEQ[5][idx], align: "center" });
    addText(sl, r[1], xs[1], y + 0.08, widths[1], 0.20, { fontSize: 8.5, bold: true, color: C.inkNavy });
    addText(sl, r[2], xs[2], y + 0.07, widths[2], 0.28, { fontSize: 6.8, color: "333333" });
    addText(sl, r[3], xs[3], y + 0.07, widths[3], 0.28, { fontSize: 6.8, color: "555555" });
  });
  addFooter(sl, i, false, s.closing);
}

function renderSection(s, i, gb) {
  const sl = pptx.addSlide();
  darkBase(sl, gb);
  addTitle(sl, s.section, s.title, 26);
  addText(sl, s.body.join("\n\n"), 0.55, 1.55, 8.9, 2.45, {
    fontSize: 14,
    color: C.white,
    valign: "top"
  });
  addFooter(sl, i, true, s.closing);
}

function renderArchitecture(s, i, gb) {
  const sl = pptx.addSlide();
  whiteBase(sl, gb, s.section, s.title);
  addText(sl, s.intro, 0.35, 1.25, 9.25, 0.28, { fontSize: 10.5, color: C.inkNavy });
  const groups = {
    Versioned: (s.files || []).filter(f => f.status !== "Live"),
    Live: (s.files || []).filter(f => f.status === "Live")
  };
  addText(sl, "VERSIONED SYSTEM FILES", 0.45, 1.58, 5.95, 0.16, { fontSize: 7.8, bold: true, color: C.indigoBlue, charSpacing: 1 });
  addText(sl, "LIVE MEMORY FILES", 6.70, 1.58, 2.65, 0.16, { fontSize: 7.8, bold: true, color: C.fieryCoral, charSpacing: 1 });
  groups.Versioned.forEach((f, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = 0.35 + col * 3.08;
    const y = 1.86 + row * 0.68;
    sl.addShape(pptx.ShapeType.rect, { x, y, w: 2.78, h: 0.56, fill: { color: C.cardWhite }, line: { color: C.borderLight, width: 0.5 }, shadow: E.shadow() });
    sl.addShape(pptx.ShapeType.rect, { x, y, w: STRIP, h: 0.56, fill: { color: C.indigoBlue } });
    addText(sl, f.file, x + 0.14, y + 0.07, 1.25, 0.16, { fontSize: 7.7, bold: true, color: C.inkNavy });
    addText(sl, f.status, x + 2.02, y + 0.07, 0.55, 0.14, { fontSize: 6.2, bold: true, color: C.indigoBlue, align: "right" });
    addText(sl, f.role, x + 0.14, y + 0.28, 2.42, 0.18, { fontSize: 6.1, color: "444444" });
  });
  groups.Live.forEach((f, idx) => {
    const x = 6.55;
    const y = 1.86 + idx * 0.92;
    sl.addShape(pptx.ShapeType.rect, { x, y, w: 3.05, h: 0.74, fill: { color: "FFF9EC" }, line: { color: "C07010", width: 0.5 }, shadow: E.shadow() });
    sl.addShape(pptx.ShapeType.rect, { x, y, w: STRIP, h: 0.74, fill: { color: C.fieryCoral } });
    addText(sl, f.file, x + 0.14, y + 0.10, 1.45, 0.16, { fontSize: 8.2, bold: true, color: C.inkNavy });
    addText(sl, f.status, x + 2.28, y + 0.10, 0.55, 0.14, { fontSize: 6.4, bold: true, color: C.fieryCoral, align: "right" });
    addText(sl, f.role, x + 0.14, y + 0.36, 2.70, 0.22, { fontSize: 6.7, color: "444444" });
  });
  addFooter(sl, i, false, s.closing);
}

function renderMapping(s, i, gb) {
  const sl = pptx.addSlide();
  whiteBase(sl, gb, s.section, s.title);
  addText(sl, s.intro, 0.35, 1.24, 9.25, 0.35, { fontSize: 10.5, color: C.inkNavy });
  (s.rows || []).forEach((r, idx) => {
    const y = 1.78 + idx * 0.56;
    sl.addShape(pptx.ShapeType.rect, { x: 0.45, y, w: 9.1, h: 0.44, fill: { color: idx % 2 ? C.white : C.lightTint }, line: { color: C.borderLight, width: 0.35 } });
    sl.addShape(pptx.ShapeType.rect, { x: 0.45, y, w: STRIP, h: 0.44, fill: { color: E.SEQ[5][idx] } });
    addText(sl, r[0], 0.62, y + 0.10, 1.55, 0.18, { fontSize: 8.4, bold: true, color: C.inkNavy });
    addText(sl, r[1], 2.25, y + 0.08, 6.95, 0.22, { fontSize: 7.6, color: "333333" });
  });
  addFooter(sl, i, false, s.closing);
}

function renderConceptMap(s, i, gb) {
  const sl = pptx.addSlide();
  whiteBase(sl, gb, s.section, s.title);
  addText(sl, s.intro, 0.35, 1.22, 9.25, 0.34, { fontSize: 10.2, color: C.inkNavy });

  const headers = s.columns || ["Software discipline", "Agentic operating model", "Executive payoff"];
  const xs = [0.35, 2.55, 5.75];
  const widths = [1.92, 2.92, 3.65];
  const headerColors = [C.indigoBlue, C.purple, C.fieryCoral];

  headers.forEach((h, idx) => {
    sl.addShape(pptx.ShapeType.rect, {
      x: xs[idx], y: 1.68, w: widths[idx], h: 0.34,
      fill: { color: headerColors[idx] },
      line: { color: headerColors[idx], width: 0.5 }
    });
    addText(sl, h, xs[idx] + 0.08, 1.78, widths[idx] - 0.16, 0.12, {
      fontSize: 7.6,
      bold: true,
      color: C.white,
      align: "center"
    });
  });

  sl.addShape(pptx.ShapeType.rect, {
    x: 0.35, y: 2.10, w: 4.25, h: 0.34,
    fill: { color: "F4F6FF" },
    line: { color: C.borderLight, width: 0.5 }
  });
  addText(sl, "AUTOMATION OWNS THE CONTROLS", 0.50, 2.20, 3.9, 0.11, {
    fontSize: 7.4,
    bold: true,
    color: C.indigoBlue,
    align: "center"
  });
  sl.addShape(pptx.ShapeType.rect, {
    x: 4.78, y: 2.10, w: 4.82, h: 0.34,
    fill: { color: "FFF9EC" },
    line: { color: "E0D6B8", width: 0.5 }
  });
  addText(sl, "AUTONOMY OWNS THE JUDGMENT", 4.95, 2.20, 4.48, 0.11, {
    fontSize: 7.4,
    bold: true,
    color: C.fieryCoral,
    align: "center"
  });

  (s.rows || []).forEach((r, rowIdx) => {
    const y = 2.56 + rowIdx * 0.43;
    const fill = rowIdx % 2 ? C.white : C.lightTint;
    xs.forEach((x, colIdx) => {
      sl.addShape(pptx.ShapeType.rect, {
        x, y, w: widths[colIdx], h: 0.34,
        fill: { color: fill },
        line: { color: C.borderLight, width: 0.35 }
      });
      if (colIdx === 0) {
        sl.addShape(pptx.ShapeType.rect, {
          x, y, w: STRIP, h: 0.38,
          fill: { color: E.SEQ[5][rowIdx] || C.indigoBlue }
        });
      }
      addText(sl, r[colIdx] || "", x + 0.09, y + 0.07, widths[colIdx] - 0.16, 0.20, {
        fontSize: colIdx === 0 ? 6.9 : 6.6,
        bold: colIdx === 0,
        color: colIdx === 0 ? C.inkNavy : "333333",
        valign: "mid"
      });
    });
  });

  addFooter(sl, i, false, s.closing);
}

function renderNumberLed(s, i, gb) {
  const sl = pptx.addSlide();
  darkBase(sl, gb);
  addTitle(sl, s.section, s.title, 25);
  addText(sl, s.number || "12-18", 0.55, 1.42, 2.85, 0.88, {
    fontSize: 47,
    bold: true,
    color: C.mustardGold,
    align: "center"
  });
  addText(sl, s.unit || "months", 0.85, 2.28, 2.25, 0.24, {
    fontSize: 15,
    bold: true,
    color: C.white,
    align: "center"
  });
  sl.addShape(pptx.ShapeType.rect, { x: 3.68, y: 1.42, w: 0.04, h: 2.58, fill: { color: C.purple } });
  addText(sl, s.intro || "", 4.05, 1.42, 5.25, 0.58, { fontSize: 12, color: C.white, valign: "top" });
  (s.cards || []).forEach((c, idx) => {
    sl.addShape(pptx.ShapeType.rect, {
      x: 4.08,
      y: 2.18 + idx * 0.60,
      w: 5.05,
      h: 0.43,
      fill: { color: C.cardNavy },
      line: { color: C.cardBorder, width: 0.45 }
    });
    sl.addShape(pptx.ShapeType.rect, { x: 4.08, y: 2.18 + idx * 0.60, w: STRIP, h: 0.43, fill: { color: E.SEQ[3][idx] } });
    addText(sl, c.title, 4.26, 2.28 + idx * 0.60, 1.10, 0.12, { fontSize: 8.3, bold: true, color: C.white });
    addText(sl, c.body, 5.48, 2.27 + idx * 0.60, 3.42, 0.14, { fontSize: 7.4, color: C.coolGrey });
  });
  addCreamBox(sl, `"${s.quote}"`, 4.38, 0.42, 10.4);
  addFooter(sl, i, true, s.closing);
}

function renderSpectrum(s, i, gb) {
  const sl = pptx.addSlide();
  darkBase(sl, gb);
  addTitle(sl, s.section, s.title, 25);
  addText(sl, s.intro || "", 0.45, 1.23, 8.9, 0.48, { fontSize: 11.2, color: C.white });
  sl.addShape(pptx.ShapeType.line, { x: 0.82, y: 2.62, w: 8.3, h: 0, line: { color: C.coolGrey, width: 1.2 } });
  (s.cards || []).forEach((c, idx) => {
    const x = 0.75 + idx * 2.75;
    sl.addShape(pptx.ShapeType.ellipse, {
      x: x + 0.62,
      y: 2.37,
      w: 0.50,
      h: 0.50,
      fill: { color: E.SEQ[3][idx] },
      line: { color: E.SEQ[3][idx], width: 0.5 }
    });
    addText(sl, String(idx + 1), x + 0.62, 2.52, 0.50, 0.12, { fontSize: 8, bold: true, color: C.white, align: "center" });
    addText(sl, c.title, x, 3.02, 1.75, 0.30, { fontSize: 11.2, bold: true, color: C.white, align: "center" });
    addText(sl, c.body, x - 0.10, 3.45, 1.95, 0.48, { fontSize: 7.7, color: C.coolGrey, align: "center" });
  });
  addCreamBox(sl, `"${s.quote}"`, 4.38, 0.42, 10.4);
  addFooter(sl, i, true, s.closing);
}

function renderCurve(s, i, gb) {
  const sl = pptx.addSlide();
  darkBase(sl, gb);
  addTitle(sl, s.section, s.title, 25);
  addText(sl, s.intro || "", 0.45, 1.20, 9.0, 0.48, { fontSize: 11.2, color: C.white });
  const chart = { x: 0.70, y: 1.95, w: 5.15, h: 1.85 };
  sl.addShape(pptx.ShapeType.rect, { x: chart.x, y: chart.y, w: chart.w, h: chart.h, fill: { color: C.cardNavy }, line: { color: C.cardBorder, width: 0.5 } });
  const bars = [0.46, 0.88, 0.66, 1.12, 0.92];
  bars.forEach((height, idx) => {
    const x = chart.x + 0.55 + idx * 0.82;
    const y = chart.y + 1.55 - height;
    sl.addShape(pptx.ShapeType.rect, {
      x,
      y,
      w: 0.42,
      h: height,
      fill: { color: E.SEQ[5][idx] },
      line: { color: E.SEQ[5][idx], width: 0.5 }
    });
    addText(sl, idx % 2 ? "up" : "dip", x - 0.05, chart.y + 1.62, 0.52, 0.12, {
      fontSize: 5.8,
      color: C.coolGrey,
      align: "center"
    });
  });
  addText(sl, "Not a takeover curve", chart.x + 0.30, chart.y + 0.18, 4.45, 0.22, { fontSize: 13, bold: true, color: C.white, align: "center" });
  (s.cards || []).forEach((c, idx) => addCard(sl, 6.18, 1.82 + idx * 0.78, 3.05, 0.74, E.SEQ[3][idx], c.title, c.body, {
    titleSize: 8.7,
    bodySize: 6.7,
    titleH: 0.18
  }));
  addCreamBox(sl, `"${s.quote}"`, 4.38, 0.42, 10.4);
  addFooter(sl, i, true, s.closing);
}

function renderFlowRisk(s, i, gb) {
  const sl = pptx.addSlide();
  darkBase(sl, gb);
  addTitle(sl, s.section, s.title, 24);
  addText(sl, s.intro || "", 0.45, 1.20, 9.05, 0.45, { fontSize: 11, color: C.white });
  const nodes = s.cards || [];
  nodes.forEach((c, idx) => {
    const x = 0.70 + idx * 3.02;
    addCard(sl, x, 2.05, 2.45, 1.20, E.SEQ[3][idx], c.title, c.body, {
      titleSize: 10.3,
      bodySize: 7.3,
      iconSize: 0.16
    });
    if (idx < nodes.length - 1) {
      addText(sl, ">", x + 2.57, 2.52, 0.30, 0.22, { fontSize: 18, bold: true, color: E.SEQ[3][idx + 1], align: "center" });
    }
  });
  addCreamBox(sl, `"${s.quote}"`, 4.38, 0.42, 10.4);
  addFooter(sl, i, true, s.closing);
}

function renderCourtroom(s, i, gb) {
  const sl = pptx.addSlide();
  whiteBase(sl, gb, s.section, s.title);
  addText(sl, s.intro || "", 0.42, 1.22, 9.1, 0.35, { fontSize: 10.3, color: C.inkNavy });
  addText(sl, "EVIDENCE", 0.60, 1.80, 2.25, 0.20, { fontSize: 9, bold: true, color: C.indigoBlue, align: "center" });
  addText(sl, "BUSINESS JUDGMENT", 3.85, 1.80, 2.25, 0.20, { fontSize: 9, bold: true, color: C.purple, align: "center" });
  addText(sl, "VERDICT", 7.03, 1.80, 2.0, 0.20, { fontSize: 9, bold: true, color: C.fieryCoral, align: "center" });
  (s.cards || []).forEach((c, idx) => {
    const x = [0.55, 3.57, 6.60][idx];
    const w = [2.55, 2.82, 2.55][idx];
    sl.addShape(pptx.ShapeType.rect, { x, y: 2.16, w, h: 1.42, fill: { color: idx === 1 ? "FFF9EC" : C.cardWhite }, line: { color: idx === 1 ? "E0D6B8" : C.borderLight, width: 0.5 }, shadow: E.shadow() });
    sl.addShape(pptx.ShapeType.rect, { x, y: 2.16, w: STRIP, h: 1.42, fill: { color: E.SEQ[3][idx] } });
    addText(sl, c.title, x + 0.18, 2.38, w - 0.36, 0.25, { fontSize: 11, bold: true, color: C.inkNavy, align: "center" });
    addText(sl, c.body, x + 0.22, 2.82, w - 0.44, 0.46, { fontSize: 7.6, color: "333333", align: "center" });
  });
  addCreamBox(sl, `"${s.quote}"`, 4.44, 0.46, 10.3);
  addFooter(sl, i, false, s.closing);
}

function renderStack(s, i, gb) {
  const sl = pptx.addSlide();
  darkBase(sl, gb);
  addTitle(sl, s.section, s.title, 25);
  addText(sl, s.intro || "", 0.45, 1.20, 4.7, 0.72, { fontSize: 11.2, color: C.white });
  (s.cards || []).forEach((c, idx) => {
    const y = 1.72 + idx * 0.54;
    sl.addShape(pptx.ShapeType.rect, {
      x: 5.72 - idx * 0.20,
      y,
      w: 3.55 + idx * 0.20,
      h: 0.43,
      fill: { color: C.cardNavy },
      line: { color: C.cardBorder, width: 0.5 }
    });
    sl.addShape(pptx.ShapeType.rect, { x: 5.72 - idx * 0.20, y, w: STRIP, h: 0.43, fill: { color: E.SEQ[5][idx] } });
    addText(sl, c.title, 5.90 - idx * 0.20, y + 0.12, 1.42, 0.12, { fontSize: 8.3, bold: true, color: C.white });
    addText(sl, c.body, 7.35 - idx * 0.20, y + 0.11, 1.62 + idx * 0.20, 0.14, { fontSize: 6.8, color: C.coolGrey });
  });
  addCreamBox(sl, `"${s.quote}"`, 4.38, 0.42, 10.4);
  addFooter(sl, i, true, s.closing);
}

function renderTruthGap(s, i, gb) {
  const sl = pptx.addSlide();
  darkBase(sl, gb);
  addTitle(sl, s.section, s.title, 25);
  addText(sl, s.intro || "", 0.45, 1.18, 9.0, 0.40, { fontSize: 11, color: C.white });
  const labels = ["LOOKS RIGHT", "IS RIGHT"];
  const colors = [C.purple, C.fieryCoral];
  labels.forEach((label, idx) => {
    const x = 0.65 + idx * 4.55;
    sl.addShape(pptx.ShapeType.rect, { x, y: 1.92, w: 3.75, h: 1.55, fill: { color: C.cardNavy }, line: { color: colors[idx], width: 1.1 }, shadow: E.shadow() });
    addText(sl, label, x + 0.20, 2.14, 3.35, 0.22, { fontSize: 13, bold: true, color: colors[idx], align: "center" });
    const item = (s.cards || [])[idx] || {};
    addText(sl, item.body || "", x + 0.35, 2.62, 3.05, 0.42, { fontSize: 9.5, color: C.white, align: "center" });
  });
  addText(sl, "!=", 4.63, 2.46, 0.65, 0.38, { fontSize: 24, bold: true, color: C.mustardGold, align: "center" });
  addCreamBox(sl, `"${s.quote}"`, 4.38, 0.42, 10.4);
  addFooter(sl, i, true, s.closing);
}

function renderFlywheel(s, i, gb) {
  const sl = pptx.addSlide();
  darkBase(sl, gb);
  addTitle(sl, s.section, s.title, 24);
  addText(sl, s.intro || "", 0.45, 1.18, 9.0, 0.42, { fontSize: 11, color: C.white });
  const positions = [
    [1.25, 2.12],
    [3.85, 1.72],
    [6.45, 2.12],
    [3.85, 3.05]
  ];
  (s.cards || []).forEach((c, idx) => {
    const [x, y] = positions[idx] || positions[0];
    sl.addShape(pptx.ShapeType.ellipse, { x, y, w: 1.72, h: 0.72, fill: { color: C.cardNavy }, line: { color: E.SEQ[4][idx], width: 1.0 }, shadow: E.shadow() });
    addText(sl, c.title, x + 0.16, y + 0.18, 1.40, 0.15, { fontSize: 8.6, bold: true, color: C.white, align: "center" });
    addText(sl, c.body, x + 0.18, y + 0.40, 1.36, 0.12, { fontSize: 5.9, color: C.coolGrey, align: "center" });
  });
  addText(sl, "AI HYPE\nLOOP", 4.18, 2.42, 1.08, 0.42, { fontSize: 12, bold: true, color: C.mustardGold, align: "center" });
  addCreamBox(sl, `"${s.quote}"`, 4.38, 0.42, 10.4);
  addFooter(sl, i, true, s.closing);
}

function renderRoadmap(s, i, gb) {
  const sl = pptx.addSlide();
  whiteBase(sl, gb, s.section, s.title);
  (s.phases || []).forEach((p, idx) => {
    const x = 0.42 + idx * 2.38;
    sl.addShape(pptx.ShapeType.rect, { x, y: 1.48, w: 2.12, h: 2.62, fill: { color: C.cardWhite }, line: { color: C.borderLight, width: 0.5 }, shadow: E.shadow() });
    sl.addShape(pptx.ShapeType.rect, { x, y: 1.48, w: 2.12, h: STRIP, fill: { color: E.SEQ[4][idx] } });
    addText(sl, String(idx + 1).padStart(2, "0"), x + 0.16, 1.70, 0.48, 0.24, { fontSize: 15, bold: true, color: E.SEQ[4][idx] });
    addText(sl, p.timeframe, x + 0.72, 1.74, 1.15, 0.15, { fontSize: 7.2, color: "666666" });
    addText(sl, p.title, x + 0.16, 2.10, 1.78, 0.28, { fontSize: 10.5, bold: true, color: C.inkNavy });
    addText(sl, p.body, x + 0.16, 2.58, 1.78, 0.98, { fontSize: 7.2, color: "333333", valign: "top" });
  });
  addCreamBox(sl, `"${s.quote}"`, 4.45, 0.48, 10.8);
  addFooter(sl, i, false, s.closing || s.quote || "");
}

function renderCTA(s, i, gb) {
  const sl = pptx.addSlide();
  darkBase(sl, gb);
  E.addLogoArea(sl, pptx);
  addText(sl, s.title, 0.45, 0.55, 5.9, 0.82, { fontSize: 28, bold: true, color: C.white });
  addText(sl, s.body, 0.45, 1.50, 5.65, 0.75, { fontSize: 12.2, color: C.white, valign: "top" });
  (s.engagements || []).forEach((e, idx) => addCard(sl, 0.45 + idx * 3.05, 2.58, 2.72, 1.38, E.SEQ[3][idx], e.title, `${e.duration}\n${e.body}`, {
    titleSize: 10.8,
    bodySize: 7.6
  }));
  addText(sl, s.contact, 0.5, 4.30, 6.8, 0.24, { fontSize: 10.5, color: C.coolGrey });
  addText(sl, s.tagline, 5.15, 4.72, 4.4, 0.35, { fontSize: 16, bold: true, italic: true, color: C.mustardGold, align: "right" });
  E.addTitleFooter(sl, "", s.tagline, i);
}

function renderDisclaimer(s, i, gb) {
  const sl = pptx.addSlide();
  sl.background = { color: C.white };
  E.addGradBar(sl, gb);
  addText(sl, s.title, 0.35, 0.50, 9.1, 0.45, { fontSize: 28, bold: true, color: C.inkNavy });
  addText(sl, s.body.join("\n\n"), 0.45, 1.18, 9.1, 3.45, { fontSize: 8.4, color: "333333", valign: "top" });
  addText(sl, s.engine_note, 0.45, 4.90, 6.6, 0.20, { fontSize: 8, color: "666666" });
  addFooter(sl, i, false, LEGAL_FOOTER);
}

const RENDERERS = {
  title: renderCover,
  storyCards: (s, i, gb) => s.type === "hook" ? renderHook(s, i, gb) : renderCards(s, i, gb),
  insightColumns: (s, i, gb) => s.type === "insight" ? renderInsight(s, i, gb) : renderCards(s, i, gb),
  insightGrid: renderCards,
  frameworkRows: (s, i, gb) => s.type === "mapping" ? renderMapping(s, i, gb) : renderTable(s, i, gb),
  sectionDivider: renderSection,
  processCycle: renderCards,
  systemArchitecture: renderArchitecture,
  conceptMap: renderConceptMap,
  numberLed: renderNumberLed,
  spectrum: renderSpectrum,
  curve: renderCurve,
  flowRisk: renderFlowRisk,
  courtroom: renderCourtroom,
  stack: renderStack,
  truthGap: renderTruthGap,
  flywheel: renderFlywheel,
  roadmapPhases: renderRoadmap,
  numberProofCards: renderCards,
  ctaClosing: renderCTA,
  disclaimer: renderDisclaimer
};

function renderSlide(s, i, gb) {
  const renderAs = getRendererForSlide(s, s.layout_plan || {});
  const renderer = RENDERERS[renderAs];
  if (!renderer) throw new Error(`Unsupported renderer "${renderAs}" for slide ${i} [${s.type}]`);
  return renderer(s, i, gb);
}

async function main() {
  await buildIcons();
  const gb = await E.makeGradientBar();
  slides.forEach((slide, idx) => renderSlide(slide, idx + 1, gb));
  await pptx.writeFile({ fileName: outputPath });
  fs.writeFileSync(manifestPath, JSON.stringify({
    deck: deckJson.deck,
    slide_count: slides.length,
    output: outputPath,
    input: inputPath,
    layout_plan: fs.existsSync(layoutPlanPath) ? layoutPlanPath : null,
    expectedSlides: slides.length,
    generated_at: new Date().toISOString(),
    principles: layoutPlan.principles || [],
    slides: slides.map((s, idx) => ({
      num: idx + 1,
      type: getRendererForSlide(s, s.layout_plan || {}),
      label: s.title,
      bg: s.layout_plan?.background || (["table", "architecture", "mapping", "roadmap", "disclaimer"].includes(s.type) ? "white" : "dark"),
      gradientBar: true,
      number_led: Boolean(s.layout_plan?.number_led),
      density: s.layout_plan?.density || "medium",
      visual_anchor: s.layout_plan?.visual_anchor || null,
      allow_visual_repeat: Boolean(s.layout_plan?.allow_visual_repeat),
      visual_repeat_reason: s.layout_plan?.visual_repeat_reason || null
    })),
    visual_diversity: layoutPlan.visual_diversity || null,
    validation: {
      pre_render: "passed",
      warnings: validation.warnings
    },
    slide_types: slides.map((s, idx) => ({ slide: idx + 1, type: s.type, render_as: getRendererForSlide(s, s.layout_plan || {}), title: s.title }))
  }, null, 2));
  console.log(`Built ${outputPath}`);
  console.log(`Manifest ${manifestPath}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
