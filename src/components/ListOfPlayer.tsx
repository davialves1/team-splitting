import { useEffect, useState } from "react";
import type { TeamPlayers } from "../App";
import type { Player } from "../models/Player";

export const PlayersList = ({
  setTeams,
}: {
  setTeams: React.Dispatch<React.SetStateAction<TeamPlayers[]>>;
}) => {
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);

  useEffect(() => onDistributeTeams(), [selectedPlayers]);

  const availablePlayers: Player[] = [
    { name: "Amadeus", rating: 3 },
    { name: "Nelio", rating: 3 },
    { name: "Leander", rating: 3 },
    { name: "Mandip", rating: 3 },
    { name: "Kurtis", rating: 3 },
    { name: "Chris", rating: 3 },
    { name: "Akram", rating: 3 },
    { name: "Flemming", rating: 4 },
    { name: "Roger", rating: 4 },
    { name: "Ethan", rating: 4 },
    { name: "Rajab", rating: 3 },
    { name: "Yehia", rating: 4 },
    { name: "Shah", rating: 3 },
    { name: "Muheeb", rating: 4 },
    { name: "Tibo", rating: 4 },
    { name: "Lasse", rating: 4 },
  ];

  const onAddPlayer = (player: Player) => {
    setSelectedPlayers((prev) => {
      const isPresent = prev
        .map((prevPlayer) => prevPlayer.name)
        .includes(player.name);
      if (isPresent) {
        return prev.filter((p) => p.name !== player.name);
      }
      return [...prev, player];
    });
  };

  const onDistributeTeams = () => {
    if (selectedPlayers.length <= 5) {
      setTeams([{ teamId: 1, players: selectedPlayers }]);
      return;
    }
    if (selectedPlayers.length <= 10) {
      setTeams([
        { teamId: 1, players: selectedPlayers.slice(0, 5) },
        { teamId: 2, players: selectedPlayers.slice(5, 10) },
      ]);
      return;
    }
    if (selectedPlayers.length <= 15) {
      setTeams([
        { teamId: 1, players: selectedPlayers.slice(0, 5) },
        { teamId: 2, players: selectedPlayers.slice(5, 10) },
        { teamId: 3, players: selectedPlayers.slice(10, 15) },
      ]);
      return;
    }
    if (selectedPlayers.length <= 20) {
      setTeams([
        { teamId: 1, players: selectedPlayers.slice(0, 5) },
        { teamId: 2, players: selectedPlayers.slice(5, 10) },
        { teamId: 3, players: selectedPlayers.slice(10, 15) },
        { teamId: 4, players: selectedPlayers.slice(15, 20) },
      ]);
      return;
    }
  };

  return (
    <div className="text-left">
      <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {availablePlayers.map((player, i) => {
          return (
            <li
              className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600 cursor-pointer"
              key={`${player.name}-${i}-checkbox`}
            >
              <div className="flex items-center ps-3">
                <input
                  id={player.name}
                  aria-label={player.name}
                  type="checkbox"
                  value={player.name}
                  onChange={() => onAddPlayer(player)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor={player.name}
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {player.name}
                </label>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="text-xs text-center p-2 mt-2">
        {selectedPlayers.length} Players
      </div>
    </div>
  );
};
