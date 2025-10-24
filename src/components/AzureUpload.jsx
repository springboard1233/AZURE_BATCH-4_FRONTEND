import React, { useState } from "react";
import Papa from "papaparse";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const chartColors = [
  "#36A2EB", "#FF6384", "#FFCE56",
  "#4BC0C0", "#9966FF", "#FF9F40"
];

// Automatic column finder with multiple keyword support
const findCol = (cols, ...keywords) =>
  cols.find((col) =>
    keywords.some((keyword) =>
      col.toLowerCase().replace(/[_\s]/g, "").includes(keyword)
    )
  );

// Try to pick a categorical (string) column, fallback to first if not found
const pickLabelCol = (columns, data) => {
  const strCol = columns.find(
    (col) => typeof data[0][col] === "string"
  );
  return strCol || columns[0];
};

const CSVUniversalVisualizer = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        setData(results.data);
        setColumns(Object.keys(results.data[0] || {}));
      },
    });
  };

  if (data.length === 0) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-lg max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-blue-700">CSV Universal Visualizer</h1>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="border p-2 rounded-md mb-6 w-full"
        />
        <p className="text-gray-600">Upload a CSV file to visualize CPU, storage, and region-wise demand charts automatically.</p>
      </div>
    );
  }

  // Predict columns by keywords
  const cpuCol = findCol(columns, "cpu", "usage") || "";
  const storageCol = findCol(columns, "storage") || "";
  const demandCol = findCol(columns, "demand") || "";
  // For region-based charts, look for "region" or "location"
  const regionCol = findCol(columns, "region", "location") || pickLabelCol(columns, data);

  // Prepare labels for line and bar charts (categorical)
  const baseLabels = data.map((row) =>
    row[regionCol] !== undefined ? String(row[regionCol]) : ""
  );

  // Prepare CPU usage line chart data
  const cpuData =
    cpuCol && regionCol
      ? {
          labels: baseLabels,
          datasets: [
            {
              label: cpuCol,
              data: data.map((row) => Number(row[cpuCol]) || 0),
              borderColor: chartColors[0],
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              tension: 0.3,
              fill: true,
            },
          ],
        }
      : null;

  // Prepare storage consumption bar chart data
  const storageData =
    storageCol && regionCol
      ? {
          labels: baseLabels,
          datasets: [
            {
              label: storageCol,
              data: data.map((row) => Number(row[storageCol]) || 0),
              backgroundColor: chartColors[1],
              borderColor: chartColors[1],
              borderWidth: 1,
            },
          ],
        }
      : null;

  // Prepare region-wise demand pie chart data by aggregating values per region
  let demandPieData = null;
  if (demandCol && regionCol) {
    const aggregation = {};
    data.forEach((row) => {
      const region = row[regionCol] !== undefined && row[regionCol] !== null
        ? String(row[regionCol])
        : "Unknown";
      const value = Number(row[demandCol]);
      if (!isNaN(value) && value !== null && value !== undefined) {
        aggregation[region] = (aggregation[region] || 0) + value;
      }
    });

    const labels = Object.keys(aggregation);
    const values = labels.map((region) => aggregation[region]);
    if (labels.length && values.some((v) => v > 0)) {
      demandPieData = {
        labels,
        datasets: [{
          label: demandCol,
          data: values,
          backgroundColor: chartColors.slice(0, labels.length),
          borderColor: "#fff",
          borderWidth: 2,
        }],
      };
    }
  }

  const options = (title) => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: true, text: title },
      legend: { position: "top" },
    },
  });

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">CSV Universal Visualizer</h1>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="border p-2 rounded-md mb-6 w-full"
      />

      {cpuData && (
        <div className="my-8 h-[400px]">
          <Line data={cpuData} options={options(`${cpuCol} (Line Chart)`)} />
        </div>
      )}

      {storageData && (
        <div className="my-8 h-[400px]">
          <Bar data={storageData} options={options(`${storageCol} (Bar Chart)`)} />
        </div>
      )}

      {demandPieData && (
        <div className="my-8 h-[400px] w-[400px] mx-auto">
          <Pie data={demandPieData} options={options(`${demandCol} (Pie Chart)`)} />
        </div>
      )}

      {!demandPieData && (
        <div className="my-8 text-red-600 font-semibold">
          Pie chart couldn't be generated: No valid region or demand column found, or no data to display.
        </div>
      )}
    </div>
  );
};

export default CSVUniversalVisualizer;
