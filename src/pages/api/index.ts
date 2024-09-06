import type { NextApiRequest, NextApiResponse } from "next";
import { fetchNews, fetchPeers, fetchCompanyNews, fetchSymbols, fetchQuote, fetchBasicFinancials, fetchProfile, fetchRecommendationTrends } from "../../utils/sparkle";

type RouteHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

const routeHandlers: Record<string, RouteHandler> = {
  '/api/news': async (req, res) => {
    if (req.method !== "GET") {
      res.setHeader("Allow", ["GET"]);
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
      return;
    }

    try {
      const result = await fetchNews();
      res.status(200).json({ result });
    } catch (error) {
      res.status(500).json({ error: "Error fetching news" });
    }
  },

  '/api/peers': async (req, res) => {
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
  },

  '/api/company-news': async (req, res) => {
    const { symbol } = req.query;

    if (!symbol || typeof symbol !== 'string') {
      res.status(400).json({ error: 'Invalid symbol' });
      return;
    }

    try {
      const data = await fetchCompanyNews(symbol);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
    }
  },

  '/api/search': async (req, res) => {
    const { query } = req.query;
    if (!query || typeof query !== "string") {
      res.status(400).json({ error: "Invalid query parameter" });
      return;
    }

    try {
      const result = await fetchSymbols(query);
      res.status(200).json({ symbols: result.symbols, totalCount: result.totalCount });
    } catch (error) {
      res.status(500).json({ error: "Error fetching symbols" });
    }
  },

  '/api/quote': async (req, res) => {
    const { symbol } = req.query;
    if (!symbol || typeof symbol !== "string") {
      res.status(400).json({ error: "Invalid symbol" });
      return;
    }

    try {
      const quote = await fetchQuote(symbol);
      res.status(200).json(quote);
    } catch (error) {
      res.status(500).json({ error: "Error fetching quote" });
    }
  },

  '/api/basic-financials': async (req, res) => {
    const { symbol } = req.query;

    if (!symbol || typeof symbol !== 'string') {
      res.status(400).json({ error: 'Invalid symbol' });
      return;
    }

    try {
      const data = await fetchBasicFinancials(symbol);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
    }
  },

  '/api/profile': async (req, res) => {
    const { symbol } = req.query;
    if (!symbol || typeof symbol !== "string") {
      res.status(400).json({ error: "Invalid symbol" });
      return;
    }

    try {
      const profile = await fetchProfile(symbol);
      res.status(200).json(profile);
    } catch (error) {
      res.status(500).json({ error: "Error fetching profile" });
    }
  },

  '/api/recommendation-trends': async (req, res) => {
    const { symbol } = req.query;

    if (!symbol || typeof symbol !== 'string') {
      res.status(400).json({ error: 'Invalid symbol' });
      return;
    }

    try {
      const data = await fetchRecommendationTrends(symbol);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
    }
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const route = req.url?.split('?')[0] || '';
  if (route in routeHandlers) {
    return routeHandlers[route](req, res);
  }

  res.status(404).json({ error: 'Not found' });
};

export default handler;