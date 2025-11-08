import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import Sidebar from './Sidebar';
import MobileBottomNav from './MobileBottomNav';
import { useAuth } from '../../hooks/useAuth';
import { Menu, X } from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setShowMobileSidebar(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar userEmail={user.email} userName={user.fullName} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobile && showMobileSidebar && (
        <>
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 animate-fade-in"
            onClick={() => setShowMobileSidebar(false)}
          />
          <div className="fixed left-0 top-0 h-full w-64 z-50 animate-slide-up">
            <Sidebar userEmail={user.email} userName={user.fullName} />
          </div>
        </>
      )}

      {/* Mobile Header with glassmorphism */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-xl border-b border-white/10 z-30 px-4 py-3 flex items-center justify-between shadow-lg">
          <button
            onClick={() => setShowMobileSidebar(!showMobileSidebar)}
            className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300 group"
          >
            {showMobileSidebar ? (
              <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
            ) : (
              <Menu className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
            )}
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-red-700 rounded flex items-center justify-center shadow-lg shadow-red-500/50">
              <span className="text-white text-xs">❤️</span>
            </div>
            <span className="text-white font-bold">CrimeGuard</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white text-sm font-semibold shadow-lg shadow-orange-500/50">
            {user.firstName.charAt(0)}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${
          isMobile ? 'pt-16 pb-20' : 'lg:ml-64'
        }`}
      >
        <div className="p-4 lg:p-8">{children}</div>
      </main>

      {/* Mobile Bottom Navigation */}
      {isMobile && <MobileBottomNav />}
    </div>
  );
};

export default DashboardLayout;

