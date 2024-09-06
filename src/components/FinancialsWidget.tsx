import { useState, useEffect, useCallback } from 'react';

// Props interface for the FinancialsWidget component
interface FinancialsWidgetProps {
  symbol: string;
}

// Interface for a formatted financial metric
interface FinancialMetric {
  name: string;
  value: string | number;
}

// Interface for the financial data fetched from the API
interface FinancialData {
  metric: Record<string, number | string>;
  series: {
    annual: Record<string, { period: string; v: number }[]>;
  };
}

// Component to display a loading skeleton while data is being fetched
const SkeletonLoader = () => (
  <div className="hidden md:block p-6 bg-surface0 dark:bg-surface0 rounded-lg shadow-md mt-4 animate-pulse">
    <h2 className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></h2>
    <div className="flex flex-wrap gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="bg-gray-300 dark:bg-gray-700 p-4 rounded-lg flex-1 min-w-[200px] h-16"></div>
      ))}
    </div>
  </div>
);

// Main component to display financial data for a given stock symbol
const FinancialsWidget = ({ symbol }: FinancialsWidgetProps) => {
  // State to hold the fetched financial data
  const [financialData, setFinancialData] = useState<FinancialData | null>(null);
  // State to hold the formatted financial data
  const [formattedData, setFormattedData] = useState<FinancialMetric[]>([]);
  // State to manage the loading state
  const [loading, setLoading] = useState(true);
  // State to handle any errors that might occur during the fetch
  const [error, setError] = useState<string | null>(null);

  // Function to format the fetched financial data into a readable format
  const formatData = useCallback((data: FinancialData) => {
    const metrics: FinancialMetric[] = [];
    for (const key in data.metric) {
      if (data.metric.hasOwnProperty(key)) {
        metrics.push({
          name: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
          value: data.metric[key],
        });
      }
    }
    setFormattedData(metrics);
  }, []);

  // Function to fetch the financial data from the API
  const fetchFinancialData = useCallback(async () => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      // Fetch data from the API using the provided symbol
      const res = await fetch(`/api/basic-financials?symbol=${symbol}`);
      const data = await res.json();
      if (res.ok) {
        setFinancialData(data); // Set the fetched data in state
        formatData(data); // Format and set the data in formattedData state
      } else {
        setError(data.error || 'Failed to fetch data');
      }
    } catch (err) {
      setError('Failed to fetch data'); // Handle any errors during fetch
    } finally {
      setLoading(false); // Set loading to false after the fetch operation is complete
    }
  }, [symbol, formatData]);

  // Effect to fetch financial data when the component mounts or when the symbol changes
  useEffect(() => {
    if (symbol) {
      fetchFinancialData(); // Fetch financial data when the symbol is available
    }
  }, [symbol, fetchFinancialData]);

  // If loading, display the SkeletonLoader component
  if (loading) {
    return <SkeletonLoader />;
  }

  // If an error occurred, display the error message
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  // If no financial data is available, display a relevant message
  if (!financialData) {
    return <p>No financial data available.</p>;
  }

  // Render the formatted financial data
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