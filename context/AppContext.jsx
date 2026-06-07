"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  getFixtures,
  getStandings,
  getTeams,
  getPlayersForTeam,
} from "@/services/api";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [fixtures, setFixtures] = useState([]);
  const [standings, setStandings] = useState([]);
  const [teams, setTeams] = useState([]);
  const [playersForTeam, setPlayersForTeam] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
        setLoading(true);
      try {
        const [fixturesData, standingsData, teamsData] =
          await Promise.all([
            getFixtures(),
            getStandings(),
            getTeams(),
          ]);

        setFixtures(fixturesData.response);
        setStandings(standingsData.response[0].league.standings);
        setTeams(teamsData.response)
     
        


        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);


  const getPlayers = async (teamId) => {
    const players = await getPlayersForTeam(teamId);
    setPlayersForTeam(players.players);
  }

  return (
    <AppContext.Provider
      value={{
        fixtures,
        standings,
        teams,
        playersForTeam,
        getPlayers,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);