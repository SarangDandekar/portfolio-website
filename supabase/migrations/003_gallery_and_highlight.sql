-- Gallery items managed from admin website
CREATE TABLE IF NOT EXISTS gallery_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  category TEXT NOT NULL DEFAULT 'moments'
    CHECK (category IN ('food', 'interior', 'moments', 'videos')),
  file_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active gallery items"
  ON gallery_items FOR SELECT TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated can read all gallery items"
  ON gallery_items FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Authenticated can insert gallery items"
  ON gallery_items FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update gallery items"
  ON gallery_items FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated can delete gallery items"
  ON gallery_items FOR DELETE TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS gallery_items_sort_idx
  ON gallery_items (is_active, sort_order DESC, created_at DESC);

-- Highlight content (single active highlight row style; allow multiple, show latest active)
CREATE TABLE IF NOT EXISTS site_highlights (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT,
  body_text TEXT,
  media_type TEXT CHECK (media_type IS NULL OR media_type IN ('image', 'video')),
  file_path TEXT,
  public_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE site_highlights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active highlights"
  ON site_highlights FOR SELECT TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated can manage highlights"
  ON site_highlights FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS site_highlights_active_idx
  ON site_highlights (is_active, created_at DESC);

-- Storage bucket for cafe media
INSERT INTO storage.buckets (id, name, public)
VALUES ('cafe-media', 'cafe-media', true)
ON CONFLICT (id) DO NOTHING;

-- Public read for media
CREATE POLICY "Public read cafe media"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'cafe-media');

-- Authenticated upload/update/delete
CREATE POLICY "Auth upload cafe media"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'cafe-media');

CREATE POLICY "Auth update cafe media"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'cafe-media')
  WITH CHECK (bucket_id = 'cafe-media');

CREATE POLICY "Auth delete cafe media"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'cafe-media');
