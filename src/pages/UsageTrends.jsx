import ChartCard from "../components/ChartCard";

export default function UsageTrends() {
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dataValues = [40, 55, 60, 70, 65, 75, 90];

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <ChartCard title="CPU Usage per Region" labels={labels} dataValues={dataValues} />
      <ChartCard title="Storage Consumption" labels={labels} dataValues={[50, 45, 60, 55, 80, 85, 70]} />
    </div>
  );
}
