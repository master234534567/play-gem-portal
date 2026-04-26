import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Flame, Play } from "lucide-react";
import { HotBadge } from "@/components/HotBadge";
import type { Game } from "@/lib/games";

type Props = {
  hot: Game;
  stack: [Game, Game];
  wide: Game;
};

export function HeroBento({ hot, stack, wide }: Props) {
  return (
    <section id="trending" className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* Left: title card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="lg:col-span-3 relative overflow-hidden rounded-2xl bg-[#1a1a1a] ring-1 ring-border p-6 flex flex-col justify-between min-h-[280px]"
      >
        <div
          className="absolute inset-0 opacity-60 pointer-events-none"
          style={{ background: "var(--gradient-glow)" }}
        />
        <div className="relative">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-400 ring-1 ring-orange-500/30">
            <Flame className="h-3 w-3" /> Trending now
          </div>
          <h2 className="mt-4 text-3xl xl:text-4xl font-black tracking-tight leading-[1.05]">
            What everyone's playing <span className="text-primary">right now</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Fresh hits, viral favourites and the most-played picks of the week.
          </p>
        </div>
        <Link
          to="/"
          className="relative inline-flex items-center gap-1.5 self-start rounded-full gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow hover:brightness-110 active:scale-95 transition"
        >
          See all <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>

      {/* Middle-left: hot featured */}
      <BentoCard game={hot} variant="hot" className="lg:col-span-5 min-h-[280px]" />

      {/* Middle-right: vertical stack of 2 */}
      <div className="lg:col-span-2 grid grid-rows-2 gap-4 min-h-[280px]">
        <BentoCard game={stack[0]} variant="small" />
        <BentoCard game={stack[1]} variant="small" />
      </div>

      {/* Right: wide simulator card */}
      <BentoCard game={wide} variant="wide" className="lg:col-span-2 min-h-[280px]" />
    </section>
  );
}

function BentoCard({
  game,
  variant,
  className = "",
}: {
  game: Game;
  variant: "hot" | "small" | "wide";
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.05 }}
      whileHover={{ scale: 1.015 }}
      className={"group relative " + className}
    >
      <Link
        to="/play/$slug"
        params={{ slug: game.slug }}
        className="block h-full overflow-hidden rounded-2xl bg-[#1a1a1a] ring-1 ring-border shadow-tile transition-shadow group-hover:shadow-tile-hover"
      >
        <div className="relative h-full w-full">
          <img
            src={game.thumbnail_url}
            alt={game.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

          {variant === "hot" && (
            <div className="absolute top-3 left-3">
              <HotBadge />
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/60">
              {game.category}
            </p>
            <h3
              className={
                "mt-0.5 font-extrabold text-white drop-shadow-lg " +
                (variant === "hot"
                  ? "text-2xl md:text-3xl"
                  : variant === "wide"
                    ? "text-lg md:text-xl"
                    : "text-sm")
              }
            >
              {game.title}
            </h3>
          </div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex h-14 w-14 items-center justify-center rounded-full gradient-primary shadow-glow">
              <Play className="h-6 w-6 fill-primary-foreground text-primary-foreground" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
