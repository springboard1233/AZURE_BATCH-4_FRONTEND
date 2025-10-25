import React from "react";
import ChartCard from "../components/ChartCard";
import SystemUsageTable from "../components/Table";

export default function MainArea() {
  // Labels for charts and table
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Sample usage data
  const cpuData = [40, 55, 60, 70, 65, 75, 90];      // CPU usage %
  const storageData = [50, 45, 60, 55, 80, 85, 70];  // Storage usage %

  return (
    <main className="flex-1 p-8 bg-gray-100 h-screen overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Dashboard Overview
      </h2>

      {/* Chart Cards */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <ChartCard title="CPU Usage (%)" labels={labels} dataValues={cpuData} />
        
      </div>

      {/* Weekly Usage Table */}
      <SystemUsageTable labels={labels} cpuData={cpuData} storageData={storageData} />
    </main>
  );
}
