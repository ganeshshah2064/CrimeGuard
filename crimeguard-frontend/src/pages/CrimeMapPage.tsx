import React, { useState, useEffect } from 'react';
import { LoadingSpinner, Button } from '../components/ui';

// Placeholder for map component - will be implemented in task 4
const CrimeMapPlaceholder: React.FC = () => {
  return (
    <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        </div>
        <p className="text-gray-600">Interactive Crime Map</p>
        <p className="text-sm text-gray-500">Map functionality will be implemented in the next phase</p>
      </div>
    </div>
  );
};

const CrimeMapPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({
    crimeType: 'all',
    dateRange: '30days',
    severity: 'all'
  });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const crimeTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'theft', label: 'Theft' },
    { value: 'assault', label: 'Assault' },
    { value: 'vandalism', label: 'Vandalism' },
    { value: 'fraud', label: 'Fraud' },
    { value: 'other', label: 'Other' }
  ];

  const dateRanges = [
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 3 Months' },
    { value: '1year', label: 'Last Year' }
  ];

  const severityLevels = [
    { value: 'all', label: 'All Severity' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' }
  ];

  const handleFilterChange = (filterType: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading crime map..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Crime Map</h1>
              <p className="mt-2 text-gray-600">
                View reported incidents in your area with real-time filtering options
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button>
                Export Data
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
              
              {/* Crime Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Crime Type
                </label>
                <select
                  value={selectedFilters.crimeType}
                  onChange={(e) => handleFilterChange('crimeType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {crimeTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Range Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Range
                </label>
                <select
                  value={selectedFilters.dateRange}
                  onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {dateRanges.map(range => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Severity Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Severity Level
                </label>
                <select
                  value={selectedFilters.severity}
                  onChange={(e) => handleFilterChange('severity', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {severityLevels.map(level => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>

              <Button variant="outline" className="w-full">
                Reset Filters
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Incidents</span>
                  <span className="font-semibold">247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">This Week</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">High Priority</span>
                  <span className="font-semibold text-danger-600">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Resolved</span>
                  <span className="font-semibold text-success-600">89%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Incident Locations
                </h2>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="w-3 h-3 bg-success-500 rounded-full"></div>
                  <span>Live Data</span>
                </div>
              </div>
              
              <CrimeMapPlaceholder />
              
              <div className="mt-4 text-sm text-gray-600">
                <p>
                  <strong>Privacy Notice:</strong> Incident locations are approximated to protect reporter privacy. 
                  Exact addresses are not displayed publicly.
                </p>
              </div>
            </div>

            {/* Recent Incidents */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Incidents</h3>
              <div className="space-y-4">
                {[
                  { id: 1, type: 'Theft', location: 'Downtown Area', time: '2 hours ago', severity: 'medium' },
                  { id: 2, type: 'Vandalism', location: 'Park District', time: '5 hours ago', severity: 'low' },
                  { id: 3, type: 'Assault', location: 'Residential Area', time: '1 day ago', severity: 'high' },
                ].map(incident => (
                  <div key={incident.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{incident.type}</div>
                      <div className="text-sm text-gray-600">{incident.location}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">{incident.time}</div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        incident.severity === 'high' ? 'bg-danger-100 text-danger-800' :
                        incident.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-success-100 text-success-800'
                      }`}>
                        {incident.severity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrimeMapPage;