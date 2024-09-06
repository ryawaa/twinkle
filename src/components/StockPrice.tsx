import { useState } from 'react'
import SearchBar from './SearchBar'

const StockPrice = () => {
  const [symbol, setSymbol] = useState('')
  const [price, setPrice] = useState<number | null>(null)
  const [error, setError] = useState('')

  const fetchStockPrice = async (selectedSymbol: string) => {
    setError('')
    try {
      const res = await fetch(`/api/quote?symbol=${selectedSymbol}`)
      const data = await res.json()
      if (data.error) {
        setError(data.error)
      } else {
        setPrice(data.c)
        setSymbol(selectedSymbol)
      }
    } catch (err) {
      setError('Failed to fetch stock price')
    }
  }

  return (
    <div className="my-4">
      <SearchBar onSelectSymbol={fetchStockPrice} />
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
        </div>
      )}
    </div>
  )
}

export default StockPrice