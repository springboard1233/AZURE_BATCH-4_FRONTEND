export default function MainArea() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Dashboard Overview
      </h2>

      {/* Grid layout for charts & tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Placeholder */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl h-64 flex items-center justify-center text-gray-500">
          Chart Placeholder (e.g., Usage Trend Chart)
        </div>

        {/* Table Placeholder */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl h-64 flex items-center justify-center text-gray-500">
          Table Placeholder (e.g., Resource Summary Table)
        </div>
      </div>
    </div>
  );
}
