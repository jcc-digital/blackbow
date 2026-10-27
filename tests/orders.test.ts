import { test } from "node:test";
import assert from "node:assert/strict";
import { createMockOrder, type BagItem } from "../lib/orders";
const custom: BagItem = {
  key: "custom-mug-tea",
  name: "Your custom gift box",
  price: 48,
  quantity: 2,
  selection: { kind: "custom", componentIds: ["mug", "tea"] },
};
const ready: BagItem = {
  key: "quiet",
  name: "A Quiet Moment",
  price: 85,
  quantity: 1,
  selection: {
    kind: "ready-made",
    productId: "quiet",
    recipient: "A friend",
    occasion: "Birthday",
    budget: 100,
  },
};
test("custom configuration passes unchanged to order and quantity-aware packing list", () => {
  const result = createMockOrder([custom], "demo-pickup", null, "DEMO-TEST");
  assert.ok(result.ok);
  assert.equal(result.order.subtotalCents, 9600);
  assert.equal(result.order.lines[0].unitPriceCents, 4800);
  assert.deepEqual(result.order.lines[0].selection, custom.selection);
  assert.deepEqual(result.order.fulfillment.packingList[0].contentsPerGift, [
    "Stoneware mug",
    "Herbal tea",
  ]);
  assert.equal(result.order.fulfillment.packingList[0].giftQuantity, 2);
  assert.equal(result.order.payment, "not-collected");
  assert.equal(
    result.order.fulfillment.status,
    "simulation-only-not-dispatched",
  );
});
test("ready-made context and mock IDs are inspectable and snapshots cannot mutate the bag", () => {
  const bag = structuredClone([ready]);
  const result = createMockOrder(bag, "demo-shipping", null, "DEMO-TEST");
  assert.ok(result.ok);
  assert.equal(result.order.lines[0].mockVariantId, "mock-quiet");
  assert.deepEqual(result.order.lines[0].selection, ready.selection);
  if (bag[0].selection.kind === "ready-made")
    bag[0].selection.occasion = "Thank you";
  assert.deepEqual(result.order.lines[0].selection, ready.selection);
});
test("missing delivery and unavailable gifts block creation; fixing both succeeds", () => {
  const missing = createMockOrder([custom], "", null, "DEMO-TEST");
  assert.ok(!missing.ok);
  assert.match(missing.errors.join(" "), /delivery method/);
  const blocked = createMockOrder(
    [custom],
    "demo-pickup",
    custom.key,
    "DEMO-TEST",
  );
  assert.ok(!blocked.ok);
  assert.match(blocked.errors.join(" "), /unavailable/);
  assert.ok(!("order" in blocked));
  assert.ok(createMockOrder([custom], "demo-pickup", null, "DEMO-TEST").ok);
});
test("rejects empty bags, unknown components, duplicate items, invalid price and quantity", () => {
  for (const bag of [
    [],
    [{ ...custom, quantity: 0 }],
    [{ ...custom, quantity: 1.5 }],
    [{ ...custom, price: 1 }],
    [
      {
        ...custom,
        selection: { kind: "custom" as const, componentIds: ["unknown"] },
      },
    ],
    [
      {
        ...custom,
        selection: { kind: "custom" as const, componentIds: ["mug", "mug"] },
      },
    ],
  ])
    assert.equal(
      createMockOrder(bag, "demo-pickup", null, "DEMO-TEST").ok,
      false,
    );
});
test("ready-made unit price cannot exceed saved per-gift budget", () => {
  const line = {
    ...ready,
    selection: {
      ...ready.selection,
      kind: "ready-made" as const,
      productId: "quiet",
      recipient: "A friend",
      occasion: "Birthday",
      budget: 50,
    },
  };
  const result = createMockOrder([line], "demo-pickup", null, "DEMO-TEST");
  assert.ok(!result.ok);
  assert.match(result.errors.join(" "), /budget/);
});
