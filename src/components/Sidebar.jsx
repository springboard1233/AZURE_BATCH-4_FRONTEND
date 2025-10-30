import { useState } from "react";
import { FaChartLine, FaRegFileAlt, FaClipboardList } from "react-icons/fa"; // Import icons

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
    <aside className="bg-gray-800 text-white w-64 h-screen p-4">
      <nav className="space-y-4">
        {menuItems.map(({ name, icon }) => (
          <button
            key={name}
            onClick={() => handleSelect(name)}
            className={`flex items-center space-x-2 block w-full text-left px-4 py-2 rounded transition duration-200 ${
              active === name ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
          >
            {icon}
            <span>{name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}