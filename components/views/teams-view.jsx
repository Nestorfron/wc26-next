"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function TeamsView() {
  const { teams, getPlayers, playersForTeam, loading } = useApp();

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loadingPlayers, setLoadingPlayers] = useState(false);


  const filtered = useMemo(() => {
    return (teams || []).filter((item) =>
      item.team.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [teams, query]);

  const handleTeamClick = async (team) => {
    setSelected(team);
    setLoadingPlayers(true);

    try {
      const data = await getPlayers(team.team.id);

      setPlayers(data || []);
    } catch (error) {
      console.error("PLAYERS ERROR:", error);
      setPlayers([]);
    } finally {
      setLoadingPlayers(false);
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight">
          Teams & Players
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Browse all qualified teams and view their squad information.
        </p>
      </header>

      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search team..."
          className="pl-9"
        />
      </div>

      {loading ? (
        <div className="rounded-xl border border-border p-8 text-center text-muted-foreground">
          Loading teams...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((item) => (
              <button
                key={item.team.id}
                onClick={() => handleTeamClick(item)}
                className={cn(
                  "group rounded-xl border border-border bg-card p-4 transition-all",
                  "hover:border-primary/50 hover:-translate-y-1"
                )}
              >
                <div className="flex flex-col items-center">
                  <img
                    src={item.team.logo}
                    alt={item.team.name}
                    className="h-16 w-16 object-contain"
                  />

                  <h3 className="mt-3 text-center font-semibold">
                    {item.team.name}
                  </h3>

                  <span className="text-xs text-muted-foreground">
                    {item.team.code}
                  </span>

                  <span className="mt-2 text-center text-xs text-muted-foreground">
                    {item.team.country}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="rounded-xl border border-border p-8 text-center text-muted-foreground">
              No teams found.
            </div>
          )}
        </>
      )}

      <TeamDialog
        team={selected}
        players={playersForTeam}
        loadingPlayers={loadingPlayers}
        onClose={() => {
          setSelected(null);
          setPlayers([]);
        }}
      />
    </div>
  );
}

function TeamDialog({
  team,
  players,
  loadingPlayers,
  onClose,
}) {
  return (
    <Dialog
      open={!!team}
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        {team && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <img
                  src={team.team.logo}
                  alt={team.team.name}
                  className="h-10 w-10 object-contain"
                />

                <span>{team.team.name}</span>
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-3">
              <Stat
                label="Country"
                value={team.team.country}
              />

              <Stat
                label="Code"
                value={team.team.code}
              />

              <Stat
                label="Stadium"
                value={team.venue.name}
              />

              <Stat
                label="City"
                value={team.venue.city}
              />
            </div>

            <div>
              <h3 className="mb-3 font-semibold">
                Squad
              </h3>

              {loadingPlayers ? (
                <div className="rounded-xl border border-border p-6 text-center text-muted-foreground">
                  Loading players...
                </div>
              ) : (
                <>

                  {Array.isArray(players) && players.length > 0 ? (
                    <div className="space-y-2">
                      {players.map((player, index) => (
                        <div
                          key={player?.id || index}
                          className="flex items-center gap-3 rounded-lg border p-3"
                        >
                          <img src={player?.photo} alt={player?.name} className="me-4 h-10 w-10 object-contain rounded-full" />
                          <div className="font-medium">
                            {player?.name ||
                              "Unknown player"} - {player?.number || "Unknown number"} - {player?.position || "Unknown position"}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-xl border border-border p-6 text-center text-muted-foreground">
                      No players found.
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-lg border border-border bg-secondary/40 p-3 text-center">
      <div className="text-sm font-semibold break-words">
        {value}
      </div>

      <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
    </div>
  );
}