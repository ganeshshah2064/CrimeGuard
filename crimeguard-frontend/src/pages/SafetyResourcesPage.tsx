import React, { useState } from 'react';
import { Button } from '../components/ui';

interface SafetyResource {
  id: string;
  title: string;
  content: string;
  category: 'emergency' | 'prevention' | 'contacts' | 'tips';
  priority: number;
}

const SafetyResourcesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { value: 'all', label: 'All Resources', icon: '📋' },
    { value: 'emergency', label: 'Emergency Contacts', icon: '🚨' },
    { value: 'prevention', label: 'Crime Prevention', icon: '🛡️' },
    { value: 'contacts', label: 'Local Contacts', icon: '📞' },
    { value: 'tips', label: 'Safety Tips', icon: '💡' }
  ];

  const safetyResources: SafetyResource[] = [
    {
      id: '1',
      title: 'Emergency Services',
      content: 'Police: 911\nFire Department: 911\nAmbulance: 911\nPoison Control: 1-800-222-1222',
      category: 'emergency',
      priority: 1
    },
    {
      id: '2',
      title: 'Non-Emergency Police',
      content: 'For non-urgent police matters:\nLocal Police: (555) 123-4567\nOnline Reporting: police.gov/report',
      category: 'contacts',
      priority: 2
    },
    {
      id: '3',
      title: 'Home Security Tips',
      content: '• Always lock doors and windows\n• Install motion-sensor lights\n• Use a security system\n• Don\'t advertise valuables\n• Know your neighbors',
      category: 'prevention',
      priority: 3
    },
    {
      id: '4',
      title: 'Personal Safety While Walking',
      content: '• Stay alert and aware of surroundings\n• Walk confidently and purposefully\n• Avoid isolated areas\n• Keep valuables hidden\n• Trust your instincts',
      category: 'tips',
      priority: 4
    },
    {
      id: '5',
      title: 'Cyber Crime Prevention',
      content: '• Use strong, unique passwords\n• Don\'t click suspicious links\n• Verify requests for personal info\n• Keep software updated\n• Use secure networks',
      category: 'prevention',
      priority: 5
    },
    {
      id: '6',
      title: 'Community Resources',
      content: 'Neighborhood Watch: (555) 234-5678\nVictim Services: (555) 345-6789\nCommunity Center: (555) 456-7890',
      category: 'contacts',
      priority: 6
    },
    {
      id: '7',
      title: 'Vehicle Safety',
      content: '• Lock your car always\n• Don\'t leave valuables visible\n• Park in well-lit areas\n• Check surroundings before approaching\n• Keep doors locked while driving',
      category: 'tips',
      priority: 7
    },
    {
      id: '8',
      title: 'Mental Health Crisis',
      content: 'Crisis Hotline: 988\nLocal Mental Health: (555) 567-8901\nText Crisis Line: Text HOME to 741741',
      category: 'emergency',
      priority: 8
    }
  ];

  const filteredResources = safetyResources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const emergencyContacts = [
    { name: 'Police Emergency', number: '911', description: 'Life-threatening emergencies' },
    { name: 'Fire Department', number: '911', description: 'Fire, medical emergencies' },
    { name: 'Poison Control', number: '1-800-222-1222', description: '24/7 poison emergency help' },
    { name: 'Crisis Hotline', number: '988', description: 'Mental health crisis support' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Safety Resources</h1>
          <p className="mt-2 text-gray-600">
            Access emergency contacts, safety tips, and crime prevention resources for your community
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Emergency Contacts Banner */}
        <div className="bg-danger-600 rounded-lg p-6 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-2">🚨</span>
            Emergency Contacts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="font-semibold">{contact.name}</div>
                <div className="text-2xl font-bold my-1">
                  <a href={`tel:${contact.number}`} className="hover:underline">
                    {contact.number}
                  </a>
                </div>
                <div className="text-sm opacity-90">{contact.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Search */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Resources</h3>
              <input
                type="text"
                placeholder="Search safety resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Categories */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      selectedCategory === category.value
                        ? 'bg-primary-100 text-primary-800'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredResources.map(resource => (
                <div key={resource.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      resource.category === 'emergency' ? 'bg-danger-100 text-danger-800' :
                      resource.category === 'prevention' ? 'bg-primary-100 text-primary-800' :
                      resource.category === 'contacts' ? 'bg-success-100 text-success-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {categories.find(c => c.value === resource.category)?.label}
                    </span>
                  </div>
                  <div className="text-gray-600 whitespace-pre-line text-sm leading-relaxed">
                    {resource.content}
                  </div>
                  {resource.category === 'emergency' || resource.category === 'contacts' ? (
                    <div className="mt-4">
                      <Button size="sm" variant="outline">
                        Quick Dial
                      </Button>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>

            {filteredResources.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
                <p className="text-gray-600">Try adjusting your search or category filter.</p>
              </div>
            )}
          </div>
        </div>

        {/* Additional Resources Section */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Safety Guides</h3>
              <p className="text-gray-600 mb-4">
                Download comprehensive safety guides for various situations and scenarios.
              </p>
              <Button variant="outline" size="sm">
                Download Guides
              </Button>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Programs</h3>
              <p className="text-gray-600 mb-4">
                Join local safety programs and neighborhood watch groups in your area.
              </p>
              <Button variant="outline" size="sm">
                Find Programs
              </Button>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Safety Apps</h3>
              <p className="text-gray-600 mb-4">
                Discover mobile apps that can help keep you safe and connected to emergency services.
              </p>
              <Button variant="outline" size="sm">
                View Apps
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyResourcesPage;