import { useState, useEffect } from 'react'
import axios from 'axios'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import './App.css'

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

const API_BASE_URL = 'http://localhost:5000'

function App() {
    const [forecast7, setForecast7] = useState(null)
    const [forecast30, setForecast30] = useState(null)
    const [capacityData, setCapacityData] = useState(null)
    const [modelHealth, setModelHealth] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            setLoading(true)
            setError(null)

            const [forecast7Res, forecast30Res, capacityRes, healthRes] = await Promise.all([
                axios.get(`${API_BASE_URL}/api/forecast_7`),
                axios.get(`${API_BASE_URL}/api/forecast_30`),
                axios.post(`${API_BASE_URL}/api/capacity_planning`, { capacity: 10000 }),
                axios.get(`${API_BASE_URL}/api/monitoring?mape=8.5`)
            ])

            setForecast7(forecast7Res.data)
            setForecast30(forecast30Res.data)
            setCapacityData(capacityRes.data)
            setModelHealth(healthRes.data)
            setLoading(false)
        } catch (err) {
            console.error('Error fetching data:', err)
            setError('Failed to fetch data from backend. Make sure Flask server is running on port 5000.')
            setLoading(false)
        }
    }

    const create7DayChartData = () => {
        if (!forecast7) return null

        return {
            labels: forecast7.predictions.map((_, i) => `Day ${i + 1}`),
            datasets: [
                {
                    label: '7-Day CPU Forecast',
                    data: forecast7.predictions,
                    borderColor: 'rgb(0, 120, 212)',
                    backgroundColor: 'rgba(0, 120, 212, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: 'rgb(0, 120, 212)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                }
            ]
        }
    }

    const create30DayChartData = () => {
        if (!forecast30) return null

        return {
            labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
            datasets: [
                {
                    label: '30-Day CPU Forecast',
                    data: forecast30.predictions,
                    borderColor: 'rgb(0, 188, 212)',
                    backgroundColor: 'rgba(0, 188, 212, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 3,
                    pointHoverRadius: 6,
                    pointBackgroundColor: 'rgb(0, 188, 212)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                }
            ]
        }
    }

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: '#fff',
                    font: {
                        size: 14,
                        weight: 500
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(10, 14, 39, 0.9)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: 'rgba(0, 120, 212, 0.5)',
                borderWidth: 1,
                padding: 12,
                displayColors: true,
                callbacks: {
                    label: function (context) {
                        return `CPU Usage: ${context.parsed.y.toFixed(2)}%`
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                    color: '#B0B0B0',
                    callback: function (value) {
                        return value.toFixed(1) + '%'
                    }
                }
            },
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)',
                },
                ticks: {
                    color: '#B0B0B0',
                    maxRotation: 45,
                    minRotation: 0
                }
            }
        }
    }

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p style={{ marginTop: '20px', fontSize: '18px' }}>Loading Dashboard...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="error-container">
                <div className="error-card glass-card">
                    <h2>⚠️ Connection Error</h2>
                    <p>{error}</p>
                    <button onClick={fetchData} className="retry-button">
                        🔄 Retry
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="app">
            <header className="header">
                <div className="header-content">
                    <h1 className="gradient-text">⚡ Azure Demand Forecasting Dashboard</h1>
                    <p>Real-time CPU demand forecasting with intelligent capacity planning</p>
                </div>
            </header>

            <main className="main-content">
                {/* Metrics Cards */}
                <div className="metrics-grid">
                    <div className="metric-card glass-card">
                        <div className="metric-icon" style={{ background: 'linear-gradient(135deg, #0078D4, #00BCD4)' }}>
                            📊
                        </div>
                        <div className="metric-info">
                            <h3>Avg Forecast (7d)</h3>
                            <p className="metric-value">
                                {forecast7 && (forecast7.predictions.reduce((a, b) => a + b, 0) / forecast7.predictions.length).toFixed(2)}%
                            </p>
                        </div>
                    </div>

                    <div className="metric-card glass-card">
                        <div className="metric-icon" style={{ background: 'linear-gradient(135deg, #5E35B1, #9C27B0)' }}>
                            💾
                        </div>
                        <div className="metric-info">
                            <h3>Capacity Status</h3>
                            <p className="metric-value">{capacityData?.status.toUpperCase()}</p>
                        </div>
                    </div>

                    <div className="metric-card glass-card">
                        <div className="metric-icon" style={{ background: 'linear-gradient(135deg, #00BCD4, #00E676)' }}>
                            {modelHealth?.status === 'stable' ? '✅' : '⚠️'}
                        </div>
                        <div className="metric-info">
                            <h3>Model Health</h3>
                            <p className="metric-value">{modelHealth?.message}</p>
                        </div>
                    </div>

                    <div className="metric-card glass-card">
                        <div className="metric-icon" style={{ background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)' }}>
                            📈
                        </div>
                        <div className="metric-info">
                            <h3>Utilization</h3>
                            <p className="metric-value">{capacityData?.utilization.toFixed(2)}%</p>
                        </div>
                    </div>
                </div>

                {/* Charts */}
                <div className="charts-grid">
                    <div className="chart-card glass-card">
                        <h2>📅 7-Day CPU Forecast</h2>
                        <div className="chart-container">
                            {forecast7 && <Line data={create7DayChartData()} options={chartOptions} />}
                        </div>
                    </div>

                    <div className="chart-card glass-card">
                        <h2>📆 30-Day CPU Forecast</h2>
                        <div className="chart-container">
                            {forecast30 && <Line data={create30DayChartData()} options={chartOptions} />}
                        </div>
                    </div>
                </div>

                {/* Capacity Recommendations */}
                {capacityData && (
                    <div className="recommendation-card glass-card">
                        <h2>💡 Capacity Recommendation</h2>
                        <p className="recommendation-text">{capacityData.recommendation}</p>
                        <div className="recommendation-details">
                            <div className="detail-item">
                                <span className="detail-label">Current Capacity:</span>
                                <span className="detail-value">{capacityData.capacity.toLocaleString()}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Avg Forecast:</span>
                                <span className="detail-value">{capacityData.avg_forecast.toFixed(2)}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Utilization:</span>
                                <span className="detail-value">{capacityData.utilization.toFixed(2)}%</span>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <footer className="footer">
                <p>Milestone 4 - Azure Demand Forecasting & Capacity Optimization System</p>
            </footer>
        </div>
    )
}

export default App
