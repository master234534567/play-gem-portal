import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GameTile } from "@/components/GameTile";
import type { Game } from "@/lib/games";

type Props = {
  id?: string;
  title: string;
  games: Game[];
  accent?: string;
};

export function GameRow({ id, title, games, accent }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  if (games.length === 0) return null;

  return (
    <section id={id} className="relative">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div className="flex items-center gap-2">
          {accent && (
            <span className="h-6 w-1 rounded-full" style={{ background: "var(--gradient-primary)" }} />
          )}
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">{title}</h2>
          <span className="text-xs text-muted-foreground">· {games.length}</span>
        </div>
        <div className="hidden md:flex gap-1.5">
          <button
            onClick={() => scroll("left")}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-surface ring-1 ring-border text-muted-foreground hover:text-foreground hover:bg-surface-elevated transition"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-surface ring-1 ring-border text-muted-foreground hover:text-foreground hover:bg-surface-elevated transition"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Mobile: multi-column grid; Desktop: horizontal scroll */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:hidden">
        {games.slice(0, 6).map((g, i) => (
          <GameTile key={g.id} game={g} index={i} />
        ))}
      </div>

      <div
        ref={scrollRef}
        className="no-scrollbar hidden md:flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory"
      >
        {games.map((g, i) => (
          <div
            key={g.id}
            className="snap-start shrink-0 w-[200px] lg:w-[220px]"
          >
            <GameTile game={g} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
