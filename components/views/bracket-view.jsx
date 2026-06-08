"use client";

import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { bracket, leftBracket, rightBracket } from "../../data/bracket-data";

export function BracketView() {

  return (
    <div className="space-y-6 m-auto max-w-7xl">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight">
          Knockout Bracket
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Road to the World Cup 2026 Final
        </p>
      </header>

      <div className="overflow-x-auto pb-4">
      <div className="flex min-w-max items-center gap-6">
          <BracketSide
            data={leftBracket}
            columns={[
              { key: "round32", title: "Round of 32" },
              { key: "round16", title: "Round of 16" },
              { key: "quarters", title: "Quarter-finals" },
              { key: "semi", title: "Semi-finals" },
            ]}
          />

          <div className="flex flex-col items-center">
            <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Final
            </h2>

            <BracketCard tie={bracket.final[0]} isFinal />
          </div>

          <BracketSide
            data={rightBracket}
            columns={[
              { key: "semi", title: "Semi-finals" },
              { key: "quarters", title: "Quarter-finals" },
              { key: "round16", title: "Round of 16" },
              { key: "round32", title: "Round of 32" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function BracketSide({ data, columns }) {
  return (
    <div className="flex gap-2">
      {columns.map((col) => (
        <div key={col.key} className="flex w-48 flex-col">
          <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {col.title}
          </h2>

          <div
            className={cn(
              "flex flex-col",
              col.key === "round32" && "gap-4",
              col.key === "round16" && "gap-16 pt-10",
              col.key === "quarters" && "gap-32 pt-24",
              col.key === "semi" && "pt-48"
            )}
          >
            {data[col.key]?.map((tie) => (
              <BracketCard key={tie.id} tie={tie} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function BracketCard({ tie, isFinal }) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card",
        isFinal
          ? "border-primary/60 shadow-[0_0_0_1px] shadow-primary/20"
          : "border-border"
      )}
    >
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {tie.label}
        </span>

        {isFinal && <Trophy className="size-4 text-primary" />}
      </div>

      <div className="divide-y divide-border/60">
        <BracketTeam name={tie.homeName} />
        <BracketTeam name={tie.awayName} />
      </div>
    </div>
  );
}

function BracketTeam({ name }) {
  return (
    <div className="flex items-center justify-between gap-2 px-3 py-2">
      <span className="flex min-w-0 items-center gap-2">
        <span className="text-base leading-none">🏆</span>

        <span className="truncate text-sm text-muted-foreground">{name}</span>
      </span>

      <span className="text-sm font-bold tabular-nums text-muted-foreground">
        -
      </span>
    </div>
  );
}
