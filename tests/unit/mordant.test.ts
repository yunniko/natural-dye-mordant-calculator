import { describe, expect, it } from "vitest";
import {
  calculateIronModifier,
  calculateMordantPlan,
  gramsFromWof,
  litersFromRatio,
} from "../../lib/mordant";
import { ALUM_WOF, SODA_ASH_WOF, TANNIN_OPTIONS } from "../../lib/mordant-data";

describe("gramsFromWof", () => {
  it("computes grams as a percentage of fiber weight", () => {
    expect(gramsFromWof(100, 12)).toBe(12);
    expect(gramsFromWof(250, 15)).toBe(37.5);
  });

  it("rounds to 2 decimal places", () => {
    expect(gramsFromWof(333, 10)).toBe(33.3);
  });
});

describe("litersFromRatio", () => {
  it("scales the per-100g water ratio to the actual fiber weight", () => {
    expect(litersFromRatio(100, 5)).toBe(5);
    expect(litersFromRatio(500, 5)).toBe(25);
  });
});

describe("calculateMordantPlan", () => {
  it("protein fiber: single alum step, no tannin or soda ash", () => {
    const plan = calculateMordantPlan({ fiberWeightG: 100, fiberCategory: "protein" });
    expect(plan.steps).toHaveLength(1);
    expect(plan.steps[0].name).toContain("Alum");
    expect(plan.steps[0].grams).toBe(gramsFromWof(100, ALUM_WOF.protein.default));
    expect(plan.waterBaths.tannin).toBeUndefined();
    expect(plan.waterBaths.alum).toBeDefined();
  });

  it("cellulose fiber: tannin pre-mordant, then required soda ash, then alum", () => {
    const plan = calculateMordantPlan({ fiberWeightG: 200, fiberCategory: "cellulose" });
    expect(plan.steps).toHaveLength(3);
    expect(plan.steps[0].name).toContain("Tannin");
    expect(plan.steps[1].name).toContain("Soda ash");
    expect(plan.steps[1].grams).toBe(gramsFromWof(200, SODA_ASH_WOF.default));
    expect(plan.steps[2].name).toContain("Alum");
    expect(plan.steps[2].grams).toBe(gramsFromWof(200, ALUM_WOF.cellulose.default));
    expect(plan.waterBaths.tannin).toBeDefined();
    expect(plan.waterBaths.alum).toBeDefined();
  });

  it("uses the correct dose for each named tannin type", () => {
    const myrobalan = calculateMordantPlan({
      fiberWeightG: 100,
      fiberCategory: "cellulose",
      tanninId: "myrobalan",
    });
    const gallnut = calculateMordantPlan({
      fiberWeightG: 100,
      fiberCategory: "cellulose",
      tanninId: "gallnut-extract",
    });
    const myrobalanDefault = TANNIN_OPTIONS.find((t) => t.id === "myrobalan")!.wof.default;
    const gallnutDefault = TANNIN_OPTIONS.find((t) => t.id === "gallnut-extract")!.wof.default;
    expect(myrobalan.steps[0].grams).toBe(gramsFromWof(100, myrobalanDefault));
    expect(gallnut.steps[0].grams).toBe(gramsFromWof(100, gallnutDefault));
    expect(myrobalan.steps[0].grams).not.toBe(gallnut.steps[0].grams);
  });

  it("adds an optional cream-of-tartar step only for protein fibers", () => {
    const withHelper = calculateMordantPlan({
      fiberWeightG: 100,
      fiberCategory: "protein",
      useCreamOfTartar: true,
    });
    expect(withHelper.steps).toHaveLength(2);
    expect(withHelper.steps[1].name).toContain("Cream of tartar");

    const celluloseIgnoresHelper = calculateMordantPlan({
      fiberWeightG: 100,
      fiberCategory: "cellulose",
      useCreamOfTartar: true,
    });
    expect(celluloseIgnoresHelper.steps.some((s) => s.name.includes("Cream of tartar"))).toBe(
      false,
    );
  });

  it("respects a custom alum WOF percentage", () => {
    const plan = calculateMordantPlan({
      fiberWeightG: 100,
      fiberCategory: "cellulose",
      alumWofPercent: 18,
    });
    expect(plan.steps[2].grams).toBe(18);
  });

  it("uses different water ratios for protein-alum vs. cellulose-alum baths", () => {
    const protein = calculateMordantPlan({ fiberWeightG: 100, fiberCategory: "protein" });
    const cellulose = calculateMordantPlan({ fiberWeightG: 100, fiberCategory: "cellulose" });
    expect(protein.waterBaths.alum.literPer100g).not.toBe(cellulose.waterBaths.alum.literPer100g);
  });
});

describe("calculateIronModifier", () => {
  it("flags normal risk at or below the cited source's own 2% WOF sample dose", () => {
    const result = calculateIronModifier(100, 2);
    expect(result.riskLevel).toBe("normal");
    expect(result.grams).toBe(2);
  });

  it("flags caution between 2% and the 4% WOF hard ceiling", () => {
    const result = calculateIronModifier(100, 3);
    expect(result.riskLevel).toBe("caution");
  });

  it("flags high-risk above the 4% WOF hard ceiling ('never use above')", () => {
    const result = calculateIronModifier(100, 5);
    expect(result.riskLevel).toBe("high-risk");
  });

  it("defaults to the source's own 2% WOF sample dose", () => {
    const result = calculateIronModifier(100);
    expect(result.wofPercent).toBe(2);
    expect(result.riskLevel).toBe("normal");
  });
});
