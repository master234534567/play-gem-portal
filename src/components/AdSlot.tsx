import { Megaphone } from "lucide-react";

type Props = {
  /** "leaderboard" 728x90-ish, "billboard" wider hero, "rectangle" 300x250-ish */
  size?: "leaderboard" | "billboard" | "rectangle";
  /** Slot id — useful when wiring to a real ad network (AdSense, Playwire, etc.) */
  slotId?: string;
  label?: string;
  className?: string;
};

/**
 * Ad placement slot. Renders a styled placeholder by default.
 *
 * To wire up a real ad network later (e.g. Google AdSense, Playwire, Ezoic):
 *   1. Load the network's script in src/routes/__root.tsx
 *   2. Replace the placeholder <div> below with the network's ad tag,
 *      using `slotId` as the ad unit id.
 */
export function AdSlot({
  size = "leaderboard",
  slotId,
  label = "Advertisement",
  className = "",
}: Props) {
  const heightClass =
    size === "billboard"
      ? "min-h-[180px] md:min-h-[250px]"
      : size === "rectangle"
        ? "min-h-[250px]"
        : "min-h-[90px] md:min-h-[120px]";

  const maxWidthClass =
    size === "rectangle" ? "max-w-[336px]" : size === "billboard" ? "max-w-[970px]" : "max-w-[970px]";

  return (
    <div className={`mx-auto w-full ${maxWidthClass} ${className}`}>
      <div className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
        <Megaphone className="h-3 w-3" />
        {label}
      </div>
      <div
        data-ad-slot={slotId}
        className={`flex ${heightClass} w-full items-center justify-center overflow-hidden rounded-2xl bg-surface/40 ring-1 ring-dashed ring-border text-xs text-muted-foreground/60`}
      >
        {/* Replace this placeholder with your ad network embed */}
        <span>Ad space {slotId ? `· ${slotId}` : ""}</span>
      </div>
    </div>
  );
}
