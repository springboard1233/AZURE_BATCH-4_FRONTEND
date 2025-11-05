import React, { useEffect, useState } from "react";
import ChartCard from "../components/ChartCard";
// ...existing code...

export default function UsageTrends() {
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const regionLabels = ["East", "West", "North", "South"];

  const [cpuValues, setCpuValues] = useState([]);
  const [storageValues, setStorageValues] = useState([]);
  const [regionValues, setRegionValues] = useState([]);

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateRandomArray(length, min, max) {
    return Array.from({ length }, () => randomInt(min, max));
  }

  useEffect(() => {
    
    setCpuValues(generateRandomArray(labels.length, 30, 95));
    setStorageValues(generateRandomArray(labels.length, 35, 95));
    setRegionValues(generateRandomArray(regionLabels.length, 80, 140));
  }, []); 

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <ChartCard title="CPU Usage per Region" labels={labels} dataValues={cpuValues} chartType="line" />
      <ChartCard title="Storage Consumption" labels={labels} dataValues={storageValues} chartType="bar" />
      <ChartCard title="Region-wise Demand" labels={regionLabels} dataValues={regionValues} chartType="bar" />
    </div>
  );
}
