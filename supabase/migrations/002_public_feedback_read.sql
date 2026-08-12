-- Allow website to show real customer reviews publicly
DROP POLICY IF EXISTS "No public read access" ON feedback;

CREATE POLICY "Allow public read feedback"
  ON feedback
  FOR SELECT
  TO anon, authenticated
  USING (true);
