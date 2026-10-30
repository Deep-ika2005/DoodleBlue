import { useEffect, useState } from "react";
import "./SearchEvents.css";

function SearchEvents({ onSearch, categories, selectedCategory, onCategoryChange, onReset }) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      onSearch(searchTerm.trim().toLowerCase());
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [searchTerm, onSearch]);

  function clearSearch() {
    setSearchTerm("");
  }

  function resetFilters() {
    clearSearch();
    onReset();
  }

  return (
    <div className="search-events">
      <div className="search-events-fields">
        <div className="search-events-field search-events-search-field">
          <label className="search-events-label" htmlFor="search-events-input">
            Find your next campus event
          </label>
          <div className="search-events-control">
            <svg className="search-events-icon" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 4.5 4.5" />
            </svg>
            <input
              id="search-events-input"
              type="text"
              role="searchbox"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by event name or venue"
              autoComplete="off"
            />
            {searchTerm && (
              <button
                className="search-events-clear"
                type="button"
                onClick={clearSearch}
                aria-label="Clear event search"
              >
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <path d="m5 5 10 10M15 5 5 15" />
                </svg>
              </button>
            )}
          </div>
        </div>
        <div className="search-events-field">
          <label className="search-events-label" htmlFor="event-category-filter">Category</label>
          <select
            id="event-category-filter"
            className="event-category-filter"
            value={selectedCategory}
            onChange={(event) => onCategoryChange(event.target.value)}
          >
            <option value="all">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.toLowerCase().replace(/[_-]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase())}
              </option>
            ))}
          </select>
        </div>
        <button className="search-events-reset" type="button" onClick={resetFilters}>
          Reset filters
        </button>
      </div>
    </div>
  );
}

export default SearchEvents;
