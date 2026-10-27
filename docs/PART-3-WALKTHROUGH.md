# Part 3 — Gift selection → mock cart → order → fulfillment

## Assignment explanation

The Black Bow gifting concierge helps customers select a ready-made gift using recipient, occasion, budget, interests and preferences, or configure a box from individual items. The prototype uses transparent rules and clearly labeled mock products and CAD prices. Chosen products or box components pass into a demo cart, preserving quantities and configuration. A customer then chooses a fictional delivery method and asks the system to validate the cart. Only a valid cart produces an inspectable mock order and fulfillment packing list. Nothing is charged, submitted to Shopify, reserved or dispatched.

For example, selecting a stoneware mug ($22) and herbal tea ($14), plus the mock box and ribbon ($12), creates a $48 gift. The cart preserves the component IDs `mug` and `tea`. The mock order includes a line ID, mock variant ID, quantity, CAD unit price in cents, selection data and subtotal. Its fulfillment record includes the selected fictional delivery method, gift quantity, contents per gift and packaging. Increasing the gift quantity to two produces a $96 subtotal and instructs the mock packing list to prepare two boxes, each containing a mug and tea. Taxes and shipping remain explicitly uncalculated.

The exception scenario simulates a gift becoming unavailable after selection. Validation identifies the affected gift and blocks record creation rather than silently substituting another product. The customer can remove the gift or turn off the simulation to represent restored availability, then retry. Missing delivery information also blocks record creation. The existing finder budget constraint remains demonstrable: a $50 budget yields no ready-made matches instead of showing over-budget gifts.

## Live demonstration (about two minutes)

1. Choose **Build your own**. Select **Stoneware mug** and **Herbal tea**. Confirm **$48** including the mock box and ribbon.
2. Click **Add to demo bag**, then **View bag** (or the bag icon). The selected gift is now a cart line.
3. Click **Validate & create mock order** without choosing delivery. Show the missing-information error and absence of an order record.
4. Select **Fictional studio pickup**. Enable **Simulate first gift becoming unavailable**. Retry. Show the unavailable-gift error: no mock order or packing record is created.
5. Disable the simulation and retry. Show the successful **DEMO-…** mock order, **$48 CAD** subtotal and the fulfillment contents: mug and tea, one box, not dispatched.
6. Expand **Inspect cart → order → fulfillment data** to show the actual JSON snapshot, or download the local mock record.
7. Increase the bag quantity. The old snapshot disappears because it is stale. Validate again to produce **$96** and **2 × Your custom gift box**.

Alternative: complete the guided finder, open a recommendation and add it to the bag. In its order line, `selection` preserves the mock product ID, recipient category, occasion and per-gift budget. This context is illustrative, not personal identifying information. Finder preferences filter candidates before selection; interests and preference answers are not exported.

## Evidence mapping

| Assignment requirement             | Implemented evidence                                                                                  |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Help select a gift                 | Five-step finder, deterministic eligibility/ranking and explanations                                  |
| Help configure a gift              | Item builder with component selections and live total                                                 |
| Show selections passing downstream | Typed `GiftSelection` → `BagItem` → `MockOrder.lines` and `fulfillment.packingList`                   |
| Include an exception               | Unavailable-gift simulator blocks creation and explains recovery                                      |
| Include validation                 | Delivery required; quantity, recognized catalog/configuration, mock price and per-gift budget checked |
| Make the output inspectable        | Human-readable receipt/packing list, expandable JSON and JSON download                                |

## Implementation & boundaries

`lib/orders.ts` is the pure validation/record-generation function. `components/OrderHandoff.tsx` presents the flow inside the bag. Both ready-made and custom gifts supply typed selection metadata when added; different recipient/occasion/budget contexts stay on separate ready-made cart lines. Records are immutable snapshots. Changing bag contents/quantities, delivery or the simulation invalidates the visible snapshot; closing the bag or reloading clears it. Optional gift-note text is deliberately not exported.

Availability is a demonstration toggle, not real Shopify inventory. IDs are mock IDs, not Shopify variant IDs. JSON downloads are local files and leave the user's browser only if they choose to share them. In production, a trusted server would revalidate real variant inventory, bundle components, prices, delivery and eligibility, then use Shopify's cart/checkout and fulfillment integrations. Retries would need idempotency and durable order state. The LLM would never decide stock availability or authorize fulfillment.
