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

## Open Feedback Log

No open items.
