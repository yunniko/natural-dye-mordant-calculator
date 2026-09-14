# natural-dye-mordant-calculator

Free mordant calculators for natural fiber dyeing. Three tools:

- **Mordant calculator** — enter fiber weight and type; get the alum dose, the tannin pre-mordant
  step (cellulose fibers only), and water bath volumes, by weight of fiber (WOF).
- **Iron modifier calculator** — ferrous sulfate dose for saddening/darkening color after dyeing,
  with a fiber-damage risk warning above the conservative default range.
- **Mordant reference chart** — sourced WOF% ranges and water ratios, with citations.

Everything runs client-side in the browser — no upload, no account, no database.

## Run locally

```
npm install --legacy-peer-deps
npm run dev
```

## Test

```
npx eslint .
npm run build
npx vitest run
npx playwright test
```

See `HANDOVER.md` for current state and `docs/decisions/` for the record of significant decisions.
Parent initiative: `E:\CLAUDE\projects\svc-lab\`. Company-wide standards: `E:\CLAUDE\COMPANY\`.
