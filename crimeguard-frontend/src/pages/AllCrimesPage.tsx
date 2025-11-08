import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { Search, MapPin, Calendar, Tag } from 'lucide-react';

const AllCrimesPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');

  const crimes = [
    {
      id: 1,
      title: 'asasdda',
      status: 'unverified',
      location: 'Kolkata, West Bengal, India',
      date: 'Wed, 13 Aug, 10:17 pm',
      category: 'Theft',
      image: '/api/placeholder/200/200',
      bgColor: 'from-blue-500 to-purple-500',
    },
    {
      id: 2,
      title: 'vxfvx',
      status: 'unverified',
      location: 'Gurugram, Haryana',
      date: 'Thu, 10 Jul, 6:55 pm',
      category: 'Minor',
      image: '/api/placeholder/200/200',
      bgColor: 'from-teal-500 to-cyan-500',
    },
    {
      id: 3,
      title: 'r67j',
      status: 'unverified',
      location: '',
      date: 'Sun, 22 Jun, 7:40 pm',
      category: 'Robbery',
      views: 474,
      image: '/api/placeholder/200/200',
      bgColor: 'from-gray-700 to-gray-900',
    },
    {
      id: 4,
      title: 'aaa',
      status: 'unverified',
      location: 'India',
      date: 'Sat, 21 Jun, 8:33 pm',
      category: 'Other',
      image: '/api/placeholder/200/200',
      bgColor: 'from-white to-gray-100',
      textDark: true,
    },
    {
      id: 5,
      title: 'Love',
      status: 'verified',
      location: '',
      date: 'Fri, 20 Jun, 9:15 pm',
      category: 'Other',
      image: '/api/placeholder/200/200',
      bgColor: 'from-pink-400 to-red-400',
    },
    {
      id: 6,
      title: 'unstop',
      status: 'verified',
      location: '',
      date: 'Thu, 19 Jun, 11:22 am',
      category: 'Fraud',
      image: '/api/placeholder/200/200',
      bgColor: 'from-blue-600 to-blue-800',
    },
  ];

  const filteredCrimes = crimes.filter((crime) => {
    const matchesSearch = crime.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All Categories' || crime.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All Statuses' || crime.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">All Reported Crimes</h1>
          <p className="text-gray-400">Browse and search through all reported crime incidents</p>
        </div>

        {/* Filters with glassmorphism */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-red-400 transition-colors" />
            <input
              type="text"
              placeholder="Search crimes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:bg-white/10 transition-all duration-300 shadow-lg"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white focus:outline-none focus:border-red-500/50 focus:bg-white/10 transition-all duration-300 shadow-lg hover:bg-white/10 cursor-pointer"
          >
            <option>All Categories</option>
            <option>Theft</option>
            <option>Robbery</option>
            <option>Fraud</option>
            <option>Minor</option>
            <option>Other</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white focus:outline-none focus:border-red-500/50 focus:bg-white/10 transition-all duration-300 shadow-lg hover:bg-white/10 cursor-pointer"
          >
            <option>All Statuses</option>
            <option>verified</option>
            <option>unverified</option>
          </select>
        </div>

        {/* Crimes Grid with glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCrimes.map((crime, index) => (
            <div
              key={crime.id}
              className="relative group animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/10">
                {/* Crime Image/Thumbnail */}
                <div
                  className={`h-48 bg-gradient-to-br ${crime.bgColor} flex items-center justify-center relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black/10" />
                  <div
                    className={`text-5xl font-bold ${crime.textDark ? 'text-gray-800' : 'text-white'} relative z-10`}
                  >
                    {crime.title.charAt(0).toUpperCase()}
                  </div>
                  {crime.views && (
                    <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs flex items-center space-x-1 shadow-lg">
                      <span>👁️</span>
                      <span className="font-semibold">{crime.views}</span>
                    </div>
                  )}
                </div>

                {/* Crime Details */}
                <div className="p-5 space-y-3">
                  {/* Title */}
                  <h3 className="text-white font-bold text-lg">{crime.title}</h3>

                  {/* Status Badge */}
                  <div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${
                        crime.status === 'verified'
                          ? 'bg-green-500/20 text-green-400 border-green-500/30 shadow-lg shadow-green-500/20'
                          : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                      }`}
                    >
                      {crime.status}
                    </span>
                  </div>

                  {/* Location */}
                  {crime.location && (
                    <div className="flex items-start text-sm text-gray-400">
                      <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-red-400" />
                      <span className="line-clamp-2">{crime.location}</span>
                    </div>
                  )}

                  {/* Date */}
                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar className="w-4 h-4 mr-2 flex-shrink-0 text-blue-400" />
                    <span>{crime.date}</span>
                  </div>

                  {/* Category */}
                  <div className="flex items-center text-sm text-gray-400">
                    <Tag className="w-4 h-4 mr-2 flex-shrink-0 text-purple-400" />
                    <span>{crime.category}</span>
                  </div>

                  {/* View Details Button */}
                  <button
                    onClick={() => navigate(`/dashboard/crimes/${crime.id}`)}
                    className="w-full py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-xl font-semibold transition-all duration-300 mt-4 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Results Info */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/0 rounded-xl blur-lg" />
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-6 py-4">
            <p className="text-sm text-gray-400">
              Showing <span className="text-white font-semibold">{filteredCrimes.length}</span> of <span className="text-white font-semibold">{crimes.length}</span> crimes
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AllCrimesPage;
