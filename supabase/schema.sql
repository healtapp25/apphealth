-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT auth.uid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  weight DECIMAL(5,2),
  height INTEGER,
  birth_date DATE,
  gender TEXT CHECK (gender IN ('masculino', 'feminino', 'outro')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_goals table
CREATE TABLE IF NOT EXISTS user_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  water_goal_ml INTEGER NOT NULL DEFAULT 2000,
  calories_goal INTEGER NOT NULL DEFAULT 2000,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create daily_progress table
CREATE TABLE IF NOT EXISTS daily_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  water_consumed_ml INTEGER DEFAULT 0,
  calories_consumed INTEGER DEFAULT 0,
  water_goal_achieved BOOLEAN DEFAULT FALSE,
  calories_goal_achieved BOOLEAN DEFAULT FALSE,
  xp_earned INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Create user_levels table
CREATE TABLE IF NOT EXISTS user_levels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  current_level INTEGER DEFAULT 1,
  current_xp INTEGER DEFAULT 0,
  total_xp INTEGER DEFAULT 0,
  avatar_image TEXT DEFAULT 'avatar-1',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create foods table
CREATE TABLE IF NOT EXISTS foods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  calories_per_100g INTEGER NOT NULL,
  protein DECIMAL(5,2) DEFAULT 0,
  carbs DECIMAL(5,2) DEFAULT 0,
  fat DECIMAL(5,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE foods ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create policies for user_goals table
CREATE POLICY "Users can manage own goals" ON user_goals
  FOR ALL USING (auth.uid() = user_id);

-- Create policies for daily_progress table
CREATE POLICY "Users can manage own progress" ON daily_progress
  FOR ALL USING (auth.uid() = user_id);

-- Create policies for user_levels table
CREATE POLICY "Users can manage own levels" ON user_levels
  FOR ALL USING (auth.uid() = user_id);

-- Create policies for foods table (public read)
CREATE POLICY "Anyone can view foods" ON foods
  FOR SELECT TO authenticated USING (true);

-- Insert sample foods data
INSERT INTO foods (name, category, calories_per_100g, protein, carbs, fat) VALUES
  ('Maçã', 'frutas', 52, 0.3, 14, 0.2),
  ('Banana', 'frutas', 89, 1.1, 23, 0.3),
  ('Peito de Frango', 'proteinas', 165, 31, 0, 3.6),
  ('Arroz Branco', 'cereais', 130, 2.7, 28, 0.3),
  ('Brócolis', 'verduras', 34, 2.8, 7, 0.4),
  ('Ovo', 'proteinas', 155, 13, 1.1, 11),
  ('Batata Doce', 'cereais', 86, 1.6, 20, 0.1),
  ('Salmão', 'proteinas', 208, 20, 0, 13),
  ('Aveia', 'cereais', 389, 16.9, 66, 6.9),
  ('Espinafre', 'verduras', 23, 2.9, 3.6, 0.4)
ON CONFLICT DO NOTHING;

-- Create functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_goals_updated_at BEFORE UPDATE ON user_goals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_daily_progress_updated_at BEFORE UPDATE ON daily_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_levels_updated_at BEFORE UPDATE ON user_levels
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
