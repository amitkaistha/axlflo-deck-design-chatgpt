---
name: axlflo-deck-design
description: Apply the AxlFlo Master Deck Design System ONLY when Amit explicitly uses one of these trigger phrases — "AxlFlo deck", "AxlFlo design skill", "axlflo-deck-design", or "build using AxlFlo design system". Do NOT trigger for generic deck or presentation requests — those use the standard pptx skill instead. When triggered, always ALSO read SKILL_extended.md from the same folder before writing any pptxgenjs code — it contains assembled blueprints, build corrections, delta log, and version history.
---

# AxlFlo Master Deck Design System — Core (Parts 1–14)

**Version:** 5.4 | **Last updated:** April 2026
**Owner:** Amit Kaistha, AxlFlo
**Purpose:** Remove subjectivity from every deck produced under the AxlFlo brand. Apply this spec to any deck. When a rule exists here, follow it exactly. When a situation is not covered, apply the fallback principle at the end of each section.

*Full version history in Part 20 of SKILL_extended.md.*

-----

## HOW TO USE THIS DOCUMENT

This is a **decision system**, not a style guide. For every design decision you face, find the relevant lookup table or rule. If the situation exists in the table, use it. If it does not, apply the section's **Fallback Rule** and note what you did so it can be added to the system later.

**Priority order when rules conflict:**

1. Explicit rule in this document → always wins
2. Closest analogous rule → apply by analogy
3. Fallback principle → use and document
4. Aesthetic judgment → last resort only

-----


## PART 1 — THE BRAND CONSTANTS

These never change under any circumstance, for any deck, for any audience.

### 1.1 Primary Brand Colours

| Name | Hex | Role |
|---|---|---|
| **Indigo Blue** | `#4626BD` | Primary — always first in any sequence |
| **Purple** | `#B124F6` | Secondary — middle of sequences |
| **Fiery Coral** | `#EA4E43` | Tertiary — always last in any sequence |

### 1.2 Extended Palette (for sequences longer than 3)

When 4 or 5 items are needed, interpolate between the 3 primaries using these fixed intermediates. Do not invent new colours.

| Name | Hex | Position |
|---|---|---|
| **Deep Indigo** | `#2854C5` | Between Indigo Blue and Purple |
| **Dark Magenta** | `#67237B` | Between Purple and Fiery Coral |
| **Warm Amber** | `#C07010` | Alternate intermediate (use for warm-toned slides) |

### 1.3 Background Colours

| Name | Hex | Use |
|---|---|---|
| **Ink Navy** | `#0D1137` | Dark slide background |
| **Card Navy** | `#172058` | All cards on dark slides |
| **Pure White** | `#FFFFFF` | White slide content area |
| **Header Navy** | `#0D1137` | Header band on white slides |
| **Footer Navy** | `#0D1137` | Footer bar on all slides |
| **Light Row Tint** | `#F0F2FF` | Alternate rows on white slides |

### 1.4 Text Colours

| Role | Colour | Hex | Rule |
|---|---|---|---|
| Primary text (dark slides) | White | `#FFFFFF` | All headings and body on dark slides |
| Primary text (white slides) | Ink Navy | `#0D1137` | All headings and body on white slides |
| Secondary / muted text | Cool Grey | `#B0BEC5` | Section labels, captions, sub-text |
| Footer tagline | Mustard Gold | `#E89923` | Footer only — never used elsewhere |
| Badge numbers | White | `#FFFFFF` | Text inside coloured badge circles/squares — always white |
| CTA text on Coral fill | Ink Navy | `#0D1137` | Dark text on Fiery Coral for contrast |

**Text colour fallback rule:** If slide background is dark → white text. If slide background is white → `#0D1137` navy text. Never use a brand accent colour for running text.

### 1.5 Font

**Segoe UI** is the only font used in all AxlFlo decks.

| Role | Weight | Size | Notes |
|---|---|---|---|
| Slide Title | Bold | 28–36pt | Single line preferred. Max 60 chars. For titles >40 chars on Type N/I slides, reduce to 22–24pt and increase h to 0.75". See D10. |
| Section Label | Regular | 9pt, charSpacing 3 | Spaced caps: "T H E   P R O B L E M" |
| Card / Row Heading | Bold | 13–14pt | pptxgenjs has no SemiBold — use bold:true |
| Body Text | Regular | 11–12pt | 11pt minimum. Never smaller. |
| Stat Number (display) | Bold | 40–52pt | Single accent colour |
| Stat Label | Regular | 11pt | |
| Footer Tagline | Italic | 11pt | Mustard gold only |
| Badge Letter/Number | Bold | 14–18pt | Inside coloured badge |
| Slide Number | Regular | 9pt | Bottom right, cool grey |
| Pull Quote | Italic | 12–13pt | Dark navy on cream background |

**Font fallback rule:** If Segoe UI is unavailable on the render machine, use Calibri. Never Arial, never system default.

-----

## PART 2 — THE COLOUR SEQUENCE SYSTEM

### 2.1 The Core Rule

> **Indigo Blue always opens. Fiery Coral always closes. Everything in between is interpolated from the fixed extended palette. The sequence never restarts within a slide.**

### 2.2 Sequence Lookup Table

Whenever you have a group of coloured elements on a slide (card left stripes, header bands, badge fills, column headers), look up the count and apply the exact sequence. No deviation.

| Count | Colour 1 | Colour 2 | Colour 3 | Colour 4 | Colour 5 |
|---|---|---|---|---|---|
| **2** | `#4626BD` | | | | `#EA4E43` |
| **3** | `#4626BD` | `#B124F6` | `#EA4E43` | | |
| **4** | `#4626BD` | `#2854C5` | `#67237B` | `#EA4E43` | |
| **5** | `#4626BD` | `#2854C5` | `#B124F6` | `#67237B` | `#EA4E43` |
| **6+** | `#4626BD` | `#2854C5` | `#B124F6` | `#67237B` | `#EA4E43` then repeat from position 2 |

### 2.3 What counts as a "group" for sequencing

Apply the sequence to: card left accent stripes, column header bands, letter/number badge fills, stat card accents on a single slide, row header squares in a table.

Do NOT apply the sequence to: the left gradient bar, the footer tagline, card borders, body text or headings.

### 2.4 Sequence Fallback Rule

If you have more than 5 items in a group, resume from position 2 (`#2854C5`) after position 5. Never start again from position 1 (`#4626BD`) — that would create a false visual break.

-----

## PART 3 — THE GRADIENT SYSTEM

### 3.1 The Left Vertical Bar

Every content slide has exactly **one** gradient element: the left vertical accent bar.

```
Position: x=0, y=0
Width: 0.09" (approx 9px)
Height: 5.625" (full slide height)
Direction: Top to Bottom

Stops (fixed, never change):
  0%:    #EA4E43  (Fiery Coral)
  50%:   #B124F6  (Purple)
  100%:  #4626BD  (Indigo Blue)
```

### 3.2 Where the Gradient Bar Appears

| Slide type | Gradient bar? |
|---|---|
| Dark content slide | ✅ Yes |
| White content slide | ✅ Yes (same position, same colours) |
| Title slide | ❌ No |
| Closing / conclusion slide | ❌ No |
| Section divider slide | ❌ No |

**v3.3 explicit rule:** Type T and Type X slides carry **no section label and no gradient bar**. This applies to both elements together. Content slides (N, I, P, F, C, A, D, R, S) always carry both.

### 3.3 Gradient Rules

- The gradient never appears on card tops, column headers, footer bars, or any horizontal element
- No other gradient exists in the deck except this one vertical bar
- The gradient is always rendered as a PNG (pptxgenjs cannot produce true gradients natively)
- The 3 colour stops are always `#4626BD`, `#B124F6`, `#EA4E43` in that order, top to bottom

### 3.4 Gradient Generation Code (pptxgenjs)

```javascript
async function makeGradientBar() {
  const w = 8, h = 720;
  const stops = [
    { r:234, g:78,  b:67  },  // #EA4E43 Fiery Coral
    { r:177, g:36,  b:246 },  // #B124F6 Purple
    { r:70,  g:38,  b:189 },  // #4626BD Indigo Blue
  ];
  const px = Buffer.alloc(w * h * 3);
  for (let y = 0; y < h; y++) {
    const t = y / (h - 1);
    const seg = t * 2;
    const i = Math.min(Math.floor(seg), 1);
    const f = seg - i;
    const a = stops[i], b = stops[i + 1];
    const r  = Math.round(a.r + (b.r - a.r) * f);
    const g  = Math.round(a.g + (b.g - a.g) * f);
    const bl = Math.round(a.b + (b.b - a.b) * f);
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 3;
      px[idx] = r; px[idx+1] = g; px[idx+2] = bl;
    }
  }
  const buf = await sharp(px, { raw: { width: w, height: h, channels: 3 } }).png().toBuffer();
  return 'image/png;base64,' + buf.toString('base64');
}

// Add to slide:
slide.addImage({ data: gradBar, x: 0, y: 0, w: 0.09, h: 5.625 });
```

-----

## PART 4 — THE BACKGROUND SELECTION SYSTEM

### 4.1 The Core Principle

> **Dark background = Narrative, Emotion, Tension.**
> **White background = Structure, Logic, Credibility.**

### 4.2 Background Type Lookup Table

| Slide Purpose | Background |
|---|---|
| Title / opener | Dark |
| Closing / conclusion | Dark |
| Section divider / transition | Dark |
| Problem statement / story | Dark |
| Insight / paradox / uncomfortable truth | Dark |
| Before/After narrative contrast | Dark |
| Process diagram / cycle | Dark |
| **Framework / methodology** | **White** |
| **Structured comparison table** | **White** |
| **Action plan / checklist** | **White** |
| **Credentials / proof points** | **White** |
| **Data / statistics dense** | **White** |
| Quote / testimonial | Dark |
| About / bio | White |

### 4.3 Background Fallback Rule

If ambiguous: *Is the reader supposed to feel something or understand something?* Feel → Dark. Understand → White. Default to Dark.

### 4.4 White Slide Anatomy

```
Layer 1:  Gradient left bar (x=0, y=0, w=0.09, h=5.625)
Layer 2:  Full-width DARK NAVY HEADER BAND
            x=0.09, y=0, w=9.91, h=1.05
            fill: #0D1137
            Contains:
              Section label: x=0.2, y=0.1, Segoe UI 9pt, charSpacing 3, #B0BEC5
              Slide title:   x=0.2, y=0.35, Segoe UI Bold 28–32pt, #FFFFFF
Layer 3:  WHITE CONTENT AREA
            x=0.09, y=1.05, w=9.91, h=4.3
            fill: #FFFFFF
Layer 4:  DARK NAVY FOOTER BAR
            x=0, y=5.27, w=10, h=0.35
            fill: #0D1137
            Footer tagline: Segoe UI Italic 11pt, #E89923
            Slide number: Segoe UI 9pt, #B0BEC5, right-aligned
```

### 4.5 Dark Slide Anatomy

```
Layer 1:  Background: #0D1137, full slide
Layer 2:  Gradient left bar: x=0, y=0, w=0.09, h=5.625
Layer 3:  Content (cards, text) — all text white
Layer 4:  Footer: Segoe UI Italic 11pt, #E89923
          Slide number: bottom-right, #B0BEC5
```

-----

## PART 5 — THE PULL QUOTE SYSTEM

### 5.1 The Core Rule

> A pull quote is a **scene-setter or problem-framer**. It appears at the top of a slide, before the structured content. Never used for decoration.

### 5.2 Pull Quote Decision Table

| Situation | Use pull quote? |
|---|---|
| Slide opens with a real-world scenario or story | ✅ Yes |
| Slide opens with a provocative problem statement | ✅ Yes |
| Slide opens with a direct quote from a person | ✅ Yes |
| Slide is a framework, table, or process | ❌ No |
| Slide is a stats/data slide | ❌ No |
| Slide is a CTA or conclusion | ❌ No |
| Slide already has a pull quote on the previous slide | ❌ No — max one per slide, never consecutive |

### 5.3 Pull Quote Specification

```
Style: CREAM
  Card fill:   #F5EDD6 (warm cream)
  Left bar:    #4626BD (Indigo Blue), w=0.07", full card height
  Border:      #4626BD, 0.5pt
  Shadow:      makeShadow() — fresh object, outer, blur 5, offset 2, angle 135, opacity 0.25
  Text:        Segoe UI Italic 12–13pt, colour #172058 (dark navy on cream)
  Position:    x=0.2", y=1.18" (immediately below title block)
  Size:        w=9.6", h=0.5–0.65" (single-thought, max 2 lines)

The left bar on the pull quote is ALWAYS #4626BD (Indigo Blue).
It does not cycle through the sequence. It is a fixed anchor.
```

### 5.4 Pull Quote Fallback Rule

*Could this sentence appear on a billboard?* If yes → pull quote. If more than 25 words → body text.

-----

## PART 6 — THE CARD SYSTEM

### 6.1 Card Baseline Specification

```javascript
const makeShadow = () => ({
  type: 'outer', color: '000000',
  blur: 5, offset: 2, angle: 135, opacity: 0.25
});

// Every card:
slide.addShape(pres.shapes.RECTANGLE, {
  x: cx, y: cy, w: cw, h: ch,
  fill:   { color: '172058' },
  line:   { color: '3D4A8A', width: 0.5 },
  shadow: makeShadow()
});
```

On **white slides**: card fill = `#F4F6FF`, border = `#C5CAE9`. Shadow identical.

### 6.2 Card Left Accent Stripe

```
Width:  0.07"
Height: Full card height
Colour: Per §2.2 sequence — position in the group determines colour
```

### 6.3 Card Type Lookup Table

| Content type | Card type |
|---|---|
| Bullet point with heading + body | **List item card** |
| Large number + short label | **Stat playcard** |
| Step in a sequence with a number | **Numbered column card** |
| Framework row (letter + label + description) | **Framework row card** |
| Before vs After | **Comparison header card** |
| Key message on **dark slide** | **CTA box (Coral)** |
| Key message on **white slide** | **CTA box (Cream)** |
| Scene-setter / problem framer | **Pull quote** |
| Sub-label / tag | **Tag badge** |

### 6.4 CTA Box — Dark vs White Rule

```
CTA BOX — DARK SLIDES (Types N, I, P, C-dark, X):
  Fill:     #EA4E43 (Fiery Coral)
  Border:   none
  Shadow:   makeShadow()
  Text:     Segoe UI Bold 14–16pt, #0D1137

CTA BOX — WHITE SLIDES (Types F, A, C-white, D, R):
  Fill:     #F5EDD6 (Cream)
  Border:   #4626BD, 0.5pt
  Left bar: #4626BD, w=0.07", full card height
  Shadow:   makeShadow()
  Text:     Segoe UI Bold 14–16pt, #0D1137
```

-----

## PART 7 — THE BADGE SYSTEM

### 7.1 Badge Type Decision Table

| Situation | Badge type |
|---|---|
| Numbered sequence (1, 2, 3…) | **Circle with number** |
| Framework acronym (C, T, V…) | **Square with letter** |
| Labelled tag (CONTEXT, TRACKS…) | **Outlined tag** |
| Phase label | **Full header band** |

### 7.2 Badge Specification

```
Circle badge:
  Shape: OVAL (equal w/h), Size: 0.48–0.52"
  Fill: accent colour per §2.2 sequence
  Text: Segoe UI Bold 14–16pt, #FFFFFF (always white)

Square badge (letter):
  Shape: RECTANGLE, Size: 0.48–0.52" square
  Fill: accent colour per §2.2 sequence
  Text: Segoe UI Bold 18–20pt, #FFFFFF (always white)

Tag badge (labelled):
  Shape: RECTANGLE, Size: ~0.8–1.6" × 0.26"
  Fill: NONE on dark slides / #F4F6FF on white slides  ← v3.3 DELTA
  Border: accent colour, 0.5pt
  Text colour: #FFFFFF on dark slides / #0D1137 on white slides  ← v3.3 DELTA
  Text: Segoe UI Bold 8–9pt, charSpacing 1
  — Do NOT fill tag badges with solid brand colour. Outlined only.
```

**v3.3 Tag badge colour rule (DELTA D2 + D3):**
Tag badge text and fill are context-dependent by slide background:
- **Dark slides:** `fill: transparent`, text `#FFFFFF`
- **White slides:** `fill: #F4F6FF` (card tint), text `#0D1137`

True transparency on a white card creates an invisible outline. Card tint fill maintains the outlined aesthetic while providing contrast.

### 7.3 Badge Fallback Rule

Numbers → circle. Letters → square. Words → outlined tag. When in doubt, outline only.

### 7.4 Uniform Badge Rule — Process (Type P) Slides

> **On Type P slides, all numbered badges use a SINGLE uniform colour — Warm Amber `#D4821A`.**

| Slide type | Badge fill rule |
|---|---|
| **P (Process/Cycle)** | All badges = uniform Warm Amber `#D4821A` |
| All other types | Sequence per §2.2 |

-----

## PART 8 — THE STAT PLAYCARD SYSTEM

### 8.1 When to Use

Use when a single number is the primary point, must be read from across a room, on a data/stats slide.

### 8.2 Stat Playcard Specification

```
Card fill:    #172058 (dark) or #F4F6FF (white)
Border:       #3D4A8A, 0.5pt
Shadow:       makeShadow()
Left stripe:  accent colour per §2.2 sequence (w=0.07")

Stat number:  Segoe UI Bold, 40–52pt, accent colour matching stripe
Primary label: Segoe UI Regular, 11pt, #FFFFFF or #0D1137
Source label: Segoe UI Italic, 10pt, #B0BEC5

Rule: All stat playcards on the same slide use the SAME accent colour for numbers.
```

-----

## PART 9 — THE LAYOUT SELECTION SYSTEM

### 9.1 Layout Lookup Table

| Items | Layout |
|---|---|
| 1 | Full-width single card |
| 2 | Two equal columns |
| 3 | Three equal columns |
| 4 | 2×2 grid |
| 5 | Full-width rows × 5 |
| 6 | 2×3 grid |
| 7 | Single row of 7 narrow cards |
| 8+ | Split across two slides |

### 9.2 Column Gutter Specifications

| Layout | Gutter width |
|---|---|
| 2 columns | 0.14" |
| 3 columns | 0.12" |
| 4–5 columns | 0.08" |
| 6–7 columns | 0.06" |

### 9.3 Layout Fallback Rule

Reduce content before reducing font size. A slide that needs 10pt to fit has too many items.

-----

## PART 10 — THE SLIDE TYPE SYSTEM

### 10.1 Slide Type Catalogue

| Code | Type | Background | Key characteristics |
|---|---|---|---|
| **T** | Title | Dark | Logo + SHIFT tagline + author card. No section label. No gradient bar. |
| **N** | Narrative / Story | Dark | Pull quote + list item cards |
| **I** | Insight / Tension | Dark | 2×2 or 3 column card grid |
| **P** | Process / Cycle | Dark | Numbered column cards — uniform amber badges |
| **F** | Framework / Methodology | White | Letter badge rows |
| **C** | Comparison | Dark or White | Before/After header bands, › connector |
| **A** | Action Plan | White | Numbered full-width rows + Cream CTA |
| **D** | Data / Statistics | White | Stat playcards in 3-column grid |
| **X** | Conclusion / Closing | Dark | Logo + pillar cards + Coral CTA. No section label. No gradient bar. |
| **S** | Section Divider | Dark | Large section number/title only |
| **R** | Credentials / Proof | White | Stat mini-cards + bullet list |

**v3.3 rule (DELTA D6):** Types T and X carry **no section label and no gradient bar**. This must be stated explicitly. All other types carry both. The blueprints in Part 16 reflect this but the rule was previously only implicit.

### 10.2 Slide Type Decision Rule

One sentence: what must this slide *do*?
- Feel a problem → **N** | Show a contradiction → **I** | Walk a process → **P**
- Teach a system → **F** | Compare states → **C** | Tell what to do → **A**
- Prove with data → **D** | Open a section → **S** | Close and call → **X**

### 10.3 Visual Rhythm Rule

Never more than **4 consecutive dark** or **3 consecutive white** slides.

Example 8-slide pattern: `Dark → Dark → Dark → Dark → White → Dark → White → Dark`

-----

## PART 11 — COMPONENT-SPECIFIC RULES

### 11.1 The `›` Arrow Connector

```
Symbol:   › (U+203A) or > (U+003E)
Font:     Segoe UI Bold, 24–28pt
Colour:   #B124F6 (Purple)
Position: Horizontally centred between two columns, vertically centred with header bands

v3.3 geometry (DELTA D8):
  x = left_col_x + left_col_width
  w = right_col_x − (left_col_x + left_col_width)
  For standard two-column layout at x=0.2, col_w=4.65, right_col_x=5.15:
    connector x=4.85, w=0.30"
  align: center — text box spans the full inter-column gap.
```

### 11.2 Alternating Row Shading (White Slides Only)

```
Odd rows (1, 3, 5...):  #FFFFFF
Even rows (2, 4, 6...): #F0F2FF
Row border:             #E8EAF6, 0.5pt horizontal only
```

### 11.3 Section Label Format

```
Text:     ALL CAPS, space between every letter, two spaces between words
          Example: "T H E   F R A M E W O R K"
Font:     Segoe UI Regular, 9pt, charSpacing 3
Colour:   #B0BEC5 (cool grey)
Position: x=0.2", y=0.12" on dark slides
          x=0.2" inside header band on white slides
Appears:  Types N, I, P, F, C, A, D, R, S only. NOT on T or X.
```

### 11.4 Footer Tagline Rule

```
Must do ONE of:
  (a) Advance the argument from the slide above
  (b) Provoke a question in the reader's mind
  (c) State the principle the slide's content proves

Must NOT: repeat the title, summarise what's already shown, use generic filler.

Font:   Segoe UI Italic, 11pt
Colour: #E89923 (Mustard Gold) — only place this colour appears
```

### 11.5 Logo Placeholder Rule

```
Location:    Types T and X only
Dark circle: OVAL, x=5.9, y=0.4, w=3.8, h=3.8, fill #162055
Placeholder: RECT, x=6.6, y=1.2, w=2.4, h=1.3
             fill #172058, border #3D4A8A 0.5pt dashed
             Text: "[AXLFLO LOGO]", Italic 11pt, #4626BD, centred
```

### 11.6 Title Slide (Type T) — Required Elements in Order

```
1. Main title         — Segoe UI Bold 44pt, #FFFFFF
2. SHIFT tagline card — Text in card (#172058), Regular 11pt, #B0BEC5
3. Subtitle           — Free-standing text, Regular 18pt, #FFFFFF (NO card box)
4. Italic descriptor  — Italic 13pt, #B0BEC5
5. Coral separator    — fill #EA4E43 (NOT #3D4A8A — see §15.1)
6. Framework attr     — Regular 13pt, #B0BEC5
7. Contact line       — Name (charSpacing 3) · email (normal spacing), 11pt, #B0BEC5
8. Footer             — Disclaimer bottom-left + Gold tagline right
```

### 11.7 Type X (Closing) — Accent Subtitle Colour

> **Closing slides use `#EA4E43` Fiery Coral for the accent subtitle. NOT Purple.**

```
Closing slide accent subtitle:
  Font:   Segoe UI Bold, 18–22pt  ← v3.3: reduced from 26pt (see §16.9 and DELTA D1)
  Colour: #EA4E43 (Fiery Coral)
```

-----

## PART 12 — THE FALLBACK PRINCIPLES

### 12.1 The Hierarchy Test

- Colour → §2.2 sequence table
- Background → feel vs. understand rule (§4.3)
- Component → §6.3 lookup table
- Layout → §9.1 item count

### 12.2 The Subtraction Principle

When in doubt, remove rather than add.

### 12.3 The Consistency Principle

A slightly wrong decision applied consistently looks intentional. A slightly wrong decision applied inconsistently looks like a mistake.

### 12.4 The Projection Test

*Can a CXO at 15 feet read the key message in 3 seconds?* If not — larger font, less content, more contrast. Never shrink font to fit content. Cut content to fit the font.

### 12.5 The Documentation Rule

Any design decision made using the Fallback Principles must be noted and proposed for the next version of this spec.

-----

## PART 13 — VISUAL VERIFICATION CHECKLIST

### 13.1 Global Checks

- [ ] **GR-01** — One gradient bar per content slide. Zero horizontal gradients.
- [ ] **GR-02** — Left bar colours: `#4626BD` → `#B124F6` → `#EA4E43` top to bottom.
- [ ] **GR-03** — Title (T) and closing (X) slides: no gradient bar, no section label.
- [ ] **GR-04** — No card or box uses a gradient fill.
- [ ] **CO-01** — All colour sequences match §2.2 exactly.
- [ ] **CO-02** — Sequences never restart within a slide.
- [ ] **CO-03** — `#E89923` Mustard Gold appears only in footer taglines.
- [ ] **CO-04** — CTA: dark slides = Coral fill; white slides = Cream fill. Both = navy text.
- [ ] **FN-01** — Segoe UI is the only font.
- [ ] **FN-02** — Minimum body font: 11pt.
- [ ] **FN-03** — Section labels only use charSpacing 3. Contact line name uses charSpacing 3.
- [ ] **BX-01** — Every card has a fresh shadow object.
- [ ] **BX-02** — Every card: border `#3D4A8A`, 0.5pt.
- [ ] **BX-03** — Tag badges: no solid brand-colour fill. Outlined only.
- [ ] **BX-04** — `margin:0` set on all `addText` calls. ← v3.3 DELTA D7

### 13.2 Per-Slide Checks

- [ ] **BG-01** — Background matches §4.2 for content type.
- [ ] **BG-02** — Visual rhythm: ≤4 consecutive dark, ≤3 consecutive white.
- [ ] **BG-03** — White slides: navy header + white content + navy footer anatomy correct.
- [ ] **PQ-01** — Pull quote: cream `#F5EDD6`, `#4626BD` left bar, italic `#172058`.
- [ ] **PQ-03** — No consecutive slides with pull quotes.
- [ ] **BD-01** — Badge fills follow §2.2 sequence (except Type P = uniform amber).
- [ ] **BD-02** — Circle badges: number text always `#FFFFFF`.
- [ ] **BD-03** — Square badges: letter text always `#FFFFFF`.
- [ ] **BD-04** — Tag badges: outlined only (dark = transparent; white = `#F4F6FF`). ← v3.3
- [ ] **BD-05** — Type X accent subtitle: `#EA4E43` Coral only.
- [ ] **LY-01** — 0.4" safe margin all edges. No text clips.
- [ ] **LY-02** — Content does not extend below y=5.1".
- [ ] **LY-03** — Cards in a row: identical y and height.

### 13.3 CXO Readiness

- [ ] **CX-01** — 3-second test: topic and key message readable at a glance.
- [ ] **CX-02** — One idea per slide.
- [ ] **CX-04** — Hierarchy visible from font size alone.
- [ ] **CX-08** — Footer advances or provokes — does not repeat the title.
- [ ] **CX-09** — Dark/light rhythm feels like chapters.

### 13.4 Export Checks

- [ ] **EX-01** — File opens without font substitution warning.
- [ ] **EX-02** — Slide Show mode: no element shifts.
- [ ] **EX-03** — Gradient bar renders smoothly in PDF export.

-----

## PART 14 — QUICK REFERENCE CARD

```
BRAND COLOURS:
  #4626BD  Indigo Blue   — always first
  #B124F6  Purple        — always middle
  #EA4E43  Fiery Coral   — always last

EXTENDED (4–5 items):
  #2854C5  Deep Indigo   — positions 1→2
  #67237B  Dark Magenta  — positions 2→3

BACKGROUNDS:
  Dark BG:  #0D1137   Card: #172058   Border: #3D4A8A 0.5pt
  White BG: #FFFFFF   Card: #F4F6FF   Border: #C5CAE9 0.5pt

TEXT:
  Dark:  #FFFFFF body/headings | #B0BEC5 labels | #E89923 footer only
  White: #0D1137 body/headings | #B0BEC5 labels | #E89923 footer only

SEQUENCE TABLE:
  2: #4626BD → #EA4E43
  3: #4626BD → #B124F6 → #EA4E43
  4: #4626BD → #2854C5 → #67237B → #EA4E43
  5: #4626BD → #2854C5 → #B124F6 → #67237B → #EA4E43

BADGE EXCEPTION: Type P = uniform Warm Amber #D4821A
BADGE TEXT: Always #FFFFFF inside circle + square badges
TAG BADGE: Dark slide = transparent fill, white text
           White slide = #F4F6FF fill, #0D1137 text  ← v3.3

CTA BY BACKGROUND:
  Dark:  Coral #EA4E43 fill, navy #0D1137 text
  White: Cream #F5EDD6 fill, Indigo border #4626BD, navy text

TYPE X ACCENT SUBTITLE: #EA4E43 Coral (NOT Purple)
TYPE T + X: No gradient bar. No section label.

GRADIENT BAR: x=0, y=0, w=0.09, h=5.625 | top→bottom: #4626BD→#B124F6→#EA4E43
SHADOW: makeShadow() = outer, 000000, blur 5, offset 2, angle 135, opacity 0.25 — FRESH OBJECT EACH TIME
MARGIN: margin:0 on ALL addText calls — mandatory  ← v3.3
TITLE CONTACT LINE: name charSpacing:3 run | email charSpacing:0 run — rich text array  ← v3.3
PULL QUOTE: cream #F5EDD6, left bar #4626BD, text #172058 italic
FOOTER: Italic 11pt, #E89923, must advance/provoke not repeat
```

-----


-----

## ⚡ ALWAYS LOAD SKILL_extended.md NEXT

> **This is Part 1 of 2. Before writing any pptxgenjs code or making any deck decision, read the companion file:**
>
> `/mnt/skills/user/axlflo-deck-design/SKILL_extended.md`
>
> It contains:
> - **Part 15** — Build corrections from v3.0/v3.2 (title slide, badges, comparison variants)
> - **Part 16** — Assembled slide blueprints with exact coordinates for all slide types
> - **Part 17** — Text safety limits and character counts
> - **Part 18** — Icon system for Type P slides
> - **Part 19** — Delta log (all rendering decisions discovered during actual builds)
> - **Part 20** — Version history
>
> Use the `view` tool: `view /mnt/skills/user/axlflo-deck-design/SKILL_extended.md`
>
> **You only need to remember one skill name: `axlflo-deck-design`**
> The core skill always tells you to load the extended file. Nothing is missed.


---

# AxlFlo Master Deck Design System — Extended (Parts 15–20)

**Version:** 5.4 | **Last updated:** April 2026
**Companion to:** `SKILL.md` (Core, Parts 1–14)

> This file is always loaded alongside SKILL.md. It contains build-time knowledge,
> assembled blueprints, and the delta log. Do not read this file in isolation —
> the brand constants and rules in SKILL.md are required context.

-----

## PART 15 — RULES DISCOVERED FROM V3.0 AND V3.2 BUILDS

### 15.1 Title Slide (Type T) — Corrections (from v3.0)

**Separator line colour:** Purple `#B124F6` (NOT Coral, NOT grey). Creates a warm contrast against the dark background without competing with the Coral CTA elsewhere on the deck.

**Contact line charSpacing:** Name uses `charSpacing: 3` as a **run-level option** in a rich text array. Email uses `charSpacing: 0`. Setting charSpacing at the container level applies it to everything — defeating the per-run intent.

```javascript
// CORRECT — run-level charSpacing:
sl.addText([
  { text: "Amit Kaistha",             options: { charSpacing: 3 } },
  { text: "  ·  amit.kaistha@axlflo.ai", options: { charSpacing: 0 } },
], { x:0.4, y:3.24, w:5.0, h:0.27, fontFace:"Segoe UI", fontSize:11,
     color:"B0BEC5", align:"left", valign:"middle", margin:0 });
```

**No card boxes on title slide:** Subtitle and contact line are free-standing text. Cards compete with the logo circle. The SHIFT tagline card is the only boxed element on slide 1.

**Title slide font sizes (v5.3):**
```
SHIFT tagline card text:  9pt, Regular, #B0BEC5 — thin card border 0.3pt
Subtitle line 1:          15pt, Regular, #FFFFFF
Subtitle line 2 (italic): 11pt, Italic, #B0BEC5
Framework attr:           13pt, Regular, #B0BEC5
Contact line:             11pt — name charSpacing:3, email normal
```

**Two-level footer on T and X slides:**
```
Line 1 (bottom-left): "SHIFT to SCALE is a proprietary framework by AxlFlo LLC"
  Font: Segoe UI Regular, 9pt, #B0BEC5, x=0.3, y=5.38

Line 2 (bottom-right): Gold tagline
  Font: Segoe UI Italic, 12pt, #E89923, right-aligned, y=5.0
```

### 15.2 Process Slides (Type P) — Icon Layer

Process cards must include an icon between the badge and the label.

```javascript
async function iconToBase64Png(IconComponent, color = "#FFFFFF", size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + pngBuffer.toString("base64");
}
slide.addImage({ data: iconData, x: cx, y: cy, w: 0.45, h: 0.45 });
```

### 15.3 Framework Slides (Type F) — Square Badge + Tag Badge Combination

Layout per row (left to right): `[Square badge 0.48"×0.48"] [Tag badge ~0.8–1.6"×0.26"] [Heading + body]`

On white slides the tag badge uses `fill: #F4F6FF`, text `#0D1137` per §7.2 v3.3 rule.

### 15.4 Comparison Slides (Type C) — Checklist Variant

Left column (belief): Indigo `#4626BD` header, ✓ items.
Right column (reality): Coral `#EA4E43` header, dark navy header text, ✗ items.
CTA: cream `#F5EDD6` with Coral left bar.
Name the person in right column — "Sarah" is more memorable than "the reviewer."

### 15.5 Comparison Slides (Type C) — White Variant with Stat Playcards

Before column: no card per item — navy left-bar markers (0.04" wide, `#0D1137`) + plain text.
After column: `#F4F6FF` tint, circle badges per §2.2 sequence (NOT uniform amber).
Stat playcards (3 across) at bottom: `fill #F4F6FF`, stripe per §2.2 sequence, stat Bold 40pt.

### 15.6 Action Plan Slides (Type A) — Zero-Padded Badge Numbers

Badges use "01", "02", "03" — not "1", "2", "3". Type A uses §2.2 sequence — NOT uniform amber.

### 15.7 Closing Slide (Type X) — Stacked Pillar Layout

Pillars stack **vertically** on the left half. Logo circle occupies the right half.

```
Pillar card body text: Segoe UI Italic, 11pt, #B0BEC5
```

### 15.8 Footer Disclaimer on T and X Slides

```
"SHIFT to SCALE is a proprietary framework by AxlFlo LLC"
Font: Segoe UI Regular, 9pt, #B0BEC5
Position: x=0.3, y=5.38 — bottom-left only
```


### 15.9 Coloured Accent Stripes — No Border Rule

> **All coloured vertical accent stripes (card left stripes, pull quote left bar, column header bands) must have zero border width. Only text-containing boxes carry visible borders.**

```javascript
// CORRECT — stripe with no border:
sl.addShape(pres.shapes.RECTANGLE, {
  x: cx, y: cy, w: 0.07, h: ch,
  fill: { color: stripe },
  line: { color: stripe, width: 0 }   // width: 0 — no visible outline
});

// WRONG — stripe with border (creates a visible coloured outline):
sl.addShape(pres.shapes.RECTANGLE, {
  fill: { color: stripe },
  line: { color: '3D4A8A', width: 0.5 }  // never do this on stripes
});
```

This applies to:
- Card left accent stripes (all slide types)
- Pull quote left bar
- Column header bands on comparison slides
- Any purely decorative fill-colour shape

**Text boxes and card bodies keep their borders** (`#3D4A8A`, 0.5pt on dark slides). The rule distinguishes structural boxes from decorative stripes.

---

### 15.10 Empty Card Principle — Icon Fill for Tall Sparse Cards

When a card's body text occupies less than 40% of the card height, the remaining space reads as empty and weakens the slide visually. Add a centred white icon to fill the space with intentional structure.

**Triggers:** Type I insight cards, Type P process cards, any tall card (h > 1.5") with ≤3 lines of body text.

**Icon placement:**
```
Position: Horizontally centred in card, vertically centred in the lower empty space
           below body text
Size:      0.55" × 0.55" (slightly larger than Type P icons at 0.45")
Colour:    #FFFFFF (white outline/line style — never filled)
Source:    react-icons — semantically matched to card concept
Gap:       0.2" below body text
```

**Icon selection rule:** Each card in a group must use a semantically distinct icon. The icon reinforces the concept — it does not decorate. If you cannot find an icon that clearly maps to the card's idea, leave the space empty rather than use a generic one.

**Example mappings for common concepts:**
```
Dependency / Link    → FaLink
Document / Write     → FaFileAlt
Rule / Law           → FaBalanceScale
Process / Cycle      → FaSyncAlt
Agent / Robot        → FaRobot
Warning / Risk       → FaExclamationTriangle
Speed / Fast         → FaBolt
Trust / Shield       → FaShieldAlt
```

---

### 15.11 Comparison Slide Header Text — Always White

> **Both column headers on comparison slides (Type C) use white text `#FFFFFF`, regardless of header fill colour.**

Indigo `#4626BD` header: white text ✓
Coral `#EA4E43` header: white text ✓ (previously dark navy — reversed in v5.3)

**Rationale:** Both Indigo and Coral are dark enough to support white text at contrast ratios that meet readability standards. Dark navy on Coral felt inconsistent with the overall dark-on-coloured treatment used elsewhere in the deck. White on both headers creates visual symmetry between the two columns.

---

-----

## PART 16 — ASSEMBLED SLIDE BLUEPRINTS

All coordinates assume LAYOUT_16x9 (10" × 5.625"). All `addText` calls include `margin:0`.

### 16.1 Type T — Title Slide

```
Background: #0D1137
Logo circle: OVAL, x=5.9, y=0.4, w=3.8, h=3.8, fill #162055
Logo area:   RECT, x=6.6, y=1.2, w=2.4, h=1.3 (placeholder)

Main title:       x=0.4, y=0.42, w=5.4, h=0.88, Bold 40pt, #FFFFFF
SHIFT tagline:    card #172058, x=0.4, y=1.38, w=5.4, h=0.35, Regular 11pt, #B0BEC5
Subtitle:         x=0.4, y=1.83, w=5.4, h=0.52, Regular 16pt, #FFFFFF (NO card)
Italic descriptor: x=0.4, y=2.43, w=5.4, h=0.27, Italic 13pt, #B0BEC5
Coral separator:  x=0.4, y=2.79, w=5.0, h=0.03, fill #EA4E43
Framework attr:   x=0.4, y=2.89, w=5.0, h=0.27, Regular 13pt, #B0BEC5
Contact line:     x=0.4, y=3.24, w=5.0, h=0.27 — rich text array, charSpacing:3 on name only
Gold tagline:     x=5.0, y=5.0, w=4.6, h=0.27, Italic 12pt, #E89923, right-aligned
Disclaimer:       x=0.3, y=5.38, w=6, h=0.2, Regular 9pt, #B0BEC5
```

### 16.2 Type N — Narrative with Pull Quote + List Cards

```
Background: #0D1137, gradient bar standard
Section label: x=0.2, y=0.12
Title:         x=0.2, y=0.42, w=9.5, h=0.55, Bold 28pt
               ↑ For titles >40 chars: reduce to 22pt, increase h to 0.75" (D10)
               Use addDarkTitle helper for short titles only.
               Long titles: inline addText with fontSize:22, h:0.75

Pull quote:    x=0.2, y=1.12, w=9.6, h=0.52

3 cards:
  Start y=1.75, card height=0.88", gap=0.09"
  Card: x=0.2, w=9.6
  Heading: Bold 13pt | Body: Regular 11pt

VERTICAL BUDGET (usable height = 5.27" before footer):
  Section label:  y=0.12 → 0.34
  Title:          y=0.38 → 1.00   (short title)
  Pull quote:     y=1.12 → 1.64
  Card 1:         y=1.75 → 2.63
  Card 2:         y=2.72 → 3.60
  Card 3:         y=3.69 → 4.57
  ─────────────────────────────
  Bottom of content: 4.57"
  Headroom:          0.70" ✓
```

### 16.3 Type I — Insight / Tension (2×2 Grid)

```
Background: #0D1137, gradient bar standard

2×2 grid:
  Card width:  4.68"   Card height: 1.58"
  Gutter x:    0.14"   Gutter y:    0.12"
  Start:       x=0.2, y=1.15

  Col 0: x=0.2        Col 1: x=5.02
  Row 0: y=1.15       Row 1: y=2.85
```

### 16.3a Type I — Insight / Tension (3-Column Variant)

When a Type I slide has exactly 3 items, use 3 equal columns instead of the 2×2 grid.

```
Background: #0D1137, gradient bar standard

3 equal columns:
  Card width:  3.12"  (= (9.6 - 2×0.12) / 3)
  Gutter:      0.12"  (per §9.2 — 3 columns)
  Start:       x=0.2, y=1.15
  Card height: 3.38"  (fills to y≈4.53, leaving room for footer)

  Col 0: x=0.20
  Col 1: x=0.20 + 3.12 + 0.12 = 3.44
  Col 2: x=3.44 + 3.12 + 0.12 = 6.68

  Per card: stripe 0.07", heading Bold 13pt, body Regular 11pt
  SEQ[3] stripe colours: Indigo → Purple → Coral
```

**Rule:** 4 items → 2×2 grid (§16.3). 3 items → 3-column (§16.3a). Never force 3 items into a 2×2 — the empty cell looks like a layout error.

-----

### 16.4 Type P — Process / Cycle (7 Narrow Columns)

```
Background: #0D1137, gradient bar standard

7 columns:
  Card width: 1.32"  (= (9.6 - 6×0.06) / 7)
  Start: x=0.2, y=1.15
  Card height: 3.0"
  
  Per card: Amber badge (#D4821A oval) → icon (0.45"×0.45", white) → label → body

CTA box: x=0.2, y=4.35, w=9.6, h=0.55
```

### 16.5 Type F — Framework (White, Letter Badge Rows)

```
Background: #FFFFFF, gradient bar standard
Header band: x=0.09, y=0, w=9.91, h=1.15

3 rows:
  Start y=1.22, row height=0.86", gap=0.09"
  Card: x=0.3, w=9.4, fill #F4F6FF, border #C5CAE9 0.5pt
  
  Per row:
    Square badge: x=0.45, y=centred, w=0.48, h=0.48 — fill per §2.2 sequence
    Tag badge:    x=1.05, w=0.8–1.6", h=0.26 — fill #F4F6FF, text #0D1137 (white slide rule)
    Heading:      x=2.45, Bold 13pt, #0D1137
    Body:         x=2.45, Regular 11pt, #0D1137  ← must match heading x, NOT cardX+0.15 (D11)

CTA (cream): below last row, x=0.3, w=9.4, h=0.48

VERTICAL BUDGET (usable height = 5.27" before footer):
  Header band:  y=0.00 → 1.12
  Row 1:        y=1.22 → 2.08
  Row 2:        y=2.17 → 3.03
  Row 3:        y=3.12 → 3.98
  CTA:          y=4.04 → 4.52   (gap 0.06" + h 0.48")
  ─────────────────────────────
  Bottom of content: 4.52"
  Headroom:          0.75" ✓
```

### 16.6 Type C — Comparison (Dark, Checklist Variant)

```
Background: #0D1137, gradient bar standard

Two columns: lx=0.2, rx=5.15, each w=4.65
  Left header:  fill #4626BD, label Bold 12pt, #FFFFFF
  › connector: x=4.85, w=0.30, Bold 28pt, #B124F6, align center  ← v3.3 geometry
  Right header: fill #EA4E43, label Bold 12pt, #0D1137

Body cards: y=1.62, h=2.62
CTA (cream + coral left bar): x=0.2, y=4.4, w=9.6, h=0.53
```

### 16.7 Type C — Comparison (White, Before/After with Stats)

```
Background: #FFFFFF, header band + content area per §4.4

Left (Before):  x=0.3, w=4.55 — navy bar markers, plain text items
Right (After):  x=5.0, w=4.7  — #F4F6FF card, circle badges per §2.2 sequence

Stat playcards (3): y=4.05, h=0.75, each w=3.07"
  fill #F4F6FF, stripe per §2.2, stat Bold 40pt accent colour
```

### 16.8 Type A — Action Plan (White, Numbered Rows)

```
Background: #FFFFFF, gradient bar standard, header band per §4.4

5 rows:
  Start y=1.22, row height=0.60", gap=0.064"
  Alternating fill: #FFFFFF / #F0F2FF
  Card: x=0.3, w=9.4
  
  Per row:
    Circle badge: 0.48"×0.48", zero-padded ("01"–"05"), text #FFFFFF, fill per §2.2 SEQ[5]
    Heading: x=1.08, Bold 13pt, #0D1137
    Body:    x=1.08, Regular 11pt, #0D1137

CTA (cream): below last row, x=0.3, w=9.4, h=0.46

VERTICAL BUDGET (usable height = 5.27" before footer):
  Header band:  y=0.00 → 1.12
  Row 1:        y=1.22 → 1.82
  Row 2:        y=1.88 → 2.48
  Row 3:        y=2.55 → 3.15
  Row 4:        y=3.21 → 3.81
  Row 5:        y=3.88 → 4.48
  CTA:          y=4.55 → 5.01   (gap 0.07" + h 0.46")
  ─────────────────────────────
  Bottom of content: 5.01"
  Headroom:          0.26" ✓  (tight — do not increase row height)
```

### 16.9 Type X — Closing Slide (Stacked Pillars)

**v3.3 corrected coordinates (DELTA D1):**

```
Background: #0D1137. NO gradient bar. NO section label.
Logo circle: same as Type T (x=5.9, y=0.4, w=3.8, h=3.8)

Main title:      x=0.4, y=0.20, w=5.3, h=1.10, Bold 22pt, #FFFFFF
                 h=1.10" required to safely contain 2-line wrap at 22pt.
                 Formula: h = (lines × 0.50) + 0.10"

Accent subtitle: x=0.4, y=1.35, w=5.3, h=0.32, Bold 18pt, #EA4E43
Coral separator: x=0.4, y=1.72, w=5.0, h=0.03, fill #EA4E43

3 pillar cards (stacked):
  Start y=1.85, card height=0.60", gap=0.07"  ← v3.3: pch=0.60" (was 0.55") for body text fit
  x=0.4, w=5.0, fill #172058, border #3D4A8A 0.5pt
  Stripe per §2.2 SEQ[3]
  Heading: Bold 13pt, #FFFFFF
  Body:    Italic 11pt, #B0BEC5

CTA (coral): x=0.4, y=last_pillar_bottom+0.15, w=5.0, h=0.46
  fill #EA4E43, text Bold 14pt #0D1137

Contact: x=0.4, y=cta_bottom+0.14, w=5.0, h=0.27
  "email · website", Regular 11pt, #B0BEC5, centred

Gold tagline:  x=5.0, y=5.0, w=4.6, right-aligned, Italic 12pt, #E89923
Disclaimer:    x=0.3, y=5.38, Regular 9pt, #B0BEC5

VERTICAL BUDGET (usable height = 5.27" before footer):
  Title:          y=0.20 → 1.30   (h=1.10" for 2-line wrap)
  Accent subtitle:y=1.35 → 1.67
  Separator:      y=1.72 → 1.75
  Pillar 1:       y=1.85 → 2.45
  Pillar 2:       y=2.52 → 3.12
  Pillar 3:       y=3.19 → 3.79
  CTA:            y=3.94 → 4.40   (gap 0.15" + h 0.46")
  Contact:        y=4.54 → 4.81   (gap 0.14" + h 0.27")
  ─────────────────────────────
  Bottom of content: 4.81"
  Headroom:          0.46" ✓
  Gold tagline sits at y=5.0 — intentionally in footer zone.
```

-----

## PART 17 — TEXT SAFETY LIMITS

### 17.1 Character Limits by Component

| Component | Max chars | Font size | If exceeded |
|---|---|---|---|
| Slide title (dark) | 45 | 28pt | Reduce to 24pt |
| Slide title (dark) | 60 | 24pt | Wrap to 2 lines, increase h |
| White header title | 50 | 26pt | Reduce to 22pt |
| Card heading (full-width) | 50 | 14pt | Safe — single line |
| Card heading (half-width) | 30 | 14pt | Reduce to 12pt or wrap |
| Card body (full-width) | 150 | 11pt | 2 lines max |
| Card body (half-width) | 80 | 11pt | 2 lines max |
| Pull quote | 110 | 12pt | Max 2 lines |
| CTA box | 80 | 14pt | Reduce to 12pt |
| Footer tagline | 90 | 11pt | Trim — must fit one line |

### 17.2 The 85% Rule

> All text boxes must accommodate 15% horizontal overflow. This absorbs font metric differences between PowerPoint (Windows) and LibreOffice (Linux).

**v3.3 LibreOffice buffer (DELTA D4):** When rendering via pptxgenjs + LibreOffice, apply an additional **+10% vertical height buffer** to any container holding body text at 11pt or smaller. Blueprints in Part 16 are PowerPoint-calibrated. Specifically: Type X pillar cards `pch = 0.60"` (not 0.55"). Treat all body-text `h` values in Part 16 as minimum floors.

### 17.3 Line Count Limits

| Component | Max lines |
|---|---|
| Slide title | 2 |
| Card heading | 1 |
| Card body (full-width) | 3 |
| Pull quote | 2 |
| CTA box | 2 |
| Footer tagline | 1 |

### 17.4 Content Trimming Priority

1. Remove qualifiers ("actually", "essentially")
2. Replace clauses with dashes
3. Remove the least important list item
4. **Never reduce font below §1.5 minimums (11pt body, 9pt labels)**

-----

## PART 18 — ICON SYSTEM FOR TYPE P SLIDES

### 18.1 When to Use

Icons appear ONLY on Type P (Process/Cycle) slides, between the numbered badge and the step label.

### 18.2 Icon Specification

```
Source:   react-icons library (rasterised to PNG via sharp)
Size:     0.45" × 0.45" on slide (rasterise at 256px)
Colour:   #FFFFFF (white outline) on dark slides
Position: Centred horizontally in card, below badge, above label
Gap:      0.1" below badge, 0.1" above label
```

### 18.3 Icon Selection Rule

Each icon must be semantically distinct from every other on the same slide. Prefer outline-style over filled.

### 18.4 Icon Generation Code

```javascript
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");

function renderIconSvg(IconComponent, color = "#FFFFFF", size = 256) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
}

async function iconToBase64Png(IconComponent, color = "#FFFFFF", size = 256) {
  const svg = renderIconSvg(IconComponent, color, size);
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + pngBuffer.toString("base64");
}
```

-----

## PART 19 — BUILD DELTAS (v3.3+) — RENDERING SYSTEM ADDENDUM

*This part captures decisions made during actual pptxgenjs + LibreOffice builds that were not explicitly covered by Parts 1–18. Each delta is also integrated inline at the relevant section. This part exists as a consolidated changelog for future spec editors.*

---

### DELTA D1 — Type X Title Size vs. Container Height (§16.9)

**Problem:** §16.9 specified `Bold 32pt, h=0.5"`. A 2-line closing title at 32pt requires ~1.0" of container. At h=0.5" the title bleeds directly into the Coral accent subtitle regardless of font size.

**Resolution:** Type X main title: `fontSize: 22pt`, `h: 1.10"`, `valign: top`. The spec's h=0.5" assumed a single-line title. For any 2-line title, use the formula: `h = (lines × 0.50) + 0.10"`.

**Rule added to:** §11.7, §16.9

---

### DELTA D2 — Tag Badge Text Colour on White Slides (§7.2)

**Problem:** §7.2 says tag badge text is always `#FFFFFF`. On white slides, white text on a `#F4F6FF` card is invisible.

**Resolution:** Tag badge text is context-dependent. Dark slides: `#FFFFFF`. White slides: `#0D1137`. Follows the same logic as §1.4's text colour fallback, extended to badge text.

**Rule added to:** §7.2, checklist BD-04

---

### DELTA D3 — Tag Badge Fill on White Slides (§7.2)

**Problem:** §7.2 says tag badge fill is `NONE (transparent)`. On a white card, a transparent fill makes the outlined border barely visible — no contrast.

**Resolution:** White slides: tag badge fill = `#F4F6FF` (card tint). Dark slides: fill = transparent. This preserves the outlined aesthetic while ensuring the border is legible.

**Rule added to:** §7.2, §15.3, checklist BD-04

---

### DELTA D4 — LibreOffice Renders Segoe UI Taller Than PowerPoint (§17.2, Part 16)

**Problem:** All blueprint coordinates in Part 16 were designed for PowerPoint rendering. LibreOffice renders Segoe UI at slightly taller line heights. Type X pillar cards at `pch=0.55"` clipped italic body text at 11pt.

**Resolution:** When building via pptxgenjs + LibreOffice pipeline, apply a +10% vertical height buffer to all body-text containers. Type X `pch = 0.60"`. Treat all Part 16 `h` values as minimum floors, not exact targets.

**Rule added to:** §17.2, §16.9

---

### DELTA D5 — Mixed charSpacing Requires Rich Text Array (§15.1)

**Problem:** §15.1 describes the contact line output ("Name  ·  email") but gives no implementation pattern. Setting `charSpacing` at the container level applies it to all text including the email, defeating the per-name intent.

**Resolution:** Use a rich text array with charSpacing set as a **run-level option**, not a container-level option.

```javascript
sl.addText([
  { text: "Amit Kaistha",                options: { charSpacing: 3 } },
  { text: "  ·  amit.kaistha@axlflo.ai", options: { charSpacing: 0 } },
], { x:0.4, y:3.24, w:5.0, h:0.27, fontFace:"Segoe UI", fontSize:11,
     color:"B0BEC5", align:"left", valign:"middle", margin:0 });
```

**Rule added to:** §15.1

---

### DELTA D6 — Type T and X Have No Section Label (§10.1, §16.1, §16.9)

**Problem:** The spec implied but never explicitly stated that closing and title slides carry no section label. Blueprints showed no section label, but the rule wasn't written as a binding prohibition.

**Resolution:** Explicit rule added: Types T and X carry neither a section label nor a gradient bar. This is now stated in §3.2, §10.1, §11.3, and §16.9.

**Rule added to:** §3.2, §10.1, §11.3

---

### DELTA D7 — `margin:0` Is a Mandatory Build Constant (new rule)

**Problem:** pptxgenjs adds internal default margin to every text box. Without `margin:0`, text renders at coordinate + internal padding offset, breaking alignment with adjacent shapes. Blueprint coordinates are meaningless if margin is not zeroed.

**Resolution:** All `addText` calls in pptxgenjs builds must include `margin:0`. This is a mandatory build constant. Added to QA checklist as BX-04, and to the Quick Reference Card.

**Rule added to:** §13.1 (BX-04), Quick Reference Card (Part 14)

---

### DELTA D8 — › Connector Gap Width and Geometry (§11.1, §16.6)

**Problem:** §11.1 described the › connector's colour and font but not the width of the gap it sits in or how to calculate its x position. The geometry was derived from arithmetic, not from a spec rule.

**Resolution:** The connector text box spans the full inter-column gap. For the standard two-column layout: `x = left_col_x + col_width`, `w = right_col_x − (left_col_x + col_width)`. In the standard layout this yields `x=4.85, w=0.30"`. Always use `align: center`.

**Rule added to:** §11.1, §16.6

---

## PART 20 — VERSION HISTORY

Every version is logged here. One line per change. The goal is that anyone picking up this file can understand the full evolution without reading every section.

| Version | Date | Summary |
|---|---|---|
| **v3.0** | 2025 | **Foundational spec.** Brand constants, colour sequences, gradient system, background rules, card/badge/stat systems, layout selection, slide type catalogue (T/N/I/P/F/C/A/D/X/S/R), component rules, fallback principles, QA checklist, text safety limits, icon system, assembled blueprints (Parts 1–18 core). |
| **v3.1** | Early 2026 | **Pre-build corrections.** Hand-corrections applied to auto-generated output before v3.2 was formalised. Separator line colour fixed (coral not grey), contact line charSpacing documented, card box removal on title slide noted, two-level footer introduced. These became the basis for Part 15. |
| **v3.2** | April 2026 | **Extended rules formalised.** Parts 15–18 added: title slide corrections (§15.1), process slide icon layer (§15.2), framework badge combo square+tag (§15.3), comparison checklist variant (§15.4), comparison white variant with stat playcards (§15.5), action plan zero-padded badges (§15.6), closing slide stacked pillar layout (§15.7), footer disclaimer on T and X slides (§15.8). |
| **v3.3** | April 2026 | **First full build deltas.** Eight deltas (D1–D8) captured from "You Cannot Automate a Mess" deck build: Type X title height formula (D1), tag badge text/fill on white slides (D2+D3), LibreOffice +10% vertical buffer (D4), mixed charSpacing rich text array (D5), T/X no label/bar explicit rule (D6), margin:0 mandatory (D7), › connector geometry (D8). Part 19 added as delta changelog. |
| **v3.4** | April 2026 | **System improvements.** Part 20 (this section) added. Build script auto-publishes PPTX to `/mnt/user-data/outputs/` at end of every run. Delta review block tightened to single approval question. Skill filename stabilised — version lives inside the file only, filename (`SKILL.md`) never changes so Claude always loads the latest without manual updates. |
| **v3.5** | April 2026 | **Naming convention + trigger command.** Output MD always named `AxlFlo_Master_Deck_Design_System.md` — no version in filename. Exact trigger phrase (`Yes update`) printed at end of every build. Full auto-update loop locked in: "Yes update" → patch SKILL.md → bump version → publish named MD to outputs. |
| **v3.6** | April 2026 | **Versioned filename.** Output MD now includes version: `AxlFlo_Master_Deck_Design_System_v3.6.md`. Each update creates a new versioned file — minor bump for deltas/fixes, major bump for new slide types or structural redesigns. `SPEC_VERSION` moved to module level in build script as single source of truth. |
| **v3.7** | April 2026 | **Housekeeping (fixes 1–3).** Part 20 moved to end of document (after Part 19) — numbered correctly now. Redundant inline "What changed" block removed from header — Part 20 table is single source of truth for history. Stale "next: v3.4" reference in HOW TO UPDATE corrected. |
| **v3.8** | April 2026 | **Single version source of truth.** `version.json` created at `/mnt/skills/user/axlflo-deck-design/version.json`. All build scripts now read `SPEC_VERSION` from this file — no more hardcoded version numbers per script. `fs` require moved to module level. HOW TO UPDATE section updated to reflect the new flow. |
| **v3.9** | April 2026 | **Core/Extended split.** `SKILL.md` now contains Parts 1–14 (brand rules, ~741 lines). `SKILL_extended.md` contains Parts 15–20 (blueprints + deltas, ~499 lines). Auto-load instruction added to bottom of core — Claude always reads both files automatically. One skill name to remember: `axlflo-deck-design`. |
| **v4.0** | April 2026 | **Major — trigger narrowed.** Skill no longer triggers on any deck/pptx request. Now requires explicit phrase: "AxlFlo deck", "AxlFlo design skill", "axlflo-deck-design", or "build using AxlFlo design system". Generic deck requests use the standard pptx skill. Prevents AxlFlo brand rules being applied to non-AxlFlo work. |
| **v5.0** | April 2026 | **Major — QA checker added.** `qa.js` built using adm-zip (Option A lightweight). 10 structural checks per slide: slide count, gradient bar presence/absence, font purity, gold footer, card navy, dark/white background, cream CTA, coral accent, closing coral strength, indigo blue. Runs automatically after every build — non-blocking (deck publishes regardless). v4.0 baseline snapshot saved to `v4.0_baseline/` for revert. |
| **v5.1** | April 2026 | **Housekeeping (pre-build fixes).** Stale `v3.2` comment removed from brand constants block. Double separator removed from SKILL.md. `SemiBold` corrected to `Bold` in §1.5 font table (pptxgenjs has no SemiBold weight). `path` require moved to module level alongside `fs`. |
| **v5.2** | April 2026 | **Build deltas D9–D11 from process_first deck.**
| **v5.3** | April 2026 | **Visual design overhaul — D12–D24.** Gradient reversed (Coral top), T slides get gradient bar, purple separator on title, pull quote stripe Coral, global no-border rule (all coloured fills = colour-matched line width 0), stripe width 0.04", tag badge shape removed, comparison headers white text, 3-column icons (D19), em dash reduction (D20), closing punchline gold (D21–D22), coral CTA white text (D23), oval badge borders (D24). QA upgraded with gold punchline check and white-text-on-dark check. | D9: §16.3a added — 3-column variant for Type I slides with 3 items (3.12" cards, 0.12" gutter). D10: Long title rule added — titles >40 chars on dark slides use 22pt/h=0.75" not the standard helper. D11: §16.5 body text x corrected from 0.45 to 2.45 — must clear square badge + tag badge zone. |
| **v5.3** | April 2026 | **Visual refinements from manual review.** Gradient direction reversed: Coral→Purple→Indigo top-to-bottom (warmer, more dynamic). §15.9: coloured stripes have zero border. §15.10: Empty card principle — icons for tall sparse cards. §15.11: both comparison headers use white text. Title slide separator changed to Purple. Title font hierarchy documented. TEAM B header text changed to white. Amit Style applied to all body copy — em dash overuse reduced. |

### How to add a version entry

When Claude bumps the version (after an approved delta append):
1. Add a new row to the table above
2. Date = current month/year
3. Summary = one sentence per meaningful change, referenced to the delta ID (e.g. D9)
4. Update the `**Version:**` line in the file header
5. Update `SPEC_VERSION` in the build script (module-level constant, line ~68)
6. Output file is named `AxlFlo_Master_Deck_Design_System_v[VERSION].md`

**Major vs minor version rule:**

| Change type | Version bump | Examples |
|---|---|---|
| New slide type, structural redesign, breaking layout change | **Major** (3.x → 4.0) | Adding Type Q, redesigning white slide anatomy |
| Delta additions, rendering fixes, rule clarifications, new components | **Minor** (3.5 → 3.6) | Coordinate corrections, new badge rule, LibreOffice fix |




---

### DELTA D9 — Type I 3-Column Variant Missing from §16.3

**Problem:** §16.3 blueprint only covers the 2×2 grid (4 items). When a Type I slide has 3 items, the spec gave no layout guidance. Using the 2×2 blueprint with 3 items leaves an empty fourth cell which looks like a layout error.

**Resolution:** 3 items on a Type I slide → use 3 equal columns per §9.1. Card width = (9.6 − 2×0.12) / 3 = 3.12". Gutter = 0.12" (per §9.2 three-column rule). New blueprint added as §16.3a.

**Rule added to:** §16.3a (new section)

---

### DELTA D10 — Long Titles on Type N/I Slides Clip at 28pt (§16.2)

**Problem:** The `addDarkTitle` helper uses h=0.62" at 28pt. Titles longer than ~40 characters wrap to 2–3 lines and overflow into the pull quote or first card. The spec §17.1 says "reduce to 24pt if >45 chars" but the blueprint h value was never updated to match.

**Resolution:** For titles longer than 40 characters on dark content slides: use `fontSize: 22`, `h: 0.75"`, `valign: top`. Do not use the standard `addDarkTitle` helper — write the `addText` call inline with the override values.

Character count guide:
- ≤40 chars → `addDarkTitle` helper (28pt, h=0.62") — safe
- 41–55 chars → inline override: 24pt, h=0.70"
- 56+ chars → inline override: 22pt, h=0.75"

**Rule added to:** §1.5 font table, §16.2 blueprint note

---

### DELTA D11 — Framework Row Body Text x Must Clear Badge+Tag Zone (§16.5)

**Problem:** §16.5 blueprint stated body text at `x=0.45` (near left edge). But the square badge occupies x=0.45–0.93" and the tag badge extends to x≈2.60". Body text starting at x=0.45 renders underneath both badges — completely invisible.

**Resolution:** Framework row body text must start at `x=2.45` — same as the heading — so it clears the entire badge+tag zone. The spec diagram implied this layout but the explicit x coordinate was wrong.

**Rule added to:** §16.5 blueprint (body x corrected from 0.45 to 2.45)

---

---

### DELTA D12 — Gradient Direction Reversed (§3.4)

**Problem:** Visual review showed Indigo→Purple→Coral (top to bottom) created a heavy dark base. Manual edits confirmed Coral at top reads warmer and more energetic.

**Resolution:** Gradient reversed to Coral→Purple→Indigo top to bottom. All build scripts updated. `makeGradientBar()` stops array reordered.

**Rule added to:** §3.4 gradient bar spec

---

### DELTA D13 — Title Slide Carries Gradient Bar (§3.2)

**Problem:** Spec §3.2 said no gradient bar on Type T (title) and Type X (closing) slides. Manual edits added the bar to the title slide for visual consistency.

**Resolution:** Type T slides carry the gradient bar. Type X (closing) retains no bar — the logo circle fills the right half and the bar would compete. §3.2 updated.

**Rule:** T slides → gradient bar. X slides → no gradient bar.

---

### DELTA D14 — Title Slide Separator is Purple (§15.1)

**Problem:** §15.1 had the separator as Coral. But Coral appears in the CTA and pull quote stripe across the deck — using it as a separator on the title slide created visual repetition with no hierarchy purpose.

**Resolution:** Separator on Type T slides is Purple `#B124F6`. Purple sits between the title (white) and the framework attribution (grey) without competing with Coral CTAs.

---

### DELTA D15 — Pull Quote Left Stripe is Coral (§5.3)

**Problem:** Pull quote left stripe was fixed Indigo `#4626BD`. But the stripe is the strongest visual accent on the pull quote — Coral creates stronger contrast against the cream box.

**Resolution:** Pull quote left stripe = `#EA4E43`. Zero border, colour-matched line.

---

### DELTA D16 — Global No-Border Rule for All Coloured Fills (§6.2)

**Problem:** All coloured shapes (stripes, badges, circles, header bands, separators) were rendered with `line:{width:0}` but LibreOffice renders a hairline even at width 0 unless the line colour matches the fill.

**Resolution:** All coloured fills use `line:{color:same_as_fill, width:0}`. Only text-containing boxes keep visible borders. This is the global border rule:

```
Coloured fill (stripe, badge, circle, band, separator):
  line: { color: fill_hex, width: 0 }

Text container (card, CTA, pull quote box, row):
  line: { color: C.cardBorder or C.borderLight, width: 0.5 }
```

**Stripe width:** All vertical coloured stripes (card stripes, pull quote stripe) = 0.04" wide. Gradient bar image = 0.04" wide.

---

### DELTA D17 — Tag Badges on Framework Slides: Shape Removed (§15.3)

**Problem:** Tag badges (CONTEXT ENGINEERING etc.) on Type F white slides had a rectangle shape with `fill: cardWhite` (matching the card background). The shape was only ever there to hold a border. Once the border was removed (D16), the shape became a redundant invisible rectangle that LibreOffice still rendered with a hairline.

**Resolution:** Tag badge rectangle shape removed entirely. Text is rendered directly on the card background. Heading and body text begin at x=2.45" (cleared of badge zone per D11).

---

### DELTA D18 — Comparison Header Text on Coral Background is White (§15.4)

**Problem:** Right column header (Team B, coral fill `#EA4E43`) used dark navy `#0D1137` text. Dark text on coral is low contrast and visually unappealing.

**Resolution:** Any header band with dark fill (`#EA4E43` coral or `#4626BD` indigo) uses white `#FFFFFF` text. This is the global rule: dark fill → white text. Light fill (cream, cardWhite) → dark text.

---

### DELTA D19 — Icons in Tall 3-Column Insight Cards (§16.3a)

**Problem:** 3-column Type I slides with sparse body text (2–3 lines) leave the bottom half of tall cards visually empty. Empty dark space reads as a layout error.

**Resolution:** Add one white icon centred in the lower half of each card. Icon must be semantically matched to the card concept. Use react-icons/fa. Size: 0.55"×0.55". Position: centred horizontally in the card, y = card_bottom - 1.10".

**Rule:** Sparse tall cards (3-column, body text < 4 lines) get centred white icon. Dense cards (2×2 grid, body text ≥ 4 lines) do not.

---

### DELTA D20 — Em Dash Overuse Reduced (§11.4)

**Problem:** Body text across all slides used em dashes (—) excessively as sentence connectors. Amit Style (writing skill) uses period-break sentence structure. Em dashes slow reading cadence and feel formal.

**Resolution:** Replace X — Y patterns with two short sentences: X. Y. Keep em dashes only where the pause is structural (e.g. "X — not Y" as a correction or contrast). Apply Amit Style throughout body text.

---

### DELTA D21 — Closing Slide Punchline Text Colour (§16.9)

**Problem:** Accent subtitle on Type X closing slides ("Process First. Agent Second. Always.") was Coral `#EA4E43`. But Coral is used for CTA buttons throughout the deck. The punchline should feel like a signature, not a button.

**Resolution:** Closing punchline text = Mustard Gold `#E89923`. This matches the gold footer tagline and signals a "this is the conclusion" register rather than a call to action.

---

### DELTA D22 — Separator Under Closing Punchline Matches Punchline Colour (§16.9)

**Problem:** Separator line under the closing punchline was Coral. With D21 changing the punchline to gold, the separator must match.

**Resolution:** Separator under closing punchline = Mustard Gold `#E89923`, width 0.03".

---

### DELTA D23 — CTA Boxes with Coral Fill Use White Text (§6.4)

**Problem:** Coral CTA boxes (`fill #EA4E43`) used dark navy `#0D1137` text. Dark on coral is readable but visually weak. White on coral is the correct contrast pair.

**Resolution:** Any CTA or button with `fill #EA4E43` (coral) uses `color #FFFFFF` (white) text. Dark CTA boxes and cream CTA boxes continue to use dark navy text.

---

### DELTA D24 — OVAL Circle Badges: Colour-Matched Line, Width 0 (§6.2 extension)

**Problem:** D16 covered rectangle shapes. OVAL (circle) badge shapes also require colour-matched line treatment — LibreOffice renders a hairline on OVALs too.

**Resolution:** All OVAL badge shapes: `line: { color: same_as_fill, width: 0 }`. Applies to Type A action plan badges (01–05) and any other circular badge elements.

---
## HOW TO UPDATE THIS SPEC

When a new build produces a decision not covered here:

1. Note the delta using the format in Part 19
2. Integrate the rule inline at the relevant section
3. Add to the QA checklist if it is a visual check
4. Add to the Quick Reference Card if it is a constant
5. Increment the version — Claude decides minor vs major per the rule in Part 20
6. Update **all three** of these in one operation:
   - `version.json` → bump `specVersion`
   - `SKILL.md` → bump `**Version:**` header + add row to Part 20 table
   - Build script → no change needed (reads version.json automatically)
7. Publish `AxlFlo_Master_Deck_Design_System_v[NEW].md` to outputs

**version.json location:** `/mnt/skills/user/axlflo-deck-design/version.json`
This is the single source of truth. Build scripts read from it. Never edit it manually — always update via the "Yes update" flow so SKILL.md stays in sync.

The goal is that Part 19 grows with every deck until fallback decisions become rare.

**File structure reminder:** Core rules live in `SKILL.md`. Blueprints and deltas live here. Both files share the same version number from `version.json`.

-----

*© AxlFlo LLC 2025–2026. All rights reserved.*
*SHIFT to SCALE™ is a proprietary framework of AxlFlo LLC.*
*This design system is proprietary to AxlFlo and applies to all decks produced under the brand.*
