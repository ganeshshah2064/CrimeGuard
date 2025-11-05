import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui';


const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200">
      {/* Hero Section */}
      <div className="relative bg-gray-50 dark:bg-gray-900 overflow-hidden">
        {/* Simple background dots */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-2 h-2 bg-red-400 rounded-full opacity-30"></div>
          <div className="absolute top-40 right-32 w-3 h-3 bg-red-300 rounded-full opacity-20"></div>
          <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-red-500 rounded-full opacity-40"></div>
          <div className="absolute bottom-20 right-20 w-2.5 h-2.5 bg-red-200 rounded-full opacity-25"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Tagline */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 tracking-wide font-medium">
              Fast, Easy, and Secured →
            </p>
            
            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl font-light text-gray-800 dark:text-gray-100 mb-6 leading-tight">
              Report Crime, Without Fear.
              <br />
              <span className="text-gray-700 dark:text-gray-200">Securely and Online.</span>
            </h1>
            
            {/* Description */}
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-normal">
              Our secure platform allows you to report crimes anonymously and get real-time updates on your case. Report Crime, Create a Safer Tomorrow.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/report">
                <Button 
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  REPORT A CRIME
                </Button>
              </Link>
              <button className="w-12 h-12 bg-black dark:bg-white rounded-full flex items-center justify-center ml-4 hover:scale-110 transition-transform duration-200 shadow-lg">
                <svg className="w-5 h-5 text-white dark:text-black ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 5v10l8-5-8-5z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Alerts */}
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 group-hover:shadow-xl">
                <svg className="w-8 h-8 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-5 5v-5zM9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-4xl font-light text-gray-800 dark:text-gray-100 mb-2">17,500+</div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Alerts</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Crime reports filed on our platform.
              </p>
            </div>

            {/* Maps */}
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 group-hover:shadow-xl">
                <svg className="w-8 h-8 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Maps</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Navigate our city with our advanced map features.
              </p>
            </div>

            {/* Trusted */}
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 group-hover:shadow-xl">
                <svg className="w-8 h-8 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="text-4xl font-light text-gray-800 dark:text-gray-100 mb-2">2,740+</div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Trusted</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Police stations connected to our platform.
              </p>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;