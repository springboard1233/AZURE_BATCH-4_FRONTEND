import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Legend 
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend
);

export default function Reports() {
  const [activeTab, setActiveTab] = useState('performance');

  const performanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Performance Metrics',
      data: [65, 75, 70, 80, 85, 90],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  const forecastData = {
    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Forecast Metrics',
      data: [92, 88, 95, 89, 96, 98],
      borderColor: 'rgb(153, 102, 255)',
      tension: 0.1
    }]
  };

  const handleDownload = (reportType) => {
    // Implement download logic here
    alert(`Downloading ${reportType} report...`);
  };

  return (
    <div className="p-4 text-gray-700">
      <h2 className="text-xl font-bold mb-4">REPORTS SECTION</h2>
      
      {/* Tab Navigation */}
      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${activeTab === 'performance' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('performance')}
        >
          Performance
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'forecast' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('forecast')}
        >
          Forecast
        </button>
      </div>

      {/* Content Sections */}
      <div className="bg-white p-4 rounded-lg shadow">
        {activeTab === 'performance' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Performance Report</h3>
            <div className="h-64 mb-4">
              <Line data={performanceData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => handleDownload('performance')}
            >
              Download Performance Report
            </button>
          </div>
        )}

        {activeTab === 'forecast' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Forecast Report</h3>
            <div className="h-64 mb-4">
              <Line data={forecastData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => handleDownload('forecast')}
            >
              Download Forecast Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
