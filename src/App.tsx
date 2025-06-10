import { useState } from "react";
import "./App.css";
import ActionBar from "./components/ActionBar";
import { PlayersList } from "./components/PlayersList";
import TeamList from "./components/TeamsList";
import type { Team } from "./models/Models";

function App() {
  const [teams, setTeams] = useState<Team[]>([
    // { id: 1, color: "White", players: [], rating: 0 },
    // { id: 2, color: "Black", players: [], rating: 0 },
  ]);

  return (
    <div className="w-full h-dvh justify-center items-center overflow-auto dark:bg-gray-800">
      <div className="w-full h-full flex items-center flex-col p-5 lg:p-10">
        <h1 className="text-6xl text-gray-700 dark:text-gray-100 mb-5">
          Team Splitting
        </h1>
        <ActionBar />
        <div className="grid grid-cols-12 gap-2 w-full">
          <div className="col-span-5 lg:col-span-2">
            <PlayersList setTeams={setTeams} />
          </div>
          <div className="col-span-7 lg:col-span-10">
            <div className="flex flex-row flex-wrap lg:flex-nowrap gap-2 justify-start items-start">
              {teams.map((team, i) => (
                <TeamList key={i} team={team} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
