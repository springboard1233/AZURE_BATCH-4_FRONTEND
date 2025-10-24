import { useState } from "react";
import React from 'react';

export default function Sidebar({ onSelect }) {
  const [active, setActive] = useState("Usage Trends");

  const handleSelect = (page) => {
    setActive(page);
    onSelect(page);
  };

  return (
    <aside className="bg-gray-900 text-white w-64 h-screen p-4 shadow-2xl">
      <div className="text-2xl font-extrabold text-blue-400 mb-8 border-b border-blue-500/50 pb-4">
        Azure Forecast
      </div>
      <nav className="space-y-2">
        {["Usage Trends", "Forecasts", "Reports"].map((item) => (
          <button
            key={item}
            onClick={() => handleSelect(item)}
            className={`
              block w-full text-left px-4 py-3 rounded-lg transition duration-150 ease-in-out
              ${active === item 
                ? "bg-blue-600 font-semibold shadow-md" 
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }
            `}
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
}