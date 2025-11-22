import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ChartCard from "../components/ChartCard";

export default function UsageTrends() {
  const weekLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  const regions = ["East", "West", "North", "South"];

  const [region, setRegion] = useState("East");
  const [cpuBefore, setCpuBefore] = useState([]);
  const [cpuAfter, setCpuAfter] = useState([]);
  const [storageValues, setStorageValues] = useState([]);
  const [monthlyValues, setMonthlyValues] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const chartDescriptions = {
    cpuTrend:
      "Compares CPU usage trends before and after feature engineering for better forecasting accuracy.",
    regionTrend:
      "Shows average CPU usage per selected region throughout the week.",
    seasonal:
      "Displays weekly vs. monthly demand variations to visualize seasonal usage patterns.",
  };

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateRandomArray(length, min, max) {
    return Array.from({ length }, () => randomInt(min, max));
  }

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setCpuBefore(generateRandomArray(weekLabels.length, 30, 80));
      setCpuAfter(generateRandomArray(weekLabels.length, 50, 95));
      setStorageValues(generateRandomArray(weekLabels.length, 40, 90));
      setMonthlyValues(generateRandomArray(monthLabels.length, 45, 100));
      setIsLoading(false);
    }, 800);
  }, [region]);

  const charts = [
    {
      id: 1,
      title: "CPU Usage (Before vs After Feature Engineering)",
      labels: weekLabels,
      datasets: [
        { label: "Before", data: cpuBefore },
        { label: "After", data: cpuAfter },
      ],
      description: chartDescriptions.cpuTrend,
    },
    {
      id: 2,
      title: `CPU Usage Trend – ${region} Region`,
      labels: weekLabels,
      datasets: [{ label: region, data: storageValues }],
      description: chartDescriptions.regionTrend,
    },
    {
      id: 3,
      title: "Seasonal Pattern (Weekly vs Monthly)",
      labels: monthLabels,
      datasets: [
        { label: "Weekly Avg", data: cpuBefore.slice(0, 7) },
        { label: "Monthly Avg", data: monthlyValues },
      ],
      description: chartDescriptions.seasonal,
    },
  ];

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % charts.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + charts.length) % charts.length);

  return (
    <div className="
      p-6 flex flex-col items-center 
      bg-[#fffff0] dark:bg-gray-900
      text-[#2d2a1f] dark:text-white 
      min-h-screen transition-colors duration-300
    ">
      <h2 className="text-2xl font-bold mb-4 text-center text-[#2d2a1f] dark:text-white">
        Interactive Usage Trends
      </h2>

      {/* Region Selector */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <label className="text-sm font-medium text-[#225577] dark:text-orange-200">Select Region:</label>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="
            bg-[#ebedf0] dark:bg-gray-800
            text-[#2d2a1f] dark:text-orange-100 
            px-3 py-2 rounded-md focus:outline-none 
            border border-[#b7d2f7] dark:border-orange-600
            font-bold
          "
        >
          {regions.map((r) => (
            <option key={r} value={r} className="text-[#2d2a1f] dark:text-orange-100">{r}</option>
          ))}
        </select>
      </div>

      {/* Chart Slider */}
      <div className="relative w-full max-w-6xl overflow-hidden">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="
            absolute left-2 top-1/2 transform -translate-y-1/2
            bg-[#e0f3fa] dark:bg-fuchsia-700
            hover:bg-[#b7d2f7] dark:hover:bg-fuchsia-600
            p-2 rounded-full z-10
            shadow-md
            text-[#225577] dark:text-orange-100
          "
        >
          <FaArrowLeft />
        </button>

        {/* Chart Content */}
        <div className="relative h-[700px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={charts[currentIndex].id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6 }}
              className="absolute w-full flex flex-col items-center"
            >
              {isLoading ? (
                <div className="text-center text-[#557399]">Loading data...</div>
              ) : (
                <div className="relative group w-full max-w-5xl">
                  <ChartCard
                    title={charts[currentIndex].title}
                    labels={charts[currentIndex].labels}
                    dataValues={charts[currentIndex].datasets}
                    multiLine
                    large
                  />
                  <div className="invisible group-hover:visible absolute -bottom-20 left-1/2 transform -translate-x-1/2 bg-[#b7d2f7] dark:bg-gray-800 text-[#225577] dark:text-white p-3 rounded-md text-sm w-96 text-center shadow-lg">
                    {charts[currentIndex].description}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="
            absolute right-2 top-1/2 transform -translate-y-1/2
            bg-[#e0f3fa] dark:bg-fuchsia-700
            hover:bg-[#b7d2f7] dark:hover:bg-fuchsia-600
            p-2 rounded-full z-10
            shadow-md
            text-[#225577] dark:text-orange-100
          "
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Indicators */}
      <div className="flex space-x-2 mt-6">
        {charts.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              i === currentIndex
                ? "bg-[#557399] dark:bg-orange-400"
                : "bg-[#b7d2f7] dark:bg-gray-600"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
