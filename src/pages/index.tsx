import Header from '../components/Header'
import StockPrice from '../components/StockPrice'

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <Header />
      <StockPrice />
    </div>
  )
}