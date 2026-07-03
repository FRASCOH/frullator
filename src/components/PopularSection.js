'use client';

export default function PopularSection({ recipes, ingredientMap, onRecipeClick }) {
  if (!recipes || recipes.length === 0) return null;

  return (
    <div className="popular-section">
      <h2 className="popular-title">
        🔥 I più bevuti
      </h2>
      <div className="popular-scroll">
        {recipes.map((recipe, index) => {
          const recipeIngs = recipe.recipe_ingredients || [];
          const emojis = recipeIngs
            .slice(0, 5)
            .map((ri) => ingredientMap[ri.ingredient_id]?.emoji || '')
            .join('');
          const ingredientNames = recipeIngs
            .slice(0, 4)
            .map((ri) => ingredientMap[ri.ingredient_id]?.name_it || '')
            .filter(Boolean)
            .join(', ');

          return (
            <div
              key={recipe.id}
              className="popular-card"
              onClick={() => onRecipeClick(recipe)}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div
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
              <div className="popular-card-rank">
                #{index + 1} popolare
              </div>
              <div className="popular-card-name">{recipe.name_it}</div>
              <div className="popular-card-ingredients">{ingredientNames}</div>
              <div className="popular-card-emojis">{emojis}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
