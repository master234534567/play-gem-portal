import { Flame } from "lucide-react";

export function HotBadge({ className = "" }: { className?: string }) {
  return (
    <div
      className={
        "inline-flex items-center gap-1 rounded-full bg-orange-500/85 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white ring-1 ring-orange-300/40 shadow-[0_4px_12px_-2px_rgba(249,115,22,0.6)] " +
        className
      }
    >
      <Flame className="h-3 w-3 fill-white" />
      Hot
    </div>
  );
}
