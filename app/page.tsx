import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Natural Dye Mordant Calculator",
  description:
    "Free mordant and iron-modifier calculators for natural fiber dyeing, by weight of fiber (WOF) — alum and tannin doses for protein and cellulose fibers, plus a sourced reference chart. No signup, no upload.",
};

const TOOLS = [
  {
    href: "/mordant-calculator",
    title: "Mordant calculator (alum + tannin)",
    description:
      "Enter your fiber weight and type to get the alum dose, the required tannin + soda-ash pre-mordant steps for cellulose fibers, and water bath volumes.",
  },
  {
    href: "/iron-modifier-calculator",
    title: "Iron modifier calculator",
    description:
      "Calculate the ferrous sulfate dose for saddening/darkening color after dyeing, with a fiber-damage risk warning above the conservative default.",
  },
  {
    href: "/mordant-reference",
    title: "Mordant reference chart",
    description: "Sourced WOF% ranges and water ratios by fiber type and mordant, with citations.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-semibold">Natural Dye Mordant Calculator</h1>
      <p className="mt-3 text-gray-600">
        Free calculators for mordanting fiber before natural dyeing — alum, tannin, and iron doses
        by weight of fiber (WOF), for both protein fibers (wool, silk) and cellulose fibers (cotton,
        linen). Runs entirely in your browser.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            data-testid={`tool-card-${tool.href.slice(1)}`}
            className="rounded-lg border border-gray-200 p-5 hover:border-gray-400"
          >
            <h2 className="font-semibold text-blue-700">{tool.title}</h2>
            <p className="mt-1 text-sm text-gray-600">{tool.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
