import { getSupabaseClient } from "@/lib/supabase/client";
import type { GalleryMedia } from "@/config/gallery";

export type HighlightMedia = {
  id: string;
  src: string;
  alt: string;
  type: "image" | "video";
};

export type HighlightsContent = {
  bodyText: string | null;
  items: HighlightMedia[];
};

export type StoryMedia = {
  src: string;
  type: "image" | "video";
};

type GalleryRow = {
  id: string;
  title: string;
  media_type: "image" | "video";
  category: "food" | "interior" | "moments" | "videos";
  public_url: string;
};

type HighlightCopyRow = {
  body_text: string | null;
};

type HighlightItemRow = {
  id: string;
  title: string;
  media_type: "image" | "video";
  public_url: string;
};

type StoryRow = {
  media_type: "image" | "video";
  public_url: string;
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

export async function fetchHighlights(): Promise<HighlightsContent | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const [{ data: copyRow }, { data: mediaRows }] = await Promise.all([
    supabase
      .from("site_highlights")
      .select("body_text")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("highlight_items")
      .select("id, title, media_type, public_url")
      .eq("is_active", true)
      .order("sort_order", { ascending: false })
      .order("created_at", { ascending: false }),
  ]);

  const bodyText = ((copyRow as HighlightCopyRow | null)?.body_text ?? "").trim() || null;
  const items = ((mediaRows as HighlightItemRow[] | null) ?? []).map((row) => ({
    id: row.id,
    src: row.public_url,
    alt: row.title || "Jugadu Cafe highlight",
    type: row.media_type,
  }));

  if (!bodyText && items.length === 0) return null;

  return { bodyText, items };
}

export async function fetchStoryMedia(): Promise<StoryMedia | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("site_story_media")
    .select("media_type, public_url")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) return null;

  const row = data as StoryRow;
  if (!row.public_url) return null;

  return { src: row.public_url, type: row.media_type };
}
