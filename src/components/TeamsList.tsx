import type { Player, Team } from "../models/Models";

export const TeamList = ({
  team,
  showRating,
}: {
  team: Team;
  showRating: boolean;
}) => {
  return (
    <>
      <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            {team.color} Shirt
          </h5>
        </div>
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {team.players.length === 0 && (
              <li className="opacity-50 text-xs dark:text-white">
                No player selected
              </li>
            )}
            {team.players.length > 0 &&
              team.players.map((player) => (
                <PlayerItem
                  showRating={showRating}
                  player={player}
                  key={player.name}
                />
              ))}
            {team.players.length > 0 && (
              <PlayerSum showRating={showRating} players={team.players} />
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export const PlayerItem = ({
  player,
  showRating,
}: {
  player: Player;
  showRating: boolean;
}) => {
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
        <div
          className={`inline-flex items-center text-base font-semibold text-gray-900 dark:text-white`}
        >
          {showRating && player.rating}
        </div>
      </div>
    </li>
  );
};

export const PlayerSum = ({
  players,
  showRating,
}: {
  players: Player[];
  showRating: boolean;
}) => {
  const average = players.reduce((a, b) => a + b.rating / players.length, 0);
  return (
    <li className="pt-3 sm:pt-4 mt-5">
      <div className="flex items-center">
        <div className="shrink-0"></div>
        <div className="flex-1 min-w-0 ms-4">
          <p className="text-sm text-gray-500 truncate dark:text-gray-400 text-left">
            Total Players
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400 text-left">
            {showRating && "Average team score"}
          </p>
        </div>

        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          {players.length}
          <br />
          {showRating && average.toLocaleString().slice(0, 3)}
        </div>
      </div>
    </li>
  );
};

export default TeamList;
