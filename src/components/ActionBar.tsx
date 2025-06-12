import { useSearchParams } from "react-router";

export const ActionBar = ({
  showRating,
  setShowRating,
  showNames,
  setShowNames,
}: {
  showRating: boolean;
  setShowRating: React.Dispatch<React.SetStateAction<boolean>>;
  showNames: boolean;
  setShowNames: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [searchParams] = useSearchParams();

  const isAdmin = searchParams.get("admin");

  return (
    <div className="inline-flex rounded-md shadow-xs mb-5" role="group">
      {isAdmin && (
        <button
          type="button"
          onClick={() => setShowRating(!showRating)}
          className="px-4 cursor-pointer py-2 text-xs font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          {showRating ? "Hide" : "Show"} rating
        </button>
      )}
      <button
        type="button"
        onClick={() => setShowNames(!showNames)}
        className="px-4 cursor-pointer py-2 text-xs font-medium text-gray-900 bg-white border-t border-b border-r border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
      >
        {showNames ? "Hide" : "Show"} names
      </button>
      <button
        type="button"
        disabled
        className="px-4 opacity-50 py-2 text-xs font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
      >
        Shuffle
      </button>
      <button
        disabled
        type="button"
        className="px-4 opacity-50 py-2 text-xs font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
      >
        Settings
      </button>
    </div>
  );
};

export default ActionBar;
