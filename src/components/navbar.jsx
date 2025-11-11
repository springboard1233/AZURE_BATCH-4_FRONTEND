import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react'; // install this if not already: npm install lucide-react

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="flex items-center justify-between p-3 border-b dark:border-gray-700">
      <h1 className="text-lg font-semibold text-blue-600">Azure Forecasting Dashboard</h1>
      <button
        onClick={toggleTheme}
        className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        {theme === 'light' ? <Moon /> : <Sun />}
      </button>
    </header>
  );
}
