-- Jugadu Cafe Feedback Table
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  overall_rating INTEGER NOT NULL CHECK (overall_rating BETWEEN 1 AND 5),
  food_rating INTEGER NOT NULL CHECK (food_rating BETWEEN 1 AND 5),
  service_rating INTEGER NOT NULL CHECK (service_rating BETWEEN 1 AND 5),
  ambience_rating INTEGER NOT NULL CHECK (ambience_rating BETWEEN 1 AND 5),
  cleanliness_rating INTEGER NOT NULL CHECK (cleanliness_rating BETWEEN 1 AND 5),
  customer_name TEXT,
  mobile_number TEXT,
  feedback_text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to submit feedback
CREATE POLICY "Allow anonymous feedback insert"
  ON feedback
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Restrict public read access (admin only via service role)
-- Run 002_public_feedback_read.sql to enable public reviews on website
CREATE POLICY "No public read access"
  ON feedback
  FOR SELECT
  TO anon
  USING (false);

CREATE INDEX IF NOT EXISTS feedback_created_at_idx ON feedback (created_at DESC);
