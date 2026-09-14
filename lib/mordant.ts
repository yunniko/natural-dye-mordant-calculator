import {
  ALUM_WOF,
  CREAM_OF_TARTAR_WOF,
  FiberCategory,
  IRON_WOF,
  SODA_ASH_WOF,
  TANNIN_OPTIONS,
  TanninId,
  tanninOptionById,
} from "./mordant-data";

export interface MordantStep {
  name: string;
  grams: number;
  wofPercent: number;
}

export interface WaterBath {
  liters: number;
  literPer100g: number;
}

export interface MordantPlan {
  fiberCategory: FiberCategory;
  steps: MordantStep[];
  waterBaths: Record<string, WaterBath>;
}

function round(n: number, decimals = 1): number {
  const factor = 10 ** decimals;
  return Math.round(n * factor) / factor;
}

export function gramsFromWof(fiberWeightG: number, wofPercent: number): number {
  return round((fiberWeightG * wofPercent) / 100, 2);
}

export function litersFromRatio(fiberWeightG: number, literPer100g: number): number {
  return round((fiberWeightG / 100) * literPer100g, 1);
}

export interface MordantPlanInput {
  fiberWeightG: number;
  fiberCategory: FiberCategory;
  alumWofPercent?: number;
  tanninId?: TanninId;
  tanninWofPercent?: number;
  useCreamOfTartar?: boolean;
  creamOfTartarWofPercent?: number;
}

/** Builds the mordant recipe (pre-mordant + mordant steps, with water bath volumes) for one fiber batch. Dose only — temperature and timing also matter; see the reference page's process note. */
export function calculateMordantPlan(input: MordantPlanInput): MordantPlan {
  const {
    fiberWeightG,
    fiberCategory,
    alumWofPercent = ALUM_WOF[fiberCategory].default,
    tanninId = "gallnut-extract",
    tanninWofPercent,
    useCreamOfTartar = false,
    creamOfTartarWofPercent = CREAM_OF_TARTAR_WOF.default,
  } = input;

  const steps: MordantStep[] = [];
  const waterBaths: Record<string, WaterBath> = {};

  if (fiberCategory === "cellulose") {
    const tannin = tanninOptionById(tanninId) ?? TANNIN_OPTIONS[1];
    const tanninWof = tanninWofPercent ?? tannin.wof.default;
    steps.push({
      name: `Tannin pre-mordant (${tannin.label})`,
      grams: gramsFromWof(fiberWeightG, tanninWof),
      wofPercent: tanninWof,
    });
    waterBaths.tannin = {
      liters: litersFromRatio(fiberWeightG, 3),
      literPer100g: 3,
    };

    steps.push({
      name: "Soda ash (required with alum — not optional)",
      grams: gramsFromWof(fiberWeightG, SODA_ASH_WOF.default),
      wofPercent: SODA_ASH_WOF.default,
    });
  }

  steps.push({
    name: "Alum",
    grams: gramsFromWof(fiberWeightG, alumWofPercent),
    wofPercent: alumWofPercent,
  });
  const alumRatio = fiberCategory === "protein" ? 5 : 6;
  waterBaths.alum = {
    liters: litersFromRatio(fiberWeightG, alumRatio),
    literPer100g: alumRatio,
  };

  if (fiberCategory === "protein" && useCreamOfTartar) {
    steps.push({
      name: "Cream of tartar (optional helper)",
      grams: gramsFromWof(fiberWeightG, creamOfTartarWofPercent),
      wofPercent: creamOfTartarWofPercent,
    });
  }

  return { fiberCategory, steps, waterBaths };
}

export type IronRiskLevel = "normal" | "caution" | "high-risk";

export interface IronModifierResult {
  grams: number;
  wofPercent: number;
  riskLevel: IronRiskLevel;
}

/** Calculates the iron (ferrous sulfate) modifier dose. The cited source's own sample dose is 2% WOF and its stated hard ceiling is 4% WOF — thresholds below track that directly. */
export function calculateIronModifier(
  fiberWeightG: number,
  wofPercent: number = IRON_WOF.default,
): IronModifierResult {
  let riskLevel: IronRiskLevel = "normal";
  if (wofPercent > IRON_WOF.hardCeiling) {
    riskLevel = "high-risk";
  } else if (wofPercent > IRON_WOF.cautionAbove) {
    riskLevel = "caution";
  }
  return {
    grams: gramsFromWof(fiberWeightG, wofPercent),
    wofPercent,
    riskLevel,
  };
}
