import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Maximize2, Minimize2, Star, Shuffle, Play } from "lucide-react";
import { Header } from "@/components/Header";
import { GameTile } from "@/components/GameTile";
import { IframeSkeleton } from "@/components/GameSkeleton";
import { AdSlot } from "@/components/AdSlot";
import { GAMES, getGameBySlug, getRandomGame, getRelatedGames } from "@/lib/games";

export const Route = createFileRoute("/play/$slug")({
  loader: ({ params }) => {
    const game = getGameBySlug(params.slug);
    if (!game) throw notFound();
    return { game };
  },
  head: ({ loaderData }) => {
    const game = loaderData?.game;
    if (!game) return { meta: [{ title: "Game not found — PlayVerse" }] };
    return {
      meta: [
        { title: `${game.title} — Play free on PlayVerse` },
        { name: "description", content: game.description },
        { property: "og:title", content: `${game.title} — PlayVerse` },
        { property: "og:description", content: game.description },
        { property: "og:image", content: game.thumbnail_url },
        { name: "twitter:image", content: game.thumbnail_url },
      ],
    };
  },
  component: PlayPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-4 text-center">
      <div>
        <h1 className="text-3xl font-bold">Game not found</h1>
        <p className="mt-2 text-muted-foreground">This game does not exist or was removed.</p>
        <Link to="/" className="mt-6 inline-block rounded-full gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow">
          Browse games
        </Link>
      </div>
    </div>
  ),
});

function PlayPage() {
  const { game } = Route.useLoaderData();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);

  const related = useMemo(() => getRelatedGames(game), [game]);
  const more = useMemo(() => GAMES.filter((g) => g.id !== game.id).slice(0, 12), [game]);

  // Reset loading on game change
  useEffect(() => {
    setLoading(true);
  }, [game.id]);

  // Filter via header search → navigate back to home
  useEffect(() => {
    if (query.trim()) {
      const handle = setTimeout(() => navigate({ to: "/", search: {} as never }), 0);
      return () => clearTimeout(handle);
    }
  }, [query, navigate]);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = async () => {
    if (!playerRef.current) return;
    if (!document.fullscreenElement) {
      await playerRef.current.requestFullscreen?.();
    } else {
      await document.exitFullscreen?.();
    }
  };

  const playRandom = () => {
    const g = getRandomGame();
    navigate({ to: "/play/$slug", params: { slug: g.slug } });
  };

  return (
    <div className="min-h-screen">
      <Header query={query} onQueryChange={setQuery} />

      <main className="mx-auto max-w-[1600px] px-4 md:px-6 py-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to all games
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4"
        >
          {/* Theater */}
          <div>
            <div
              ref={playerRef}
              className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black ring-1 ring-border shadow-tile-hover"
            >
              {loading && (
                <div className="absolute inset-0 z-10">
                  <IframeSkeleton />
                </div>
              )}
              <iframe
                key={game.id}
                src={game.iframe_url}
                title={game.title}
                onLoad={() => setLoading(false)}
                allow="autoplay; fullscreen; gamepad; cross-origin-isolated"
                allowFullScreen
                className="h-full w-full border-0"
              />
              <button
                onClick={toggleFullscreen}
                className="absolute bottom-3 right-3 z-20 inline-flex items-center gap-1.5 rounded-full bg-background/70 backdrop-blur px-3 py-1.5 text-xs font-semibold ring-1 ring-border hover:bg-background transition"
              >
                {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
                {isFullscreen ? "Exit" : "Fullscreen"}
              </button>
            </div>

            {/* Title + description */}
            <div className="mt-5 rounded-2xl bg-surface/60 ring-1 ring-border p-5 md:p-6">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{game.title}</h1>
                <span className="rounded-full bg-surface px-2.5 py-0.5 text-xs font-semibold ring-1 ring-border">{game.category}</span>
                <span className="inline-flex items-center gap-1 text-sm text-accent font-semibold">
                  <Star className="h-4 w-4 fill-current" /> {game.rating}
                </span>
                <button
                  onClick={playRandom}
                  className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-surface ring-1 ring-border px-3 py-1.5 text-xs font-semibold hover:bg-muted transition"
                >
                  <Shuffle className="h-3.5 w-3.5" /> Surprise me
                </button>
              </div>
              <p className="mt-3 text-sm md:text-base text-foreground/80 leading-relaxed">{game.description}</p>
            </div>

            {/* Ad below the player */}
            <div className="mt-5">
              <AdSlot size="leaderboard" slotId={`play-${game.id}`} />
            </div>
          </div>

          {/* Related sidebar */}
          <aside className="lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto lg:sticky lg:top-[88px] no-scrollbar">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted-foreground">Related games</h2>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
              {related.map((g) => (
                <Link
                  key={g.id}
                  to="/play/$slug"
                  params={{ slug: g.slug }}
                  className="group flex items-center gap-3 rounded-xl bg-surface/60 ring-1 ring-border p-2 hover:bg-surface transition"
                >
                  <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg">
                    <img src={g.thumbnail_url} alt={g.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-background/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                      <Play className="h-5 w-5 fill-primary-foreground text-primary-foreground" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold">{g.title}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Star className="h-3 w-3 fill-accent text-accent" /> {g.rating} · {g.category}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </motion.div>

        {/* More games */}
        <section className="mt-12">
          <h2 className="mb-4 text-lg font-bold">More games you might like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
            {more.map((g, i) => (
              <GameTile key={g.id} game={g} index={i} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
