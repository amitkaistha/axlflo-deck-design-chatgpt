# AxlFlo Creative System Notes

Version: 5.8 working principles

Purpose: preserve v5.5 visual quality while allowing JSON automation to make stronger creative choices.

## Locked Principles

- AxlFlo decks should feel designed, not generated.
- Rules prevent bad output; they should not force identical output.
- v5.5 is the visual quality baseline.
- Render safety beats visual complexity.
- The system exists to scale design judgment, not replace it with templates.

## Icon Pattern

Implementation pattern:

```text
[icon]

Title

Body
```

Rules:

1. Icons should be vector/editable where possible.
2. Use one icon per card/component, not one floating icon per slide.
3. Avoid generic symbols unless semantically correct.
4. Use consistent size, stroke weight, and placement.
5. Icon should support the concept.

Avoid:

- plain checkmark for success
- warning triangle for problem
- arrow for growth
- random gear/list/grid icons as filler

## Number-Led Slide Principle

Use number-led slides where the content naturally supports magnitude, proof, sequence, phases, gap, or scale.

Target for a 10-12 slide deck: 2 slides, maybe 3 max.

Do not force numbers onto narrative slides or use numbers as decoration.

Good use cases:

- proof slides
- adoption gap
- roadmap phases
- scale metrics
- maturity stages
- quantified impact

## Architecture Slide Principle

Architecture slides should look like systems, not spreadsheets.

Preferred treatment:

- component cards
- two grouped zones
- Versioned vs Live
- file/component role visually separated
- icons inside components where useful
- no table side accent bars

Tables are allowed only when comparison precision matters more than visual system explanation.

## Callable Slide Catalogue

The system should support callable patterns:

- title
- storyCards
- insightColumns
- insightGrid
- numberProofCards
- twoTeams
- frameworkRows
- processCycle
- systemArchitecture
- roadmapPhases
- ctaClosing
- disclaimer

The catalogue is optional guidance unless explicitly forced.

## Visual Variety Guardrail

Do not default to generic boxes or tables. Choose the layout that makes the thinking visible.

A strong deck should vary:

- narrative slide
- visual or number slide
- structured card slide
- architecture/system slide
- roadmap/sequence slide
- CTA slide

## Brain-Led Concept Slides

The slide catalogue is a renderer vocabulary, not the creative ceiling.

When the core idea needs a stronger visual metaphor, create a custom concept slide instead of forcing the content into cards, tables, or rows. This is especially important for thesis slides, proof-of-system slides, before/after mental-model shifts, and moments where the audience must understand the operating logic in one glance.

Good custom concept slides should:

1. Make the argument clearer than a standard catalogue layout would.
2. Use one dominant visual idea.
3. Preserve AxlFlo brand anatomy, contrast, typography, and footer discipline.
4. Stay inspectable and editable in PowerPoint.
5. Pass structural QA before being treated as reusable inspiration.

The agent is not the magic. The system around the agent is the product.

## QA Philosophy

QA should catch:

- slide count
- missing gradient
- missing footer
- dark/white background treatment
- structural color checks
- obvious density warnings
- render-safety issues

QA should not:

- block creative layout choices unnecessarily
- force all slides into one style
- rewrite content

0 failures required. Warnings are allowed when non-blocking and documented.

## Render Safety

Avoid:

- negative dimensions
- invalid line extents
- unsupported nested text structures
- risky special icon constructs
- overly complex grouped shapes

Prefer:

- simple editable PowerPoint shapes/text
- clean dimensions
- stable pptxgenjs primitives
- safe Unicode only when tested

## Post-Build Review Loop

Mandatory process:

```text
Build
→ structural QA
→ content/narrative QA
→ visual/design QA
→ blunt creative critique
→ feedback capture
→ classify feedback
→ user approval
→ promote approved feedback into rules/code/checklists
→ regression check on next build
```

Auto-fix:

- overflow
- alignment bugs
- clear rule violations

Ask approval:

- new design principles
- new slide patterns
- narrative rewrites
- system-level rule changes

## Feedback Reinforcement Loop

Every iteration must improve the system slowly and deliberately. Feedback is not automatically a rule. It must be captured, classified, approved, then promoted.

Classification:

- **Fix now:** A concrete problem in the current deck. Patch the deck, rebuild, and rerun QA.
- **Promote to rule:** A reusable principle that should apply to future decks. Requires Amit's approval before changing spec, renderer, QA, or templates.
- **Watchlist:** A promising observation that needs more evidence across builds.
- **Reject:** A suggestion that conflicts with brand, narrative, render safety, or deck purpose. Record the reason.

For each feedback item, capture:

- Source: Amit, self-review, QA, visual inspection, or content review.
- Scope: current deck only, deck family, or global system.
- Severity: blocker, important, polish, or idea.
- Decision: fix now, promote to rule, watchlist, or reject.
- Owner action: content, design, renderer, QA, docs, or versioning.
- Verification: how the next build proves the item improved and did not regress.

Promotion rules:

1. Do not promote a rule from a single ambiguous observation.
2. Promote immediately when the issue violates an existing AxlFlo principle.
3. Promote after Amit approval when the issue represents a reusable taste, process, or design judgment.
4. Every promoted rule must be added to at least one durable place: skill spec, creative system doc, QA checklist, renderer, schema, or README.
5. The next build must explicitly check prior approved feedback before final delivery.

## Versioning Guidance

Patch version: slide/code fixes.

Minor version: reusable system principles, narrative advisory layer, new slide pattern catalogue, new automated converter.

Major version: new rendering engine, brand system rewrite, or full pipeline architecture change.

## Do Not Regress

Do not return to:

- generic white slides
- standard tables everywhere
- inline icon-title layouts
- cream boxes with side bars
- 0.07/0.08 accent strips
- repetitive 3-card layouts
- rigid brain-controlled layouts
- placeholder outputs
