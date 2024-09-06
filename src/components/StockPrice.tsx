import { useState } from 'react'

const StockPrice = () => {
  const [symbol, setSymbol] = useState('')
  const [price, setPrice] = useState<number | null>(null)
  const [error, setError] = useState('')

  const fetchStockPrice = async () => {
    setError('')
    try {
      const res = await fetch(`/api/quote?symbol=${symbol}`)
      const data = await res.json()
      if (data.error) {
        setError(data.error)
      } else {
        setPrice(data.c)
      }
    } catch (err) {
      setError('Failed to fetch stock price')
    }
  }

  return (
    <div className="my-4">
      <input
        type="text"
        placeholder="Enter stock symbol"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        className="border p-2 mr-2"
      />
      <button
        onClick={fetchStockPrice}
        className="bg-blue-500 text-white p-2"
      >
        Get Price
      </button>
      {price !== null && (
        <div className="mt-4">
          <p>Current Price: ${price}</p>
        </div>
      )}
      {error && (
        <div className="mt-4 text-red-500">
          <p>{error}</p>
      </div>
      )}
    </div>
  )
}

export default StockPrice