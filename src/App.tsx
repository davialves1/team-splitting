import { useEffect, useMemo, useState } from "react";
import "./App.css";
import ActionBar from "./components/ActionBar";
import { PlayersList } from "./components/PlayersList";
import TeamList from "./components/TeamsList";
import type { Team } from "./models/Models";
import Alert from "./components/Alert";
import { FaArrowLeft, FaWhatsapp } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

function App() {
  const [teams, setTeams] = useState<Team[]>([]);

  const [showRating, setShowRating] = useState(false);

  const [showNames, setShowNames] = useState(true);

  const [wppMessage, setWppMessage] = useState(false);

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

  const notEnoughPlayers = playersCount > 1 && playersCount < 10;

  return (
    <div className="w-full min-h-dvh justify-center items-center overflow-hidden dark:bg-gray-800 b-5">
      <div className="w-full h-full flex items-center flex-col p-5 lg:p-10">
        <h1 className="text-6xl text-gray-700 dark:text-gray-100 mb-5 text-center w-full">
          Team Splitting
        </h1>

        <ActionBar
          setShowRating={setShowRating}
          showRating={showRating}
          showNames={showNames}
          setShowNames={setShowNames}
        />
        <div
          className={`gap-2 ${
            showNames ? "grid grid-cols-12" : "flex flex-row"
          } w-full`}
        >
          <div
            className={`${showNames ? "col-span-5 lg:col-span-2" : "w-fit"}`}
          >
            {/* Alert */}
            {notEnoughPlayers && (
              <div className="hidden md:block">
                <Alert text="Not enough players!" />
              </div>
            )}

            {/* Players List */}
            <PlayersList
              showList={showNames}
              setShowList={setShowNames}
              setTeams={setTeams}
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
            {playersCount > 0 && !wppMessage && (
              <div
                className="cursor-pointer w-fit bg-white border border-gray-200 shadow-sm sm:p-5 dark:bg-gray-800 dark:border-gray-700 mt-2 p-5 text-sm rounded-lg flex gap-2 items-center"
                onClick={() => setWppMessage(true)}
              >
                WhatsApp message <FaWhatsapp size={18} />
              </div>
            )}
            {wppMessage && (
              <div className="w-fit bg-white border border-gray-200 shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700 mt-2 p-5 text-sm rounded-lg">
                <button
                  onClick={() => setWppMessage(false)}
                  className="p-2 flex items-center gap-2 bg-gray-100 rounded-lg mb-4 cursor-pointer"
                >
                  Close <IoMdClose />
                </button>
                _Hello everyone, these is the teams for next game:_
                <br />
                <br />
                {teams.map((team) => (
                  <div className="w-full">
                    <strong>*{team.color} Shirt Team*</strong>
                    <ul className="pt-2">
                      {team.players.map((player, i) => (
                        <li>
                          {i + 1} - {player.name}
                        </li>
                      ))}
                    </ul>
                    <br />
                  </div>
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
