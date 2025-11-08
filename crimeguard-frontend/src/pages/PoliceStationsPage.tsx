import { useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { Search, MapPin, Mail } from 'lucide-react';

const PoliceStationsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const stations = [
    {
      id: 1,
      officerInCharge: 'Police 2',
      name: 'electric complex police station, salt lake',
      stationId: '895911',
      address: '5, BD Block, Sector 1, Kolkata, Bidhannagar, North 24 Parganas, We...',
      email: 'teamelectrica.fms@gmail.com',
      image: '/api/placeholder/80/80',
    },
    {
      id: 2,
      officerInCharge: 'Raj Singh',
      name: 'Noapara Police Station',
      stationId: '847292',
      address: '47, Shyamnagar, Gardhyamnagar, Barrackpore, North...',
      email: 'arish7@gmail.com',
      image: '/api/placeholder/80/80',
    },
    {
      id: 3,
      officerInCharge: 'Shri Arup Kumar Banerjee',
      name: 'Shyampukur Police Station',
      stationId: '1110',
      address: '47, Shyampukur Street, Kolkata-700004, West Bengal India',
      email: 'arup20037@gmail.com',
      image: '/api/placeholder/80/80',
    },
  ];

  const filteredStations = stations.filter(
    (station) =>
      station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.stationId.includes(searchQuery) ||
      station.officerInCharge.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">All Police Stations</h1>
          <p className="text-gray-400">Find and connect with police stations in your area</p>
        </div>

        {/* Search Bar with glassmorphism */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-red-400 transition-colors z-10" />
          <input
            type="text"
            placeholder="Search by station name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:bg-white/10 transition-all duration-300 shadow-lg"
          />
        </div>

        {/* Police Stations Grid with glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStations.map((station, index) => (
            <div
              key={station.id}
              className="relative group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/10">
                {/* Officer Info */}
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/50">
                    <span className="text-white text-2xl font-bold">
                      {station.officerInCharge.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Officer-in-Charge</p>
                    <h3 className="text-white font-semibold truncate">{station.officerInCharge}</h3>
                  </div>
                </div>

                {/* Station Name */}
                <h4 className="text-white font-bold text-lg mb-4 line-clamp-2">{station.name}</h4>

                {/* Station Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-start text-sm bg-white/5 p-2 rounded-lg">
                    <span className="text-gray-400 mr-2 font-semibold min-w-[70px]">ID:</span>
                    <span className="text-white font-mono">{station.stationId}</span>
                  </div>
                  <div className="flex items-start text-sm">
                    <MapPin className="w-4 h-4 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 line-clamp-2">{station.address}</span>
                  </div>
                  <div className="flex items-start text-sm">
                    <Mail className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 truncate">{station.email}</span>
                  </div>
                </div>

                {/* View Details Button */}
                <button className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination with glassmorphism */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/0 rounded-xl blur-lg" />
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-6 py-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">
                Showing <span className="text-white font-semibold">1 to 3</span> of <span className="text-white font-semibold">3</span> stations
              </span>
              <div className="flex items-center space-x-4">
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                  ← Previous
                </button>
                <span className="text-white font-semibold">Page 1 of 1</span>
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PoliceStationsPage;
