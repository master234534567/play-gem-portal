export type Game = {
  id: string;
  title: string;
  slug: string;
  thumbnail_url: string;
  iframe_url: string;
  category: string;
  rating: number;
  description: string;
};

export const CATEGORIES = [
  "All",
  "Action",
  "Puzzle",
  "Multiplayer",
  "Racing",
  "Adventure",
  "Sports",
  "Arcade",
  "Strategy",
] as const;

// Placeholder thumbnails using picsum (deterministic by seed)
const thumb = (seed: string) => `https://picsum.photos/seed/${seed}/600/450`;

// Replace iframe_url with your hahagames.com embed URL when ready.
// Example: https://www.hahagames.com/embed/<game-slug>
export const GAMES: Game[] = [
  { id: "1", title: "Neon Drift", slug: "neon-drift", thumbnail_url: thumb("neondrift"), iframe_url: "https://www.hahagames.com/embed/placeholder-1", category: "Racing", rating: 4.8, description: "Burn rubber through a neon-lit cyberpunk city in this high-octane drift racer." },
  { id: "2", title: "Cube Crusher", slug: "cube-crusher", thumbnail_url: thumb("cubecrush"), iframe_url: "https://www.hahagames.com/embed/placeholder-2", category: "Puzzle", rating: 4.6, description: "Smash, match and chain combos in this addictive block-busting puzzle." },
  { id: "3", title: "Shadow Strike", slug: "shadow-strike", thumbnail_url: thumb("shadow"), iframe_url: "https://www.hahagames.com/embed/placeholder-3", category: "Action", rating: 4.7, description: "Stealth, swords, and shurikens — become the ultimate ninja assassin." },
  { id: "4", title: "Galaxy Wars", slug: "galaxy-wars", thumbnail_url: thumb("galaxy"), iframe_url: "https://www.hahagames.com/embed/placeholder-4", category: "Multiplayer", rating: 4.9, description: "Battle players from across the galaxy in epic real-time space combat." },
  { id: "5", title: "Pixel Quest", slug: "pixel-quest", thumbnail_url: thumb("pixel"), iframe_url: "https://www.hahagames.com/embed/placeholder-5", category: "Adventure", rating: 4.5, description: "A retro-pixel adventure across enchanted lands and dungeons." },
  { id: "6", title: "Slam Dunk King", slug: "slam-dunk-king", thumbnail_url: thumb("slam"), iframe_url: "https://www.hahagames.com/embed/placeholder-6", category: "Sports", rating: 4.4, description: "Drain threes, slam jams, and dominate the court." },
  { id: "7", title: "Tower Tactics", slug: "tower-tactics", thumbnail_url: thumb("tower"), iframe_url: "https://www.hahagames.com/embed/placeholder-7", category: "Strategy", rating: 4.7, description: "Plan, build and defend — the ultimate tower defense challenge." },
  { id: "8", title: "Bubble Pop Mania", slug: "bubble-pop-mania", thumbnail_url: thumb("bubble"), iframe_url: "https://www.hahagames.com/embed/placeholder-8", category: "Arcade", rating: 4.3, description: "A relaxing yet addictive bubble shooter with juicy effects." },
  { id: "9", title: "Speed Riders", slug: "speed-riders", thumbnail_url: thumb("speed"), iframe_url: "https://www.hahagames.com/embed/placeholder-9", category: "Racing", rating: 4.6, description: "Customize your bike and tear up the asphalt in this arcade racer." },
  { id: "10", title: "Mind Maze", slug: "mind-maze", thumbnail_url: thumb("maze"), iframe_url: "https://www.hahagames.com/embed/placeholder-10", category: "Puzzle", rating: 4.5, description: "A brain-bending maze game with 100+ devious levels." },
  { id: "11", title: "Battle Royale Z", slug: "battle-royale-z", thumbnail_url: thumb("royale"), iframe_url: "https://www.hahagames.com/embed/placeholder-11", category: "Multiplayer", rating: 4.8, description: "Drop in, loot up, and be the last one standing." },
  { id: "12", title: "Dragon's Realm", slug: "dragons-realm", thumbnail_url: thumb("dragon"), iframe_url: "https://www.hahagames.com/embed/placeholder-12", category: "Adventure", rating: 4.7, description: "Tame dragons, explore kingdoms, and forge your legend." },
];

export const getGameBySlug = (slug: string) => GAMES.find((g) => g.slug === slug);
export const getRandomGame = () => GAMES[Math.floor(Math.random() * GAMES.length)];
export const getRelatedGames = (game: Game, limit = 8) =>
  GAMES.filter((g) => g.id !== game.id && g.category === game.category)
    .concat(GAMES.filter((g) => g.id !== game.id && g.category !== game.category))
    .slice(0, limit);
