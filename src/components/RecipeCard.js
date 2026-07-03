'use client';

export default function RecipeCard({
  recipe,
  ingredients,
  selectedIds,
  ingredientMap,
  onClick,
  style,
}) {
  const recipeIngs = recipe.recipe_ingredients || [];
  const requiredIngs = recipeIngs.filter((ri) => !ri.is_optional);
  
  // Acqua (ID: 66) e Ghiaccio (ID: 75) sono considerati sempre posseduti
  const checkHave = (ingredientId) => {
    return selectedIds.has(ingredientId) || ingredientId === 66 || ingredientId === 75;
  };

  const haveCount = requiredIngs.filter((ri) => checkHave(ri.ingredient_id)).length;
  const totalRequired = requiredIngs.length;
  const matchPercent = totalRequired > 0 ? Math.round((haveCount / totalRequired) * 100) : 0;
  const isFullMatch = matchPercent === 100;

  const colorStyle = recipe.color
    ? { '--card-color': recipe.color }
    : { '--card-color': '#7c3aed' };

  return (
    <div
      className="recipe-card"
      onClick={onClick}
      style={{
        ...style,
        ...colorStyle,
      }}
      role="button"
      tabIndex={0}
      aria-label={`Ricetta: ${recipe.name_it}`}
    >
      <div
        className="recipe-card__accent"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: `linear-gradient(90deg, ${recipe.color || '#7c3aed'}, transparent)`,
          borderRadius: 'inherit',
        }}
      />

      <div className="recipe-card-header">
        <h3 className="recipe-card-name">{recipe.name_it}</h3>
        <span className={`recipe-card-match ${isFullMatch ? 'full' : 'partial'}`}>
          {isFullMatch ? '✓ Completo' : `${haveCount}/${totalRequired}`}
        </span>
      </div>

      {/* Badge Dietetici e Nutrizionali */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', margin: '4px 0 10px' }}>
        {recipe.tags && recipe.tags.includes('vegano') && (
          <span style={{ fontSize: '0.68rem', padding: '3px 8px', borderRadius: 'var(--radius-md)', background: 'rgba(16, 185, 129, 0.12)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.25)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
            🌱 Vegan
          </span>
        )}
        {recipe.tags && recipe.tags.includes('senza lattosio') && (
          <span style={{ fontSize: '0.68rem', padding: '3px 8px', borderRadius: 'var(--radius-md)', background: 'rgba(6, 182, 212, 0.12)', color: '#06b6d4', border: '1px solid rgba(6, 182, 212, 0.25)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
            🥛 Senza Lattosio
          </span>
        )}
        {recipe.protein_grams >= 15 && (
          <span style={{ fontSize: '0.68rem', padding: '3px 8px', borderRadius: 'var(--radius-md)', background: 'rgba(124, 58, 237, 0.12)', color: '#a78bfa', border: '1px solid rgba(124, 58, 237, 0.25)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
            💪 Proteico
          </span>
        )}
        {recipe.calories_kcal <= 250 && (
          <span style={{ fontSize: '0.68rem', padding: '3px 8px', borderRadius: 'var(--radius-md)', background: 'rgba(245, 158, 11, 0.12)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.25)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
            ⚡ Leggero
          </span>
        )}
      </div>

      <div className="recipe-card-ingredients">
        {recipeIngs.map((ri) => {
          const ing = ingredientMap[ri.ingredient_id];
          if (!ing) return null;
          const have = checkHave(ri.ingredient_id);
          const cls = ri.is_optional ? 'optional' : have ? 'have' : 'missing';
          return (
            <span key={ri.ingredient_id} className={`recipe-ingredient-pill ${cls}`}>
              {ing.emoji} {ing.name_it}
            </span>
          );
        })}
      </div>

      <div className="recipe-card-footer">
        <div className="recipe-meta">
          <span className="recipe-meta-item">
            ⏱ {recipe.prep_time_minutes} min
          </span>
          <span className="recipe-meta-item">
            📊 {recipe.difficulty}
          </span>
        </div>
        <span className="recipe-view-btn">
          Dettagli →
        </span>
      </div>
    </div>
  );
}
