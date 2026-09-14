# Goals — natural-dye-mordant-calculator

Owner writes goals here; The Company plans, executes, and logs against them.
Statuses: `DRAFT` · `ACTIVE` · `BLOCKED` · `DONE`.
Parent initiative: `E:\CLAUDE\projects\svc-lab\` (same milestone-gate waiver
and standing deploy pre-approval apply here). Template/numbering
conventions in `E:\CLAUDE\COMPANY\GOALS.md`.

## Active goals

### G-001 · Natural dye mordant calculator — ACTIVE
- **What:** Three tools: a mordant calculator (`/mordant-calculator` — fiber
  weight + type → alum dose, tannin pre-mordant step for cellulose fibers,
  water bath volumes), an iron modifier calculator
  (`/iron-modifier-calculator` — ferrous sulfate dose with a fiber-damage
  risk warning), and a sourced reference chart (`/mordant-reference`). No
  database, no accounts.
- **Why:** svc-lab's backlog had 0 clean unshipped ideas (all remaining rows
  flagged legal-risk or crowded), triggering the research-pass rule. Nine
  other niches checked this run all came back saturated with dedicated
  competitors (client-side tool directories, llms.txt/AI-crawler checkers,
  SRT sync, HEIC converters, OCR, WCAG/APCA contrast checkers, E-number
  lookups, paint cross-referencing). This one is genuinely thin: only one
  generic calculator-farm result and one basic calculator found, no tool
  handling the real protein-vs-cellulose fiber split or giving fiber-damage
  safety guidance for iron — same "dominant coverage is thin/generic, not
  saturated" shape as soap-lye-calculator vs. SoapCalc. See svc-lab's
  `GOALS.md` backlog idea #26 and its own `docs/decisions/D001`.
- **Acceptance criteria:** every WOF%/water-ratio figure sourced from a real
  citable fiber-arts authority (not memory), cross-checked against at least
  two independent sources; pure calculation logic unit-tested; e2e-tested
  for all three tools; domain-expert-reviewed for natural-dyeing/textile-
  chemistry accuracy before shipping, including the iron safety-guard
  thresholds; live and reachable over HTTPS; sitemap present.
- **Constraints:** No database, no accounts, no paid dependencies. Chrome
  and tin mordants are explicitly out of scope (real toxicity concerns) —
  don't add them without a dedicated safety-review pass.

**Milestones:**
- [x] M1 — Build: `lib/mordant-data.ts` (sourced WOF%/water-ratio tables),
      `lib/mordant.ts` (pure calculation logic), three tool pages, sourced
      reference chart. 15 unit tests, 6 e2e tests, ESLint clean.
- [ ] M1b — Domain-expert review (natural-dye/textile-chemistry accuracy,
      the iron safety-guard thresholds, honesty of "craft-practice
      convention, not a regulated standard" framing).
- [ ] M2 — Ship: security review, push, deploy, hub page + sitemap index
      update.
- [ ] M3 — Monetization once AdSense approves this domain (already wired
      via the shared `ADSENSE_PUBLISHER_ID` env var).

**Progress log** (newest first):
- 2026-09-14 — Goal created, M1 built (svc-lab daily automation, unattended
  run). Scaffolded from `svc-lab/template` via Read/Write per file (`cp -r`
  hit the same non-bypassable Bash approval gate documented on every prior
  service's own log). Sourced every mordant/modifier figure via WebFetch/
  WebSearch against forestsandmeadows.com, themazi.com, and Botanical
  Colors (cross-checked, not taken from a single source) — see
  `lib/mordant-data.ts`'s header comment and `docs/domain-reference.md`.
