import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Moon, Sun, User } from "lucide-react";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="
      flex items-center justify-between px-6 py-3 
      bg-white dark:bg-gray-900 
      shadow-sm border-b border-gray-200 dark:border-gray-800
      sticky top-0 z-40
    ">
      
      {/* Left Section - Logo + Title */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 
                        flex items-center justify-center text-white font-bold shadow-md">
          A
        </div>

        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200 tracking-wide">
          Azure Forecast Portal
        </h1>
      </div>

      {/* Right Section - Dark Toggle + Profile */}
      <div className="flex items-center gap-4">

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="
            p-2 rounded-xl bg-gray-100 dark:bg-gray-800 
            hover:bg-gray-200 dark:hover:bg-gray-700 
            transition-all shadow-sm
          "
        >
          {theme === "light" ? (
            <Moon className="text-blue-600" size={20} />
          ) : (
            <Sun className="text-yellow-400" size={20} />
          )}
        </button>

        {/* User Profile Placeholder */}
        <div className="
          w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 
          flex items-center justify-center shadow-inner cursor-pointer
        ">
          <User className="text-gray-600 dark:text-gray-300" size={20} />
        </div>

      </div>
    </header>
  );
}
