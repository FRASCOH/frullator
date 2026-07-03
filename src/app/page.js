'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import SearchBar from '@/components/SearchBar';
import IngredientGrid from '@/components/IngredientGrid';
import SelectedBar from '@/components/SelectedBar';
import RecipeCard from '@/components/RecipeCard';
import RecipeModal from '@/components/RecipeModal';
import PopularSection from '@/components/PopularSection';
import StepWizard from '@/components/StepWizard';

export default function Home() {
  // Data
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI State
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  // Ingredient lookup map
  const ingredientMap = useMemo(() => {
    const map = {};
    ingredients.forEach((ing) => {
      map[ing.id] = ing;
    });
    return map;
  }, [ingredients]);

  // Popular recipes (top 8 by popularity)
  const popularRecipes = useMemo(() => {
    return recipes
      .filter((r) => r.popularity > 0)
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 8);
  }, [recipes]);

  // Matched recipes — sorted by match percentage
  const matchedRecipes = useMemo(() => {
    if (selectedIds.size === 0) return [];

    return recipes
      .map((recipe) => {
        const recipeIngs = recipe.recipe_ingredients || [];
        const required = recipeIngs.filter((ri) => !ri.is_optional);
        const haveCount = required.filter((ri) =>
          selectedIds.has(ri.ingredient_id)
        ).length;
        const totalRequired = required.length;
        const matchPercent =
          totalRequired > 0 ? (haveCount / totalRequired) * 100 : 0;

        return { ...recipe, matchPercent, haveCount, totalRequired };
      })
      .filter((r) => r.matchPercent >= 50) // Show recipes with at least 50% match
      .sort((a, b) => {
        // Full matches first, then by match %, then by popularity
        if (b.matchPercent !== a.matchPercent) return b.matchPercent - a.matchPercent;
        return (b.popularity || 0) - (a.popularity || 0);
      });
  }, [recipes, selectedIds]);

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [ingRes, recRes] = await Promise.all([
          supabase
            .from('ingredients')
            .select('*')
            .order('name_it'),
          supabase
            .from('recipes')
            .select(`
              *,
              recipe_ingredients (
                ingredient_id,
                quantity,
                is_optional
              )
            `)
            .order('name_it'),
        ]);

        if (ingRes.data) setIngredients(ingRes.data);
        if (recRes.data) setRecipes(recRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Toggle ingredient
  const handleToggle = useCallback((id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  // Find smoothies
  const handleFind = useCallback(() => {
    setShowResults(true);
    setSearchQuery('');
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Go back to ingredients
  const handleBack = useCallback(() => {
    setShowResults(false);
  }, []);

  // Increment popularity on recipe click
  const handleRecipeClick = useCallback(async (recipe) => {
    setSelectedRecipe(recipe);
    // Increment popularity in background
    try {
      await supabase
        .from('recipes')
        .update({ popularity: (recipe.popularity || 0) + 1 })
        .eq('id', recipe.id);
    } catch (e) {
      // Silent fail — not critical
    }
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="app-container">
        <div className="hero">
          <h1 className="hero-logo">
            <span className="hero-emoji">🍹</span> Frullator
          </h1>
        </div>
        <div className="loading-container">
          <div className="loading-spinner" />
          <span className="loading-text">Caricamento ingredienti...</span>
        </div>
      </div>
    );
  }

  // Results view
  if (showResults) {
    return (
      <div className="app-container">
        <div className="hero" style={{ padding: '20px 0 12px' }}>
          <h1 className="hero-logo" style={{ fontSize: '2rem' }}>
            <span className="hero-emoji">🍹</span> Frullator
          </h1>
        </div>

        <div className="results-section">
          <div className="results-header">
            <div>
              <h2 className="results-title">I tuoi frullati</h2>
              <span className="results-count">
                {matchedRecipes.length} ricette trovate
              </span>
            </div>
            <button className="results-back" onClick={handleBack}>
              ← Ingredienti
            </button>
          </div>

          {matchedRecipes.length > 0 ? (
            <div className="results-grid">
              {matchedRecipes.map((recipe, index) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  ingredients={ingredients}
                  selectedIds={selectedIds}
                  ingredientMap={ingredientMap}
                  onClick={() => handleRecipeClick(recipe)}
                  style={{ animationDelay: `${Math.min(index * 0.05, 0.5)}s` }}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span className="empty-state-emoji">🤷</span>
              <h3 className="empty-state-title">Nessun frullato trovato</h3>
              <p className="empty-state-text">
                Prova a selezionare più ingredienti o ingredienti diversi
              </p>
            </div>
          )}
        </div>

        {/* Modal */}
        {selectedRecipe && (
          <RecipeModal
            recipe={selectedRecipe}
            ingredientMap={ingredientMap}
            onClose={() => setSelectedRecipe(null)}
          />
        )}
      </div>
    );
  }

  // Main ingredient selection view
  return (
    <div className="app-container">
      {/* Hero */}
      <header className="hero">
        <h1 className="hero-logo">
          <span className="hero-emoji">🍹</span> Frullator
        </h1>
        <p className="hero-subtitle">
          Seleziona gli ingredienti che hai e scopri cosa puoi frullare!
        </p>
      </header>

      {/* Step Wizard Trigger Button */}
      <div className="wizard-cta-container">
        <button className="wizard-cta-button" onClick={() => setIsWizardOpen(true)}>
          ✨ Dimmi cosa hai (Step by Step)
        </button>
      </div>

      {/* Search */}
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {/* Popular Section */}
      {!searchQuery && (
        <PopularSection
          recipes={popularRecipes}
          ingredientMap={ingredientMap}
          onRecipeClick={handleRecipeClick}
        />
      )}

      {/* Ingredient Grid */}
      <IngredientGrid
        ingredients={ingredients}
        selectedIds={selectedIds}
        onToggle={handleToggle}
        searchQuery={searchQuery}
      />

      {/* Selected Bar (fixed bottom) */}
      <SelectedBar
        ingredients={ingredients}
        selectedIds={selectedIds}
        onToggle={handleToggle}
        onFind={handleFind}
      />

      {/* Step-by-step Selection Modal */}
      {isWizardOpen && (
        <StepWizard
          ingredients={ingredients}
          selectedIds={selectedIds}
          onToggle={handleToggle}
          onFinish={() => {
            setIsWizardOpen(false);
            handleFind();
          }}
          onClose={() => setIsWizardOpen(false)}
        />
      )}

      {/* Modal */}
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          ingredientMap={ingredientMap}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}
