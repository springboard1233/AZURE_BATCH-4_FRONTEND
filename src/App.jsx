import { useState } from "react";
import MainArea from "./components/MainArea";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import UsageTrends from "./pages/UsageTrends";
import Forecasts from "./pages/Forecasts";
import Reports from "./pages/Reports";

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
      default:
        return <MainArea />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onSelect={setPage} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-4">{renderPage()}</main>
      </div>
    </div>
  );
}
