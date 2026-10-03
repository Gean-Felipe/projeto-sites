import { cn } from "@/lib/utils";

/** Elemento gráfico inspirado no arco/sorriso do logo Dente Sim. */
export function Arc({
  className,
  stroke = "currentColor",
  width = 2,
}: {
  className?: string;
  stroke?: string;
  width?: number;
}) {
  return (
    <svg
      viewBox="0 0 400 60"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
      className={cn("pointer-events-none select-none", className)}
    >
      <path
        d="M4 6C60 46 140 56 200 56C260 56 340 46 396 6"
        stroke={stroke}
        strokeWidth={width}
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Divisor de seção com o arco da marca. */
export function ArcDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-4 py-2", className)} aria-hidden="true">
      <span className="h-px w-16 bg-border sm:w-24" />
      <Arc className="h-4 w-20 text-primary" width={4} />
      <span className="h-px w-16 bg-border sm:w-24" />
    </div>
  );
}
