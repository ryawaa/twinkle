const SPARKLE_BASE_URL = process.env.NEXT_PUBLIC_SPARKLE_BASE_URL;

const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'An error occurred');
  }
  return res.json();
};

export const fetchQuote = async (symbol: string) => {
  const url = `${SPARKLE_BASE_URL}/api/v1/quote?symbol=${symbol}`;
  const res = await fetch(url);
  return handleResponse(res);
};

export const fetchSymbols = async (symbol: string) => {
  const url = `${SPARKLE_BASE_URL}/api/v1/search?query=${symbol}`;
  const res = await fetch(url);
  const data = await handleResponse(res);
  return {
    symbols: data.result,
    totalCount: data.totalCount,
  };
};

export const startWebSocket = async () => {
  const url = `${SPARKLE_BASE_URL}/ws/start-websocket`;
  const res = await fetch(url);
  return handleResponse(res);
};

export const fetchNews = async () => {
  const url = `${SPARKLE_BASE_URL}/api/v1/marketnews`;
  const res = await fetch(url);
  return handleResponse(res);
};

export const fetchProfile = async (symbol: string) => {
  const url = `${SPARKLE_BASE_URL}/api/v1/profile?symbol=${symbol}`;
  const res = await fetch(url);
  return handleResponse(res);
};

export const fetchPeers = async (symbol: string) => {
  const url = `${SPARKLE_BASE_URL}/api/v1/peers?symbol=${symbol}`;
  const res = await fetch(url);
  return handleResponse(res);
};

export const fetchRecommendationTrends = async (symbol: string) => {
  const url = `${SPARKLE_BASE_URL}/api/v1/recommendation-trends?symbol=${symbol}`;
  const res = await fetch(url);
  return handleResponse(res);
};

export const fetchBasicFinancials = async (symbol: string) => {
  const url = `${SPARKLE_BASE_URL}/api/v1/basic-financials?symbol=${symbol}`;
  const res = await fetch(url);
  return handleResponse(res);
}

export const fetchCompanyNews = async (symbol: string) => {
  const url = `${SPARKLE_BASE_URL}/api/v1/company-news?symbol=${symbol}`;
  const res = await fetch(url);
  return handleResponse(res);
}

