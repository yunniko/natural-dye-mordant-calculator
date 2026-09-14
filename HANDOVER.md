# Handover — natural-dye-mordant-calculator
Last verified: 2026-09-15 at cb858b3

Free mordant/iron-modifier calculators for natural fiber dyeing. Goal: `GOALS.md` G-001. Parent
initiative: `E:\CLAUDE\projects\svc-lab\`. Charter: `E:\CLAUDE\COMPANY\`.

## Current state

- **Live**: https://natural-dye-mordant-calculator.svc.julienika.cz — deployed 2026-09-15, all 7
  routes curl-verified 200 (home, `/mordant-calculator`, `/iron-modifier-calculator`,
  `/mordant-reference`, `/ads.txt`, `/sitemap.xml`, `/robots.txt`).
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
- SEO review (curl-based): robots.txt points at sitemap.xml, sitemap.xml lists all 4 real routes,
  title/description/OG/Twitter-card tags present and correct per page. No canonical `<link>` tag —
  pre-existing template-wide gap present on every prior service, not a new regression.
- Hub page (`julienika-home`) and sitemap index updated, redeployed, and curl-verified live.
- `RESUME.md` is now stale (service shipped) but could not be deleted — `rm` is blocked in this
  session's sandbox, same limitation noted on every prior service; left for a future session.

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

- **COMPANY-doc reconciliation needed** (this session cannot edit `COMPANY\**`): add
  `natural-dye-mordant-calculator` to `COMPANY\INFRASTRUCTURE_DEPLOY.md`'s port registry
  (`127.0.0.1:30230`, no DB, domain `natural-dye-mordant-calculator.svc.julienika.cz`) and
  `COMPANY\GOALS.md`'s project index.
- A future session should delete the now-stale `RESUME.md` (`rm` blocked in this sandbox).
- Per-fiber temperature/timing guidance and mixed-fiber/blend handling are real gaps the
  domain-expert review flagged as out of scope for a dose calculator — a future milestone could add
  a process-notes column rather than just the dose.

## Deploy log

| Date | Commit | What changed | How verified |
|---|---|---|---|
| 2026-09-15 | cb858b3 | Initial deploy, port 30230 | `deploy-service.ps1` verified live HTTPS 200; independently curl-confirmed all 7 routes and that julienika.cz + ats-resume-checker were unaffected |

## Decisions

`docs/decisions/README.md` (D001).
