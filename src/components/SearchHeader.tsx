'use client';

import { MagnifyingGlassIcon, ArrowPathIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

interface SearchHeaderProps {
  onRefresh?: () => void;
  isRefreshing?: boolean;
  articleCount?: number;
  lastUpdated?: Date;
  onBatmanClick?: () => void;
}

export default function SearchHeader({ 
  onRefresh, 
  isRefreshing = false, 
  articleCount = 0,
  lastUpdated,
  onBatmanClick 
}: SearchHeaderProps) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode is enabled
    if (typeof window !== 'undefined') {
      const isDark = localStorage.theme === 'dark' ||
                    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
      setDarkMode(isDark);
    }
  }, []);

  const toggleDarkMode = () => {
    if (typeof window !== 'undefined') {
      const newMode = !darkMode;
      setDarkMode(newMode);
      
      if (newMode) {
        localStorage.theme = 'dark';
        document.documentElement.classList.add('dark');
      } else {
        localStorage.theme = 'light';
        document.documentElement.classList.remove('dark');
      }
    }
  };

  const formatLastUpdated = (date: Date) => {
    try {
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      
      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays}d ago`;
    } catch {
      return 'Unknown';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Layout */}
        <div className="block sm:hidden">
          <div className="flex items-center justify-between h-14">
            {/* Logo and Title */}
            <div className="flex items-center space-x-2 min-w-0 flex-1">
              <div className="flex-shrink-0">
                <div className="w-7 h-7 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-black font-bold text-xs">B</span>
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                  Batman Wiki
                </h1>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              {/* Batarang Easter Egg */}
              <button
                onClick={onBatmanClick}
                className="px-3 py-1 text-xs font-bold text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 rounded-md transition-all duration-200 border border-yellow-200 dark:border-yellow-800 hover:scale-105 transform"
                title="🦇 Batman Easter Egg - Click to activate!"
              >
                🦇 NA NA NA!
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? (
                  <SunIcon className="h-4 w-4" />
                ) : (
                  <MoonIcon className="h-4 w-4" />
                )}
              </button>

              {/* Refresh Button */}
              {onRefresh && (
                <button
                  onClick={onRefresh}
                  disabled={isRefreshing}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    isRefreshing
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                      : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30'
                  }`}
                  title="Refresh articles"
                >
                  <ArrowPathIcon 
                    className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} 
                  />
                </button>
              )}
            </div>
          </div>
          
          {/* Mobile stats row */}
          <div className="pb-3 pt-1">
            <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <MagnifyingGlassIcon className="h-3 w-3" />
                <span>{articleCount} articles</span>
              </div>
              {lastUpdated && (
                <span>Updated {formatLastUpdated(lastUpdated)}</span>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-black font-bold text-sm">B</span>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Batman Wiki Explorer
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Latest Batman articles from Wikipedia
              </p>
            </div>
          </div>

          {/* Stats and Actions */}
          <div className="flex items-center space-x-4">
            {/* Article Count */}
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <MagnifyingGlassIcon className="h-4 w-4" />
              <span>{articleCount} articles found</span>
              {lastUpdated && (
                <>
                  <span className="text-gray-300 dark:text-gray-600">•</span>
                  <span>Updated {formatLastUpdated(lastUpdated)}</span>
                </>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>

            {/* Batarang Easter Egg */}
            <button
              onClick={onBatmanClick}
              className="px-4 py-2 text-sm font-bold text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 rounded-lg transition-all duration-200 border border-yellow-200 dark:border-yellow-800 hover:scale-105 transform"
              title="🦇 Batman Easter Egg - Click to activate!"
            >
              🦇 THROW BATARANG!
            </button>

            {/* Refresh Button */}
            {onRefresh && (
              <button
                onClick={onRefresh}
                disabled={isRefreshing}
                className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  isRefreshing
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30'
                }`}
                title="Refresh articles"
              >
                <ArrowPathIcon 
                  className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} 
                />
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
