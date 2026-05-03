# AxlFlo Deck System Changelog

This changelog is the reflection-friendly history of system changes. It summarizes version changes that may need to be referenced later in deck reviews, process audits, or future system upgrades.

Detailed design deltas still live in [skill/SKILL_merged.md](skill/SKILL_merged.md). The active version marker lives in [version.json](version.json).

## Unreleased

Feature governance.

- Added [FEATURE_LOG.md](FEATURE_LOG.md) to track proposed system improvements without promoting them directly into the production deck workflow.
- Added status, risk, quality gate, and promotion rules for future agentic-engineering improvements.
- Added first feature backlog covering feedback regression checks, Agentic Decision Records, visual QA artifacts, slide strategy layer, golden fixtures, autonomy contract, content QA rubric, and screenshot review workflow.
- Added trial executable feedback regression checker at [qa/feedback_regression.js](qa/feedback_regression.js), exposed as `npm run qa:feedback-regression`.

## v5.8.0 - May 2026

Feedback reinforcement loop.

- Added [docs/FEEDBACK_LOOP.md](docs/FEEDBACK_LOOP.md) as the working memory for feedback across deck iterations.
- Added a feedback classification model: `fix_now`, `promote_to_rule`, `watchlist`, and `reject`.
- Added an approval gate: feedback is not promoted into the system until Amit approves it.
- Added an approved feedback register for reusable rules that future builds must regression-check.
- Seeded the register with lessons from the SHIFT to Scale CXO deck:
  - No repeated legal/framework footer on normal slides.
  - Legal/framework statement belongs on the disclaimer slide unless explicitly requested.
  - Maximum one `#F5EDD6` cream quote/takeaway box per slide.
  - Card slides should use semantic icons where they clarify the concept.
  - Every build must include structural QA, content/narrative QA, visual/design QA, and blunt creative critique.
- Updated [docs/AXLFLO_CREATIVE_SYSTEM.md](docs/AXLFLO_CREATIVE_SYSTEM.md) with the formal reinforcement loop.
- Updated [skill/SKILL_merged.md](skill/SKILL_merged.md) with mandatory feedback capture, classification, approval, promotion, and regression checks.

## v5.7.0 - May 2026

Mandatory post-build workflow.

- Added the five-step build workflow:
  1. Build from source.
  2. Run structural QA.
  3. Run content/narrative QA.
  4. Run visual/design QA.
  5. Report blunt creative critique.
- Updated [README.md](README.md) so the workflow is visible from the repo root.
- Updated [skill/SKILL_merged.md](skill/SKILL_merged.md) so the workflow is part of the AxlFlo operating spec.
- Clarified that structural QA is necessary but not sufficient. A deck can pass script checks and still fail taste, narrative, or executive readiness.

## v5.6.0 - May 2026

Creative JSON deck system.

- Added creative JSON deck schema and layout-plan schema.
- Added explicit AxlFlo creative system principles.
- Added layout-plan-aware JSON renderer while preserving the v5.5 visual baseline.
- Updated QA to support JSON manifests, render-safety checks, density warnings, and number-led rhythm warnings.
- Introduced creative layout-plan guidance so decks can be generated from structured JSON without forcing every slide into the same visual pattern.

## v5.5.0 - May 2026

Visual baseline and card system improvements.

- Added card density tiers.
- Added semantic icon mapping.
- Added visual rhythm guidance.
- Added number-led moments.
- Standardized strip/icon balance.
- Standardized card icon pattern: contextual icon above title, no inline icon-title layouts.

## v5.4.x - May 2026

SHIFT-VEDA deck baseline.

- Updated deck build to SHIFT-VEDA v5.4.5.
- Preserved baseline copies under `baselines/v5.4`.
- Created clean folder structure.
- Aligned skill gradient direction to engine behavior: Coral -> Purple -> Indigo.
- Renamed QA engine file to [qa/qa.js](qa/qa.js).

## Earlier History

Earlier detailed v3.x to v5.3 design-system history is maintained inside [skill/SKILL_merged.md](skill/SKILL_merged.md), especially:

- Part 19: build deltas and corrections.
- Part 20: version history.

Future updates should add a new section at the top of this file whenever the system version changes.
