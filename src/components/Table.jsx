// src/components/SystemUsageTable.jsx
import React from "react";

export default function SystemUsageTable() {
  const usageData = [
    {
      id: 1,
      type: "CPU",
      model: "Intel Core i7-12700K",
      usage: "45%",
      temperature: "62°C",
      cores: 12,
    },
    {
      id: 2,
      type: "CPU",
      model: "AMD Ryzen 9 5950X",
      usage: "57%",
      temperature: "70°C",
      cores: 16,
    },
    {
      id: 3,
      type: "Storage",
      model: "Samsung 970 EVO Plus SSD",
      capacity: "1 TB",
      used: "620 GB",
      free: "380 GB",
      usage: "62%",
    },
    {
      id: 4,
      type: "Storage",
      model: "Seagate Barracuda HDD",
      capacity: "2 TB",
      used: "1.1 TB",
      free: "0.9 TB",
      usage: "55%",
    },
  ];

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 m-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        🖥️ CPU & Storage Usage
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-800 uppercase text-sm">
            <tr>
              <th className="py-3 px-4 border">ID</th>
              <th className="py-3 px-4 border">Type</th>
              <th className="py-3 px-4 border">Model</th>
              <th className="py-3 px-4 border">Usage</th>
              <th className="py-3 px-4 border">Temp / Capacity</th>
              <th className="py-3 px-4 border">Other Details</th>
            </tr>
          </thead>
          <tbody>
            {usageData.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-blue-50 transition-colors duration-200"
              >
                <td className="py-3 px-4 border">{item.id}</td>
                <td className="py-3 px-4 border">{item.type}</td>
                <td className="py-3 px-4 border">{item.model}</td>
                <td className="py-3 px-4 border font-medium text-blue-600">
                  {item.usage}
                </td>
                <td className="py-3 px-4 border">
                  {item.type === "CPU" ? item.temperature : item.capacity}
                </td>
                <td className="py-3 px-4 border">
                  {item.type === "CPU"
                    ? `${item.cores} cores`
                    : `Used: ${item.used}, Free: ${item.free}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
