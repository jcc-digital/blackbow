"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Gift,
  Heart,
  Leaf,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  Users,
  X,
  Package,
} from "lucide-react";
import {
  defaultProfile,
  money,
  type Product,
  type Profile,
} from "@/lib/catalog";
import { GiftFinder } from "./GiftFinder";
import { GiftMatches } from "./GiftMatches";
import { BoxBuilder } from "./BoxBuilder";
import { CorporatePlanner } from "./CorporatePlanner";
import { GiftArt } from "./GiftArt";
import { OrderHandoff } from "./OrderHandoff";
import type { BagItem, GiftSelection } from "@/lib/orders";
type Path = "finder" | "builder" | "corporate";

export default function Concierge() {
  const [path, setPath] = useState<Path>("finder");
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [step, setStep] = useState(0);
  const [results, setResults] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [bag, setBag] = useState<BagItem[]>([]);
  const [showBag, setShowBag] = useState(false);
  const [notice, setNotice] = useState("");
  const section = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const firstRender = useRef(true);
  const bagCount = bag.reduce((n, i) => n + i.quantity, 0);
  const bagTotal = bag.reduce((n, i) => n + i.price * i.quantity, 0);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    heading.current?.focus();
  }, [step, results]);
  useEffect(() => {
    if (selected || showBag) dialog.current?.showModal();
    else dialog.current?.close();
  }, [selected, showBag]);
  function go(p: Path) {
    setPath(p);
    section.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }
  function add(
    name: string,
    price: number,
    key: string,
    selection: GiftSelection,
  ) {
    setBag((prev) => {
      const found = prev.find((i) => i.key === key);
      return found
        ? prev.map((i) =>
            i.key === key ? { ...i, quantity: i.quantity + 1 } : i,
          )
        : [...prev, { key, name, price, quantity: 1, selection }];
    });
    setNotice(`${name} added to your demo bag.`);
    setSelected(null);
  }
  function close() {
    setSelected(null);
    setShowBag(false);
  }

  return (
    <>
      <a className="skip-link" href="#concierge">
        Skip to gift finder
      </a>
      <div className="announcement">
        A little thought goes a long way.{" "}
        <span>
          Find their kind of gift <ArrowRight size={13} />
        </span>
      </div>
      <header className="header">
        <a href="#" className="wordmark" aria-label="Black Bow home">
          BLACK BOW<span>GIFT CO.</span>
        </a>
        <nav aria-label="Main navigation">
          <button
            onClick={() => go("finder")}
            className={path === "finder" ? "nav-active" : ""}
          >
            Gift concierge <span className="new-badge">NEW</span>
          </button>
          <button onClick={() => go("builder")}>Build a box</button>
          <button onClick={() => go("corporate")}>Corporate gifting</button>
        </nav>
        <button
          className="bag-button"
          onClick={() => setShowBag(true)}
          aria-label={`Open demo bag, ${bagCount} items`}
        >
          <ShoppingBag size={20} />
          <span className="bag-count">{bagCount}</span>
        </button>
      </header>
      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="line" /> THOUGHTFUL GIFTING, MADE PERSONAL
            </div>
            <h1>
              Not just a gift.
              <br />A <em>“you get me”</em>
              <br />
              kind of feeling.
            </h1>
            <p>
              For the people who mean something to you.
              <br className="desktop" /> Let’s find a gift that says it just
              right.
            </p>
            <button className="button primary" onClick={() => go("finder")}>
              Find their perfect gift <ArrowRight size={18} />
            </button>
            <div className="hero-note">
              <Sparkles size={15} />
              <span>
                A few questions. A little inspiration. Something lovely.
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <span className="hero-orbit" />
            <div className="floating-label">
              <Heart size={16} />
              <span>
                Picked with purpose.
                <br />
                <strong>Given with love.</strong>
              </span>
            </div>
            <GiftArt hero />
            <div className="art-caption">
              <span className="caption-dot" /> GOOD THINGS COME IN THOUGHTFUL
              BOXES
            </div>
            <div className="visual-note">
              Original illustration · concept gift box
            </div>
          </div>
        </section>
        <div className="values-strip">
          <span>
            <Gift size={17} /> Thoughtfully put together
          </span>
          <span>
            <Heart size={17} /> Personal from the very first step
          </span>
          <span>
            <Leaf size={17} /> Less searching. More meaning.
          </span>
        </div>
        <section id="concierge" ref={section} className="concierge-section">
          <div className="section-intro">
            <div>
              <div className="eyebrow">THE GIFT CONCIERGE</div>
              <h2>
                A little guidance.
                <br />
                <em>A lot of thought.</em>
              </h2>
            </div>
            <p>
              You know them best. We’ll help you turn
              <br className="desktop" /> what makes them special into something
              they’ll love.
            </p>
          </div>
          <div
            className="path-tabs"
            role="tablist"
            aria-label="Choose a gifting pathway"
          >
            {(
              [
                {
                  id: "finder",
                  icon: Sparkles,
                  title: "Find a gift",
                  sub: "A match made thoughtful",
                },
                {
                  id: "builder",
                  icon: Package,
                  title: "Build your own",
                  sub: "Every detail, chosen by you",
                },
                {
                  id: "corporate",
                  icon: Users,
                  title: "Gift for a team",
                  sub: "Big gestures, personal touches",
                },
              ] as const
            ).map((p) => (
              <button
                key={p.id}
                role="tab"
                id={`tab-${p.id}`}
                aria-controls={`panel-${p.id}`}
                aria-selected={path === p.id}
                tabIndex={path === p.id ? 0 : -1}
                onKeyDown={(e) => {
                  if (
                    ["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)
                  ) {
                    e.preventDefault();
                    const ids: Path[] = ["finder", "builder", "corporate"];
                    const next =
                      e.key === "Home"
                        ? 0
                        : e.key === "End"
                          ? 2
                          : (ids.indexOf(path) +
                              (e.key === "ArrowRight" ? 1 : 2)) %
                            3;
                    setPath(ids[next]);
                    document.getElementById(`tab-${ids[next]}`)?.focus();
                  }
                }}
                className={path === p.id ? "active" : ""}
                onClick={() => setPath(p.id)}
              >
                <p.icon size={23} />
                <span>
                  <strong>{p.title}</strong>
                  <small>{p.sub}</small>
                </span>
                <ArrowUpRight className="tab-arrow" size={19} />
              </button>
            ))}
          </div>
          <div
            role="tabpanel"
            id={`panel-${path}`}
            aria-labelledby={`tab-${path}`}
            className="path-panel"
          >
            {path === "finder" && !results && (
              <GiftFinder
                {...{ profile, setProfile, step, setStep, setResults, heading }}
              />
            )}
            {path === "finder" && results && (
              <GiftMatches
                profile={profile}
                heading={heading}
                edit={() => {
                  setResults(false);
                  setStep(0);
                }}
                adjustBudget={() => {
                  setResults(false);
                  setStep(2);
                }}
                onSelect={setSelected}
                onBuild={() => go("builder")}
              />
            )}
            {path === "builder" && <BoxBuilder heading={heading} add={add} />}
            {path === "corporate" && <CorporatePlanner heading={heading} />}
          </div>
          <div className="prototype-disclosure">
            <span className="disclosure-dot" /> INDEPENDENT CONCEPT DEMO{" "}
            <span>
              Mock catalog & pricing. Original artwork. No checkout, real AI, or
              connection to Shopify.
            </span>
          </div>
        </section>
        <section className="editorial">
          <div className="editorial-icon">
            <Heart size={34} strokeWidth={1} />
          </div>
          <div className="eyebrow">IT’S THE THOUGHT THAT MAKES IT</div>
          <h2>
            The best gifts say,
            <br />
            <em>“I was thinking of you.”</em>
          </h2>
          <p>
            Not more things. More meaning.
            <br />A little help finding the right way to show it.
          </p>
          <button className="text-button" onClick={() => go("finder")}>
            Let’s find that feeling <ArrowRight size={17} />
          </button>
        </section>
      </main>
      <footer>
        <a href="#" className="wordmark">
          BLACK BOW<span>GIFT CO.</span>
        </a>
        <p>
          An independent gift concierge concept.
          <br />
          Inspired by public storefront research. Original concept artwork.
          <br />
          <Link className="footer-link" href="/presentation">
            View the concept presentation ↗
          </Link>
        </p>
        <span>MADE FOR THOUGHTFUL MOMENTS.</span>
      </footer>
      <div className="sr-only" role="status" aria-live="polite">
        {notice}
      </div>
      {notice && (
        <div className="toast">
          <Check size={16} />
          <span>{notice}</span>
          <button
            onClick={() => {
              setNotice("");
              setShowBag(true);
            }}
          >
            View bag
          </button>
          <button
            aria-label="Dismiss notification"
            onClick={() => setNotice("")}
          >
            <X size={16} />
          </button>
        </div>
      )}
      <dialog
        ref={dialog}
        onCancel={close}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        aria-labelledby="dialog-title"
      >
        <button
          autoFocus
          className="dialog-close"
          aria-label="Close dialog"
          onClick={close}
        >
          <X size={21} />
        </button>
        {selected && (
          <div className="detail">
            <div className="detail-art" style={{ background: selected.color }}>
              <GiftArt variant={selected.art} />
            </div>
            <div className="detail-copy">
              <span className="eyebrow">MOCK PRODUCT · READY-MADE GIFT</span>
              <h3 id="dialog-title">{selected.name}</h3>
              <p>{selected.subtitle}</p>
              <strong className="detail-price">
                {money(selected.price)} CAD
              </strong>
              <h4>A few lovely things inside</h4>
              <ul>
                {selected.contains.map((c) => (
                  <li key={c}>
                    <Check size={14} />
                    {c}
                  </li>
                ))}
              </ul>
              <p className="privacy-note">
                Concept contents, price, and availability are unverified.
                Preferences are illustrative, not allergy or ingredient
                guarantees.
              </p>
              <button
                className="button primary full"
                onClick={() =>
                  add(
                    selected.name,
                    selected.price,
                    `${selected.id}-${profile.recipient}-${profile.occasion}-${profile.budget}`,
                    {
                      kind: "ready-made",
                      productId: selected.id,
                      recipient: profile.recipient,
                      occasion: profile.occasion,
                      budget: profile.budget,
                    },
                  )
                }
              >
                Add to demo bag <ShoppingBag size={17} />
              </button>
            </div>
          </div>
        )}
        {showBag && (
          <div className="bag-panel">
            <span className="eyebrow">A LITTLE THOUGHT, READY TO GIVE</span>
            <h3 id="dialog-title">
              Your demo bag <span>({bagCount})</span>
            </h3>
            {bag.length ? (
              <>
                <ul className="bag-list">
                  {bag.map((i) => (
                    <li key={i.key}>
                      <div className="bag-gift">
                        <Gift size={25} />
                      </div>
                      <div>
                        <strong>{i.name}</strong>
                        <small>{money(i.price)} each · Mock gift</small>
                        <div className="quantity">
                          <button
                            aria-label={`Decrease ${i.name} quantity`}
                            onClick={() =>
                              setBag((prev) =>
                                prev
                                  .map((x) =>
                                    x.key === i.key
                                      ? { ...x, quantity: x.quantity - 1 }
                                      : x,
                                  )
                                  .filter((x) => x.quantity > 0),
                              )
                            }
                          >
                            <Minus size={14} />
                          </button>
                          <span>{i.quantity}</span>
                          <button
                            aria-label={`Increase ${i.name} quantity`}
                            onClick={() =>
                              setBag((prev) =>
                                prev.map((x) =>
                                  x.key === i.key
                                    ? { ...x, quantity: x.quantity + 1 }
                                    : x,
                                ),
                              )
                            }
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      <span>{money(i.price * i.quantity)}</span>
                    </li>
                  ))}
                </ul>
                <div className="box-total">
                  <strong>Demo subtotal</strong>
                  <strong>{money(bagTotal)} CAD</strong>
                </div>
                <OrderHandoff bag={bag} />
                <button className="button primary full" onClick={close}>
                  Keep exploring <ArrowRight size={16} />
                </button>
              </>
            ) : (
              <div className="empty-state">
                <Gift size={40} />
                <h4>A little room for something lovely.</h4>
                <p>
                  Explore your matches or create a box to fill your demo bag.
                </p>
                <button
                  className="button primary"
                  onClick={() => {
                    close();
                    go("finder");
                  }}
                >
                  Find a gift <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
