'use client';

import { useEffect, useCallback } from 'react';

export default function RecipeModal({ recipe, ingredientMap, onClose }) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  if (!recipe) return null;

  const recipeIngs = recipe.recipe_ingredients || [];
  const requiredIngs = recipeIngs.filter((ri) => !ri.is_optional);
  const optionalIngs = recipeIngs.filter((ri) => ri.is_optional);

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-handle">
          <div className="modal-handle-bar" />
        </div>

        <div className="modal-body">
          <h2 className="modal-recipe-name">{recipe.name_it}</h2>

          {recipe.description_it && (
            <p className="modal-recipe-desc">{recipe.description_it}</p>
          )}

          <div className="modal-recipe-meta">
            <div className="modal-meta-badge">
              <span className="badge-icon">⏱</span>
              {recipe.prep_time_minutes} min
            </div>
            <div className="modal-meta-badge">
              <span className="badge-icon">📊</span>
              {recipe.difficulty}
            </div>
          </div>

          {recipe.tags && recipe.tags.length > 0 && (
            <div className="modal-tags">
              {recipe.tags.map((tag) => (
                <span key={tag} className="modal-tag">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <h3 className="modal-section-title">🧾 Ingredienti</h3>
          <ul className="modal-ingredients-list">
            {requiredIngs.map((ri) => {
              const ing = ingredientMap[ri.ingredient_id];
              if (!ing) return null;
              return (
                <li key={ri.ingredient_id} className="modal-ingredient-item">
                  <span className="modal-ingredient-name">
                    <span className="ing-emoji">{ing.emoji}</span>
                    {ing.name_it}
                  </span>
                  <span className="modal-ingredient-qty">{ri.quantity}</span>
                </li>
              );
            })}
            {optionalIngs.map((ri) => {
              const ing = ingredientMap[ri.ingredient_id];
              if (!ing) return null;
              return (
                <li
                  key={ri.ingredient_id}
                  className="modal-ingredient-item optional-ing"
                >
                  <span className="modal-ingredient-name">
                    <span className="ing-emoji">{ing.emoji}</span>
                    {ing.name_it}
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginLeft: 4 }}>
                      (opzionale)
                    </span>
                  </span>
                  <span className="modal-ingredient-qty">{ri.quantity}</span>
                </li>
              );
            })}
          </ul>

          <h3 className="modal-section-title">📝 Preparazione</h3>
          <div
            style={{
              padding: '14px',
              background: 'var(--surface)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.88rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '20px',
            }}
          >
            <ol style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>Lava e prepara tutti gli ingredienti freschi.</li>
              <li>Inserisci tutti gli ingredienti nel frullatore.</li>
              <li>Frulla a velocità alta per 30-60 secondi fino a ottenere una consistenza omogenea.</li>
              <li>Assaggia e regola la dolcezza a piacere.</li>
              <li>Servi subito in un bicchiere e gustati il tuo frullato! 🍹</li>
            </ol>
          </div>

          <button className="modal-close-btn" onClick={onClose}>
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
}
