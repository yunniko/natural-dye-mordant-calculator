# D001 · Idea choice: natural-dye mordant calculator
Date: 2026-09-14 · Goal: G-001 M1 · Status: active (superseded by: —)
Context: svc-lab's backlog had 0 clean unshipped ideas, triggering the research-pass rule.
Decision: build a WOF-based mordant/iron-modifier calculator for natural fiber dyeing.
Rejected: 9 other researched niches (client-side tool directories, llms.txt/AI-crawler checkers,
SRT sync, HEIC converters, OCR, WCAG/APCA contrast checkers, E-number/food-additive lookups, paint
cross-brand matching) — all saturated with dedicated competitors, see svc-lab's own GOALS.md
backlog rows #24-#25 for the two logged honestly. E-number checker also carried real allergy/
religious-diet harm-risk if inaccurate.
Consequence: mordant/iron dosing figures must stay sourced (see docs/domain-reference.md); a
domain-expert review found and required fixing 5 real issues before ship (missing soda ash step,
conflated tannin doses, an unsourced iron figure, iron risk banding looser than its own source,
missing iron safety copy) — future changes to lib/mordant-data.ts should re-verify against the
same sources rather than adjusting numbers from memory.
Evidence: tests/unit/mordant.test.ts; docs/domain-reference.md; svc-lab/GOALS.md 2026-09-14 entry.
