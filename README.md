# Black Bow — Gift concierge prototype

A standalone, responsive Next.js demo of thoughtful gift discovery. It has **no connection to the production Shopify store**, no payment flow, no real AI service, and no external analytics. All products, contents, availability and CAD prices are **mock**. Artwork is original inline SVG.

## Run

Node.js 22+ (validated with 24.19.0), npm 11.

```sh
npm ci
npm run dev
```

Open the development server on port 3000. For a production demo:

```sh
npm run build
npm run start
```

No environment variables, Shopify credentials, database or third-party service are required. In this cloud environment, use `npm ci --cache /workspace/.npm-cache` if the default home cache is unwritable.

## Try the demo

1. **Find a gift:** choose recipient, occasion, budget, interests and preferences. Review up to three explained matches, open a gift, then add it to the demo bag. A $50 budget demonstrates the honest no-match state.
2. **Build your own:** select items, watch the box total update (including the $12 mock box), and add it to the demo bag. The optional note is not submitted or retained in the bag. Builder selections do not inherit finder preferences.
3. **Gift for a team:** enter 5–1,000 recipients, a per-person budget and one or multiple destinations. Generate a local planning brief, not a quote or request.
4. Open the bag, change quantities and remove gifts. The journey ends with a transparent demo summary; no checkout is simulated as a real order.
5. Read the six-slide presentation at `/presentation`, or [the presentation source](docs/PRESENTATION.md). A [six-page PDF](docs/blackbow-concept.pdf) is included for sharing.

Finder answers and the demo bag exist only in React memory and disappear on reload. Switching pathways resets the unsubmitted builder/corporate form. The recipient field provides context in results; it does not change scoring or infer demographics. Finder exclusion labels are illustrative; they are not ingredient or allergy-safety guarantees.

## Verification

```sh
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Browser tests launch the production server automatically. The cloud machine has `/usr/bin/chromium`; elsewhere install Chromium with `npx playwright install chromium`, or set `CHROMIUM_PATH` to your installed executable. Tests cover desktop and mobile matching, preference exclusions, empty results, dialogs, bag quantities, builder totals, corporate estimates, keyboard tab navigation and automated accessibility scans. Automated checks do not replace a complete assistive-technology audit.

## Storefront research & design

Reviewed the public homepage, story, design-your-own and corporate pages on October 14, 2026 after an initial network block cleared. The concept reflects the store's emphasis on thoughtful connection, premium presentation, occasion-based discovery and custom gifting. Its existing monochrome/neutral design informed the charcoal/cream base; sage is an original concept accent. Public theme CSS references Montserrat and Playfair Display; this demo uses system sans and Georgia instead of copying theme assets.

[Research notes and dated sources](docs/RESEARCH.md) explain the observations and their design implications. The typographic wordmark, copy and SVG artwork are original interpretations, not official approved assets. No logo files, photography, testimonials, product descriptions or theme code were copied. Catalog, prices, inventory, allergies and fulfillment remain unverified mock data despite public storefront access. Obtain merchant-approved assets and structured catalog data before production.

## Deliverables

- [Architecture and Shopify integration](docs/ARCHITECTURE.md)
- [Business presentation, privacy & proposed KPIs](docs/PRESENTATION.md) (also `/presentation`)
- `lib/catalog.ts`: visibly fictional product and builder data
- `lib/recommendations.ts`: deterministic, tested matching rules
- `components/`: reusable gifting pathways and original artwork

Only public storefront research was performed. No authenticated Shopify API/admin access or production changes were made. No secrets are included. No conversion lift is claimed; the presentation proposes an experiment.

## Validated in the prepared cloud machine

Frozen-lockfile installation, production build, TypeScript checks, all 5 rule-engine tests and all 10 desktop/mobile browser tests passed. Accessibility scans covered the finder, results, product dialog, builder, corporate planner and presentation. A 320px viewport had no horizontal overflow, and the final browser session reported no runtime errors. The presentation PDF contains six pages.
