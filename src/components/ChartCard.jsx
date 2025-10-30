import { Line } from "react-chartjs-2";

import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function ChartCard({ title, labels, dataValues }) {
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: dataValues,
        borderColor: "rgb(37, 99, 235)",
        backgroundColor: "rgba(37, 99, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <Line data={data} />
     
    </div>
  );
}
