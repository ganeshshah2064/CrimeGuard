import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeDebug: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
        Theme Debug: {isDark ? 'Dark' : 'Light'}
      </p>
      <button 
        onClick={toggleTheme}
        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
      >
        Toggle Theme
      </button>
    </div>
  );
};

export default ThemeDebug;