import { useEffect, useMemo, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import "./App.css";
import ActionBar from "./components/ActionBar";
import { PlayersList } from "./components/PlayersList";
import TeamList from "./components/TeamsList";
import type { Player, Team } from "./models/Models";

function App() {
  const [teams, setTeams] = useState<Team[]>([]);

  const [showRating, setShowRating] = useState(false);

  const [showNames, setShowNames] = useState(true);

  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const isAdmin = searchParams.get("admin");
    if (isAdmin) {
      setShowRating(true);
    }
  }, [searchParams]);

  const playersCount = useMemo(() => {
    return teams.map((team) => team.players.length).reduce((a, b) => a + b, 0);
  }, [teams]);

  return (
    <div className="w-full h-dvh justify-center items-center overflow-hidden dark:bg-gray-800 b-5">
      <div className="w-full h-full flex items-center flex-col p-5 lg:p-10">
        <h1 className="text-6xl text-gray-700 dark:text-gray-100 mb-5 text-center w-full">
          Team Splitting
        </h1>

        <ActionBar
          teams={teams}
          setTeams={setTeams}
          setShowRating={setShowRating}
          showRating={showRating}
          setSelectedPlayers={setSelectedPlayers}
        />
        <div
          className={`gap-2 w-full ${
            showNames ? "grid grid-cols-12" : "flex flex-row"
          }`}
        >
          <div
            className={`${showNames ? "col-span-5 lg:col-span-2" : "w-fit"}`}
          >
            {/* Players List */}
            <PlayersList
              showList={showNames}
              setShowList={setShowNames}
              setTeams={setTeams}
              selectedPlayers={selectedPlayers}
              setSelectedPlayers={setSelectedPlayers}
            />
          </div>

          {/* Teams List */}
          <div
            className={`${showNames ? "col-span-7 lg:col-span-10" : "w-full"}`}
          >
            {playersCount === 0 && (
              <div className="w-full min-h-[500px] gap-2 m-1 dark:text-gray-300 flex flex-row justify-center items-center text-xs  outline-1 outline-gray-200 dark:outline-gray-600 rounded-lg">
                <FaArrowLeft className="animate-pulse" />
                <div className="animate-pulse">
                  Select players from the list
                </div>
              </div>
            )}
            {playersCount > 0 && (
              <div className="flex flex-row flex-wrap lg:flex-nowrap gap-2 justify-start items-start">
                {teams.map((team, i) => (
                  <TeamList showRating={showRating} key={i} team={team} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
