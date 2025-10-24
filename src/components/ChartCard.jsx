import React from 'react';

/**
 * A simple wrapper component to provide consistent card styling for charts.
 * It uses children to wrap the actual chart component.
 */
export default function ChartCard({ title, children }) {
  return (
    <div className="bg-white shadow-xl rounded-xl p-4 w-full h-full">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
      {/* Container for the chart content */}
      <div className="relative h-[calc(100%-2.5rem)]">
        {children}
      </div>
    </div>
  );
}