import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainArea from "./components/MainArea";
import UsageTrends from "./pages/UsageTrends";
import Forecasts from "./pages/Forecasts";
import Reports from "./pages/Reports";
import ModelDashboard from "./pages/ModelDashboard";


export default function App() {
  const [page, setPage] = useState("Dashboard Overview");

  const renderPage = () => {
    switch (page) {
      case "Dashboard Overview":
        return <MainArea />;
      case "Usage Trends":
        return <UsageTrends />;
      case "Forecasts":
        return <Forecasts />;
      case "Reports":
        return <Reports />;
      case "Model Dashboard":
        return <ModelDashboard />;
      default:
        return <MainArea />;
    }
  };

  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">

      {/* Sidebar */}
      <Sidebar onSelect={setPage} selected={page} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">

        <Header />

        <main className="flex-1 overflow-y-auto p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-inner">
          <div className="max-w-7xl mx-auto">
            {renderPage()}
          </div>
        </main>

      </div>
    </div>
  );
}
