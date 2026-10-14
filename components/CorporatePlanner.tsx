"use client";
import { useState, type RefObject } from "react";
import { ArrowRight, Check } from "lucide-react";
import { money } from "@/lib/catalog";
import { GiftArt } from "./GiftArt";
export function CorporatePlanner({
  heading,
}: {
  heading: RefObject<HTMLHeadingElement | null>;
}) {
  const [count, setCount] = useState(25);
  const [corporateBudget, setCorporateBudget] = useState(100);
  const [delivery, setDelivery] = useState("One location");
  const [plan, setPlan] = useState(false);
  return (
    <div className="corporate">
      <div className="corporate-story">
        <span className="eyebrow">THOUGHTFUL AT EVERY SCALE</span>
        <h3 ref={heading} tabIndex={-1}>
          Many people.
          <br />
          <em>One lovely gesture.</em>
        </h3>
        <p>
          Welcome a team. Thank a client. Celebrate the people behind the work.
        </p>
        <div className="corporate-benefits">
          <span>
            <Check size={17} /> A cohesive gift, with a personal touch
          </span>
          <span>
            <Check size={17} /> One address or many destinations
          </span>
          <span>
            <Check size={17} /> A simple starting point for your brief
          </span>
        </div>
        <GiftArt variant="host" />
      </div>
      <form
        className="corporate-form"
        onSubmit={(e) => {
          e.preventDefault();
          setPlan(true);
        }}
      >
        <div className="small-label">YOUR GIFTING BRIEF</div>
        <h4>Let’s think a little bigger.</h4>
        <p>A planning tool, not a quote or order.</p>
        <label htmlFor="count">How many recipients?</label>
        <input
          id="count"
          type="number"
          min="5"
          max="1000"
          required
          value={count}
          onChange={(e) => {
            setCount(Number(e.target.value));
            setPlan(false);
          }}
        />
        <label htmlFor="corp-budget">Budget per person · CAD</label>
        <select
          id="corp-budget"
          value={corporateBudget}
          onChange={(e) => {
            setCorporateBudget(Number(e.target.value));
            setPlan(false);
          }}
        >
          {[50, 75, 100, 150, 200].map((b) => (
            <option key={b} value={b}>
              {money(b)}
            </option>
          ))}
        </select>
        <label htmlFor="delivery">Where are the gifts going?</label>
        <select
          id="delivery"
          value={delivery}
          onChange={(e) => {
            setDelivery(e.target.value);
            setPlan(false);
          }}
        >
          <option>One location</option>
          <option>Multiple recipients & addresses</option>
        </select>
        <button className="button primary full" type="submit">
          Create my demo brief <ArrowRight size={16} />
        </button>
        {plan && (
          <div className="brief-result" role="status">
            <strong>Your starting point, beautifully simple.</strong>
            <p>
              {count} recipients · {money(corporateBudget)} per person
              <br />
              {delivery}
            </p>
            <div>
              <span>Gift budget estimate</span>
              <strong>{money(count * corporateBudget)}</strong>
            </div>
            <small>
              Planning estimate only. Excludes tax, shipping, custom branding,
              and volume discounts. No addresses collected, no request sent. A
              production flow would hand this brief to the gifting team for a
              verified quote.
            </small>
          </div>
        )}
        <div className="privacy-note">
          No contact information required. This brief stays in your browser tab.
        </div>
      </form>
    </div>
  );
}
