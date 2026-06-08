import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}
function formatTime(iso) {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function MatchCard({ match }) {

  const home = match.teams.home;
  const away = match.teams.away;
  const isLive = match.fixture.status.long === "live";
  const isFinished = match.fixture.status.long === "finished";

  return (
    <div className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/40">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          {match.stage}
        </span>
        {isLive ? (
          <span className="flex items-center gap-1.5 rounded-full bg-destructive/15 px-2 py-0.5 text-xs font-semibold text-destructive">
            <span className="size-1.5 animate-pulse rounded-full bg-destructive" />
            LIVE {match.minute}&apos;
          </span>
        ) : (
          <span className="font-mono text-xs text-muted-foreground">
            {formatDate(match.fixture.date)} · {formatTime(match.fixture.date)}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <TeamRow
          flag={home?.logo}
          name={home?.name ?? "TBD"}
          score={match.goals.home}
          active={isLive || isFinished}
        />
        <TeamRow
          flag={away?.logo}
          name={away?.name ?? "TBD"}
          score={match.goals.away}
          active={isLive || isFinished}
        />
      </div>

      <div className="mt-3 flex items-center gap-1.5 border-t border-border pt-3 text-xs text-muted-foreground">
        <MapPin className="size-3.5 shrink-0" />
        <span className="truncate">
          {match.fixture.venue.name}, {match.fixture.venue.city}
        </span>
      </div>
    </div>
  );
}

function TeamRow({ flag, name, score, active }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="flex min-w-0 items-center gap-2.5">
        <span className="text-xl leading-none" aria-hidden>
          <img src={flag} alt="🏳️" className="w-8 h-8" />
        </span>
        <span className="truncate font-medium">{name}</span>
      </span>
      <span
        className={cn(
          "min-w-6 text-right text-lg font-bold tabular-nums",
          active ? "text-foreground" : "text-muted-foreground",
        )}
      >
        {score ?? "-"}
      </span>
    </div>
  );
}
