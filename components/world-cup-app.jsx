"use client";

import { useState } from "react";
import { CalendarDays, LayoutGrid, Trophy, Users, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { tournament } from "@/lib/data";
import { useApp } from "@/context/AppContext";
import { OverviewView } from "@/components/views/overview-view";
import { ScheduleView } from "@/components/views/schedule-view";
import { GroupsView } from "@/components/views/groups-view";
import { BracketView } from "@/components/views/bracket-view";
import { TeamsView } from "@/components/views/teams-view";
import { Button } from "@/components/ui/button";

const NAV = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "schedule", label: "Matches", icon: CalendarDays },
  { id: "groups", label: "Groups", icon: LayoutGrid },
  { id: "bracket", label: "Bracket", icon: Trophy },
  { id: "teams", label: "Teams", icon: Users },
];


export function WorldCupApp() {
  const [view, setView] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { fixtures, loading } = useApp();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-svh bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <button
            onClick={() => setView("overview")}
            className="flex items-center gap-3 text-left"
            aria-label="Go to overview"
          >
            <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Trophy className="size-5" />
            </span>
            <span className="leading-tight">
              <span className="block font-mono text-xs uppercase tracking-widest text-primary">
                World Cup
              </span>
              <span className="block text-base font-bold tracking-tight">
                2026
              </span>
            </span>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => {
              const Icon = item.icon;
              const active = view === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <span className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground">
              {tournament.hosts}
            </span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </Button>
        </div>

        {mobileOpen && (
          <nav className="border-t border-border bg-background px-4 py-2 md:hidden">
            {NAV.map((item) => {
              const Icon = item.icon;
              const active = view === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setView(item.id);
                    setMobileOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/60",
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        {view === "overview" && <OverviewView onNavigate={(v) => setView(v)} />}
        {view === "schedule" && <ScheduleView />}
        {view === "groups" && <GroupsView />}
        {view === "bracket" && <BracketView />}
        {view === "teams" && <TeamsView />}
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:px-6">
          <p>
            {tournament.name} · {tournament.hosts}
          </p>
          <p className="font-mono">Sample data for demonstration only.</p>
        </div>
      </footer>
    </div>
  );
}
