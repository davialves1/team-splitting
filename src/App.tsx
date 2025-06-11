import { useState } from "react";
import "./App.css";
import ActionBar from "./components/ActionBar";
import { PlayersList } from "./components/PlayersList";
import TeamList from "./components/TeamsList";
import type { Team } from "./models/Models";
import Alert from "./components/Alert";

function App() {
  const [teams, setTeams] = useState<Team[]>([]);

  const [showRating, setShowRating] = useState(true);

  const playersCount = teams
    .map((team) => team.players.length)
    .reduce((a, b) => a + b, 0);

  const notEnoughPlayers = playersCount > 1 && playersCount < 10;

  return (
    <div className="w-full h-dvh justify-center items-center overflow-auto dark:bg-gray-800">
      <div className="w-full h-full flex items-center flex-col p-5 lg:p-10">
        <h1 className="text-6xl text-gray-700 dark:text-gray-100 mb-5">
          Team Splitting
        </h1>
        {notEnoughPlayers && <Alert text="Not enough players!" />}
        <ActionBar setShowRating={setShowRating} showRating={showRating} />
        <div className="grid grid-cols-12 gap-2 w-full">
          <div className="col-span-5 lg:col-span-2">
            <PlayersList setTeams={setTeams} />
          </div>
          <div className="col-span-7 lg:col-span-10">
            <div className="flex flex-row flex-wrap lg:flex-nowrap gap-2 justify-start items-start">
              {teams.map((team, i) => (
                <TeamList showRating={showRating} key={i} team={team} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
