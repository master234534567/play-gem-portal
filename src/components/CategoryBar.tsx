import { CATEGORIES } from "@/lib/games";

type Props = {
  active: string;
  onChange: (c: string) => void;
};

export function CategoryBar({ active, onChange }: Props) {
  return (
    <div className="sticky top-[64px] z-40 glass border-b border-border/50">
      <div className="mx-auto max-w-[1600px] px-4 md:px-6">
        <div className="no-scrollbar flex gap-2 overflow-x-auto py-3">
          {CATEGORIES.map((c) => {
            const isActive = c === active;
            return (
              <button
                key={c}
                onClick={() => onChange(c)}
                className={
                  "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition ring-1 " +
                  (isActive
                    ? "gradient-primary text-primary-foreground ring-transparent shadow-glow"
                    : "bg-surface/60 text-foreground/80 ring-border hover:bg-surface hover:text-foreground")
                }
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
