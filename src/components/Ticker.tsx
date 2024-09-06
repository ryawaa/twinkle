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

const Ticker = ({ symbol }: { symbol: string }) => {
  const [latestTrade, setLatestTrade] = useState<Trade | null>(null);
  const [bid, setBid] = useState<number | null>(null);
  const [ask, setAsk] = useState<number | null>(null);
  const [webSocketInitialized, setWebSocketInitialized] = useState(false);

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

  useEffect(() => {
    if (!webSocketInitialized) return;

    const socket = new WebSocket(`${process.env.NEXT_PUBLIC_SPARKLE_BASE_URL!.replace('http', 'ws')}/ws/trades`);

    socket.onopen = () => {
      console.log('WebSocket connection established');
      socket.send(JSON.stringify({ type: 'subscribe', symbol }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'trade') {
        setLatestTrade(data.data[0]);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      socket.send(JSON.stringify({ type: 'unsubscribe', symbol }));
      socket.close();
    };
  }, [symbol, webSocketInitialized]);

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

  const getTradeConditions = (trade: Trade) => {
    if (trade.c && trade.c.length > 0) {
      return trade.c.map(code => tradeConditions[code] || `Unknown Condition: ${code}`).join(', ');
    }
    return 'No conditions';
  };

  return (
    <div className="">
      {symbol && latestTrade && (
        <div className="border-b dark:bg-overlay0 bg-overlay0 p-2 px-4 rounded-lg">
          <div className="flex flex-row space-x-4 ed-lg text-xs">
            <strong>LIVE ${latestTrade.s}</strong>
            <div>Traded {latestTrade.v} @ ${latestTrade.p} on {new Date(latestTrade.t).toLocaleTimeString()}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ticker;