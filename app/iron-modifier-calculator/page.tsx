import type { Metadata } from "next";
import Link from "next/link";
import { IronModifierTool } from "../_components/iron-modifier-tool";
import { JsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Iron Modifier Calculator (Ferrous Sulfate, by WOF)",
  description:
    "Calculate the ferrous sulfate (iron) dose for saddening/darkening natural-dyed color after dyeing, by weight of fiber (WOF) — with a fiber-damage risk warning above the conservative default range.",
};

const FAQ = [
  {
    question: "What does iron do in natural dyeing?",
    answer:
      "Iron (ferrous sulfate) is used as a modifier after dyeing to \"sadden\" a color — shifting a bright, clear shade toward a deeper, more muted or greyed tone. It's applied at a much lower dose than a primary mordant like alum.",
  },
  {
    question: "Why is there a risk warning?",
    answer:
      "Excess iron makes fiber brittle over time — wool and silk are especially prone to feeling rough or weakening after a heavy iron treatment. This calculator defaults to a conservative 2% WOF and flags doses above 4% WOF as caution and above 10% WOF as high-risk, based on craft-practice sources that converge on that range for routine use.",
  },
  {
    question: "Is a higher dose ever appropriate?",
    answer:
      "Some specialized techniques — particularly certain cellulose eco-printing methods — use iron at higher doses. That trade-off (stronger color shift for more fiber-damage risk) is a deliberate choice for an experienced dyer to make, not this tool's default.",
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

      <h1 className="text-3xl font-semibold">Iron Modifier Calculator</h1>
      <p className="mt-3 text-gray-600">
        Ferrous sulfate dose for saddening/darkening dyed color, by weight of fiber (WOF) — with a
        fiber-damage risk warning as the dose climbs.
      </p>

      <div className="mt-6">
        <IronModifierTool />
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Mordanting before dyeing?{" "}
        <Link href="/mordant-calculator" className="underline">
          Calculate your alum and tannin dose
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
