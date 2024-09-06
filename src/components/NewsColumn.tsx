import { useEffect, useState } from 'react';

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

// Skeleton components for loading state
const Skeleton = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-overlay1 ${className}`}></div>
);

const NewsColumn = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/news');
        const data = await res.json();
        const filteredNews = data.result.filter(
          (article: any) => article.source !== 'MarketWatch'
        );
        setNews(filteredNews);
      } catch (err) {
        setError('Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="lg:flex lg:space-x-4 w-full">
        <div className="lg:flex-1 lg:space-y-4">
          {/* Main featured article skeleton */}
          <div className="mb-4 lg:mb-0">
            <div className="block overflow-hidden rounded-lg shadow-lg">
              <Skeleton className="w-full h-64" />
              <div className="p-4 bg-surface0 dark:bg-surface0">
                <Skeleton className="h-6 mb-2" />
                <Skeleton className="h-4 mb-1" />
                <Skeleton className="h-4" />
              </div>
            </div>
          </div>

          {/* Other articles skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="block overflow-hidden rounded-lg shadow-lg"
              >
                <Skeleton className="w-full h-32 rounded-t-lg" />
                <div className="p-2 bg-surface0 dark:bg-surface0 h-full">
                  <Skeleton className="h-4 mb-1" />
                  <Skeleton className="h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest news sidebar skeleton */}
        <div className="mt-4 lg:mt-0 lg:w-1/4 lg:order-last border-text dark:border-crust border p-4 rounded-lg bg-surface0 dark:bg-surface0 lg:overflow-y-auto lg:h-screen">
          <h2 className="text-xl font-bold text-text dark:text-text mb-4">
            Latest
          </h2>
          <ul>
            {Array.from({ length: 5 }).map((_, index) => (
              <li key={index} className="mb-4">
                <Skeleton className="h-4 mb-1" />
                <Skeleton className="h-4" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const featuredArticle = news[0];
  const otherArticles = news.slice(1, 7);
  const latestArticles = news.slice(7);

  return (
    <div className="lg:flex lg:space-x-4">
      <div className="lg:flex-1 lg:space-y-4">
        {/* Main featured article */}
        <div className="mb-4 lg:mb-0">
          {featuredArticle && (
            <a
              href={featuredArticle.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-lg shadow-lg hover:underline"
            >
              <img
                src={featuredArticle.image}
                alt={featuredArticle.headline}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 bg-surface0 dark:bg-surface0">
                <h3 className="text-xl font-bold text-text dark:text-text">
                  {featuredArticle.headline}
                </h3>
                <p className="text-sm text-subtext1 dark:text-subtext1">
                  {new Date(featuredArticle.datetime * 1000).toLocaleString()} |{' '}
                  {featuredArticle.source}
                </p>
                <p className="text-sm mt-2 text-text dark:text-subtext1">
                  {featuredArticle.summary}
                </p>
              </div>
            </a>
          )}
        </div>

        {/* Other articles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {otherArticles.map((article) => (
            <a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-lg shadow-lg hover:underline"
            >
              <img
                src={article.image}
                alt={article.headline}
                className="w-full h-32 object-cover rounded-t-lg"
              />
              <div className="p-2 bg-surface0 dark:bg-surface0 h-full">
                <h3 className="text-sm font-semibold text-text dark:text-text">
                  {article.headline}
                </h3>
                <p className="text-xs text-subtext1 dark:text-subtext1">
                  {new Date(article.datetime * 1000).toLocaleString()} |{' '}
                  {article.source}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Latest news sidebar */}
      <div className="mt-4 lg:mt-0 lg:w-1/4 lg:order-last border- dark:border-crust border p-4  lg:overflow-y-auto lg:h-screen bg-surface0 dark:bg-surface0 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-text dark:text-text mb-4">
          Latest
        </h2>
        <ul>
          {latestArticles.map((article) => (
            <li key={article.id} className="mb-4">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline block"
              >
                <p className="text-sm font-semibold text-text dark:text-text">
                  {article.headline}
                </p>
                <p className="text-xs text-subtext1 dark:text-subtext1">
                  {new Date(article.datetime * 1000).toLocaleString()}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewsColumn;