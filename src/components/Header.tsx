import { Link, useNavigate } from "@tanstack/react-router";
import { Search, Shuffle, Gamepad2, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { getRandomGame } from "@/lib/games";

type Props = {
  query: string;
  onQueryChange: (q: string) => void;
  showSearch?: boolean;
};

export function Header({ query, onQueryChange, showSearch = true }: Props) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const playRandom = () => {
    const g = getRandomGame();
    navigate({ to: "/play/$slug", params: { slug: g.slug } });
  };

  return (
    <header className="sticky top-0 z-50 glass">
      <div className="mx-auto flex max-w-[1600px] items-center gap-3 px-4 py-3 md:gap-5 md:px-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary shadow-glow">
            <Gamepad2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="hidden text-lg font-bold tracking-tight sm:block">
            Play<span className="text-primary">Verse</span>
          </span>
        </Link>

        {showSearch && (
          <div className="relative flex-1 max-w-xl">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search games…  (⌘K)"
              className="w-full rounded-full bg-surface/80 ring-1 ring-border pl-10 pr-9 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
            {query && (
              <button
                onClick={() => onQueryChange("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        )}

        <button
          onClick={playRandom}
          className="ml-auto inline-flex items-center gap-2 rounded-full gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow hover:brightness-110 active:scale-95 transition"
        >
          <Shuffle className="h-4 w-4" />
          <span className="hidden sm:inline">Random</span>
        </button>
      </div>
    </header>
  );
}
