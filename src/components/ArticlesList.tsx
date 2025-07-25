'use client';

import { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard';
import { ArticleGridSkeleton } from './ArticleCardSkeleton';
import ErrorDisplay from './ErrorDisplay';
import SearchHeader from './SearchHeader';
import { searchBatmanArticles, WikipediaSearchResult } from '@/lib/wikipedia';

export default function ArticlesList() {
  const [articles, setArticles] = useState<WikipediaSearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [batmanAnimating, setBatmanAnimating] = useState(false);

  const fetchArticles = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const results = await searchBatmanArticles(24); // Get more articles
      setArticles(results);
      setLastUpdated(new Date());
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error occurred');
      setError(error);
      console.error('Failed to fetch articles:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchArticles();
  }, []);

  const handleRefresh = () => {
    fetchArticles(true);
  };

  const handleRetry = () => {
    setError(null);
    fetchArticles();
  };

  const handleBatmanClick = () => {
    setBatmanAnimating(true);
    // Reset animation after 3 full rotations (3 seconds at 1s per rotation)
    setTimeout(() => {
      setBatmanAnimating(false);
    }, 3000);
  };

  if (loading && !refreshing) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <SearchHeader />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="mb-6">
            <div className="h-6 sm:h-8 bg-gray-300 dark:bg-gray-600 rounded w-48 sm:w-64 animate-pulse"></div>
          </div>
          <ArticleGridSkeleton count={12} />
        </main>
      </div>
    );
  }

  if (error && !refreshing) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <SearchHeader />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <ErrorDisplay 
            error={error}
            title="Failed to load Batman articles"
            message="We couldn't fetch the latest Batman articles from Wikipedia. Please check your internet connection and try again."
            onRetry={handleRetry}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SearchHeader 
        onRefresh={handleRefresh}
        isRefreshing={refreshing}
        articleCount={articles.length}
        lastUpdated={lastUpdated || undefined}
        onBatmanClick={handleBatmanClick}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Latest Batman Articles
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Discover the most recent Batman-related content from Wikipedia. Articles are updated in real-time.
          </p>
        </div>

        {/* Loading overlay for refresh */}
        {refreshing && (
          <div className="relative">
            <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm z-10 rounded-lg">
              <div className="flex items-center justify-center h-full">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 sm:p-4 flex items-center space-x-2 sm:space-x-3 mx-4">
                  <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-blue-600"></div>
                  <span className="text-sm sm:text-base text-gray-900 dark:text-white font-medium">Refreshing articles...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        {articles.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400 text-lg">
              No Batman articles found. Try refreshing the page.
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {articles.map((article) => (
              <div
                key={article.pageid}
                className={`${batmanAnimating ? 'animate-batman-spin' : ''}`}
              >
                <ArticleCard
                  article={article}
                />
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
            <p>
              Data sourced from{' '}
              <a 
                href="https://en.wikipedia.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Wikipedia
              </a>
              {' '}• Updated automatically every 5 minutes
            </p>
            <p className="mt-2">
              Batman Wiki Explorer • Built with Next.js {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
