import { products, type Product, type Profile } from "./catalog";
export type Match = { product: Product; score: number; reasons: string[] };
// Hard constraints first. Ranking is deterministic; it uses no AI service or personal inference.
export function recommend(profile: Profile): Match[] {
  return products
    .filter(
      (p) =>
        p.price <= profile.budget &&
        !profile.preferences.some((pref) => p.exclusions.includes(pref)),
    )
    .map((product) => {
      const shared = product.interests.filter((i) =>
        profile.interests.includes(i),
      );
      const occasion = product.occasions.includes(profile.occasion);
      const reasons = [
        ...shared.map((i) => `Made for their love of ${i.toLowerCase()}.`),
        ...(occasion
          ? [`A thoughtful fit for ${profile.occasion.toLowerCase()}.`]
          : []),
        `Within your ${new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(profile.budget)} budget.`,
      ];
      return {
        product,
        score: shared.length * 4 + (occasion ? 2 : 0),
        reasons,
      };
    })
    .sort(
      (a, b) =>
        b.score - a.score ||
        a.product.price - b.product.price ||
        a.product.id.localeCompare(b.product.id),
    )
    .slice(0, 3);
}
