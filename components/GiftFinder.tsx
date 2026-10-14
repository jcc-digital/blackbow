"use client";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  Coffee,
  Gift,
  Heart,
  Leaf,
  Plus,
  SlidersHorizontal,
  Sparkles,
  Users,
} from "lucide-react";
import { interests, money, preferences, type Profile } from "@/lib/catalog";
import type { Dispatch, RefObject, SetStateAction } from "react";
const steps = ["Recipient", "Occasion", "Budget", "Interests", "Preferences"];
const recipients = [
  "A friend",
  "My partner",
  "Family",
  "A colleague",
  "Myself",
];
const occasions = [
  "Birthday",
  "Thank you",
  "Housewarming",
  "Milestone",
  "Just because",
];
type Props = {
  profile: Profile;
  setProfile: Dispatch<SetStateAction<Profile>>;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  setResults: Dispatch<SetStateAction<boolean>>;
  heading: RefObject<HTMLHeadingElement | null>;
};
export function GiftFinder({
  profile,
  setProfile,
  step,
  setStep,
  setResults,
  heading,
}: Props) {
  function toggle(field: "interests" | "preferences", value: string) {
    setProfile((prev) => ({
      ...prev,
      [field]: prev[field].includes(value as never)
        ? prev[field].filter((x) => x !== value)
        : [...prev[field], value],
    }));
  }
  return (
    <div className="finder">
      <aside className="finder-aside">
        <span className="small-label">LET’S MAKE IT PERSONAL</span>
        <h3>
          A good gift starts
          <br />
          with <em>who.</em>
        </h3>
        <p>
          No endless scrolling.
          <br />
          Just a few thoughtful details.
        </p>
        <div className="step-list">
          {steps.map((s, i) => (
            <button
              key={s}
              onClick={() => i < step && setStep(i)}
              disabled={i > step}
              className={i === step ? "current" : i < step ? "complete" : ""}
              aria-current={i === step ? "step" : undefined}
            >
              <span>
                {i < step ? (
                  <Check size={12} />
                ) : (
                  String(i + 1).padStart(2, "0")
                )}
              </span>
              {s}
            </button>
          ))}
        </div>
        <div className="aside-footer">
          <Leaf size={15} /> Thoughtfulness looks good on you.
        </div>
      </aside>
      <div className="finder-main">
        <div className="progress-meta">
          <span>STEP {step + 1} OF 5</span>
          <span>About a minute, all yours.</span>
        </div>
        <div className="progress-track">
          <span style={{ width: `${(step + 1) * 20}%` }} />
        </div>
        <h3 ref={heading} tabIndex={-1}>
          {
            [
              "Who are we celebrating?",
              "What’s the occasion?",
              "What feels right for your budget?",
              "What brings them joy?",
              "Any little details to keep in mind?",
            ][step]
          }
        </h3>
        <p className="field-description">
          {
            [
              "Someone close, someone new, or a little something for you.",
              "The reason behind the ribbon.",
              "All demo prices are in Canadian dollars. Before tax and shipping.",
              "Choose a few things they love. Or leave it open to inspiration.",
              "We’ll exclude gifts that don’t fit. Select any, or skip this step.",
            ][step]
          }
        </p>
        {step === 0 && (
          <div className="choice-grid">
            {recipients.map((r, i) => (
              <button
                key={r}
                className={`choice ${profile.recipient === r ? "selected" : ""}`}
                aria-pressed={profile.recipient === r}
                onClick={() => setProfile({ ...profile, recipient: r })}
              >
                <span className="choice-icon">
                  {
                    [
                      <Heart key="a" />,
                      <Sparkles key="b" />,
                      <Users key="c" />,
                      <Coffee key="d" />,
                      <Gift key="e" />,
                    ][i]
                  }
                </span>
                {r}
                <span className="choice-check">
                  {profile.recipient === r ? (
                    <Check size={14} />
                  ) : (
                    <Plus size={14} />
                  )}
                </span>
              </button>
            ))}
          </div>
        )}
        {step === 1 && (
          <div className="choice-grid">
            {occasions.map((r) => (
              <button
                key={r}
                className={`choice ${profile.occasion === r ? "selected" : ""}`}
                aria-pressed={profile.occasion === r}
                onClick={() => setProfile({ ...profile, occasion: r })}
              >
                {r}
                <span className="choice-check">
                  {profile.occasion === r ? (
                    <Check size={14} />
                  ) : (
                    <Plus size={14} />
                  )}
                </span>
              </button>
            ))}
          </div>
        )}
        {step === 2 && (
          <div className="budget-options">
            {[50, 75, 100, 150, 200].map((b) => (
              <button
                key={b}
                aria-pressed={profile.budget === b}
                className={`budget-choice ${profile.budget === b ? "selected" : ""}`}
                onClick={() => setProfile({ ...profile, budget: b })}
              >
                Up to {money(b)}
              </button>
            ))}
            <div className="budget-context">
              <SlidersHorizontal size={18} />
              <span>
                A thoughtful gift doesn’t need a big budget.
                <br />
                We’ll only show boxes within your limit.
              </span>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="choice-grid">
            {interests.map((r) => (
              <button
                key={r}
                aria-pressed={profile.interests.includes(r)}
                className={`choice ${profile.interests.includes(r) ? "selected" : ""}`}
                onClick={() => toggle("interests", r)}
              >
                {r}
                <span className="choice-check">
                  {profile.interests.includes(r) ? (
                    <Check size={14} />
                  ) : (
                    <Plus size={14} />
                  )}
                </span>
              </button>
            ))}
          </div>
        )}
        {step === 4 && (
          <div className="preferences">
            <div className="choice-grid">
              {preferences.map((r) => (
                <button
                  key={r}
                  aria-pressed={profile.preferences.includes(r)}
                  className={`choice ${profile.preferences.includes(r) ? "selected" : ""}`}
                  onClick={() => toggle("preferences", r)}
                >
                  {r}
                  <span className="choice-check">
                    {profile.preferences.includes(r) ? (
                      <Check size={14} />
                    ) : (
                      <Plus size={14} />
                    )}
                  </span>
                </button>
              ))}
            </div>
            <p className="privacy-note">
              This demo uses local matching rules. Your answers stay in this tab
              and disappear on reload. Preferences are not an allergy-safety
              guarantee.
            </p>
          </div>
        )}
        <div className="finder-actions">
          <button
            className="text-button"
            onClick={() => setStep(step - 1)}
            disabled={step === 0}
          >
            <ChevronLeft size={16} /> Back
          </button>
          <button
            className="button primary"
            onClick={() => (step === 4 ? setResults(true) : setStep(step + 1))}
          >
            {step === 4 ? "See my gift matches" : "Next step"}
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}
