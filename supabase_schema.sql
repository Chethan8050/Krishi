-- ══════════════════════════════════════════════════════════════
-- KisanAI — Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ══════════════════════════════════════════════════════════════

-- ── 1. Scans Table ──────────────────────────────────────────
-- Stores every crop scan result from the AI model
CREATE TABLE IF NOT EXISTS scans (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  crop        TEXT NOT NULL,
  disease     TEXT,                                  -- NULL if healthy
  status      TEXT NOT NULL CHECK (status IN ('healthy', 'disease')),
  confidence  REAL NOT NULL DEFAULT 0,
  severity    TEXT,                                  -- 'High', 'Moderate', NULL
  treatment   JSONB,                                 -- Array of treatment steps
  tips        JSONB,                                 -- Array of care tips (healthy)
  image_url   TEXT,                                  -- Optional: Supabase Storage URL
  created_at  TIMESTAMPTZ DEFAULT now() NOT NULL
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

-- ── 3. Index for fast history queries ───────────────────────
CREATE INDEX IF NOT EXISTS idx_scans_created_at ON scans (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_scans_status     ON scans (status);
