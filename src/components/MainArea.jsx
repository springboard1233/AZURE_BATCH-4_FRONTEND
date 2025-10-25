// src/pages/MainArea.jsx
import React from "react";
import SystemUsageTable from "../components/Table";
import StorageUsageChart from "../components/ChartCard";

export default function MainArea() {
  return (
    <main className="flex-1 p-8 bg-gray-100 h-screen overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Dashboard Overview
      </h2>

      {/* Optional: Info card */}
      <div className="bg-white p-8 rounded-lg shadow-md text-center mb-6">
        <p className="text-gray-600">
          System performance charts and usage tables appear below.
        </p>
      </div>

      {/* ✅ CPU & Storage Usage Table */}
      <SystemUsageTable />

      {/* ✅ Storage Usage Pie Chart */}
      <StorageUsageChart />
    </main>
  );
}
