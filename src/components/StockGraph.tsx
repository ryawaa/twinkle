import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { generateMockHistoricalData } from '../utils/mockHistoricalData';

interface StockGraphProps {
  symbol: string;
}

const StockGraph = ({ symbol }: StockGraphProps) => {
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    if (symbol) {
      const data = generateMockHistoricalData(symbol);
      setHistoricalData(data);
    }
  }, [symbol]);

  if (historicalData.length === 0) {
    return <p>Loading data...</p>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-bold mb-4">Stock Trend for {symbol}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={historicalData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="close" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockGraph;