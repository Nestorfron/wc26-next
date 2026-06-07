"use client";

import { useMemo, useState } from "react";
import { useApp } from "@/context/AppContext";
import { MatchCard } from "@/components/match-card";
import { cn } from "@/lib/utils";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "Live", label: "Live" },
  { id: "Not Started", label: "Upcoming" },
  { id: "Finished", label: "Finished" },
];

export function ScheduleView() {
  const [filter, setFilter] = useState("all");
  const { fixtures, loading } = useApp();

  const filtered = useMemo(() => {
    const list =
      filter === "all" ? fixtures : fixtures.filter((m) => m.fixture.status.long === filter);
    return [...list].sort((a, b) => +new Date(a.date) - +new Date(b.date));
  }, [filter]);

  // Group by date label
  const byDay = useMemo(() => {
    const map = new Map();
    for (const m of filtered) {
      const key = new Date(m.fixture.date).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(m);
    }
    return [...map.entries()];
  }, [filtered]);

  const liveCount = fixtures.filter((m) => m.fixture.status.long === "live").length;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Matches</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Fixtures, results and live scores across the tournament.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f, index) => (
            <button
              key={index + 1}
              onClick={() => setFilter(f.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors",
                filter === f.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:bg-secondary",
              )}
            >
              {f.label}
              {f.id === "live" && liveCount > 0 && (
                <span className="flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                  {liveCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </header>

      {byDay.length === 0 ? (
        <p className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
          No matches in this category.
        </p>
      ) : (
        <div className="space-y-8">
          {byDay.map(([day, dayMatches, index]) => (
            <section key={day + index}>
              <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {day}
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {dayMatches.map((m, index) => (
                  <MatchCard key={index + 1} match={m} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
