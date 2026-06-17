import React, { useState, useEffect, useRef } from "react";
import { SearchIcon, X, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const GlobalSearch = () => {
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Debounce hook pattern inside useEffect
  useEffect(() => {
    // Only fetch if the dropdown is open (or should be)
    if (!isDropdownOpen && search === "") return;

    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `${backendUrl}/product/search?q=${search}`,
        );
        setResults(data?.results || []);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, isDropdownOpen]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavigation = (id) => {
    navigate(`/product-detail/${id}`);
    setIsDropdownOpen(false);
    setSearch("");
  };

  return (
    <div className="relative w-full max-w-lg mx-auto" ref={searchRef}>
      {/* Search Input Box */}
      <div
        className={`relative flex items-center w-full h-11 bg-slate-100/80 backdrop-blur-sm border transition-all duration-300
          ${isDropdownOpen ? "rounded-t-2xl border-slate-300 ring-4 ring-red-100" : "rounded-full border-transparent hover:border-slate-300"}
        `}
      >
        <SearchIcon className="absolute left-4 text-slate-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search products, events..."
          className="w-full h-full pl-12 pr-10 bg-transparent border-none outline-none text-slate-800 text-sm placeholder:text-slate-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsDropdownOpen(true)}
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-4 text-slate-400 hover:text-slate-600 focus:outline-none"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {isDropdownOpen && (
        <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border border-slate-200 border-t-0 rounded-b-2xl shadow-2xl overflow-hidden z-[100] max-h-[70vh] flex flex-col">
          {isLoading ? (
            <div className="flex items-center justify-center p-8 text-slate-400">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : results.length > 0 ? (
            <div className="overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-slate-200">
              {/* Optional: Add a small header if query is empty indicating "Trending" */}
              {!search && (
                <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Trending Right Now
                </div>
              )}
              {results.map((item) => (
                <div
                  key={item._id}
                  onClick={() => handleNavigation(item._id)}
                  className="flex items-center gap-4 p-3 mx-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group"
                >
                  {/* Image */}
                  <div className="w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
                    <img
                      src={
                        item.images?.[0]?.url ||
                        item.image_Url?.[0]?.url ||
                        "https://dummyimage.com/100"
                      }
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-slate-800 truncate group-hover:text-red-600 transition-colors">
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full capitalize">
                        {item.category || item.type || "Product"}
                      </span>
                      <span className="text-xs font-bold text-slate-900">
                        ${item.discount_price || item.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-sm font-medium text-slate-600">
                No results found for "{search}"
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Try checking your spelling or using different keywords.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
