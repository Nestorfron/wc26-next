"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  getFixtures,
  getStandings,
  getTeams,
  getPlayersForTeam,
  getTopScorers,
} from "@/services/api";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [fixtures, setFixtures] = useState([]);
  const [standings, setStandings] = useState([]);
  const [teams, setTeams] = useState([]);
  const [playersForTeam, setPlayersForTeam] = useState([]);
  const [topScorers, setTopScorers] = useState([]);
  const [league, setLeage] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
        setLoading(true);
      try {
        const [fixturesData, standingsData, teamsData, topScorersData] =
          await Promise.all([
            getFixtures(),
            getStandings(),
            getTeams(),
            getTopScorers(),
          ]);

        setFixtures(fixturesData.response);
        setLeage(standingsData.response[0].league);
        setStandings(standingsData.response[0].league.standings);
        setTeams(teamsData.response)
        setTopScorers(topScorersData.response);
     


        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    

    loadData();
  }, []);


  const stadiums = [
    ...new Map(
      fixtures.map(match => [
        match.fixture.venue.name,
        {
          id: match.fixture.venue.id,
          name: match.fixture.venue.name,
          city: match.fixture.venue.city,
        }
      ])
    ).values()
  ];





  const getPlayers = async (teamId) => {
    const players = await getPlayersForTeam(teamId);
    setPlayersForTeam(players.players);
  }

  return (
    <AppContext.Provider
      value={{
        league,
        fixtures,
        standings,
        teams,
        playersForTeam,
        topScorers,
        stadiums,
        getPlayers,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);