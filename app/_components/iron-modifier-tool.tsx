"use client";

import { useMemo, useState } from "react";
import { calculateIronModifier } from "@/lib/mordant";
import { IRON_WOF } from "@/lib/mordant-data";

const GRAMS_PER_OUNCE = 28.3495231;

const RISK_STYLES: Record<string, string> = {
  normal: "border-green-300 bg-green-50 text-green-900",
  caution: "border-amber-300 bg-amber-50 text-amber-900",
  "high-risk": "border-red-300 bg-red-50 text-red-900",
};

const RISK_LABELS: Record<string, string> = {
  normal: "At or below the cited source's own 2% WOF sample dose.",
  caution: "Caution — above the source's 2% WOF sample dose but not yet past its stated ceiling.",
  "high-risk":
    "High risk — above the 4% WOF ceiling the cited source says to never exceed. Real fiber-damage risk, especially on wool and silk.",
};

export function IronModifierTool() {
  const [weightValue, setWeightValue] = useState(100);
  const [weightUnit, setWeightUnit] = useState<"g" | "oz">("g");
  const [wofPercent, setWofPercent] = useState(IRON_WOF.default);

  const fiberWeightG = weightUnit === "g" ? weightValue : weightValue * GRAMS_PER_OUNCE;
  const result = useMemo(
    () => calculateIronModifier(fiberWeightG, wofPercent),
    [fiberWeightG, wofPercent],
  );

  return (
    <div className="rounded-lg border border-gray-200 p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Fiber weight</span>
          <div className="mt-1 flex gap-2">
            <input
              type="number"
              min={0}
              max={100000}
              step="any"
              value={weightValue}
              onChange={(e) => setWeightValue(Number(e.target.value))}
              className="w-full rounded border border-gray-300 px-3 py-2"
              data-testid="iron-fiber-weight-input"
            />
            <select
              value={weightUnit}
              onChange={(e) => setWeightUnit(e.target.value as "g" | "oz")}
              className="rounded border border-gray-300 px-2 py-2"
              data-testid="iron-fiber-weight-unit"
            >
              <option value="g">g</option>
              <option value="oz">oz</option>
            </select>
          </div>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Iron dose (% WOF)</span>
          <input
            type="number"
            min={0}
            max={20}
            step="0.25"
            value={wofPercent}
            onChange={(e) => setWofPercent(Number(e.target.value))}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            data-testid="iron-wof-input"
          />
        </label>
      </div>

      <div className="mt-5 rounded border border-gray-100 bg-gray-50 p-4" data-testid="iron-result">
        <h3 className="font-semibold text-gray-900">
          {result.grams} g ferrous sulfate ({result.wofPercent}% WOF)
        </h3>
      </div>

      <div
        className={`mt-4 rounded border p-3 text-sm ${RISK_STYLES[result.riskLevel]}`}
        data-testid="iron-risk-banner"
      >
        {RISK_LABELS[result.riskLevel]}
      </div>

      <div className="mt-4 rounded border border-red-200 bg-red-50 p-3 text-xs text-red-900">
        <strong>Safety:</strong> ferrous sulfate is harmful if swallowed — wear a dust mask when
        weighing the dry powder, keep it away from children and pets, and seek medical attention if
        ingested. It stains permanently. Dispose of the used bath down a municipal or septic drain —
        never into a stream, lake, or other waterway.
      </div>

      <p className="mt-4 text-xs text-gray-500">
        The cited source uses {IRON_WOF.default}% WOF in its own color samples and states iron
        should never be used above {IRON_WOF.hardCeiling}% WOF — excess iron makes fiber brittle
        over time, especially wool and silk. See the reference chart for sources.
      </p>
    </div>
  );
}
