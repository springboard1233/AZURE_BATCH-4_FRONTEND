export default function Forecasts() {
  const predictions = [
    {
      metric: "CPU Demand",
      current: "65%",
      nextMonth: "78%",
      trend: "increasing",
    },
    {
      metric: "Storage Usage",
      current: "2.3 TB",
      nextMonth: "2.9 TB",
      trend: "increasing",
    },
    {
      metric: "Network Bandwidth",
      current: "800 Mbps",
      nextMonth: "950 Mbps",
      trend: "increasing",
    },
  ];

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

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">FORECAST RESULTS</h2>
      
      {/* Predictions Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">Resource Predictions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {predictions.map((pred, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-medium text-gray-800">{pred.metric}</h4>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-600">Current: {pred.current}</p>
                <p className="text-sm text-gray-600">Next Month: {pred.nextMonth}</p>
                <p className={`text-sm ${
                  pred.trend === 'increasing' ? 'text-red-600' : 'text-green-600'
                }`}>
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
                <span className={`px-2 py-1 rounded text-xs ${
                  opt.impact === 'High' ? 'bg-red-100 text-red-800' :
                  opt.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
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