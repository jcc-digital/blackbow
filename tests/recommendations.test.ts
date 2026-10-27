import { test } from "node:test";
import assert from "node:assert/strict";
import { recommend } from "../lib/recommendations";
import { defaultProfile, products, preferences } from "../lib/catalog";
test("returns interest and occasion matches before cheaper unrelated gifts", () => {
  const matches = recommend({
    ...defaultProfile,
    interests: ["Slow living", "Self-care"],
  });
  assert.equal(matches[0].product.id, "quiet");
  assert.ok(matches[0].reasons.some((r) => r.includes("slow living")));
});
test("budget is a hard constraint, including empty results", () => {
  assert.equal(recommend({ ...defaultProfile, budget: 50 }).length, 0);
  for (const budget of [65, 85, 100, 150])
    assert.ok(
      recommend({ ...defaultProfile, budget }).every(
        (m) => m.product.price <= budget,
      ),
    );
});
test("preferences exclude incompatible products even when they score highest", () => {
  for (const pref of preferences) {
    const matches = recommend({
      ...defaultProfile,
      budget: 200,
      interests: ["Food & drink"],
      preferences: [pref],
    });
    assert.ok(matches.every((m) => !m.product.exclusions.includes(pref)));
  }
  assert.ok(
    !recommend({
      ...defaultProfile,
      budget: 200,
      preferences: ["No alcohol"],
    }).some((m) => m.product.id === "cheers"),
  );
});
test("all preference combinations obey constraints", () => {
  for (let mask = 0; mask < 8; mask++) {
    const prefs = preferences.filter((_, i) => mask & (1 << i));
    assert.ok(
      recommend({ ...defaultProfile, budget: 200, preferences: prefs }).every(
        (m) => !prefs.some((p) => m.product.exclusions.includes(p)),
      ),
    );
  }
});
test("ranking is stable, catalog is not mutated, explanations are truthful", () => {
  const before = JSON.stringify(products);
  const p = { ...defaultProfile, budget: 200, interests: [] };
  assert.deepEqual(recommend(p), recommend(p));
  assert.equal(JSON.stringify(products), before);
  assert.ok(
    recommend(p).every((m) => !m.reasons.some((r) => r.includes("love of"))),
  );
});
