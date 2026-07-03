import React from 'react';

// Genera un'icona vettoriale coerente a partire dall'emoji o dal nome dell'ingrediente per evitare buchi visivi.
export default function IngredientIcon({ name, emoji, category, style }) {
  // Se c'è una emoji valida definita, usiamo quella come sorgente/icona primaria
  if (emoji && emoji.trim() !== '') {
    return (
      <span 
        style={{ 
          fontSize: '1.4rem', 
          width: '38px',
          height: '38px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          userSelect: 'none',
          ...style 
        }}
      >
        {emoji}
      </span>
    );
  }

  // Genera un badge vettoriale minimale colorato come alternativa universale se manca l'emoji nel DB
  const firstLetter = name ? name.trim().charAt(0).toUpperCase() : '🍉';
  
  // Colori coerenti in base alle categorie dell'ingrediente
  let bgColor = 'var(--surface-hover)';
  let textColor = 'var(--text-secondary)';
  
  if (category === 'frutta') {
    bgColor = 'rgba(239, 68, 68, 0.15)';
    textColor = '#ef4444';
  } else if (category === 'verdura') {
    bgColor = 'rgba(16, 185, 129, 0.15)';
    textColor = '#10b981';
  } else if (category === 'bevanda') {
    bgColor = 'rgba(6, 182, 212, 0.15)';
    textColor = '#06b6d4';
  } else if (category === 'spezia') {
    bgColor = 'rgba(245, 158, 11, 0.15)';
    textColor = '#f59e0b';
  } else if (category === 'altro') {
    bgColor = 'rgba(139, 92, 246, 0.15)';
    textColor = '#a78bfa';
  }

  return (
    <div
      style={{
        width: '38px',
        height: '38px',
        borderRadius: '50%',
        backgroundColor: bgColor,
        color: textColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '1rem',
        border: `1px solid ${textColor}40`,
        fontFamily: 'var(--font-display)',
        boxShadow: 'var(--shadow-sm)',
        userSelect: 'none',
        flexShrink: 0,
        ...style
      }}
    >
      {firstLetter}
    </div>
  );
}
