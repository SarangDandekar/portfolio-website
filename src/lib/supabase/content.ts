import { getSupabaseClient } from "@/lib/supabase/client";
import type { GalleryMedia } from "@/config/gallery";

export type SiteHighlightContent = {
  id: string;
  title: string | null;
  bodyText: string | null;
  mediaType: "image" | "video" | null;
  publicUrl: string | null;
};

type GalleryRow = {
  id: string;
  title: string;
  media_type: "image" | "video";
  category: "food" | "interior" | "moments" | "videos";
  public_url: string;
};

type HighlightRow = {
  id: string;
  title: string | null;
  body_text: string | null;
  media_type: "image" | "video" | null;
  public_url: string | null;
};

export async function fetchRemoteGalleryItems(): Promise<GalleryMedia[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("gallery_items")
    .select("id, title, media_type, category, public_url")
    .eq("is_active", true)
    .order("sort_order", { ascending: false })
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return (data as GalleryRow[]).map((row) => ({
    id: `db-${row.id}`,
    src: row.public_url,
    alt: row.title || "Jugadu Cafe gallery",
    type: row.media_type,
    category: row.category,
  }));
}

export async function fetchActiveHighlight(): Promise<SiteHighlightContent | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("site_highlights")
    .select("id, title, body_text, media_type, public_url")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) return null;

  const row = data as HighlightRow;
  if (!row.title && !row.body_text && !row.public_url) return null;

  return {
    id: row.id,
    title: row.title,
    bodyText: row.body_text,
    mediaType: row.media_type,
    publicUrl: row.public_url,
  };
}
