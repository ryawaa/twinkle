import { useState, useEffect } from 'react';

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

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-6">
      {symbol && (
        <div>
          <h1 className="text-3xl font-bold mb-2">{symbol}</h1>
          {stockDescription && <p className="text-lg mb-4 text-gray-600">{stockDescription}</p>}
          
          {stockData !== null && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md">
                <p className="text-xl font-semibold">Current Price:</p>
                <p className="text-2xl">${stockData.c}</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md">
                <p className="text-xl font-semibold">Change:</p>
                <p className="text-2xl">${stockData.d}</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md">
                <p className="text-xl font-semibold">Percent Change:</p>
                <p className="text-2xl">{stockData.dp}%</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md">
                <p className="text-xl font-semibold">High Price of the Day:</p>
                <p className="text-2xl">${stockData.h}</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md">
                <p className="text-xl font-semibold">Low Price of the Day:</p>
                <p className="text-2xl">${stockData.l}</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md">
                <p className="text-xl font-semibold">Open Price of the Day:</p>
                <p className="text-2xl">${stockData.o}</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md">
                <p className="text-xl font-semibold">Previous Close Price:</p>
                <p className="text-2xl">${stockData.pc}</p>
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