import { NextResponse } from "next/server";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/client";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function normalizePath(raw: unknown) {
  if (typeof raw !== "string") return "/";
  const path = raw.trim();
  if (!path.startsWith("/") || path.includes("://") || path.includes("..")) {
    return "/";
  }
  return path.slice(0, 200);
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: true, counted: false });
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ ok: true, counted: false });
  }

  let body: { path?: unknown; visitorKey?: unknown } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const path = normalizePath(body.path);
  const visitorKey =
    typeof body.visitorKey === "string" ? body.visitorKey.trim() : "";

  if (!UUID_RE.test(visitorKey)) {
    return NextResponse.json({ error: "Invalid visitor." }, { status: 400 });
  }

  const { error } = await supabase.rpc("record_page_view", {
    p_path: path,
    p_visitor_key: visitorKey,
  });

  if (error) {
    console.error("record_page_view error:", error);
    return NextResponse.json({ ok: true, counted: false });
  }

  return NextResponse.json({ ok: true, counted: true });
}
