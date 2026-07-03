-- Tabella per gli ingredienti presenti nel "frigorifero" dell'utente
CREATE TABLE IF NOT EXISTS user_fridge (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL, -- Riferimento a auth.users
  ingredient_id INT REFERENCES ingredients(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, ingredient_id)
);

-- Indice per performance
CREATE INDEX IF NOT EXISTS idx_user_fridge_user ON user_fridge(user_id);

-- Abilita RLS
ALTER TABLE user_fridge ENABLE ROW LEVEL SECURITY;

-- Criteri di sicurezza (RLS) per il frigorifero
CREATE POLICY "Gli utenti possono visualizzare solo il proprio frigorifero"
  ON user_fridge FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Gli utenti possono inserire ingredienti nel proprio frigorifero"
  ON user_fridge FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Gli utenti possono rimuovere ingredienti dal proprio frigorifero"
  ON user_fridge FOR DELETE
  USING (auth.uid() = user_id);
