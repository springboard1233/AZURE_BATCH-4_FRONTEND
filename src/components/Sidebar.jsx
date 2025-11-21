import { useState, useEffect } from "react";
import {
  BarChart3,
  FileText,
  ClipboardCheck,
  Menu,
  X,
  Activity,
} from "lucide-react";

export default function Sidebar({ onSelect }) {
  const [active, setActive] = useState("Dashboard");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (page) => {
    setActive(page);
    if (onSelect) onSelect(page);
    if (window.innerWidth < 1024) setIsOpen(false);
  };

  const menuItems = [
    { name: "Dashboard", icon: FileText },
    { name: "Usage Trends", icon: BarChart3 },
    { name: "Forecasts", icon: Activity },
    { name: "Reports", icon: ClipboardCheck },
    { name: "Insights", icon: BarChart3 },
  ];

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="lg:hidden fixed top-5 left-5 z-50 text-white bg-gradient-to-br 
          from-blue-600 to-indigo-600 p-3 rounded-xl shadow-lg transition-all 
          duration-300 hover:scale-105 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`group fixed lg:static top-0 left-0 h-full w-64 lg:w-20 hover:lg:w-64 
          bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100 p-5 shadow-2xl 
          border-r border-gray-800 flex flex-col justify-between transform 
          transition-all duration-300 ease-in-out z-40 
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo */}
        <div>
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="w-10 h-10 flex items-center justify-center rounded-2xl 
              bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
              <span className="text-lg font-bold text-white">A</span>
            </div>
            <h2 className="text-xl font-semibold tracking-wide transition-all duration-300 
              opacity-100 lg:opacity-0 group-hover:lg:opacity-100 whitespace-nowrap overflow-hidden">
              Azure Panel
            </h2>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-4">
            {menuItems.map(({ name, icon: Icon }) => (
              <button
                key={name}
                onClick={() => handleSelect(name)}
                className={`flex items-center gap-3 w-full px-4 py-2 rounded-xl text-left 
                  font-medium transition-all duration-300 justify-start 
                  lg:justify-center group-hover:lg:justify-start ${
                    active === name
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md scale-[1.02]"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
              >
                <div
                  className={`flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300 ${
                    active === name
                      ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg"
                      : "bg-gray-800 text-gray-300 group-hover:text-white"
                  }`}
                >
                  <Icon size={20} strokeWidth={2} />
                </div>
                <span
                  className={
                    "ml-2 transition-all duration-300 overflow-hidden whitespace-nowrap " +
                    "lg:max-w-0 group-hover:lg:max-w-xs lg:opacity-0 group-hover:lg:opacity-100"
                  }
                >
                  {name}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <footer className="mt-10 text-sm text-gray-500 text-center opacity-70 transition-all duration-300">
          <span className="inline-block lg:opacity-0 group-hover:lg:opacity-100">
            © 2025 Azure Forecast
          </span>
        </footer>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-30 transition-opacity duration-500"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
