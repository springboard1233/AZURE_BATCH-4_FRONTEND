import KPICard from "../components/KPICard";
import ChartCard from "../components/ChartCard";
import TrendLineChart from "../components/charts/TrendLineChart";
import BarComparisonChart from "../components/charts/BarComparisonChart";

export default function UsageTrends() {
  const lineData = [
    { name: "Jan", value: 320 },
    { name: "Feb", value: 410 },
    { name: "Mar", value: 380 },
    { name: "Apr", value: 450 },
    { name: "May", value: 520 },
    { name: "Jun", value: 590 },
    { name: "Jul", value: 560 },
    { name: "Aug", value: 610 },
    { name: "Sep", value: 640 },
    { name: "Oct", value: 690 },
    { name: "Nov", value: 720 },
    { name: "Dec", value: 760 },
  ];

  const barData = [
    { name: "Compute", current: 420, forecast: 480 },
    { name: "Storage", current: 260, forecast: 300 },
    { name: "Networking", current: 180, forecast: 210 },
    { name: "AI/ML", current: 140, forecast: 220 },
  ];

  return (
    <div className="space-y-6">
      
      {/* ✅ KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Monthly Active Users"
          value="24,381"
          delta={+8.4}
          subtitle="vs last month"
        />
        <KPICard
          title="Avg. Session Time"
          value="7.2 min"
          delta={+3.1}
          subtitle="rolling 30 days"
        />
        <KPICard
          title="Peak Concurrency"
          value="1,143"
          delta={-2.3}
          subtitle="week-over-week"
        />
        <KPICard
          title="Churn Rate"
          value="3.2%"
          delta={-0.7}
          subtitle="last 30 days"
        />
      </div>

      {/* ✅ Trend + Category Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <ChartCard
          title="Usage Over Time"
          description="Monthly active usage across all services"
        >
          <TrendLineChart data={lineData} />
        </ChartCard>

        <ChartCard
          title="Category Breakdown"
          description="Current vs forecast consumption by category"
        >
          <BarComparisonChart data={barData} />
        </ChartCard>

      </div>
    </div>
  );
}
