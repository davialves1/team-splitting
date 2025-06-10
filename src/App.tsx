import { useState } from "react";
import "./App.css";
import { TeamList } from "./components/List";
import { PlayersList } from "./components/ListOfPlayer";
import type { Player } from "./models/Player";

function App() {
  const [teams, setTeams] = useState<TeamPlayers[]>([
    { teamId: 1, players: [] },
  ]);

  return (
    <div className="w-dvh justify-center items-center overflow-hidden">
      <h1 className="text-2xl text-gray-700 mb-5">Team Splitting</h1>

      <div className="grid grid-cols-12">
        <div className="col-start-1 col-end-2">
          <PlayersList setTeams={setTeams} />
        </div>
        <div className="flex flex-row gap-2 justify-start items-start col-start-3 col-end-12">
          {teams.map((teamPlayers, i) => (
            <TeamList
              players={teamPlayers.players}
              key={i}
              team="Black Color Shirt"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

export type TeamPlayers = { teamId: number; players: Player[] };
