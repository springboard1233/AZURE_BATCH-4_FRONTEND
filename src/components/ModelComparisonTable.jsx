import React from "react";

export default function ModelComparisonTable({ models }) {
  // Find best model based on lowest RMSE
  const bestModel =
    models.length > 0
      ? models.reduce((best, current) =>
          current.rmse < best.rmse ? current : best
        )
      : null;

  return (
    <div className="bg-white p-5 rounded-xl shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">📊 Model Comparison Dashboard</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border">Model Name</th>
            <th className="p-3 border">MAE</th>
            <th className="p-3 border">RMSE</th>
            <th className="p-3 border">MAPE</th>
            <th className="p-3 border">Training Time (sec)</th>
            <th className="p-3 border">Inference Speed (ms)</th>
            <th className="p-3 border">Best</th>
          </tr>
        </thead>

        <tbody>
          {models.map((model, idx) => (
            <tr
              key={idx}
              className={
                bestModel && bestModel.name === model.name
                  ? "bg-green-100 font-semibold"
                  : ""
              }
            >
              <td className="p-3 border">{model.name}</td>
              <td className="p-3 border">{model.mae}</td>
              <td className="p-3 border">{model.rmse}</td>
              <td className="p-3 border">{model.mape}%</td>
              <td className="p-3 border">{model.trainingTime}</td>
              <td className="p-3 border">{model.inferenceSpeed}</td>
              <td className="p-3 border text-center">
                {bestModel && bestModel.name === model.name ? "⭐" : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
