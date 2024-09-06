const SPARKLE_BASE_URL = process.env.NEXT_PUBLIC_SPARKLE_BASE_URL;

/**
 * Handles the API response. Throws an error if the response is not ok.
 * @param res - The API response
 * @returns The parsed JSON response if the response is ok.
 * @throws An error with a message from the response or a generic error message.
 */
const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'An error occurred');
  }
  return res.json();
};

/**
 * Fetches quote data for a given symbol.
 * @param symbol - The stock symbol to fetch the quote for.
 * @returns The quote data.
 */
export const fetchQuote = async (symbol: string) => {
  const url = `${SPARKLE_BASE_URL}/api/v1/quote?symbol=${symbol}`;
  const res = await fetch(url);
  return handleResponse(res);
};

/**
 * Fetches symbols matching the provided query.
 * @param symbol - The query to search for symbols.
 * @returns An object containing an array of symbols and the total count.
 */
export const fetchSymbols = async (query: string) => {
  const url = `${SPARKLE_BASE_URL}/api/v1/search?query=${query}`;
  const res = await fetch(url);
  const data = await handleResponse(res);
  return {
    symbols: data.result,
    totalCount: data.totalCount,
  };
};

/**
 * Starts the WebSocket connection by hitting the start endpoint.
 * @returns The response data confirming the WebSocket is running.
 */
export const startWebSocket = async () => {
  const url = `${SPARKLE_BASE_URL}/ws/start-websocket`;
  const res = await fetch(url);
  return handleResponse(res);
};

/**
 * Fetches market news.
 * @returns The market news data.
 */
export const fetchNews = async () => {
  const url = `${SPARKLE_BASE_URL}/api/v1/marketnews`;
  const res = await fetch(url);
  return handleResponse(res);
};

/**
 * Fetches the profile data for a given symbol.
 * @param symbol - The stock symbol to fetch the profile for.
 * @returns The profile data.
 */
export const fetchProfile = async (symbol: string) => {
  const url = `${SPARKLE_BASE_URL}/api/v1/profile?symbol=${symbol}`;
  const res = await fetch(url);
  return handleResponse(res);
};

/**
 * Fetches peers for a given symbol.
 * @param symbol - The stock symbol to fetch peers for.
 * @returns The peers data.
 */
export const fetchPeers = async (symbol: string) => {
  const url = `${SPARKLE_BASE_URL}/api/v1/peers?symbol=${symbol}`;
  const res = await fetch(url);
  return handleResponse(res);
};

/**
 * Fetches recommendation trends for a given symbol.
 * @param symbol - The stock symbol to fetch recommendation trends for.
 * @returns The recommendation trends data.
 */
export const fetchRecommendationTrends = async (symbol: string) => {
  const url = `${SPARKLE_BASE_URL}/api/v1/recommendation-trends?symbol=${symbol}`;
  const res = await fetch(url);
  return handleResponse(res);
};

/**
 * Fetches basic financials for a given symbol.
 * @param symbol - The stock symbol to fetch basic financials for.
 * @returns The basic financials data.
 */
export const fetchBasicFinancials = async (symbol: string) => {
  const url = `${SPARKLE_BASE_URL}/api/v1/basic-financials?symbol=${symbol}`;
  const res = await fetch(url);
  return handleResponse(res);
};

/**
 * Fetches company news for a given symbol.
 * @param symbol - The stock symbol to fetch company news for.
 * @returns The company news data.
 */
export const fetchCompanyNews = async (symbol: string) => {
  const url = `${SPARKLE_BASE_URL}/api/v1/company-news?symbol=${symbol}`;
  const res = await fetch(url);
  return handleResponse(res);
};