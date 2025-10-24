export default function MainArea() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Main Area</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example cards */}
        <div className="bg-blue-50 p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold text-blue-700">CPU Usage</h3>
          <p className="text-gray-600">Current load: 45%</p>
        </div>

        <div className="bg-green-50 p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold text-green-700">Memory Usage</h3>
          <p className="text-gray-600">3.2 GB / 8 GB</p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold text-yellow-700">Network Traffic</h3>
          <p className="text-gray-600">120 MB/s</p>
        </div>
      </div>
    </div>
  );
}
