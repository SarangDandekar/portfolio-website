-- Raise cafe-media size cap so large highlight/gallery/story videos can upload.
-- 50 GB per file (browser + plan still apply; NULL falls back to the 50 MB project default).
UPDATE storage.buckets
SET
  file_size_limit = 53687091200,
  allowed_mime_types = NULL
WHERE id = 'cafe-media';
