'use client';

import { useState, useMemo } from 'react';

const CATEGORIES = [
  { key: 'tutti', label: 'Tutti', emoji: '✨' },
  { key: 'frutta', label: 'Frutta', emoji: '🍎' },
  { key: 'verdura', label: 'Verdura', emoji: '🥬' },
  { key: 'spezia', label: 'Spezie', emoji: '🌶️' },
  { key: 'bevanda', label: 'Bevande', emoji: '🥛' },
  { key: 'altro', label: 'Altro', emoji: '🥜' },
];

export default function IngredientGrid({
  ingredients,
  selectedIds,
  onToggle,
  searchQuery,
}) {
  const [activeCategory, setActiveCategory] = useState('tutti');

  const filtered = useMemo(() => {
    let list = ingredients;

    if (activeCategory !== 'tutti') {
      list = list.filter((ing) => ing.category === activeCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (ing) =>
          ing.name_it.toLowerCase().includes(q) ||
          ing.name.toLowerCase().includes(q)
      );
    }

    return list;
  }, [ingredients, activeCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts = { tutti: ingredients.length };
    ingredients.forEach((ing) => {
      counts[ing.category] = (counts[ing.category] || 0) + 1;
    });
    return counts;
  }, [ingredients]);

  return (
    <div className="ingredients-section">
      {/* Category Tabs */}
      <div className="category-tabs">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            id={`tab-${cat.key}`}
            className={`category-tab ${activeCategory === cat.key ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.key)}
          >
            <span className="tab-emoji">{cat.emoji}</span>
            {cat.label}
            <span className="tab-count">({categoryCounts[cat.key] || 0})</span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="ingredient-grid">
        {filtered.length > 0 ? (
          filtered.map((ing) => {
            const isSelected = selectedIds.has(ing.id);
            return (
              <button
                key={ing.id}
                id={`ingredient-${ing.id}`}
                className={`ingredient-card ${isSelected ? 'selected' : ''}`}
                onClick={() => onToggle(ing.id)}
                aria-pressed={isSelected}
                aria-label={`${ing.name_it} ${isSelected ? 'selezionato' : ''}`}
              >
                <span className="ingredient-check">✓</span>
                <span className="ingredient-emoji">{ing.emoji}</span>
                <span className="ingredient-name">{ing.name_it}</span>
              </button>
            );
          })
        ) : (
          <div className="no-ingredients">
            <span className="no-emoji">🔍</span>
            Nessun ingrediente trovato
          </div>
        )}
      </div>
    </div>
  );
}
