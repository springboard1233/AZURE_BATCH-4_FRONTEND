import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ChartCard from "../components/ChartCard";

export default function UsageTrends() {
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const regionLabels = ["East", "West", "North", "South"];

  const [cpuValues, setCpuValues] = useState([]);
  const [storageValues, setStorageValues] = useState([]);
  const [regionValues, setRegionValues] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const chartDescriptions = {
    cpu: "Shows the average CPU utilization across different regions throughout the week. Higher values indicate increased computational load.",
    storage: "Displays daily storage consumption patterns. Helps identify peak usage times and plan capacity accordingly.",
    region: "Illustrates demand distribution across geographical regions, helping identify high-traffic areas.",
  };

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

  const charts = [
    {
      id: 1,
      title: "CPU Usage per Region",
      labels: labels,
      dataValues: cpuValues,
      chartType: "line",
      description: chartDescriptions.cpu,
    },
    {
      id: 2,
      title: "Storage Consumption",
      labels: labels,
      dataValues: storageValues,
      chartType: "bar",
      description: chartDescriptions.storage,
    },
    {
      id: 3,
      title: "Region-wise Demand",
      labels: regionLabels,
      dataValues: regionValues,
      chartType: "bar",
      description: chartDescriptions.region,
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % charts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + charts.length) % charts.length);
  };

  return (
    <div className="p-6 flex flex-col items-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-6 text-center">Usage Trends Overview</h2>

      <div className="relative w-full max-w-4xl overflow-hidden">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 p-2 rounded-full z-10"
        >
          <FaArrowLeft />
        </button>

        {/* Chart Slide */}
        <div className="relative h-[600px] flex items-center justify-center md:h-[700px] lg:h-[750px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={charts[currentIndex].id}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.6 }}
              className="absolute w-full flex flex-col items-center"
            >
              <div className="relative group">
                <ChartCard
                  title={charts[currentIndex].title}
                  labels={charts[currentIndex].labels}
                  dataValues={charts[currentIndex].dataValues}
                  chartType={charts[currentIndex].chartType}
                  large
                />
                <div className="invisible group-hover:visible absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-3 rounded-md text-sm w-80 text-center shadow-lg">
                  {charts[currentIndex].description}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 p-2 rounded-full z-10"
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="flex space-x-2 mt-6">
        {charts.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              i === currentIndex
                ? "bg-blue-500"
                : "bg-gray-300 dark:bg-gray-600"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
