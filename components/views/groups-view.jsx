"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

export function GroupsView() {
  const [active, setActive] = useState("all");
  const { standings, loading } = useApp();

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <span className="text-muted-foreground">
          Loading standings...
        </span>
      </div>
    );
  }

  const groups =
    standings?.filter(
      (g) => g[0]?.group !== "Ranking of third-placed teams"
    ) || [];

  const shown =
    active === "all"
      ? groups
      : groups.filter(
          (g) => g[0]?.group === active
        );

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Group Standings
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Top two teams from each group qualify automatically.
            The best third-placed teams also advance.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <GroupChip
            label="All"
            active={active === "all"}
            onClick={() => setActive("all")}
          />

          {groups.map((group) => (
            <GroupChip
              key={group[0]?.group}
              label={group[0]?.group.replace("Group ", "")}
              active={active === group[0]?.group}
              onClick={() => setActive(group[0]?.group)}
            />
          ))}
        </div>
      </header>

      <div className="grid gap-5 lg:grid-cols-2">
        {shown.map((group) => (
          <GroupTable
            key={group[0]?.group}
            group={group}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="size-3 rounded-sm bg-primary" />
          Qualified (Top 2)
        </span>

        <span className="flex items-center gap-1.5">
          <span className="size-3 rounded-sm bg-accent" />
          Best third-place contention
        </span>
      </div>
    </div>
  );
}

function GroupChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "min-w-9 rounded-md border px-2.5 py-1.5 text-sm font-semibold transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border text-muted-foreground hover:bg-secondary"
      )}
    >
      {label}
    </button>
  );
}

function GroupTable({ group }) {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h2 className="text-sm font-bold uppercase tracking-wider">
          {group[0]?.group}
        </h2>

        <span className="font-mono text-xs text-muted-foreground">
          Matchday 0 / 3
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-4 py-2 text-left font-medium">
                #
              </th>

              <th className="py-2 text-left font-medium">
                Team
              </th>

              <th className="px-2 py-2 text-center font-medium">
                P
              </th>

              <th className="px-2 py-2 text-center font-medium">
                W
              </th>

              <th className="px-2 py-2 text-center font-medium">
                D
              </th>

              <th className="px-2 py-2 text-center font-medium">
                L
              </th>

              <th className="px-2 py-2 text-center font-medium">
                GD
              </th>

              <th className="px-4 py-2 text-center font-medium">
                Pts
              </th>
            </tr>
          </thead>

          <tbody>
            {group.map((team, index) => (
              <tr
                key={team.team.id}
                className="border-b border-border/60 last:border-0"
              >
                <td className="px-4 py-2.5">
                  <span
                    className={cn(
                      "flex size-5 items-center justify-center rounded-sm text-xs font-bold",
                      index < 2
                        ? "bg-primary text-primary-foreground"
                        : index === 2
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {team.rank}
                  </span>
                </td>

                <td className="py-2.5">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={team.team.logo}
                      alt={team.team.name}
                      className="h-6 w-6 object-contain"
                    />

                    <span className="font-medium">
                      {team.team.name}
                    </span>
                  </div>
                </td>

                <td className="px-2 py-2.5 text-center tabular-nums text-muted-foreground">
                  {team.all.played}
                </td>

                <td className="px-2 py-2.5 text-center tabular-nums">
                  {team.all.win}
                </td>

                <td className="px-2 py-2.5 text-center tabular-nums">
                  {team.all.draw}
                </td>

                <td className="px-2 py-2.5 text-center tabular-nums">
                  {team.all.lose}
                </td>

                <td className="px-2 py-2.5 text-center tabular-nums">
                  {team.goalsDiff > 0
                    ? `+${team.goalsDiff}`
                    : team.goalsDiff}
                </td>

                <td className="px-4 py-2.5 text-center font-bold tabular-nums">
                  {team.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}