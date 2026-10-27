import { boxItems, products } from "./catalog";
export type GiftSelection =
  | {
      kind: "ready-made";
      productId: string;
      recipient: string;
      occasion: string;
      budget: number;
    }
  | { kind: "custom"; componentIds: string[] };
export type BagItem = {
  key: string;
  name: string;
  price: number;
  quantity: number;
  selection: GiftSelection;
};
export type Delivery = "" | "demo-pickup" | "demo-shipping";
export type MockOrder = {
  schemaVersion: 1;
  demoOnly: true;
  id: string;
  status: "mock-created";
  currency: "CAD";
  lines: {
    lineId: string;
    name: string;
    mockVariantId: string;
    quantity: number;
    unitPriceCents: number;
    selection: GiftSelection;
  }[];
  subtotalCents: number;
  taxAndShipping: "not-calculated";
  payment: "not-collected";
  fulfillment: {
    status: "simulation-only-not-dispatched";
    delivery: Exclude<Delivery, "">;
    destination: string;
    packingList: {
      lineId: string;
      gift: string;
      giftQuantity: number;
      contentsPerGift: string[];
      packaging: string;
    }[];
  };
};
export type OrderResult =
  { ok: false; errors: string[] } | { ok: true; order: MockOrder };
// In-memory simulation only. Production must perform these checks on a trusted backend.
export function createMockOrder(
  bag: BagItem[],
  delivery: Delivery,
  unavailableKey: string | null,
  id: string,
): OrderResult {
  const errors: string[] = [];
  if (!bag.length) errors.push("Add at least one gift to your demo bag.");
  if (!["demo-pickup", "demo-shipping"].includes(delivery))
    errors.push("Choose a demo delivery method before creating the record.");
  const packingList: MockOrder["fulfillment"]["packingList"] = [];
  for (const line of bag) {
    if (
      !Number.isSafeInteger(line.quantity) ||
      line.quantity < 1 ||
      line.quantity > 1000
    )
      errors.push(`${line.name}: choose a quantity between 1 and 1,000.`);
    if (line.key === unavailableKey)
      errors.push(
        `${line.name} is unavailable in this simulation. Turn off the stock simulation or remove this gift, then try again.`,
      );
    let expectedPrice: number | undefined;
    let contents: string[] = [];
    if (line.selection.kind === "ready-made") {
      const productId = line.selection.productId;
      const product = products.find((p) => p.id === productId);
      expectedPrice = product?.price;
      contents = product ? [...product.contains] : [];
      if (
        product &&
        (!Number.isFinite(line.selection.budget) ||
          product.price > line.selection.budget)
      )
        errors.push(`${line.name} exceeds the selected per-gift budget.`);
    } else {
      const ids = line.selection.componentIds;
      const valid =
        ids.length >= 1 &&
        ids.length <= 6 &&
        new Set(ids).size === ids.length &&
        ids.every((id) => boxItems.some((i) => i.id === id));
      if (valid) {
        const chosen = ids.map((id) => boxItems.find((i) => i.id === id)!);
        expectedPrice = 12 + chosen.reduce((n, i) => n + i.price, 0);
        contents = chosen.map((i) => i.name);
      }
    }
    if (expectedPrice === undefined || expectedPrice !== line.price)
      errors.push(
        `${line.name}: the gift configuration or mock price is invalid. Remove it and select it again.`,
      );
    packingList.push({
      lineId: line.key,
      gift: line.name,
      giftQuantity: line.quantity,
      contentsPerGift: contents,
      packaging:
        line.selection.kind === "custom"
          ? "Mock gift box & ribbon ($12 included)"
          : "Mock ready-made packaging included",
    });
  }
  if (errors.length) return { ok: false, errors };
  return {
    ok: true,
    order: {
      schemaVersion: 1,
      demoOnly: true,
      id,
      status: "mock-created",
      currency: "CAD",
      lines: bag.map((line) => ({
        lineId: line.key,
        name: line.name,
        mockVariantId:
          line.selection.kind === "ready-made"
            ? `mock-${line.selection.productId}`
            : `mock-${line.key}`,
        quantity: line.quantity,
        unitPriceCents: Math.round(line.price * 100),
        selection: structuredClone(line.selection),
      })),
      subtotalCents: bag.reduce(
        (n, i) => n + Math.round(i.price * 100) * i.quantity,
        0,
      ),
      taxAndShipping: "not-calculated",
      payment: "not-collected",
      fulfillment: {
        status: "simulation-only-not-dispatched",
        delivery: delivery as Exclude<Delivery, "">,
        destination:
          delivery === "demo-pickup"
            ? "Fictional demo studio pickup"
            : "123 Example Lane, Demo City (fictional; not a real delivery)",
        packingList,
      },
    },
  };
}
