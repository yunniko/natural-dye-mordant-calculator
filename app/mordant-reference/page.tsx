import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mordant Reference Chart (Sourced)",
  description:
    "Sourced WOF% ranges and water bath ratios for alum, soda ash, tannin, cream of tartar, and iron modifier, by fiber type — with citations.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <nav className="mb-6 text-sm">
        <Link href="/" className="text-blue-600 hover:underline">
          ← All tools
        </Link>
      </nav>

      <h1 className="text-3xl font-semibold">Mordant Reference Chart</h1>
      <p className="mt-3 text-gray-600">
        These are craft-practice conventions gathered from fiber-arts educators, not a regulated
        standard — treat every figure below as a well-sourced starting point, not a
        guaranteed-safe universal number. This chart covers <strong>dose only</strong>:
        temperature and timing (how hot, how long, how the fiber is cured afterward) also
        materially affect the result and aren&rsquo;t covered by the calculators on this site.
      </p>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Alum mordant</h2>
        <p className="mt-2 text-gray-600">
          &ldquo;Alum&rdquo; covers two different aluminum salts used in craft practice at
          overlapping but not identical doses — aluminum potassium sulfate (potash alum) and
          aluminum sulfate. They aren&rsquo;t 1:1 substitutes by weight (aluminum sulfate delivers
          more aluminum per gram), but published craft ranges for both overlap enough that one
          default below is a reasonable starting point for either.
        </p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-300 text-left">
                <th className="py-2 pr-4">Fiber category</th>
                <th className="py-2 pr-4">Alum (% WOF)</th>
                <th className="py-2 pr-4">Water bath</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-2 pr-4">Protein (wool, silk, alpaca, mohair)</td>
                <td className="py-2 pr-4">10–20% (12% typical)</td>
                <td className="py-2 pr-4">3–6 L per 100 g fiber</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Cellulose (cotton, linen, hemp, ramie)</td>
                <td className="py-2 pr-4">15–20%, plus 2% soda ash (required)</td>
                <td className="py-2 pr-4">5–7 L per 100 g fiber</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Protein fiber process is temperature-critical (ramp to roughly 90°C for wool, 85°C for
          silk, hold about an hour, then cure damp 24–48h) — not just the dose above.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Soda ash (cellulose alum step — required, not optional)</h2>
        <p className="mt-2 text-gray-600">
          Added alongside alum in the same bath for cellulose fibers. It&rsquo;s what allows
          aluminum to deposit onto tannin-treated cellulose — an alum bath without it fixes
          poorly. Mildly alkaline; dissolve fully in hot water before adding to the mordant bath.
        </p>
        <p className="mt-2 text-sm text-gray-700">
          Dose: <strong>2% WOF</strong>.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Tannin pre-mordant (cellulose fibers only)</h2>
        <p className="mt-2 text-gray-600">
          Applied before the alum + soda-ash step. Cellulose fibers lack the binding sites protein
          fibers have, so skipping this step is possible but the resulting color typically fades
          faster. Different tannins need <strong>materially different doses</strong> — they are not
          interchangeable at one percentage.
        </p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-300 text-left">
                <th className="py-2 pr-4">Tannin</th>
                <th className="py-2 pr-4">Dose (% WOF)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-2 pr-4">Myrobalan</td>
                <td className="py-2 pr-4">15–20%</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Gallnut extract</td>
                <td className="py-2 pr-4">6–8%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Water bath: ~3 L per 100 g fiber (≈30:1). Tannin type also affects color cast — gallic
          tannins (gallnut) read close to colorless, ellagic tannins (myrobalan) read yellow.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Cream of tartar (optional, protein fibers)</h2>
        <p className="mt-2 text-gray-600">
          Added alongside alum for wool or silk. Assists the alum in binding to the fiber and can
          keep it softer. Any color effect is <strong>dye-specific</strong>, not a universal
          brightening — for example it shifts madder toward orange and cochineal toward a brighter
          red. No equivalent step exists for cellulose fibers.
        </p>
        <p className="mt-2 text-sm text-gray-700">
          Typical dose: <strong>5–6% WOF</strong> (6% is the most commonly cited figure).
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Iron modifier (ferrous sulfate, post-dye)</h2>
        <p className="mt-2 text-gray-600">
          Used after dyeing to &ldquo;sadden&rdquo; (darken/mute) a color, not as a primary mordant.
          The cited source uses iron at 2% WOF in its own color samples and states it should{" "}
          <strong>never be used above 4% WOF</strong> — excess iron makes fiber brittle, especially
          wool and silk.
        </p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-300 text-left">
                <th className="py-2 pr-4">Dose</th>
                <th className="py-2 pr-4">Guidance</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-2 pr-4">2% WOF</td>
                <td className="py-2 pr-4">The cited source&rsquo;s own sample dose.</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Above 4% WOF</td>
                <td className="py-2 pr-4">
                  Explicitly not recommended by the cited source — real fiber-damage risk.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Iron powder is harmful if swallowed — wear a dust mask when weighing it, keep it away
          from children and pets, and dispose of the used bath down a municipal or septic drain,
          never into a stream, lake, or other waterway.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Sources</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-600">
          <li>
            naturaldyes.ca (Maiwa) — &ldquo;How to Mordant: Protein Fibres,&rdquo; &ldquo;How to
            Mordant: Cellulose Fibres,&rdquo; &ldquo;Iron,&rdquo; &ldquo;Myrobalan,&rdquo;
            &ldquo;Gallnut,&rdquo; and &ldquo;Mordants&rdquo; — alum/soda-ash/tannin/iron dosing,
            water ratios, and the case against chrome/tin/copper mordants.
          </li>
          <li>
            Botanical Colors — &ldquo;How to Mordant with Aluminum Sulfate,&rdquo; &ldquo;How to
            Mordant with Aluminum Potassium Sulfate,&rdquo; and &ldquo;How To Use Iron
            Powder&rdquo; — alum dose ranges, cream of tartar dose, iron safety/disposal guidance
            (reproduced by Dharma Trading Co.&rsquo;s iron mordant instructions).
          </li>
        </ul>
        <p className="mt-3 text-xs text-gray-500">
          Retrieved 2026-09-14, cross-checked via an independent domain-expert review the same
          day.
        </p>
      </section>

      <div className="mt-8 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        <strong>Safety:</strong> alum, soda ash, tannin, and iron at the doses above are generally
        considered safe for home use with dedicated non-food equipment. Dedicated equipment isn&rsquo;t
        about alum being unsafe (food-grade pickling alum is the same salt) — it&rsquo;s that iron
        and copper residues in a pot are permanent and will tint every future dye bath, and that
        pot metal itself participates in the chemistry (an aluminum pot mordants, an iron pot
        saddens/darkens everything). This chart excludes chrome, tin, and copper mordants, which
        carry real toxicity and disposal concerns and are outside this tool&rsquo;s scope.
      </div>
    </main>
  );
}
