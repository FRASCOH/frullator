'use client';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-container">
      <div className="search-wrapper">
        <span className="search-icon">🔍</span>
        <input
          id="search-input"
          className="search-input"
          type="text"
          placeholder="Cerca ingredienti..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
        <button
          className={`search-clear ${value ? 'visible' : ''}`}
          onClick={() => onChange('')}
          aria-label="Cancella ricerca"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
