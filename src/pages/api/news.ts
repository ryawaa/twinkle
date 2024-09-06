import type { NextApiRequest, NextApiResponse } from "next";
import { fetchNews } from "../../utils/sparkle";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    return;
  }

  try {
    const result = await fetchNews();
    res.status(200).json({ result: result });
  } catch (error) {
    res.status(500).json({ error: "Error fetching symbols" });
  }
}