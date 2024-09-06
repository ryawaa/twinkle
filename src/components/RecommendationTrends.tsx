import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface RecommendationTrendsWidgetProps {
  symbol: string;
}

interface RecommendationTrend {
  period: string;
  strongBuy: number;
  buy: number;
  hold: number;
  sell: number;
  strongSell: number;
}

const RecommendationTrendsWidget = ({ symbol }: RecommendationTrendsWidgetProps) => {
  const [recommendationTrends, setRecommendationTrends] = useState<RecommendationTrend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecommendationTrends = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`/api/recommendation-trends?symbol=${symbol}`);
        const data = await res.json();
        if (res.ok) {
          setRecommendationTrends(data);
        } else {
          setError(data.error || 'Failed to fetch data');
        }
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    if (symbol) {
      fetchRecommendationTrends();
    }
  }, [symbol]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 bg-surface0 dark:bg-surface0 rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-bold text-text dark:text-text mb-4">Recommendation Trends for {symbol}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={recommendationTrends} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="colorStrongBuy" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#32a852" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#32a852" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorBuy" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7dc968" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#7dc968" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorHold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#d3a637" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#d3a637" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSell" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#e57373" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#e57373" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorStrongSell" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#c62828" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#c62828" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-overlay0)" />
          <XAxis dataKey="period" tick={{ fill: "var(--color-text)" }} />
          <YAxis tick={{ fill: "var(--color-text)" }} />
          <Tooltip contentStyle={{ backgroundColor: "var(--color-surface0)", border: "none" }} />
          <Legend wrapperStyle={{ color: "var(--color-text)" }}/>
          <Bar dataKey="strongBuy" fill="url(#colorStrongBuy)" />
          <Bar dataKey="buy" fill="url(#colorBuy)" />
          <Bar dataKey="hold" fill="url(#colorHold)" />
          <Bar dataKey="sell" fill="url(#colorSell)" />
          <Bar dataKey="strongSell" fill="url(#colorStrongSell)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RecommendationTrendsWidget;