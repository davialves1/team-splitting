import { useEffect, useState } from "react";
import type { ColorShirt, Player, Team } from "../models/Models";

export const PlayersList = ({
  setTeams,
}: {
  setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
}) => {
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);

  useEffect(() => {
    distribute();
  }, [selectedPlayers]);

  const availablePlayers: Player[] = [
    { name: "Amadeus", rating: 3 },
    { name: "Nelio", rating: 3 },
    { name: "Leander", rating: 3 },
    { name: "Mandip", rating: 5 },
    { name: "Kurtis", rating: 4 },
    { name: "Chris", rating: 3 },
    { name: "Akram", rating: 2 },
    { name: "Flemming", rating: 4 },
    { name: "Roger", rating: 4 },
    { name: "Ethan", rating: 4 },
    { name: "Rajab", rating: 2 },
    { name: "Yehia", rating: 4 },
    { name: "Shah", rating: 5 },
    { name: "Muheeb", rating: 4 },
    { name: "Tibo", rating: 4 },
    { name: "Lasse", rating: 4 },
    { name: "Yaser", rating: 3 },
    { name: "Piotr", rating: 3 },
    { name: "Ilyasse", rating: 3 },
    { name: "Helmi", rating: 3 },
    { name: "Jelle", rating: 3 },
    { name: "Mo", rating: 3 },
    { name: "Robin", rating: 3 },
    { name: "Mohammad", rating: 3 },
    { name: "Ivan", rating: 3 },
    { name: "Ivan", rating: 3 },
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

  const teamColors = ["Black", "White", "Red", "Yellow", "Bibs"];

  const distribute = () => {
    if (selectedPlayers.length < 1) {
      return;
    }

    if (selectedPlayers.length < 6) {
      setTeams([
        {
          id: 0,
          color: teamColors[0] as ColorShirt,
          players: selectedPlayers,
          rating: selectedPlayers.reduce((a, b) => a + b.rating, 0),
        },
      ]);
      return;
    }

    const sortedPlayers = [...selectedPlayers].sort(
      (a, b) => b.rating - a.rating
    );

    // Define how many teams
    let teamsCount = 2; // min 2
    const extraPlayers = selectedPlayers.length % 5;
    if (selectedPlayers.length < 11 && extraPlayers < 3) {
      teamsCount = Math.round(selectedPlayers.length / 5);
    } else if (extraPlayers < 4) {
      teamsCount = Math.round(selectedPlayers.length / 5);
    } else {
      teamsCount = (selectedPlayers.length - extraPlayers) / 5 + 1;
    }

    // Create empty teams
    const teams: Team[] = Array(teamsCount)
      .fill(0)
      .map((_, i) => ({
        id: i,
        color: teamColors[i] as ColorShirt,
        players: [],
        rating: 0,
      }));

    // Fill teams with players
    for (const player of sortedPlayers) {
      let minTeam = teams[0];
      for (const team of teams) {
        if (team.rating < minTeam.rating) {
          minTeam = team;
        }
      }
      minTeam.players.push(player);
      minTeam.rating += player.rating;
    }

    setTeams(teams);
  };

  return (
    <ul className="text-left w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
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
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-800 dark:border-gray-500"
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
      <div className="text-xs text-center p-5 dark:text-gray-300 w-full ">
        Total of {selectedPlayers.length} Players
      </div>
    </ul>
  );
};
