import { Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SPONSORED_GAMES } from "@/lib/games";

type Props = {
  size?: "leaderboard" | "billboard" | "rectangle";
  slotId?: string;
  label?: string;
  className?: string;
};

/**
 * House-ad slot. Renders a styled promo for a sponsored game so the space
 * always looks intentional. To wire a real ad network later, swap the inner
 * <Link> for the network's ad tag and use `slotId` as the ad unit id.
 */
export function AdSlot({
  size = "leaderboard",
  slotId,
  label = "Sponsored",
  className = "",
}: Props) {
  const heightClass =
    size === "billboard"
      ? "min-h-[180px] md:min-h-[220px]"
      : size === "rectangle"
        ? "min-h-[250px]"
        : "min-h-[110px] md:min-h-[140px]";

  const maxWidthClass =
    size === "rectangle" ? "max-w-[336px]" : "max-w-[970px]";

  // Pick a sponsored game deterministically per slotId so the same slot
  // shows the same promo on every render.
  const pool = SPONSORED_GAMES.length > 0 ? SPONSORED_GAMES : [];
  const seed = (slotId ?? "default")
    .split("")
    .reduce((a, c) => a + c.charCodeAt(0), 0);
  const promo = pool.length > 0 ? pool[seed % pool.length] : null;

  return (
    <div className={`mx-auto w-full ${maxWidthClass} ${className}`}>
      <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
        <Sparkles className="h-3 w-3 text-accent" />
        {label}
      </div>

      {promo ? (
        <Link
          to="/play/$slug"
          params={{ slug: promo.slug }}
          data-ad-slot={slotId}
          className={`group relative flex ${heightClass} w-full items-center gap-4 overflow-hidden rounded-2xl ring-1 ring-border bg-surface/60 hover:ring-accent/60 transition`}
        >
          <img
            src={promo.thumbnail_url}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-30 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 gradient-hero opacity-80" />
          <div className="relative z-10 flex w-full items-center justify-between gap-4 p-4 md:p-6">
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-accent">
                {promo.sponsorName ?? "Featured"}
              </p>
              <h3 className="truncate text-lg md:text-2xl font-extrabold">
                Play {promo.title} now
              </h3>
              <p className="hidden md:block text-xs text-foreground/70">
                Instant browser play — no downloads, no signup.
              </p>
            </div>
            <span className="shrink-0 rounded-full gradient-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-glow">
              Play →
            </span>
          </div>
        </Link>
      ) : (
        <div
          data-ad-slot={slotId}
          className={`flex ${heightClass} w-full items-center justify-center overflow-hidden rounded-2xl bg-surface/40 ring-1 ring-border text-xs text-muted-foreground/60`}
        >
          <span>Promo space</span>
        </div>
      )}
    </div>
  );
}
