import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Home, Flame, Shuffle, Sparkles, LayoutGrid, Gamepad2 } from "lucide-react";
import { getRandomGame } from "@/lib/games";

type Item = {
  label: string;
  icon: typeof Home;
  to?: string;
  hash?: string;
  action?: "random";
};

const ITEMS: Item[] = [
  { label: "Home", icon: Home, to: "/" },
  { label: "Trending", icon: Flame, to: "/", hash: "trending" },
  { label: "Random", icon: Shuffle, action: "random" },
  { label: "New", icon: Sparkles, to: "/", hash: "new-featured" },
  { label: "Categories", icon: LayoutGrid, to: "/", hash: "categories" },
];

export function SideNav() {
  const navigate = useNavigate();
  const { location } = useRouterState();

  const handleClick = (item: Item) => {
    if (item.action === "random") {
      const g = getRandomGame();
      navigate({ to: "/play/$slug", params: { slug: g.slug } });
      return;
    }
    if (item.hash) {
      const el = document.getElementById(item.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
  };

  return (
    <aside className="hidden md:flex sticky top-0 h-screen w-16 lg:w-20 shrink-0 flex-col items-center gap-1 border-r border-border/40 bg-[oklch(0.13_0.02_280)]/90 backdrop-blur-xl py-4 z-40">
      <Link
        to="/"
        className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl gradient-primary shadow-glow"
        aria-label="Home"
      >
        <Gamepad2 className="h-5 w-5 text-primary-foreground" />
      </Link>

      <nav className="flex flex-col items-center gap-1 w-full px-2">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          const isHomeActive =
            item.to === "/" && !item.hash && location.pathname === "/";
          const content = (
            <div
              className={
                "group relative flex w-full flex-col items-center gap-1 rounded-xl px-1 py-2.5 text-[10px] font-medium transition " +
                (isHomeActive
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:bg-surface hover:text-foreground")
              }
            >
              <Icon className="h-5 w-5" />
              <span className="leading-none">{item.label}</span>
              {isHomeActive && (
                <span className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-r-full bg-primary" />
              )}
            </div>
          );

          if (item.action || item.hash) {
            return (
              <button
                key={item.label}
                onClick={() => handleClick(item)}
                className="w-full"
                aria-label={item.label}
              >
                {content}
              </button>
            );
          }
          return (
            <Link key={item.label} to={item.to!} className="w-full" aria-label={item.label}>
              {content}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
