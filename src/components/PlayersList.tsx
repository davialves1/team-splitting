import { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import type { ColorShirt, Player, Team } from "../models/Models";

export const PlayersList = ({
  setTeams,
  showList,
  setShowList,
}: {
  setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
  showList: boolean;
  setShowList: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);

  useEffect(() => {
    distribute();
  }, [selectedPlayers]);

  const rating = `W3sibmFtZSI6IkFtYWRldXMiLCJyYXRpbmciOjR9LHsibmFtZSI6Ik5lbGlvIiwicmF0aW5nIjo0fSx7Im5hbWUiOiJEYXZpIiwicmF0aW5nIjozfSx7Im5hbWUiOiJMZWFuZGVyIiwicmF0aW5nIjozfSx7Im5hbWUiOiJNYW5kaXAiLCJyYXRpbmciOjN9LHsibmFtZSI6Ikt1cnRpcyIsInJhdGluZyI6NH0seyJuYW1lIjoiQ2hyaXMiLCJyYXRpbmciOjN9LHsibmFtZSI6IkFrcmFtIiwicmF0aW5nIjozfSx7Im5hbWUiOiJGbGVtbWluZyIsInJhdGluZyI6NH0seyJuYW1lIjoiUm9nZXIiLCJyYXRpbmciOjR9LHsibmFtZSI6IkV0aGFuIiwicmF0aW5nIjo0fSx7Im5hbWUiOiJSYWphYiIsInJhdGluZyI6M30seyJuYW1lIjoiWWVoaWEiLCJyYXRpbmciOjN9LHsibmFtZSI6IlNoYWgiLCJyYXRpbmciOjR9LHsibmFtZSI6Ik11aGVlYiIsInJhdGluZyI6NH0seyJuYW1lIjoiVGlibyIsInJhdGluZyI6NH0seyJuYW1lIjoiTGFzc2UiLCJyYXRpbmciOjR9LHsibmFtZSI6Illhc2VyIiwicmF0aW5nIjozfSx7Im5hbWUiOiJQaW90ciIsInJhdGluZyI6M30seyJuYW1lIjoiSWx5YXNzZSIsInJhdGluZyI6M30seyJuYW1lIjoiSGVsbWkiLCJyYXRpbmciOjR9LHsibmFtZSI6IkplbGxlIiwicmF0aW5nIjo0fSx7Im5hbWUiOiJNbyIsInJhdGluZyI6M30seyJuYW1lIjoiUm9iaW4iLCJyYXRpbmciOjN9LHsibmFtZSI6Ik1vaGFtbWFkIiwicmF0aW5nIjozfSx7Im5hbWUiOiJJdmFuIiwicmF0aW5nIjozfV0=`;

  const availablePlayers: Player[] = JSON.parse(atob(rating)) as Player[];

  const onAddPlayer = (player: Player) => {
    setSelectedPlayers((prev) => {
      const isPresent = prev
        .map((prevPlayer) => prevPlayer.name)
        .includes(player.name);
      if (isPresent) {
        if (prev.length > 0) {
          setTeams([]);
        }
        return prev.filter((p) => p.name !== player.name);
      }
      return [...prev, player];
    });
  };

  const teamColors = ["⚫ Black", "⚪ White", "🎽 Bibs", "🔴 Red", "🟡 Yellow"];

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
    <ul
      className={`text-left text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
        showList ? "h-1/2  w-full overflow-y-scroll" : "w-fit h-fit"
      }`}
    >
      <li
        className="text-center p-4 dark:bg-gray-600 cursor-pointer flex gap-2 items-center border-b dark:border-gray-600 border-gray-200"
        onClick={() => setShowList((prev) => !prev)}
      >
        <IoMdMenu /> {showList && "List of Players"}
      </li>
      {availablePlayers.map((player, i) => {
        return (
          <li
            className={`w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600 cursor-pointer ${
              !showList && "hidden"
            }`}
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
                {showList && player.name}
              </label>
            </div>
          </li>
        );
      })}
      {showList && (
        <div className="text-xs text-center p-5 dark:text-gray-300 w-full ">
          Total of {selectedPlayers.length} Players
        </div>
      )}
    </ul>
  );
};
