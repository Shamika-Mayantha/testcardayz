import { cn } from "@/lib/utils";

export function Logo({
  className,
  wordmark = true,
}: {
  className?: string;
  wordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 48 48"
        className="size-9 shrink-0"
        aria-hidden="true"
      >
        <rect
          x="1.2"
          y="1.2"
          width="45.6"
          height="45.6"
          rx="10"
          className="fill-background/40 stroke-cyan-300/50"
          strokeWidth="1.2"
        />
        <path
          d="M10 31c0-8.2 6.2-14.8 14.6-14.8 5.2 0 9.7 2.5 12.4 6.4"
          className="stroke-cyan-300"
          strokeWidth="2.6"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M16 16.5 33.5 34"
          className="stroke-amber-400"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M28 15.8c5.6 2 9.8 7.4 9.8 14.6"
          className="stroke-fuchsia-400"
          strokeWidth="2.6"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      {wordmark ? (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[11px] font-semibold tracking-[0.28em] text-cyan-200">
            CAR DAYZ
          </span>
          <span className="mt-0.5 font-display text-[10px] tracking-[0.42em] text-fuchsia-300/90">
            LANKA
          </span>
        </span>
      ) : null}
    </span>
  );
}
