"use strict";
/**
 * AxlFlo Deck Engine v5.4 — brand constants + anatomy helpers only.
 * Brain/resolver layer removed. Build scripts own all layout decisions.
 * Import: const E = require("../lib/engine");
 *
 * BORDER RULE (v5.3 permanent fix):
 *   Coloured fill shapes (stripes, badges, separators) → omit `line` property.
 *   Text containers (cards, CTA boxes, rows)           → line:{color:C.cardBorder, width:0.5}
 *   pptxgenjs line:{width:0} silently emits a 1pt border in OOXML.
 *   Omitting line entirely = no border element = clean render in PowerPoint.
 */

const sharp = require("sharp");
const path  = require("path");
const fs    = require("fs");

// ─── VERSION ─────────────────────────────────────────────────────────────────
function loadVersion(repoRoot) {
  return JSON.parse(
    fs.readFileSync(path.join(repoRoot, "version.json"), "utf8")
  ).specVersion;
}

// ─── BRAND CONSTANTS ─────────────────────────────────────────────────────────
const C = {
  indigoBlue:  "4626BD",  // Primary  — always first in sequences
  purple:      "B124F6",  // Secondary — middle
  fieryCoral:  "EA4E43",  // Tertiary  — always last
  deepIndigo:  "2854C5",
  darkMagenta: "67237B",
  inkNavy:     "0D1137",  // Dark slide background
  cardNavy:    "172058",  // Card fill on dark slides
  white:       "FFFFFF",
  coolGrey:    "B0BEC5",  // Section labels, muted text
  mustardGold: "E89923",  // Footer taglines + closing punchline ONLY
  cardBorder:  "3D4A8A",  // Card border — always 0.5pt
  lightTint:   "F0F2FF",  // Alternating row fill (white slides)
  cream:       "F5EDD6",  // Pull quote + CTA (white slides)
  cardWhite:   "F4F6FF",  // Card fill (white slides)
  borderLight: "C5CAE9",  // Card border (white slides)
  logoCircle:  "162055",  // Dark circle behind logo (T and X slides)
};

// §2.2 — Colour sequence lookup — always Indigo first, Coral last
const SEQ = [
  null, null,
  ["4626BD","EA4E43"],
  ["4626BD","B124F6","EA4E43"],
  ["4626BD","2854C5","67237B","EA4E43"],
  ["4626BD","2854C5","B124F6","67237B","EA4E43"],
];

// Shadow — always create fresh (never reuse object)
const shadow = () => ({
  type:"outer", color:"000000", blur:5, offset:2, angle:135, opacity:0.25
});

// ─── GRADIENT BAR — Coral→Purple→Indigo top to bottom (D12) ─────────────────
async function makeGradientBar() {
  const w = 8, h = 720;
  const stops = [
    {r:234,g:78, b:67 },   // EA4E43 Coral  — top
    {r:177,g:36, b:246},   // B124F6 Purple — mid
    {r:70, g:38, b:189},   // 4626BD Indigo — bottom
  ];
  const px = Buffer.alloc(w * h * 3);
  for (let y = 0; y < h; y++) {
    const t = y/(h-1), seg = t*2, i = Math.min(Math.floor(seg),1), f = seg-i;
    const a = stops[i], b2 = stops[i+1];
    const r  = Math.round(a.r  + (b2.r  - a.r)  * f);
    const g2 = Math.round(a.g  + (b2.g  - a.g)  * f);
    const bl = Math.round(a.b  + (b2.b  - a.b)  * f);
    for (let x = 0; x < w; x++) {
      const idx = (y*w+x)*3;
      px[idx] = r; px[idx+1] = g2; px[idx+2] = bl;
    }
  }
  const buf = await sharp(px, {raw:{width:w,height:h,channels:3}}).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

// ─── ICON HELPER ─────────────────────────────────────────────────────────────
async function iconToBase64(IconComponent, color="#FFFFFF", size=256) {
  const React    = require("react");
  const ReactDOM = require("react-dom/server");
  const svg = ReactDOM.renderToStaticMarkup(
    React.createElement(IconComponent, {color, size: String(size)})
  );
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

// ─── SLIDE HELPERS ────────────────────────────────────────────────────────────

const addGradBar = (sl, gb) =>
  sl.addImage({data:gb, x:0, y:0, w:0.04, h:5.625});

const addLogoArea = (sl, pres) => {
  sl.addShape(pres.shapes.OVAL, {x:5.9,y:0.4,w:3.8,h:3.8,
    fill:{color:C.logoCircle}});
  sl.addShape(pres.shapes.RECTANGLE, {x:6.6,y:1.2,w:2.4,h:1.3,
    fill:{color:C.cardNavy}, line:{color:C.cardBorder,width:0.5,dashType:"dash"}});
  sl.addText("[AXLFLO LOGO]", {x:6.6,y:1.2,w:2.4,h:1.3,
    fontFace:"Segoe UI", fontSize:11, italic:true,
    color:C.indigoBlue, align:"center", valign:"middle", margin:0});
};

const addSectionLabel = (sl, text) =>
  sl.addText(text, {x:0.2,y:0.12,w:9.5,h:0.22,
    fontFace:"Segoe UI", fontSize:9, charSpacing:3,
    color:C.coolGrey, align:"left", valign:"top", margin:0});

// Titles ≤40 chars. Longer → inline addText at 22pt h:0.75 (D10)
const addDarkTitle = (sl, text) =>
  sl.addText(text, {x:0.2,y:0.38,w:9.5,h:0.62,
    fontFace:"Segoe UI", fontSize:28, bold:true,
    color:C.white, align:"left", valign:"middle", margin:0});

// Pull quote — cream fill only, no bar, no outline (D15+D16 v5.3)
const addPullQuote = (sl, pres, text, y=1.12) => {
  const h = 0.52;
  sl.addShape(pres.shapes.RECTANGLE, {x:0.2, y, w:9.6, h,
    fill:{color:C.cream}, shadow:shadow()});
  sl.addText(text, {x:0.2, y, w:9.6, h,
    fontFace:"Segoe UI", fontSize:12, italic:true,
    color:"172058", align:"left", valign:"middle", margin:[0,0,0,12]});
};

// Dark card — stripe has no `line` property (v5.3 border fix)
const addDarkCard = (sl, pres, cx, cy, cw, ch, stripe, heading, body) => {
  sl.addShape(pres.shapes.RECTANGLE, {x:cx,y:cy,w:cw,h:ch,
    fill:{color:C.cardNavy}, line:{color:C.cardBorder,width:0.5}, shadow:shadow()});
  sl.addShape(pres.shapes.RECTANGLE, {x:cx,y:cy,w:0.02,h:ch,
    fill:{color:stripe}});
  sl.addText(heading, {x:cx+0.12,y:cy+0.07,w:cw-0.18,h:0.38,
    fontFace:"Segoe UI", fontSize:13, bold:true,
    color:C.white, align:"left", valign:"top", margin:0});
  if (body) sl.addText(body, {x:cx+0.12,y:cy+0.50,w:cw-0.18,h:ch-0.58,
    fontFace:"Segoe UI", fontSize:11,
    color:C.white, align:"left", valign:"top", margin:0});
};

const addDarkFooter = (sl, tagline, num) => {
  sl.addText(tagline, {x:0.2,y:5.32,w:8.8,h:0.22,
    fontFace:"Segoe UI", fontSize:11, italic:true,
    color:C.mustardGold, align:"left", valign:"middle", margin:0});
  sl.addText(String(num), {x:9.3,y:5.32,w:0.5,h:0.22,
    fontFace:"Segoe UI", fontSize:9,
    color:C.coolGrey, align:"right", valign:"middle", margin:0});
};

const addWhiteHeader = (sl, pres, sectionLabel, titleText) => {
  sl.addShape(pres.shapes.RECTANGLE, {x:0.09,y:0,w:9.91,h:1.12,
    fill:{color:C.inkNavy}});
  sl.addText(sectionLabel, {x:0.25,y:0.07,w:9.4,h:0.22,
    fontFace:"Segoe UI", fontSize:9, charSpacing:3,
    color:C.coolGrey, align:"left", valign:"top", margin:0});
  sl.addText(titleText, {x:0.25,y:0.30,w:9.4,h:0.65,
    fontFace:"Segoe UI", fontSize:26, bold:true,
    color:C.white, align:"left", valign:"middle", margin:0});
};

const addWhiteFooter = (sl, pres, tagline, num) => {
  sl.addShape(pres.shapes.RECTANGLE, {x:0,y:5.27,w:10,h:0.355,
    fill:{color:C.inkNavy}});
  sl.addText(tagline, {x:0.2,y:5.29,w:8.8,h:0.26,
    fontFace:"Segoe UI", fontSize:11, italic:true,
    color:C.mustardGold, align:"left", valign:"middle", margin:0});
  sl.addText(String(num), {x:9.3,y:5.29,w:0.5,h:0.26,
    fontFace:"Segoe UI", fontSize:9,
    color:C.coolGrey, align:"right", valign:"middle", margin:0});
};

// T and X footer — disclaimer left, gold tagline right
const addTitleFooter = (sl, disclaimer, tagline, num) => {
  sl.addText(disclaimer, {x:0.3,y:5.38,w:6,h:0.2,
    fontFace:"Segoe UI", fontSize:9,
    color:C.coolGrey, align:"left", valign:"middle", margin:0});
  sl.addText(tagline, {x:5.0,y:5.0,w:4.6,h:0.27,
    fontFace:"Segoe UI", fontSize:12, italic:true,
    color:C.mustardGold, align:"right", valign:"middle", margin:0});
  sl.addText(String(num), {x:9.3,y:5.38,w:0.5,h:0.2,
    fontFace:"Segoe UI", fontSize:9,
    color:C.coolGrey, align:"right", valign:"middle", margin:0});
};

module.exports = {
  C, SEQ, shadow, loadVersion,
  makeGradientBar, iconToBase64,
  addGradBar, addLogoArea, addSectionLabel, addDarkTitle,
  addPullQuote, addDarkCard, addDarkFooter,
  addWhiteHeader, addWhiteFooter, addTitleFooter,
};
