import React, { useMemo, useState, useEffect } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  Legend as ReLegend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpCircle, ArrowDownCircle, Cpu, HardDrive, Network } from "lucide-react";

// Main component
export default function Forecasts() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeOpt, setActiveOpt] = useState(null);

  const metrics = useMemo(() => {
    const randPercent = (min, max) => Math.round(Math.random() * (max - min) + min);

    const cpuCurrent = randPercent(55, 80);
    const cpuForecast = Array.from({ length: 7 }, (_, i) =>
      Math.round(cpuCurrent + i * randPercent(1, 3))
    );

    const storageCurrent = Number((Math.random() * 0.9 + 2.0).toFixed(2));
    const storageNext = Number((storageCurrent + Math.random() * 0.6 + 0.1).toFixed(2));
    const storageForecast = Array.from({ length: 7 }, (_, i) =>
      Number((storageCurrent + i * ((storageNext - storageCurrent) / 6)).toFixed(2))
    );

    const netCurrent = randPercent(600, 900);
    const netForecast = Array.from({ length: 7 }, (_, i) =>
      Math.round(netCurrent + i * randPercent(10, 30))
    );

    return [
      {
        id: "cpu",
        icon: <Cpu className="w-6 h-6 text-white/90" />,
        title: "CPU Demand",
        unit: "%",
        current: cpuCurrent,
        forecast: cpuForecast,
        pie: [
          { name: "Used", value: cpuCurrent },
          { name: "Remaining", value: 100 - cpuCurrent },
        ],
        gradientFrom: "from-blue-500",
        gradientTo: "to-blue-400",
      },
      {
        id: "storage",
        icon: <HardDrive className="w-6 h-6 text-white/90" />,
        title: "Storage Usage",
        unit: "TB",
        current: storageCurrent,
        forecast: storageForecast,
        pie: (() => {
          const usedPercent = Math.round((storageCurrent / storageNext) * 100);
          return [
            { name: "Used", value: usedPercent },
            { name: "Remaining", value: Math.max(0, 100 - usedPercent) },
          ];
        })(),
        gradientFrom: "from-blue-500",
        gradientTo: "to-blue-400",
      },
      {
        id: "network",
        icon: <Network className="w-6 h-6 text-white/90" />,
        title: "Network Bandwidth",
        unit: "Mbps",
        current: netCurrent,
        forecast: netForecast,
        pie: (() => {
          const next = netForecast[netForecast.length - 1] || netCurrent;
          const usedPercent = Math.round((netCurrent / Math.max(1, next)) * 100);
          return [
            { name: "Used", value: Math.min(100, usedPercent) },
            { name: "Remaining", value: Math.max(0, 100 - usedPercent) },
          ];
        })(),
        gradientFrom: "from-blue-500",
        gradientTo: "to-blue-400",
      },
    ];
  }, []);

  // auto-slide every 9s
  useEffect(() => {
    const t = setInterval(() => setCurrentSlide((p) => (p + 1) % metrics.length), 9000);
    return () => clearInterval(t);
  }, [metrics.length]);

  // Optimizations (timeline items)
  const optimizations = [
    {
      id: "opt-cpu",
      title: "Auto-scale CPU",
      description:
        "Enable auto-scaling for east-region CPU clusters during predicted peak weeks. Configure conservative cooldown and step scaling policies.",
      impact: "High",
      metric: "cpu",
      date: "2025-11-01",
    },
    {
      id: "opt-storage",
      title: "Storage Rightsizing",
      description:
        "Reclaim unused storage, identify cold data and migrate to cheaper tiers (Archive/Blob Cool). Run lifecycle policies weekly.",
      impact: "Medium",
      metric: "storage",
      date: "2025-10-18",
    },
    {
      id: "opt-network",
      title: "Network QoS Tuning",
      description:
        "Adjust QoS(Quality of Service) rules to prioritize critical traffic, apply burst controls on non-critical flows and reduce latency spikes.",
      impact: "Low",
      metric: "network",
      date: "2025-10-10",
    },
  ];

  const COLORS = ["#00B5D8", "#E2E8F0"];

  const makeLineData = (forecast) =>
    forecast.map((v, i) => ({ name: `Week ${i + 1}`, value: v }));

  // framer variants
  const slideVariants = {
    hidden: { opacity: 0, x: 80, scale: 0.98 },
    enter: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      x: -80,
      scale: 0.98,
      transition: { duration: 0.6, ease: "easeIn" },
    },
  };

  const timelineItemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.12 * i, duration: 0.45 },
    }),
  };

  const nextSlide = () => setCurrentSlide((p) => (p + 1) % metrics.length);
  const prevSlide = () => setCurrentSlide((p) => (p - 1 + metrics.length) % metrics.length);

  return (
    <div className="p-6 md:p-8 lg:p-10 min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 transition-colors duration-500">
      <motion.h1
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400"
      >
        Azure Demand Forecasting
      </motion.h1>

      {/* slideshow container */}
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={metrics[currentSlide].id}
              variants={slideVariants}
              initial="hidden"
              animate="enter"
              exit="exit"
              className="w-full"
            >
              <ForecastCard
                metric={metrics[currentSlide]}
                COLORS={COLORS}
                makeLineData={makeLineData}
              />
            </motion.div>
          </AnimatePresence>

          {/* nav controls */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={prevSlide}
              className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 shadow-sm transition"
            >
              ← Previous
            </button>
            <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
              {currentSlide + 1} / {metrics.length}
            </div>
            <button
              onClick={nextSlide}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-md transition"
            >
              Next →
            </button>
          </div>
        </div>

        {/* timeline - neat vertical list */}
        <div className="mt-12 max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Optimization Insights</h3>

          <div className="relative pl-8">
            {/* vertical line */}
            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 rounded" />

            <ul className="space-y-8">
              {optimizations.map((opt, i) => {
                const active = opt.metric === metrics[currentSlide].id;
                const expanded = activeOpt === opt.id;
                return (
                  <motion.li
                    key={opt.id}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={timelineItemVariants}
                    className="relative"
                  >
                    {/* dot */}
                    <div
                      className={`absolute -left-4 top-1 w-3 h-3 rounded-full border-2 ${
                        active ? "bg-blue-500 border-blue-600" : "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600"
                      }`}
                    />
                    <div
                      className={`pl-6 py-4 pr-4 rounded-xl shadow-sm transition-all cursor-pointer ${
                        active ? "bg-white dark:bg-gray-800 ring-1 ring-blue-200/50" : "bg-white/80 dark:bg-gray-800/60"
                      }`}
                      onClick={() => setActiveOpt(expanded ? null : opt.id)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{opt.title}</h4>
                          <div className="text-xs text-gray-500 mt-1">{opt.date}</div>
                        </div>
                        <div className="text-right">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              opt.impact === "High"
                                ? "bg-red-100 text-red-800"
                                : opt.impact === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {opt.impact}
                          </span>
                        </div>
                      </div>
                      {/* Only show summary; expanded details show below */}
                    </div>
                    {expanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`pl-6 pr-4 pt-3 pb-4 mt-0.5 mb-0 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-blue-100 dark:border-gray-800 text-sm text-gray-700 dark:text-gray-200`}
                      >
                        <div><span className="font-semibold">Description:</span> {opt.description}</div>
                        <div className="mt-2"><span className="font-semibold">Impact:</span> {opt.impact}</div>
                        <div className="mt-2 flex items-center gap-3">
                          <button
                            onClick={() => setCurrentSlide(metrics.findIndex((m) => m.id === opt.metric))}
                            className="text-sm px-3 py-1 rounded-md font-medium bg-blue-50 text-blue-700 border border-blue-100"
                          >
                            View related metric
                          </button>
                          <a
                            href="#"
                            onClick={(e) => e.preventDefault()}
                            className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                          >
                            Learn more →
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----- ForecastCard component ----- */
function ForecastCard({ metric: m, COLORS, makeLineData }) {
  // choose background classes dynamically
  const bgFrom = m.gradientFrom || "from-blue-600";
  const bgTo = m.gradientTo || "to-teal-400";

  return (
    <div
      className={`rounded-2xl p-6 md:p-8 shadow-xl overflow-hidden bg-gradient-to-r ${bgFrom} ${bgTo} text-white`}
      style={{ minHeight: 280 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
            {m.icon}
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">{m.title}</h2>
            <div className="text-sm opacity-90 mt-1">Forecast Overview</div>
          </div>
        </div>
        <div className="text-right">
          <div className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-semibold">Forecast</div>
        </div>
      </div>

      <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Pie / donut */}
        <div className="flex flex-col items-center md:items-start md:justify-center">
          <PieChart width={160} height={160}>
            <Pie
              data={m.pie}
              cx="50%"
              cy="50%"
              innerRadius={46}
              outerRadius={72}
              paddingAngle={6}
              dataKey="value"
              labelLine={false}
              label={({ percent }) => `${Math.round(percent * 100)}%`}
            >
              {m.pie.map((entry, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="#ffffff" strokeWidth={1} />
              ))}
            </Pie>
          </PieChart>

          <div className="mt-3 flex items-center gap-3">
            {m.forecast[m.forecast.length - 1] >= m.current ? (
              <ArrowUpCircle className="w-5 h-5 text-white/90" />
            ) : (
              <ArrowDownCircle className="w-5 h-5 text-white/90" />
            )}
            <div>
              <div className="text-xs text-white/90">Current</div>
              <div className="text-xl md:text-2xl font-bold">{m.current} {m.unit}</div>
            </div>
          </div>
        </div>

        {/* blank column for spacing on small screens (keeps layout balanced) */}
        <div className="hidden md:block" />

        {/* Line chart */}
        <div className="md:col-span-2 bg-white/10 rounded-lg p-3 md:p-4">
          <div className="h-44 md:h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={makeLineData(m.forecast)}>
                <defs>
                  <linearGradient id={`grad-${m.id}`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.8)" }} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.8)" }} />
                <ReTooltip contentStyle={{ background: "#0b1220", borderRadius: 8, color: "#fff" }} />
                <ReLegend verticalAlign="bottom" height={16} wrapperStyle={{ color: "rgba(255,255,255,0.85)" }} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="white"
                  strokeWidth={3}
                  dot={{ r: 3, stroke: "#fff" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 text-sm text-white/90 flex items-center justify-between">
            <div>7-Week projection</div>
            <div className="font-semibold">{Array.isArray(m.forecast) ? m.forecast[m.forecast.length - 1] : "-"} {m.unit}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
