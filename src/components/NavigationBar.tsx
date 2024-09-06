import { useState } from 'react';
import SearchBar from './SearchBar';
import Link from 'next/link';
import ThemeSwitcher from './ThemeSwitcher';
import { IoSparkles } from 'react-icons/io5';

interface NavigationBarProps {
  onSelectSymbol: (symbol: string) => void;
}

const NavigationBar = ({ onSelectSymbol }: NavigationBarProps) => {
  const [currency, setCurrency] = useState('USD');
  const [watchlistView, setWatchlistView] = useState('priceChange');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(event.target.value);
  };

  const handleWatchlistViewChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setWatchlistView(event.target.value);
  };

  const resetSymbol = () => {
    onSelectSymbol('');
  };

  return (
    <nav className="w-full bg-crust transition-all text-text border-b-2 border-surface0 px-4">
      <div className="container mx-auto max-w-7xl w-full flex items-center justify-between py-1">
        <div onClick={resetSymbol} className="cursor-pointer text-lg font-bold flex flex-row align-middle items-center gap-2">
          <IoSparkles />
          <span className="md:block hidden">twinkle</span>
        </div>
        <div className="flex-grow max-w-md mx-auto lg:max-w-lg w-full">
          <SearchBar onSelectSymbol={onSelectSymbol} />
        </div>
        <div className="relative flex items-center space-x-4">
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;