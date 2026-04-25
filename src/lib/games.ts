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
  category: string;
};

const RAW_GAMES: GameInput[] = [
  { id: "nugget-royale", title: "Nugget Royale", category: "New & Featured" },
  { id: "martian-mayhem", title: "Martian Mayhem", category: "New & Featured" },
  { id: "captchaware", title: "Captchaware", category: "New & Featured" },
  { id: "pokerogue", title: "PokeRogue", category: "New & Featured" },
  { id: "openfront-io", title: "OpenFront.io", category: "IO" },
  { id: "terratomic-io", title: "Terratomic.io", category: "IO" },
  { id: "tsunamis-io", title: "Tsunamis.io", category: "IO" },
  { id: "racing-ball-adventure", title: "Racing Ball Adventure", category: "Racing" },
  { id: "car-crush-realistic-destruction", title: "Car Crush: Realistic Destruction", category: "Racing" },
  { id: "summer-rider-3d", title: "Summer Rider 3D", category: "Racing" },
  { id: "cluster-rush", title: "Cluster Rush", category: "Racing" },
  { id: "my-town-home-family-playhouse", title: "My Town: Home Family Playhouse", category: "Casual" },
  { id: "gas-station-junkyard-tycoon", title: "Gas Station Junkyard Tycoon", category: "Casual" },
  { id: "snake-2048", title: "Snake 2048", category: "Puzzle" },
  { id: "stickman-kombat-2d", title: "Stickman Kombat 2D", category: "Action" },
  { id: "steal-a-brainrot-original-3d", title: "Steal a Brainrot Original 3D", category: "Action" },
  { id: "pizza-tower", title: "Pizza Tower", category: "Action" },
  { id: "run-3", title: "Run 3", category: "Action" },
  { id: "war-the-knights-battle-arena-swords-3d", title: "War: The Knights Battle Arena Swords 3D", category: "Action" },
  { id: "five-nights-at-freddys", title: "Five Nights at Freddy's", category: "Horror" },
  { id: "five-nights-at-freddys-2", title: "Five Nights at Freddy's 2", category: "Horror" },
  { id: "five-nights-at-freddys-4", title: "Five Nights at Freddy's 4", category: "Horror" },
];

// Stable pseudo-random rating in [4.2, 4.9] derived from the id
const ratingFor = (id: string) => {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return Math.round((4.2 + (h % 80) / 100) * 10) / 10;
};

const thumbnailFor = (id: string) =>
  `https://www.hahagames.com/api/og-image?slug=${id}`;

export const GAMES: Game[] = RAW_GAMES.map((g) => {
  const thumb = thumbnailFor(g.id);
  return {
    id: g.id,
    title: g.title,
    slug: g.id,
    thumbnail: thumb,
    thumbnail_url: thumb,
    iframe_url: `https://www.hahagames.com/embed/${g.id}`,
    category: g.category,
    rating: ratingFor(g.id),
    description: `Play ${g.title} free online — instant browser play, no downloads required.`,
  };
});

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
