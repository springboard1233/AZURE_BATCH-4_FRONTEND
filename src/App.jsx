import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import UsageTrends from "./pages/UsageTrends";
import Forecasts from "./pages/Forecasts";
import Reports from "./pages/Reports";
import Insights from "./pages/Insights";
import Dashboard from "./pages/Dashboard";   // ✅ your UI page

export default function App() {
  // Dashboard must be the first loaded page
  const [selectedPage, setSelectedPage] = useState("Dashboard");

  const renderContent = () => {
    switch (selectedPage) {
      case "Dashboard":
        return <Dashboard />;

      case "Usage Trends":
        return <UsageTrends />;

      case "Forecasts":
        return <Forecasts />;

      case "Reports":
        return <Reports />;

      case "Insights":
        return <Insights />;

      // default fallback
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <Header />

      <div className="flex flex-1">
        <Sidebar onSelect={setSelectedPage} />
        
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
