-- Tabella per i frullati preferiti degli utenti
CREATE TABLE IF NOT EXISTS user_favorites (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL, -- Riferimento all'utente di Supabase Auth (auth.users)
  recipe_id INT REFERENCES recipes(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, recipe_id)
);

-- Indici per performance
CREATE INDEX IF NOT EXISTS idx_user_favorites_user ON user_favorites(user_id);

-- Abilita RLS
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;

-- Criteri di sicurezza (RLS) per i preferiti
CREATE POLICY "Gli utenti possono visualizzare solo i propri preferiti"
  ON user_favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Gli utenti possono inserire i propri preferiti"
  ON user_favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Gli utenti possono eliminare i propri preferiti"
  ON user_favorites FOR DELETE
  USING (auth.uid() = user_id);
