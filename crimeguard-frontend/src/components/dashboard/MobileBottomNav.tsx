import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Bell, PlusCircle, User } from 'lucide-react';

const MobileBottomNav = () => {
  const location = useLocation();

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'reports', label: 'Reports', icon: FileText, path: '/dashboard/reports' },
    { id: 'add', label: 'Add', icon: PlusCircle, path: '/report' },
    { id: 'notifications', label: 'Alerts', icon: Bell, path: '/dashboard/notifications', badge: 3 },
    { id: 'profile', label: 'Profile', icon: User, path: '/dashboard/settings' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-xl border-t border-white/10 z-50 lg:hidden shadow-2xl">
      <div className="flex items-center justify-around px-2 py-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          if (item.id === 'add') {
            return (
              <Link
                key={item.id}
                to={item.path}
                className="flex flex-col items-center space-y-1 relative -mt-8"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50 hover:shadow-red-500/70 transition-all duration-300 hover:scale-110">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-xs text-gray-400 font-medium">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.id}
              to={item.path}
              className="flex flex-col items-center space-y-1 relative group"
            >
              <div className="relative">
                <div className={`p-2 rounded-xl transition-all duration-300 ${
                  active 
                    ? 'bg-gradient-to-br from-red-600/20 to-red-700/20 shadow-lg shadow-red-500/20' 
                    : 'group-hover:bg-white/5'
                }`}>
                  <Icon
                    className={`w-6 h-6 ${
                      active ? 'text-red-500' : 'text-gray-400 group-hover:text-white'
                    } transition-all duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}
                  />
                </div>
                {item.badge && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-600 to-red-700 text-white text-xs rounded-full flex items-center justify-center shadow-lg shadow-red-500/50 animate-glow font-semibold">
                    {item.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-xs ${
                  active ? 'text-red-500 font-semibold' : 'text-gray-400 group-hover:text-white'
                } transition-colors`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
