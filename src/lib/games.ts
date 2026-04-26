export type Game = {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  thumbnail_url: string;
  iframe_url: string;
  category: string;
  rating: number;
  description: string;
  sponsored?: boolean;
  sponsorName?: string;
  comingSoon?: boolean;
};

type GameInput = {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  comingSoon?: boolean;
};

// Mark a few games as sponsored. Edit this list to control which tiles
// display a "Sponsored" badge / glow on the home grid.
const SPONSORED: Record<string, string> = {
  "nugget-royale": "PlayVerse Picks",
  "openfront-io": "Featured Sponsor",
  "five-nights-at-freddys-2": "Promoted",
};

// Only entries with confirmed static CDN thumbnails — no fallbacks, no duplicates.
const RAW_GAMES: GameInput[] = [
  // --- Featured ---
  {
    id: "nugget-royale",
    title: "Nugget Royale",
    category: "Featured",
    thumbnail:
      "https://static.hahagames.com/media/fee0c9d3-50a4-4214-8043-16e9f213bab3/2369e35d-26b2-4b05-a96f-dca31bd2383d_320x195.webp",
  },
  {
    id: "martian-mayhem",
    title: "Martian Mayhem",
    category: "Featured",
    thumbnail:
      "https://static.hahagames.com/media/2ea39960-248b-4095-9d74-2cdfa6e8104c/71e4050a-7ba1-4106-9289-bcc8cb6944a0_320x195.webp",
  },
  {
    id: "captchaware",
    title: "CaptchaWare",
    category: "Featured",
    thumbnail:
      "https://static.hahagames.com/media/45ffa3c3-ed04-44f1-8f4c-f74584fa6854/aa3bb257-728c-4d1b-ac60-109f489121cd_320x195.webp",
  },
  {
    id: "pokerogue",
    title: "PokeRogue",
    category: "Featured",
    thumbnail:
      "https://static.hahagames.com/media/0226afde-4325-46ee-9878-b73780436feb/bdf28603-8eaf-440c-95d7-1c795e153849_320x195.webp",
  },

  // --- IO ---
  {
    id: "openfront-io",
    title: "OpenFront.io",
    category: "IO",
    thumbnail:
      "https://static.hahagames.com/media/d304624d-4f5a-4506-9b70-824261ac475c/efa8af6c-6092-436b-a223-1c67bd4baad5_320x195.webp",
  },
  {
    id: "terratomic-io",
    title: "Terratomic.io",
    category: "IO",
    thumbnail:
      "https://static.hahagames.com/media/9c718cc2-0a6a-4820-b9c7-2759ec533731/5940d1cc-c312-4800-8f88-fc3508a25f01_320x195.webp",
  },
  {
    id: "tsunamis-io",
    title: "Tsunamis.io",
    category: "IO",
    thumbnail:
      "https://static.hahagames.com/media/ed73ed93-2002-4a21-b624-835fbf194975/813e90b1-78a7-48b9-a327-2ec976cfe9df_320x195.webp",
  },

  // --- Racing ---
  {
    id: "racing-ball-adventure",
    title: "Racing Ball Adventure",
    category: "Racing",
    thumbnail:
      "https://static.hahagames.com/media/0697fe92-6a0e-4d76-b038-a290ee5370f5/5c933eeb-cb64-4b22-bbdd-0836ae4dbc33_320x195.webp",
  },
  {
    id: "car-crush-realistic-destruction",
    title: "Car Crush: Realistic Destruction",
    category: "Racing",
    thumbnail:
      "https://static.hahagames.com/media/7bf09d8b-fea2-4269-9588-8fe3df7940df/33821b05-3ee5-49ca-b1fd-19ff7b157f0f_320x195.webp",
  },
  {
    id: "summer-rider-3d",
    title: "Summer Rider 3D",
    category: "Racing",
    thumbnail:
      "https://static.hahagames.com/media/1724cf27-f367-4359-b529-f3803a2ab126/b480e470-13d6-486c-aeab-cb0449fe4ed4_320x195.webp",
  },
  {
    id: "cluster-rush",
    title: "Cluster Rush",
    category: "Racing",
    thumbnail:
      "https://static.hahagames.com/media/fd88d568-c7a2-45fd-a396-1abc906fe864/012c0e6b-0438-4b67-a852-029d4082928c_320x195.webp",
  },

  // --- Casual ---
  {
    id: "my-town-home-family-playhouse",
    title: "My Town Home: Family Playhouse",
    category: "Casual",
    thumbnail:
      "https://static.hahagames.com/media/c09843cd-cd77-47f4-b37f-56d241007aae/9d89b787-3be3-4585-9864-f7a7207e6eb1_320x195.webp",
  },
  {
    id: "gas-station-junkyard-tycoon",
    title: "Gas Station: Junkyard Tycoon",
    category: "Casual",
    thumbnail:
      "https://static.hahagames.com/media/ca437eea-d3c1-4b32-a5ad-ad979f95cf66/3e082fe7-dcbe-4eda-b11e-7b931bd20d37_320x195.webp",
  },

  // --- Action ---
  {
    id: "stickman-kombat-2d",
    title: "Stickman Kombat 2D",
    category: "Action",
    thumbnail:
      "https://static.hahagames.com/media/1164086b-632b-4bfa-af10-1a0c96555ee6/6695258f-875c-4972-a435-e29a798a522e_320x195.webp",
  },
  {
    id: "steal-a-brainrot-original-3d",
    title: "Steal A Brainrot Original 3D",
    category: "Action",
    thumbnail:
      "https://static.hahagames.com/media/ef15c71a-9e81-4b7e-93a3-7f2940c3125c/8743f69b-af30-4a79-8de4-5c51045a40cc_320x195.webp",
  },
  {
    id: "snake-2048",
    title: "Snake 2048",
    category: "Action",
    thumbnail:
      "https://static.hahagames.com/media/bb4836df-b724-4c6b-bba5-c90baa8056d3/2e1a67a0-d033-47ef-b413-084f05cc851e_320x195.webp",
  },
  {
    id: "war-the-knights-battle-arena-swords-3d",
    title: "War The Knights: Battle Arena Swords 3D",
    category: "Action",
    thumbnail:
      "https://static.hahagames.com/media/66b14117-363e-485d-9acd-ef7e02354d50/ad026195-8220-4536-9785-93d77437d913_320x195.webp",
  },

  // --- Horror ---
  {
    id: "five-nights-at-freddys-2",
    title: "Five Nights at Freddy's 2",
    category: "Horror",
    thumbnail:
      "https://static.hahagames.com/media/ca687661-dcb2-4b70-8026-a76a995bfd73/385be5b3-3369-4f07-9c13-f06b9a4bf60e_320x195.webp",
  },
  {
    id: "five-nights-at-freddys-4",
    title: "Five Nights at Freddy's 4",
    category: "Horror",
    thumbnail:
      "https://static.hahagames.com/media/4d584972-fb13-4b17-b34b-eb0700f2fb8e/beeed97c-b991-4bcd-b783-acdd52c179fd_320x195.webp",
  },

  // ============================================================
  // 2026 fictional trending titles — playable demos coming soon.
  // Thumbnails use Unsplash stock photos for a clean placeholder UI.
  // ============================================================

  // --- Action (8) ---
  { id: "neon-nexus-racer", title: "Neon Nexus Racer", category: "Action", comingSoon: true, thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=320&h=195" },
  { id: "shadow-strike-io", title: "Shadow Strike.io", category: "Action", comingSoon: true, thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=320&h=195" },
  { id: "voxel-vandals", title: "Voxel Vandals", category: "Action", comingSoon: true, thumbnail: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=320&h=195" },
  { id: "hyper-dash-arena", title: "Hyper Dash Arena", category: "Action", comingSoon: true, thumbnail: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&q=80&w=320&h=195" },
  { id: "ragdoll-rampage-3d", title: "Ragdoll Rampage 3D", category: "Action", comingSoon: true, thumbnail: "https://images.unsplash.com/photo-1556438064-2d7646166914?auto=format&fit=crop&q=80&w=320&h=195" },
  { id: "chrono-blade-saga", title: "Chrono Blade Saga", category: "Action", comingSoon: true, thumbnail: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?auto=format&fit=crop&q=80&w=320&h=195" },
  { id: "glitch-gunner", title: "Glitch Gunner", category: "Action", comingSoon: true, thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=320&h=195" },
  { id: "stickfight-quantum", title: "Stickfight Quantum", category: "Action", comingSoon: true, thumbnail: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=320&h=195" },

  // --- Puzzle (8) ---
  { id: "prism-paradox", title: "Prism Paradox", category: "Puzzle", comingSoon: true, thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=320&h=195" },
  { id: "cube-cascade", title: "Cube Cascade", category: "Puzzle", comingSoon: true, thumbnail: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&q=80&w=320&h=195" },
  { id: "logic-loop-2048", title: "Logic Loop 2048", category: "Puzzle", comingSoon: true, thumbnail: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=320&h=195" },
  { id: "tile-tactics-pro", title: "Tile Tactics Pro", category: "Puzzle", comingSoon: true, thumbnail: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=320&h=195" },
  { id: "merge-mystery-mansion", title: "Merge Mystery Mansion", category: "Puzzle", comingSoon: true, thumbnail: "https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&q=80&w=320&h=195" },
  { id: "circuit-breaker-io", title: "Circuit Breaker.io", category: "Puzzle", comingSoon: true, thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=320&h=195" },
  { id: "labyrinth-of-light", title: "Labyrinth of Light", category: "Puzzle", comingSoon: true, thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=320&h=195" },
  { id: "atomic-sort", title: "Atomic Sort", category: "Puzzle", comingSoon: true, thumbnail: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?auto=format&fit=crop&q=80&w=320&h=195" },

  // --- Sports (8) ---
  { id: "gravity-goal-keeper", title: "Gravity Goalkeeper", category: "Sports", comingSoon: true, thumbnail: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=320&h=195" },
  { id: "stadium-storm-2026", title: "Stadium Storm 2026", category: "Sports", comingSoon: true, thumbnail: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=320&h=195" },
  { id: "tap-trick-skater", title: "Tap Trick Skater", category: "Sports", comingSoon: true, thumbnail: "https://images.unsplash.com/photo-1547447134-cd3f5c716030?auto=format&fit=crop&q=80&w=320&h=195" },
  { id: "rocket-rally-soccer", title: "Rocket Rally Soccer", category: "Sports", comingSoon: true, thumbnail: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80&w=320&h=195" },
  { id: "drift-dunk-arena", title: "Drift Dunk Arena", category: "Sports", comingSoon: true, thumbnail: "https://images.unsplash.com/photo-1505666287802-931582b5868f?auto=format&fit=crop&q=80&w=320&h=195" },
  { id: "ultra-archery-pro", title: "Ultra Archery Pro", category: "Sports", comingSoon: true, thumbnail: "https://images.unsplash.com/photo-1486218119243-13883505764c?auto=format&fit=crop&q=80&w=320&h=195" },
  { id: "neon-bowling-blitz", title: "Neon Bowling Blitz", category: "Sports", comingSoon: true, thumbnail: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=320&h=195" },
  { id: "skybox-surfers", title: "Skybox Surfers", category: "Sports", comingSoon: true, thumbnail: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=320&h=195" },

  // --- Horror (7) ---
  { id: "whispers-of-the-vault", title: "Whispers of the Vault", category: "Horror", comingSoon: true, thumbnail: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=320&h=195" },
  { id: "midnight-motel", title: "Midnight Motel", category: "Horror", comingSoon: true, thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=320&h=195" },
  { id: "the-static-room", title: "The Static Room", category: "Horror", comingSoon: true, thumbnail: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80&w=320&h=195" },
  { id: "hollow-signal", title: "Hollow Signal", category: "Horror", comingSoon: true, thumbnail: "https://images.unsplash.com/photo-1505635552518-3448ff116af3?auto=format&fit=crop&q=80&w=320&h=195" },
  { id: "asylum-exit-9", title: "Asylum Exit 9", category: "Horror", comingSoon: true, thumbnail: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=320&h=195" },
  { id: "ghost-server-io", title: "Ghost Server.io", category: "Horror", comingSoon: true, thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&q=80&w=320&h=195" },
  { id: "lighthouse-keeper-7", title: "Lighthouse Keeper 7", category: "Horror", comingSoon: true, thumbnail: "https://images.unsplash.com/photo-1502209524164-acea936639a2?auto=format&fit=crop&q=80&w=320&h=195" },

  // --- Simulator (8) ---
  { id: "ramen-empire-tycoon", title: "Ramen Empire Tycoon", category: "Simulator", comingSoon: true, thumbnail: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=320&h=195" },
  { id: "rocket-builder-3d", title: "Rocket Builder 3D", category: "Simulator", comingSoon: true, thumbnail: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=320&h=195" },
  { id: "drone-delivery-co", title: "Drone Delivery Co.", category: "Simulator", comingSoon: true, thumbnail: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=320&h=195" },
  { id: "barista-rush-2026", title: "Barista Rush 2026", category: "Simulator", comingSoon: true, thumbnail: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=320&h=195" },
  { id: "junkyard-mech-builder", title: "Junkyard Mech Builder", category: "Simulator", comingSoon: true, thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&q=80&w=320&h=195" },
  { id: "indie-studio-tycoon", title: "Indie Studio Tycoon", category: "Simulator", comingSoon: true, thumbnail: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=320&h=195" },
  { id: "deep-sea-salvage-sim", title: "Deep Sea Salvage Sim", category: "Simulator", comingSoon: true, thumbnail: "https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&q=80&w=320&h=195" },
  { id: "city-cleanup-crew", title: "City Cleanup Crew", category: "Simulator", comingSoon: true, thumbnail: "https://images.unsplash.com/photo-1573108037329-37aa11c923fc?auto=format&fit=crop&q=80&w=320&h=195" },
];

// Stable pseudo-random rating in [4.2, 4.9] derived from the id
const ratingFor = (id: string) => {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return Math.round((4.2 + (h % 80) / 100) * 10) / 10;
};

export const GAMES: Game[] = RAW_GAMES.map((g) => {
  const sponsorName = SPONSORED[g.id];
  return {
    id: g.id,
    title: g.title,
    slug: g.id,
    thumbnail: g.thumbnail,
    thumbnail_url: g.thumbnail,
    iframe_url: `https://www.hahagames.com/embed/${g.id}`,
    category: g.category,
    rating: ratingFor(g.id),
    description: `Play ${g.title} free online — instant browser play, no downloads required.`,
    sponsored: Boolean(sponsorName),
    sponsorName,
    comingSoon: g.comingSoon,
  };
});

export const SPONSORED_GAMES = GAMES.filter((g) => g.sponsored);

export const games = GAMES;

export const CATEGORIES = [
  "All",
  ...Array.from(new Set(GAMES.map((g) => g.category))),
] as const;

export const getGameBySlug = (slug: string) =>
  GAMES.find((g) => g.slug === slug || g.id === slug);

export const getRandomGame = () => GAMES[Math.floor(Math.random() * GAMES.length)];

export const getRelatedGames = (game: Game, limit = 8) =>
  GAMES.filter((g) => g.id !== game.id && g.category === game.category)
    .concat(GAMES.filter((g) => g.id !== game.id && g.category !== game.category))
    .slice(0, limit);
