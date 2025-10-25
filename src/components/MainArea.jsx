import React from "react";
import ChartCard from "../components/ChartCard";

export default function MainArea() {
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const cpuData = [40, 55, 60, 70, 65, 75, 90];
  const storageData = [50, 45, 60, 55, 80, 85, 70];

  return (
    <main className="flex-1 p-8 bg-gray-100 h-screen overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Dashboard Overview
      </h2>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartCard title="CPU Usage (%)" labels={labels} dataValues={cpuData} />
        <ChartCard title="Storage Usage (%)" labels={labels} dataValues={storageData} />
      </div>
    </main>
  );
}
