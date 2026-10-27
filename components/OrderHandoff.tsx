"use client";
import { useState } from "react";
import { ArrowRight, Check, Download } from "lucide-react";
import { money } from "@/lib/catalog";
import {
  createMockOrder,
  type BagItem,
  type Delivery,
  type MockOrder,
} from "@/lib/orders";
export function OrderHandoff({ bag }: { bag: BagItem[] }) {
  const [delivery, setDelivery] = useState<Delivery>("");
  const [unavailable, setUnavailable] = useState(false);
  const [attempt, setAttempt] = useState(false);
  const [saved, setSaved] = useState<{
    fingerprint: string;
    order: MockOrder;
  } | null>(null);
  const fingerprint = JSON.stringify({ bag, delivery, unavailable });
  const validation = createMockOrder(
    bag,
    delivery,
    unavailable ? (bag[0]?.key ?? null) : null,
    "preview",
  );
  const record = saved?.fingerprint === fingerprint ? saved.order : null;
  const errors = attempt && !validation.ok ? validation.errors : [];
  function create() {
    setAttempt(true);
    const result = createMockOrder(
      bag,
      delivery,
      unavailable ? (bag[0]?.key ?? null) : null,
      `DEMO-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    );
    if (result.ok) setSaved({ fingerprint, order: result.order });
  }
  function download() {
    if (!record) return;
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(record, null, 2)], { type: "application/json" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = `${record.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <section className="order-handoff" aria-label="Mock order handoff">
      <div className="eyebrow">PART 3 · FROM GIFT TO PACKING LIST</div>
      <h4>A thoughtful choice, ready to hand off.</h4>
      <p>
        Your gift selections flow from this bag into a mock order and a mock
        fulfillment record. Nothing is paid, sent, reserved, or dispatched.
      </p>
      <ol className="handoff-steps" aria-label="Demo workflow">
        <li>01 · Gift selected</li>
        <li>02 · Demo bag</li>
        <li>03 · Validate & record</li>
      </ol>
      <label htmlFor="demo-delivery">Demo delivery method</label>
      <select
        id="demo-delivery"
        value={delivery}
        onChange={(e) => setDelivery(e.target.value as Delivery)}
      >
        <option value="">Choose a demo delivery method</option>
        <option value="demo-pickup">Fictional studio pickup</option>
        <option value="demo-shipping">Ship to a fictional demo address</option>
      </select>
      <div className="exception-control">
        <label>
          <input
            type="checkbox"
            checked={unavailable}
            onChange={(e) => setUnavailable(e.target.checked)}
          />
          <span>Simulate first gift becoming unavailable</span>
        </label>
        <small>
          Try creating the record with this on. Validation will block it; no
          substitution is made silently.
        </small>
      </div>
      {errors.length > 0 && (
        <div className="handoff-errors" role="alert">
          <strong>Let’s fix this before the handoff.</strong>
          <ul>
            {errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      )}
      <button className="button primary full" onClick={create}>
        {record ? "Re-create mock order" : "Validate & create mock order"}
        <ArrowRight size={16} />
      </button>
      {record && (
        <div className="mock-record">
          <div role="status">
            <Check size={18} />
            <strong>Mock order created · {record.id}</strong>
          </div>
          <p>
            {record.lines.reduce((n, l) => n + l.quantity, 0)} gift(s) ·{" "}
            {money(record.subtotalCents / 100)} CAD subtotal
            <br />
            Payment not collected · Tax & shipping not calculated
          </p>
          <h5>Mock fulfillment · not dispatched</h5>
          <p>{record.fulfillment.destination}</p>
          <ul>
            {record.fulfillment.packingList.map((line) => (
              <li key={line.lineId}>
                <strong>
                  {line.giftQuantity} × {line.gift}
                </strong>
                <span>Inside each gift: {line.contentsPerGift.join(", ")}</span>
                <small>{line.packaging}</small>
              </li>
            ))}
          </ul>
          <details>
            <summary>Inspect cart → order → fulfillment data</summary>
            <pre tabIndex={0} aria-label="Mock order and fulfillment JSON">
              {JSON.stringify(record, null, 2)}
            </pre>
          </details>
          <button className="button secondary full" onClick={download}>
            Download mock record JSON <Download size={16} />
          </button>
          <small>
            This snapshot is held in this tab only. Changing the bag, delivery,
            or simulation invalidates it. The download creates a local file; it
            sends nothing to Shopify.
          </small>
        </div>
      )}
    </section>
  );
}
