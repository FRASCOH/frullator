'use client';

import { useState } from 'react';

const STEPS = [
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

export default function StepWizard({ ingredients, selectedIds, onToggle, onFinish, onClose }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const step = STEPS[currentStepIndex];
  const stepIngredients = ingredients.filter((ing) => ing.category === step.category);

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

  const currentStepSelectedCount = stepIngredients.filter((ing) => selectedIds.has(ing.id)).length;

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

        {/* Ingredients Grid (Scrollable) */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', minHeight: '250px' }}>
          <div className="ingredient-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(85px, 1fr))' }}>
            {stepIngredients.map((ing) => {
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
