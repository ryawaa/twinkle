import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { generateMockHistoricalData } from '../utils/mockHistoricalData';

interface StockGraphProps {
  symbol: string;
}

/**
 * StockGraph component renders a line chart showing the historical trend for a given stock symbol.
 * @param symbol - The stock symbol to display the trend for.
 */
const StockGraph = ({ symbol }: StockGraphProps) => {
  const [historicalData, setHistoricalData] = useState([]);

  // useEffect hook to fetch and set the mock historical data whenever the symbol changes
  useEffect(() => {
    if (symbol) {
      const data = generateMockHistoricalData(symbol);
      setHistoricalData(data);
    }
  }, [symbol]);

  // Show a loading message if data is not yet available
  if (historicalData.length === 0) {
    return <p>Loading data...</p>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-bold mb-4">Stock Trend for {symbol}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={historicalData}>
          {/* Adds a Cartesian grid to the chart for better readability */}
          <CartesianGrid strokeDasharray="3 3" />
          {/* XAxis displays dates from the data */}
          <XAxis dataKey="date" />
          {/* YAxis displays the stock prices */}
          <YAxis />
          {/* Tooltip shows detailed information when hovering over the data points */}
          <Tooltip />
          {/* Line component to draw the line chart with dataKey `close` */}
          <Line type="monotone" dataKey="close" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockGraph;