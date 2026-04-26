import { useCallback, useEffect, useRef, useState } from "react";
import { GameTile } from "@/components/GameTile";
import type { Game } from "@/lib/games";

type Props = {
  games: Game[];
  initialCount?: number;
  step?: number;
};

/**
 * Renders a responsive game grid that lazily reveals more tiles as the user
 * scrolls. Loads `initialCount` games first, then `step` more each time the
 * sentinel scrolls into view.
 */
export function InfiniteGameGrid({
  games,
  initialCount = 20,
  step = 12,
}: Props) {
  const [visible, setVisible] = useState(Math.min(initialCount, games.length));
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Reset when the underlying list changes (e.g. category switch).
  useEffect(() => {
    setVisible(Math.min(initialCount, games.length));
  }, [games, initialCount]);

  const loadMore = useCallback(() => {
    setVisible((v) => Math.min(v + step, games.length));
  }, [games.length, step]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || visible >= games.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) loadMore();
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible, games.length, loadMore]);

  const slice = games.slice(0, visible);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {slice.map((g, i) => (
          <GameTile key={g.id} game={g} index={i} />
        ))}
      </div>

      {visible < games.length && (
        <div ref={sentinelRef} className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            Loading more games…
          </div>
        </div>
      )}
    </>
  );
}
