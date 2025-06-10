import type { Player, Team } from "../models/Player";

export const PlayerSum = ({ players }: { players: Player[] }) => {
  const average = players.reduce((a, b) => a + b.rating / players.length, 0);
  return (
    <li className="pt-3 sm:pt-4 mt-5">
      <div className="flex items-center">
        <div className="shrink-0"></div>
        <div className="flex-1 min-w-0 ms-4">
          <p className="text-sm text-gray-500 truncate dark:text-gray-400 text-left">
            Average team score
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          {Math.round(average)}
        </div>
      </div>
    </li>
  );
};

export const PlayerItem = ({ player }: { player: Player }) => {
  return (
    <li className="py-3 sm:py-4 text-left">
      <div className="flex items-center">
        <div className="shrink-0">
          <img
            className="w-8 h-8 rounded-full"
            src="avatar.jpg"
            alt="Neil image"
          />
        </div>
        <div className="flex-1 min-w-0 ms-4">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {player.name}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400 hidden">
            email@windster.com
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          {player.rating}
        </div>
      </div>
    </li>
  );
};

export const TeamList = ({
  players,
  team,
}: {
  players: Player[];
  team: Team;
}) => {
  return (
    <>
      <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            {team}
          </h5>
          <a
            href="#"
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 hidden"
          >
            View all
          </a>
        </div>
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {players.length > 0 &&
              players.map((player) => (
                <PlayerItem player={player} key={player.name} />
              ))}
            <PlayerSum players={players} />
          </ul>
        </div>
      </div>
    </>
  );
};

export default TeamList;
