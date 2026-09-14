# Handover — natural-dye-mordant-calculator
Last verified: 2026-09-14 at (pre-commit)

Free mordant/iron-modifier calculators for natural fiber dyeing. Goal: `GOALS.md` G-001. Parent
initiative: `E:\CLAUDE\projects\svc-lab\`. Charter: `E:\CLAUDE\COMPANY\`.

## Current state

- Built, all four checks green: ESLint clean, 13/13 Vitest unit tests, production build clean (7
  routes, confirms `next@16.3.5`, no known RCE), 8/8 Playwright e2e tests.
- Domain-expert review (natural-dye/textile-chemistry accuracy) was **not a rubber stamp**: found
  and required fixing 5 real issues (a missing soda-ash step for cellulose fibers, a conflated
  tannin dose covering two different tannins at 2x different amounts, an unsourced/inconsistent
  high-end iron figure, iron risk-warning thresholds looser than the tool's own cited source, and
  no health/disposal safety copy on the iron page) plus several caveat-level fixes (alum-salt
  citation, cream-of-tartar mechanism, bamboo/ramie fiber grouping, copper mordant mention,
  false-precision water figures). All applied and re-verified — see `docs/domain-reference.md` for
  the full list and `docs/decisions/D001`.
- Not yet: committed, pushed, deployed, security-reviewed, SEO-reviewed, or linked from the hub.

## How things fit together

- `lib/mordant-data.ts` — every sourced WOF%/water-ratio figure, with inline citations.
- `lib/mordant.ts` — pure calculation logic (grams from WOF%, liters from ratio, mordant recipe
  builder, iron risk-level classifier).
- Three pages: `/mordant-calculator`, `/iron-modifier-calculator`, `/mordant-reference`.
- No database, no accounts, no file upload, no server routes — fully static/client-side.

## Rules in force

- Every mordant/modifier figure in `lib/mordant-data.ts` is sourced — don't adjust from memory; see
  that file's header comment and `docs/domain-reference.md` before changing a number.
- Iron modifier defaults and risk thresholds are a safety guard tracking the cited source's own
  "never above 4% WOF" ceiling — don't loosen without a source.
- Chrome, tin, and copper mordants are explicitly out of scope (real toxicity/disposal concerns).
- `npm install`/`npm ci` need `--legacy-peer-deps` (portfolio-wide npm/arborist workaround).

## Next steps and open questions

- Security review checklist (manual, per svc-lab playbook — no server routes/uploads found, no
  `dangerouslySetInnerHTML` outside the shared escaped JSON-LD helper, no secrets staged) — run
  once more immediately before push.
- `git init`/commit, push via `init-repo.ps1`, deploy via `deploy-service.ps1` (port 30230), SEO
  review, hub page + sitemap index update in `julienika-home`.
- **COMPANY-doc reconciliation needed** (this automation cannot edit `COMPANY\**`): add
  `natural-dye-mordant-calculator` to `COMPANY\INFRASTRUCTURE_DEPLOY.md`'s port registry
  (`127.0.0.1:30230`, no DB) and `COMPANY\GOALS.md`'s project index, once live.
- Per-fiber temperature/timing guidance and mixed-fiber/blend handling are real gaps the
  domain-expert review flagged as out of scope for a dose calculator — a future milestone could add
  a process-notes column rather than just the dose.

## Deploy log

Not yet deployed.

## Decisions

`docs/decisions/README.md` (D001).
