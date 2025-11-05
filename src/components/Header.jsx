import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className="flex justify-between items-center px-6 py-4 shadow-md 
      bg-gradient-to-r from-sky-100 via-blue-100 to-blue-50 
      dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
      text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700
      transition-all duration-300"
    >
      {/* Left - Logo & Title */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 
          flex items-center justify-center text-white font-bold shadow-lg"
        >
          A
        </div>
        <h1 className="text-2xl font-semibold tracking-wide">
          Azure Demand Forecasting
        </h1>
      </div>

      {/* Right - Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="flex items-center gap-2 px-4 py-2 rounded-full 
        bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 
        shadow-md transition-all duration-300 transform hover:scale-105"
        title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? (
          <>
            <Moon size={20} className="text-gray-700" />
            <span className="text-sm font-medium text-gray-800">Dark Mode</span>
          </>
        ) : (
          <>
            <Sun size={20} className="text-yellow-400 animate-pulse" />
            <span className="text-sm font-medium text-yellow-300">Light Mode</span>
          </>
        )}
      </button>
    </header>
  );
};

export default Header;
