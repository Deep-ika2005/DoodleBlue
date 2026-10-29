import { useEffect, useState } from "react";
import "./SearchEvents.css";

function SearchEvents({ onSearch }) {
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

  return (
    <div className="search-events">
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
      <span className="search-events-hint">Try a workshop, concert, or venue</span>
    </div>
  );
}

export default SearchEvents;
