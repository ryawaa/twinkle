import { useState } from 'react'
import NavigationBar from '../components/NavigationBar'
import StockPrice from '../components/StockPrice'

export default function Home() {
  const [symbol, setSymbol] = useState('')

  const handleSelectSymbol = (selectedSymbol: string) => {
    setSymbol(selectedSymbol)
  }

  return (
    <div>
      <NavigationBar onSelectSymbol={handleSelectSymbol} />
      <div className="container mx-auto p-4">
        <StockPrice symbol={symbol} />
      </div>
    </div>
  )
}