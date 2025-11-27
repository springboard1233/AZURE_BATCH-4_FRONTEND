import KPI from "../components/ui/KPI";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const trendData = [
  { day: "Mon", value: 40 },
  { day: "Tue", value: 55 },
  { day: "Wed", value: 52 },
  { day: "Thu", value: 68 },
  { day: "Fri", value: 63 },
];

export default function Dashboard() {
  return (
    <div className="animate-fadeIn">

      {/* Page Title */}
      <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text mb-2">
        Azure Demand Forecasting Dashboard
      </h1>

      <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
        Organization-wide forecasting insights, resource efficiency scores, and real-time metrics.
      </p>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <KPI title="Forecast Accuracy" value="91.6%" delta={2.3} />
        <KPI title="Capacity Utilization" value="87%" delta={-1.2} />
        <KPI title="CAPEX Savings" value="$1.2M" delta={0.8} />
        <KPI title="Demand Growth" value="15.2%" delta={3.5} />
      </div>

      {/* WEEKLY TREND CHART */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 h-[330px]">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
          Weekly Demand Trend
        </h2>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="day" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#0078D4"
              strokeWidth={3}
              dot={{ r: 5, fill: "#0078D4" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* QUICK STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        
        {/* Azure Blue Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg">
          <h3 className="text-lg font-semibold">Active Resources</h3>
          <p className="text-3xl font-bold mt-2">184</p>
          <p className="mt-1 text-sm opacity-85">Across all workloads</p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Open Alerts</h3>
          <p className="text-3xl font-bold text-red-500 mt-2">7</p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Requires attention</p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Active ML Models</h3>
          <p className="text-3xl font-bold text-green-500 mt-2">3</p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Running forecasts</p>
        </div>

      </div>
    </div>
  );
}
