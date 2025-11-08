import DashboardLayout from '../components/dashboard/DashboardLayout';
import { useAuth } from '../hooks/useAuth';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, ArrowUp } from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();

  // Data for daily reports bar chart
  const dailyData = [
    { day: 'Sun', reports: 95 },
    { day: 'Mon', reports: 110 },
    { day: 'Tue', reports: 130 },
    { day: 'Wed', reports: 105 },
    { day: 'Thu', reports: 115 },
    { day: 'Fri', reports: 140 },
    { day: 'Sat', reports: 120 },
  ];

  // Data for category pie chart
  const categoryData = [
    { name: 'Theft', value: 35, color: '#3b82f6' },
    { name: 'Vandalism', value: 25, color: '#ec4899' },
    { name: 'Assault', value: 20, color: '#14b8a6' },
    { name: 'Burglary', value: 12, color: '#f59e0b' },
    { name: 'Other', value: 8, color: '#8b5cf6' },
  ];

  // Data for area chart (active reports over time)
  const areaData = [
    { date: 'Jun 2', reports: 45 },
    { date: 'Jun 5', reports: 52 },
    { date: 'Jun 8', reports: 48 },
    { date: 'Jun 11', reports: 61 },
    { date: 'Jun 14', reports: 55 },
    { date: 'Jun 17', reports: 67 },
    { date: 'Jun 20', reports: 58 },
    { date: 'Jun 23', reports: 63 },
    { date: 'Jun 26', reports: 78 },
    { date: 'Jun 30', reports: 72 },
  ];

  // Data for circular progress (donut chart)
  const circularData = [
    { name: 'Completed', value: 75, color: '#ef4444' },
    { name: 'In Progress', value: 15, color: '#8b5cf6' },
    { name: 'Pending', value: 10, color: '#14b8a6' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.firstName || 'User'}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track your crime reports, view your submission history, and manage your account.
          </p>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Circular Progress Chart */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-center h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={circularData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {circularData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Daily Reports Bar Chart */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Average Reports
              </h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">102</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Over the past 7 days, there have been <span className="font-semibold">714</span> reports.
              </p>
              <div className="flex items-center mt-2">
                <ArrowUp className="w-4 h-4 text-red-600 mr-1" />
                <span className="text-sm text-red-600 font-medium">5.0% from last week</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="reports" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Report Categories Pie Chart */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Report Categories
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">January - June 2024</p>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center mt-4">
              <TrendingUp className="w-4 h-4 text-green-600 mr-2" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Trending up by <span className="font-semibold text-green-600">5.2%</span> this month
              </span>
            </div>
          </div>

          {/* Active Reports Over Time Area Chart */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Active users over last year
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Showing active users for the last 3 months
                </p>
              </div>
              <select className="px-3 py-1 border border-red-600 text-red-600 rounded-lg text-sm bg-transparent">
                <option>Last 3 months</option>
                <option>Last 6 months</option>
                <option>Last year</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="reports"
                  stroke="#ef4444"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorReports)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            What would you like to do?
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Quickly submit a new report or check the status of your existing submissions.
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Submit New Report
            </button>
            <button className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              View My Reports
            </button>
          </div>
        </div>

        {/* My Recent Activity */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            My Recent Activity
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Your latest report submissions and updates
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Theft Report Submitted</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">2024-03-15</p>
              </div>
              <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 rounded-full text-sm">
                Pending
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Vandalism Report Updated</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">2024-03-14</p>
              </div>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full text-sm">
                In Progress
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Noise Complaint Resolved</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">2024-03-12</p>
              </div>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full text-sm">
                Resolved
              </span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
