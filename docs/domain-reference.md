# Domain reference — natural dye mordanting

Domain-expert review conducted 2026-09-14 (subagent `domain-expert`, read-only/advisory). Findings
below are what changed as a direct result; not a transcript — see `HANDOVER.md`'s decision record
for the full outcome summary.

## Fix-required findings, all applied

1. **Cellulose alum step was missing soda ash (2% WOF).** Soda ash is required alongside alum for
   cellulose fibers — it's what allows aluminum to deposit onto tannin-treated cellulose; an
   acid-only alum bath fixes poorly. Added as its own step in `lib/mordant.ts`/`lib/mordant-data.ts`.
   Independently re-verified via WebFetch against naturaldyes.ca (Maiwa)'s own cellulose-mordanting
   page.
2. **Tannin was one dose (10% WOF) for two different tannins.** Myrobalan (15-20% WOF) and gallnut
   extract (6-8% WOF) need materially different doses — not interchangeable at one number. Split
   into `TANNIN_OPTIONS` with a UI selector.
3. **An unsourced "iron up to 10-25% WOF" figure was removed.** No source was found for it during
   the review; it also contradicted the tool's own cited source ("never use above 4% WOF"). Deleted
   from the reference page and data comments.
4. **Iron risk banding was more permissive than its own cited source.** Was: normal ≤4%, caution
   4-10%. Now: normal ≤2% (the source's own sample dose), caution 2-4%, high-risk >4% (the source's
   explicit "never use above" ceiling).
5. **Iron modifier page had no health/disposal safety copy**, only a fiber-damage note. Added:
   harmful if swallowed, dust mask when weighing, keep from children/pets, dispose down a municipal/
   septic drain (never into a waterway) — sourced from Dharma Trading Co.'s iron mordant
   instructions (reproducing Botanical Colors' guidance).

## Caveats applied (not wrong, but needed a note or fix)

- Widened the protein alum range to 10-20% WOF and corrected the source attribution: "alum" covers
  two different aluminum salts (potassium alum vs. aluminum sulfate) at overlapping but not
  identical doses, not 1:1 substitutes by weight.
- Cream of tartar copy fixed: it assists alum binding (not just softness), and any color effect is
  dye-specific (shifts madder toward orange, cochineal toward brighter red), not universal
  brightening.
- Removed "bamboo" from the cellulose fiber list — bamboo yarn is usually regenerated cellulose
  (viscose), not a natural bast fiber like ramie, and often blended, which breaks WOF dosing. Kept
  "Ramie" alone.
- Safety banner: added copper to the excluded heavy-metal mordants (alongside chrome/tin), and
  corrected the reasoning for dedicated equipment — not alum toxicity (it's food-grade pickling
  alum), but permanent iron/copper residue and pot-metal chemistry (aluminum pots mordant, iron pots
  darken everything).
- Softened "exact dose"/"cross-checked against two sources" language site-wide; added an explicit
  "dose only, not temperature/timing" disclosure, since the real process is temperature-critical
  and this tool doesn't cover that.
- Water-liters rounding reduced from 2 to 1 decimal place (false precision), with a note that more
  water than the minimum is harmless (governs coverage, not dose).

## Not applied — flagged as open, lower stakes

- Per-fiber temperature/timing guidance (wool ~90°C vs. silk ~85°C; alpaca/mohair may need gentler
  handling) is real but out of scope for a dose calculator — flagged in copy rather than built.
- Blend/mixed-fiber handling isn't supported (WOF dosing assumes a single known fiber type).
- Botanical Colors' exact figures were only confirmed via search-engine snippets (the site 403s
  WebFetch) — re-verify in a browser if a future change depends on the precise number.

## Sources

naturaldyes.ca (Maiwa): "How to Mordant — Protein Fibres," "How to Mordant — Cellulose Fibres,"
"Iron," "Myrobalan," "Gallnut," "Mordants." Botanical Colors: "How to Mordant with Aluminum
Sulfate," "How to Mordant with Aluminum Potassium Sulfate," "How To Use Iron Powder." Dharma
Trading Co.: iron mordant instructions. Retrieved 2026-09-14.
