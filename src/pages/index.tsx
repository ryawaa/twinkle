import { useState } from 'react'
import NavigationBar from '../components/NavigationBar'
import StockPrice from '../components/StockPrice'
import Ticker from '@/components/Ticker'
import NewsColumn from '@/components/NewsColumn'
import CompanyProfileCard from '@/components/CompanyProfileCard'

export default function Home() {
  const [symbol, setSymbol] = useState('')

  const handleSelectSymbol = (selectedSymbol: string) => {
    setSymbol(selectedSymbol)
  }

  return (
    <div>
      <NavigationBar onSelectSymbol={handleSelectSymbol} />
      <div className="container flex flex-row mx-auto max-w-7xl">
      <div>
        <Ticker symbol={symbol} />
        <CompanyProfileCard ticker={symbol} />
          <StockPrice symbol={symbol} />
      <NewsColumn />
      </div>
      </div>
    </div>
  )
}