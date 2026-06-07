"use client";

import { matches, topScorers, teamMap, tournament, teams } from "@/lib/data";
import { MatchCard } from "@/components/match-card";
import { ArrowRight, Flag, MapPin, Star, Users } from "lucide-react";
import { useApp } from "@/context/AppContext";

export function OverviewView({ onNavigate }) {
  const { fixtures, standings, teams, loading } = useApp();
  const liveMatches = fixtures.filter((m) => m.fixture.status.long === "live");
  const upcoming = fixtures.filter((m) => m.fixture.status.long === "Not Started").slice(0, 3);
  const scorers = topScorers.slice(0, 5);


  const stats = [
    { label: "Teams", value: teams.length , icon: Users },
    { label: "Matches", value: fixtures.length , icon: Flag },
    { label: "Host cities", value: tournament.venuesCount, icon: MapPin },
    { label: "Confederations", value: 6, icon: Star },
  ];

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="relative grid gap-6 p-6 sm:p-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="flex flex-col justify-center">
            <span className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-primary">
              June 11 – July 19, 2026
            </span>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-6xl">
              The biggest World Cup ever.
            </h1>
            <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              48 nations. 104 matches. Three host countries. Follow every
              fixture, group table, knockout tie and the players chasing the
              Golden Boot — all in one place.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate("schedule")}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                View matches
                <ArrowRight className="size-4" />
              </button>
              <button
                onClick={() => onNavigate("bracket")}
                className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
              >
                Knockout bracket
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 self-center">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="rounded-lg border border-border bg-background/50 p-4"
                >
                  <Icon className="mb-3 size-5 text-primary" />
                  <div className="text-3xl font-bold tabular-nums">
                    {s.value}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Live + upcoming */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight">
            Live &amp; upcoming
          </h2>
          <button
            onClick={() => onNavigate("schedule")}
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            All matches <ArrowRight className="size-4" />
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...liveMatches, ...upcoming].slice(0, 6).map((m, index) => (
            <MatchCard key={index +1} match={m} />
          ))}
        </div>
      </section>

      {/* Top scorers + qualified teams snapshot */}
      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold tracking-tight">
              Golden Boot race
            </h2>
            <button
              onClick={() => onNavigate("teams")}
              className="text-sm font-medium text-primary hover:underline"
            >
              Players
            </button>
          </div>
          <ol className="space-y-1">
            {scorers.map((p, i) => {
              const team = teamMap[p.teamId];
              return (
                <li
                  key={p.id}
                  className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-secondary/50"
                >
                  <span className="w-5 text-center font-mono text-sm text-muted-foreground">
                    {i + 1}
                  </span>
                  <span className="text-lg" aria-hidden>
                    {team?.flag}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{p.name}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {team?.name}
                    </span>
                  </span>
                  <span className="text-right">
                    <span className="block font-bold tabular-nums text-primary">
                      {p.goals}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {p.assists} ast
                    </span>
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold tracking-tight">
              Top ranked sides
            </h2>
            <button
              onClick={() => onNavigate("groups")}
              className="text-sm font-medium text-primary hover:underline"
            >
              Groups
            </button>
          </div>
          <ul className="grid grid-cols-2 gap-2">
            {[...teams]
              .sort((a, b) => a.fifaRank - b.fifaRank)
              .slice(0, 8)
              .map((t, index) => (
                <li
                  key={index + 1}
                  className="flex items-center gap-2.5 rounded-md border border-border bg-background/40 px-3 py-2"
                >
                  <span className="text-lg" aria-hidden>
                    {t.flag}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm font-medium">
                    {t.name}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    #{t.fifaRank}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
