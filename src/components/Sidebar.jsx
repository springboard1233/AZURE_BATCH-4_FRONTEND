import React from 'react';
import { LayoutDashboard, TrendingUp, DollarSign, FileText, Home } from 'lucide-react';

// 👈 INSIGHTS ADDED HERE
const navItems = [
  { id: 'Intro', name: 'Home', icon: Home },
  { id: 'Insights', name: 'Insights Dashboard', icon: LayoutDashboard }, // NEW
  { id: 'Usage Trends', name: 'Usage Trends', icon: TrendingUp },
  { id: 'Forecasts', name: 'Forecasts', icon: DollarSign },
  { id: 'Reports', name: 'Reports', icon: FileText },
];

export default function Sidebar({ onSelect, currentPage }) {
  const activePage = currentPage || 'Intro';

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 sticky top-0 h-screen overflow-y-auto hidden md:block transition-all duration-500">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium transition duration-200 
              ${item.id === activePage
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </button>
        ))}
      </nav>
      <div className="absolute bottom-4 left-4 text-xs text-gray-400">
        <p>Version 1.1</p>
      </div>
    </div>
  );
}