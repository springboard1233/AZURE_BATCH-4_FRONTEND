import { useState, useEffect } from "react";
import {
  FaChartLine,
  FaRegFileAlt,
  FaClipboardList,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Sidebar({ onSelect }) {
  const [active, setActive] = useState("Usage Trends");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (page) => {
    setActive(page);
    onSelect(page);
    if (window.innerWidth < 1024) setIsOpen(false); // auto close on mobile
  };

  const menuItems = [
    { name: "Usage Trends", icon: <FaChartLine /> },
    { name: "Forecasts", icon: <FaRegFileAlt /> },
    { name: "Reports", icon: <FaClipboardList /> },
  ];

  // Disable scroll on mobile when sidebar open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isOpen]);

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        className="lg:hidden fixed top-5 left-5 z-50 text-white bg-gradient-to-br 
          from-blue-600 to-indigo-600 p-3 rounded-lg shadow-lg transition-all 
          duration-300 hover:scale-105 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-gradient-to-b 
          from-gray-900 via-gray-800 to-gray-900 text-gray-100 p-5 shadow-2xl 
          border-r border-gray-700 flex flex-col justify-between transform 
          transition-transform duration-500 ease-in-out z-40 
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo Section */}
        <div>
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl 
              bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
              <span className="text-lg font-bold text-white">A</span>
            </div>
            <h2 className="text-xl font-semibold tracking-wide">Azure Panel</h2>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-2">
            {menuItems.map(({ name, icon }) => (
              <button
                key={name}
                onClick={() => handleSelect(name)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left 
                  font-medium transition-all duration-300 ${
                    active === name
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md scale-[1.02]"
                      : "text-gray-300 hover:text-white hover:bg-gray-700"
                  }`}
              >
                <span
                  className={`text-lg transition-transform duration-300 ${
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

        {/* Footer */}
        <footer className="mt-10 text-sm text-gray-500 text-center opacity-70">
          © 2025 Azure Forecast
        </footer>
      </aside>

      {/* Overlay when sidebar open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-30 
            transition-opacity duration-500"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
