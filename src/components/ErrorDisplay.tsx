'use client';

import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface ErrorDisplayProps {
  error?: Error;
  message?: string;
  onRetry?: () => void;
  title?: string;
}

export default function ErrorDisplay({ 
  error, 
  message, 
  onRetry, 
  title = "Something went wrong" 
}: ErrorDisplayProps) {
  const errorMessage = message || error?.message || "An unexpected error occurred.";

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className="bg-red-50 dark:bg-red-900/20 rounded-full p-3 mb-4">
        <ExclamationTriangleIcon className="h-12 w-12 text-red-500 dark:text-red-400" />
      </div>
      
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h2>
      
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
        {errorMessage}
      </p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
        >
          <ArrowPathIcon className="h-5 w-5 mr-2" />
          Try Again
        </button>
      )}
      
      {process.env.NODE_ENV === 'development' && error?.stack && (
        <details className="mt-6 w-full max-w-2xl">
          <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            Show error details (dev only)
          </summary>
          <pre className="mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs text-left overflow-auto border">
            {error.stack}
          </pre>
        </details>
      )}
    </div>
  );
}
