import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { Sun, Moon, User } from "lucide-react";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <header
      className="flex justify-between items-center px-6 py-3 shadow-md
                 bg-gradient-to-r from-blue-600 to-indigo-700
                 dark:from-gray-900 dark:to-gray-950
                 text-white sticky top-0 z-50"
    >
      {/* Left: Title */}
      <h1 className="text-xl md:text-2xl font-semibold tracking-wide">
        Azure Demand Forecasting
      </h1>

      {/* Right: Theme toggle + user */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-white/10 hover:bg-white/20
                     text-white transition-all shadow-sm"
        >
          {theme === "light" ? (
            <Moon size={20} />
          ) : (
            <Sun className="text-yellow-300" size={20} />
          )}
        </button>

        <div
          onClick={handleLoginClick}
          className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30
                     flex items-center justify-center shadow-inner cursor-pointer
                     transition-all"
        >
          <User size={20} className="text-white" />
        </div>
      </div>
    </header>
  );
};

export default Header;
