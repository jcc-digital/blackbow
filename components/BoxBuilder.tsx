"use client";
import { useState, type RefObject } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  Coffee,
  Gift,
  Leaf,
  Package,
  Plus,
  Sparkles,
} from "lucide-react";
import { boxItems, money } from "@/lib/catalog";
import { GiftArt } from "./GiftArt";
export function BoxBuilder({
  heading,
  add,
}: {
  heading: RefObject<HTMLHeadingElement | null>;
  add: (name: string, price: number, key: string) => void;
}) {
  const [items, setItems] = useState<string[]>([]);
  const [card, setCard] = useState("");
  const total = items.reduce(
    (sum, id) => sum + (boxItems.find((i) => i.id === id)?.price ?? 0),
    12,
  );
  return (
    <div className="builder">
      <div>
        <div className="eyebrow">A BOX THAT’S ALL THEM</div>
        <h3 ref={heading} tabIndex={-1}>
          You know the little things.
        </h3>
        <p className="field-description">
          Choose up to six items. We’ll add the ribbon.
          <br />
          All items and prices are mock. Builder choices are independent of
          finder preferences.
        </p>
        <div className="builder-grid">
          {boxItems.map((item, i) => (
            <button
              className={`builder-item ${items.includes(item.id) ? "selected" : ""}`}
              key={item.id}
              aria-pressed={items.includes(item.id)}
              onClick={() =>
                setItems((prev) =>
                  prev.includes(item.id)
                    ? prev.filter((x) => x !== item.id)
                    : [...prev, item.id],
                )
              }
            >
              <span className={`item-illustration item-${i}`}>
                <span>
                  {
                    [
                      <Coffee key="a" size={40} />,
                      <Leaf key="b" size={40} />,
                      <BookOpen key="c" size={40} />,
                      <Package key="d" size={40} />,
                      <Sparkles key="e" size={40} />,
                      <Gift key="f" size={40} />,
                    ][i]
                  }
                </span>
                <span className="item-toggle">
                  {items.includes(item.id) ? (
                    <Check size={14} />
                  ) : (
                    <Plus size={14} />
                  )}
                </span>
              </span>
              <strong>{item.name}</strong>
              <span>
                {money(item.price)} <small>· Mock item</small>
              </span>
            </button>
          ))}
        </div>
      </div>
      <aside className="box-summary">
        <span className="eyebrow">YOUR THOUGHTFUL LITTLE BOX</span>
        <div className="mini-box">
          <GiftArt variant="morning" />
        </div>
        <h4>Made by you. For them.</h4>
        <p>
          {items.length
            ? `${items.length} thoughtful ${items.length === 1 ? "detail" : "details"}, and counting.`
            : "Your next lovely gesture starts here."}
        </p>
        <ul>
          <li>
            <span>Gift box & ribbon</span>
            <span>{money(12)}</span>
          </li>
          {items.map((id) => {
            const i = boxItems.find((x) => x.id === id)!;
            return (
              <li key={id}>
                <span>{i.name}</span>
                <span>{money(i.price)}</span>
              </li>
            );
          })}
        </ul>
        <label htmlFor="card">
          A little note <span>(optional)</span>
        </label>
        <textarea
          id="card"
          maxLength={180}
          value={card}
          onChange={(e) => setCard(e.target.value)}
          placeholder="Something from the heart…"
        />
        <small>Demo only. Please don’t enter personal information.</small>
        <div className="box-total">
          <strong>Box total</strong>
          <strong>{money(total)}</strong>
        </div>
        <button
          className="button primary full"
          disabled={!items.length}
          onClick={() =>
            add(
              "Your custom gift box",
              total,
              `custom-${[...items].sort().join("-")}`,
            )
          }
        >
          Add to demo bag <ArrowRight size={16} />
        </button>
        <small>
          Mock CAD prices. Tax & shipping not calculated. Notes are not
          submitted or stored.
        </small>
      </aside>
    </div>
  );
}
