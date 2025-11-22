import React, { useState, useEffect, useRef } from 'react';
import Dropdown from './Dropdown';

const regionOptions = [
  'Central India', 'South India', 'North India', 'East India', 'West India', 'West US'
];
const serviceOptions = ['Compute', 'Storage'];
const timeHorizonOptions = ['7 days', '14 days', '30 days'];

const ForecastForm = () => {
  const [region, setRegion] = useState('');
  const [service, setService] = useState('');
  const [timeHorizon, setTimeHorizon] = useState('');

  // Light blue border in light, magenta-orange in dark (matches Forecasts page)
  const borderRef = useRef();
  useEffect(() => {
    if (borderRef.current) {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      borderRef.current.style.borderImage = isDark
        ? 'linear-gradient(135deg,#f472b6 0%,#fb7185 40%,#fb923c 100%)'
        : 'linear-gradient(120deg,#b7d2f7 0%,#afd8fa 100%)';
      borderRef.current.style.borderImageSlice = 1;
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Region: ${region}\nService: ${service}\nTime Horizon: ${timeHorizon}`);
  };

  return (
    <form
      className="
        py-10 px-12 rounded-3xl shadow-2xl border-4 border-transparent mx-auto relative
        bg-gradient-to-br from-[#f7f7f5] via-[#ececec] to-[#f3f5f7]
        dark:bg-gradient-to-br dark:from-gray-900 dark:via-fuchsia-950/90 dark:to-orange-900/80
      "
      style={{
        maxWidth: 600,
        minHeight: 420,
        boxShadow: "0 4px 32px 0 rgba(171,166,140,0.12), 0 1.5px 12px 0 rgba(125,125,120,0.10)"
      }}
      onSubmit={handleSubmit}
    >
      {/* Light blue border */}
      <div
        ref={borderRef}
        className="absolute inset-0 rounded-3xl pointer-events-none z-0"
        style={{
          border: '2px solid',
          opacity: 0.22,
          zIndex: 0
        }}
      />

      <h2 className="
        text-2xl font-extrabold mb-8 text-center drop-shadow text-[#2d2a1f]
        dark:bg-gradient-to-r dark:from-fuchsia-400 dark:to-orange-300 dark:bg-clip-text dark:text-transparent
      ">
        Forecast Dashboard
      </h2>
      <Dropdown
        label="Region"
        options={regionOptions}
        value={region}
        onChange={setRegion}
        labelClass="text-[#2d2a1f] dark:text-white"
      />
      <Dropdown
        label="Service"
        options={serviceOptions}
        value={service}
        onChange={setService}
        labelClass="text-[#2d2a1f] dark:text-white"
      />
      <Dropdown
        label="Time Horizon"
        options={timeHorizonOptions}
        value={timeHorizon}
        onChange={setTimeHorizon}
        labelClass="text-[#2d2a1f] dark:text-white"
      />
      <button
        type="submit"
        className="
          mt-8 w-full py-3 rounded-lg transition-all font-bold text-lg shadow-md
          bg-gradient-to-r from-white via-[#f6f6f6] to-[#e8e7eb]
          hover:bg-gradient-to-r hover:from-[#ececec] hover:to-[#fafaf9]
          text-[#2d2a1f]
          dark:bg-gradient-to-r dark:from-fuchsia-700 dark:via-orange-500 dark:to-orange-400
          dark:hover:from-fuchsia-900 dark:hover:via-orange-600 dark:hover:to-orange-500
          dark:text-white
        "
        disabled={!region || !service || !timeHorizon}
        style={{
          boxShadow: "0 0 10px 0 #afd8fa40, 0 2px 8px 0 #b7d2f730"
        }}
      >
        Show Forecast
      </button>
    </form>
  );
};

export default ForecastForm;
