import type { Metadata } from "next";
import Link from "next/link";
import { MordantCalculatorTool } from "../_components/mordant-calculator-tool";
import { JsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Mordant Calculator (Alum + Tannin, by WOF)",
  description:
    "Enter your fiber weight and fiber type to get the alum dose, tannin pre-mordant step (for cellulose fibers), and water bath volumes for natural dyeing — by weight of fiber (WOF).",
};

const FAQ = [
  {
    question: "What does WOF mean?",
    answer:
      "Weight of fiber — the dry weight of the yarn or fabric you're mordanting, before it gets wet. Mordant and modifier amounts are conventionally given as a percentage of this dry weight, not the wet weight.",
  },
  {
    question: "Why does cotton need a tannin step that wool doesn't?",
    answer:
      "Protein fibers (wool, silk, alpaca, mohair) have amino-acid binding sites that bond well with aluminum directly. Cellulose fibers (cotton, linen, hemp, ramie) lack those sites, so a tannin pre-mordant is used first to give the fiber something for the alum to bond to — skipping it is possible but typically fades faster.",
  },
  {
    question: "Do I have to use cream of tartar?",
    answer:
      "No — it's an optional helper for protein fibers that some dyers use to assist alum binding and keep wool or silk softer. Any color effect is dye-specific (it shifts some dyes' hue, it doesn't universally brighten), and it has no equivalent for cellulose fibers.",
  },
  {
    question: "Why does the cellulose recipe include soda ash?",
    answer:
      "Soda ash isn't optional for the cellulose alum step — it's what allows aluminum to deposit onto tannin-treated cellulose fiber. An alum bath without it fixes poorly.",
  },
  {
    question: "Where do these percentages come from?",
    answer:
      "See the sourced reference chart for citations. This tool covers dose only — temperature and timing (how hot, how long, how the fiber cures afterward) also affect the real-world result and aren't covered here.",
  },
];

export default function Page() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />

      <nav className="mb-6 text-sm">
        <Link href="/" className="text-blue-600 hover:underline">
          ← All tools
        </Link>
      </nav>

      <h1 className="text-3xl font-semibold">Mordant Calculator</h1>
      <p className="mt-3 text-gray-600">
        Alum and tannin doses by weight of fiber (WOF), plus the water bath volume for each step.
        Cellulose fibers automatically get the tannin pre-mordant step; protein fibers don&rsquo;t
        need it.
      </p>

      <div className="mt-6">
        <MordantCalculatorTool />
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Dyeing with iron afterward?{" "}
        <Link href="/iron-modifier-calculator" className="underline">
          Calculate the iron modifier dose
        </Link>
        .
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Frequently asked questions</h2>
        <dl className="mt-3 space-y-4">
          {FAQ.map((item) => (
            <div key={item.question}>
              <dt className="font-medium text-gray-900">{item.question}</dt>
              <dd className="mt-1 text-gray-600">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
