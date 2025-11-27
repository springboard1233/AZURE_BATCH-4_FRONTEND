export default function KPI({ title, value, delta }) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow flex flex-col gap-1">
      <span className="text-sm text-gray-500 dark:text-gray-400">{title}</span>
      <span className="text-2xl font-semibold">{value}</span>
      <span className={delta >= 0 ? 'text-green-600 text-sm' : 'text-red-600 text-sm'}>
        {delta >= 0 ? `▲ ${delta}%` : `▼ ${Math.abs(delta)}%`}
      </span>
    </div>
  );
}
