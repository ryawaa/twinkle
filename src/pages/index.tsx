import { useState } from 'react'
import NavigationBar from '../components/NavigationBar'
import StockPrice from '../components/StockPrice'
import Ticker from '@/components/Ticker'
import NewsColumn from '@/components/NewsColumn'

export default function Home() {
  const [symbol, setSymbol] = useState('')

  const handleSelectSymbol = (selectedSymbol: string) => {
    setSymbol(selectedSymbol)
  }

  return (
    <div>
      <NavigationBar onSelectSymbol={handleSelectSymbol} />
      <div className="container flex flex-row mx-auto gap-4 p-4">
      <div>
        <Ticker symbol={symbol} />
          <StockPrice symbol={symbol} />
      <NewsColumn />
      </div>
      </div>
    </div>
  )
}