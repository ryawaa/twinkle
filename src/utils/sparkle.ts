const SPARKLE_BASE_URL = process.env.NEXT_PUBLIC_SPARKLE_BASE_URL;

export const fetchQuote = async (symbol: string) => {
  const url = `${SPARKLE_BASE_URL}/quote?symbol=${symbol}`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Error fetching quote')
  }
  return res.json()
}

export const fetchSymbols = async (symbol: string) => {
    const url = `${SPARKLE_BASE_URL}/search?query=${symbol}`
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error('Error fetching quote')
    }
    return res.json()
  }