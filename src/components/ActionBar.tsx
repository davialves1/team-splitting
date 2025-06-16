import { useSearchParams } from "react-router";
import type { Player, Team } from "../models/Models";
import { FaWhatsapp } from "react-icons/fa";
import SuccessAlert from "./SuccessAlert";
import { useMemo, useState } from "react";

export const ActionBar = ({
  teams,
  setTeams,
  showRating,
  setShowRating,
  setSelectedPlayers,
}: {
  teams: Team[];
  setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
  showRating: boolean;
  setShowRating: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
}) => {
  const [searchParams] = useSearchParams();

  const [success, setSuccess] = useState(false);

  const isAdmin = searchParams.get("admin");

  const playersCount = useMemo(() => {
    return teams.map((team) => team.players.length).reduce((a, b) => a + b, 0);
  }, [teams]);

  const whatsapp = `_Hello everyone, we are *${playersCount}* players in total and these are the teams for next game:_
  ${teams
    .map(
      (team) =>
        `\n*${team.color} Shirt Team*\n${team.players
          .map((player, i) => `${i} - ${player.name} \n`)
          .join("")}`
    )
    .join("")}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(whatsapp);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <>
      {success && <SuccessAlert text="Teams copied to clipboard" />}
      <div className="inline-flex rounded-md shadow-xs mb-5" role="group">
        <button
          type="button"
          onClick={() => {
            copyToClipboard();
            console.log(whatsapp);
          }}
          className="flex items-center gap-1 px-4 cursor-pointer py-2 text-xs font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          Copy for <FaWhatsapp size={18} />
        </button>
        {isAdmin && (
          <button
            type="button"
            onClick={() => setShowRating(!showRating)}
            className="px-4 cursor-pointer py-2 text-xs font-medium text-gray-900 bg-white border-t border-b border-r border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            {showRating ? "Hide" : "Show"} rating
          </button>
        )}
        <button
          onClick={() => {
            setSelectedPlayers([]);
            setTeams([]);
          }}
          type="button"
          className="px-4 cursor-pointer py-2 text-xs font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          Reset teams
        </button>
        <button
          type="button"
          className="px-4 py-2 text-xs font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">
            {playersCount}
          </span>{" "}
          Players
        </button>
      </div>
    </>
  );
};

export default ActionBar;
