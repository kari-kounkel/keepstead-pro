// ============================================================
// KEEPSTEAD™ — PRICING CONFIG
// Change prices here. They update everywhere automatically.
// Stripe price IDs go here once created — never in components.
// ============================================================

export const TIERS = {
  free: {
    id: "free",
    label: "Free",
    price: 0,
    interval: null,
    tagline: "Use everything. Save nothing.",
    description:
      "Full access to all 7 rooms. Nothing persists when you close the tab. " +
      "No credit card. No expiration.",
    features: [
      "All 7 rooms — fully functional",
      "No login required",
      "Nothing saves between sessions",
      "Try before you commit",
    ],
    stripePriceId: null,
    rooms: "all",
    storage: false,
    shareability: false,
    businessToggle: false,
    commonsPro: false,
  },

  paid: {
    id: "paid",
    label: "Full House",
    price: 13,
    interval: "month",
    tagline: "All rooms. Full house.",
    description:
      "Everything saves. All 7 rooms with storage and shareability.",
    features: [
      "All 7 rooms",
      "Data saves between sessions",
      "Share any room with anyone",
      "Document storage",
      "One login, your whole life",
    ],
    stripePriceId: "price_REPLACE_PAID_MONTHLY",
    stripePriceIdAnnual: "price_REPLACE_PAID_ANNUAL",
    priceAnnual: 130,
    rooms: "all",
    storage: true,
    shareability: true,
    businessToggle: false,
    commonsPro: false,
  },

  business: {
    id: "business",
    label: "Full House + Business",
    price: 20,
    interval: "month",
    tagline: "All rooms. Plus the business toggle.",
    description:
      "Everything in Full House, plus the Business toggle for sole props, " +
      "partnerships, and single-member LLCs.",
    features: [
      "Everything in Full House",
      "Business toggle unlocked",
      "Business-specific fields in Provision, Ledger, Harvest",
      "Separate personal vs. business views",
    ],
    stripePriceId: "price_REPLACE_BUSINESS_MONTHLY",
    rooms: "all",
    storage: true,
    shareability: true,
    businessToggle: true,
    commonsPro: false,
    note: "Not for C-corporations or nonprofits (1120, 990).",
  },

  commons_pro: {
    id: "commons_pro",
    label: "Full House + Commons Pro",
    price: 20,
    interval: "month",
    tagline: "All rooms. Power boards.",
    description:
      "Everything in Full House, plus full Commons Pro features for creators " +
      "and operators who live in their boards.",
    features: [
      "Everything in Full House",
      "Commons Pro unlocked",
      "Unlimited boards and universes",
      "Advanced task features",
      "Collaboration tools",
      "Stack and subscription tracker",
    ],
    stripePriceId: "price_REPLACE_COMMONS_PRO_MONTHLY",
    rooms: "all",
    storage: true,
    shareability: true,
    businessToggle: false,
    commonsPro: true,
  },

  all_in: {
    id: "all_in",
    label: "All In",
    price: 27,
    interval: "month",
    tagline: "Everything. Full stop.",
    description:
      "All rooms, storage, shareability, Business toggle, and Commons Pro. " +
      "The whole house, fully furnished.",
    features: [
      "Everything in every tier",
      "Business toggle",
      "Commons Pro",
      "Priority support",
      "First access to new rooms",
    ],
    stripePriceId: "price_REPLACE_ALL_IN_MONTHLY",
    stripePriceIdAnnual: "price_REPLACE_ALL_IN_ANNUAL",
    priceAnnual: 270,
    rooms: "all",
    storage: true,
    shareability: true,
    businessToggle: true,
    commonsPro: true,
  },
};

// Display order for pricing page
export const TIER_ORDER = ["free", "paid", "business", "commons_pro", "all_in"];

// Helper: does this tier include business toggle?
export function tierHasBusiness(tierId) {
  var tier = TIERS[tierId];
  return tier ? tier.businessToggle : false;
}

// Helper: does this tier include Commons Pro?
export function tierHasCommonsPro(tierId) {
  var tier = TIERS[tierId];
  return tier ? tier.commonsPro : false;
}

// Helper: does this tier persist data?
export function tierPersists(tierId) {
  return tierId !== "free";
}

// Helper: does this tier allow sharing?
export function tierCanShare(tierId) {
  var tier = TIERS[tierId];
  return tier ? tier.shareability : false;
}
