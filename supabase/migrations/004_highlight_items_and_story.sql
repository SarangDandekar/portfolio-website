-- Multiple highlight photos/videos (slider on public site)
CREATE TABLE IF NOT EXISTS highlight_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  file_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE highlight_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active highlight items"
  ON highlight_items FOR SELECT TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated can read all highlight items"
  ON highlight_items FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Authenticated can insert highlight items"
  ON highlight_items FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update highlight items"
  ON highlight_items FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated can delete highlight items"
  ON highlight_items FOR DELETE TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS highlight_items_sort_idx
  ON highlight_items (is_active, sort_order DESC, created_at DESC);

-- Move any existing single-highlight media into the new slider table
INSERT INTO highlight_items (title, media_type, file_path, public_url, is_active)
SELECT
  COALESCE(title, ''),
  media_type,
  file_path,
  public_url,
  is_active
FROM site_highlights
WHERE public_url IS NOT NULL
  AND file_path IS NOT NULL
  AND media_type IN ('image', 'video')
  AND NOT EXISTS (
    SELECT 1 FROM highlight_items h WHERE h.public_url = site_highlights.public_url
  );

-- Our Story media (one active row shown on the public About section)
CREATE TABLE IF NOT EXISTS site_story_media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  file_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE site_story_media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active story media"
  ON site_story_media FOR SELECT TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated can manage story media"
  ON site_story_media FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS site_story_media_active_idx
  ON site_story_media (is_active, created_at DESC);
