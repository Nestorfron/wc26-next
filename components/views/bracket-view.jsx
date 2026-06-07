"use client";

import { bracket, teamMap } from "@/lib/data";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const COLUMNS = [
  { key: "round32", title: "Round of 32" },
  { key: "round16", title: "Round of 16" },
  { key: "quarter", title: "Quarter-finals" },
  { key: "semi", title: "Semi-finals" },
  { key: "final", title: "Final" },
];

export function BracketView() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight">
          Knockout bracket
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          The road to the final at MetLife Stadium on July 19, 2026. Showing one
          half of the draw.
        </p>
      </header>

      <div className="overflow-x-auto pb-4">
        <div className="flex min-w-max gap-6">
          {COLUMNS.map((col) => {
            const ties = bracket[col.key];
            return (
              <div
                key={col.key}
                className="flex w-60 flex-col justify-around gap-4"
              >
                <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {col.title}
                </h2>
                <div className="flex flex-1 flex-col justify-around gap-4">
                  {ties.map((tie) => (
                    <BracketCard
                      key={tie.id}
                      tie={tie}
                      isFinal={col.key === "final"}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function BracketCard({ tie, isFinal }) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card",
        isFinal
          ? "border-primary/60 shadow-[0_0_0_1px] shadow-primary/20"
          : "border-border",
      )}
    >
      <div className="flex items-center justify-between border-b border-border px-3 py-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {tie.label}
        </span>
        {isFinal && <Trophy className="size-3.5 text-primary" />}
      </div>
      <div className="divide-y divide-border/60">
        <BracketTeam teamId={tie.homeId} score={tie.homeScore} />
        <BracketTeam teamId={tie.awayId} score={tie.awayScore} />
      </div>
    </div>
  );
}

function BracketTeam({ teamId, score }) {
  const team = teamId ? teamMap[teamId] : null;
  return (
    <div className="flex items-center justify-between gap-2 px-3 py-2">
      <span className="flex min-w-0 items-center gap-2">
        <span className="text-base leading-none" aria-hidden>
          {team?.flag ?? "🏆"}
        </span>
        <span
          className={cn(
            "truncate text-sm",
            team ? "font-medium" : "text-muted-foreground",
          )}
        >
          {team?.name ?? "TBD"}
        </span>
      </span>
      <span className="text-sm font-bold tabular-nums text-muted-foreground">
        {score ?? "-"}
      </span>
    </div>
  );
}
