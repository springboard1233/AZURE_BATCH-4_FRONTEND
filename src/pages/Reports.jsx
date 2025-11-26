import { useState } from "react";
import KPICard from "../components/KPICard";
import ChartCard from "../components/ChartCard";
import BarComparisonChart from "../components/charts/BarComparisonChart";
import ModelComparisonTable from "../components/ModelComparisonTable"; // ⬅ NEW IMPORT

export default function Reports() {
  const [range, setRange] = useState("Last 30 days");

  const reportData = [
    { name: "Week 1", current: 145, forecast: 160 },
    { name: "Week 2", current: 180, forecast: 200 },
    { name: "Week 3", current: 210, forecast: 240 },
    { name: "Week 4", current: 190, forecast: 230 },
  ];

  // ✔ Model comparison sample data
  const modelResults = [
    {
      name: "LSTM",
      mae: 8.2,
      rmse: 11.9,
      mape: 5.4,
      trainingTime: 21.4,
      inferenceSpeed: 1.2,
    },
    {
      name: "Random Forest",
      mae: 10.1,
      rmse: 14.7,
      mape: 7.1,
      trainingTime: 3.8,
      inferenceSpeed: 0.9,
    },
    {
      name: "ARIMA",
      mae: 12.5,
      rmse: 18.3,
      mape: 9.8,
      trainingTime: 4.2,
      inferenceSpeed: 0.5,
    },
  ];

  return (
    <div className="space-y-6">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Spend" value="$24,520" delta={+6.1} subtitle={range} />
        <KPICard title="Avg. Daily Cost" value="$817" delta={+2.8} subtitle="vs previous period" />
        <KPICard title="High-impact Alerts" value="4" delta={-1.0} subtitle="active" />
        <KPICard title="Estimated Overruns" value="$1,340" delta={-3.2} subtitle="forecasted risk" />
      </div>

      <ChartCard title="Usage vs Forecast" description={`Performance for ${range.toLowerCase()}`}>
        <BarComparisonChart data={reportData} />
      </ChartCard>

      {/* ⬇⬇⬇ NEW SECTION: Step 3 - Model Comparison Dashboard */}
      <ChartCard title="Model Comparison" description="Evaluation of prediction models">
        <ModelComparisonTable models={modelResults} />
      </ChartCard>
      {/* ⬆⬆⬆ END NEW SECTION */}
    </div>
  );
}
