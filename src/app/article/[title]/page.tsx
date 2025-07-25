import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon, CalendarIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { getWikipediaPage } from '@/lib/wikipedia';

interface ArticlePageProps {
  params: Promise<{
    title: string;
  }>;
}

async function ArticleContent({ title }: { title: string }) {
  try {
    const decodedTitle = decodeURIComponent(title);
    const article = await getWikipediaPage(decodedTitle);
    
    const formatDate = (timestamp: string) => {
      try {
        return new Date(timestamp).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      } catch {
        return 'Unknown date';
      }
    };

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Articles
          </Link>
        </div>

        {/* Article Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
            {/* Article Image */}
            {article.thumbnail && (
              <div className="flex-shrink-0 mb-6 lg:mb-0">
                <img
                  src={article.thumbnail.source}
                  alt={article.title}
                  className="w-full lg:w-64 h-auto rounded-lg shadow-md"
                  loading="lazy"
                />
              </div>
            )}

            {/* Article Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {article.title}
              </h1>
              
              {article.description && (
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  {article.description}
                </p>
              )}

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Last updated: {formatDate(article.timestamp)}
                </div>
                <div>
                  Page ID: #{article.pageid}
                </div>
                {article.wikibase_item && (
                  <div>
                    Wikidata: {article.wikibase_item}
                  </div>
                )}
              </div>

              {/* External Link */}
              <a
                href={article.content_urls.desktop.page}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                <ArrowTopRightOnSquareIcon className="h-5 w-5 mr-2" />
                View on Wikipedia
              </a>
            </div>
          </div>
        </div>

        {/* Article Extract */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Article Extract
          </h2>
          <div 
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: article.extract_html || `<p>${article.extract}</p>` }}
          />
          
          {/* Read more link */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <a
              href={article.content_urls.desktop.page}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Continue reading on Wikipedia →
            </a>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching article:', error);
    notFound();
  }
}

function ArticleLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="animate-pulse">
        {/* Navigation skeleton */}
        <div className="mb-8">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
        </div>

        {/* Header skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
            <div className="flex-shrink-0 mb-6 lg:mb-0">
              <div className="w-full lg:w-64 h-48 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
            </div>
            <div className="flex-1">
              <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-6 w-3/4"></div>
              <div className="flex space-x-6 mb-6">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
              </div>
              <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-40"></div>
            </div>
          </div>
        </div>

        {/* Content skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded mb-6 w-48"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-11/12"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-4/5"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { title } = await params;
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Suspense fallback={<ArticleLoading />}>
        <ArticleContent title={title} />
      </Suspense>
    </div>
  );
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { title } = await params;
  const decodedTitle = decodeURIComponent(title);
  
  return {
    title: `${decodedTitle} - Batman Wiki Explorer`,
    description: `Read about ${decodedTitle} from Wikipedia. Batman Wiki Explorer brings you the latest Batman-related articles.`,
  };
}
