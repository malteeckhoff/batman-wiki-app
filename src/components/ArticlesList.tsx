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

  if (loading && !refreshing) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <SearchHeader />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-64 animate-pulse"></div>
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
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Latest Batman Articles
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Discover the most recent Batman-related content from Wikipedia. Articles are updated in real-time.
          </p>
        </div>

        {/* Loading overlay for refresh */}
        {refreshing && (
          <div className="relative">
            <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm z-10 rounded-lg">
              <div className="flex items-center justify-center h-full">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="text-gray-900 dark:text-white font-medium">Refreshing articles...</span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard
                key={article.pageid}
                article={article}
              />
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
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
