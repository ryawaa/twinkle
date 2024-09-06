import { useState, useEffect } from 'react';
import Ticker from './Ticker';

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

interface StockDescription {
  description: string;
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
    <div className="">
      {symbol && (
        <div>
          <h2 className="text-xl font-bold"></h2>
          <h1 className="text-2xl font-bold mt-4">{symbol}</h1>
          
          {stockDescription && <p className="text-lg mb-4">{stockDescription}</p>}
          
          {stockData !== null && (
            <div className="mt-2">
              <p>Current Price: ${stockData.c}</p>
              <p>Change: ${stockData.d}</p>
              <p>Percent Change: {stockData.dp}%</p>
              <p>High Price of the Day: ${stockData.h}</p>
              <p>Low Price of the Day: ${stockData.l}</p>
              <p>Open Price of the Day: ${stockData.o}</p>
              <p>Previous Close Price: ${stockData.pc}</p>
            </div>
          )}
          {error && (
            <div className="mt-2 text-red-500">
              <p>{error}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StockPrice;