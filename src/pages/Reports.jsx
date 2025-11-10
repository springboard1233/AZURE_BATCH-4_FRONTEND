import { useState } from "react";
import KPICard from "../components/KPICard";
import ChartCard from "../components/ChartCard";
import BarComparisonChart from "../components/charts/BarComparisonChart";

export default function Reports() {
  const [range, setRange] = useState("Last 30 days");

  const reportData = [
    { name: "Week 1", current: 145, forecast: 160 },
    { name: "Week 2", current: 180, forecast: 200 },
    { name: "Week 3", current: 210, forecast: 240 },
    { name: "Week 4", current: 190, forecast: 230 },
  ];

  return (
    <div className="space-y-6">

      {/* ✅ Header + Dropdown */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Usage & Spend Reports
        </h2>

        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
        >
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>Year to Date</option>
        </select>
      </div>

      {/* ✅ KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <KPICard
          title="Total Spend"
          value="$24,520"
          delta={+6.1}
          subtitle={range}
        />

        <KPICard
          title="Avg. Daily Cost"
          value="$817"
          delta={+2.8}
          subtitle="vs previous period"
        />

        <KPICard
          title="High-impact Alerts"
          value="4"
          delta={-1.0}
          subtitle="active"
        />

        <KPICard
          title="Estimated Overruns"
          value="$1,340"
          delta={-3.2}
          subtitle="forecasted risk"
        />

      </div>

      {/* ✅ Usage vs Forecast Chart */}
      <ChartCard
        title="Usage vs Forecast"
        description={`Performance for ${range.toLowerCase()}`}
      >
        <BarComparisonChart data={reportData} />
      </ChartCard>

    </div>
  );
}
