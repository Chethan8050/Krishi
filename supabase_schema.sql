-- ══════════════════════════════════════════════════════════════
-- KisanAI — Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ══════════════════════════════════════════════════════════════

-- ── 0. Profiles Table ─────────────────────────────────────────
-- Stores additional user information beyond auth
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  district TEXT,
  preferred_language TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Trigger to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, district)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'district'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- ── 1. Scans Table ──────────────────────────────────────────
-- Stores every crop scan result from the AI model
CREATE TABLE IF NOT EXISTS scans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  crop TEXT NOT NULL,
  disease TEXT,
  status TEXT NOT NULL CHECK (status IN ('healthy', 'disease')),
  confidence REAL NOT NULL DEFAULT 0,
  severity TEXT,
  treatment JSONB,
  tips JSONB,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ── 2. Enable RLS ───────────────────────────────────────────
ALTER TABLE scans ENABLE ROW LEVEL SECURITY;

-- Allow anyone to INSERT (no auth required for hackathon demo)
CREATE POLICY "Allow public inserts" ON scans
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to SELECT (no auth required for hackathon demo)
CREATE POLICY "Allow public reads" ON scans
  FOR SELECT
  USING (true);

-- Users can view their own scans
CREATE POLICY "Users view own scans" ON scans
  FOR SELECT
  USING (user_id = auth.uid() OR user_id IS NULL);

-- ── 3. Index for fast history queries ───────────────────────
CREATE INDEX IF NOT EXISTS idx_scans_created_at ON scans (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_scans_status ON scans (status);
CREATE INDEX IF NOT EXISTS idx_scans_user_id ON scans (user_id);
