// Sourced reference data for natural-fiber-dye mordanting, all figures given
// as % WOF (weight of fiber) unless noted.
//
// Sources (retrieved 2026-09-14, cross-checked against a domain-expert
// review pass the same day):
// - naturaldyes.ca (Maiwa), "How to Mordant — Protein Fibres": alum
//   (potassium aluminum sulfate) 15% WOF, cream of tartar 6% WOF optional,
//   30:1 water ratio, process is temperature-critical (ramp to ~90C for
//   wool / ~85C for silk, hold, then cure damp 24-48h) — this tool only
//   covers the dose, not the full temperature/time process; see the
//   reference page's process note.
// - naturaldyes.ca (Maiwa), "How to Mordant — Cellulose Fibres": tannin
//   first (percentage depends on which tannin - see TANNIN_OPTIONS below),
//   then a combined bath of soda ash 2% WOF + alum 15% WOF (the soda ash is
//   necessary — it's what lets aluminum deposit onto tannin-treated
//   cellulose; an acid-only alum bath fixes poorly).
// - naturaldyes.ca (Maiwa), "Myrobalan" and "Gallnut": myrobalan 15-20% WOF,
//   gallnut extract 6-8% WOF — two different tannins with materially
//   different doses, not interchangeable at one number.
// - naturaldyes.ca (Maiwa), "Iron": iron used at 2% WOF in their own color
//   samples; "we recommend never using it above 4% WOF." Iron can damage
//   both protein and cellulose fiber.
// - Botanical Colors, "How to Mordant with Aluminum Sulfate" (12% WOF, up
//   to 20%) and "How to Mordant with Aluminum Potassium Sulfate" (10% WOF,
//   up to 20%) — two different aluminum salts; potassium alum delivers
//   less aluminum per gram than aluminum sulfate, so the two aren't 1:1
//   substitutes by weight even though craft ranges overlap.
// - Botanical Colors / Dharma Trading, iron (ferrous sulfate) safety: wear
//   a dust mask when weighing the powder, store away from children/pets,
//   stains permanently, harmful if swallowed (seek medical attention);
//   dispose down a municipal/septic drain, never into a waterway.
// - naturaldyes.ca (Maiwa), "Mordants": chrome, tin, and copper are all
//   heavy-metal mordants the source recommends against for home use
//   (toxicity and disposal concerns); alum is inexpensive and safe.
//
// These are craft-practice conventions, not a regulated standard — treat as
// a well-sourced starting point, not a guaranteed-safe universal number, and
// note this tool covers dose only, not temperature/timing, which also
// matters to the real-world result.

export type FiberCategory = "protein" | "cellulose";

export interface FiberType {
  id: string;
  label: string;
  category: FiberCategory;
}

export const FIBER_TYPES: FiberType[] = [
  { id: "wool", label: "Wool", category: "protein" },
  { id: "silk", label: "Silk", category: "protein" },
  { id: "alpaca", label: "Alpaca", category: "protein" },
  { id: "mohair", label: "Mohair", category: "protein" },
  { id: "cotton", label: "Cotton", category: "cellulose" },
  { id: "linen", label: "Linen", category: "cellulose" },
  { id: "hemp", label: "Hemp", category: "cellulose" },
  { id: "ramie", label: "Ramie", category: "cellulose" },
];

interface WofRange {
  min: number;
  max: number;
  default: number;
}

// Alum mordant, by fiber category. Protein default (12%) sits between
// Botanical Colors' aluminum-potassium-sulfate figure (10%, up to 20%) and
// Maiwa's aluminum-sulfate figure (15%) — both are real alum salts used
// interchangeably in craft practice at overlapping doses.
export const ALUM_WOF: Record<FiberCategory, WofRange> = {
  protein: { min: 10, max: 20, default: 12 },
  cellulose: { min: 15, max: 20, default: 15 },
};

// Soda ash, cellulose alum step only — required alongside alum, not
// optional: it's what allows aluminum to deposit onto tannin-treated
// cellulose fiber. Mildly alkaline/irritant; dissolve fully before adding.
export const SODA_ASH_WOF: WofRange = { min: 2, max: 2, default: 2 };

// Tannin pre-mordant, cellulose fibers only, applied before the alum+soda-ash
// step. Different tannins need materially different doses — not one number.
export type TanninId = "myrobalan" | "gallnut-extract";
export interface TanninOption {
  id: TanninId;
  label: string;
  wof: WofRange;
}
export const TANNIN_OPTIONS: TanninOption[] = [
  { id: "myrobalan", label: "Myrobalan", wof: { min: 15, max: 20, default: 18 } },
  { id: "gallnut-extract", label: "Gallnut extract", wof: { min: 6, max: 8, default: 7 } },
];

// Cream of tartar, optional helper added alongside alum for protein fibers —
// assists alum binding to the fiber and can shift color slightly (the
// direction depends on the specific dye, not a universal "brightening").
export const CREAM_OF_TARTAR_WOF: WofRange = { min: 5, max: 6, default: 6 };

// Water bath volume, in liters per 100 g of fiber, by step. More water than
// the minimum is harmless — the ratio governs even coverage and free fiber
// movement, not the mordant dose itself.
export const WATER_RATIO_L_PER_100G = {
  proteinAlum: { min: 3, max: 6, default: 5 },
  celluloseTannin: { min: 3, max: 3, default: 3 },
  celluloseAlum: { min: 5, max: 7, default: 6 },
};

// Iron (ferrous sulfate) modifier/"saddening" agent, applied after dyeing.
// The cited source's own sample dose is 2% WOF, and it states iron should
// never be used above 4% WOF — thresholds below reflect that directly
// rather than a separate "high-risk" tier at a higher, unsourced number.
export const IRON_WOF = { min: 0.25, max: 4, default: 2, cautionAbove: 2, hardCeiling: 4 };

export function fiberTypeById(id: string): FiberType | undefined {
  return FIBER_TYPES.find((f) => f.id === id);
}

export function tanninOptionById(id: string): TanninOption | undefined {
  return TANNIN_OPTIONS.find((t) => t.id === id);
}
