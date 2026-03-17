import { cn } from "@/lib/utils";

export function Monogram({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-lg bg-secondary text-foreground font-semibold select-none",
        className,
      )}
    >
      {initials}
    </div>
  );
}
