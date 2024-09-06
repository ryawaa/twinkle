import {
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
  YAxis,
  defs,
  linearGradient,
  stop,
} from 'recharts';
import { formatPriceData } from '../utils/formatPriceData';

// Define the interface for the component's props
interface PriceGraphProps {
  data: { c: number | null; h: number | null; l: number | null; o: number | null; pc: number | null; t: number | null; }[];
}

/**
* PriceGraph component renders a responsive line chart with provided price data.
* @param data - An array of price data objects.
*/
const PriceGraph = ({ data }: PriceGraphProps) => {
  // Format the input data using the custom formatPriceData function
  const formattedData = formatPriceData(data);

  // Extract prices from the formatted data to determine the min and max prices
  const prices = formattedData.map((d) => d.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  return (
      <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <defs>
                  {/* Defining gradient for the line fill */}
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-overlay1)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="var(--color-crust)" stopOpacity={0} />
                  </linearGradient>
              </defs>
              {/* Adding a cartesian grid */}
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-overlay0)" />
              {/* Y-axis configuration, hidden in this case */}
              <YAxis
                  type="number"
                  domain={[minPrice - 1, maxPrice + 1]}
                  hide
              />
              {/* Line chart configuration */}
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