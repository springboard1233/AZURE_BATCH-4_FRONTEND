import ChartCard from "../components/ChartCard";

export default function UsageTrends() {
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const cpuValues = [40, 55, 60, 70, 65, 75, 90];
  const storageValues = [50, 45, 60, 55, 80, 85, 70];
  const regionLabels = ["East", "West", "North", "South"];
  const regionValues = [110, 100, 125, 105];

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <ChartCard title="CPU Usage per Region" labels={labels} dataValues={cpuValues} chartType="line" />
      <ChartCard title="Storage Consumption" labels={labels} dataValues={storageValues} chartType="bar" />

        <ChartCard
          title="Region-wise Demand"
          labels={regionLabels}
          dataValues={regionValues}
          chartType="bar"
        />
      </div>
  
  );
}