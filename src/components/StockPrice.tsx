import React, { useState, useEffect } from 'react';
import PriceGraph from './PriceGraph';
import StockPriceGraph from './StockPriceGraph';

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
}

const StockPrice = ({ symbol }: StockPriceProps) => {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [stockDescription, setStockDescription] = useState<string>('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchStockPrice = async (selectedSymbol: string) => {
    setError('');
    setLoading(true);
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
    } finally {
      setLoading(false);
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

  const PriceBadge = ({ label, value, isPositive = true }: { label: string, value: number | string, isPositive?: boolean }) => (
    <span className={`inline-block px-2 py-1 text-xs font-medium ${isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} rounded-md`}>
      {label} {value}
    </span>
  );

  const Skeleton = ({ width, height }: { width: string, height: string }) => (
    <div className={`bg-gray-300 dark:bg-gray-700 rounded-md`} style={{ width, height }}></div>
  );

  return (
    <div className="relative bg-surface0 dark:bg-surface0 p-6 rounded-t-lg shadow-md">
      <div className="absolute inset-0 opacity-20">
        <StockPriceGraph symbol={symbol} />
      </div>
      {symbol && (
        <div className="relative z-10">
          <div className="flex justify-between items-center">
            {loading ? (
              <Skeleton width="150px" height="2rem" />
            ) : (
              <h1 className="text-3xl font-bold text-text dark:text-text">{symbol}</h1>
            )}
            {loading ? (
              <div className="flex space-x-2 my-4">
                <Skeleton width="100px" height="2rem" />
                <Skeleton width="100px" height="2rem" />
              </div>
            ) : stockData ? (
              <div className="flex space-x-2">
                <PriceBadge label="Change:" value={stockData.d} isPositive={stockData.d >= 0} />
                <PriceBadge label="Percent Change:" value={`${stockData.dp}%`} isPositive={stockData.dp >= 0} />
              </div>
            ) : null}
          </div>
          {loading ? (
            <Skeleton width="100%" height="1.5rem" className="my-4" />
          ) : stockDescription && (
            <p className="text-lg mb-4 text-text dark:text-subtext1">{stockDescription}</p>
          )}
          {loading ? (
            <div className="grid grid-cols-4 gap-4 mt-4">
              <Skeleton width="100%" height="100px" />
              <Skeleton width="100%" height="100px" />
              <Skeleton width="100%" height="100px" />
              <Skeleton width="100%" height="100px" />
            </div>
          ) : stockData && (
            <div className="mt-4">
              <div className="text-5xl font-bold mb-2 text-subtext0 dark:text-subtext0">${stockData.c}</div>
              <div className="grid grid-cols-4 gap-4 mt-4">
                <div className="bg-overlay0 dark:bg-overlay0 p-4 rounded-lg shadow-md">
                  <p className="text-sm font-semibold text-text dark:text-subtext1">High</p>
                  <p className="text-xl text-text dark:text-text">${stockData.h}</p>
                </div>
                <div className="bg-overlay0 dark:bg-overlay0 p-4 rounded-lg shadow-md">
                  <p className="text-sm font-semibold text-text dark:text-subtext1">Low</p>
                  <p className="text-xl text-text dark:text-text">${stockData.l}</p>
                </div>
                <div className="bg-overlay0 dark:bg-overlay0 p-4 rounded-lg shadow-md">
                  <p className="text-sm font-semibold text-text dark:text-subtext1">Open</p>
                  <p className="text-xl text-text dark:text-text">${stockData.o}</p>
                </div>
                <div className="bg-overlay0 dark:bg-overlay0 p-4 rounded-lg shadow-md">
                  <p className="text-sm font-semibold text-text dark:text-subtext1">Previous Close</p>
                  <p className="text-xl text-text dark:text-text">${stockData.pc}</p>
                </div>
              </div>
            </div>
          )}
          {error && (
            <div className="mt-4 p-4 bg-red-100 dark:bg-red-700 text-red-800 dark:text-red-100 rounded-lg">
              <p>{error}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StockPrice;