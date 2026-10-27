export type Interest =
  "Slow living" | "Food & drink" | "Self-care" | "Home & hosting" | "Adventure";
export type Preferences = "No alcohol" | "No food" | "Fragrance-free";
export type Profile = {
  recipient: string;
  occasion: string;
  budget: number;
  interests: Interest[];
  preferences: Preferences[];
};
export type Product = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  interests: Interest[];
  occasions: string[];
  contains: string[];
  exclusions: Preferences[];
  color: string;
  art: "calm" | "host" | "morning" | "adventure" | "care" | "celebrate";
};
export const interests: Interest[] = [
  "Slow living",
  "Food & drink",
  "Self-care",
  "Home & hosting",
  "Adventure",
];
export const preferences: Preferences[] = [
  "No alcohol",
  "No food",
  "Fragrance-free",
];
export const products: Product[] = [
  {
    id: "quiet",
    name: "A Quiet Moment",
    subtitle: "A little permission to slow down.",
    price: 85,
    interests: ["Slow living", "Self-care"],
    occasions: ["Birthday", "Thank you", "Just because"],
    contains: [
      "Ceramic mug",
      "Herbal tea",
      "Linen eye pillow",
      "Keepsake gift box",
    ],
    exclusions: ["No food"],
    color: "#ddd8c7",
    art: "calm",
  },
  {
    id: "host",
    name: "The Thoughtful Host",
    subtitle: "For the one who brings everyone together.",
    price: 115,
    interests: ["Home & hosting", "Food & drink"],
    occasions: ["Housewarming", "Thank you"],
    contains: ["Serving board", "Olive oil", "Sea salt", "Linen napkins"],
    exclusions: ["No food"],
    color: "#dccab5",
    art: "host",
  },
  {
    id: "morning",
    name: "A Brighter Morning",
    subtitle: "Small rituals. A lovely start.",
    price: 65,
    interests: ["Food & drink", "Slow living"],
    occasions: ["Birthday", "Thank you", "Just because"],
    contains: ["Coffee", "Stoneware cup", "Chocolate", "Gift box"],
    exclusions: ["No food"],
    color: "#c5cfbf",
    art: "morning",
  },
  {
    id: "trail",
    name: "Off the Clock",
    subtitle: "A fresh-air kind of happy.",
    price: 95,
    interests: ["Adventure"],
    occasions: ["Birthday", "Milestone", "Just because"],
    contains: ["Insulated bottle", "Pocket journal", "Cotton cap", "Gift box"],
    exclusions: [],
    color: "#b7c7c1",
    art: "adventure",
  },
  {
    id: "care",
    name: "A Little Comfort",
    subtitle: "Thoughtfulness, wrapped in softness.",
    price: 125,
    interests: ["Self-care", "Slow living"],
    occasions: ["Thank you", "Just because", "Milestone"],
    contains: [
      "Cotton throw",
      "Unscented soap",
      "Linen eye pillow",
      "Gift box",
    ],
    exclusions: [],
    color: "#ddc6c0",
    art: "care",
  },
  {
    id: "cheers",
    name: "Something to Celebrate",
    subtitle: "Make their good news feel even better.",
    price: 145,
    interests: ["Food & drink", "Home & hosting"],
    occasions: ["Milestone", "Birthday"],
    contains: ["Sparkling wine", "Chocolate", "Two glass tumblers", "Gift box"],
    exclusions: ["No alcohol", "No food"],
    color: "#c6bdce",
    art: "celebrate",
  },
];
export const defaultProfile: Profile = {
  recipient: "A friend",
  occasion: "Birthday",
  budget: 100,
  interests: ["Slow living"],
  preferences: [],
};
export const money = (amount: number) =>
  new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(amount);
export const boxItems = [
  {
    id: "mug",
    name: "Stoneware mug",
    price: 22,
    category: "A daily ritual",
    kind: "mug",
  },
  {
    id: "tea",
    name: "Herbal tea",
    price: 14,
    category: "Something delicious",
    kind: "tea",
  },
  {
    id: "journal",
    name: "Pocket journal",
    price: 18,
    category: "A thoughtful touch",
    kind: "journal",
  },
  {
    id: "throw",
    name: "Cotton throw",
    price: 38,
    category: "A little comfort",
    kind: "throw",
  },
  {
    id: "soap",
    name: "Unscented soap",
    price: 12,
    category: "A little comfort",
    kind: "soap",
  },
  {
    id: "chocolate",
    name: "Chocolate bar",
    price: 10,
    category: "Something delicious",
    kind: "chocolate",
  },
];
