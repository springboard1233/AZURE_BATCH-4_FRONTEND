import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function ChartCard({ title, labels, dataValues }) {
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: dataValues,
        borderColor: "rgb(37, 99, 235)",
        backgroundColor: "rgba(37, 99, 235, 0.3)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        ticks: { color: "#9ca3af" },
        grid: { color: "rgba(156, 163, 175, 0.2)" },
      },
      y: {
        ticks: { color: "#9ca3af" },
        grid: { color: "rgba(156, 163, 175, 0.2)" },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white shadow-xl rounded-2xl p-6 w-full max-w-6xl mx-auto transition-all">
      <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
      {/* Make chart area bigger */}
      <div className="h-[350px] w-[450px] md:h-[400px] lg:h-[450px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
