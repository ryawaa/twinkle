import { useState, useEffect } from 'react';

interface PeersWidgetProps {
  symbol: string;
}

/**
 * PeersWidget component fetches and displays peer companies for a given symbol.
 */
const PeersWidget = ({ symbol }: PeersWidgetProps) => {
  // State variables to manage peers data, loading state, and errors
  const [peers, setPeers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // useEffect hook to fetch peers whenever the symbol changes
  useEffect(() => {
    const fetchPeers = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`/api/peers?symbol=${symbol}`);
        const data = await res.json();
        if (res.ok) {
          setPeers(data);
        } else {
          setError(data.error || 'Failed to fetch data');
        }
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    if (symbol) {
      fetchPeers();
    }
  }, [symbol]);

  // If the data is still loading, show a loading message
  if (loading) {
    return <p>Loading...</p>;
  }

  // If there was an error fetching the data, show an error message
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  // Render the list of peers
  return (
    <div className="p-4 bg-surface0 dark:bg-surface0 rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-bold text-text dark:text-text mb-2">Peers for {symbol}</h2>
      <ul className="list-none">
        {peers.map((peer, index) => (
          <li
            key={index}
            className="inline-block bg-text dark:bg-crust text-white text-sm font-medium py-1 px-2 m-1 rounded-md"
          >
            {peer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PeersWidget;