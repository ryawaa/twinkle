import { useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import StockPrice from '../components/StockPrice';
import Ticker from '../components/Ticker';
import NewsColumn from '../components/NewsColumn';
import CompanyProfileCard from '../components/CompanyProfileCard';
import PeersWidget from '../components/PeersWidget';
import RecommendationTrendsWidget from '@/components/RecommendationTrends';
import FinancialsWidget from '@/components/FinancialsWidget';
import CompanyNews from './api/company-news';
import CompanyNewsWidget from '@/components/CompanyNewsWidget';

export default function Home() {
  const [symbol, setSymbol] = useState('');

  const handleSelectSymbol = (selectedSymbol: string) => {
    setSymbol(selectedSymbol);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <NavigationBar onSelectSymbol={handleSelectSymbol} />
      <div className="gap-8 flex-wrap lg:flex-nowrap flex-row flex max-w-7xl w-full p-4">
        {symbol ? (
          <>
            <div className="flex flex-col w-full">
              <StockPrice symbol={symbol} />
              <Ticker symbol={symbol} />
             <RecommendationTrendsWidget symbol={symbol} /> 
             <FinancialsWidget symbol={symbol} />
            </div>
            <div className="flex flex-col max-w-md">
              <CompanyProfileCard ticker={symbol} />
              <CompanyNewsWidget symbol={symbol} />
            </div>
          </>
         ) : (<NewsColumn />)}
        {/*  */}
      </div>
    </div>
  );
}