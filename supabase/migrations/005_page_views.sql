-- Anonymous visit tracking for the public cafe website (shown in admin)
CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  path TEXT NOT NULL DEFAULT '/',
  visitor_key TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can record page views"
  ON page_views FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(path) > 0
    AND char_length(path) <= 200
    AND char_length(visitor_key) >= 8
    AND char_length(visitor_key) <= 80
  );

CREATE POLICY "Authenticated can read page views"
  ON page_views FOR SELECT TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS page_views_created_idx
  ON page_views (created_at DESC);

CREATE INDEX IF NOT EXISTS page_views_visitor_idx
  ON page_views (visitor_key);

CREATE OR REPLACE FUNCTION public.record_page_view(p_path text, p_visitor_key text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF p_path IS NULL OR p_path = '' OR char_length(p_path) > 200 THEN
    RETURN false;
  END IF;
  IF p_visitor_key IS NULL OR char_length(p_visitor_key) < 8 OR char_length(p_visitor_key) > 80 THEN
    RETURN false;
  END IF;

  IF EXISTS (
    SELECT 1
    FROM page_views
    WHERE visitor_key = p_visitor_key
      AND path = p_path
      AND created_at > NOW() - INTERVAL '30 minutes'
  ) THEN
    RETURN false;
  END IF;

  INSERT INTO page_views (path, visitor_key)
  VALUES (p_path, p_visitor_key);

  RETURN true;
END;
$$;

CREATE OR REPLACE FUNCTION public.site_view_stats()
RETURNS JSON
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT json_build_object(
    'total_visits', (SELECT COUNT(*)::bigint FROM page_views),
    'unique_viewers', (SELECT COUNT(DISTINCT visitor_key)::bigint FROM page_views),
    'visits_today', (
      SELECT COUNT(*)::bigint
      FROM page_views
      WHERE (created_at AT TIME ZONE 'Asia/Kolkata')::date
        = (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Kolkata')::date
    )
  );
$$;

REVOKE ALL ON FUNCTION public.record_page_view(text, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.site_view_stats() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.record_page_view(text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.site_view_stats() TO authenticated;
