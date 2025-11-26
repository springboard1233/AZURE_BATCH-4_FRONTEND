import KPICard from "../components/KPICard";
import ChartCard from "../components/ChartCard";
import TrendLineChart from "../components/charts/TrendLineChart";
import TrafficPieChart from "../components/charts/TrafficPieChart";

export default function Forecasts() {
  const revenueForecast = [
    { name: "Nov", value: 720 },
    { name: "Dec", value: 760 },
    { name: "Jan", value: 800 },
    { name: "Feb", value: 845 },
    { name: "Mar", value: 910 },
    { name: "Apr", value: 950 },
  ];

  const mix = [
    { name: "Compute", value: 48 },
    { name: "Storage", value: 22 },
    { name: "Networking", value: 16 },
    { name: "AI/ML", value: 14 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Run Rate (ARR)" value="$8.9M" delta={+12.2} subtitle="6-month outlook" />
        <KPICard title="Forecast Accuracy" value="93%" delta={+2.1} subtitle="3-month trailing" />
        <KPICard title="CAC Payback" value="7.4 mo" delta={-0.6} subtitle="improving" />
        <KPICard title="Gross Margin" value="68%" delta={+1.2} subtitle="QoQ" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Revenue Forecast" description="Projected revenue for the next 6 months">
          <TrendLineChart data={revenueForecast} />
        </ChartCard>

        <ChartCard title="Product Mix Forecast" description="Projected distribution by product category">
          <TrafficPieChart data={mix} />
        </ChartCard>
      </div>
    </div>
  );
}
