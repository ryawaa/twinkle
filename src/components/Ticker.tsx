import { useEffect, useState } from 'react';
import { fetchQuote } from '../utils/sparkle';
import { tradeConditions } from '../utils/tradeConditions';

interface Trade {
  p: number; // Price
  s: string; // Symbol
  t: number; // Timestamp
  v: number; // Volume
  c?: number[]; // Conditions (DOES NOT EXIST FOR ALL TRADES)
}

interface TickerProps {
  symbol: string;
}

const Ticker = ({ symbol }: TickerProps) => {
  const [latestTrade, setLatestTrade] = useState<Trade | null>(null);
  const [bid, setBid] = useState<number | null>(null);
  const [ask, setAsk] = useState<number | null>(null);
  const [webSocketInitialized, setWebSocketInitialized] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch initial bid and ask prices
  useEffect(() => {
    const initializePrices = async () => {
      try {
        const quote = await fetchQuote(symbol);
        setBid(quote.b);
        setAsk(quote.a);
      } catch (error) {
        console.error('Failed to fetch initial bid/ask prices:', error);
      }
    };
    initializePrices();
  }, [symbol]);

  // Initialize WebSocket connection
  useEffect(() => {
    const initializeWebSocket = async () => {
      try {
        const response = await fetch('/api/ws/start');
        const data = await response.json();
        if (data.status === 'WebSocket server is running') {
          setWebSocketInitialized(true);
        }
      } catch (error) {
        console.error('Failed to initialize WebSocket:', error);
      }
    };
    initializeWebSocket();
  }, []);

  // Manage WebSocket for live trade updates
  useEffect(() => {
    if (!webSocketInitialized) return;

    const socket = new WebSocket(`${process.env.NEXT_PUBLIC_SPARKLE_BASE_URL!.replace('http', 'ws')}/ws/trades`);

    socket.onopen = () => {
      console.log('WebSocket connection established');
      socket.send(JSON.stringify({ type: 'subscribe', symbol }));
    };

    socket.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data.type === 'trade' && data.data.some((trade: Trade) => trade.s === symbol)) {
        const tradeForSymbol = data.data.find((trade: Trade) => trade.s === symbol);
        setLatestTrade(tradeForSymbol);
        setLoading(false);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: 'unsubscribe', symbol }));
      }
      socket.close();
    };
  }, [symbol, webSocketInitialized]);

  // Identify the trade type based on the latest trade price
  const identifyTradeType = (trade: Trade) => {
    if (bid !== null && ask !== null) {
      if (trade.p >= ask) {
        return 'Buy';
      } else if (trade.p <= bid) {
        return 'Sell';
      }
    }
    return 'Unknown';
  };

  // Get a string representation of the trade conditions
  const getTradeConditions = (trade: Trade) => {
    if (trade.c && trade.c.length > 0) {
      return trade.c.map(code => tradeConditions[code] || `Unknown Condition: ${code}`).join(', ');
    }
    return 'No conditions';
  };

  // Skeleton placeholder to show when loading
  const SkeletonPlaceholder = () => (
    <div className="flex flex-row space-x-4 text-xs p-2">
      <strong>LIVE: </strong>
      <div>Waiting for a trade to happen...</div>
    </div>
  );

  return (
    <div className="border-b dark:bg-overlay0 bg-overlay0 p-2 px-4 rounded-b-lg">
      {symbol && (
        loading ? (
          <SkeletonPlaceholder />
        ) : (
          latestTrade && (
            <div className="flex flex-row space-x-4 text-xs">
              <strong>LIVE ${latestTrade.s}</strong>
              <div>Traded {latestTrade.v} @ ${latestTrade.p.toFixed(2)} on {new Date(latestTrade.t).toLocaleTimeString()}</div>
              <div>{getTradeConditions(latestTrade)}</div>
            </div>
          )
        )
      )}
    </div>
  );
};

export default Ticker;