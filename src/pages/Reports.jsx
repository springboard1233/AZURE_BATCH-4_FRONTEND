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
          borderColor: "#99bde7",
          backgroundColor: "rgba(153,189,231,0.2)",
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
          borderColor: "#bfcfdc",
          backgroundColor: "rgba(191,207,220,0.18)",
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
          color: "#557399",
          font: { size: 13, weight: "500" },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#557399", font: { weight: "bold" } },
        grid: { color: "rgba(107,114,128,0.09)" },
      },
      y: {
        ticks: { color: "#557399", font: { weight: "bold" } },
        grid: { color: "rgba(107,114,128,0.09)" },
      },
    },
  };

  const handleDownload = (type) => {
    alert(`📊 Downloading ${type} report...`);
  };

  const tabs = [
    { id: "performance", label: "Performance", color: "from-[#99bde7] to-[#b7d2f7]" },
    { id: "forecast", label: "Forecast", color: "from-[#bfcfdc] to-[#99bde7]" },
  ];

  const tabTransition = {
    hidden: { opacity: 0, y: 30 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.4, ease: "easeIn" } },
  };

  // Card component with hover effect
  const Card = ({ children }) => (
    <motion.div
      className="
        max-w-5xl mx-auto
        bg-[#f7f7f5]/90 dark:bg-gradient-to-br dark:from-fuchsia-600 dark:to-orange-400/70
        border border-[#b7d2f7] dark:border-none
        backdrop-blur-md rounded-2xl shadow-xl p-6 overflow-hidden
      "
      whileHover={{
        scale: 1.016,
        boxShadow: "0 10px 24px -3px rgba(34,37,41,0.10), 0 4px 12px -2px rgba(34,37,41,0.05)",
        borderColor: "#99bde7",
      }}
      transition={{ type: "spring", stiffness: 320 }}
    >
      {children}
    </motion.div>
  );

  return (
    <div className="
      p-8 min-h-screen
      bg-[#fffff0] dark:bg-gray-900
      transition-all duration-700
    ">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          text-3xl font-bold text-center mb-10
          text-[#2d2a1f] dark:text-white
        "
      >
         Analytics & Reports Dashboard
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
                : "bg-[#ebedf0] dark:bg-gray-700 text-[#2d2a1f] dark:text-gray-300 hover:bg-[#dbeafe] dark:hover:bg-gray-600"
            }`}
          >
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Animated Content Card with Hover */}
      <AnimatePresence mode="wait">
        {activeTab === "performance" && performanceData && (
          <Card>
            <motion.div
              key="performance"
              variants={tabTransition}
              initial="hidden"
              animate="enter"
              exit="exit"
            >
              <h3 className="text-2xl font-semibold mb-2 text-[#225577] dark:text-blue-400 text-center">
                Performance Overview
              </h3>
              <p className="text-[#557399] dark:text-orange-200 mb-6 text-center">
                This report visualizes system performance trends for the past 6 months.
              </p>
              <div className="h-80 mb-6">
                <Line data={performanceData} options={chartOptions} />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleDownload("Performance")}
                className="
                  px-6 py-3 bg-gradient-to-r from-[#99bde7] to-[#b7d2f7] text-[#2d2a1f]
                  rounded-lg hover:from-[#b7d2f7] hover:to-[#99bde7] font-medium shadow-md transition
                  dark:bg-gradient-to-r dark:from-fuchsia-700 dark:to-orange-500 dark:text-white dark:hover:from-orange-400 dark:hover:to-fuchsia-700
                "
              >
                ⬇️ Download Performance Report
              </motion.button>
            </motion.div>
          </Card>
        )}

        {activeTab === "forecast" && forecastData && (
          <Card>
            <motion.div
              key="forecast"
              variants={tabTransition}
              initial="hidden"
              animate="enter"
              exit="exit"
            >
              <h3 className="text-2xl font-semibold mb-2 text-[#557399] dark:text-orange-300 text-center">
                Forecast Insights
              </h3>
              <p className="text-[#557399] dark:text-orange-200 mb-6 text-center">
                This section provides predictive analytics based on AI-powered forecasts.
              </p>
              <div className="h-80 mb-6">
                <Line data={forecastData} options={chartOptions} />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleDownload("Forecast")}
                className="
                  px-6 py-3 bg-gradient-to-r from-[#bfcfdc] to-[#99bde7] text-[#2d2a1f]
                  rounded-lg hover:from-[#99bde7] hover:to-[#bfcfdc] font-medium shadow-md transition
                  dark:bg-gradient-to-r dark:from-fuchsia-700 dark:to-orange-500 dark:text-white dark:hover:from-orange-400 dark:hover:to-fuchsia-700
                "
              >
                ⬇️ Download Forecast Report
              </motion.button>
            </motion.div>
          </Card>
        )}
      </AnimatePresence>
    </div>
  );
}
