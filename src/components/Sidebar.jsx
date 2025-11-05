import { useState } from "react";
import {
  FaChartLine,
  FaRegFileAlt,
  FaClipboardList,
} from "react-icons/fa";

export default function Sidebar({ onSelect }) {
  const [active, setActive] = useState("Usage Trends");

  const handleSelect = (page) => {
    setActive(page);
    onSelect(page);
  };

  const menuItems = [
    { name: "Usage Trends", icon: <FaChartLine /> },
    { name: "Forecasts", icon: <FaRegFileAlt /> },
    { name: "Reports", icon: <FaClipboardList /> },
  ];

  return (
    <aside
      className="flex flex-col justify-between bg-gradient-to-b 
      from-gray-900 via-gray-800 to-gray-900 text-gray-100 
      w-64 h-screen p-5 shadow-xl border-r border-gray-700 transition-all duration-300"
    >
      {/* Top: Logo */}
      <div>
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
            <span className="text-lg font-bold text-white">A</span>
          </div>
          <h2 className="text-xl font-semibold tracking-wide">
            Azure Panel
          </h2>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {menuItems.map(({ name, icon }) => (
            <button
              key={name}
              onClick={() => handleSelect(name)}
              className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl 
              font-medium transition-all duration-300
              ${
                active === name
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md scale-[1.02]"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              <span
                className={`text-lg transition-transform ${
                  active === name ? "scale-110" : "group-hover:scale-110"
                }`}
              >
                {icon}
              </span>
              <span>{name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Bottom: Footer */}
      <div className="mt-10 text-sm text-gray-500 text-center">
        <p className="opacity-70">© 2025 Azure Forecast</p>
      </div>
    </aside>
  );
}
