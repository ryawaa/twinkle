import { useState, useEffect } from 'react';

interface FinancialsWidgetProps {
  symbol: string;
}

interface FinancialMetric {
  name: string;
  value: string | number;
}

interface FinancialData {
  metric: Record<string, number | string>;
  series: {
    annual: Record<string, { period: string; v: number }[]>;
  };
}

const FinancialsWidget = ({ symbol }: FinancialsWidgetProps) => {
  const [financialData, setFinancialData] = useState<FinancialData | null>(null);
  const [formattedData, setFormattedData] = useState<FinancialMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFinancialData = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`/api/basic-financials?symbol=${symbol}`);
        const data = await res.json();
        if (res.ok) {
          setFinancialData(data);
          formatData(data);
        } else {
          setError(data.error || 'Failed to fetch data');
        }
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    const formatData = (data: FinancialData) => {
      const metrics = [];
      for (const key in data.metric) {
        metrics.push({
          name: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
          value: data.metric[key],
        });
      }
      setFormattedData(metrics);
    };

    if (symbol) {
      fetchFinancialData();
    }
  }, [symbol]);

  const SkeletonLoader = () => (
    <div className="hidden md:block  p-6 bg-surface0 dark:bg-surface0 rounded-lg shadow-md mt-4 animate-pulse">
      <h2 className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></h2>
      <div className="flex flex-wrap gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-gray-300 dark:bg-gray-700 p-4 rounded-lg flex-1 min-w-[200px] h-16"></div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!financialData) {
    return <p>No financial data available.</p>;
  }

  return (
    <div className="hidden md:block p-6 bg-surface0 dark:bg-surface0 rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-bold text-text dark:text-text mb-4">Basic Financials for {symbol}</h2>
      <div className="flex flex-wrap gap-4">
        {formattedData.map((data, index) => (
          <div key={index} className="bg-overlay0 dark:bg-mantle p-4 rounded-lg flex-1 min-w-[200px]">
            <p className="text-sm font-semibold text-subtext0 dark:text-subtext1">{data.name}</p>
            <p className="text-lg text-text dark:text-text">{data.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancialsWidget;