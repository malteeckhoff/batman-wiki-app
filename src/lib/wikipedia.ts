/**
 * Wikipedia API service for fetching Batman-related articles
 */

// Wikipedia API endpoints
const WIKIPEDIA_API_BASE = 'https://en.wikipedia.org/api/rest_v1';
const WIKIPEDIA_SEARCH_API = 'https://en.wikipedia.org/w/api.php';

// Types for Wikipedia API responses
export interface WikipediaSearchResult {
  title: string;
  pageid: number;
  size: number;
  wordcount: number;
  snippet: string;
  timestamp: string;
}

export interface WikipediaSearchResponse {
  query: {
    search: WikipediaSearchResult[];
    searchinfo: {
      totalhits: number;
    };
  };
}

export interface WikipediaPage {
  pageid: number;
  title: string;
  extract: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
  pageimage?: string;
  contentUrls: {
    desktop: {
      page: string;
    };
    mobile: {
      page: string;
    };
  };
}

export interface WikipediaPageResponse {
  type: string;
  title: string;
  displaytitle: string;
  namespace: {
    id: number;
    text: string;
  };
  wikibase_item: string;
  titles: {
    canonical: string;
    normalized: string;
    display: string;
  };
  pageid: number;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
  originalimage?: {
    source: string;
    width: number;
    height: number;
  };
  lang: string;
  dir: string;
  revision: string;
  tid: string;
  timestamp: string;
  description: string;
  description_source: string;
  content_urls: {
    desktop: {
      page: string;
      revisions: string;
      edit: string;
      talk: string;
    };
    mobile: {
      page: string;
      revisions: string;
      edit: string;
      talk: string;
    };
  };
  extract: string;
  extract_html: string;
}

/**
 * Search for Batman-related articles on Wikipedia
 */
export async function searchBatmanArticles(limit: number = 20): Promise<WikipediaSearchResult[]> {
  try {
    const searchTerms = [
      'Batman',
      'Batman comics',
      'Batman movies',
      'Batman TV series',
      'Batman characters',
      'Bruce Wayne',
      'Gotham City',
      'Joker Batman',
      'Batman animated',
      'Batman video games'
    ];

    // Use a broader search that captures Batman-related content
    const searchQuery = 'Batman OR "Bruce Wayne" OR "Gotham City" OR "Dark Knight"';
    
    const params = new URLSearchParams({
      action: 'query',
      format: 'json',
      list: 'search',
      srsearch: searchQuery,
      srlimit: limit.toString(),
      srprop: 'title|snippet|size|wordcount|timestamp',
      srnamespace: '0', // Main namespace only
      origin: '*' // Enable CORS
    });

    const response = await fetch(`${WIKIPEDIA_SEARCH_API}?${params}`, {
      headers: {
        'User-Agent': 'BatmanWikiApp/1.0 (https://example.com/contact)'
      },
      next: { revalidate: 300 } // Revalidate every 5 minutes
    });

    if (!response.ok) {
      throw new Error(`Wikipedia search failed: ${response.status}`);
    }

    const data: WikipediaSearchResponse = await response.json();
    
    // Filter results to ensure they're actually Batman-related
    const batmanRelated = data.query.search.filter(article => {
      const titleLower = article.title.toLowerCase();
      const snippetLower = article.snippet.toLowerCase();
      
      return titleLower.includes('batman') || 
             titleLower.includes('bruce wayne') || 
             titleLower.includes('gotham') || 
             titleLower.includes('dark knight') ||
             snippetLower.includes('batman') ||
             snippetLower.includes('bruce wayne') ||
             snippetLower.includes('gotham');
    });

    return batmanRelated;
  } catch (error) {
    console.error('Error searching Batman articles:', error);
    throw new Error('Failed to fetch Batman articles from Wikipedia');
  }
}

/**
 * Get detailed information about a Wikipedia page
 */
export async function getWikipediaPage(title: string): Promise<WikipediaPageResponse> {
  try {
    const encodedTitle = encodeURIComponent(title);
    const response = await fetch(`${WIKIPEDIA_API_BASE}/page/summary/${encodedTitle}`, {
      headers: {
        'User-Agent': 'BatmanWikiApp/1.0 (https://example.com/contact)'
      },
      next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`Wikipedia page fetch failed: ${response.status}`);
    }

    const data: WikipediaPageResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Wikipedia page:', error);
    throw new Error('Failed to fetch Wikipedia page details');
  }
}

/**
 * Get recent changes related to Batman articles
 */
export async function getRecentBatmanChanges(limit: number = 10): Promise<any[]> {
  try {
    const params = new URLSearchParams({
      action: 'query',
      format: 'json',
      list: 'recentchanges',
      rcnamespace: '0',
      rclimit: '100', // Get more to filter
      rcprop: 'title|timestamp|comment|user|sizes',
      origin: '*'
    });

    const response = await fetch(`${WIKIPEDIA_SEARCH_API}?${params}`, {
      headers: {
        'User-Agent': 'BatmanWikiApp/1.0 (https://example.com/contact)'
      },
      next: { revalidate: 60 } // Revalidate every minute for recent changes
    });

    if (!response.ok) {
      throw new Error(`Wikipedia recent changes failed: ${response.status}`);
    }

    const data = await response.json();
    
    // Filter for Batman-related changes
    const batmanChanges = data.query.recentchanges.filter((change: any) => {
      const titleLower = change.title.toLowerCase();
      const commentLower = (change.comment || '').toLowerCase();
      
      return titleLower.includes('batman') || 
             titleLower.includes('bruce wayne') || 
             titleLower.includes('gotham') ||
             commentLower.includes('batman') ||
             commentLower.includes('bruce wayne');
    });

    return batmanChanges.slice(0, limit);
  } catch (error) {
    console.error('Error fetching recent Batman changes:', error);
    return [];
  }
}

/**
 * Get Batman categories from Wikipedia
 */
export async function getBatmanCategories(): Promise<string[]> {
  try {
    const params = new URLSearchParams({
      action: 'query',
      format: 'json',
      list: 'allcategories',
      acprefix: 'Batman',
      aclimit: '50',
      origin: '*'
    });

    const response = await fetch(`${WIKIPEDIA_SEARCH_API}?${params}`, {
      headers: {
        'User-Agent': 'BatmanWikiApp/1.0 (https://example.com/contact)'
      },
      next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`Wikipedia categories failed: ${response.status}`);
    }

    const data = await response.json();
    return data.query.allcategories.map((cat: any) => cat['*']);
  } catch (error) {
    console.error('Error fetching Batman categories:', error);
    return [];
  }
}
