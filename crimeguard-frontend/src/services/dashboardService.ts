import type {
  DashboardData,
  Report,
  Notification,
  MonthlyTrendData,
  DailyAverageData,
  CategoryBreakdownData,
  ReportFilters,
  ReportStatus,
  Activity,
  DashboardStats,
} from '../types/dashboard';

// Mock data generators for development
const generateMockStats = (): DashboardStats => ({
  totalReports: 24,
  totalReportsChange: 4,
  openCases: 7,
  openCasesChange: -2,
  resolvedCases: 17,
  resolvedCasesChange: 6,
});

const generateMockMonthlyTrends = (): MonthlyTrendData[] => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June'];
  const now = new Date();
  
  return months.map((month, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
    return {
      month,
      reports: Math.floor(Math.random() * 20) + 10,
      date,
    };
  });
};

const generateMockDailyAverages = (): DailyAverageData[] => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const now = new Date();
  
  return days.map((day, index) => {
    const date = new Date(now);
    date.setDate(now.getDate() - (6 - index));
    return {
      day,
      reports: Math.floor(Math.random() * 30) + 80,
      date,
    };
  });
};

const generateMockCategoryBreakdown = (): CategoryBreakdownData[] => [
  { category: 'Theft', count: 45, percentage: 35, color: '#ef4444' },
  { category: 'Vandalism', count: 32, percentage: 25, color: '#f59e0b' },
  { category: 'Assault', count: 25, percentage: 20, color: '#8b5cf6' },
  { category: 'Burglary', count: 15, percentage: 12, color: '#3b82f6' },
  { category: 'Other', count: 10, percentage: 8, color: '#6b7280' },
];

const generateMockActivity = (): Activity[] => {
  const types = ['Theft Report', 'Vandalism Report', 'Noise Complaint', 'Suspicious Activity Report', 'Traffic Violation', 'Lost Property Report'];
  const actions = ['Submitted', 'Updated', 'Resolved'];
  const statuses: ReportStatus[] = [
    ReportStatus.PENDING,
    ReportStatus.IN_PROGRESS,
    ReportStatus.RESOLVED,
    ReportStatus.UNDER_INVESTIGATION,
    ReportStatus.CLOSED,
  ];
  
  return Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    date.setHours(date.getHours() - Math.floor(Math.random() * 24));
    
    return {
      id: `activity-${i + 1}`,
      type: types[Math.floor(Math.random() * types.length)],
      action: actions[Math.floor(Math.random() * actions.length)],
      date,
      status: statuses[Math.floor(Math.random() * statuses.length)],
    };
  });
};

const generateMockNotifications = (userId: string): Notification[] => [
  {
    id: 'notif-1',
    userId,
    type: 'report_update',
    title: 'Report Status Updated',
    message: 'Your theft report has been updated to "In Progress"',
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    relatedReportId: 'report-1',
  },
  {
    id: 'notif-2',
    userId,
    type: 'system_alert',
    title: 'New Crime Alert in Your Area',
    message: 'A burglary was reported 0.5 miles from your location',
    read: false,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: 'notif-3',
    userId,
    type: 'response',
    title: 'Police Response Received',
    message: 'Police have responded to your vandalism report',
    read: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    relatedReportId: 'report-2',
  },
];

// Dashboard Service Class
class DashboardService {
  private baseUrl = '/api';

  // Simulate API delay
  private async simulateDelay(ms: number = 800): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getDashboardData(userId: string): Promise<DashboardData> {
    await this.simulateDelay();
    
    return {
      stats: generateMockStats(),
      monthlyTrends: generateMockMonthlyTrends(),
      dailyAverages: generateMockDailyAverages(),
      categoryBreakdown: generateMockCategoryBreakdown(),
      recentActivity: generateMockActivity(),
      notifications: generateMockNotifications(userId),
    };
  }

  async getReports(userId: string, filters?: ReportFilters): Promise<Report[]> {
    await this.simulateDelay();
    
    // Mock implementation - in production, this would call the actual API
    console.log('Fetching reports for user:', userId, 'with filters:', filters);
    return [];
  }

  async getNotifications(userId: string): Promise<Notification[]> {
    await this.simulateDelay();
    return generateMockNotifications(userId);
  }

  async markNotificationRead(notificationId: string): Promise<void> {
    await this.simulateDelay(300);
    console.log('Marking notification as read:', notificationId);
  }

  async getMonthlyTrends(userId: string, months: number = 6): Promise<MonthlyTrendData[]> {
    await this.simulateDelay();
    console.log('Fetching monthly trends for user:', userId, 'months:', months);
    return generateMockMonthlyTrends();
  }

  async getDailyAverages(userId: string, days: number = 7): Promise<DailyAverageData[]> {
    await this.simulateDelay();
    console.log('Fetching daily averages for user:', userId, 'days:', days);
    return generateMockDailyAverages();
  }

  async getCategoryBreakdown(userId: string): Promise<CategoryBreakdownData[]> {
    await this.simulateDelay();
    console.log('Fetching category breakdown for user:', userId);
    return generateMockCategoryBreakdown();
  }
}

// Export singleton instance
export const dashboardService = new DashboardService();
