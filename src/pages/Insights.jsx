import { useEffect, useState } from "react";
import { fetchInsights } from "../services/api";

export default function Insights() {
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    fetchInsights().then(setInsights).catch(console.error);
  }, []);

  if (!insights) return <p>Loading insights...</p>;

  return (
    <div className="p-6 text-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-blue-400">Key Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="font-semibold text-lg">Peak Demand Times</h3>
          <p className="text-gray-400 mt-2">{insights.peak_times}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="font-semibold text-lg">Regions with Highest Growth</h3>
          <p className="text-gray-400 mt-2">
            {insights.top_regions.join(", ")}
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="font-semibold text-lg">External Factors Impact</h3>
          <p className="text-gray-400 mt-2">{insights.external_factors}</p>
        </div>
      </div>
    </div>
  );
}
