"use strict";

const fs = require("fs");
const path = require("path");
const pptxgen = require("pptxgenjs");
const {
  FiCheckCircle,
  FiClipboard,
  FiCpu,
  FiGitBranch,
  FiLayers,
  FiRefreshCw,
  FiShield,
  FiTarget,
  FiZap
} = require("react-icons/fi");
const E = require("../../lib/engine");

const repoRoot = path.resolve(__dirname, "../..");
const outDir = path.join(repoRoot, "output");
const outputPath = path.join(outDir, "agentic_deck_system_single_slide.pptx");
const manifestPath = path.join(outDir, "agentic_deck_system_single_slide_manifest.json");

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const C = E.C;
const pptx = new pptxgen();
pptx.author = "Amit Kaistha · AxlFlo";
pptx.company = "AxlFlo LLC";
pptx.subject = "Agentic deck system";
pptx.title = "This Is Not Prompt-to-PowerPoint";
pptx.lang = "en-US";
pptx.theme = { headFontFace: "Segoe UI", bodyFontFace: "Segoe UI", lang: "en-US" };
pptx.defineLayout({ name: "AXLFLO", width: 10, height: 5.625 });
pptx.layout = "AXLFLO";
pptx.margin = 0;

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

function spaced(text) {
  return String(text || "").toUpperCase().split("").join(" ");
}

function addPanel(sl, x, y, w, h, opts = {}) {
  sl.addShape(pptx.ShapeType.rect, {
    x, y, w, h,
    fill: { color: opts.fill || C.cardNavy },
    line: { color: opts.line || C.cardBorder, width: opts.lineWidth || 0.5 },
    shadow: E.shadow()
  });
}

function addChip(sl, text, x, y, w, color) {
  sl.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h: 0.25,
    rectRadius: 0.04,
    fill: { color },
    line: { color, width: 0.5 }
  });
  addText(sl, text, x + 0.06, y + 0.075, w - 0.12, 0.08, {
    fontSize: 6.8,
    bold: true,
    color: C.white,
    align: "center",
    charSpacing: 0.6
  });
}

async function icon(IconComponent, color = `#${C.white}`) {
  return E.iconToBase64(IconComponent, color, 128);
}

async function main() {
  const gb = await E.makeGradientBar();
  const icons = {
    zap: await icon(FiZap),
    cpu: await icon(FiCpu),
    target: await icon(FiTarget),
    loop: await icon(FiRefreshCw),
    qa: await icon(FiCheckCircle),
    version: await icon(FiGitBranch),
    shield: await icon(FiShield),
    layers: await icon(FiLayers),
    clip: await icon(FiClipboard)
  };

  const sl = pptx.addSlide();
  sl.background = { color: C.inkNavy };
  E.addGradBar(sl, gb);

  addText(sl, spaced("AGENTIC SYSTEM"), 0.25, 0.12, 9.45, 0.20, {
    fontSize: 8.5,
    charSpacing: 3,
    color: C.coolGrey
  });

  addText(sl, "This Is Not Prompt-to-PowerPoint.", 0.35, 0.45, 5.75, 0.42, {
    fontSize: 25,
    bold: true,
    color: C.white
  });
  addText(sl, "It is a governed agentic deck system.", 0.35, 0.88, 5.65, 0.25, {
    fontSize: 13.5,
    color: C.mustardGold,
    italic: true
  });

  addPanel(sl, 0.42, 1.48, 2.28, 2.35, { fill: "111844", line: "344075" });
  sl.addImage({ data: icons.zap, x: 1.36, y: 1.78, w: 0.30, h: 0.30 });
  addText(sl, "PROMPT", 0.70, 2.25, 1.70, 0.18, {
    fontSize: 11,
    bold: true,
    color: C.coolGrey,
    align: "center"
  });
  addText(sl, "Make me slides\nfrom this text.", 0.70, 2.62, 1.70, 0.40, {
    fontSize: 13,
    bold: true,
    color: C.white,
    align: "center",
    valign: "mid"
  });
  addText(sl, "Fast output.\nWeak control.", 0.76, 3.33, 1.58, 0.28, {
    fontSize: 8,
    color: C.coolGrey,
    align: "center"
  });

  addText(sl, ">", 2.88, 2.48, 0.35, 0.32, {
    fontSize: 25,
    bold: true,
    color: C.mustardGold,
    align: "center"
  });

  addPanel(sl, 3.18, 1.23, 3.40, 2.88, { fill: C.cardNavy, line: C.purple, lineWidth: 1.0 });
  sl.addShape(pptx.ShapeType.ellipse, {
    x: 4.33, y: 1.55, w: 1.06, h: 1.06,
    fill: { color: C.logoCircle },
    line: { color: C.purple, width: 1.0 },
    shadow: E.shadow()
  });
  sl.addImage({ data: icons.cpu, x: 4.69, y: 1.89, w: 0.34, h: 0.34 });
  addText(sl, "AGENTIC LOOP", 3.63, 2.78, 2.46, 0.18, {
    fontSize: 11,
    bold: true,
    color: C.white,
    align: "center"
  });
  const steps = [
    ["READ", icons.clip, C.indigoBlue],
    ["PLAN", icons.target, C.deepIndigo],
    ["BUILD", icons.layers, C.purple],
    ["CHECK", icons.qa, C.fieryCoral],
    ["REBUILD", icons.loop, C.darkMagenta]
  ];
  steps.forEach((step, idx) => {
    const x = 3.48 + idx * 0.58;
    const y = 3.22;
    sl.addShape(pptx.ShapeType.ellipse, {
      x, y, w: 0.38, h: 0.38,
      fill: { color: step[2] },
      line: { color: step[2], width: 0.5 }
    });
    sl.addImage({ data: step[1], x: x + 0.105, y: y + 0.105, w: 0.17, h: 0.17 });
    addText(sl, step[0], x - 0.06, y + 0.53, 0.50, 0.09, {
      fontSize: 5.6,
      bold: true,
      color: C.coolGrey,
      align: "center"
    });
  });
  addText(sl, "Goal-directed work across steps.\nTools. Memory. Feedback. Course correction.", 3.62, 2.05, 2.54, 0.44, {
    fontSize: 8.7,
    color: C.coolGrey,
    align: "center"
  });

  addText(sl, ">", 6.78, 2.48, 0.35, 0.32, {
    fontSize: 25,
    bold: true,
    color: C.mustardGold,
    align: "center"
  });

  addPanel(sl, 7.08, 1.48, 2.48, 2.35, { fill: "111844", line: C.fieryCoral, lineWidth: 0.9 });
  sl.addImage({ data: icons.shield, x: 8.17, y: 1.73, w: 0.34, h: 0.34 });
  addText(sl, "GOVERNED SYSTEM", 7.32, 2.25, 2.00, 0.18, {
    fontSize: 10.5,
    bold: true,
    color: C.white,
    align: "center"
  });
  addChip(sl, "VERSIONING", 7.42, 2.70, 0.92, C.indigoBlue);
  addChip(sl, "QA GATES", 8.42, 2.70, 0.78, C.purple);
  addChip(sl, "FEEDBACK", 7.50, 3.08, 0.82, C.deepIndigo);
  addChip(sl, "APPROVAL", 8.42, 3.08, 0.82, C.fieryCoral);
  addText(sl, "Reliable output.\nInspectable control.", 7.46, 3.47, 1.76, 0.22, {
    fontSize: 8,
    color: C.coolGrey,
    align: "center"
  });

  sl.addShape(pptx.ShapeType.rect, {
    x: 0.42, y: 4.38, w: 9.12, h: 0.46,
    fill: { color: C.cream },
    line: { color: "E0D6B8", width: 0.5 },
    shadow: E.shadow()
  });
  addText(sl, "The agent is not the magic. The system around the agent is the product.", 0.68, 4.52, 8.60, 0.14, {
    fontSize: 13.5,
    bold: true,
    color: C.cardNavy,
    align: "center"
  });

  E.addDarkFooter(sl, "A demo proves capability. A governed system proves repeatability.", 1);

  await pptx.writeFile({ fileName: outputPath });
  fs.writeFileSync(manifestPath, JSON.stringify({
    deck: {
      id: "agentic-deck-system-single-slide",
      title: "This Is Not Prompt-to-PowerPoint",
      brand: "AxlFlo",
      intent: "Single-slide explanation of why the deck creation process qualifies as a governed agentic AI workflow."
    },
    slide_count: 1,
    expectedSlides: 1,
    output: outputPath,
    generated_at: new Date().toISOString(),
    slides: [
      {
        num: 1,
        type: "agenticSystem",
        label: "This Is Not Prompt-to-PowerPoint",
        bg: "dark",
        gradientBar: true,
        number_led: false,
        density: "medium",
        visual_anchor: "prompt-to-agentic-loop-to-governed-system"
      }
    ]
  }, null, 2));
  console.log(`Built ${outputPath}`);
  console.log(`Manifest ${manifestPath}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
