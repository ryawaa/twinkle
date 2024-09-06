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

const NewsColumn = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/news'); 
        const data = await res.json();
        const filteredNews = data.result.filter((article: any) => article.source !== 'MarketWatch');
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
    return <p>Loading...</p>;
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
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="text-xl font-bold">{featuredArticle.headline}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(featuredArticle.datetime * 1000).toLocaleString()} | {featuredArticle.source}
                </p>
                <p className="text-sm mt-2">{featuredArticle.summary}</p>
              </div>
            </a>
          )}
        </div>

        {/* Other articles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {otherArticles.map(article => (
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
              <div className="p-2 bg-white h-full dark:bg-gray-800">
                <h3 className="text-sm font-semibold">{article.headline}</h3>
                <p className="text-xs text-gray-500">
                  {new Date(article.datetime * 1000).toLocaleString()} | {article.source}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Latest news sidebar */}
      <div className="mt-4 lg:mt-0 lg:w-1/4 lg:order-last border p-4 rounded-lg bg-white dark:bg-gray-800 lg:overflow-y-auto lg:h-screen">
        <h2 className="text-xl font-bold mb-4">Latest</h2>
        <ul>
          {latestArticles.map(article => (
            <li key={article.id} className="mb-4">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline block"
              >
                <p className="text-sm font-semibold">{article.headline}</p>
                <p className="text-xs text-gray-500">
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