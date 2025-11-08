// Report Status Enum
export enum ReportStatus {
  PENDING = 'Pending',
  IN_PROGRESS = 'In Progress',
  RESOLVED = 'Resolved',
  UNDER_INVESTIGATION = 'Under Investigation',
  CLOSED = 'Closed',
}

// Report Model
export interface Report {
  id: string;
  userId: string;
  type: string;
  category: string;
  description: string;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  status: ReportStatus;
  createdAt: Date;
  updatedAt: Date;
  attachments?: string[];
}

// Notification Model
export interface Notification {
  id: string;
  userId: string;
  type: 'report_update' | 'system_alert' | 'response';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  relatedReportId?: string;
}

// Dashboard Stats
export interface DashboardStats {
  totalReports: number;
  totalReportsChange: number; // Percentage
  openCases: number;
  openCasesChange: number;
  resolvedCases: number;
  resolvedCasesChange: number;
}

// Monthly Trend Data
export interface MonthlyTrendData {
  month: string; // "January", "February", etc.
  reports: number;
  date: Date;
}

// Daily Average Data
export interface DailyAverageData {
  day: string; // "Sun", "Mon", etc.
  reports: number;
  date: Date;
}

// Category Breakdown Data
export interface CategoryBreakdownData {
  category: string;
  count: number;
  percentage: number;
  color: string;
}

// Activity Item
export interface Activity {
  id: string;
  type: string; // "Theft Report", "Vandalism Report", etc.
  action: string; // "Submitted", "Updated", "Resolved"
  date: Date;
  status: ReportStatus;
}

// Complete Dashboard Data
export interface DashboardData {
  stats: DashboardStats;
  monthlyTrends: MonthlyTrendData[];
  dailyAverages: DailyAverageData[];
  categoryBreakdown: CategoryBreakdownData[];
  recentActivity: Activity[];
  notifications: Notification[];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface ReportFilters {
  status?: ReportStatus;
  category?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
}
