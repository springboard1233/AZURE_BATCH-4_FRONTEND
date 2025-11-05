import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className="flex justify-between items-center px-6 py-4 shadow-md 
      bg-gradient-to-r from-blue-600 to-indigo-700 
      dark:from-gray-800 dark:to-gray-900 
      text-white sticky top-0 z-50"
    >
      <h1 className="text-2xl font-semibold tracking-wide">
        Azure Demand Forecasting
      </h1>

      <button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
        title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
      </button>
    </header>
  );
};

export default Header;
