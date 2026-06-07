const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;


export async function getFixtures() {
  const res = await fetch(`${API_URL}/fixtures`,
    {
        headers: {
            "X-API-Key": API_KEY
        }
    }
  );

  if (!res.ok) {
    throw new Error("Error obteniendo fixtures");
  }

  return res.json();
}

export async function getStandings() {
  const res = await fetch(`${API_URL}/standings`,
    {
        headers: {
            "X-API-Key": API_KEY
        }
    }
  );

  if (!res.ok) {
    throw new Error("Error obteniendo standings");
  }

  return res.json();
}

export async function getTeams() {
  const res = await fetch(`${API_URL}/teams`,
    {
        headers: {
            "X-API-Key": API_KEY
        }
    }
  );

  if (!res.ok) {
    throw new Error("Error obteniendo equipos");
  }

  return res.json();
}


export async function getPlayersForTeam(teamId) {
  const res = await fetch(`${API_URL}/players/squads/${teamId}`,
    {
        headers: {
            "X-API-Key": API_KEY
        }
    }
  );

  if (!res.ok) {
    throw new Error("Error obteniendo jugadores");
  }

  return res.json();
}

export async function getTopScorers() {
  const res = await fetch(`${API_URL}/top-scorers`,
    {
        headers: {
            "X-API-Key": API_KEY
        }
    }
  );

  if (!res.ok) {
    throw new Error("Error obteniendo top scorers");
  }

  return res.json();
}