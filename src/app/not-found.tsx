'use client';

import Link from 'next/link';
import { HomeIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-black font-bold text-4xl">B</span>
          </div>
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Article Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            The Batman article you're looking for doesn't exist or may have been moved. 
            Let's get you back to discovering amazing Batman content.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            <HomeIcon className="h-5 w-5 mr-2" />
            Back to Articles
          </Link>
          
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Or explore our latest Batman articles from Wikipedia
          </p>
        </div>
      </div>
    </div>
  );
}
