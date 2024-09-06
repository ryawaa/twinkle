import { useState, useEffect, useCallback } from 'react'
import debounce from 'lodash.debounce'

const SearchBar = ({ onSelectSymbol }: { onSelectSymbol: (symbol: string) => void }) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<{ symbol: string, description: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const fetchSuggestions = async (query: string) => {
    setLoading(true)
    setNotFound(false)
    try {
      const res = await fetch(`/api/search?query=${query}`)
      const data = await res.json()
      
      if (data.result && data.result.length > 0) {
        setSuggestions(data.result)
      } else {
        setNotFound(true)
        setSuggestions([])
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error)
      setNotFound(true)
      setSuggestions([])
    } finally {
      setLoading(false)
    }
  }

  const debouncedFetchSuggestions = useCallback(debounce((query: string) => {
    fetchSuggestions(query)
  }, 300), [])

  useEffect(() => {
    if (query.length > 1) {
      debouncedFetchSuggestions(query)
    } else {
      setSuggestions([])
      setNotFound(false)
    }
  }, [query, debouncedFetchSuggestions])

  const handleSelect = (symbol: string) => {
    setQuery('')
    setSuggestions([])
    onSelectSymbol(symbol)
  }

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search stocks..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 w-full"
      />
      {loading && (
        <div className="absolute border bg-white p-2 w-full mt-1 text-center">
          Loading...
        </div>
      )}
      {!loading && notFound && (
        <div className="absolute border bg-white p-2 w-full mt-1 text-center text-red-500">
          No results found
        </div>
      )}
      {suggestions.length > 0 && (
        <ul className="absolute border bg-white w-full mt-1">
          {suggestions.map((item) => (
            <li
              key={item.symbol}
              onClick={() => handleSelect(item.symbol)}
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              {item.description} ({item.symbol})
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchBar