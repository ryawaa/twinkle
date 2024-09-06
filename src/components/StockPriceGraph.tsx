import { useState, useEffect } from 'react';
import PriceGraph from './PriceGraph';

interface StockPriceProps {
  symbol: string;
}

interface StockData {
  c: number; // Current price
  d: number; // Change
  dp: number; // Percent change
  h: number; // High price of the day
  l: number; // Low price of the day
  o: number; // Open price of the day
  pc: number; // Previous close price
  t: number; // Timestamp
}

/**
 * StockPriceGraph component fetches and displays the historical stock price trend for a given symbol.
 * @param symbol - The stock symbol to display the trend for.
 */
const StockPriceGraph = ({ symbol }: StockPriceProps) => {
  const [stockData, setStockData] = useState<StockData[] | null>(null);
  const [stockDescription, setStockDescription] = useState<string>('');
  const [error, setError] = useState('');

  // Function to fetch stock price data
  const fetchStockPrice = async (selectedSymbol: string) => {
    setError('');
    try {
      const res = await fetch(`/api/quote?symbol=${selectedSymbol}`);
      const data = await res.json();
      if (res.ok) {
        setStockData(data);
      } else {
        setError(data.error || 'Failed to fetch stock price');
        setStockData(null);
      }
    } catch (err) {
      setError('Failed to fetch stock price');
      setStockData(null);
    }
  };

  // Function to fetch stock description
  const fetchStockDescription = async (selectedSymbol: string) => {
    setError('');
    try {
      const res = await fetch(`/api/search?query=${selectedSymbol}`);
      const data = await res.json();
      if (res.ok && data.result && data.result.length > 0) {
        setStockDescription(data.result[0].description || 'No description available');
      } else {
        setError('Description not found');
        setStockDescription('');
      }
    } catch (err) {
      setError('Failed to fetch stock description');
      setStockDescription('');
    }
  };

  // Effect hook to fetch data and set an interval for updates
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (symbol) {
      fetchStockPrice(symbol);
      fetchStockDescription(symbol);
      intervalId = setInterval(() => fetchStockPrice(symbol), 300000); // 300000 ms = 5 minutes
    }
    return () => clearInterval(intervalId);
  }, [symbol]);

  /**
   * PriceBadge component renders the label and value with conditional styling.
   * @param label - The label for the badge.
   * @param value - The value to display.
   * @param isPositive - Boolean indicating if the value is positive or negative.
   */
  const PriceBadge = ({
    label,
    value,
    isPositive = true,
  }: {
    label: string;
    value: number | string;
    isPositive?: boolean;
  }) => (
    <span
      className={`inline-block px-2 py-1 text-xs font-medium ${
        isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      } rounded-md`}
    >
      {label} {value}
    </span>
  );

  return (
    <div className="relative bg-surface0 dark:bg-surface0 p-6 rounded-t-lg shadow-md overflow-hidden h-full">
      {error && (
        <div className="p-4 bg-red-100 dark:bg-red-700 text-red-800 dark:text-red-100 rounded-lg">
          <p>{error}</p>
        </div>
      )}
      <div className="absolute inset-0 z-10">
        {stockData && <PriceGraph data={stockData} />}
      </div>
    </div>
  );
};

export default StockPriceGraph;