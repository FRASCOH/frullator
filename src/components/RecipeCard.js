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
  const haveCount = requiredIngs.filter((ri) => selectedIds.has(ri.ingredient_id)).length;
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

      {recipe.tags && recipe.tags.length > 0 && (
        <div className="recipe-card-tags">
          {recipe.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="recipe-tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="recipe-card-ingredients">
        {recipeIngs.map((ri) => {
          const ing = ingredientMap[ri.ingredient_id];
          if (!ing) return null;
          const have = selectedIds.has(ri.ingredient_id);
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
