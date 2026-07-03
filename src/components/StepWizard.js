'use client';

import { useState } from 'react';

const STEPS = [
  {
    type: 'initial-mode',
    title: 'Da dove iniziamo? 🍹',
    subtitle: 'Vuoi usare gli ingredienti salvati nel tuo frigo o comporne uno nuovo da zero?',
  },
  {
    type: 'filters',
    title: 'Preferenze alimentari 🌿',
    subtitle: 'Quali filtri dietetici o nutrizionali preferisci?',
  },
  {
    category: 'bevanda',
    title: 'Scegli la base liquida 🥛',
    subtitle: 'Quale liquido o bevanda vuoi usare come base?',
  },
  {
    category: 'frutta',
    title: 'Scegli la frutta 🍎',
    subtitle: 'Aggiungi la frutta fresca o congelata che preferisci.',
  },
  {
    category: 'verdura',
    title: 'Aggiungi la verdura 🥬',
    subtitle: 'Opzionale: aggiungi una nota verde o salutare.',
  },
  {
    category: 'spezia',
    title: 'Spezie e Superfood 🌶️',
    subtitle: 'Opzionale: un tocco di sapore extra o nutrienti.',
  },
  {
    category: 'altro',
    title: 'Altri ingredienti 🥜',
    subtitle: 'Opzionale: dolcificanti, burro di noci o granola.',
  },
];

export default function StepWizard({ 
  ingredients, 
  selectedIds, 
  onToggle, 
  onFinish, 
  onClose,
  activeFilter,
  setActiveFilter,
  user,
  setUiMode,
  clearSelection
}) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const step = STEPS[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      onFinish();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 900 }}>
      <div className="modal-content" style={{ maxHeight: '90dvh', display: 'flex', flexDirection: 'column' }}>
        <div className="modal-handle">
          <div className="modal-handle-bar" />
        </div>

        {/* Wizard Header */}
        <div style={{ padding: '8px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-accent)', fontWeight: 600, textTransform: 'uppercase' }}>
              Step {currentStepIndex + 1} di {STEPS.length}
            </span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '2px 0 4px', fontFamily: 'var(--font-display)' }}>
              {step.title}
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
              {step.subtitle}
            </p>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'var(--surface)',
              border: 'none',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              fontSize: '0.8rem'
            }}
          >
            ✕
          </button>
        </div>

        {/* Content (Scrollable) */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', minHeight: '250px' }}>
          {step.type === 'initial-mode' ? (
            /* Scelta Iniziale: Frigo vs Seleziona da zero */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}>
              {user ? (
                <button
                  className="wizard-cta-button primary"
                  onClick={() => {
                    // Chiude il modal ed effettua direttamente il matching/ricerca
                    onFinish();
                  }}
                  style={{ width: '100%', padding: '20px', borderRadius: 'var(--radius-xl)' }}
                >
                  🧊 Usa il mio Frigorifero
                  <span className="wizard-cta-subtext" style={{ color: 'rgba(255,255,255,0.8)', marginTop: '4px' }}>
                    Trova ricette usando quello che hai già salvato
                  </span>
                </button>
              ) : (
                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px dashed var(--glass-border)', borderRadius: 'var(--radius-lg)', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  💡 Se avessi effettuato l'accesso, potresti usare gli ingredienti salvati nel tuo frigorifero persistente.
                </div>
              )}
              
              <button
                className="wizard-cta-button"
                onClick={() => {
                  // Svuota la selezione per comporne uno da zero
                  clearSelection();
                  handleNext();
                }}
                style={{ width: '100%', padding: '20px', borderRadius: 'var(--radius-xl)' }}
              >
                🍎 Seleziona nuovi ingredienti
                <span className="wizard-cta-subtext" style={{ marginTop: '4px' }}>
                  Azzera la selezione e componi da capo
                </span>
              </button>
            </div>
          ) : step.type === 'filters' ? (
            /* Preferenze alimentari / Filtri */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
              <button
                className={`category-tab ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
                style={{ width: '100%', padding: '16px', fontSize: '1rem', justifyContent: 'flex-start', borderRadius: 'var(--radius-lg)' }}
              >
                🥗 Nessun filtro (Tutti i frullati)
              </button>
              <button
                className={`category-tab ${activeFilter === 'vegan' ? 'active' : ''}`}
                onClick={() => setActiveFilter('vegan')}
                style={{ width: '100%', padding: '16px', fontSize: '1rem', justifyContent: 'flex-start', borderRadius: 'var(--radius-lg)' }}
              >
                🌱 Vegano
              </button>
              <button
                className={`category-tab ${activeFilter === 'lactose-free' ? 'active' : ''}`}
                onClick={() => setActiveFilter('lactose-free')}
                style={{ width: '100%', padding: '16px', fontSize: '1rem', justifyContent: 'flex-start', borderRadius: 'var(--radius-lg)' }}
              >
                🥛 Senza Lattosio
              </button>
              <button
                className={`category-tab ${activeFilter === 'high-protein' ? 'active' : ''}`}
                onClick={() => setActiveFilter('high-protein')}
                style={{ width: '100%', padding: '16px', fontSize: '1rem', justifyContent: 'flex-start', borderRadius: 'var(--radius-lg)' }}
              >
                💪 Proteici (almeno 15g)
              </button>
              <button
                className={`category-tab ${activeFilter === 'low-calorie' ? 'active' : ''}`}
                onClick={() => setActiveFilter('low-calorie')}
                style={{ width: '100%', padding: '16px', fontSize: '1rem', justifyContent: 'flex-start', borderRadius: 'var(--radius-lg)' }}
              >
                ⚡ Leggeri (massimo 250 kcal)
              </button>
            </div>
          ) : (
            /* Ingredienti classici per categoria */
            <div className="ingredient-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(85px, 1fr))' }}>
              {ingredients
                .filter((ing) => ing.category === step.category && ing.id !== 66 && ing.id !== 75)
                .map((ing) => {
                  const isSelected = selectedIds.has(ing.id);
                  return (
                    <button
                      key={ing.id}
                      id={`wizard-ingredient-${ing.id}`}
                      className={`ingredient-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => onToggle(ing.id)}
                      aria-pressed={isSelected}
                      style={{ padding: '12px 4px 8px' }}
                    >
                      <span className="ingredient-check" style={{ top: 2, right: 2, width: 16, height: 16, fontSize: '0.55rem' }}>✓</span>
                      <span className="ingredient-emoji" style={{ fontSize: '1.4rem' }}>{ing.emoji}</span>
                      <span className="ingredient-name" style={{ fontSize: '0.65rem' }}>{ing.name_it}</span>
                    </button>
                  );
                })}
            </div>
          )}
        </div>

        {/* Wizard Footer (Sticky) */}
        <div 
          style={{
            padding: '16px 20px',
            borderTop: '1px solid var(--glass-border)',
            background: 'var(--bg-secondary)',
            display: 'flex',
            gap: '12px',
            justifyContent: 'space-between'
          }}
        >
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            style={{
              flex: 1,
              padding: '12px',
              background: 'var(--surface)',
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--radius-lg)',
              color: currentStepIndex === 0 ? 'var(--text-muted)' : 'var(--text-secondary)',
              cursor: currentStepIndex === 0 ? 'not-allowed' : 'pointer',
              fontSize: '0.85rem',
              fontWeight: 500
            }}
          >
            Indietro
          </button>

          <button
            onClick={handleNext}
            style={{
              flex: 2,
              padding: '12px',
              background: 'var(--gradient-primary)',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              color: 'white',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 600,
              boxShadow: 'var(--shadow-glow-primary)'
            }}
          >
            {currentStepIndex === STEPS.length - 1 ? 'Trova Frullati 🍹' : 'Avanti'}
          </button>
        </div>
      </div>
    </div>
  );
}
