import {
    LineChart,
    Line,
    CartesianGrid,
    ResponsiveContainer,
    defs,
    linearGradient,
    stop,
    YAxis,
  } from 'recharts';
  import { formatPriceData } from '../utils/formatPriceData';
  
  interface PriceGraphProps {
    data: { c: number | null; h: number | null; l: number | null; o: number | null; pc: number | null; t: number | null; }[];
  }
  
  const PriceGraph = ({ data }: PriceGraphProps) => {
    const formattedData = formatPriceData(data);
  
    const prices = formattedData.map((d) => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
  
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-overlay1)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-crust)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-overlay0)" />
          <YAxis
            type="number"
            domain={[minPrice - 1, maxPrice + 1]}
            hide
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="var(--color-text)"
            strokeWidth={2}
            dot={false}
            fill="url(#colorUv)"
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };
  
  export default PriceGraph;