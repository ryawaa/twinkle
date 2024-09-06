import { useState, useEffect } from 'react'
import Ticker from './Ticker'
import SearchBar from './SearchBar'

interface StockPriceProps {
  symbol: string
}

const StockPrice = ({ symbol }: StockPriceProps) => {
  const [price, setPrice] = useState<number | null>(null)
  const [error, setError] = useState('')

  const fetchStockPrice = async (selectedSymbol: string) => {
    setError('')
    try {
      const res = await fetch(`/api/quote?symbol=${selectedSymbol}`)
      const data = await res.json()
      if (data.error) {
        setError(data.error)
        setPrice(null)
      } else {
        setPrice(data.c)
      }
    } catch (err) {
      setError('Failed to fetch stock price')
      setPrice(null)
    }
  }

  useEffect(() => {
    let intervalId: NodeJS.Timeout
    if (symbol) {
      fetchStockPrice(symbol)
      intervalId = setInterval(() => fetchStockPrice(symbol), 300000) // 300000 ms = 5 minutes
    }
    return () => clearInterval(intervalId)
  }, [symbol])

  return (
    <div className="my-4">
      {symbol && (
        <div>
          <h2 className="text-2xl font-bold mt-4">Symbol: {symbol}</h2>
          {price !== null && (
            <div className="mt-2">
              <p>Current Price: ${price}</p>
            </div>
          )}
          {error && (
            <div className="mt-2 text-red-500">
              <p>{error}</p>
            </div>
          )}
          <Ticker symbol={symbol} />
        </div>
      )}
    </div>
  )
}

export default StockPrice