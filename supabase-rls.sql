-- Frullator — Row Level Security Policies
-- Run this AFTER the seed data in Supabase SQL Editor

-- Enable RLS on all tables
ALTER TABLE ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_ingredients ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access to all tables
CREATE POLICY "Allow public read access on ingredients"
  ON ingredients FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access on recipes"
  ON recipes FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access on recipe_ingredients"
  ON recipe_ingredients FOR SELECT
  USING (true);

-- Allow anonymous update on recipes (for popularity counter)
CREATE POLICY "Allow public update popularity on recipes"
  ON recipes FOR UPDATE
  USING (true)
  WITH CHECK (true);
