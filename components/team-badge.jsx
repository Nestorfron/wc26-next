import { teamMap } from "@/lib/data";
import { cn } from "@/lib/utils";

export function TeamBadge({
  teamId,
  showCode = false,
  className,
  flagClassName,
}) {
  if (!teamId) {
    return (
      <span
        className={cn(
          "flex items-center gap-2 text-muted-foreground",
          className,
        )}
      >
        <span className={cn("text-lg leading-none", flagClassName)}>🏆</span>
        <span className="font-medium">TBD</span>
      </span>
    );
  }
  const team = teamMap[teamId];
  if (!team) return null;
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <span className={cn("text-lg leading-none", flagClassName)} aria-hidden>
        {team.flag}
      </span>
      <span className="font-medium">{showCode ? team.code : team.name}</span>
    </span>
  );
}
