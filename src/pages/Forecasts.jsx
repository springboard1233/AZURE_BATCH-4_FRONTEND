import { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function Forecasts() {
  // Generate random predictions each refresh
  const predictions = useMemo(() => {
    const randomPercent = () => Math.floor(Math.random() * 40) + 50; // 50–90%
    const randomStorage = () => (Math.random() * 1 + 2).toFixed(1); // 2.0–3.0 TB
    const randomBandwidth = () => Math.floor(Math.random() * 400) + 600; // 600–1000 Mbps

    return [
      {
        metric: "CPU Demand",
        current: `${randomPercent()}%`,
        nextMonth: `${randomPercent()}%`,
        trend: "increasing",
      },
      {
        metric: "Storage Usage",
        current: `${randomStorage()} TB`,
        nextMonth: `${randomStorage()} TB`,
        trend: "increasing",
      },
      {
        metric: "Network Bandwidth",
        current: `${randomBandwidth()} Mbps`,
        nextMonth: `${randomBandwidth()} Mbps`,
        trend: "increasing",
      },
    ];
  }, []); // runs once per page load

  const optimizations = [
    {
      title: "Resource Scaling",
      recommendation: "Consider upgrading CPU capacity in East region",
      impact: "High",
    },
    {
      title: "Cost Optimization",
      recommendation: "Potential to reduce unused storage in West region",
      impact: "Medium",
    },
    {
      title: "Performance Enhancement",
      recommendation: "Load balancer configuration adjustment recommended",
      impact: "Low",
    },
  ];

  const COLORS = ["#0078D4", "#00B294"];

  const parseValue = (value) => parseFloat(value) || 0;

  const chartData = {
    "CPU Demand": [
      { name: "Used", value: parseValue(predictions[0].current) },
      { name: "Available", value: 100 - parseValue(predictions[0].current) },
    ],
    "Storage Usage": [
      { name: "Used", value: parseValue(predictions[1].current) * 100 / parseValue(predictions[1].nextMonth) },
      { name: "Available", value: 100 - (parseValue(predictions[1].current) * 100 / parseValue(predictions[1].nextMonth)) },
    ],
    "Network Bandwidth": [
      { name: "Used", value: parseValue(predictions[2].current) * 100 / parseValue(predictions[2].nextMonth) },
      { name: "Available", value: 100 - (parseValue(predictions[2].current) * 100 / parseValue(predictions[2].nextMonth)) },
    ],
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">FORECAST RESULTS</h2>

      {/* Predictions Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">Resource Predictions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {predictions.map((pred, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
              <h4 className="font-medium text-gray-800 mb-2">{pred.metric}</h4>

              {/* Pie Chart */}
              <PieChart width={200} height={200}>
                <Pie
                  data={chartData[pred.metric]}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label
                >
                  {chartData[pred.metric].map((entry, i) => (
                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>

              {/* Stats */}
              <div className="mt-2 text-center">
                <p className="text-sm text-gray-600">Current: {pred.current}</p>
                <p className="text-sm text-gray-600">Next Month: {pred.nextMonth}</p>
                <p className={`text-sm ${pred.trend === "increasing" ? "text-red-600" : "text-green-600"}`}>
                  Trend: {pred.trend}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Optimizations Section */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Capacity Optimizations</h3>
        <div className="space-y-4">
          {optimizations.map((opt, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-800">{opt.title}</h4>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    opt.impact === "High"
                      ? "bg-red-100 text-red-800"
                      : opt.impact === "Medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {opt.impact} Impact
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600">{opt.recommendation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
