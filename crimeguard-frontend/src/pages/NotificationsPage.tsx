import DashboardLayout from '../components/dashboard/DashboardLayout';
import { Bell, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

const NotificationsPage = () => {
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Report Status Updated',
      message: 'Your theft report has been updated to "In Progress"',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 2,
      type: 'info',
      title: 'New Crime Alert',
      message: 'A burglary was reported 0.5 miles from your location',
      time: '5 hours ago',
      read: false,
    },
    {
      id: 3,
      type: 'success',
      title: 'Police Response Received',
      message: 'Police have responded to your vandalism report',
      time: '1 day ago',
      read: true,
    },
    {
      id: 4,
      type: 'info',
      title: 'Safety Alert',
      message: 'Increased police presence in your area tonight',
      time: '2 days ago',
      read: true,
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-4xl font-bold text-white">My Notifications</h1>
              {unreadCount > 0 && (
                <span className="px-3 py-1 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-semibold rounded-full shadow-lg shadow-red-500/50 animate-glow">
                  {unreadCount} new
                </span>
              )}
            </div>
            <p className="text-gray-400">
              Stay updated on your reports and crime alerts in your area.
            </p>
          </div>
          <button className="px-4 py-2 text-sm text-red-400 hover:text-red-300 font-semibold hover:bg-white/5 rounded-xl transition-all duration-300 border border-white/10 hover:border-red-500/30">
            Mark all as read
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notif, index) => (
            <div
              key={notif.id}
              className="relative group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {!notif.read && (
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-2xl blur-xl animate-pulse" />
              )}
              <div className={`relative backdrop-blur-xl border rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
                !notif.read 
                  ? 'bg-gradient-to-r from-red-500/10 to-purple-500/10 border-red-500/30 hover:border-red-500/50 shadow-lg shadow-red-500/20' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}>
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <div className={`p-3 rounded-xl ${
                      notif.type === 'success'
                        ? 'bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg shadow-green-500/50'
                        : 'bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/50'
                    }`}>
                      {notif.type === 'success' ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <AlertCircle className="w-6 h-6 text-white" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-white text-lg">
                          {notif.title}
                        </h3>
                        {!notif.read && (
                          <div className="flex items-center space-x-2">
                            <Sparkles className="w-4 h-4 text-red-400 animate-pulse" />
                            <span className="w-2 h-2 bg-red-500 rounded-full shadow-lg shadow-red-500/50 animate-glow" />
                          </div>
                        )}
                      </div>
                      <p className="text-gray-300 mb-3 leading-relaxed">
                        {notif.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">
                          {notif.time}
                        </p>
                        {!notif.read && (
                          <button className="text-xs text-red-400 hover:text-red-300 font-semibold transition-colors">
                            Mark as read
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-2xl blur-xl" />
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 border-dashed rounded-2xl p-12 text-center hover:bg-white/10 transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Bell className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">You're all caught up!</h3>
            <p className="text-gray-400">No more notifications to show</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NotificationsPage;
