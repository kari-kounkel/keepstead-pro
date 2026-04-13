// ============================================================
// KEEPSTEAD™ — ROOMS CONFIG
// Define a room here once. It shows up everywhere automatically:
// nav, routing, Stained Glass theme, feature gating, sidebar.
// ============================================================

export const ROOMS = [
  {
    id: "commons",
    label: "Commons",
    emoji: "🏡",
    tagline: "Tasks, projects, boards",
    description:
      "Your daily workspace. Boards, tasks, habit tracking, and cross-room links. " +
      "This is where the work lives.",
    path: "/commons",
    order: 1,
    // Tier required to persist data
    minTier: "free",
    // Tier required for full Pro features (Commons Pro)
    proTier: "commons_pro",
    // Which legacy app migrates here
    migratesFrom: ["everything-board", "marbleverse"],
    // Stained Glass accent (matches STAINED_GLASS_ROOMS key)
    sgKey: "commons",
    // Is this room available in the Business toggle?
    businessRoom: false,
  },
  {
    id: "provision",
    label: "Provision",
    emoji: "💰",
    tagline: "Budget, bills, income",
    description:
      "Track what comes in and what goes out. Bills, subscriptions, income, " +
      "and a monthly budget that doesn't judge you.",
    path: "/provision",
    order: 2,
    minTier: "free",
    proTier: "paid",
    migratesFrom: [],
    sgKey: "provision",
    businessRoom: true,
  },
  {
    id: "ledger",
    label: "Ledger",
    emoji: "📋",
    tagline: "Tax records, CPA info",
    description:
      "Current year only. Your income, expenses, tax categories, and everything " +
      "your CPA needs in one place. DIY or hand it off.",
    path: "/ledger",
    order: 3,
    minTier: "free",
    proTier: "paid",
    migratesFrom: ["keepstead", "keepstead2"],
    sgKey: "ledger",
    businessRoom: true,
  },
  {
    id: "stronghold",
    label: "Stronghold",
    emoji: "🔒",
    tagline: "Documents, IDs, records",
    description:
      "The fireproof box. Important documents, IDs, insurance, contracts, " +
      "and anything you'd grab in an emergency.",
    path: "/stronghold",
    order: 4,
    minTier: "paid",
    proTier: "paid",
    migratesFrom: [],
    sgKey: "stronghold",
    businessRoom: true,
  },
  {
    id: "mending",
    label: "Mending",
    emoji: "🧵",
    tagline: "Credit, past finances",
    description:
      "For the mess that happened before now. Credit rebuilding, unfiled taxes, " +
      "and the financial past you're cleaning up.",
    path: "/mending",
    order: 5,
    minTier: "paid",
    proTier: "paid",
    migratesFrom: ["credit-comeback"],
    sgKey: "mending",
    businessRoom: false,
  },
  {
    id: "legacy",
    label: "Legacy",
    emoji: "📜",
    tagline: "End-of-life planning",
    description:
      "The room nobody wants to build but everyone needs. Accounts, wishes, " +
      "contacts, and what you want people to know when you're gone.",
    path: "/legacy",
    order: 6,
    minTier: "paid",
    proTier: "paid",
    migratesFrom: [],
    sgKey: "legacy",
    businessRoom: false,
  },
  {
    id: "harvest",
    label: "Harvest",
    emoji: "🌾",
    tagline: "Investing, growth",
    description:
      "From starter to advanced. Investing basics, tracking, and a path " +
      "toward building something that lasts.",
    path: "/harvest",
    order: 7,
    minTier: "paid",
    proTier: "paid",
    migratesFrom: [],
    sgKey: "harvest",
    businessRoom: true,
  },
];

// Helper: get room by id
export function getRoom(id) {
  return ROOMS.find(function (r) {
    return r.id === id;
  });
}

// Helper: get rooms available to a given tier
export function getRoomsForTier(tier) {
  var paid = tier === "paid" || tier === "business" || tier === "commons_pro" || tier === "all_in";
  return ROOMS.filter(function (r) {
    if (r.minTier === "free") return true;
    if (r.minTier === "paid" && paid) return true;
    return false;
  });
}

// Helper: get rooms available in Business toggle
export function getBusinessRooms() {
  return ROOMS.filter(function (r) {
    return r.businessRoom;
  });
}

export const ROOM_IDS = ROOMS.map(function (r) {
  return r.id;
});
