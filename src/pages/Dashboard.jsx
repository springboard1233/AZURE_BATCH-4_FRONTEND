import MainLayout from '../layouts/mainlayout';
import KPI from '../components/ui/KPI';

export default function Dashboard() {
  return (
    <MainLayout>
      <h2 className="text-xl font-bold mb-4">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <KPI title="Forecast Accuracy" value="91.6%" delta={2.3} />
        <KPI title="Capacity Utilization" value="87%" delta={-1.2} />
        <KPI title="CAPEX Savings" value="$1.2M" delta={0.8} />
        <KPI title="Demand Growth" value="15.2%" delta={3.5} />
      </div>
      {/* Existing charts or tables can go here */}
    </MainLayout>
  );
}
 