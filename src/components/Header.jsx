export default function Header() {
  return (
    <header className="bg-white text-gray-800 p-4 shadow-lg flex justify-between items-center border-b border-gray-200">
      <h1 className="text-2xl font-bold text-gray-900">Resource Demand Dashboard</h1>
      <div className="text-sm text-gray-500 flex items-center space-x-2">
        <span className="font-medium">Infosys Springboard</span>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">Batch 4</span>
      </div>
    </header>
  );
}
