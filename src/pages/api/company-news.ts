import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchCompanyNews } from '../../utils/sparkle';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { symbol } = req.query;

  if (!symbol || typeof symbol !== 'string') {
    res.status(400).json({ error: 'Invalid symbol' });
    return;
  }

  try {
    const data = await fetchCompanyNews(symbol);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}