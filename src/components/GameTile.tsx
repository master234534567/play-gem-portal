import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, Play, Sparkles } from "lucide-react";
import type { Game } from "@/lib/games";

type Props = { game: Game; index?: number };

export function GameTile({ game, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.025, 0.4), ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.04 }}
      className="group relative"
    >
      <Link
        to="/play/$slug"
        params={{ slug: game.slug }}
        className={`block overflow-hidden rounded-2xl bg-surface shadow-tile transition-shadow duration-300 group-hover:shadow-tile-hover ring-1 ${
          game.sponsored
            ? "ring-2 ring-accent/60 shadow-glow"
            : "ring-border"
        }`}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={game.thumbnail_url}
            alt={game.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const img = e.currentTarget;
              if (img.dataset.fallback) return;
              img.dataset.fallback = "1";
              img.src = `https://placehold.co/320x195/1a1a1a/cccccc?text=${encodeURIComponent(game.title)}`;
            }}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent opacity-90" />

          <div className="absolute top-2 left-2 flex items-center gap-1.5">
            <div className="rounded-full bg-background/70 backdrop-blur px-2 py-0.5 text-[10px] font-semibold text-foreground/90 ring-1 ring-border">
              {game.category}
            </div>
            {game.sponsored && (
              <div className="inline-flex items-center gap-1 rounded-full gradient-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground shadow-glow">
                <Sparkles className="h-2.5 w-2.5" /> Sponsored
              </div>
            )}
          </div>
          <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-background/70 backdrop-blur px-2 py-0.5 text-[10px] font-semibold text-accent ring-1 ring-border">
            <Star className="h-3 w-3 fill-current" /> {game.rating}
          </div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex h-14 w-14 items-center justify-center rounded-full gradient-primary shadow-glow">
              <Play className="h-6 w-6 fill-primary-foreground text-primary-foreground" />
            </div>
          </div>
        </div>
        <div className="px-3 py-2.5">
          <h3 className="truncate text-sm font-semibold text-foreground">{game.title}</h3>
          {game.sponsored && game.sponsorName && (
            <p className="truncate text-[10px] text-accent/90 font-medium">{game.sponsorName}</p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
