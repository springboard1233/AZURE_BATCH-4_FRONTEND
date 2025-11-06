import React, { useMemo, useState } from "react";
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
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";

/**
 * Forecasts.jsx
 * - Slideshow style: one metric shown at a time
 * - Dual chart per metric (Pie + Line)
 * - Optimization recommendations included (context-aware highlight)
 * - Framer Motion animations + Recharts visuals
 */

export default function Forecasts() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // --- simulated metrics (replace with API data later) ---
  const metrics = useMemo(() => {
    const randPercent = (min, max) => Math.round(Math.random() * (max - min) + min);

    const cpuCurrent = randPercent(55, 80);
    const cpuForecast = Array.from({ length: 7 }, (_, i) =>
      Math.round(cpuCurrent + i * randPercent(1, 4))
    );

    const storageCurrent = Number((Math.random() * 0.9 + 2.0).toFixed(2));
    const storageNext = Number((storageCurrent + Math.random() * 0.6 + 0.1).toFixed(2));
    const storageForecast = Array.from({ length: 7 }, (_, i) =>
      Number((storageCurrent + i * ((storageNext - storageCurrent) / 6)).toFixed(2))
    );

    const netCurrent = randPercent(600, 920);
    const netForecast = Array.from({ length: 7 }, (_, i) =>
      Math.round(netCurrent + i * randPercent(10, 40))
    );

    return [
      {
        id: "cpu",
        title: "CPU Demand",
        unit: "%",
        current: cpuCurrent,
        forecast: cpuForecast,
        pie: [
          { name: "Used", value: cpuCurrent },
          { name: "Remaining", value: 100 - cpuCurrent },
        ],
      },
      {
        id: "storage",
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
      },
      {
        id: "network",
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
      },
    ];
  }, []);

  const optimizations = [
    {
      title: "Auto-scale CPU",
      description:
        "Enable auto-scaling for east-region CPU clusters during predicted peak weeks.",
      impact: "High",
      forMetric: "cpu",
    },
    {
      title: "Storage Rightsizing",
      description: "Reclaim unused storage and move cold data to cheaper tiers.",
      impact: "Medium",
      forMetric: "storage",
    },
    {
      title: "Network QoS Tuning",
      description: "Adjust QoS rules to prioritize traffic and reduce latency spikes.",
      impact: "Low",
      forMetric: "network",
    },
  ];

  const COLORS = ["#0078D4", "#00B294"];
  const makeLineData = (forecast) => forecast.map((v, i) => ({ name: `Week ${i + 1}`, value: v }));

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % metrics.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + metrics.length) % metrics.length);

  const cardAnim = {
    hidden: { opacity: 0, x: 80 },
    enter: { opacity: 1, x: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, x: -80, transition: { duration: 0.6 } },
  };

  return (
    <div className="p-6 flex flex-col items-center min-h-screen dark:bg-gray-900 transition-all duration-300">
      <motion.h1
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400 text-center"
      >
        Azure Demand Forecasting
      </motion.h1>

      {/* slideshow container */}
      <div className="w-full max-w-5xl relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={metrics[currentSlide].id}
            variants={cardAnim}
            initial="hidden"
            animate="enter"
            exit="exit"
          >
            <ForecastCard metric={metrics[currentSlide]} COLORS={COLORS} makeLineData={makeLineData} />
          </motion.div>
        </AnimatePresence>

        {/* nav and slide counter */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={prevSlide}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            ← Previous
          </button>

          <div className="text-gray-600 dark:text-gray-300 font-medium">
            {currentSlide + 1} / {metrics.length}
          </div>

          <button
            onClick={nextSlide}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Optimizations section (restored) */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="w-full max-w-5xl mt-8"
      >
        <h3 className="text-xl font-semibold mb-4">Optimization Recommendations</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {optimizations.map((opt, i) => {
            const isActive = opt.forMetric === metrics[currentSlide].id;
            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className={`rounded-xl p-4 shadow-md transition ${
                  isActive
                    ? "ring-2 ring-blue-400/40 bg-white/80 dark:bg-gray-800/60"
                    : "bg-white/60 dark:bg-gray-800/50"
                }`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h4 className="font-semibold">{opt.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{opt.description}</p>
                  </div>

                  <div className="text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
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
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

/* ----- ForecastCard (keeps original dual-chart look) ----- */
function ForecastCard({ metric: m, COLORS, makeLineData }) {
  return (
    <motion.div
      className="rounded-2xl shadow-xl p-6 bg-gradient-to-br from-white/90 to-sky-50/80 dark:from-gray-800 dark:to-gray-900 overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{m.title}</h2>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-100 to-teal-100 text-gray-700 dark:text-gray-300">
          Forecast
        </span>
      </div>

      <div className="mt-6 flex flex-col md:flex-row items-center md:items-stretch gap-6">
        {/* Pie */}
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <PieChart width={160} height={160}>
            <Pie
              data={m.pie}
              cx="50%"
              cy="50%"
              innerRadius={44}
              outerRadius={72}
              paddingAngle={6}
              dataKey="value"
              labelLine={false}
              label={({ percent }) => `${Math.round(percent * 100)}%`}
            >
              {m.pie.map((entry, i) => (
                <Cell key={`c-${i}`} fill={COLORS[i % COLORS.length]} stroke="#fff" />
              ))}
            </Pie>
          </PieChart>

          <div className="mt-3 flex items-center gap-2">
            {m.forecast[m.forecast.length - 1] >= m.current ? (
              <ArrowUpCircle className="text-green-500 w-6 h-6" />
            ) : (
              <ArrowDownCircle className="text-red-500 w-6 h-6" />
            )}
            <div>
              <div className="text-sm text-gray-500">Current</div>
              <div className="text-lg font-semibold">
                {m.current} {m.unit}
              </div>
            </div>
          </div>
        </div>

        {/* Line */}
        <div className="w-full md:w-2/3">
          <div className="bg-white/60 dark:bg-gray-800/50 rounded-lg p-3 h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={makeLineData(m.forecast)}>
                <defs>
                  <linearGradient id={`grad-${m.id}`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#0078D4" stopOpacity={1} />
                    <stop offset="100%" stopColor="#00B294" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e6eef6" />
                <XAxis dataKey="name" tick={{ fill: "#6b7280" }} />
                <YAxis tick={{ fill: "#6b7280" }} />
                <ReTooltip contentStyle={{ background: "#fff", borderRadius: 8, border: "none" }} />
                <ReLegend verticalAlign="bottom" height={20} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={`url(#grad-${m.id})`}
                  strokeWidth={3}
                  dot={{ r: 4, stroke: "#fff" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 flex justify-between items-center text-sm text-gray-600">
            <div>7-week projection</div>
            <div className="text-right">
              <div className="text-xs">Projected (wk7)</div>
              <div className="font-semibold">
                {Array.isArray(m.forecast) ? m.forecast[m.forecast.length - 1] : "-"} {m.unit}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
