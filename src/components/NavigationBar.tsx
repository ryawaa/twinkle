import { useState, useEffect } from 'react'
import SearchBar from './SearchBar'
import Link from 'next/link'
import ThemeSwitcher from './ThemeSwitcher'
import { IoSparkles } from 'react-icons/io5'
import { FaHamburger } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'

interface NavigationBarProps {
  onSelectSymbol: (symbol: string) => void
}

const NavigationBar = ({ onSelectSymbol }: NavigationBarProps) => {
  const [currency, setCurrency] = useState('USD')
  const [watchlistView, setWatchlistView] = useState('priceChange')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(event.target.value)
  }

  const handleWatchlistViewChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setWatchlistView(event.target.value)
  }

  return (
    <nav className="bg-crust transition-all text-text border-b-2 border-surface0 px-4">
      <div className="container mx-auto max-w-7xl flex items-center justify-between py-1">
        <Link className="text-lg font-bold flex flex-row align-middle items-center gap-2" href="/"><IoSparkles /> <span className="md:block hidden">twinkle</span>
        </Link>
        <div className="flex-grow max-w-md mx-auto lg:max-w-lg w-full">
          <SearchBar onSelectSymbol={onSelectSymbol} />
        </div>
        <div className="relative flex items-center space-x-4">
          <ThemeSwitcher />
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-mantle px-4 py-2 rounded focus:outline-none focus:bg-overlay0"
          >
            <GiHamburgerMenu />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-surface0 rounded-md shadow-lg z-20">
              <div className="py-2 px-4">
                <label
                  htmlFor="currency"
                  className="block text-sm font-medium text-text"
                >
                  Currency:
                </label>
                <select
                  id="currency"
                  value={currency}
                  onChange={handleCurrencyChange}
                  className="mt-1 block w-full p-1 rounded border border-overlay2"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="JPY">JPY</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
              <div className="py-2 px-4">
                <label
                  htmlFor="watchlistView"
                  className="block text-sm font-medium text-text"
                >
                  View:
                </label>
                <select
                  id="watchlistView"
                  value={watchlistView}
                  onChange={handleWatchlistViewChange}
                  className="mt-1 block w-full p-1 rounded border border-overlay2"
                >
                  <option value="priceChange">Price Change</option>
                  <option value="percentageChange">Percentage Change</option>
                  <option value="marketCap">Market Cap</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavigationBar