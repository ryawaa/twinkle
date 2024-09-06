import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchPeers } from '../../utils/sparkle';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { symbol } = req.query;

  if (!symbol || typeof symbol !== 'string') {
    res.status(400).json({ error: 'Invalid symbol' });
    return;
  }

  try {
    const data = await fetchPeers(symbol);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching peers" });
  }
}