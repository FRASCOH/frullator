'use client';

export default function SelectedBar({ ingredients, selectedIds, onToggle, onFind }) {
  if (selectedIds.size === 0) return null;

  const selectedList = ingredients.filter((ing) => selectedIds.has(ing.id));

  return (
    <div className={`selected-bar ${selectedIds.size > 0 ? 'visible' : ''}`}>
      <div className="selected-bar-inner">
        <div className="selected-chips">
          {selectedList.map((ing) => (
            <button
              key={ing.id}
              className="selected-chip"
              onClick={() => onToggle(ing.id)}
              aria-label={`Rimuovi ${ing.name_it}`}
            >
              {ing.emoji} {ing.name_it}
              <span className="chip-remove">✕</span>
            </button>
          ))}
        </div>
        <button
          id="find-smoothies"
          className="find-button"
          onClick={onFind}
        >
          Trova
          <span className="btn-count">{selectedIds.size}</span>
        </button>
      </div>
    </div>
  );
}
