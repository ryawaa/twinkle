import { useState, useEffect, useCallback } from 'react';

// Props for the CompanyNewsWidget component, including the stock symbol
interface CompanyNewsWidgetProps {
  symbol: string;
}

// Interface for a NewsArticle object to ensure type safety
interface NewsArticle {
  category: string;
  datetime: number;
  headline: string;
  id: number;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
}

// SkeletonLoader component to display a loading state with shimmering effect
const SkeletonLoader = () => (
  <div className="space-y-4">
    {Array.from({ length: 3 }).map((_, index) => (
      <div key={index} className="rounded-lg bg-gray-300 dark:bg-gray-700 p-4 gap-3 animate-pulse">
        <div className="h-6 bg-gray-400 dark:bg-gray-600 rounded mb-2"></div>
        <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded mb-2"></div>
        <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded w-3/4"></div>
      </div>
    ))}
  </div>
);

// Main component to load and display company news based on a stock symbol
const CompanyNewsWidget = ({ symbol }: CompanyNewsWidgetProps) => {
  // State to hold the news articles
  const [news, setNews] = useState<NewsArticle[]>([]);
  // State to manage the loading state
  const [loading, setLoading] = useState<boolean>(true);
  // State to handle any errors that might occur during fetch
  const [error, setError] = useState<string | null>(null);

  // Function to fetch the company news from the API
  const fetchNews = useCallback(async () => {
    // Set loading to true at the start of the fetch operation
    setLoading(true);
    // Clear any previous errors
    setError(null);

    try {
      // Fetch data from the API using the provided symbol
      const res = await fetch(`/api/company-news?symbol=${symbol}`);
      const data = await res.json();

      // Handle response: check if request was successful 
      if (res.ok) {
        // Set the news articles in state
        setNews(data);
      } else {
        // If not successful, set the error message from response
        throw new Error(data.error || 'Failed to fetch data');
      }
    } catch (err) {
      // If an error occurs, set the error message in state
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      // Set loading to false after the fetch operation is complete
      setLoading(false);
    }
  }, [symbol]);

  // Effect that runs when the component mounts or when symbol changes
  useEffect(() => {
    if (symbol) {
      fetchNews(); // Fetch news when the symbol is available
    }
  }, [symbol, fetchNews]);

  // If loading, display SkeletonLoader component
  if (loading) {
    return <SkeletonLoader />;
  }

  // If error occurred, display the error message
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  // Render the list of news articles
  return (
    <div className="p-6 bg-surface0 dark:bg-surface0 rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-bold text-text dark:text-text mb-4">Company News for {symbol}</h2>
      <div className="space-y-4">
        {news.slice(0, 20).map((article) => (
          <div key={article.id} className="rounded-lg bg-overlay0 dark:bg-mantle p-4">
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-text dark:text-text hover:underline">
              <h3 className="text-lg font-semibold mb-2">{article.headline}</h3>
              <p className="text-sm text-subtext0 dark:text-subtext1 mb-2">
                {article.source} | {new Date(article.datetime * 1000).toLocaleDateString()}
              </p>
              <p className="text-sm text-text dark:text-text">{article.summary}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyNewsWidget;