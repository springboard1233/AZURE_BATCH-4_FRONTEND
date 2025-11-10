import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md p-4 flex justify-between items-center border-b dark:border-gray-700">
      <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
        Azure Dashboard
      </h2>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
        />
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
          S
        </div>
      </div>
    </header>
  );
}
