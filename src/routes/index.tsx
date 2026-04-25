import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { CategoryBar } from "@/components/CategoryBar";
import { GameTile } from "@/components/GameTile";
import { GAMES } from "@/lib/games";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PlayVerse — Free Online Games" },
      { name: "description", content: "Play hundreds of free online games instantly. Action, puzzle, racing, multiplayer and more — no download required." },
      { property: "og:title", content: "PlayVerse — Free Online Games" },
      { property: "og:description", content: "Play hundreds of free online games instantly in your browser." },
    ],
  }),
  component: Home,
});

function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GAMES.filter((g) => {
      const matchCat = category === "All" || g.category === category;
      const matchQ = !q || g.title.toLowerCase().includes(q) || g.category.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [query, category]);

  const featured = GAMES[0];

  return (
    <div className="min-h-screen">
      <Header query={query} onQueryChange={setQuery} />
      <CategoryBar active={category} onChange={setCategory} />

      <main className="mx-auto max-w-[1600px] px-4 md:px-6 pb-20">
        {/* Hero */}
        {!query && category === "All" && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative my-6 overflow-hidden rounded-3xl ring-1 ring-border"
          >
            <img src={featured.thumbnail_url} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
            <div className="absolute inset-0 gradient-hero opacity-70" />
            <div className="relative z-10 flex flex-col gap-3 p-8 md:p-12">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-background/40 backdrop-blur px-3 py-1 text-xs font-semibold ring-1 ring-white/10">
                <Sparkles className="h-3.5 w-3.5 text-accent" /> Featured today
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight max-w-2xl">
                Your portal to <span className="text-accent">instant play.</span>
              </h1>
              <p className="max-w-lg text-sm md:text-base text-foreground/80">
                Hundreds of free, browser-based games — no downloads, no accounts, just press play.
              </p>
            </div>
          </motion.section>
        )}

        <div className="mt-2 mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">
            {category === "All" ? "All games" : category} <span className="text-muted-foreground font-normal">· {filtered.length}</span>
          </h2>
        </div>

        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
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
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4"
            >
              {filtered.map((g, i) => (
                <GameTile key={g.id} game={g} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
