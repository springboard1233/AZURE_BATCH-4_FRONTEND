export default function Sidebar({ onSelect, selected }) {
  const items = ["Dashboard Overview", "Usage Trends", "Forecasts", "Reports"];

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 shadow-xl border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <h1 className="text-2xl font-bold p-6 text-blue-600 dark:text-blue-400 tracking-tight">
        Azure Analytics
      </h1>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item}>
              <button
                onClick={() => onSelect(item)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                  selected === item
                    ? "bg-blue-500 text-white shadow-md"
                    : "hover:bg-blue-50 text-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
