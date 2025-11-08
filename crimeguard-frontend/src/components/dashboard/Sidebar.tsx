import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  Bell,
  PlusCircle,
  Bot,
  Brain,
  MapPin,
  Shield,
  Info,
  HelpCircle,
  Heart,
  Settings,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  badge?: number;
}

interface NavSection {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  items: NavItem[];
}

interface SidebarProps {
  userEmail: string;
  userName: string;
}

const Sidebar = ({ userEmail, userName }: SidebarProps) => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<string[]>(['platform', 'ai', 'crimes']);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]
    );
  };

  const navSections: NavSection[] = [
    {
      id: 'platform',
      label: 'Platform',
      icon: LayoutDashboard,
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { id: 'overview', label: 'Overview', icon: BarChart3, path: '/dashboard/overview' },
        { id: 'reports', label: 'Reports', icon: FileText, path: '/dashboard/reports' },
        {
          id: 'notifications',
          label: 'Notifications',
          icon: Bell,
          path: '/dashboard/notifications',
          badge: 3,
        },
      ],
    },
    {
      id: 'add-crime',
      label: 'Add Crime',
      icon: PlusCircle,
      items: [],
    },
    {
      id: 'ai',
      label: 'AI',
      icon: Bot,
      items: [
        { id: 'chatbot', label: 'Chatbot', icon: Bot, path: '/dashboard/ai-chatbot' },
        { id: 'analyzer', label: 'AI analyzer', icon: Brain, path: '/dashboard/ai-analyzer' },
      ],
    },
    {
      id: 'crimes',
      label: 'Crimes',
      icon: Shield,
      items: [
        { id: 'all-crimes', label: 'All Crimes', icon: Shield, path: '/dashboard/crimes' },
        { id: 'crimes-map', label: 'Crimes Map', icon: MapPin, path: '/map' },
      ],
    },
    {
      id: 'police',
      label: 'Police Stations',
      icon: Shield,
      items: [],
    },
  ];

  const siteItems: NavItem[] = [
    { id: 'about', label: 'About', icon: Info, path: '/dashboard/about' },
    { id: 'faq', label: 'FAQ & Contact', icon: HelpCircle, path: '/dashboard/faq' },
    { id: 'sponsor', label: 'Sponsor us', icon: Heart, path: '/dashboard/sponsor' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isSectionExpanded = (sectionId: string) => expandedSections.includes(sectionId);

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-gray-900/95 via-gray-900/90 to-black/95 backdrop-blur-xl text-gray-300 flex flex-col z-40 border-r border-white/5">
      {/* Header with glassmorphism */}
      <div className="p-4 border-b border-white/10 backdrop-blur-md bg-white/5">
        <Link to="/dashboard" className="flex items-center space-x-3 group">
          <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center shadow-lg shadow-red-500/50 group-hover:shadow-red-500/70 transition-all duration-300">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">Crime Guard</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {/* Platform Section */}
        {navSections.map((section) => {
          const SectionIcon = section.icon;
          const isExpanded = isSectionExpanded(section.id);
          const hasItems = section.items.length > 0;

          if (section.id === 'add-crime') {
            return (
              <Link
                key={section.id}
                to="/report"
                className="flex items-center space-x-3 px-3 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 transition-all duration-300 mb-2 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-[1.02] group"
              >
                <SectionIcon className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold text-white">{section.label}</span>
              </Link>
            );
          }

          if (section.id === 'police') {
            return (
              <Link
                key={section.id}
                to="/dashboard/police-stations"
                className="flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-white/5 backdrop-blur-sm transition-all duration-300 mb-1 group border border-transparent hover:border-white/10"
              >
                <SectionIcon className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors" />
                <span className="text-sm group-hover:text-white transition-colors">{section.label}</span>
              </Link>
            );
          }

          return (
            <div key={section.id} className="mb-1">
              {hasItems ? (
                <>
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/5 backdrop-blur-sm transition-all duration-300 group border border-transparent hover:border-white/10"
                  >
                    <div className="flex items-center space-x-3">
                      <SectionIcon className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors" />
                      <span className="text-sm font-medium group-hover:text-white transition-colors">{section.label}</span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 group-hover:text-white transition-colors" />
                    ) : (
                      <ChevronDown className="w-4 h-4 group-hover:text-white transition-colors" />
                    )}
                  </button>
                  {isExpanded && (
                    <div className="ml-8 mt-1 space-y-1 animate-slide-up">
                      {section.items.map((item) => {
                        const active = isActive(item.path);
                        return (
                          <Link
                            key={item.id}
                            to={item.path}
                            className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-300 group ${
                              active
                                ? 'bg-gradient-to-r from-red-600/20 to-red-700/20 text-white border-l-2 border-red-500 shadow-lg shadow-red-500/20'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white hover:border-l-2 hover:border-white/20'
                            }`}
                          >
                            <span className="text-sm">{item.label}</span>
                            {item.badge && (
                              <span className="px-2 py-0.5 text-xs bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full shadow-lg shadow-red-500/50 animate-glow">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : null}
            </div>
          );
        })}

        {/* Site Section */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Site
          </div>
          {siteItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-xl transition-all duration-300 group ${
                  active
                    ? 'bg-gradient-to-r from-red-600/20 to-red-700/20 text-white border-l-2 border-red-500 shadow-lg shadow-red-500/20'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white hover:border-l-2 hover:border-white/20'
                }`}
              >
                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Profile Footer with glassmorphism */}
      <div className="p-4 border-t border-white/10 backdrop-blur-md bg-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-semibold shadow-lg shadow-orange-500/50">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{userName}</p>
              <p className="text-xs text-gray-400 truncate">{userEmail}</p>
            </div>
          </div>
          <Link
            to="/dashboard/settings"
            className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300 group"
            title="Settings"
          >
            <Settings className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:rotate-90 transition-all duration-300" />
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
