import { useState } from "react";

export default function Sidebar({ onSelect }) {
  const [active, setActive] = useState("Dashboard Overview");

  const handleSelect = (page) => {
    setActive(page);
    onSelect(page);
  };

  const menuItems = ["Dashboard Overview", "Usage Trends", "Forecasts", "Reports"];

  return (
    <aside className="bg-gray-800 text-white w-64 h-screen p-4">
      <nav className="space-y-4">
        {menuItems.map((item) => (
          <button
            key={item}
            onClick={() => handleSelect(item)}
            className={`block w-full text-left px-4 py-2 rounded ${
              active === item ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
}
