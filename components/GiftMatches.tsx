"use client";
import {
  ArrowRight,
  ArrowUpRight,
  Gift,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { money, type Product, type Profile } from "@/lib/catalog";
import { recommend } from "@/lib/recommendations";
import { GiftArt } from "./GiftArt";
import type { RefObject } from "react";
type Props = {
  profile: Profile;
  heading: RefObject<HTMLHeadingElement | null>;
  edit: () => void;
  adjustBudget: () => void;
  onSelect: (p: Product) => void;
  onBuild: () => void;
};
export function GiftMatches({
  profile,
  heading,
  edit,
  adjustBudget,
  onSelect,
  onBuild,
}: Props) {
  return (
    <div className="results">
      <div className="results-header">
        <div>
          <div className="eyebrow">A LITTLE THOUGHT, BEAUTIFULLY MATCHED</div>
          <h3 ref={heading} tabIndex={-1}>
            Their kind of <em>lovely.</em>
          </h3>
          <p>
            For {profile.recipient.toLowerCase()} · {profile.occasion} · up to{" "}
            {money(profile.budget)}
          </p>
        </div>
        <button className="text-button" onClick={edit}>
          <SlidersHorizontal size={16} /> Edit my answers
        </button>
      </div>
      <div className="demo-note">
        <Sparkles size={16} /> Transparent rule-based matches · Mock products &
        CAD prices · No AI service
      </div>
      {recommend(profile).length ? (
        <div className="product-grid">
          {recommend(profile).map(({ product, reasons }, i) => (
            <article key={product.id} className="product-card">
              <button
                className="product-art"
                style={{ background: product.color }}
                onClick={() => onSelect(product)}
                aria-label={`View ${product.name}`}
              >
                <span className="product-label">
                  {i === 0 ? "TOP MATCH" : "THOUGHTFUL PICK"}
                </span>
                <GiftArt variant={product.art} />
                <span className="mock-tag">CONCEPT GIFT</span>
              </button>
              <div className="product-heading">
                <h4>{product.name}</h4>
                <span>{money(product.price)}</span>
              </div>
              <p>{product.subtitle}</p>
              <div className="match-reasons">
                <span>
                  <Sparkles size={13} /> WHY IT FITS
                </span>
                <ul>
                  {reasons.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
              <button
                className="button secondary full"
                onClick={() => onSelect(product)}
              >
                Explore this gift <ArrowUpRight size={16} />
              </button>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Gift size={40} />
          <h4>A little too specific for our small demo catalog.</h4>
          <p>
            No boxes meet your budget and preferences. Keep your preferences and
            try a higher budget, or build a box with individual items.
          </p>
          <button className="button primary" onClick={adjustBudget}>
            Adjust budget <ArrowRight size={16} />
          </button>
        </div>
      )}
      <div className="results-bottom">
        <span>Have something more personal in mind?</span>
        <button className="text-button" onClick={onBuild}>
          Build it, piece by piece <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
