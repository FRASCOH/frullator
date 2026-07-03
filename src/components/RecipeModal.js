'use client';

import { useEffect, useCallback, useMemo } from 'react';
import { calculateRecipeNutrition } from '@/lib/nutrition';

export default function RecipeModal({ recipe, ingredientMap, onClose, user, isFavorite, onToggleFavorite }) {
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

  const nutrition = useMemo(() => {
    return calculateRecipeNutrition(recipe.recipe_ingredients || []);
  }, [recipe]);

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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
            <h2 className="modal-recipe-name" style={{ flex: 1 }}>{recipe.name_it}</h2>
            {user && (
              <button
                onClick={() => onToggleFavorite(recipe.id)}
                style={{
                  background: 'var(--surface)',
                  border: isFavorite ? '1px solid var(--warning)' : '1px solid var(--glass-border)',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  color: isFavorite ? 'var(--warning)' : 'var(--text-muted)',
                  transition: 'all 0.2s',
                  marginTop: '2px'
                }}
                aria-label={isFavorite ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
              >
                ★
              </button>
            )}
          </div>

          {recipe.description_it && (
            <p className="modal-recipe-desc" style={{ marginTop: '8px' }}>{recipe.description_it}</p>
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

          {/* Sezione Macro e Kcal */}
          <h3 className="modal-section-title">📊 Valori Nutrizionali Indicativi</h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '8px',
              padding: '14px',
              background: 'var(--surface)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '24px',
              textAlign: 'center'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Kcal</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {nutrition.kcal}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '0.7rem', color: '#ffb3c1', fontWeight: 600, textTransform: 'uppercase' }}>Carboidrati</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {nutrition.carb}g
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--primary-light)', fontWeight: 600, textTransform: 'uppercase' }}>Proteine</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {nutrition.prot}g
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--warning)', fontWeight: 600, textTransform: 'uppercase' }}>Grassi</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {nutrition.fat}g
              </span>
            </div>
          </div>

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
