// Tabella dei valori nutrizionali stimati per ogni ingrediente (per porzione media utilizzata nei frullati)
export const INGREDIENT_NUTRITION = {
  // FRUTTA
  1: { kcal: 105, carb: 27, prot: 1.3, fat: 0.3 },   // Banana
  2: { kcal: 32, carb: 7.7, prot: 0.7, fat: 0.3 },   // Fragola
  3: { kcal: 57, carb: 14, prot: 0.7, fat: 0.3 },    // Mirtillo
  4: { kcal: 150, carb: 38, prot: 2, fat: 0.6 },     // Mango
  5: { kcal: 50, carb: 13, prot: 0.5, fat: 0.1 },    // Ananas
  6: { kcal: 61, carb: 15, prot: 1.1, fat: 0.5 },    // Kiwi
  7: { kcal: 59, carb: 14, prot: 1.4, fat: 0.4 },    // Pesca
  8: { kcal: 62, carb: 15, prot: 1.2, fat: 0.2 },    // Arancia
  9: { kcal: 95, carb: 25, prot: 0.5, fat: 0.3 },    // Mela
  10: { kcal: 100, carb: 27, prot: 0.6, fat: 0.2 },  // Pera
  11: { kcal: 64, carb: 15, prot: 1.5, fat: 0.8 },   // Lampone
  12: { kcal: 83, carb: 19, prot: 1.7, fat: 1.2 },   // Melograno
  13: { kcal: 110, carb: 10, prot: 1, fat: 10 },     // Cocco grattugiato (20g)
  14: { kcal: 160, carb: 8.5, prot: 2, fat: 15 },    // Avocado (mezzo)
  15: { kcal: 120, carb: 30, prot: 1.3, fat: 0.4 },  // Papaya
  16: { kcal: 17, carb: 4.2, prot: 0.4, fat: 0.1 },  // Passion fruit (1 frutto)
  17: { kcal: 11, carb: 3.7, prot: 0.3, fat: 0.1 },  // Lime
  18: { kcal: 12, carb: 4, prot: 0.4, fat: 0.1 },    // Limone
  19: { kcal: 90, carb: 22, prot: 1.8, fat: 0.4 },   // Anguria
  20: { kcal: 60, carb: 15, prot: 1.5, fat: 0.3 },   // Melone
  21: { kcal: 104, carb: 27, prot: 1.1, fat: 0.2 },  // Uva
  22: { kcal: 77, carb: 19, prot: 1.6, fat: 0.3 },   // Ciliegia
  23: { kcal: 110, carb: 28, prot: 1.1, fat: 0.4 },  // Fico
  24: { kcal: 260, carb: 66, prot: 2, fat: 0.4 },    // Dattero (4 datteri)
  25: { kcal: 46, carb: 11, prot: 0.7, fat: 0.3 },   // Prugna
  26: { kcal: 52, carb: 13, prot: 0.9, fat: 0.2 },   // Pompelmo (mezzo)
  27: { kcal: 40, carb: 10, prot: 0.7, fat: 0.2 },   // Mandarino
  28: { kcal: 48, carb: 11, prot: 1.4, fat: 0.4 },   // Albicocca
  29: { kcal: 62, carb: 14, prot: 2, fat: 0.7 },     // Mora
  30: { kcal: 56, carb: 13, prot: 1.4, fat: 0.2 },   // Ribes

  // VERDURA
  31: { kcal: 7, carb: 1, prot: 0.9, fat: 0.1 },     // Spinaci (manciata)
  32: { kcal: 15, carb: 3, prot: 1.3, fat: 0.2 },    // Cavolo riccio (manciata)
  33: { kcal: 15, carb: 3.5, prot: 0.6, fat: 0.1 },  // Cetriolo (mezzo)
  34: { kcal: 10, carb: 2, prot: 0.5, fat: 0.1 },    // Sedano (1 gambo)
  35: { kcal: 43, carb: 10, prot: 1.6, fat: 0.2 },   // Barbabietola
  36: { kcal: 41, carb: 10, prot: 0.9, fat: 0.2 },   // Carota (1 carota)
  37: { kcal: 17, carb: 3.1, prot: 1.2, fat: 0.3 },  // Zucchina
  38: { kcal: 27, carb: 6, prot: 1.1, fat: 0.2 },    // Finocchio (mezzo)
  39: { kcal: 4, carb: 0.6, prot: 0.3, fat: 0.1 },   // Prezzemolo (manciata)
  40: { kcal: 2, carb: 0.5, prot: 0.1, fat: 0.0 },   // Menta fresca
  41: { kcal: 2, carb: 0.3, prot: 0.3, fat: 0.1 },   // Basilico
  42: { kcal: 5, carb: 0.7, prot: 0.5, fat: 0.1 },   // Rucola
  43: { kcal: 8, carb: 1.5, prot: 0.6, fat: 0.1 },   // Lattuga
  44: { kcal: 15, carb: 3, prot: 1.2, fat: 0.2 },    // Broccoli (3 cimette)
  45: { kcal: 5, carb: 1.2, prot: 0.1, fat: 0.1 },   // Zenzero fresco (1cm)

  // SPEZIE / SUPERFOOD
  46: { kcal: 6, carb: 1.2, prot: 0.2, fat: 0.1 },   // Zenzero in polvere
  47: { kcal: 8, carb: 1.4, prot: 0.2, fat: 0.2 },   // Curcuma
  48: { kcal: 6, carb: 2.1, prot: 0.1, fat: 0.1 },   // Cannella
  49: { kcal: 5, carb: 1.2, prot: 0.0, fat: 0.0 },   // Vaniglia
  50: { kcal: 40, carb: 6, prot: 2, fat: 1.5 },      // Cacao in polvere
  51: { kcal: 10, carb: 0.7, prot: 2, fat: 0.3 },    // Spirulina
  52: { kcal: 60, carb: 5, prot: 2, fat: 4 },        // Semi di chia
  53: { kcal: 55, carb: 3, prot: 1.9, fat: 4.2 },    // Semi di lino
  54: { kcal: 120, carb: 3, prot: 25, fat: 1.5 },    // Proteine in polvere
  55: { kcal: 18, carb: 4, prot: 0.5, fat: 0.1 },    // Maca
  56: { kcal: 10, carb: 1.5, prot: 1, fat: 0.1 },    // Matcha
  57: { kcal: 2, carb: 0.5, prot: 0.1, fat: 0.1 },   // Pepe di cayenna
  58: { kcal: 6, carb: 0.6, prot: 0.1, fat: 0.4 },   // Noce moscata
  59: { kcal: 6, carb: 1.4, prot: 0.2, fat: 0.1 },   // Cardamomo
  60: { kcal: 40, carb: 8, prot: 1, fat: 1 },        // Acai in polvere

  // BEVANDE
  61: { kcal: 122, carb: 10, prot: 7, fat: 6.5 },    // Latte vaccino (200ml)
  62: { kcal: 30, carb: 1, prot: 1, fat: 2.5 },      // Latte di mandorla (200ml)
  63: { kcal: 154, carb: 3, prot: 1.4, fat: 15 },    // Latte di cocco (200ml)
  64: { kcal: 90, carb: 16, prot: 2, fat: 1.5 },     // Latte di avena (200ml)
  65: { kcal: 80, carb: 4, prot: 7, fat: 4 },        // Latte di soia (200ml)
  66: { kcal: 0, carb: 0, prot: 0, fat: 0 },         // Acqua
  67: { kcal: 38, carb: 9, prot: 1.4, fat: 0.4 },    // Acqua di cocco (200ml)
  68: { kcal: 90, carb: 20, prot: 1.5, fat: 0.2 },   // Succo d'arancia (200ml)
  69: { kcal: 130, carb: 6, prot: 15, fat: 4.5 },    // Yogurt greco (150g)
  70: { kcal: 65, carb: 5, prot: 4, fat: 3.5 },      // Yogurt naturale (100g)
  71: { kcal: 100, carb: 7.5, prot: 6, fat: 4.5 },   // Kefir (150ml)
  72: { kcal: 2, carb: 0, prot: 0.2, fat: 0 },       // Tè verde freddo (200ml)
  73: { kcal: 92, carb: 22, prot: 0.2, fat: 0.2 },   // Succo di mela (200ml)
  74: { kcal: 94, carb: 19, prot: 0.4, fat: 2 },     // Latte di riso (200ml)
  75: { kcal: 0, carb: 0, prot: 0, fat: 0 },         // Ghiaccio

  // ALTRO
  76: { kcal: 64, carb: 17, prot: 0.1, fat: 0.0 },   // Miele (1 cucchiaio)
  77: { kcal: 52, carb: 13, prot: 0.0, fat: 0.0 },   // Sciroppo d'acero (1 cucchiaio)
  78: { kcal: 188, carb: 6, prot: 8, fat: 16 },      // Burro di arachidi (1 cucchiaio)
  79: { kcal: 190, carb: 6, prot: 7, fat: 18 },      // Burro di mandorle (1 cucchiaio)
  80: { kcal: 185, carb: 4, prot: 4.3, fat: 18.5 },  // Noci (30g)
  81: { kcal: 162, carb: 6, prot: 6, fat: 14 },      // Mandorle (30g)
  82: { kcal: 130, carb: 20, prot: 3, fat: 5 },      // Granola (30g)
  83: { kcal: 110, carb: 19, prot: 4, fat: 2 },      // Fiocchi d'avena (30g)
  84: { kcal: 60, carb: 2, prot: 5.5, fat: 3 },      // Tofu silken (100g)
  85: { kcal: 89, carb: 3, prot: 2.5, fat: 8 },      // Tahini (1 cucchiaio)
};

// Calcola i valori nutrizionali totali per una ricetta
export function calculateRecipeNutrition(recipeIngredients) {
  let kcal = 0;
  let carb = 0;
  let prot = 0;
  let fat = 0;

  recipeIngredients.forEach((ri) => {
    // Non calcoliamo gli ingredienti opzionali nel conteggio base
    if (ri.is_optional) return;

    const nut = INGREDIENT_NUTRITION[ri.ingredient_id];
    if (nut) {
      kcal += nut.kcal;
      carb += nut.carb;
      prot += nut.prot;
      fat += nut.fat;
    }
  });

  return {
    kcal: Math.round(kcal),
    carb: Math.round(carb * 10) / 10,
    prot: Math.round(prot * 10) / 10,
    fat: Math.round(fat * 10) / 10,
  };
}
