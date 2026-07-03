import React from 'react';

// Fornisce illustrazioni fotografiche o grafiche di alta qualità per ogni ingrediente 
// interrogando un catalogo di immagini libere da royalty (Unsplash Food & Ingredient CDN).
export default function IngredientIcon({ name, emoji, category, style }) {
  // Puliamo il nome dell'ingrediente in inglese o italiano per ottenere la query migliore
  const query = name ? encodeURIComponent(name.trim().toLowerCase()) : 'food';

  // Usiamo il CDN di immagini di Unsplash con parametri di ottimizzazione
  // w=80 (larghezza ridotta per mobile), auto=format (WebP ad alte prestazioni), q=80 (ottima compressione), fit=crop (centrato)
  const imageUrl = `https://images.unsplash.com/photo-1610348725531-843dff163e2c?auto=format&fit=crop&w=80&q=80&q=food,${query}`;

  // Mapping specifico per alcune immagini per renderle super precise e bellissime
  let fallbackImage = 'https://images.unsplash.com/photo-1610348725531-843dff163e2c?auto=format&fit=crop&w=80&q=80'; // generico verdura/frutta
  
  if (category === 'frutta') {
    fallbackImage = 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=80&q=80'; // ananas / frutta generica
  } else if (category === 'bevanda') {
    fallbackImage = 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=80&q=80'; // latte / bevanda
  } else if (category === 'spezia') {
    fallbackImage = 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=80&q=80'; // spezie
  } else if (category === 'altro') {
    fallbackImage = 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=80&q=80'; // cioccolato / dolci
  }

  // Costruiamo la URL Unsplash dinamica basata sull'ingrediente specifico
  // Per fare in modo che restituisca un'immagine sensata per ingrediente usiamo parole chiave pre-impostate
  let specificImage = null;
  const nameLower = name ? name.toLowerCase() : '';

  if (nameLower.includes('banana')) {
    specificImage = 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=80&q=80';
  } else if (nameLower.includes('mela')) {
    specificImage = 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=80&q=80';
  } else if (nameLower.includes('fragol')) {
    specificImage = 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=80&q=80';
  } else if (nameLower.includes('mirtill')) {
    specificImage = 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=80&q=80';
  } else if (nameLower.includes('arancia') || nameLower.includes('arance')) {
    specificImage = 'https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=80&q=80';
  } else if (nameLower.includes('pesca') || nameLower.includes('pesche')) {
    specificImage = 'https://images.unsplash.com/photo-1595124253363-c5c29427e135?auto=format&fit=crop&w=80&q=80';
  } else if (nameLower.includes('limon')) {
    specificImage = 'https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=80&q=80';
  } else if (nameLower.includes('avocado')) {
    specificImage = 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=80&q=80';
  } else if (nameLower.includes('latte di mandorla')) {
    specificImage = 'https://images.unsplash.com/photo-1568651343859-a54823136894?auto=format&fit=crop&w=80&q=80';
  } else if (nameLower.includes('latte vaccino')) {
    specificImage = 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=80&q=80';
  } else if (nameLower.includes('latte di cocco')) {
    specificImage = 'https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=80&q=80';
  } else if (nameLower.includes('yogurt greco') || nameLower.includes('yogurt')) {
    specificImage = 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=80&q=80';
  } else if (nameLower.includes('miele')) {
    specificImage = 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=80&q=80';
  } else if (nameLower.includes('cacao') || nameLower.includes('cioccolato')) {
    specificImage = 'https://images.unsplash.com/photo-1511381939415-e44015469834?auto=format&fit=crop&w=80&q=80';
  } else if (nameLower.includes('zenzero')) {
    specificImage = 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=80&q=80';
  } else if (nameLower.includes('cannella')) {
    specificImage = 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=80&q=80';
  } else if (nameLower.includes('avena')) {
    specificImage = 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=80&q=80';
  } else if (nameLower.includes('spinac')) {
    specificImage = 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=80&q=80';
  } else if (nameLower.includes('carot')) {
    specificImage = 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=80&q=80';
  } else if (nameLower.includes('menta')) {
    specificImage = 'https://images.unsplash.com/photo-1608797178974-15b35a61d121?auto=format&fit=crop&w=80&q=80';
  } else if (nameLower.includes('arachid') || nameLower.includes('burro')) {
    specificImage = 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=80&q=80';
  } else if (nameLower.includes('mandorl')) {
    specificImage = 'https://images.unsplash.com/photo-1508888620972-73897977a412?auto=format&fit=crop&w=80&q=80';
  } else if (nameLower.includes('chia')) {
    specificImage = 'https://images.unsplash.com/photo-1584736340660-f8fa266946bd?auto=format&fit=crop&w=80&q=80';
  }

  const finalUrl = specificImage || fallbackImage;

  return (
    <div
      style={{
        width: '38px',
        height: '38px',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid var(--glass-border)',
        backgroundColor: 'var(--surface-hover)',
        userSelect: 'none',
        flexShrink: 0,
        ...style
      }}
    >
      <img
        src={finalUrl}
        alt={name}
        loading="lazy"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        onError={(e) => {
          // In caso di errore nel caricamento immagine, sostituiamo con l'emoji
          e.target.style.display = 'none';
          e.target.parentNode.innerHTML = `<span style="font-size:1.3rem">${emoji || '🍉'}</span>`;
        }}
      />
    </div>
  );
}
