import Link from "next/link";
export const metadata = {
  title: "Black Bow • Gift concierge concept presentation",
};
const slides = [
  {
    tag: "THE OPPORTUNITY",
    title: "Less searching. More meaning.",
    body: "Gift buyers know the person. They don’t always know where to start. A thoughtful concierge turns a moment of uncertainty into a smaller, relevant selection.",
    points: [
      "Guide customers from intent to discovery.",
      "Explain the fit, so people can choose confidently.",
      "Test the business impact. Don’t assume it.",
    ],
  },
  {
    tag: "THE EXPERIENCE",
    title: "Three ways to say “I thought of you.”",
    body: "A mobile-first journey from gift selection to a validated mock order and packing record.",
    points: [
      "Find a gift: five steps, explained matches, honest constraints.",
      "Build your own: components and quantities pass into inspectable mock order/fulfillment JSON.",
      "Gift for a team: a practical brief for a future assisted quote.",
    ],
  },
  {
    tag: "THE INTELLIGENCE",
    title: "Clear rules today. Grounded AI tomorrow.",
    body: "This demo uses mock CAD prices and a deterministic engine. No real AI service is connected.",
    points: [
      "Budget and preferences are hard filters. Interest and occasion tags rank eligible gifts.",
      "An LLM could interpret intent or explain verified catalog matches.",
      "Simulate an unavailable gift or missing delivery: block creation, explain the fix, then retry.",
    ],
  },
  {
    tag: "THE SHOPIFY PATH",
    title: "Start small. Keep checkout familiar.",
    body: "Pilot through a theme app extension with a reusable React concierge and the merchant’s existing checkout.",
    points: [
      "Storefront API: verified products, variants, price and inventory.",
      "Cart API: real variants handed off to Shopify’s secure checkout.",
      "Backend app/app proxy: optional LLM, catalog sync and corporate intake. Headless is a broader alternative.",
    ],
  },
  {
    tag: "THE TRUST",
    title: "Personal doesn’t need to be intrusive.",
    body: "This prototype sends no answers to a service. It has no cookies, contact capture or analytics; state disappears on reload.",
    points: [
      "Minimize prompts and apply appropriate consent and vendor retention terms.",
      "Keep addresses in secure checkout/intake. Never send recipient spreadsheets to an LLM.",
      "Exclusion labels need verified metadata. They are not allergy-safety guarantees.",
    ],
  },
  {
    tag: "THE MEASUREMENT",
    title: "Earn the next phase with evidence.",
    body: "Compare the concierge with existing browsing in a randomized pilot. Establish baselines and sample-size criteria before setting targets.",
    points: [
      "Primary: purchase conversion. Supporting: finder completion, recommendation add-to-cart and average order value.",
      "Corporate: qualified briefs. Guardrails: performance, accessibility, no-match rate and returns.",
      "Next: verify branding/catalog, build in a development store, review privacy/accessibility, then experiment.",
    ],
  },
];
export default function Presentation() {
  return (
    <main className="presentation">
      <header className="deck-header">
        <Link href="/" className="wordmark">
          BLACK BOW<span>GIFT CO.</span>
        </Link>
        <Link href="/" className="button secondary">
          Explore the demo ↗
        </Link>
      </header>
      <div className="deck-lead">
        <span className="eyebrow">GIFT CONCIERGE · CONCEPT PRESENTATION</span>
        <h1>
          A little thought.
          <br />
          <em>A better gifting journey.</em>
        </h1>
        <p>An independent prototype. Mock catalog. No production changes.</p>
      </div>
      {slides.map((s, i) => (
        <section className="deck-slide" key={s.tag}>
          <span className="deck-number">0{i + 1} / 06</span>
          <div className="eyebrow">{s.tag}</div>
          <h2>{s.title}</h2>
          <p>{s.body}</p>
          <ul>
            {s.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>
      ))}
      <div className="deck-note">
        Informed by read-only research of Black Bow’s public homepage, story,
        design-your-own and corporate pages. Original design and artwork;
        merchant approval and verified catalog integration are still required.
        Business improvements are hypotheses, not measured results. Full
        sources, KPI definitions and implementation details are in the
        repository documentation.
      </div>
    </main>
  );
}
