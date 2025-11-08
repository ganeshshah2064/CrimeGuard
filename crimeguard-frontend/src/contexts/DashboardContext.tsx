import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { DashboardData } from '../types/dashboard';
import { dashboardService } from '../services/dashboardService';
import { useAuth } from '../hooks/useAuth';

interface DashboardContextType {
  dashboardData: DashboardData | null;
  isLoading: boolean;
  error: Error | null;
  refreshDashboard: () => Promise<void>;
  updateNotificationStatus: (notificationId: string, read: boolean) => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user, isAuthenticated } = useAuth();

  const fetchDashboardData = useCallback(async () => {
    if (!user || !isAuthenticated) {
      setDashboardData(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await dashboardService.getDashboardData(user.id);
      setDashboardData(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch dashboard data'));
      console.error('Error fetching dashboard data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [user, isAuthenticated]);

  // Fetch dashboard data when user changes or on mount
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const refreshDashboard = async () => {
    await fetchDashboardData();
  };

  const updateNotificationStatus = async (notificationId: string, read: boolean) => {
    try {
      await dashboardService.markNotificationRead(notificationId);
      
      // Update local state
      if (dashboardData) {
        const updatedNotifications = dashboardData.notifications.map(notif =>
          notif.id === notificationId ? { ...notif, read } : notif
        );
        
        setDashboardData({
          ...dashboardData,
          notifications: updatedNotifications,
        });
      }
    } catch (err) {
      console.error('Error updating notification status:', err);
      throw err;
    }
  };

  const value: DashboardContextType = {
    dashboardData,
    isLoading,
    error,
    refreshDashboard,
    updateNotificationStatus,
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};

// Custom hook to use dashboard context
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
