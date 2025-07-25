export default function ArticleCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-start justify-between">
          <div className="flex-1 mr-2">
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
          </div>
          <div className="flex-shrink-0 w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Snippet lines */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-4/5"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/5"></div>
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
          </div>
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
}

export function ArticleGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ArticleCardSkeleton key={index} />
      ))}
    </div>
  );
}
