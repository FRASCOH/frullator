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
import AuthModal from '@/components/AuthModal';

export default function Home() {
  // Data
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Auth & Favorites state
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState(new Set()); // Insieme di recipe_id preferiti
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // UI State
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  
  // 'choice' (due pulsanti) | 'grid' (griglia classica/frigo)
  const [uiMode, setUiMode] = useState('choice');

  // Filtri nutrizionali / dietetici
  // Opzioni: 'all' | 'favorites' | 'vegan' | 'high-protein' | 'low-calorie'
  const [activeFilter, setActiveFilter] = useState('all');

  // Ingredient lookup map
  const ingredientMap = useMemo(() => {
    const map = {};
    ingredients.forEach((ing) => {
      map[ing.id] = ing;
    });
    return map;
  }, [ingredients]);

  // Tabella nutrizionale importata dinamicamente o calcolata
  const recipeNutritionMap = useMemo(() => {
    const map = {};
    // Importa dinamicamente le informazioni nutrizionali
    const { calculateRecipeNutrition } = require('@/lib/nutrition');
    recipes.forEach((recipe) => {
      map[recipe.id] = calculateRecipeNutrition(recipe.recipe_ingredients || []);
    });
    return map;
  }, [recipes]);

  // Popular recipes (top 8 by popularity)
  const popularRecipes = useMemo(() => {
    return recipes
      .filter((r) => r.popularity > 0)
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 8);
  }, [recipes]);

  // Matched recipes — sorted by match percentage and filters
  const matchedRecipes = useMemo(() => {
    // Rimuoviamo il blocco obbligatorio sull'avere ingredienti selezionati se il filtro attivo è 'favorites' o 'popular'
    if (selectedIds.size === 0 && activeFilter !== 'favorites' && activeFilter !== 'popular') return [];

    let filteredRecipes = recipes.map((recipe) => {
      const recipeIngs = recipe.recipe_ingredients || [];
      const required = recipeIngs.filter((ri) => !ri.is_optional);
      
      // Consideriamo Acqua (ID: 66) e Ghiaccio (ID: 75) come sempre posseduti
      const checkHave = (ingredientId) => {
        return selectedIds.has(ingredientId) || ingredientId === 66 || ingredientId === 75;
      };

      const haveCount = required.filter((ri) => checkHave(ri.ingredient_id)).length;
      const totalRequired = required.length;
      const matchPercent =
        totalRequired > 0 ? (haveCount / totalRequired) * 100 : 0;

      return { ...recipe, matchPercent, haveCount, totalRequired };
    });

    // Applica soglia di match (se non siamo in preferiti o più bevuti)
    if (activeFilter !== 'favorites' && activeFilter !== 'popular') {
      filteredRecipes = filteredRecipes.filter((r) => r.matchPercent >= 50);
    }

    // Applica Filtri Alimentari / Obiettivi Fitness
    if (activeFilter === 'favorites') {
      filteredRecipes = filteredRecipes.filter((r) => favorites.has(r.id));
    } else if (activeFilter === 'popular') {
      filteredRecipes = filteredRecipes.filter((r) => r.popularity > 0);
    } else if (activeFilter === 'high-protein') {
      filteredRecipes = filteredRecipes.filter((r) => {
        const nut = recipeNutritionMap[r.id];
        return nut && nut.prot >= 15; // Almeno 15g di proteine
      });
    } else if (activeFilter === 'low-calorie') {
      filteredRecipes = filteredRecipes.filter((r) => {
        const nut = recipeNutritionMap[r.id];
        return nut && nut.kcal <= 250; // Massimo 250 Kcal
      });
    } else if (activeFilter === 'vegan') {
      filteredRecipes = filteredRecipes.filter((r) => {
        return r.tags && r.tags.includes('vegano');
      });
    } else if (activeFilter === 'lactose-free') {
      filteredRecipes = filteredRecipes.filter((r) => {
        // Controlla se la ricetta NON contiene ingredienti contenenti lattosio (es. Latte vaccino (61), Yogurt greco (69), Yogurt naturale (70), Kefir (71))
        const recipeIngs = r.recipe_ingredients || [];
        const containsLactose = recipeIngs.some((ri) => 
          [61, 69, 70, 71].includes(ri.ingredient_id)
        );
        return !containsLactose;
      });
    }

    return filteredRecipes.sort((a, b) => {
      // Se siamo nei popolari, ordina principalmente per popolarità
      if (activeFilter === 'popular') {
        return (b.popularity || 0) - (a.popularity || 0);
      }
      if (b.matchPercent !== a.matchPercent) return b.matchPercent - a.matchPercent;
      return (b.popularity || 0) - (a.popularity || 0);
    });
  }, [recipes, selectedIds, activeFilter, favorites, recipeNutritionMap]);

  // Gestione caricamento sessione e preferiti
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch preferiti dal DB
  useEffect(() => {
    if (!user) {
      setFavorites(new Set());
      return;
    }

    async function fetchFavorites() {
      const { data, error } = await supabase
        .from('user_favorites')
        .select('recipe_id');
      
      if (data && !error) {
        setFavorites(new Set(data.map((f) => f.recipe_id)));
      }
    }

    fetchFavorites();
  }, [user]);

  // Fetch frigorifero (ingredienti salvati) dal DB
  useEffect(() => {
    if (!user) return;

    async function fetchFridge() {
      const { data, error } = await supabase
        .from('user_fridge')
        .select('ingredient_id');
      
      if (data && !error) {
        setSelectedIds(new Set(data.map((f) => f.ingredient_id)));
      }
    }

    fetchFridge();
  }, [user]);

  // Aggiungi / Rimuovi dai preferiti
  const handleToggleFavorite = async (recipeId) => {
    if (!user) return;

    const isFav = favorites.has(recipeId);
    
    if (isFav) {
      // Rimuovi
      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('recipe_id', recipeId);
      
      if (!error) {
        setFavorites((prev) => {
          const next = new Set(prev);
          next.delete(recipeId);
          return next;
        });
      }
    } else {
      // Aggiungi
      const { error } = await supabase
        .from('user_favorites')
        .insert({ user_id: user.id, recipe_id: recipeId });
      
      if (!error) {
        setFavorites((prev) => {
          const next = new Set(prev);
          next.add(recipeId);
          return next;
        });
      }
    }
  };

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

  // Toggle ingredient (and optional fridge persistence)
  const handleToggle = useCallback(async (id) => {
    let isAdded = false;
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        isAdded = false;
      } else {
        next.add(id);
        isAdded = true;
      }
      return next;
    });

    // Se l'utente è loggato, salva la selezione nel database (Frigorifero persistente)
    if (user) {
      try {
        if (isAdded) {
          await supabase
            .from('user_fridge')
            .insert({ user_id: user.id, ingredient_id: id });
        } else {
          await supabase
            .from('user_fridge')
            .delete()
            .eq('user_id', user.id)
            .eq('ingredient_id', id);
        }
      } catch (e) {
        console.error('Errore nel salvare la selezione nel frigorifero:', e);
      }
    }
  }, [user]);

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
    setActiveFilter('all'); // Ripristina il filtro a 'all'
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
          <h1 className="hero-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <img src="/icon.svg" alt="Logo" style={{ width: '48px', height: '48px', borderRadius: '12px' }} />
            Frullator
          </h1>
        </div>
        <div className="loading-container">
          <div className="loading-shaker" />
          <span className="loading-text">Frullando gli ingredienti...</span>
        </div>
      </div>
    );
  }

  // Results view
  if (showResults) {
    return (
      <div className="app-container">
        <div className="hero" style={{ padding: '20px 0 12px' }}>
          <h1 className="hero-logo" style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <img src="/icon.svg" alt="Logo" style={{ width: '36px', height: '36px', borderRadius: '8px' }} />
            Frullator
          </h1>
        </div>

        <div className="results-section">
          <div className="results-header" style={{ marginBottom: '12px' }}>
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

          {/* Filtri Alimentari / Diete */}
          <div 
            className="category-tabs" 
            style={{ 
              padding: '8px 0 16px', 
              borderBottom: '1.5px solid var(--glass-border)',
              marginBottom: '20px',
              animationDelay: '0.1s',
              gap: '10px'
            }}
          >
            <button
              className={`category-tab ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
              style={{ fontSize: '0.9rem', padding: '12px 18px' }}
            >
              🥗 Tutti
            </button>
            <button
              className={`category-tab ${activeFilter === 'popular' ? 'active' : ''}`}
              onClick={() => setActiveFilter('popular')}
              style={{ fontSize: '0.9rem', padding: '12px 18px' }}
            >
              🔥 I più bevuti
            </button>
            {user && (
              <button
                className={`category-tab ${activeFilter === 'favorites' ? 'active' : ''}`}
                onClick={() => setActiveFilter('favorites')}
                style={{ fontSize: '0.9rem', padding: '12px 18px' }}
              >
                ★ Preferiti
              </button>
            )}
            <button
              className={`category-tab ${activeFilter === 'vegan' ? 'active' : ''}`}
              onClick={() => setActiveFilter('vegan')}
              style={{ fontSize: '0.9rem', padding: '12px 18px' }}
            >
              🌱 Vegano
            </button>
            <button
              className={`category-tab ${activeFilter === 'lactose-free' ? 'active' : ''}`}
              onClick={() => setActiveFilter('lactose-free')}
              style={{ fontSize: '0.9rem', padding: '12px 18px' }}
            >
              🥛 Senza Lattosio
            </button>
            <button
              className={`category-tab ${activeFilter === 'high-protein' ? 'active' : ''}`}
              onClick={() => setActiveFilter('high-protein')}
              style={{ fontSize: '0.9rem', padding: '12px 18px' }}
            >
              💪 Proteici
            </button>
            <button
              className={`category-tab ${activeFilter === 'low-calorie' ? 'active' : ''}`}
              onClick={() => setActiveFilter('low-calorie')}
              style={{ fontSize: '0.9rem', padding: '12px 18px' }}
            >
              ⚡ Leggeri
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
            user={user}
            isFavorite={favorites.has(selectedRecipe.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </div>
    );
  }

  // Main ingredient selection view
  return (
    <div className="app-container">
      {/* Auth Status/Control Header Bar */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          padding: '12px 0 0',
          animation: 'fadeInUp 0.6s var(--ease-out) both'
        }}
      >
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              👋 {user.email.split('@')[0]}
            </span>
            <button
              onClick={() => {
                // Simula il click sul "Trova frullati" per andare nella schermata risultati
                // E imposta direttamente il filtro attivo a preferiti
                setActiveFilter('favorites');
                // Seleziona un ingrediente fake o imposta showResults a true
                setShowResults(true);
              }}
              style={{
                background: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                color: 'var(--warning)',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              ★ Preferiti ({favorites.size})
            </button>
            <button
              onClick={() => supabase.auth.signOut()}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--glass-border)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                color: 'var(--text-primary)',
                cursor: 'pointer'
              }}
            >
              Esci
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsAuthOpen(true)}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--glass-border)',
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.78rem',
              color: 'var(--primary-light)',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            🔑 Accedi / Registrati
          </button>
        )}
      </div>

      {/* Hero */}
      <header className="hero" style={{ padding: '16px 0 24px' }}>
        <h1 className="hero-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <img src="/icon.svg" alt="Logo" style={{ width: '48px', height: '48px', borderRadius: '12px' }} />
          Frullator
        </h1>
        <p className="hero-subtitle">
          Seleziona gli ingredienti che hai e scopri cosa puoi frullare!
        </p>
      </header>

      {uiMode === 'choice' ? (
        /* Schermata di scelta principale (due pulsanti) */
        <div>
          <div className="wizard-cta-container">
            <button 
              className="wizard-cta-button primary" 
              onClick={() => setIsWizardOpen(true)}
            >
              ✨ Crea frullato
              <span className="wizard-cta-subtext">Selezione guidata passo-passo</span>
            </button>
            
            <button 
              className="wizard-cta-button" 
              onClick={() => setUiMode('grid')}
            >
              {user ? '🧊 Gestisci il tuo Frigorifero' : '📝 Lista degli Ingredienti'}
              <span className="wizard-cta-subtext">
                {user ? 'Salva e gestisci cosa hai a disposizione' : 'Seleziona tutti gli ingredienti liberamente'}
              </span>
            </button>
          </div>

          {/* Sezione Preferiti in Home Page */}
          {user && favorites.size > 0 && (
            <div style={{ marginBottom: '28px', animation: 'fadeInUp 0.6s var(--ease-out) 0.3s both' }}>
              <h2 className="section-title">
                ★ I tuoi preferiti <span className="count">({favorites.size})</span>
              </h2>
              <div className="popular-scroll" style={{ display: 'flex', gap: '12px', overflowX: 'auto', scrollbarWidth: 'none', padding: '4px 0 12px', WebkitOverflowScrolling: 'touch' }}>
                {recipes
                  .filter((r) => favorites.has(r.id))
                  .map((recipe, index) => {
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
                        onClick={() => handleRecipeClick(recipe)}
                        style={{
                          animationDelay: `${index * 0.1}s`,
                          border: '1px solid rgba(245, 158, 11, 0.2)',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '3px',
                            background: recipe.color || 'var(--warning)',
                            borderRadius: 'inherit',
                          }}
                        />
                        <div className="popular-card-rank" style={{ color: 'var(--warning)' }}>
                          Salvataggio preferito
                        </div>
                        <div className="popular-card-name">{recipe.name_it}</div>
                        <div className="popular-card-ingredients">{ingredientNames}</div>
                        <div className="popular-card-emojis">{emojis}</div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Schermata di selezione libera degli ingredienti (Griglia / Frigorifero) */
        <div style={{ animation: 'fadeInUp 0.5s var(--ease-out) both' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 className="section-title" style={{ margin: 0 }}>
              {user ? '🧊 Il tuo Frigorifero' : '📝 Lista Ingredienti'}
            </h2>
            <button 
              onClick={() => setUiMode('choice')}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--glass-border)',
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              ← Indietro
            </button>
          </div>

          {/* Search */}
          <SearchBar value={searchQuery} onChange={setSearchQuery} />

          {/* Ingredient Grid */}
          <IngredientGrid
            ingredients={ingredients}
            selectedIds={selectedIds}
            onToggle={handleToggle}
            searchQuery={searchQuery}
          />
        </div>
      )}

      {/* Selected Bar (fixed bottom) - solo se in modalità griglia e ci sono ingredienti */}
      {uiMode === 'grid' && selectedIds.size > 0 && (
        <SelectedBar
          ingredients={ingredients}
          selectedIds={selectedIds}
          onToggle={handleToggle}
          onFind={handleFind}
        />
      )}

      {/* Step-by-step Selection Modal */}
      {isWizardOpen && (
        <StepWizard
          ingredients={ingredients}
          selectedIds={selectedIds}
          onToggle={handleToggle}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          user={user}
          setUiMode={setUiMode}
          clearSelection={() => setSelectedIds(new Set())}
          onFinish={() => {
            setIsWizardOpen(false);
            handleFind();
          }}
          onClose={() => setIsWizardOpen(false)}
        />
      )}

      {/* Auth Modal Popup */}
      {isAuthOpen && (
        <AuthModal
          onClose={() => setIsAuthOpen(false)}
          onAuthSuccess={(u) => setUser(u)}
        />
      )}

      {/* Modal */}
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          ingredientMap={ingredientMap}
          onClose={() => setSelectedRecipe(null)}
          user={user}
          isFavorite={favorites.has(selectedRecipe.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </div>
  );
}
