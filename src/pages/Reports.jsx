import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { motion, AnimatePresence } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Legend, Tooltip);

export default function Reports() {
  const [activeTab, setActiveTab] = useState("performance");
  const [performanceData, setPerformanceData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  const perfLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const foreLabels = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateRandomArray(length, min, max) {
    return Array.from({ length }, () => randomInt(min, max));
  }

  useEffect(() => {
    setPerformanceData({
      labels: perfLabels,
      datasets: [
        {
          label: "Performance Metrics",
          data: generateRandomArray(perfLabels.length, 60, 95),
          borderColor: "#0078D4",
          backgroundColor: "rgba(0,120,212,0.2)",
          tension: 0.4,
          fill: true,
        },
      ],
    });

    setForecastData({
      labels: foreLabels,
      datasets: [
        {
          label: "Forecast Metrics",
          data: generateRandomArray(foreLabels.length, 85, 100),
          borderColor: "#9b5de5",
          backgroundColor: "rgba(155,93,229,0.2)",
          tension: 0.4,
          fill: true,
        },
      ],
    });
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#6b7280",
          font: { size: 13, weight: "500" },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#6b7280" },
        grid: { color: "rgba(107,114,128,0.1)" },
      },
      y: {
        ticks: { color: "#6b7280" },
        grid: { color: "rgba(107,114,128,0.1)" },
      },
    },
  };

  const handleDownload = (type) => {
    alert(`📊 Downloading ${type} report...`);
  };

  const tabs = [
    { id: "performance", label: "Performance", color: "from-blue-500 to-teal-400" },
    { id: "forecast", label: "Forecast", color: "from-purple-500 to-pink-400" },
  ];

  const tabTransition = {
    hidden: { opacity: 0, y: 30 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.4, ease: "easeIn" } },
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-all duration-700">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400"
      >
        📈 Analytics & Reports Dashboard
      </motion.h2>

      {/* Tabs */}
      <div className="flex justify-center gap-6 mb-8">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2.5 font-semibold rounded-full transition-all duration-300 shadow-md ${
              activeTab === tab.id
                ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Animated Content */}
      <div className="max-w-5xl mx-auto bg-white/80 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-xl p-6 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === "performance" && performanceData && (
            <motion.div
              key="performance"
              variants={tabTransition}
              initial="hidden"
              animate="enter"
              exit="exit"
            >
              <h3 className="text-2xl font-semibold mb-2 text-blue-600 dark:text-blue-400">
                Performance Overview
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                This report visualizes system performance trends for the past 6 months.
              </p>

              <div className="h-80 mb-6">
                <Line data={performanceData} options={chartOptions} />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleDownload("Performance")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-md transition"
              >
                ⬇️ Download Performance Report
              </motion.button>
            </motion.div>
          )}

          {activeTab === "forecast" && forecastData && (
            <motion.div
              key="forecast"
              variants={tabTransition}
              initial="hidden"
              animate="enter"
              exit="exit"
            >
              <h3 className="text-2xl font-semibold mb-2 text-purple-600 dark:text-purple-400">
                Forecast Insights
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                This section provides predictive analytics based on AI-powered forecasts.
              </p>

              <div className="h-80 mb-6">
                <Line data={forecastData} options={chartOptions} />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleDownload("Forecast")}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium shadow-md transition"
              >
                ⬇️ Download Forecast Report
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
