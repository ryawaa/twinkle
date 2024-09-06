import { useState, useEffect, useCallback, useRef } from "react";
import debounce from "lodash.debounce";
import { FaSearch, FaTimes } from "react-icons/fa";
import FadeLoader from "./FadeLoader";

interface SearchBarProps {
    onSelectSymbol: (symbol: string) => void;
}

const SearchBar = ({ onSelectSymbol }: SearchBarProps) => {
    const [query, setQuery] = useState("");
    const [selectedQuery, setSelectedQuery] = useState("");
    const [suggestions, setSuggestions] = useState<{ symbol: string; description: string }[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [isPickerVisible, setIsPickerVisible] = useState(false);
    const pickerRef = useRef<HTMLDivElement>(null);

    /**
     * fetchSuggestions is a function to fetch stock suggestions based on user query.
     * It uses the AbortController to cancel any ongoing fetch request if a new query comes in.
     */
    const fetchSuggestions = (() => {
        let currentController: AbortController | null = null;

        return async (query: string) => {
            if (currentController) {
                currentController.abort();
            }

            currentController = new AbortController();
            const { signal } = currentController;

            setLoading(true);
            setNotFound(false);

            try {
                const res = await fetch(`/api/search?query=${query}`, { signal });
                const data = await res.json();

                if (res.ok && data.result && data.result.length > 0) {
                    setTotalCount(data.result.length);
                    setSuggestions(data.result.slice(0, 5));
                } else {
                    setNotFound(true);
                    setSuggestions([]);
                    setTotalCount(0);
                }
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    console.error("Error fetching suggestions:", error);
                    setNotFound(true);
                    setSuggestions([]);
                    setTotalCount(0);
                }
            } finally {
                setLoading(false);
                currentController = null;
            }
        };
    })();

    // Debounce the fetchSuggestions function to avoid excessive API calls
    const debouncedFetchSuggestions = useCallback(
        debounce((query: string) => {
            fetchSuggestions(query);
        }, 500),
        []
    );

    // Effect handler to run debounced fetchSuggestions when query changes
    useEffect(() => {
        if (query.length > 0) {
            debouncedFetchSuggestions(query);
            setIsPickerVisible(true);
        } else {
            setSuggestions([]);
            setNotFound(false);
            setIsPickerVisible(false);
        }
    }, [query, debouncedFetchSuggestions]);

    // Handle the selection of a suggestion
    const handleSelect = (symbol: string) => {
        setQuery("");
        setSelectedQuery(symbol);
        setSuggestions([]);
        setIsPickerVisible(false);
        onSelectSymbol(symbol);
    };

    // Handle clicks outside the suggestion picker to close it
    const handleClickOutside = (event: MouseEvent) => {
        if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
            setIsPickerVisible(false);
        }
    };

    // Effect handler to add and remove event listener for clicks outside picker
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
                    onChange={(e) => {
                        setQuery(e.target.value);
                    }}
                    className="pl-8 w-full bg-transparent outline-none text-text"
                    onFocus={() => setIsPickerVisible(true)}
                />
                <span className="absolute left-2 text-surface0">
                    <FaSearch className="text-text" />
                </span>
                {query && (
                    <span
                        className="absolute right-2 cursor-pointer"
                        onClick={() => setQuery("")}
                    >
                        <FaTimes className="text-text" />
                    </span>
                )}
            </div>
            {isPickerVisible && (
                <ul className="z-50 absolute border bg-mantle w-full mt-2 rounded-md border-surface0 overflow-hidden">
                    {suggestions.map((item, index) => (
                        <li
                            key={item.symbol}
                            onClick={() => handleSelect(item.symbol)}
                            className={`p-2 hover:bg-crust cursor-pointer transition-all border-b-2 dark:border-base border-overlay0 `}
                        >
                            <div className="flex flex-col">
                                <div className="font-bold">{item.symbol}</div>
                                <div className="text-xs flex flex-row gap-2">
                                    {index === 0 && (
                                        <span className="rounded-md text-xs px-1 dark:text-crust bg-text text-overlay0">
                                            Top Result
                                        </span>
                                    )}
                                    {item.description}
                                </div>
                            </div>
                        </li>
                    ))}
                    <li
                        key="count"
                        className="bottom p-2 text-xs text-right bg-overlay0 dark:bg-crust"
                    >
                        <div className="flex flex-row items-center align-middle justify-between">
                            <span className="p-1 text-left">
                                {loading
                                    ? "Searching..."
                                    : `Showing top hits for '${query}'. (Matched ${totalCount} result${totalCount > 1 ? "s" : ""}).`}
                            </span>
                            {loading && (
                                <span className="text-xs text-center">
                                    <FadeLoader loading={true} />
                                </span>
                            )}
                        </div>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default SearchBar;