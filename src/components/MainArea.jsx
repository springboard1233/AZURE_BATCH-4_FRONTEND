export default function MainArea() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
        <h3 className="text-lg font-semibold">Active Subscriptions</h3>
        <p className="text-gray-600 mt-2">134 running workloads</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
        <h3 className="text-lg font-semibold">Monthly Spend</h3>
        <p className="text-gray-600 mt-2">$12,420 this month</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
        <h3 className="text-lg font-semibold">Alerts</h3>
        <p className="text-gray-600 mt-2">3 active alerts</p>
      </div>

    </div>
  );
}
