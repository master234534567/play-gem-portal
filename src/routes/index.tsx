import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { SideNav } from "@/components/SideNav";
import { HeroBento } from "@/components/HeroBento";
import { GameRow } from "@/components/GameRow";
import { GameTile } from "@/components/GameTile";
import { AdSlot } from "@/components/AdSlot";
import { GAMES, getGameBySlug } from "@/lib/games";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PlayVerse — Free Online Games" },
      {
        name: "description",
        content:
          "Play hundreds of free online games instantly. Action, puzzle, racing, multiplayer and more — no download required.",
      },
      { property: "og:title", content: "PlayVerse — Free Online Games" },
      {
        property: "og:description",
        content: "Play hundreds of free online games instantly in your browser.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return GAMES.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q),
    );
  }, [query]);

  // Hero bento composition — fall back gracefully if a slug is missing.
  const hot =
    getGameBySlug("stickman-kombat-2d") ??
    GAMES.find((g) => g.category === "Action") ??
    GAMES[0];
  const stackPool = GAMES.filter((g) => g.id !== hot.id);
  const stack: [typeof GAMES[number], typeof GAMES[number]] = [
    stackPool[0],
    stackPool[1],
  ];
  const wide =
    getGameBySlug("my-town-home-family-playhouse") ??
    GAMES.find((g) => g.category === "Casual" && g.id !== hot.id) ??
    stackPool[2];

  // Category groupings
  const featured = GAMES.filter((g) => g.category === "Featured");
  const action = GAMES.filter((g) => g.category === "Action");
  const racing = GAMES.filter((g) => g.category === "Racing");
  const io = GAMES.filter((g) => g.category === "IO");
  const horror = GAMES.filter((g) => g.category === "Horror");
  const casual = GAMES.filter((g) => g.category === "Casual");

  const allCategories = [
    { key: "Featured", games: featured },
    { key: "Action", games: action },
    { key: "Racing", games: racing },
    { key: "IO", games: io },
    { key: "Horror", games: horror },
    { key: "Casual", games: casual },
  ].filter((c) => c.games.length > 0);

  return (
    <div className="min-h-screen flex">
      <SideNav />
      <div className="flex-1 min-w-0">
        <Header query={query} onQueryChange={setQuery} />

        <main className="mx-auto max-w-[1600px] px-4 md:px-6 pb-20 pt-4 md:pt-6 space-y-10">
          {query ? (
            <SearchResults games={filtered} query={query} />
          ) : (
            <>
              <HeroBento hot={hot} stack={stack} wide={wide} />

              <div>
                <AdSlot size="leaderboard" slotId="home-top" />
              </div>

              <GameRow
                id="new-featured"
                title="New & Featured Games"
                games={featured.length > 0 ? featured : GAMES.slice(0, 12)}
                accent
              />

              <GameRow id="action" title="Action Games" games={action} accent />

              <div>
                <AdSlot size="billboard" slotId="home-mid" />
              </div>

              <div id="categories" className="space-y-10">
                {allCategories
                  .filter((c) => c.key !== "Featured" && c.key !== "Action")
                  .map((c) => (
                    <GameRow
                      key={c.key}
                      title={`${c.key} Games`}
                      games={c.games}
                      accent
                    />
                  ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

function SearchResults({
  games,
  query,
}: {
  games: typeof GAMES;
  query: string;
}) {
  return (
    <section>
      <h2 className="text-lg font-bold mb-4">
        Results for "<span className="text-primary">{query}</span>"{" "}
        <span className="text-muted-foreground font-normal">· {games.length}</span>
      </h2>
      <AnimatePresence mode="popLayout">
        {games.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl ring-1 ring-border bg-surface/40 p-12 text-center"
          >
            <p className="text-muted-foreground">No games match your search.</p>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
          >
            {games.map((g, i) => (
              <GameTile key={g.id} game={g} index={i} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
