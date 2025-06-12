import { createRef, useEffect, useState } from "react";
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

  const searchRef = createRef<HTMLInputElement>();

  useEffect(() => {
    distribute();
  }, [selectedPlayers]);

  const [visiblePlayers, setVisiblePlayers] = useState(availablePlayers);

  const selectedPlayersName = selectedPlayers.map((player) => player.name);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddPlayer(visiblePlayers[0]);
  };

  const onSearch = (query: string) => {
    if (!query || query === "") {
      setVisiblePlayers(availablePlayers);
      return;
    }
    setVisiblePlayers((prev) => {
      const result = prev.filter((player) =>
        player.name.toLowerCase().includes(query.toLowerCase())
      );
      if (result.length > 0) {
        return result;
      }
      return availablePlayers;
    });
  };

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
      className={`text-left min-h-[800px] text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
        showList ? "h-1/2  w-full overflow-y-scroll" : "w-fit h-fit"
      }`}
    >
      {/* Visibility Button */}
      <li
        className="text-center p-4 dark:bg-gray-600 cursor-pointer flex gap-2 items-center border-b dark:border-gray-600 border-gray-200"
        onClick={() => setShowList((prev) => !prev)}
      >
        <IoMdMenu /> {showList && "List of Players"}
      </li>

      {/* Search */}
      <form className="max-w-md mx-auto p-2" onSubmit={(e) => onSubmit(e)}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            ref={searchRef}
            onChange={(e) => onSearch(e.target.value)}
            id="default-search"
            className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            required
          />
        </div>
      </form>

      {/* List of Players */}
      {visiblePlayers.map((player, i) => {
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
                checked={selectedPlayersName.includes(player.name)}
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

const availablePlayers: Player[] = [
  {
    name: "Amadeus",
    rating: 4,
  },
  {
    name: "Nelio",
    rating: 4.5,
  },
  {
    name: "Davi",
    rating: 3,
  },
  {
    name: "Leander",
    rating: 3,
  },
  {
    name: "Mandip",
    rating: 3,
  },
  {
    name: "Kurtis",
    rating: 4.5,
  },
  {
    name: "Chris",
    rating: 4,
  },
  {
    name: "Akram",
    rating: 3,
  },
  {
    name: "Flemming",
    rating: 4,
  },
  {
    name: "Roger",
    rating: 4,
  },
  {
    name: "Ethan",
    rating: 4,
  },
  {
    name: "Rajab",
    rating: 3,
  },
  {
    name: "Yehia",
    rating: 3,
  },
  {
    name: "Shah",
    rating: 4.5,
  },
  {
    name: "Muheeb",
    rating: 4,
  },
  {
    name: "Tibo",
    rating: 3,
  },
  {
    name: "Lasse",
    rating: 4,
  },
  {
    name: "Yaser",
    rating: 3,
  },
  {
    name: "Piotr",
    rating: 3,
  },
  {
    name: "Ilyasse",
    rating: 3,
  },
  {
    name: "Helmi",
    rating: 4,
  },
  {
    name: "Jelle",
    rating: 4,
  },
  {
    name: "Mo",
    rating: 3,
  },
  {
    name: "Robin",
    rating: 3,
  },
  {
    name: "Mohammad",
    rating: 3,
  },
  {
    name: "Ivan",
    rating: 3,
  },
  {
    name: "Yazan",
    rating: 3,
  },
];
