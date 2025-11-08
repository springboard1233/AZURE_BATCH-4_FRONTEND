import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import UsageTrends from "./pages/UsageTrends";
import Forecasts from "./pages/Forecasts";
import Reports from "./pages/Reports";
import Insights from "./pages/Insights"; // 👈 Ensure this import is correct
import IntroPage from "./pages/IntroPage";

export default function App() {
  const [selectedPage, setSelectedPage] = useState("Intro");

  const renderContent = () => {
    switch (selectedPage) {
      case "Usage Trends":
        return <UsageTrends />;
      case "Forecasts":
        return <Forecasts />;
      case "Reports":
        return <Reports />;
      case "Insights": // 👈 NEW ROUTE ADDED HERE
        return <Insights />;
      default:
        return <IntroPage />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 transition-all duration-500">
      {/* Constant Header */}
      <Header />

      {/* Sidebar + Main Content */}
      <div className="flex flex-1">
        <Sidebar onSelect={setSelectedPage} currentPage={selectedPage} />
        <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
      </div>
    </div>
  );
}