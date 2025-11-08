import DashboardLayout from '../components/dashboard/DashboardLayout';
import { FileText, MapPin, Calendar, Eye, ChevronRight } from 'lucide-react';

const MyReportsPage = () => {
  const reports = [
    {
      id: 1,
      title: 'Theft Report',
      type: 'Theft',
      status: 'resolved',
      date: 'March 15, 2024',
      location: 'Downtown Plaza',
      views: 45,
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      id: 2,
      title: 'Vandalism Incident',
      type: 'Vandalism',
      status: 'pending',
      date: 'March 13, 2024',
      location: 'Park Avenue',
      views: 23,
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      id: 3,
      title: 'Burglary Report',
      type: 'Burglary',
      status: 'in-progress',
      date: 'March 12, 2024',
      location: 'Main Street',
      views: 67,
      gradient: 'from-blue-500 to-cyan-500',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'in-progress':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">My Reports</h1>
          <p className="text-gray-400">
            View and manage all your submitted crime reports.
          </p>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {reports.map((report, index) => (
            <div
              key={report.id}
              className="relative group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-white/10">
                {/* Card Header with gradient */}
                <div className={`h-32 bg-gradient-to-br ${report.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-4 right-4 flex items-center space-x-2 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Eye className="w-4 h-4 text-white" />
                    <span className="text-sm text-white font-semibold">{report.views}</span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{report.title}</h3>
                    <p className="text-sm text-gray-400">{report.type}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-400">
                      <MapPin className="w-4 h-4 mr-2 text-red-400" />
                      <span>{report.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                      <span>{report.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                    <button className="flex items-center space-x-1 text-sm text-red-400 hover:text-red-300 transition-colors group/btn">
                      <span>View Details</span>
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State for more reports */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-2xl blur-xl" />
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 border-dashed rounded-2xl p-12 text-center hover:bg-white/10 transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No more reports</h3>
            <p className="text-gray-400 mb-6">You've viewed all your submitted reports</p>
            <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105">
              Submit New Report
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyReportsPage;
