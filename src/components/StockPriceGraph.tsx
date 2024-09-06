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

const StockPriceGraph = ({ symbol }: StockPriceProps) => {
  const [stockData, setStockData] = useState<StockData[] | null>(null);
  const [stockDescription, setStockDescription] = useState<string>('');
  const [error, setError] = useState('');

  const fetchStockPrice = async (selectedSymbol: string) => {
    setError('');
    try {
      const res = await fetch(`/api/quote?symbol=${selectedSymbol}`);
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setStockData(null);
      } else {
        setStockData(data);
      }
    } catch (err) {
      setError('Failed to fetch stock price');
      setStockData(null);
    }
  };

  const fetchStockDescription = async (selectedSymbol: string) => {
    setError('');
    try {
      const res = await fetch(`/api/search?query=${selectedSymbol}`);
      const data = await res.json();
      if (data.result && data.result.length > 0) {
        setStockDescription(data.result[0].description); // Assume the first result matches
      } else {
        setError('Description not found');
        setStockDescription('');
      }
    } catch (err) {
      setError('Failed to fetch stock description');
      setStockDescription('');
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (symbol) {
      fetchStockPrice(symbol);
      fetchStockDescription(symbol);
      intervalId = setInterval(() => fetchStockPrice(symbol), 300000); // 300000 ms = 5 minutes
    }
    return () => clearInterval(intervalId);
  }, [symbol]);

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
        isPositive
          ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-800'
      } rounded-md`}
    >
      {label} {value}
    </span>
  );

  return (
    <div className="relative bg-surface0 dark:bg-surface0 p-6 rounded-t-lg shadow-md overflow-hidden h-full">
      <div className="absolute inset-0 z-10">
        {stockData && <PriceGraph data={stockData} />}
      </div>
    </div>
  );
};

export default StockPriceGraph;