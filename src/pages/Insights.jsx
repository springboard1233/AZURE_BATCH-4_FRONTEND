import React from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar,
} from 'recharts';
import { DollarSign, Users, Activity, ArrowUpRight, ArrowDownRight, TrendingUp, BarChart3 } from 'lucide-react';

// === DATA MOCK: REPLACE THIS OBJECT LATER WITH YOUR REAL DATA ===
const insightsData = {
  kpis: [
    { id: 1, title: 'Total Revenue', value: '$45,231', change: '+12.5%', icon: DollarSign, color: 'text-green-500', bgColor: 'bg-green-50' },
    { id: 2, title: 'New Customers', value: '2,350', change: '+8.1%', icon: Users, color: 'text-blue-500', bgColor: 'bg-blue-50' },
    { id: 3, title: 'Active Projects', value: '42', change: '-1.2%', icon: Activity, color: 'text-red-500', bgColor: 'bg-red-50' },
    { id: 4, title: 'Avg. Order Value', value: '$125.75', change: '+5.9%', icon: DollarSign, color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
  ],
  revenueTrend: [
    { name: 'Jan', Revenue: 4000, Profit: 2400 },
    { name: 'Feb', Revenue: 3000, Profit: 1398 },
    { name: 'Mar', Revenue: 6000, Profit: 3800 },
    { name: 'Apr', Revenue: 5780, Profit: 3908 },
    { name: 'May', Revenue: 1890, Profit: 4800 },
    { name: 'Jun', Revenue: 2390, Profit: 3800 },
    { name: 'Jul', Revenue: 3490, Profit: 4300 },
  ],
  campaignPerformance: [
    { name: 'Email Campaign', Sent: 4000, Clicked: 2400 },
    { name: 'Social Ads', Sent: 3000, Clicked: 1398 },
    { name: 'Partnership', Sent: 2000, Clicked: 980 },
    { name: 'Retargeting', Sent: 2780, Clicked: 3908 },
  ],
  recentActivity: [
    { id: 1, text: 'New lead assigned to John Doe.', time: '5 mins ago', tag: 'Lead' },
    { id: 2, text: 'Project Apollo budget adjusted.', time: '1 hour ago', tag: 'Finance' },
    { id: 3, text: 'System update completed successfully.', time: '4 hours ago', tag: 'System' },
    { id: 4, text: 'Customer feedback received.', time: 'Yesterday', tag: 'Support' },
  ]
};
// =================================================================

// Reusable KPI Card component with framer-motion
const KPICard = ({ title, value, change, icon: Icon, color, bgColor }) => {
  const isPositive = change.startsWith('+');
  const ChangeIcon = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <motion.div
      className="flex flex-col p-4 bg-white rounded-xl shadow-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
      whileHover={{ scale: 1.02, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <div className={`p-2 rounded-full ${bgColor} ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="mt-4 flex flex-col sm:flex-row sm:items-end sm:justify-between">
        <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
        <div className={`mt-2 sm:mt-0 flex items-center text-sm font-semibold ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          <ChangeIcon className="w-4 h-4 mr-1" />
          {change}
        </div>
      </div>
    </motion.div>
  );
};

export default function Insights() {
  return (
    <div className="p-4 md:p-0">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">Insights Dashboard</h1>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {insightsData.kpis.map(kpi => (
          <KPICard key={kpi.id} {...kpi} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Revenue Trend Area Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center"><TrendingUp className="w-5 h-5 mr-2 text-blue-500" /> Monthly Financial Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={insightsData.revenueTrend}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: '1px solid #374151', backgroundColor: '#1f2937', color: '#fff', padding: '8px' }}
              />
              <Legend />
              <Area type="monotone" dataKey="Revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
              <Area type="monotone" dataKey="Profit" stroke="#10b981" fillOpacity={1} fill="url(#colorProfit)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Campaign Performance Bar Chart */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center"><BarChart3 className="w-5 h-5 mr-2 text-yellow-500" /> Campaign Engagement</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={insightsData.campaignPerformance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis type="number" stroke="#6b7280" />
              <YAxis dataKey="name" type="category" stroke="#6b7280" />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: '1px solid #374151', backgroundColor: '#1f2937', color: '#fff', padding: '8px' }}
              />
              <Legend />
              <Bar dataKey="Sent" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Clicked" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>


      {/* Recent Activity/Log */}
      <div className="mt-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Recent Activity</h3>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {insightsData.recentActivity.map(activity => (
            <li key={activity.id} className="py-3 flex justify-between items-center">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2 ${
                  activity.tag === 'Lead' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' :
                  activity.tag === 'Finance' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300' :
                  activity.tag === 'System' ? 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {activity.tag}
                </span>
                {activity.text}
              </p>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-8 text-center text-sm text-gray-400 dark:text-gray-600">
        Reminder: This dashboard is currently powered by mock data defined in `src/pages/Insights.jsx`.
      </p>
    </div>
  );
}