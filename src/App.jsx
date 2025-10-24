import { useState } from "react";
import MainArea from "./components/MainArea";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import UsageTrends from "./pages/UsageTrends";
import Forecasts from "./pages/Forecasts";
import Reports from "./pages/Reports";

export default function App() {
  const [page, setPage] = useState("Usage Trends");

  const renderPage = () => {
    switch (page) {
      case "Usage Trends":
        return <UsageTrends />;
      case "Forecasts":
        return <Forecasts />;
      case "Reports":
        return <Reports />;
      default:
        return <UsageTrends />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onSelect={setPage} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50 space-y-6">
  <MainArea />
  {renderPage()}
</main>


      </div>
    </div>
  );
}
