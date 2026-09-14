"use client";

import { useMemo, useState } from "react";
import { calculateMordantPlan } from "@/lib/mordant";
import {
  ALUM_WOF,
  CREAM_OF_TARTAR_WOF,
  FIBER_TYPES,
  TANNIN_OPTIONS,
  TanninId,
  fiberTypeById,
} from "@/lib/mordant-data";

const GRAMS_PER_OUNCE = 28.3495231;

export function MordantCalculatorTool() {
  const [weightValue, setWeightValue] = useState(100);
  const [weightUnit, setWeightUnit] = useState<"g" | "oz">("g");
  const [fiberId, setFiberId] = useState("wool");
  const [tanninId, setTanninId] = useState<TanninId>("gallnut-extract");
  const [useCreamOfTartar, setUseCreamOfTartar] = useState(false);

  const fiber = fiberTypeById(fiberId) ?? FIBER_TYPES[0];
  const fiberWeightG = weightUnit === "g" ? weightValue : weightValue * GRAMS_PER_OUNCE;

  const plan = useMemo(
    () =>
      calculateMordantPlan({
        fiberWeightG,
        fiberCategory: fiber.category,
        tanninId,
        useCreamOfTartar,
      }),
    [fiberWeightG, fiber.category, tanninId, useCreamOfTartar],
  );

  const alumRange = ALUM_WOF[fiber.category];

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
              data-testid="fiber-weight-input"
            />
            <select
              value={weightUnit}
              onChange={(e) => setWeightUnit(e.target.value as "g" | "oz")}
              className="rounded border border-gray-300 px-2 py-2"
              data-testid="fiber-weight-unit"
            >
              <option value="g">g</option>
              <option value="oz">oz</option>
            </select>
          </div>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Fiber type</span>
          <select
            value={fiberId}
            onChange={(e) => setFiberId(e.target.value)}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            data-testid="fiber-type-select"
          >
            <optgroup label="Protein fibers (no tannin step)">
              {FIBER_TYPES.filter((f) => f.category === "protein").map((f) => (
                <option key={f.id} value={f.id}>
                  {f.label}
                </option>
              ))}
            </optgroup>
            <optgroup label="Cellulose fibers (tannin + soda ash required)">
              {FIBER_TYPES.filter((f) => f.category === "cellulose").map((f) => (
                <option key={f.id} value={f.id}>
                  {f.label}
                </option>
              ))}
            </optgroup>
          </select>
        </label>
      </div>

      {fiber.category === "cellulose" && (
        <label className="mt-4 block">
          <span className="text-sm font-medium text-gray-700">Tannin</span>
          <select
            value={tanninId}
            onChange={(e) => setTanninId(e.target.value as TanninId)}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            data-testid="tannin-select"
          >
            {TANNIN_OPTIONS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label} ({t.wof.default}% WOF typical)
              </option>
            ))}
          </select>
          <span className="mt-1 block text-xs text-gray-500">
            Different tannins need different doses — myrobalan and gallnut extract aren&rsquo;t
            interchangeable at the same percentage.
          </span>
        </label>
      )}

      {fiber.category === "protein" && (
        <label className="mt-4 flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={useCreamOfTartar}
            onChange={(e) => setUseCreamOfTartar(e.target.checked)}
            data-testid="cream-of-tartar-toggle"
          />
          Add cream of tartar ({CREAM_OF_TARTAR_WOF.default}% WOF — assists alum binding and keeps
          fiber softer; may shift the resulting color slightly depending on the dye used)
        </label>
      )}

      <div className="mt-5 rounded border border-gray-100 bg-gray-50 p-4" data-testid="mordant-plan">
        <h3 className="font-semibold text-gray-900">
          Mordant recipe for {weightValue}
          {weightUnit} of {fiber.label.toLowerCase()}
        </h3>
        <ol className="mt-3 space-y-3">
          {plan.steps.map((step, i) => (
            <li key={step.name} data-testid={`plan-step-${i}`}>
              <div className="font-medium text-gray-900">
                {i + 1}. {step.name}
              </div>
              <div className="text-sm text-gray-600">
                {step.grams} g ({step.wofPercent}% WOF)
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-4 border-t border-gray-200 pt-3 text-sm text-gray-600">
          {plan.waterBaths.tannin && (
            <p>
              Tannin bath: {plan.waterBaths.tannin.liters} L water (
              {plan.waterBaths.tannin.literPer100g} L per 100 g fiber)
            </p>
          )}
          <p>
            {fiber.category === "cellulose" ? "Alum + soda ash" : "Alum"} bath:{" "}
            {plan.waterBaths.alum.liters} L water ({plan.waterBaths.alum.literPer100g} L per 100 g
            fiber — more water is fine, it governs even coverage, not dose)
          </p>
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-500">
        Default alum dose is {alumRange.default}% WOF (typical craft-practice range: {alumRange.min}
        –{alumRange.max}% WOF for {fiber.category === "protein" ? "protein" : "cellulose"} fibers).
        This is a dose recipe — temperature and timing (ramp/hold/cure) also matter and aren&rsquo;t
        covered here. See the reference chart for sources and process notes.
      </p>
    </div>
  );
}
