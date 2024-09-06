import type { NextApiRequest, NextApiResponse } from "next";
import { fetchSymbols } from "../../utils/sparkle";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req.query;
  if (!query || typeof query !== "string") {
    res.status(400).json({ error: "Invalid symbol" });
    return;
  }

  try {
    const result = await fetchSymbols(query);
    res.status(200).json({ result: result.symbols, totalCount: result.totalCount });
  } catch (error) {
    res.status(500).json({ error: "Error fetching symbols" });
  }
}