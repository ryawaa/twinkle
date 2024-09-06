import { useState, useEffect, useCallback, useRef } from "react";
import debounce from "lodash.debounce";
import { FaSearch, FaTimes } from "react-icons/fa";

interface SearchBarProps {
  onSelectSymbol: (symbol: string) => void;
}

const SearchBar = ({ onSelectSymbol }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [selectedQuery, setSelectedQuery] = useState("");
  const [suggestions, setSuggestions] = useState<{ symbol: string; description: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const fetchSuggestions = async (query: string) => {
    setLoading(true);
    setNotFound(false);
    try {
      const res = await fetch(`/api/search?query=${query}`);
      const data = await res.json();
      if (data.result && data.result.length > 0) {
        setSuggestions(data.result.slice(0, 5));
      } else {
        setNotFound(true);
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setNotFound(true);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchSuggestions = useCallback(debounce((query: string) => {
    fetchSuggestions(query);
  }, 300), []);

  useEffect(() => {
    if (query.length > 1) {
      debouncedFetchSuggestions(query);
      setIsPickerVisible(true);
    } else {
      setSuggestions([]);
      setNotFound(false);
      setIsPickerVisible(false);
    }
  }, [query, debouncedFetchSuggestions]);

  const handleSelect = (symbol: string) => {
    setQuery("");
    setSelectedQuery(symbol);
    setSuggestions([]);
    setIsPickerVisible(false);
    onSelectSymbol(symbol);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
      setIsPickerVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={pickerRef}>
      <div className="relative flex items-center border p-1 w-full border-none md:bg-mantle md:border-surface0 md:rounded-md">
        <input
          type="text"
          placeholder={selectedQuery || "Search stocks..."}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-8 w-full bg-transparent outline-none text-text"
          onFocus={() => setIsPickerVisible(true)}
        />
        <span className="absolute left-2 text-surface0">
          <FaSearch className="text-text" />
        </span>
        {query && (
          <span className="absolute right-2 cursor-pointer" onClick={() => setQuery('')}>
            <FaTimes className="text-text" />
          </span>
        )}
      </div>
      {isPickerVisible && (
        <>
          {loading && (
            <div className="absolute border bg-mantle p-2 w-full mt-1 text-center">
              Loading...
            </div>
          )}
          {!loading && notFound && (
            <div className="absolute border bg-mantle p-2 w-full mt-1 text-center text-red-500">
              No results found
            </div>
          )}
          {suggestions.length > 0 && (
            <ul className="absolute border bg-mantle w-full mt-1">
              {suggestions.map((item) => (
                <li
                  key={item.symbol}
                  onClick={() => handleSelect(item.symbol)}
                  className="p-2 hover:bg-crust cursor-pointer"
                >
                  {item.description} ({item.symbol})
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default SearchBar;