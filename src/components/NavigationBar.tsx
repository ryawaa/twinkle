import { useState, useEffect } from 'react'
import SearchBar from './SearchBar'
import Link from 'next/link'
import ThemeSwitcher from './ThemeSwitcher'

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
    <nav className="bg-base text-text">
      <div className="container mx-auto max-w-8xl flex items-center justify-between py-4 px-4 lg:px-8">
        <Link className="text-lg font-bold" href="/">TWL
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
            X
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