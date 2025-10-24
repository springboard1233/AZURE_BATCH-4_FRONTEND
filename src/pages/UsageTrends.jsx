import React from 'react';
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  Filler,
} from "chart.js";
import ChartCard from "../components/ChartCard"; 

// CRITICAL FIX: Register ALL required Chart.js elements here
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  Filler,
);

const CHART_COLORS = [
  '#3b82f6', // Blue
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#8b5cf6', // Violet
  '#f43f5e', // Rose
];

export default function UsageTrends() {
  
  // 1. CPU USAGE TRENDS (Line Graph Data)
  const cpuLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const cpuData = {
    labels: cpuLabels,
    datasets: [
      {
        label: "Avg Utilization",
        data: [45, 52, 60, 58, 65, 72, 69],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderWidth: 2,
        tension: 0.4,
        fill: 'origin',
        pointBackgroundColor: '#3b82f6',
      },
      {
        label: "Capacity Limit (80%)",
        data: cpuLabels.map(() => 80),
        borderColor: '#ef4444', 
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderDash: [5, 5],
        pointRadius: 0,
        tension: 0,
      }
    ],
  };

  const cpuOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { y: { beginAtZero: true, max: 100 } },
    plugins: { tooltip: { mode: 'index', intersect: false } }
  };

  // 2. STORAGE CONSUMPTION (Bar Graph Data)
  const storageLabels = ['Blob Storage', 'Managed Disks', 'Archive Storage', 'File Shares'];
  const storageData = {
    labels: storageLabels,
    datasets: [{
      label: "Consumption (TB)",
      data: [1500, 780, 2100, 450],
      backgroundColor: CHART_COLORS.slice(0, 4),
      borderColor: '#e5e7eb',
      borderWidth: 1,
    }],
  };

  const storageOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, title: { display: true, text: 'Consumption (TB)' } } },
    hover: { mode: 'index', intersect: false }
  };


  // 3. REGION-WISE DEMAND (Doughnut Chart Data)
  const regionLabels = ['US East 2', 'Europe West', 'Asia Southeast', 'US West 3', 'Other'];
  const regionData = {
    labels: regionLabels,
    datasets: [{
      label: 'Demand Share',
      data: [35, 25, 18, 12, 10],
      backgroundColor: CHART_COLORS,
      borderColor: '#ffffff',
      borderWidth: 2,
      hoverOffset: 8,
    }],
  };

  const regionOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: { position: 'bottom' },
      tooltip: { callbacks: { label: (context) => ` ${context.label}: ${context.formattedValue}%` } }
    }
  };

  // Helper component to render the appropriate chart inside the card
  const RenderChart = ({ type, data, options }) => {
    switch (type) {
      case 'bar':
        return <Bar data={data} options={options} />;
      case 'doughnut':
        return <Doughnut data={data} options={options} />;
      case 'line':
      default:
        return <Line data={data} options={options} />;
    }
  };


  return (
    <div className="space-y-4 h-full">
      <h1 className="text-3xl font-bold text-gray-800">Resource Utilization Dashboard</h1>
      
      {/* Layout: Line chart wide, Bar and Doughnut side-by-side below */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-160px)]">
        
        {/* Chart 1: CPU Usage Trend (Line) - Spans all 3 columns */}
        <div className="lg:col-span-3">
            <ChartCard title="Compute Utilization Trend (Daily Avg)">
                <RenderChart type="line" data={cpuData} options={cpuOptions} />
            </ChartCard>
        </div>
        
        {/* Chart 2: Storage Consumption (Bar) - Spans 2 columns */}
        <div className="lg:col-span-2">
            <ChartCard title="Storage Consumption by Service (TB)">
                <RenderChart type="bar" data={storageData} options={storageOptions} />
            </ChartCard>
        </div>
        
        {/* Chart 3: Regional Demand (Doughnut) - Spans 1 column */}
        <div className="lg:col-span-1">
            <ChartCard title="Regional Demand Share (%)">
                <RenderChart type="doughnut" data={regionData} options={regionOptions} />
            </ChartCard>
        </div>

      </div>
    </div>
  );
}