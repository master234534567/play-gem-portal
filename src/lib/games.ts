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
