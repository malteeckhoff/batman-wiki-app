'use client';

import Link from 'next/link';
import { WikipediaSearchResult } from '@/lib/wikipedia';
import { ArrowTopRightOnSquareIcon, CalendarIcon } from '@heroicons/react/24/outline';

interface ArticleCardProps {
  article: WikipediaSearchResult;
  onViewDetails?: (article: WikipediaSearchResult) => void;
}

export default function ArticleCard({ article, onViewDetails }: ArticleCardProps) {
  const formatDate = (timestamp: string) => {
    try {
      return new Date(timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Unknown date';
    }
  };

  const getWikipediaUrl = (title: string) => {
    return `https://en.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, '_'))}`;
  };

  const cleanSnippet = (snippet: string) => {
    // Remove HTML tags and decode HTML entities
    return snippet
      .replace(/<[^>]*>/g, '')
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&#39;/g, "'")
      .trim();
  };

  const handleExternalLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(getWikipediaUrl(article.title), '_blank', 'noopener,noreferrer');
  };

  const articleUrl = `/article/${encodeURIComponent(article.title)}`;

  return (
    <Link href={articleUrl} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer group">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 flex-1 mr-2">
              {article.title}
            </h3>
            <button
              onClick={handleExternalLinkClick}
              className="flex-shrink-0 p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              title="Open in Wikipedia"
              aria-label="Open article in Wikipedia"
            >
              <ArrowTopRightOnSquareIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Snippet */}
          <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3 mb-4">
            {cleanSnippet(article.snippet)}
          </p>

          {/* Metadata */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1" />
                {formatDate(article.timestamp)}
              </span>
              <span>{article.wordcount} words</span>
              <span>{(article.size / 1024).toFixed(1)}KB</span>
            </div>
            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
              #{article.pageid}
            </span>
          </div>
        </div>

        {/* Hover indicator */}
        <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
      </div>
    </Link>
  );
}

// Utility component for line clamping (Tailwind classes)
const lineClampStyles = `
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;
