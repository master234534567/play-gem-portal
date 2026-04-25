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
};

type GameInput = {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  iframe_url: string;
};

const RAW_GAMES: GameInput[] = [
  {
    id: "nugget-royale",
    title: "Nugget Royale",
    thumbnail: "https://static.hahagames.com/media/fee0c9d3-50a4-4214-8043-16e9f213bab3/2369e35d-26b2-4b05-a96f-dca31bd2383d_320x195.webp",
    category: "New & Featured",
    iframe_url: "https://www.hahagames.com/embed/nugget-royale",
  },
  {
    id: "pokerogue",
    title: "PokeRogue",
    thumbnail: "https://static.hahagames.com/media/0226afde-4325-46ee-9878-b73780436feb/bdf28603-8eaf-440c-95d7-1c795e153849_320x195.webp",
    category: "New & Featured",
    iframe_url: "https://www.hahagames.com/embed/pokerogue",
  },
  {
    id: "stickman-kombat-2d",
    title: "Stickman Kombat 2D",
    thumbnail: "https://static.hahagames.com/media/1164086b-632b-4bfa-af10-1a0c96555ee6/6695258f-875c-4972-a435-e29a798a522e_320x195.webp",
    category: "Action",
    iframe_url: "https://www.hahagames.com/embed/stickman-kombat-2d",
  },
  {
    id: "pizza-tower",
    title: "Pizza Tower",
    thumbnail: "https://static.hahagames.com/media/686b9cc8-0bf8-45d6-b7c8-692af714ed30/2ef0f3cb-a709-4aab-85f9-317eec728c3a_320x195.webp",
    category: "Action",
    iframe_url: "https://www.hahagames.com/embed/pizza-tower",
  },
  {
    id: "five-nights-at-freddys",
    title: "Five Nights at Freddy's",
    thumbnail: "https://static.hahagames.com/media/fc4827f4-75cb-4148-ac41-69f902ec4c55/80ae5c61-07a1-4619-b072-d7e1bc1fc191_320x195.webp",
    category: "Action",
    iframe_url: "https://www.hahagames.com/embed/five-nights-at-freddys",
  },
  {
    id: "run-3",
    title: "Run 3",
    thumbnail: "https://static.hahagames.com/media/2069b79e-0f1d-4cfe-9930-0f47f6026e14/b0031978-c1cd-4372-8503-e7820dc18695_320x195.webp",
    category: "Action",
    iframe_url: "https://www.hahagames.com/embed/run-3",
  },
  {
    id: "car-crush-realistic-destruction",
    title: "Car Crush: Realistic Destruction",
    thumbnail: "https://static.hahagames.com/media/7bf09d8b-fea2-4269-9588-8fe3df7940df/33821b05-3ee5-49ca-b1fd-19ff7b157f0f_320x195.webp",
    category: "Action",
    iframe_url: "https://www.hahagames.com/embed/car-crush-realistic-destruction",
  },
];

// Stable pseudo-random rating in [4.2, 4.9] derived from the id
const ratingFor = (id: string) => {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return Math.round((4.2 + (h % 80) / 100) * 10) / 10;
};

export const GAMES: Game[] = RAW_GAMES.map((g) => ({
  id: g.id,
  title: g.title,
  slug: g.id,
  thumbnail: g.thumbnail,
  thumbnail_url: g.thumbnail,
  iframe_url: g.iframe_url,
  category: g.category,
  rating: ratingFor(g.id),
  description: `Play ${g.title} free online — instant browser play, no downloads required.`,
}));

// Backwards-compatible named export
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
