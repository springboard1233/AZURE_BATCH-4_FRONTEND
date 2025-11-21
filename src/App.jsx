import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import UsageTrends from "./pages/UsageTrends";
import Forecasts from "./pages/Forecasts";
import Reports from "./pages/Reports";
import Insights from "./pages/Insights";
import IntroPage from "./pages/IntroPage";

// KPI Card Component and Chart components (unchanged)
function KPICard({ title, value, delta, subtitle, icon }) {
  const isPositive =
    typeof delta === "number"
      ? delta >= 0
      : delta?.toString().startsWith("+");
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow hover:shadow-lg transition"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {value}
          </p>
          {subtitle && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
        {icon && <div className="text-gray-400 dark:text-gray-300">{icon}</div>}
      </div>
      {delta !== undefined && (
        <div className="mt-3 text-sm">
          <span
            className={[
              "inline-flex items-center rounded-md px-2 py-1 font-medium",
              isPositive
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
            ].join(" ")}
          >
            {isPositive ? "▲" : "▼"}{" "}
            {typeof delta === "number" ? `${delta}%` : delta}
          </span>
        </div>
      )}
    </motion.div>
  );
}

function SystemUsageTable() {
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const getRandomPercentage = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  const cpuUsageData = labels.map(() => getRandomPercentage(30, 100));
  const storageUsageData = labels.map(() => getRandomPercentage(40, 100));
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Weekly CPU & Storage Usage
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 uppercase text-sm">
            <tr>
              <th className="py-3 px-4 border">Day</th>
              <th className="py-3 px-4 border">CPU Usage (%)</th>
              <th className="py-3 px-4 border">Storage Usage (%)</th>
            </tr>
          </thead>
          <tbody>
            {labels.map((day, index) => (
              <tr
                key={day}
                className="hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <td className="py-3 px-4 border">{day}</td>
                <td className="py-3 px-4 border font-medium text-blue-600 dark:text-blue-300">
                  {cpuUsageData[index]}%
                </td>
                <td className="py-3 px-4 border font-medium text-green-600 dark:text-green-300">
                  {storageUsageData[index]}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BarComparisonChart({ data }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Current vs Forecast Bar Chart
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="current" fill="#3182ce" />
          <Bar dataKey="forecast" fill="#63b3ed" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function TrafficPieChart({ data }) {
  const baseColors = [
    "#3182ce",
    "#63b3ed",
    "#4299e1",
    "#90cdf4",
    "#bee3f8",
    "#63b3ed",
    "#2b6cb0",
  ];
  const shuffledColors = baseColors.sort(() => 0.5 - Math.random());
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Traffic Channels
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={shuffledColors[index % shuffledColors.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

function TrendLineChart({ data }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Trend Line (This Week)
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#3182ce" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// ---- App starts here ----

export default function App() {
  // Set default page; switch to "Dashboard" if that's your preference
  const [selectedPage, setSelectedPage] = useState("Insights");

  const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const kpiData = [
    {
      title: "CPU Usage",
      value: `${getRandomInt(30, 100)}%`,
      delta: getRandomInt(-10, 10),
      subtitle: "Compared to last week",
    },
    {
      title: "Storage Usage",
      value: `${getRandomInt(30, 100)}%`,
      delta: getRandomInt(-10, 10),
      subtitle: "Compared to last week",
    },
    {
      title: "Server Uptime",
      value: `${(99 + Math.random()).toFixed(2)}%`,
      delta: `+${getRandomInt(0, 3)}`,
      subtitle: "Last 24 hours",
    },
  ];

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const barChartData = days.map((day) => ({
    name: day,
    current: getRandomInt(30, 100),
    forecast: getRandomInt(30, 100),
  }));

  const pieChartData = [
    { name: "Direct", value: getRandomInt(100, 500) },
    { name: "Referral", value: getRandomInt(100, 500) },
    { name: "Social Media", value: getRandomInt(100, 500) },
    { name: "Organic Search", value: getRandomInt(100, 500) },
    { name: "Email", value: getRandomInt(100, 500) },
  ];

  const lineChartData = days.map((day) => ({
    name: day,
    value: getRandomInt(30, 100),
  }));

  const renderContent = () => {
    switch (selectedPage) {
      case "Dashboard":
        return (
          <>
            <IntroPage />
            {/* KPIs Section */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow mb-8 px-5 py-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {kpiData.map(({ title, value, delta, subtitle }, idx) => (
                  <KPICard
                    key={idx}
                    title={title}
                    value={value}
                    delta={delta}
                    subtitle={subtitle}
                  />
                ))}
              </div>
            </div>
            {/* Chart Grid: 2x2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow px-6 py-6">
                <BarComparisonChart data={barChartData} />
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow px-6 py-6">
                <TrafficPieChart data={pieChartData} />
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow px-6 py-6">
                <TrendLineChart data={lineChartData} />
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow px-6 py-6">
                <SystemUsageTable />
              </div>
            </div>
          </>
        );
      case "Usage Trends":
        return <UsageTrends />;
      case "Forecasts":
        return <Forecasts />;
      case "Reports":
        return <Reports />;
      case "Insights":
        return <Insights />;
      default:
        return (
          <>
            <IntroPage />
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow mb-8 px-5 py-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {kpiData.map(({ title, value, delta, subtitle }, idx) => (
                  <KPICard
                    key={idx}
                    title={title}
                    value={value}
                    delta={delta}
                    subtitle={subtitle}
                  />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow px-6 py-6">
                <BarComparisonChart data={barChartData} />
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow px-6 py-6">
                <TrafficPieChart data={pieChartData} />
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow px-6 py-6">
                <TrendLineChart data={lineChartData} />
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow px-6 py-6">
                <SystemUsageTable />
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <ThemeProvider>
      <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 transition-all duration-500">
        <Navbar />
        <Header />
        <div className="flex flex-1">
          <Sidebar onSelect={setSelectedPage} />
          <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-10">
            {renderContent()}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
