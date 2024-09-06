import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Link from 'next/link';
import ThemeSwitcher from './ThemeSwitcher';
import { IoSparkles } from 'react-icons/io5';

// Props interface for the NavigationBar component
interface NavigationBarProps {
  onSelectSymbol: (symbol: string) => void;
}

// NavigationBar functional component
const NavigationBar: React.FC<NavigationBarProps> = ({ onSelectSymbol }) => {
  // State to manage the selected currency
  const [currency, setCurrency] = useState('USD');
  // State to manage the watchlist view option
  const [watchlistView, setWatchlistView] = useState('priceChange');
  // State to manage the dropdown open/close state
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Handle currency change event
  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(event.target.value);
  };

  // Handle watchlist view change event
  const handleWatchlistViewChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setWatchlistView(event.target.value);
  };

  // Function to reset the selected symbol
  const resetSymbol = () => {
    onSelectSymbol('');
  };

  return (
    <nav className="w-full bg-crust transition-all text-text border-b-2 border-surface0 px-4">
      <div className="container mx-auto max-w-7xl w-full flex items-center justify-between py-1">
        {/* Logo and title section */}
        <div onClick={resetSymbol} className="cursor-pointer text-lg font-bold flex flex-row align-middle items-center gap-2">
          <IoSparkles />
          <span className="md:block hidden">twinkle</span>
        </div>
        
        {/* SearchBar section */}
        <div className="flex-grow max-w-md mx-auto lg:max-w-lg w-full">
          <SearchBar onSelectSymbol={onSelectSymbol} />
        </div>
        
        {/* Theme switcher section */}
        <div className="relative flex items-center space-x-4">
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;