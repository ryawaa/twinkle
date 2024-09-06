import { LineChart, Line, CartesianGrid, Tooltip, ResponsiveContainer, defs, linearGradient, stop } from 'recharts';
import { generateMockHistoricalData } from '../utils/mockHistoricalData';

interface StockGraphProps {
  symbol: string;
}

const StockGraph = ({ symbol }: StockGraphProps) => {
  const data = generateMockHistoricalData(symbol);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-text)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--color-text)" stopOpacity={1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Line type="monotone" dataKey="close" stroke="var(--color-text)" strokeWidth={2} dot={false} fill="url(#fillGradient)" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockGraph;