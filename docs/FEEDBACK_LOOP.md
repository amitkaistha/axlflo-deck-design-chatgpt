# AxlFlo Deck Feedback Reinforcement Loop

Purpose: turn deck feedback into controlled system improvement without creating drift.

This file is the working memory for feedback across iterations. Add a new entry after every deck review or build critique.

## Loop

1. Capture feedback exactly enough that it can be acted on later.
2. Classify it as `fix_now`, `promote_to_rule`, `watchlist`, or `reject`.
3. Ask Amit for approval before promoting anything into the system.
4. Apply approved changes to the deck, renderer, QA, schema, README, or skill spec.
5. Rebuild and verify the fix.
6. Check previous approved feedback in the next build to prevent regression.

## Feedback Entry Template

```text
ID:
Date:
Deck/build:
Source: Amit | self-review | structural QA | content QA | visual QA
Feedback:
Why it matters:
Scope: current_deck | deck_family | global_system
Severity: blocker | important | polish | idea
Classification: fix_now | promote_to_rule | watchlist | reject
Approval status: pending | approved | rejected
Action taken:
Files changed:
Verification:
Regression check for next build:
```

## Approved Feedback Register

These items must be checked in every future AxlFlo deck build.

| ID | Rule | Scope | Where Implemented | Regression Check |
|---|---|---|---|---|
| AFL-FB-001 | Every deck build must end with structural QA, content/narrative QA, visual/design QA, and blunt creative critique. | global_system | README, SKILL_merged.md, AXLFLO_CREATIVE_SYSTEM.md | Final response includes QA counts and creative critique. |
| AFL-FB-002 | Normal slides must not repeat the legal/framework footer. Legal text belongs on the disclaimer slide unless explicitly requested. | global_system | JSON renderer, deck content convention | PPTX text scan: legal statement appears only on disclaimer slide. |
| AFL-FB-003 | A slide may have at most one `#F5EDD6` cream quote/takeaway box. The bottom reserved area carries a takeaway, not a second cream box. | global_system | JSON renderer | PPTX color scan: no non-disclaimer slide has more than one `F5EDD6` fill. |
| AFL-FB-004 | Card slides should use semantic icons where they clarify the concept; missing icons are a visual QA issue. | deck_family | JSON renderer icon mapping | Visual QA checks card slides for icon presence and semantic fit. |
| AFL-FB-005 | Do not allow 2+ consecutive slides to use the same visual pattern unless the layout plan explicitly approves the repeat. Prefer approved premium variants from the visual catalogue before inventing new layouts. | global_system | QA visual diversity rule, layout.plan.json visual_diversity block, VISUAL_VARIANT_CATALOGUE.md | Manifest QA fails unapproved consecutive repeated render patterns when `visual_diversity.max_consecutive_same_render` is `1`. |
| AFL-FB-006 | Use brain-led creative concept slides when the idea needs more than a catalogue layout. The slide catalogue is a renderer vocabulary, not the creative ceiling. Custom slides are encouraged when they make the argument clearer, sharper, or more memorable, but they must still pass structural QA and fit AxlFlo visual principles. | global_system | FEEDBACK_LOOP.md, AXLFLO_CREATIVE_SYSTEM.md | Visual/design QA checks whether key concept slides were allowed a custom visual metaphor instead of being forced into generic cards. |

## Open Feedback Log

```text
ID: AFL-FB-006
Date: 2026-05-03
Deck/build: agentic_deck_system_single_slide.pptx
Source: Amit
Feedback: The single slide worked because it was built with creative judgment, not mechanically from the catalogue. This is the kind of work Amit wants more of.
Why it matters: The deck system must preserve creative intelligence. Templates create consistency, but the strongest slides often come from translating the idea into a custom visual metaphor.
Scope: global_system
Severity: important
Classification: promote_to_rule
Approval status: approved
Action taken: Promoted to approved feedback register as AFL-FB-006.
Files changed: docs/FEEDBACK_LOOP.md, docs/AXLFLO_CREATIVE_SYSTEM.md
Verification: The agentic deck system slide passed structural QA with 8 passed, 0 warnings, 0 failures.
Regression check for next build: During visual/design QA, identify whether key thesis or concept slides deserve a custom visual treatment instead of a catalogue layout.
```
