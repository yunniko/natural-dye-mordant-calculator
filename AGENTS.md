# natural-dye-mordant-calculator — project conventions

Read `HANDOVER.md` first: current state, decision record, next steps. Goal in `GOALS.md` (G-001).
Parent initiative in `E:\CLAUDE\projects\svc-lab\`; company-wide standards in `E:\CLAUDE\COMPANY\`.

- Stack: Next.js App Router, TypeScript, Tailwind. No database, no auth, no accounts, no file
  upload — every calculation runs client-side from number/select inputs.
- All mordant/modifier percentages and water ratios live in `lib/mordant-data.ts` with inline
  source citations (forestsandmeadows.com, themazi.com, Botanical Colors, and converged
  natural-dye-supplier sources) — see that file's header comment before changing any figure.
  Calculation logic is in `lib/mordant.ts`, kept pure and framework-free so it's unit-testable
  without booting Next.
- The iron modifier tool deliberately defaults to a conservative 2% WOF and flags risk levels
  (`normal`/`caution`/`high-risk`) above 4%/10% WOF — see `IRON_WOF` in `lib/mordant-data.ts`.
  Don't raise the default without a source; this is a safety guard, not an arbitrary choice.
- `npm install`/`npm ci` need `--legacy-peer-deps` (a live npm/arborist bug, not specific to this
  project — see `svc-lab/HANDOVER.md`).
- Two test layers: `npx vitest run` (`tests/unit/*.test.ts` — pure calculation logic) and
  `npx playwright test` (`tests/e2e/*.spec.ts` — real form-fill flows for all three tools). Both
  must pass, plus `npx eslint .` and `npm run build`, before calling a change done.
- See `E:\CLAUDE\COMPANY\INFRASTRUCTURE_DEPLOY.md` for the redeploy command once live.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
