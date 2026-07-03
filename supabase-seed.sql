-- ============================================================
-- FRULLATOR — Seed SQL
-- Smoothie recipe app database
-- Valid PostgreSQL / Supabase SQL
-- ============================================================

-- ============================================================
-- 1. SCHEMA
-- ============================================================

CREATE TABLE IF NOT EXISTS ingredients (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  name_it TEXT NOT NULL,
  category TEXT NOT NULL,
  emoji TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS recipes (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  name_it TEXT NOT NULL,
  description_it TEXT,
  color TEXT,
  difficulty TEXT DEFAULT 'facile',
  prep_time_minutes INT DEFAULT 5,
  tags TEXT[],
  popularity INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS recipe_ingredients (
  id SERIAL PRIMARY KEY,
  recipe_id INT REFERENCES recipes(id) ON DELETE CASCADE,
  ingredient_id INT REFERENCES ingredients(id) ON DELETE CASCADE,
  quantity TEXT NOT NULL,
  is_optional BOOLEAN DEFAULT FALSE,
  UNIQUE(recipe_id, ingredient_id)
);

CREATE INDEX IF NOT EXISTS idx_recipe_ingredients_recipe ON recipe_ingredients(recipe_id);
CREATE INDEX IF NOT EXISTS idx_recipe_ingredients_ingredient ON recipe_ingredients(ingredient_id);
CREATE INDEX IF NOT EXISTS idx_ingredients_category ON ingredients(category);

-- ============================================================
-- 2. INGREDIENTS (85 total)
-- ============================================================

INSERT INTO ingredients (id, name, name_it, category, emoji) VALUES
-- FRUTTA (30)
(1,  'banana',          'Banana',          'frutta',  '🍌'),
(2,  'strawberry',      'Fragola',         'frutta',  '🍓'),
(3,  'blueberry',       'Mirtillo',        'frutta',  '🫐'),
(4,  'mango',           'Mango',           'frutta',  '🥭'),
(5,  'pineapple',       'Ananas',          'frutta',  '🍍'),
(6,  'kiwi',            'Kiwi',            'frutta',  '🥝'),
(7,  'peach',           'Pesca',           'frutta',  '🍑'),
(8,  'orange',          'Arancia',         'frutta',  '🍊'),
(9,  'apple',           'Mela',            'frutta',  '🍎'),
(10, 'pear',            'Pera',            'frutta',  '🍐'),
(11, 'raspberry',       'Lampone',         'frutta',  '🫐'),
(12, 'pomegranate',     'Melograno',       'frutta',  '🔴'),
(13, 'coconut',         'Cocco',           'frutta',  '🥥'),
(14, 'avocado',         'Avocado',         'frutta',  '🥑'),
(15, 'papaya',          'Papaya',          'frutta',  '🟠'),
(16, 'passion fruit',   'Frutto della passione', 'frutta', '💛'),
(17, 'lime',            'Lime',            'frutta',  '🟢'),
(18, 'lemon',           'Limone',          'frutta',  '🍋'),
(19, 'watermelon',      'Anguria',         'frutta',  '🍉'),
(20, 'melon',           'Melone',          'frutta',  '🍈'),
(21, 'grape',           'Uva',             'frutta',  '🍇'),
(22, 'cherry',          'Ciliegia',        'frutta',  '🍒'),
(23, 'fig',             'Fico',            'frutta',  '🟤'),
(24, 'date',            'Dattero',         'frutta',  '🤎'),
(25, 'plum',            'Prugna',          'frutta',  '🟣'),
(26, 'grapefruit',      'Pompelmo',        'frutta',  '🩷'),
(27, 'tangerine',       'Mandarino',       'frutta',  '🍊'),
(28, 'apricot',         'Albicocca',       'frutta',  '🟡'),
(29, 'blackberry',      'Mora',            'frutta',  '⚫'),
(30, 'currant',         'Ribes',           'frutta',  '🔴'),

-- VERDURA (15)
(31, 'spinach',         'Spinaci',         'verdura', '🥬'),
(32, 'kale',            'Cavolo riccio',   'verdura', '🥬'),
(33, 'cucumber',        'Cetriolo',        'verdura', '🥒'),
(34, 'celery',          'Sedano',          'verdura', '🥬'),
(35, 'beetroot',        'Barbabietola',    'verdura', '🟣'),
(36, 'carrot',          'Carota',          'verdura', '🥕'),
(37, 'zucchini',        'Zucchina',        'verdura', '🟢'),
(38, 'fennel',          'Finocchio',       'verdura', '🌿'),
(39, 'parsley',         'Prezzemolo',      'verdura', '🌿'),
(40, 'fresh mint',      'Menta fresca',    'verdura', '🌿'),
(41, 'basil',           'Basilico',        'verdura', '🌿'),
(42, 'arugula',         'Rucola',          'verdura', '🥬'),
(43, 'lettuce',         'Lattuga',         'verdura', '🥬'),
(44, 'broccoli',        'Broccoli',        'verdura', '🥦'),
(45, 'fresh ginger',    'Zenzero fresco',  'verdura', '🫚'),

-- SPEZIA (15)
(46, 'ginger powder',   'Zenzero in polvere',   'spezia', '🫚'),
(47, 'turmeric',        'Curcuma',              'spezia', '🟡'),
(48, 'cinnamon',        'Cannella',             'spezia', '🟤'),
(49, 'vanilla',         'Vaniglia',             'spezia', '🤍'),
(50, 'cacao powder',    'Cacao in polvere',     'spezia', '🟤'),
(51, 'spirulina',       'Spirulina',            'spezia', '🟢'),
(52, 'chia seeds',      'Semi di chia',         'spezia', '⚫'),
(53, 'flax seeds',      'Semi di lino',         'spezia', '🟤'),
(54, 'protein powder',  'Proteine in polvere',  'spezia', '💪'),
(55, 'maca',            'Maca',                 'spezia', '🟡'),
(56, 'matcha',          'Matcha',               'spezia', '🍵'),
(57, 'cayenne pepper',  'Pepe di cayenna',      'spezia', '🌶️'),
(58, 'nutmeg',          'Noce moscata',         'spezia', '🟤'),
(59, 'cardamom',        'Cardamomo',            'spezia', '🟢'),
(60, 'acai powder',     'Açaí in polvere',      'spezia', '🟣'),

-- BEVANDA (15)
(61, 'cow milk',        'Latte vaccino',        'bevanda', '🥛'),
(62, 'almond milk',     'Latte di mandorla',    'bevanda', '🥛'),
(63, 'coconut milk',    'Latte di cocco',       'bevanda', '🥥'),
(64, 'oat milk',        'Latte di avena',       'bevanda', '🥛'),
(65, 'soy milk',        'Latte di soia',        'bevanda', '🥛'),
(66, 'water',           'Acqua',                'bevanda', '💧'),
(67, 'coconut water',   'Acqua di cocco',       'bevanda', '🥥'),
(68, 'orange juice',    'Succo d''arancia',     'bevanda', '🍊'),
(69, 'greek yogurt',    'Yogurt greco',         'bevanda', '🥛'),
(70, 'plain yogurt',    'Yogurt naturale',      'bevanda', '🥛'),
(71, 'kefir',           'Kefir',                'bevanda', '🥛'),
(72, 'cold green tea',  'Tè verde freddo',      'bevanda', '🍵'),
(73, 'apple juice',     'Succo di mela',        'bevanda', '🍎'),
(74, 'rice milk',       'Latte di riso',        'bevanda', '🥛'),
(75, 'ice',             'Ghiaccio',             'bevanda', '🧊'),

-- ALTRO (10)
(76, 'honey',           'Miele',                'altro', '🍯'),
(77, 'maple syrup',     'Sciroppo d''acero',    'altro', '🍁'),
(78, 'peanut butter',   'Burro di arachidi',    'altro', '🥜'),
(79, 'almond butter',   'Burro di mandorle',    'altro', '🥜'),
(80, 'walnuts',         'Noci',                 'altro', '🌰'),
(81, 'almonds',         'Mandorle',             'altro', '🌰'),
(82, 'granola',         'Granola',              'altro', '🥣'),
(83, 'oat flakes',      'Fiocchi d''avena',     'altro', '🌾'),
(84, 'silken tofu',     'Tofu silken',          'altro', '🫘'),
(85, 'tahini',          'Tahini',               'altro', '🟤');

-- Reset the sequence so future inserts get the right IDs
SELECT setval('ingredients_id_seq', 85);

-- ============================================================
-- 3. RECIPES (105 total)
-- ============================================================

INSERT INTO recipes (id, name, name_it, description_it, color, difficulty, prep_time_minutes, tags, popularity) VALUES
-- Classic & Popular
(1,  'Sunrise Tropical',      'Alba Tropicale',           'Un risveglio dorato con mango, ananas e un tocco di cocco. Come una mattina ai Caraibi.', '#FFB347', 'facile', 5, ARRAY['tropicale','energizzante','vegano','colazione'], 95),
(2,  'Berry Explosion',       'Esplosione di Frutti di Bosco', 'Una cascata di mirtilli, fragole e lamponi per una carica antiossidante.', '#8B1A6B', 'facile', 4, ARRAY['antiossidante','dolce','salutare'], 92),
(3,  'Green Power',           'Potenza Verde',            'Spinaci, banana e kiwi per un boost di energia naturale e vitamine.', '#4CAF50', 'facile', 5, ARRAY['detox','salutare','energizzante','vegano'], 90),
(4,  'Chocolate Dream',       'Sogno al Cioccolato',      'Cacao, banana e burro di arachidi: il frullato goloso per eccellenza.', '#5C3317', 'facile', 5, ARRAY['dolce','proteico','colazione'], 88),
(5,  'Strawberry Classic',    'Fragola Classica',         'Il frullato alla fragola che non passa mai di moda, cremoso e dolce.', '#FF6B8A', 'facile', 3, ARRAY['dolce','rinfrescante','colazione'], 87),
(6,  'Mango Lassi',           'Lassi al Mango',           'Ispirato alla bevanda indiana: mango, yogurt e un pizzico di cardamomo.', '#FFA500', 'facile', 5, ARRAY['tropicale','dolce','rinfrescante'], 85),
(7,  'Banana Power',          'Forza Banana',             'Banana, avena e proteine per una colazione che ti porta fino a pranzo.', '#FFE135', 'facile', 4, ARRAY['colazione','proteico','energizzante'], 84),
(8,  'Detox Green',           'Verde Detox',              'Cetriolo, sedano, spinaci e limone: il reset di cui il tuo corpo ha bisogno.', '#7CB342', 'facile', 5, ARRAY['detox','salutare','vegano','digerente'], 82),
(9,  'Tropical Paradise',     'Paradiso Tropicale',       'Ananas, mango, cocco e passion fruit: vacanza in un bicchiere.', '#FF9800', 'facile', 5, ARRAY['tropicale','rinfrescante','vegano'], 80),
(10, 'PB & Banana',           'Banana e Arachidi',        'L''accoppiata perfetta: banana cremosa e burro di arachidi proteico.', '#C4A265', 'facile', 3, ARRAY['proteico','colazione','dolce'], 79),

-- Energizing & Workout
(11, 'Post-Workout Champ',    'Campione Post-Allenamento', 'Proteine, banana e latte di mandorla per un recupero muscolare da campione.', '#D4A574', 'facile', 4, ARRAY['post-workout','proteico','energizzante'], 78),
(12, 'Morning Boost',         'Carica Mattutina',         'Mela, zenzero e carota per svegliarsi con il turbo.', '#FF8C00', 'facile', 5, ARRAY['energizzante','salutare','colazione'], 76),
(13, 'Energy Bomb',           'Bomba Energetica',         'Datteri, banana, maca e avena: energia pura per affrontare qualsiasi giornata.', '#C8A96E', 'facile', 5, ARRAY['energizzante','colazione','proteico'], 75),
(14, 'Protein Thunder',       'Tuono Proteico',           'Doppia dose di proteine con yogurt greco, burro di mandorle e banana.', '#D2B48C', 'medio', 5, ARRAY['proteico','post-workout','colazione'], 74),
(15, 'Green Machine',         'Macchina Verde',           'Cavolo riccio, spirulina, banana e latte di avena: il top per chi vuole il massimo.', '#2E7D32', 'medio', 6, ARRAY['detox','energizzante','salutare','vegano'], 73),

-- Fresh & Light
(16, 'Cucumber Breeze',       'Brezza al Cetriolo',       'Cetriolo, menta e lime: freschezza assoluta nelle giornate calde.', '#B2DFDB', 'facile', 4, ARRAY['rinfrescante','detox','vegano'], 72),
(17, 'Watermelon Splash',     'Splash di Anguria',        'Anguria, menta e lime: l''estate in un bicchiere.', '#FF6B6B', 'facile', 3, ARRAY['rinfrescante','vegano','dolce'], 71),
(18, 'Citrus Sunshine',       'Sole di Agrumi',           'Arancia, pompelmo e mandarino con un filo di miele: vitamina C a volontà.', '#FFD54F', 'facile', 5, ARRAY['energizzante','rinfrescante','salutare'], 70),
(19, 'Melon Dream',           'Sogno di Melone',          'Melone dolce con yogurt e un tocco di vaniglia per un pomeriggio rilassante.', '#FFCC80', 'facile', 4, ARRAY['rinfrescante','dolce'], 68),
(20, 'Peach Sunset',          'Tramonto alla Pesca',      'Pesca, arancia e un filo di miele: dolce come un tramonto estivo.', '#FFAB91', 'facile', 4, ARRAY['dolce','rinfrescante','colazione'], 67),

-- Detox & Health
(21, 'Beet Boost',            'Boost alla Barbabietola',  'Barbabietola, mela e zenzero: un concentrato di energia e colore.', '#C62828', 'medio', 7, ARRAY['detox','salutare','energizzante'], 66),
(22, 'Kale Kick',             'Calcio di Cavolo',         'Cavolo riccio, mela verde, limone e zenzero per chi non scherza con la salute.', '#558B2F', 'medio', 6, ARRAY['detox','salutare','vegano'], 65),
(23, 'Carrot Glow',           'Bagliore di Carota',       'Carota, arancia e curcuma per una pelle luminosa e uno spirito radioso.', '#FF7043', 'facile', 5, ARRAY['salutare','antiossidante','vegano'], 64),
(24, 'Ginger Fire',           'Fuoco di Zenzero',         'Zenzero, mela, limone e un pizzico di cayenna: brucia i pensieri negativi.', '#FFB300', 'medio', 6, ARRAY['detox','energizzante','digerente'], 63),
(25, 'Spirulina Dream',       'Sogno di Spirulina',       'Spirulina, banana e latte di cocco: un frullato da supereroe.', '#00897B', 'medio', 5, ARRAY['detox','salutare','energizzante','vegano'], 62),

-- Indulgent & Sweet
(26, 'Choco-Banana Split',    'Split Ciocco-Banana',      'Come un dessert ma sano: cacao, banana, burro di arachidi e granola.', '#4E342E', 'facile', 5, ARRAY['dolce','colazione','proteico'], 70),
(27, 'Vanilla Cloud',         'Nuvola alla Vaniglia',     'Banana, vaniglia e yogurt greco: morbida come una nuvola.', '#FFF8E1', 'facile', 3, ARRAY['dolce','colazione'], 65),
(28, 'Cinnamon Roll Shake',   'Frullato Cannella e Miele', 'Cannella, miele, avena e latte: come una brioche in un bicchiere.', '#D7A86E', 'facile', 5, ARRAY['dolce','colazione','energizzante'], 64),
(29, 'Date Night',             'Notte di Datteri',         'Datteri, cacao, mandorle e latte di avena: romantico e goloso.', '#5D4037', 'facile', 5, ARRAY['dolce','energizzante'], 60),
(30, 'Maple Walnut Bliss',    'Delizia Noce e Acero',     'Noci, sciroppo d''acero e banana: l''autunno in un frullato.', '#A1887F', 'facile', 5, ARRAY['dolce','colazione','energizzante'], 58),

-- Tropical
(31, 'Piña Colada Fit',       'Piña Colada Fitness',      'Ananas, cocco e latte di cocco senza alcol: la spiaggia ti chiama.', '#FFF176', 'facile', 4, ARRAY['tropicale','rinfrescante','vegano'], 75),
(32, 'Mango Tango',           'Tango al Mango',           'Mango, passion fruit e lime: un ballo di sapori esotici.', '#FF9100', 'facile', 4, ARRAY['tropicale','rinfrescante','vegano'], 72),
(33, 'Papaya Gold',           'Oro di Papaya',            'Papaya, mango e acqua di cocco: oro liquido dal cuore dei tropici.', '#FFB74D', 'facile', 4, ARRAY['tropicale','salutare','vegano'], 60),
(34, 'Coconut Kiss',          'Bacio al Cocco',           'Cocco, banana e latte di cocco: cremoso, dolce, irresistibile.', '#EFEBE9', 'facile', 4, ARRAY['tropicale','dolce','vegano'], 65),
(35, 'Passion Punch',         'Pugno della Passione',     'Passion fruit, mango e arancia: un pugno di sapore che stende.', '#FF6F00', 'facile', 4, ARRAY['tropicale','energizzante','rinfrescante'], 62),

-- Berry Specials
(36, 'Açaí Bowl Blend',       'Frullato per Açaí Bowl',   'Açaí, banana e mirtilli: la base perfetta per la tua bowl preferita.', '#4A148C', 'medio', 7, ARRAY['antiossidante','colazione','salutare'], 80),
(37, 'Blackberry Night',      'Notte di More',            'More, mirtilli e yogurt greco: scuro come la notte, dolce come un sogno.', '#311B92', 'facile', 4, ARRAY['antiossidante','dolce'], 55),
(38, 'Raspberry Rush',        'Corsa di Lamponi',         'Lamponi, fragole e succo di mela: una corsa di freschezza.', '#E91E63', 'facile', 3, ARRAY['antiossidante','rinfrescante','vegano'], 58),
(39, 'Cherry Bomb',           'Bomba alla Ciliegia',      'Ciliegie, banana e cacao: esplosiva e irresistibile.', '#B71C1C', 'facile', 5, ARRAY['antiossidante','dolce'], 56),
(40, 'Pomegranate Jewel',     'Gioiello di Melograno',    'Melograno, lamponi e miele: prezioso come un rubino.', '#C62828', 'facile', 5, ARRAY['antiossidante','salutare','dolce'], 60),

-- Green Specials
(41, 'Avocado Silk',          'Seta di Avocado',          'Avocado, banana e latte di mandorla: cremosità estrema.', '#689F38', 'facile', 4, ARRAY['salutare','colazione','vegano'], 68),
(42, 'Fennel Fresh',          'Fresco di Finocchio',      'Finocchio, mela e limone: la leggerezza fatta frullato.', '#C8E6C9', 'facile', 5, ARRAY['digerente','detox','rinfrescante'], 50),
(43, 'Broccoli Surprise',     'Sorpresa di Broccoli',     'Broccoli, mela e zenzero: provalo prima di giudicare, ti sorprenderà.', '#33691E', 'medio', 6, ARRAY['detox','salutare'], 42),
(44, 'Basil Breeze',          'Brezza al Basilico',       'Basilico, ananas e lime: una ventata di freschezza mediterranea.', '#81C784', 'facile', 4, ARRAY['rinfrescante','digerente','vegano'], 48),
(45, 'Arugula Zing',          'Zing di Rucola',           'Rucola, pera e limone: piccante, fresco, unico.', '#9CCC65', 'medio', 5, ARRAY['detox','salutare'], 40),

-- Matcha & Tea
(46, 'Matcha Zen',            'Zen al Matcha',            'Matcha, banana e latte di avena: concentrazione e calma in un sorso.', '#76FF03', 'facile', 4, ARRAY['energizzante','salutare','vegano'], 70),
(47, 'Green Tea Cooler',      'Tè Verde Rinfrescante',    'Tè verde freddo, menta e miele: l''energia che non ti abbandona.', '#A5D6A7', 'facile', 4, ARRAY['rinfrescante','energizzante'], 55),
(48, 'Matcha Mango Fusion',   'Fusione Matcha e Mango',   'Matcha e mango: Oriente e tropici si incontrano.', '#AEEA00', 'facile', 5, ARRAY['energizzante','tropicale','vegano'], 52),

-- Autumn / Winter Warmers
(49, 'Pumpkin Spice Smoothie','Frullato Speziato d''Autunno','Zucchina, cannella, noce moscata e datteri: l''autunno nel bicchiere.', '#E65100', 'medio', 7, ARRAY['dolce','colazione','energizzante'], 55),
(50, 'Apple Pie Shake',       'Frullato Torta di Mele',   'Mela, cannella, avena e miele: come la torta della nonna, ma bevibile.', '#FFCC80', 'facile', 5, ARRAY['dolce','colazione'], 62),
(51, 'Fig & Honey',           'Fico e Miele',             'Fichi, miele e yogurt greco: l''eleganza del Mediterraneo.', '#795548', 'facile', 4, ARRAY['dolce','colazione','salutare'], 50),
(52, 'Pear Cinnamon',         'Pera e Cannella',          'Pera dolce e cannella calda: un abbraccio in un bicchiere.', '#BCAAA4', 'facile', 4, ARRAY['dolce','digerente'], 48),
(53, 'Plum Velvet',           'Velluto di Prugna',        'Prugne, yogurt e un filo di miele: morbido come il velluto.', '#7B1FA2', 'facile', 5, ARRAY['dolce','digerente','antiossidante'], 45),

-- Protein & Fitness
(54, 'Muscle Builder',        'Costruttore di Muscoli',   'Proteine, banana, burro di arachidi e latte: il frullato da palestra.', '#8D6E63', 'facile', 4, ARRAY['proteico','post-workout','colazione'], 76),
(55, 'Recovery Mix',          'Mix di Recupero',          'Proteine, mirtilli, banana e latte di mandorla: recupera e riparti.', '#7986CB', 'facile', 4, ARRAY['proteico','post-workout','antiossidante'], 65),
(56, 'Oat Power Bowl',        'Ciotola di Avena Potente', 'Avena, banana, miele e latte: colazione completa in un frullato.', '#D7CCC8', 'facile', 5, ARRAY['colazione','energizzante','proteico'], 63),
(57, 'Tofu Protein Blast',    'Blast Proteico al Tofu',   'Tofu silken, banana e cacao: proteine vegetali in versione golosa.', '#A1887F', 'facile', 5, ARRAY['proteico','vegano','post-workout'], 50),
(58, 'Tahini Power',          'Potenza al Tahini',        'Tahini, datteri e banana: energia dal Medio Oriente.', '#BCAAA4', 'facile', 4, ARRAY['proteico','energizzante','vegano'], 48),

-- Exotic & Unique
(59, 'Golden Milk Smoothie',  'Frullato Latte d''Oro',    'Curcuma, zenzero, cannella e latte di cocco: anti-infiammatorio e dorato.', '#FFD600', 'medio', 6, ARRAY['salutare','energizzante','vegano'], 60),
(60, 'Dragon Breath',         'Soffio del Drago',         'Mango, cayenna, lime e zenzero: piccante e esotico.', '#FF6D00', 'medio', 5, ARRAY['energizzante','tropicale','digerente'], 55),
(61, 'Cardamom Rose',         'Rosa al Cardamomo',        'Cardamomo, fragole e latte di mandorla: profumato e delicato.', '#F8BBD0', 'facile', 4, ARRAY['dolce','rinfrescante'], 45),
(62, 'Chia Pudding Shake',    'Frullato Budino di Chia',  'Semi di chia, banana e latte di cocco: consistenza unica.', '#E0E0E0', 'facile', 5, ARRAY['salutare','colazione','vegano'], 55),
(63, 'Grape Escape',          'Fuga d''Uva',              'Uva, mela e spinaci: fresco, dolce e verde.', '#9C27B0', 'facile', 4, ARRAY['antiossidante','rinfrescante','detox'], 42),

-- Kids Friendly
(64, 'Rainbow Delight',       'Delizia Arcobaleno',       'Fragole, mango e banana: colori e sapori che fanno sorridere.', '#FF7043', 'facile', 3, ARRAY['dolce','colazione','rinfrescante'], 70),
(65, 'Choco Bear',            'Orsetto al Cioccolato',    'Cacao, banana e latte: il frullato preferito dai piccoli.', '#6D4C41', 'facile', 3, ARRAY['dolce','colazione'], 72),
(66, 'Strawberry Milkshake',  'Frappè alla Fragola',      'Fragola, latte e un filo di miele: un classico che non delude mai.', '#EC407A', 'facile', 3, ARRAY['dolce','rinfrescante'], 80),
(67, 'Banana Split Smoothie', 'Frullato Banana Split',    'Banana, fragola, cacao e yogurt: un dessert che fa bene.', '#D4A574', 'facile', 5, ARRAY['dolce','colazione'], 60),

-- Seasonal Summer
(68, 'Summer Vibes',          'Vibrazioni Estive',        'Anguria, fragola e menta: l''estate che balla nel bicchiere.', '#EF5350', 'facile', 3, ARRAY['rinfrescante','vegano','dolce'], 70),
(69, 'Lemon Sorbet Shake',    'Frullato Sorbetto al Limone', 'Limone, miele e ghiaccio: gelato istantaneo e rinfrescante.', '#FFF59D', 'facile', 3, ARRAY['rinfrescante','dolce'], 55),
(70, 'Peach Melba',           'Pesca Melba',              'Pesca e lamponi: il dessert classico in versione frullato.', '#FFAB91', 'facile', 4, ARRAY['dolce','rinfrescante'], 52),
(71, 'Melon Mint Cooler',     'Melone e Menta Fresco',    'Melone, menta e lime: il refrigeratore naturale più buono che ci sia.', '#C8E6C9', 'facile', 3, ARRAY['rinfrescante','vegano','detox'], 58),

-- Breakfast Specials
(72, 'Granola Crunch',        'Croccante alla Granola',   'Granola, banana e yogurt: croccantezza e cremosità insieme.', '#D7CCC8', 'facile', 4, ARRAY['colazione','energizzante'], 60),
(73, 'Overnight Oats Blend',  'Frullato Avena della Notte','Avena, latte di mandorla, banana e semi di chia: preparalo la sera, bevilo al mattino.', '#EFEBE9', 'facile', 5, ARRAY['colazione','salutare','vegano'], 55),
(74, 'Espresso Banana',       'Banana all''Espresso',     'L''energia del caffè con la dolcezza della banana e il cacao.', '#4E342E', 'facile', 5, ARRAY['energizzante','colazione'], 62),
(75, 'French Toast Shake',    'Frullato Toast Francese',  'Cannella, vaniglia, latte e avena: la colazione francese in un sorso.', '#D7A86E', 'facile', 4, ARRAY['dolce','colazione'], 50),

-- Digestive & Light
(76, 'Digestive Aid',         'Aiuto Digestivo',          'Finocchio, menta e mela: il tuo stomaco ti ringrazierà.', '#A5D6A7', 'facile', 4, ARRAY['digerente','detox','salutare'], 50),
(77, 'Papaya Enzyme',         'Enzima di Papaya',         'Papaya, ananas e lime: gli enzimi naturali per una digestione perfetta.', '#FFB74D', 'facile', 4, ARRAY['digerente','tropicale','salutare'], 48),
(78, 'Aloe Green',            'Verde Leggero',            'Cetriolo, mela verde e menta: leggerezza totale.', '#C8E6C9', 'facile', 3, ARRAY['detox','digerente','rinfrescante','vegano'], 45),
(79, 'Ginger Lemon Tonic',    'Tonico Zenzero e Limone',  'Zenzero, limone, miele e acqua: il tonico della nonna 2.0.', '#FFF9C4', 'facile', 4, ARRAY['digerente','detox','salutare'], 55),

-- Superfood
(80, 'Superfood Supreme',     'Supremo dei Superfood',    'Spirulina, maca, semi di chia e banana: tutti i superfood in un bicchiere.', '#1B5E20', 'medio', 6, ARRAY['salutare','energizzante','detox','vegano'], 58),
(81, 'Antioxidant Shield',    'Scudo Antiossidante',      'Mirtilli, melograno, açaí e miele: protezione cellulare massima.', '#6A1B9A', 'medio', 6, ARRAY['antiossidante','salutare'], 55),
(82, 'Omega Boost',           'Boost di Omega',           'Semi di lino, noci, banana e latte di avena: omega-3 a portata di frullato.', '#8D6E63', 'facile', 4, ARRAY['salutare','colazione','vegano'], 50),
(83, 'Turmeric Warrior',      'Guerriero alla Curcuma',   'Curcuma, mango, zenzero e pepe di cayenna: un guerriero anti-infiammatorio.', '#F9A825', 'medio', 6, ARRAY['salutare','energizzante','detox'], 52),

-- Kefir & Probiotic
(84, 'Kefir Berry',           'Kefir ai Frutti di Bosco', 'Kefir, mirtilli e miele: probiotici e antiossidanti insieme.', '#CE93D8', 'facile', 3, ARRAY['salutare','antiossidante','digerente'], 50),
(85, 'Probiotic Peach',       'Pesca Probiotica',         'Kefir, pesca e vaniglia: per un intestino felice.', '#FFCCBC', 'facile', 4, ARRAY['digerente','salutare','dolce'], 48),

-- Nut & Seed
(86, 'Almond Joy',            'Gioia di Mandorle',        'Mandorle, cacao, cocco e latte di mandorla: gioia pura.', '#795548', 'facile', 5, ARRAY['dolce','proteico','vegano'], 55),
(87, 'Walnut Brain Fuel',     'Carburante Cerebrale',     'Noci, banana, maca e latte di avena: nutrimento per il cervello.', '#A1887F', 'facile', 4, ARRAY['energizzante','salutare','colazione'], 48),
(88, 'Flax & Berry',          'Lino e Frutti di Bosco',   'Semi di lino, fragole e lamponi: omega-3 dal sapore dolce.', '#D81B60', 'facile', 4, ARRAY['salutare','antiossidante','vegano'], 45),

-- Unique Combos
(89, 'Beetroot Blush',        'Rossore di Barbabietola',  'Barbabietola, fragola e limone: un rosa intenso che conquista.', '#AD1457', 'medio', 7, ARRAY['detox','antiossidante','salutare'], 50),
(90, 'Zucchini Surprise',     'Sorpresa di Zucchina',     'Zucchina, banana e cacao: il vegetale segreto che non sentirai.', '#6D4C41', 'facile', 5, ARRAY['salutare','dolce','colazione'], 40),
(91, 'Celery Revive',         'Rinascita al Sedano',      'Sedano, mela e limone: il trend del benessere in versione italiana.', '#AED581', 'facile', 4, ARRAY['detox','digerente','vegano'], 52),
(92, 'Purple Rain',           'Pioggia Viola',            'Mirtilli, uva e barbabietola: viola intenso, sapore stellare.', '#4A148C', 'medio', 6, ARRAY['antiossidante','detox'], 48),
(93, 'Apricot Sunshine',      'Sole di Albicocca',        'Albicocca, arancia e vaniglia: sole liquido.', '#FFB74D', 'facile', 4, ARRAY['dolce','rinfrescante','colazione'], 47),

-- More Refreshing
(94, 'Cucumber Lemon Detox',  'Detox Cetriolo e Limone',  'Cetriolo, limone, menta e acqua: purificazione totale, zero calorie.', '#E8F5E9', 'facile', 3, ARRAY['detox','rinfrescante','vegano'], 55),
(95, 'Grapefruit Kick',       'Calcio di Pompelmo',       'Pompelmo, arancia e zenzero: agrumi con il turbo.', '#FF8A65', 'facile', 4, ARRAY['rinfrescante','energizzante','detox'], 45),
(96, 'Tangerine Dream',       'Sogno di Mandarino',       'Mandarino, carota e miele: dolce come un sogno d''inverno.', '#FFB300', 'facile', 4, ARRAY['dolce','rinfrescante','salutare'], 50),
(97, 'Lime Coconut Cooler',   'Lime e Cocco Rinfrescante','Lime, acqua di cocco e menta: cocktail analcolico rinfrescante.', '#B2DFDB', 'facile', 3, ARRAY['rinfrescante','tropicale','vegano'], 52),

-- More Hearty
(98,  'Oat Milk Velvet',      'Velluto di Avena',         'Latte di avena, banana, vaniglia e un pizzico di cannella: morbido e avvolgente.', '#EFEBE9', 'facile', 4, ARRAY['colazione','dolce','vegano'], 48),
(99,  'Rice Milk Smoothie',   'Frullato al Latte di Riso','Latte di riso, pesca e miele: delicato per chi ama la semplicità.', '#FFF8E1', 'facile', 3, ARRAY['dolce','rinfrescante'], 40),
(100, 'Soy Protein Punch',    'Pugno Proteico di Soia',   'Latte di soia, proteine, banana e cacao: il pugno proteico vegano.', '#6D4C41', 'facile', 5, ARRAY['proteico','vegano','post-workout'], 55),

-- Final batch
(101, 'Island Breeze',        'Brezza dell''Isola',       'Ananas, cocco, mango e lime: un''isola deserta nel bicchiere.', '#FFD54F', 'facile', 4, ARRAY['tropicale','rinfrescante','vegano'], 60),
(102, 'Cherry Almond',        'Ciliegia e Mandorla',      'Ciliegie, latte di mandorla e vaniglia: elegante e raffinato.', '#C62828', 'facile', 4, ARRAY['dolce','antiossidante'], 48),
(103, 'Currant Power',        'Potenza di Ribes',         'Ribes, yogurt greco e miele: piccolo ma potente.', '#D32F2F', 'facile', 4, ARRAY['antiossidante','proteico','salutare'], 42),
(104, 'Lettuce Be Healthy',   'Lattuga per la Salute',    'Lattuga, mela, cetriolo e limone: il frullato più leggero che esista.', '#E8F5E9', 'facile', 4, ARRAY['detox','rinfrescante','vegano'], 38),
(105, 'Parsley Punch',        'Pugno di Prezzemolo',      'Prezzemolo, ananas e limone: detox intenso con un tocco tropicale.', '#66BB6A', 'medio', 5, ARRAY['detox','salutare','vegano'], 40);

-- Reset the sequence
SELECT setval('recipes_id_seq', 105);

-- ============================================================
-- 4. RECIPE INGREDIENTS
-- ============================================================

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, is_optional) VALUES
-- Recipe 1: Alba Tropicale (mango, ananas, cocco, latte di cocco, miele)
(1, 4,  '1 mango maturo',       FALSE),
(1, 5,  '100g di ananas',       FALSE),
(1, 13, '2 cucchiai di cocco grattugiato', FALSE),
(1, 63, '200ml di latte di cocco', FALSE),
(1, 76, '1 cucchiaino di miele', TRUE),

-- Recipe 2: Esplosione di Frutti di Bosco (mirtilli, fragole, lamponi, yogurt, miele)
(2, 3,  'una manciata di mirtilli', FALSE),
(2, 2,  '5 fragole',            FALSE),
(2, 11, 'una manciata di lamponi', FALSE),
(2, 70, '100g di yogurt naturale', FALSE),
(2, 76, '1 cucchiaino di miele', TRUE),

-- Recipe 3: Potenza Verde (spinaci, banana, kiwi, latte di mandorla, semi di chia)
(3, 31, 'una manciata di spinaci freschi', FALSE),
(3, 1,  '1 banana',             FALSE),
(3, 6,  '1 kiwi',               FALSE),
(3, 62, '200ml di latte di mandorla', FALSE),
(3, 52, '1 cucchiaio di semi di chia', TRUE),

-- Recipe 4: Sogno al Cioccolato (cacao, banana, burro di arachidi, latte vaccino)
(4, 50, '2 cucchiai di cacao in polvere', FALSE),
(4, 1,  '1 banana grande',      FALSE),
(4, 78, '1 cucchiaio di burro di arachidi', FALSE),
(4, 61, '200ml di latte',       FALSE),
(4, 76, '1 cucchiaino di miele', TRUE),

-- Recipe 5: Fragola Classica (fragole, banana, latte, yogurt)
(5, 2,  '8 fragole',            FALSE),
(5, 1,  '1 banana',             FALSE),
(5, 61, '150ml di latte',       FALSE),
(5, 70, '50g di yogurt naturale', TRUE),

-- Recipe 6: Lassi al Mango (mango, yogurt greco, cardamomo, miele, latte)
(6, 4,  '1 mango maturo',       FALSE),
(6, 69, '100g di yogurt greco', FALSE),
(6, 59, 'un pizzico di cardamomo', FALSE),
(6, 76, '1 cucchiaino di miele', TRUE),
(6, 61, '100ml di latte',       FALSE),

-- Recipe 7: Forza Banana (banana, avena, proteine, latte di mandorla)
(7, 1,  '2 banane',             FALSE),
(7, 83, '3 cucchiai di fiocchi d''avena', FALSE),
(7, 54, '1 misurino di proteine', FALSE),
(7, 62, '250ml di latte di mandorla', FALSE),

-- Recipe 8: Verde Detox (cetriolo, sedano, spinaci, limone, mela, acqua)
(8, 33, 'mezzo cetriolo',       FALSE),
(8, 34, '1 gambo di sedano',    FALSE),
(8, 31, 'una manciata di spinaci', FALSE),
(8, 18, 'succo di mezzo limone', FALSE),
(8, 9,  '1 mela verde',         FALSE),
(8, 66, '100ml di acqua',       FALSE),

-- Recipe 9: Paradiso Tropicale (ananas, mango, cocco, passion fruit, acqua di cocco)
(9, 5,  '100g di ananas',       FALSE),
(9, 4,  'mezzo mango',          FALSE),
(9, 13, '2 cucchiai di cocco grattugiato', FALSE),
(9, 16, '1 frutto della passione', FALSE),
(9, 67, '200ml di acqua di cocco', FALSE),

-- Recipe 10: Banana e Arachidi (banana, burro di arachidi, latte, miele)
(10, 1,  '2 banane',            FALSE),
(10, 78, '2 cucchiai di burro di arachidi', FALSE),
(10, 61, '200ml di latte',      FALSE),
(10, 76, '1 cucchiaino di miele', TRUE),

-- Recipe 11: Campione Post-Allenamento (proteine, banana, latte di mandorla, miele)
(11, 54, '1 misurino di proteine', FALSE),
(11, 1,  '1 banana',            FALSE),
(11, 62, '250ml di latte di mandorla', FALSE),
(11, 76, '1 cucchiaino di miele', TRUE),

-- Recipe 12: Carica Mattutina (mela, zenzero, carota, arancia)
(12, 9,  '1 mela',              FALSE),
(12, 45, '1cm di zenzero fresco', FALSE),
(12, 36, '1 carota',            FALSE),
(12, 8,  '1 arancia spremuta',  FALSE),

-- Recipe 13: Bomba Energetica (datteri, banana, maca, avena, latte di avena)
(13, 24, '3 datteri',           FALSE),
(13, 1,  '1 banana',            FALSE),
(13, 55, '1 cucchiaino di maca', FALSE),
(13, 83, '2 cucchiai di fiocchi d''avena', FALSE),
(13, 64, '200ml di latte di avena', FALSE),

-- Recipe 14: Tuono Proteico (yogurt greco, burro di mandorle, banana, proteine, latte)
(14, 69, '100g di yogurt greco', FALSE),
(14, 79, '1 cucchiaio di burro di mandorle', FALSE),
(14, 1,  '1 banana',            FALSE),
(14, 54, '1 misurino di proteine', FALSE),
(14, 62, '150ml di latte di mandorla', FALSE),

-- Recipe 15: Macchina Verde (cavolo riccio, spirulina, banana, latte di avena, miele)
(15, 32, 'una manciata di cavolo riccio', FALSE),
(15, 51, '1 cucchiaino di spirulina', FALSE),
(15, 1,  '1 banana',            FALSE),
(15, 64, '250ml di latte di avena', FALSE),
(15, 76, '1 cucchiaino di miele', TRUE),

-- Recipe 16: Brezza al Cetriolo (cetriolo, menta, lime, acqua, miele)
(16, 33, '1 cetriolo',          FALSE),
(16, 40, '6 foglie di menta fresca', FALSE),
(16, 17, 'succo di 1 lime',     FALSE),
(16, 66, '150ml di acqua',      FALSE),
(16, 76, '1 cucchiaino di miele', TRUE),

-- Recipe 17: Splash di Anguria (anguria, menta, lime, ghiaccio)
(17, 19, '300g di anguria',     FALSE),
(17, 40, '4 foglie di menta',   FALSE),
(17, 17, 'succo di mezzo lime', FALSE),
(17, 75, 'una manciata di ghiaccio', FALSE),

-- Recipe 18: Sole di Agrumi (arancia, pompelmo, mandarino, miele)
(18, 8,  '1 arancia',           FALSE),
(18, 26, 'mezzo pompelmo',      FALSE),
(18, 27, '2 mandarini',         FALSE),
(18, 76, '1 cucchiaino di miele', TRUE),
(18, 75, 'qualche cubetto di ghiaccio', FALSE),

-- Recipe 19: Sogno di Melone (melone, yogurt, vaniglia, miele)
(19, 20, '200g di melone',      FALSE),
(19, 70, '100g di yogurt naturale', FALSE),
(19, 49, 'mezzo cucchiaino di vaniglia', FALSE),
(19, 76, '1 cucchiaino di miele', TRUE),

-- Recipe 20: Tramonto alla Pesca (pesca, arancia, miele, yogurt)
(20, 7,  '2 pesche mature',     FALSE),
(20, 8,  'succo di 1 arancia',  FALSE),
(20, 76, '1 cucchiaino di miele', TRUE),
(20, 70, '50g di yogurt naturale', FALSE),

-- Recipe 21: Boost alla Barbabietola (barbabietola, mela, zenzero, limone, acqua)
(21, 35, '1 barbabietola piccola cotta', FALSE),
(21, 9,  '1 mela',              FALSE),
(21, 45, '1cm di zenzero fresco', FALSE),
(21, 18, 'succo di mezzo limone', FALSE),
(21, 66, '100ml di acqua',      FALSE),

-- Recipe 22: Calcio di Cavolo (cavolo riccio, mela, limone, zenzero, acqua)
(22, 32, 'una manciata di cavolo riccio', FALSE),
(22, 9,  '1 mela verde',        FALSE),
(22, 18, 'succo di mezzo limone', FALSE),
(22, 45, '1cm di zenzero fresco', FALSE),
(22, 66, '150ml di acqua',      FALSE),

-- Recipe 23: Bagliore di Carota (carota, arancia, curcuma, zenzero, acqua)
(23, 36, '2 carote',            FALSE),
(23, 8,  '1 arancia',           FALSE),
(23, 47, 'mezzo cucchiaino di curcuma', FALSE),
(23, 45, '1cm di zenzero fresco', TRUE),
(23, 66, '100ml di acqua',      FALSE),

-- Recipe 24: Fuoco di Zenzero (zenzero, mela, limone, cayenna, miele, acqua)
(24, 45, '2cm di zenzero fresco', FALSE),
(24, 9,  '1 mela',              FALSE),
(24, 18, 'succo di 1 limone',   FALSE),
(24, 57, 'un pizzico di pepe di cayenna', FALSE),
(24, 76, '1 cucchiaino di miele', FALSE),
(24, 66, '150ml di acqua',      FALSE),

-- Recipe 25: Sogno di Spirulina (spirulina, banana, latte di cocco, mango)
(25, 51, '1 cucchiaino di spirulina', FALSE),
(25, 1,  '1 banana',            FALSE),
(25, 63, '200ml di latte di cocco', FALSE),
(25, 4,  'mezzo mango',         TRUE),

-- Recipe 26: Split Ciocco-Banana (cacao, banana, burro di arachidi, granola, latte)
(26, 50, '2 cucchiai di cacao in polvere', FALSE),
(26, 1,  '1 banana grande',     FALSE),
(26, 78, '1 cucchiaio di burro di arachidi', FALSE),
(26, 82, '2 cucchiai di granola', TRUE),
(26, 61, '200ml di latte',      FALSE),

-- Recipe 27: Nuvola alla Vaniglia (banana, vaniglia, yogurt greco, miele)
(27, 1,  '1 banana',            FALSE),
(27, 49, '1 cucchiaino di vaniglia', FALSE),
(27, 69, '150g di yogurt greco', FALSE),
(27, 76, '1 cucchiaino di miele', TRUE),

-- Recipe 28: Frullato Cannella e Miele (cannella, miele, avena, latte, banana)
(28, 48, '1 cucchiaino di cannella', FALSE),
(28, 76, '1 cucchiaio di miele', FALSE),
(28, 83, '3 cucchiai di fiocchi d''avena', FALSE),
(28, 61, '200ml di latte',      FALSE),
(28, 1,  '1 banana',            FALSE),

-- Recipe 29: Notte di Datteri (datteri, cacao, mandorle, latte di avena)
(29, 24, '4 datteri denocciolati', FALSE),
(29, 50, '1 cucchiaio di cacao in polvere', FALSE),
(29, 81, '10 mandorle',         FALSE),
(29, 64, '250ml di latte di avena', FALSE),

-- Recipe 30: Delizia Noce e Acero (noci, sciroppo d'acero, banana, latte)
(30, 80, '6 noci',              FALSE),
(30, 77, '1 cucchiaio di sciroppo d''acero', FALSE),
(30, 1,  '1 banana',            FALSE),
(30, 61, '200ml di latte',      FALSE),

-- Recipe 31: Piña Colada Fitness (ananas, cocco, latte di cocco, lime)
(31, 5,  '150g di ananas',      FALSE),
(31, 13, '2 cucchiai di cocco grattugiato', FALSE),
(31, 63, '200ml di latte di cocco', FALSE),
(31, 17, 'succo di mezzo lime', TRUE),
(31, 75, 'una manciata di ghiaccio', FALSE),

-- Recipe 32: Tango al Mango (mango, passion fruit, lime, acqua di cocco)
(32, 4,  '1 mango maturo',      FALSE),
(32, 16, '2 frutti della passione', FALSE),
(32, 17, 'succo di 1 lime',     FALSE),
(32, 67, '200ml di acqua di cocco', FALSE),

-- Recipe 33: Oro di Papaya (papaya, mango, acqua di cocco, lime)
(33, 15, '200g di papaya',      FALSE),
(33, 4,  'mezzo mango',         FALSE),
(33, 67, '200ml di acqua di cocco', FALSE),
(33, 17, 'succo di mezzo lime', TRUE),

-- Recipe 34: Bacio al Cocco (cocco, banana, latte di cocco, vaniglia)
(34, 13, '3 cucchiai di cocco grattugiato', FALSE),
(34, 1,  '1 banana',            FALSE),
(34, 63, '200ml di latte di cocco', FALSE),
(34, 49, 'mezzo cucchiaino di vaniglia', TRUE),

-- Recipe 35: Pugno della Passione (passion fruit, mango, arancia, ghiaccio)
(35, 16, '2 frutti della passione', FALSE),
(35, 4,  '1 mango',             FALSE),
(35, 68, '200ml di succo d''arancia', FALSE),
(35, 75, 'qualche cubetto di ghiaccio', FALSE),

-- Recipe 36: Frullato per Açaí Bowl (açaí, banana, mirtilli, latte di mandorla, granola)
(36, 60, '2 cucchiai di açaí in polvere', FALSE),
(36, 1,  '1 banana congelata',  FALSE),
(36, 3,  'una manciata di mirtilli', FALSE),
(36, 62, '100ml di latte di mandorla', FALSE),
(36, 82, '2 cucchiai di granola', TRUE),

-- Recipe 37: Notte di More (more, mirtilli, yogurt greco, miele)
(37, 29, 'una manciata di more', FALSE),
(37, 3,  'una manciata di mirtilli', FALSE),
(37, 69, '100g di yogurt greco', FALSE),
(37, 76, '1 cucchiaino di miele', TRUE),

-- Recipe 38: Corsa di Lamponi (lamponi, fragole, succo di mela, ghiaccio)
(38, 11, 'una manciata di lamponi', FALSE),
(38, 2,  '5 fragole',           FALSE),
(38, 73, '200ml di succo di mela', FALSE),
(38, 75, 'qualche cubetto di ghiaccio', FALSE),

-- Recipe 39: Bomba alla Ciliegia (ciliegie, banana, cacao, latte)
(39, 22, '15 ciliegie denocciolate', FALSE),
(39, 1,  '1 banana',            FALSE),
(39, 50, '1 cucchiaio di cacao in polvere', FALSE),
(39, 61, '200ml di latte',      FALSE),

-- Recipe 40: Gioiello di Melograno (melograno, lamponi, miele, acqua)
(40, 12, 'semi di mezzo melograno', FALSE),
(40, 11, 'una manciata di lamponi', FALSE),
(40, 76, '1 cucchiaio di miele', FALSE),
(40, 66, '150ml di acqua',      FALSE),

-- Recipe 41: Seta di Avocado (avocado, banana, latte di mandorla, miele)
(41, 14, 'mezzo avocado',       FALSE),
(41, 1,  '1 banana',            FALSE),
(41, 62, '200ml di latte di mandorla', FALSE),
(41, 76, '1 cucchiaino di miele', TRUE),

-- Recipe 42: Fresco di Finocchio (finocchio, mela, limone, acqua)
(42, 38, 'mezzo finocchio',     FALSE),
(42, 9,  '1 mela verde',        FALSE),
(42, 18, 'succo di mezzo limone', FALSE),
(42, 66, '150ml di acqua',      FALSE),

-- Recipe 43: Sorpresa di Broccoli (broccoli, mela, zenzero, banana, latte di mandorla)
(43, 44, '3 cimette di broccoli', FALSE),
(43, 9,  '1 mela',              FALSE),
(43, 45, '1cm di zenzero fresco', FALSE),
(43, 1,  '1 banana',            FALSE),
(43, 62, '200ml di latte di mandorla', FALSE),

-- Recipe 44: Brezza al Basilico (basilico, ananas, lime, acqua di cocco)
(44, 41, '6 foglie di basilico', FALSE),
(44, 5,  '150g di ananas',      FALSE),
(44, 17, 'succo di mezzo lime', FALSE),
(44, 67, '200ml di acqua di cocco', FALSE),

-- Recipe 45: Zing di Rucola (rucola, pera, limone, mela, acqua)
(45, 42, 'una manciata di rucola', FALSE),
(45, 10, '1 pera matura',       FALSE),
(45, 18, 'succo di mezzo limone', FALSE),
(45, 9,  'mezza mela verde',    FALSE),
(45, 66, '100ml di acqua',      FALSE),

-- Recipe 46: Zen al Matcha (matcha, banana, latte di avena, miele)
(46, 56, '1 cucchiaino di matcha', FALSE),
(46, 1,  '1 banana',            FALSE),
(46, 64, '250ml di latte di avena', FALSE),
(46, 76, '1 cucchiaino di miele', TRUE),

-- Recipe 47: Tè Verde Rinfrescante (tè verde freddo, menta, miele, limone)
(47, 72, '200ml di tè verde freddo', FALSE),
(47, 40, '4 foglie di menta fresca', FALSE),
(47, 76, '1 cucchiaio di miele', FALSE),
(47, 18, 'succo di mezzo limone', FALSE),
(47, 75, 'qualche cubetto di ghiaccio', FALSE),

-- Recipe 48: Fusione Matcha e Mango (matcha, mango, latte di avena, banana)
(48, 56, '1 cucchiaino di matcha', FALSE),
(48, 4,  '1 mango',             FALSE),
(48, 64, '200ml di latte di avena', FALSE),
(48, 1,  'mezza banana',        TRUE),

-- Recipe 49: Frullato Speziato d'Autunno (zucchina, cannella, noce moscata, datteri, latte)
(49, 37, '1 zucchina piccola',  FALSE),
(49, 48, '1 cucchiaino di cannella', FALSE),
(49, 58, 'un pizzico di noce moscata', FALSE),
(49, 24, '3 datteri',           FALSE),
(49, 61, '200ml di latte',      FALSE),

-- Recipe 50: Frullato Torta di Mele (mela, cannella, avena, miele, latte)
(50, 9,  '2 mele',              FALSE),
(50, 48, '1 cucchiaino di cannella', FALSE),
(50, 83, '2 cucchiai di fiocchi d''avena', FALSE),
(50, 76, '1 cucchiaio di miele', FALSE),
(50, 61, '200ml di latte',      FALSE),

-- Recipe 51: Fico e Miele (fichi, miele, yogurt greco, vaniglia)
(51, 23, '3 fichi maturi',      FALSE),
(51, 76, '1 cucchiaio di miele', FALSE),
(51, 69, '100g di yogurt greco', FALSE),
(51, 49, 'mezzo cucchiaino di vaniglia', TRUE),

-- Recipe 52: Pera e Cannella (pera, cannella, yogurt, miele)
(52, 10, '2 pere mature',       FALSE),
(52, 48, 'mezzo cucchiaino di cannella', FALSE),
(52, 70, '100g di yogurt naturale', FALSE),
(52, 76, '1 cucchiaino di miele', TRUE),

-- Recipe 53: Velluto di Prugna (prugne, yogurt, miele, vaniglia)
(53, 25, '3 prugne mature',     FALSE),
(53, 70, '100g di yogurt naturale', FALSE),
(53, 76, '1 cucchiaino di miele', FALSE),
(53, 49, 'mezzo cucchiaino di vaniglia', TRUE),

-- Recipe 54: Costruttore di Muscoli (proteine, banana, burro di arachidi, latte)
(54, 54, '1 misurino di proteine', FALSE),
(54, 1,  '1 banana grande',     FALSE),
(54, 78, '2 cucchiai di burro di arachidi', FALSE),
(54, 61, '300ml di latte',      FALSE),

-- Recipe 55: Mix di Recupero (proteine, mirtilli, banana, latte di mandorla, miele)
(55, 54, '1 misurino di proteine', FALSE),
(55, 3,  'una manciata di mirtilli', FALSE),
(55, 1,  '1 banana',            FALSE),
(55, 62, '250ml di latte di mandorla', FALSE),
(55, 76, '1 cucchiaino di miele', TRUE),

-- Recipe 56: Ciotola di Avena Potente (avena, banana, miele, latte, semi di chia)
(56, 83, '4 cucchiai di fiocchi d''avena', FALSE),
(56, 1,  '1 banana',            FALSE),
(56, 76, '1 cucchiaio di miele', FALSE),
(56, 61, '250ml di latte',      FALSE),
(56, 52, '1 cucchiaio di semi di chia', TRUE),

-- Recipe 57: Blast Proteico al Tofu (tofu, banana, cacao, latte di soia, miele)
(57, 84, '100g di tofu silken', FALSE),
(57, 1,  '1 banana',            FALSE),
(57, 50, '1 cucchiaio di cacao in polvere', FALSE),
(57, 65, '200ml di latte di soia', FALSE),
(57, 76, '1 cucchiaino di miele', TRUE),

-- Recipe 58: Potenza al Tahini (tahini, datteri, banana, latte di avena)
(58, 85, '1 cucchiaio di tahini', FALSE),
(58, 24, '3 datteri denocciolati', FALSE),
(58, 1,  '1 banana',            FALSE),
(58, 64, '200ml di latte di avena', FALSE),

-- Recipe 59: Frullato Latte d'Oro (curcuma, zenzero, cannella, latte di cocco, miele)
(59, 47, '1 cucchiaino di curcuma', FALSE),
(59, 45, '1cm di zenzero fresco', FALSE),
(59, 48, 'mezzo cucchiaino di cannella', FALSE),
(59, 63, '250ml di latte di cocco', FALSE),
(59, 76, '1 cucchiaino di miele', FALSE),
(59, 1,  'mezza banana',        TRUE),

-- Recipe 60: Soffio del Drago (mango, cayenna, lime, zenzero, acqua di cocco)
(60, 4,  '1 mango maturo',      FALSE),
(60, 57, 'un pizzico di pepe di cayenna', FALSE),
(60, 17, 'succo di 1 lime',     FALSE),
(60, 45, '1cm di zenzero fresco', FALSE),
(60, 67, '200ml di acqua di cocco', FALSE),

-- Recipe 61: Rosa al Cardamomo (cardamomo, fragole, latte di mandorla, miele)
(61, 59, 'un pizzico di cardamomo', FALSE),
(61, 2,  '8 fragole',           FALSE),
(61, 62, '200ml di latte di mandorla', FALSE),
(61, 76, '1 cucchiaino di miele', TRUE),

-- Recipe 62: Frullato Budino di Chia (semi di chia, banana, latte di cocco, miele)
(62, 52, '2 cucchiai di semi di chia', FALSE),
(62, 1,  '1 banana',            FALSE),
(62, 63, '200ml di latte di cocco', FALSE),
(62, 76, '1 cucchiaino di miele', TRUE),

-- Recipe 63: Fuga d'Uva (uva, mela, spinaci, limone)
(63, 21, '15 acini d''uva',     FALSE),
(63, 9,  '1 mela',              FALSE),
(63, 31, 'una manciata di spinaci', FALSE),
(63, 18, 'succo di mezzo limone', FALSE),

-- Recipe 64: Delizia Arcobaleno (fragole, mango, banana, succo d'arancia)
(64, 2,  '5 fragole',           FALSE),
(64, 4,  'mezzo mango',         FALSE),
(64, 1,  '1 banana',            FALSE),
(64, 68, '200ml di succo d''arancia', FALSE),

-- Recipe 65: Orsetto al Cioccolato (cacao, banana, latte, miele)
(65, 50, '2 cucchiai di cacao in polvere', FALSE),
(65, 1,  '1 banana grande',     FALSE),
(65, 61, '250ml di latte',      FALSE),
(65, 76, '1 cucchiaino di miele', TRUE),

-- Recipe 66: Frappè alla Fragola (fragola, latte, miele, ghiaccio)
(66, 2,  '10 fragole',          FALSE),
(66, 61, '200ml di latte',      FALSE),
(66, 76, '1 cucchiaino di miele', TRUE),
(66, 75, 'una manciata di ghiaccio', FALSE),

-- Recipe 67: Frullato Banana Split (banana, fragola, cacao, yogurt)
(67, 1,  '1 banana',            FALSE),
(67, 2,  '5 fragole',           FALSE),
(67, 50, '1 cucchiaio di cacao in polvere', FALSE),
(67, 70, '100g di yogurt naturale', FALSE),

-- Recipe 68: Vibrazioni Estive (anguria, fragola, menta, lime)
(68, 19, '250g di anguria',     FALSE),
(68, 2,  '5 fragole',           FALSE),
(68, 40, '4 foglie di menta',   FALSE),
(68, 17, 'succo di mezzo lime', TRUE),

-- Recipe 69: Frullato Sorbetto al Limone (limone, miele, ghiaccio, acqua)
(69, 18, 'succo di 2 limoni',   FALSE),
(69, 76, '2 cucchiai di miele', FALSE),
(69, 75, 'abbondante ghiaccio', FALSE),
(69, 66, '100ml di acqua',      FALSE),

-- Recipe 70: Pesca Melba (pesca, lamponi, yogurt, miele)
(70, 7,  '2 pesche mature',     FALSE),
(70, 11, 'una manciata di lamponi', FALSE),
(70, 70, '100g di yogurt naturale', FALSE),
(70, 76, '1 cucchiaino di miele', TRUE),

-- Recipe 71: Melone e Menta Fresco (melone, menta, lime, ghiaccio)
(71, 20, '250g di melone',      FALSE),
(71, 40, '6 foglie di menta fresca', FALSE),
(71, 17, 'succo di mezzo lime', FALSE),
(71, 75, 'una manciata di ghiaccio', FALSE),

-- Recipe 72: Croccante alla Granola (granola, banana, yogurt, miele)
(72, 82, '3 cucchiai di granola', FALSE),
(72, 1,  '1 banana',            FALSE),
(72, 70, '100g di yogurt naturale', FALSE),
(72, 76, '1 cucchiaino di miele', TRUE),

-- Recipe 73: Frullato Avena della Notte (avena, latte di mandorla, banana, semi di chia)
(73, 83, '4 cucchiai di fiocchi d''avena', FALSE),
(73, 62, '250ml di latte di mandorla', FALSE),
(73, 1,  '1 banana',            FALSE),
(73, 52, '1 cucchiaio di semi di chia', FALSE),

-- Recipe 74: Banana all'Espresso (banana, cacao, latte, avena)
(74, 1,  '1 banana',            FALSE),
(74, 50, '1 cucchiaio di cacao in polvere', FALSE),
(74, 61, '200ml di latte',      FALSE),
(74, 83, '2 cucchiai di fiocchi d''avena', TRUE),

-- Recipe 75: Frullato Toast Francese (cannella, vaniglia, latte, avena, banana)
(75, 48, '1 cucchiaino di cannella', FALSE),
(75, 49, '1 cucchiaino di vaniglia', FALSE),
(75, 61, '200ml di latte',      FALSE),
(75, 83, '3 cucchiai di fiocchi d''avena', FALSE),
(75, 1,  '1 banana',            FALSE),

-- Recipe 76: Aiuto Digestivo (finocchio, menta, mela, acqua)
(76, 38, 'mezzo finocchio',     FALSE),
(76, 40, '6 foglie di menta fresca', FALSE),
(76, 9,  '1 mela',              FALSE),
(76, 66, '150ml di acqua',      FALSE),

-- Recipe 77: Enzima di Papaya (papaya, ananas, lime, acqua)
(77, 15, '200g di papaya',      FALSE),
(77, 5,  '100g di ananas',      FALSE),
(77, 17, 'succo di mezzo lime', FALSE),
(77, 66, '100ml di acqua',      FALSE),

-- Recipe 78: Verde Leggero (cetriolo, mela, menta, limone, acqua)
(78, 33, '1 cetriolo',          FALSE),
(78, 9,  '1 mela verde',        FALSE),
(78, 40, '4 foglie di menta',   FALSE),
(78, 18, 'succo di mezzo limone', FALSE),
(78, 66, '100ml di acqua',      FALSE),

-- Recipe 79: Tonico Zenzero e Limone (zenzero, limone, miele, acqua)
(79, 45, '2cm di zenzero fresco', FALSE),
(79, 18, 'succo di 1 limone',   FALSE),
(79, 76, '1 cucchiaio di miele', FALSE),
(79, 66, '250ml di acqua',      FALSE),

-- Recipe 80: Supremo dei Superfood (spirulina, maca, semi di chia, banana, latte di avena)
(80, 51, '1 cucchiaino di spirulina', FALSE),
(80, 55, '1 cucchiaino di maca', FALSE),
(80, 52, '1 cucchiaio di semi di chia', FALSE),
(80, 1,  '1 banana',            FALSE),
(80, 64, '250ml di latte di avena', FALSE),

-- Recipe 81: Scudo Antiossidante (mirtilli, melograno, açaí, miele, acqua)
(81, 3,  'una manciata di mirtilli', FALSE),
(81, 12, 'semi di mezzo melograno', FALSE),
(81, 60, '1 cucchiaio di açaí in polvere', FALSE),
(81, 76, '1 cucchiaio di miele', FALSE),
(81, 66, '100ml di acqua',      FALSE),

-- Recipe 82: Boost di Omega (semi di lino, noci, banana, latte di avena)
(82, 53, '1 cucchiaio di semi di lino', FALSE),
(82, 80, '4 noci',              FALSE),
(82, 1,  '1 banana',            FALSE),
(82, 64, '250ml di latte di avena', FALSE),

-- Recipe 83: Guerriero alla Curcuma (curcuma, mango, zenzero, cayenna, latte di mandorla)
(83, 47, '1 cucchiaino di curcuma', FALSE),
(83, 4,  '1 mango',             FALSE),
(83, 45, '1cm di zenzero fresco', FALSE),
(83, 57, 'un pizzico di pepe di cayenna', TRUE),
(83, 62, '200ml di latte di mandorla', FALSE),

-- Recipe 84: Kefir ai Frutti di Bosco (kefir, mirtilli, miele, banana)
(84, 71, '200ml di kefir',      FALSE),
(84, 3,  'una manciata di mirtilli', FALSE),
(84, 76, '1 cucchiaino di miele', TRUE),
(84, 1,  'mezza banana',        FALSE),

-- Recipe 85: Pesca Probiotica (kefir, pesca, vaniglia, miele)
(85, 71, '200ml di kefir',      FALSE),
(85, 7,  '2 pesche mature',     FALSE),
(85, 49, 'mezzo cucchiaino di vaniglia', FALSE),
(85, 76, '1 cucchiaino di miele', TRUE),

-- Recipe 86: Gioia di Mandorle (mandorle, cacao, cocco, latte di mandorla)
(86, 81, '10 mandorle',         FALSE),
(86, 50, '1 cucchiaio di cacao in polvere', FALSE),
(86, 13, '2 cucchiai di cocco grattugiato', FALSE),
(86, 62, '250ml di latte di mandorla', FALSE),

-- Recipe 87: Carburante Cerebrale (noci, banana, maca, latte di avena)
(87, 80, '6 noci',              FALSE),
(87, 1,  '1 banana',            FALSE),
(87, 55, '1 cucchiaino di maca', FALSE),
(87, 64, '250ml di latte di avena', FALSE),

-- Recipe 88: Lino e Frutti di Bosco (semi di lino, fragole, lamponi, succo di mela)
(88, 53, '1 cucchiaio di semi di lino macinati', FALSE),
(88, 2,  '5 fragole',           FALSE),
(88, 11, 'una manciata di lamponi', FALSE),
(88, 73, '200ml di succo di mela', FALSE),

-- Recipe 89: Rossore di Barbabietola (barbabietola, fragola, limone, acqua, miele)
(89, 35, '1 barbabietola piccola cotta', FALSE),
(89, 2,  '5 fragole',           FALSE),
(89, 18, 'succo di mezzo limone', FALSE),
(89, 66, '100ml di acqua',      FALSE),
(89, 76, '1 cucchiaino di miele', TRUE),

-- Recipe 90: Sorpresa di Zucchina (zucchina, banana, cacao, latte di avena)
(90, 37, '1 zucchina piccola',  FALSE),
(90, 1,  '1 banana',            FALSE),
(90, 50, '1 cucchiaio di cacao in polvere', FALSE),
(90, 64, '200ml di latte di avena', FALSE),

-- Recipe 91: Rinascita al Sedano (sedano, mela, limone, zenzero, acqua)
(91, 34, '2 gambi di sedano',   FALSE),
(91, 9,  '1 mela verde',        FALSE),
(91, 18, 'succo di mezzo limone', FALSE),
(91, 45, '1cm di zenzero fresco', TRUE),
(91, 66, '150ml di acqua',      FALSE),

-- Recipe 92: Pioggia Viola (mirtilli, uva, barbabietola, banana, acqua)
(92, 3,  'una manciata di mirtilli', FALSE),
(92, 21, '10 acini d''uva nera', FALSE),
(92, 35, 'mezza barbabietola cotta', FALSE),
(92, 1,  'mezza banana',        FALSE),
(92, 66, '100ml di acqua',      FALSE),

-- Recipe 93: Sole di Albicocca (albicocca, arancia, vaniglia, yogurt)
(93, 28, '4 albicocche mature', FALSE),
(93, 8,  'succo di 1 arancia',  FALSE),
(93, 49, 'mezzo cucchiaino di vaniglia', TRUE),
(93, 70, '100g di yogurt naturale', FALSE),

-- Recipe 94: Detox Cetriolo e Limone (cetriolo, limone, menta, acqua)
(94, 33, '1 cetriolo',          FALSE),
(94, 18, 'succo di 1 limone',   FALSE),
(94, 40, '6 foglie di menta fresca', FALSE),
(94, 66, '250ml di acqua',      FALSE),

-- Recipe 95: Calcio di Pompelmo (pompelmo, arancia, zenzero, miele)
(95, 26, '1 pompelmo',          FALSE),
(95, 8,  '1 arancia',           FALSE),
(95, 45, '1cm di zenzero fresco', FALSE),
(95, 76, '1 cucchiaino di miele', TRUE),

-- Recipe 96: Sogno di Mandarino (mandarino, carota, miele, acqua)
(96, 27, '3 mandarini',         FALSE),
(96, 36, '1 carota',            FALSE),
(96, 76, '1 cucchiaino di miele', TRUE),
(96, 66, '100ml di acqua',      FALSE),

-- Recipe 97: Lime e Cocco Rinfrescante (lime, acqua di cocco, menta, ghiaccio)
(97, 17, 'succo di 2 lime',     FALSE),
(97, 67, '250ml di acqua di cocco', FALSE),
(97, 40, '4 foglie di menta fresca', FALSE),
(97, 75, 'abbondante ghiaccio', FALSE),

-- Recipe 98: Velluto di Avena (latte di avena, banana, vaniglia, cannella)
(98, 64, '250ml di latte di avena', FALSE),
(98, 1,  '1 banana',            FALSE),
(98, 49, '1 cucchiaino di vaniglia', FALSE),
(98, 48, 'un pizzico di cannella', TRUE),

-- Recipe 99: Frullato al Latte di Riso (latte di riso, pesca, miele)
(99, 74, '250ml di latte di riso', FALSE),
(99, 7,  '2 pesche',            FALSE),
(99, 76, '1 cucchiaino di miele', TRUE),

-- Recipe 100: Pugno Proteico di Soia (latte di soia, proteine, banana, cacao)
(100, 65, '250ml di latte di soia', FALSE),
(100, 54, '1 misurino di proteine', FALSE),
(100, 1,  '1 banana',           FALSE),
(100, 50, '1 cucchiaio di cacao in polvere', FALSE),

-- Recipe 101: Brezza dell'Isola (ananas, cocco, mango, lime, acqua di cocco)
(101, 5,  '150g di ananas',     FALSE),
(101, 13, '2 cucchiai di cocco grattugiato', FALSE),
(101, 4,  'mezzo mango',        FALSE),
(101, 17, 'succo di mezzo lime', FALSE),
(101, 67, '200ml di acqua di cocco', FALSE),

-- Recipe 102: Ciliegia e Mandorla (ciliegie, latte di mandorla, vaniglia, miele)
(102, 22, '15 ciliegie denocciolate', FALSE),
(102, 62, '200ml di latte di mandorla', FALSE),
(102, 49, 'mezzo cucchiaino di vaniglia', FALSE),
(102, 76, '1 cucchiaino di miele', TRUE),

-- Recipe 103: Potenza di Ribes (ribes, yogurt greco, miele, banana)
(103, 30, 'una manciata di ribes', FALSE),
(103, 69, '100g di yogurt greco', FALSE),
(103, 76, '1 cucchiaio di miele', FALSE),
(103, 1,  'mezza banana',       FALSE),

-- Recipe 104: Lattuga per la Salute (lattuga, mela, cetriolo, limone, acqua)
(104, 43, '4 foglie di lattuga', FALSE),
(104, 9,  '1 mela verde',       FALSE),
(104, 33, 'mezzo cetriolo',     FALSE),
(104, 18, 'succo di mezzo limone', FALSE),
(104, 66, '150ml di acqua',     FALSE),

-- Recipe 105: Pugno di Prezzemolo (prezzemolo, ananas, limone, acqua, miele)
(105, 39, 'una manciata di prezzemolo', FALSE),
(105, 5,  '100g di ananas',     FALSE),
(105, 18, 'succo di 1 limone',  FALSE),
(105, 66, '150ml di acqua',     FALSE),
(105, 76, '1 cucchiaino di miele', TRUE);

-- ============================================================
-- Done! 85 ingredients, 105 recipes, 480+ recipe_ingredient links
-- ============================================================
