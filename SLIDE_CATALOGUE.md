# AxlFlo Slide Style Catalogue

**Version:** 5.4  
**How to use:** After Claude builds the first version of your deck, say:
> *"Change slide 3 to Quote Spotlight"*  
> *"Rebuild slide 5 as Before After"*  
> *"Show me the slide catalogue"*

---

## QUICK REFERENCE

```
DARK SLIDES
  Title            · Story + Cards     · Insight Grid
  Insight Columns  · Process Cycle     · Two Teams (dark)
  Closing

WHITE SLIDES
  Framework Rows   · Two Teams (white) · Action Plan
  Data Cards

BREAK
  Section Divider
```

---

## DARK SLIDES

---

### 🟦 Title
**Type:** T  
**Background:** Dark navy `#0D1137`  
**Use when:** Opening slide of any deck.

**What it looks like:**
- Large bold title left (36pt, 2 lines)
- SHIFT·SCALE tagline bar below title
- Subtitle at 15pt, italic descriptor at 11pt
- Purple separator line
- Logo circle placeholder right side
- Gold "The model didn't fail" tagline bottom right
- Gradient bar left edge (coral top)

**Friendly trigger:** *"Title"* or *"Opening slide"*

---

### 🟦 Story + Cards
**Type:** N  
**Background:** Dark navy  
**Use when:** You have a strong opening statement and 3 supporting points.

**What it looks like:**
- Section label top (spaced caps, grey)
- Bold slide title
- Cream pull quote box — italic, no bar, no outline
- 3 dark cards stacked — thin coloured left stripe (Indigo / Purple / Coral), heading + body
- Gold footer tagline

**Friendly trigger:** *"Story + Cards"* or *"Pull quote + 3 cards"*

---

### 🟦 Insight Grid
**Type:** I (2×2)  
**Background:** Dark navy  
**Use when:** You have exactly 4 items to contrast or compare (2 rows × 2 columns).

**What it looks like:**
- Section label + title
- 4 tall dark cards in a 2×2 grid
- Each card: thin left stripe, heading, body
- Icons added in lower half if body text is sparse

**Friendly trigger:** *"Insight Grid"* or *"2x2 cards"*

---

### 🟦 Insight Columns
**Type:** I (3-column)  
**Background:** Dark navy  
**Use when:** You have exactly 3 items. Wider than the grid, better for medium-length body text.

**What it looks like:**
- Section label + title
- 3 equal-width tall dark cards side by side
- Each card: thin left stripe (Indigo / Purple / Coral), heading, body
- White icon centred in lower half of each card
- Gold footer tagline

**Friendly trigger:** *"Insight Columns"* or *"3-column cards"*

---

### 🟦 Process Cycle
**Type:** P  
**Background:** Dark navy  
**Use when:** You have 5–7 sequential steps or a repeating cycle.

**What it looks like:**
- Section label + title
- 7 narrow columns (or fewer)
- Each column: amber circular badge with number, white icon, step label, short description
- Uniform amber badges (not sequence colours)
- Gold footer tagline

**Friendly trigger:** *"Process Cycle"* or *"Steps"*

---

### 🟦 Two Teams (Dark)
**Type:** C  
**Background:** Dark navy  
**Use when:** Comparing two approaches, outcomes or teams side by side.

**What it looks like:**
- Section label + title
- Left header: Indigo fill, white text (Team A / The Shortcut)
- Purple › connector between headers
- Right header: Coral fill, white text (Team B / The Foundation)
- Two dark body cards with ✗ / ✓ lists, 12pt line spacing
- Cream CTA bar at bottom with coral left stripe
- Gold footer

**Friendly trigger:** *"Two Teams"* or *"Side by side comparison"*

---

### 🟦 Closing
**Type:** X  
**Background:** Dark navy  
**Use when:** Final slide of any deck.

**What it looks like:**
- Title + subtitle left (no gradient bar)
- Gold punchline bold 18pt
- Gold separator line 0.02" below punchline
- 3 stacked pillar cards (Indigo / Purple / Coral stripes), heading + italic body
- Coral CTA button — white text, "Start documenting. Then automate."
- Contact line below CTA
- Logo circle placeholder right
- Gold tagline bottom right, disclaimer bottom left

**Friendly trigger:** *"Closing"* or *"Final slide"*

---

## WHITE SLIDES

---

### ⬜ Framework Rows
**Type:** F  
**Background:** White  
**Use when:** Presenting a named framework with 3 rows — each row has a letter, a tag, a heading and body.

**What it looks like:**
- Dark navy header band with section label + title
- 3 rows on white card background
- Each row: thin left stripe, square letter badge (C / T / V), tag label in small caps, heading + body (both left aligned)
- Cream CTA box at bottom — no outline, no left bar
- Gold footer bar

**Friendly trigger:** *"Framework Rows"* or *"Letter badge rows"*

---

### ⬜ Two Teams (White)
**Type:** C (white variant)  
**Background:** White  
**Use when:** Comparing Before/After or two states, with stat numbers to show impact.

**What it looks like:**
- Dark navy header band
- White background content area
- Before / After columns with stat playcards (large number + label)
- Cream CTA at bottom

**Friendly trigger:** *"Before After"* or *"Two Teams White"*

---

### ⬜ Action Plan
**Type:** A  
**Background:** White  
**Use when:** A numbered sequence of actions (up to 5 steps) the audience should take.

**What it looks like:**
- Dark navy header band with section label + title
- 5 alternating rows (white / light tint)
- Each row: thin left stripe, circle badge (01–05 in SEQ colours), heading + body
- Cream CTA box at bottom — "Process first. Agent second."
- Gold footer bar

**Friendly trigger:** *"Action Plan"* or *"Numbered steps"*

---

### ⬜ Data Cards
**Type:** D  
**Background:** White  
**Use when:** Leading with numbers — 3 key stats that anchor the argument.

**What it looks like:**
- Dark navy header band
- 3 large stat playcards on white: big number, unit, label underneath
- Coloured badge or stripe per card
- Cream CTA at bottom

**Friendly trigger:** *"Data Cards"* or *"Stats slide"*

---

## SECTION BREAK

---

### 🔲 Section Divider
**Type:** S  
**Background:** Dark navy  
**Use when:** Breaking a long deck into chapters.

**What it looks like:**
- Minimal — large section number or label
- Gradient bar left edge
- No cards, no pull quote

**Friendly trigger:** *"Section Divider"* or *"Chapter break"*

---

## SLIDE STYLES NOT YET BUILT
*(Can be added when needed — each becomes a new Type in the spec)*

| Friendly Name | What it would be |
|---|---|
| Quote Spotlight | Single large pull quote, full slide, minimal other elements |
| Timeline | Horizontal milestones with dates and descriptions |
| Icon Grid | 6–9 icons in a grid, each with a short label |
| Stat Hero | One giant number, full-slide treatment |
| Team Grid | Headshots + names + titles |
| Two Column Text | Body copy split left / right |

---

## HOW TO APPLY A STYLE

After Claude builds the first version, say:

```
"Change slide 4 to Insight Columns"
"Rebuild slide 6 as Before After"
"Add a Section Divider before slide 5"
"What slide style would work best for [your content]?"
```

Claude will keep all other slides unchanged and rebuild only the one you name.

---

*AxlFlo Deck Design System v5.3 · SHIFT to SCALE™ is a proprietary framework of AxlFlo LLC*
