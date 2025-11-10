export default function Header() {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center border-b">
      <h2 className="text-xl font-semibold tracking-tight">
        Azure Dashboard
      </h2>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
          S
        </div>
      </div>
    </header>
  );
}
