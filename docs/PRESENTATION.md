# Black Bow — a little thought, a better gifting journey

## 1. Turn “where do I start?” into a thoughtful first step

Gift buyers know the person but may not know the product. A guided concierge turns recipient, occasion, budget, interests and preferences into a smaller, explained selection. The business hypothesis: less decision friction and more relevant product discovery can improve purchase confidence. This prototype demonstrates the journey; it does not establish a conversion lift.

## 2. Three pathways, one gifting experience

- **Find a gift:** five quick steps, hard budget/preference filters, explained matches and an honest no-match state.
- **Build your own:** choose the details, see a transparent total and add a custom box to a demo bag.
- **Gift for a team:** plan quantities, budgets and one or multiple destinations; create a brief for a future human-assisted quote.

Demo sequence: complete a birthday finder and inspect a match; create a mug-and-tea box ($48 mock CAD) and add it to the bag. Choose fictional delivery, simulate unavailability to block the handoff, then resolve it and inspect the mock order/packing JSON. A corporate example is 40 people at $75 each ($3,000 before tax/shipping). See PART-3-WALKTHROUGH.md.

## 3. Thoughtful rules today. Grounded AI tomorrow.

All products and prices are mock. No real AI service is used. Deterministic rules exclude incompatible gifts, rank approved tags and explain matches. Production could use an LLM to interpret intent or phrase explanations, grounded in a verified Shopify catalog. Hard constraints remain outside the model; invalid output or outages fall back to rules. Value comes from better discovery, not an AI badge.

## 4. Meet Shopify where the business is

Recommended pilot: a theme app extension with a reusable React finder. Keep the existing Shopify storefront and secure checkout. Storefront API provides verified variants, prices and stock; Cart API hands off to Shopify checkout. A backend app/app proxy handles catalog normalization, optional LLM calls and corporate intake. Headless Next.js/Hydrogen is an alternative for a larger storefront project. Custom gift bundles require inventory and packaging rules agreed with the merchant.

## 5. Personal, without being intrusive

This demo collects no contact data and sends no answers to a service. State disappears on reload. Production should minimize prompts, use consent where applicable, keep customer addresses in secure checkout/intake, and never send corporate recipient spreadsheets to an LLM. Define vendor retention, deletion, access controls and region requirements. Exclusion preferences are not medical or allergy guarantees. Keep a human path for complex gifting requests.

## 6. Measure the outcome, then earn the next phase

| Proposed KPI               | Definition                                                        | Purpose                              |
| -------------------------- | ----------------------------------------------------------------- | ------------------------------------ |
| Finder completion          | Results viewed / finder starts                                    | Detect friction by step and device   |
| Product discovery          | Distinct eligible product views per session                       | Assess broader catalog discovery     |
| Recommendation add-to-cart | Sessions adding a recommended gift / results sessions             | Measure relevance and confidence     |
| Purchase conversion        | Completed orders / eligible experiment sessions                   | Primary business outcome             |
| Average order value        | Net merchandise revenue / orders                                  | Check basket value, alongside margin |
| Corporate qualified briefs | Sales-qualified submitted briefs / corporate starts               | Assess real demand, not form clicks  |
| Guardrails                 | Page speed, errors, accessibility, no-match rate, refunds/returns | Avoid trading experience for clicks  |

Run a randomized holdout against existing browsing, stratify mobile/desktop, predefine sample size and decision criteria with an analyst, and account for seasonality and attribution. Do not invent targets before measuring baseline. Proposed events: `finder_started`, `finder_step_completed`, `results_viewed`, `recommendation_opened`, `recommended_gift_added`, `custom_box_added`, `corporate_brief_submitted` and checkout/order events joined through Shopify analytics. Demo brief generation is not a submitted or qualified lead. Exclude personal answers and free text from analytics.

Next: verify storefront brand and catalog → merchant-approved development-store pilot → accessibility/privacy review → measured experiment. Public homepage, story, builder and corporate pages were reviewed read-only; see RESEARCH.md. The design is an original interpretation requiring merchant approval. No authenticated Shopify API/admin access or production changes occurred.
