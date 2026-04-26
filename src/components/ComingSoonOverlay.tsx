import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bell, Check, Clock, Sparkles } from "lucide-react";
import type { Game } from "@/lib/games";

const STORAGE_KEY = "playverse:notify";

function getNotified(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return new Set<string>(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

function setNotified(set: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(set)));
  } catch {
    /* ignore */
  }
}

export function ComingSoonOverlay({ game }: { game: Game }) {
  const [notified, setLocal] = useState(false);

  useEffect(() => {
    setLocal(getNotified().has(game.id));
  }, [game.id]);

  const toggle = () => {
    const set = getNotified();
    if (set.has(game.id)) set.delete(game.id);
    else set.add(game.id);
    setNotified(set);
    setLocal(set.has(game.id));
  };

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center overflow-hidden">
      {/* Backdrop image */}
      <img
        src={game.thumbnail_url}
        alt=""
        className="absolute inset-0 h-full w-full object-cover scale-110 blur-2xl opacity-40"
      />
      <div className="absolute inset-0 bg-black/70" />
      <div
        className="absolute inset-0 opacity-60"
        style={{ background: "var(--gradient-glow)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative z-10 mx-4 max-w-md text-center"
      >
        <div className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent ring-1 ring-accent/30">
          <Clock className="h-3.5 w-3.5" /> Coming soon
        </div>
        <h2 className="mt-4 text-3xl md:text-4xl font-black tracking-tight text-white">
          {game.title}
        </h2>
        <p className="mt-3 text-sm md:text-base text-white/70">
          This title isn't quite ready to play yet — we're polishing the final
          touches. Tap the bell and we'll let you know the moment it's live.
        </p>

        <button
          onClick={toggle}
          className={
            "mt-6 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition active:scale-95 " +
            (notified
              ? "bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/15"
              : "gradient-primary text-primary-foreground shadow-glow hover:brightness-110")
          }
        >
          {notified ? (
            <>
              <Check className="h-4 w-4" /> You'll be notified
            </>
          ) : (
            <>
              <Bell className="h-4 w-4" /> Notify me
            </>
          )}
        </button>

        <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] text-white/50">
          <Sparkles className="h-3 w-3" /> Saved to this device
        </div>
      </motion.div>
    </div>
  );
}
