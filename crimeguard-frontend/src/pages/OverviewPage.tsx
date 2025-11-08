import DashboardLayout from '../components/dashboard/DashboardLayout';
import { TrendingUp, TrendingDown, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const OverviewPage = () => {
  const stats = [
    { label: 'Total Reports', value: '24', change: '+12%', trend: 'up', icon: FileText, color: 'blue' },
    { label: 'Resolved', value: '18', change: '+8%', trend: 'up', icon: CheckCircle, color: 'green' },
    { label: 'Pending', value: '6', change: '-4%', trend: 'down', icon: Clock, color: 'yellow' },
    { label: 'In Progress', value: '3', change: '+2%', trend: 'up', icon: AlertCircle, color: 'purple' },
  ];

  const recentActivity = [
    { id: 1, type: 'Theft', status: 'resolved', date: '2 days ago', location: 'Downtown' },
    { id: 2, type: 'Vandalism', status: 'pending', date: '5 days ago', location: 'Park Avenue' },
    { id: 3, type: 'Burglary', status: 'in-progress', date: '1 week ago', location: 'Main Street' },
  ];

  const colorMap = {
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-green-500 to-emerald-500',
    yellow: 'from-yellow-500 to-orange-500',
    purple: 'from-purple-500 to-pink-500',
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">My Overview</h1>
          <p className="text-gray-400">
            View detailed analytics and insights about your crime reporting activity.
          </p>
        </div>

        {/* Stats Grid with glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
            return (
              <div
                key={index}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${colorMap[stat.color as keyof typeof colorMap]} shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className={`flex items-center space-x-1 text-sm ${
                      stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      <TrendIcon className="w-4 h-4" />
                      <span className="font-semibold">{stat.change}</span>
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-purple-500/20 rounded-2xl blur-xl" />
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-6">Monthly Reports</h3>
              <div className="space-y-4">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, i) => {
                  const value = Math.random() * 100;
                  return (
                    <div key={month} className="group/bar">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">{month}</span>
                        <span className="text-sm font-semibold text-white">{Math.round(value)}</span>
                      </div>
                      <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-red-500 to-purple-500 rounded-full transition-all duration-500 group-hover/bar:shadow-lg group-hover/bar:shadow-red-500/50"
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Donut Chart */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl" />
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-6">Status Distribution</h3>
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="96" cy="96" r="80" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="20" />
                    <circle cx="96" cy="96" r="80" fill="none" stroke="url(#gradient1)" strokeWidth="20" strokeDasharray="377" strokeDashoffset="94" className="transition-all duration-1000" />
                    <circle cx="96" cy="96" r="80" fill="none" stroke="url(#gradient2)" strokeWidth="20" strokeDasharray="377" strokeDashoffset="188" className="transition-all duration-1000" />
                    <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#059669" />
                      </linearGradient>
                      <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#d97706" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">75%</div>
                      <div className="text-sm text-gray-400">Resolved</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500" />
                    <span className="text-sm text-gray-400">Resolved</span>
                  </div>
                  <span className="text-sm font-semibold text-white">75%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500" />
                    <span className="text-sm text-gray-400">Pending</span>
                  </div>
                  <span className="text-sm font-semibold text-white">25%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl blur-xl" />
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
            <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 group/item border border-white/5 hover:border-white/10"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-purple-500 flex items-center justify-center shadow-lg group-hover/item:shadow-red-500/50 transition-all duration-300">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{activity.type}</h4>
                      <p className="text-sm text-gray-400">{activity.location} • {activity.date}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    activity.status === 'resolved'
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : activity.status === 'pending'
                      ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OverviewPage;
