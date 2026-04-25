export function GameSkeleton({ count = 12 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-2xl ring-1 ring-border">
          <div className="aspect-[4/3] skeleton" />
          <div className="p-3">
            <div className="h-3 w-2/3 rounded-full skeleton" />
          </div>
        </div>
      ))}
    </>
  );
}

export function IframeSkeleton() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl skeleton flex items-center justify-center">
      <div className="text-sm font-medium text-muted-foreground">Loading game…</div>
    </div>
  );
}
