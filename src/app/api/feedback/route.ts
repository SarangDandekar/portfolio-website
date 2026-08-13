import { NextResponse } from "next/server";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { feedbackSchema } from "@/lib/validations/feedback";

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ reviews: [] });
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ reviews: [] });
  }

  const { data, error } = await supabase
    .from("feedback")
    .select("id, overall_rating, customer_name, feedback_text, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    console.error("Feedback fetch error:", error);
    return NextResponse.json({ reviews: [] });
  }

  return NextResponse.json({ reviews: data ?? [] });
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Feedback service is not configured yet." },
      { status: 503 },
    );
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Unable to connect to feedback service." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = feedbackSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid feedback." },
      { status: 400 },
    );
  }

  const { overallRating, customerName, feedbackText } = parsed.data;

  const { error } = await supabase.from("feedback").insert({
    overall_rating: overallRating,
    food_rating: overallRating,
    service_rating: overallRating,
    ambience_rating: overallRating,
    cleanliness_rating: overallRating,
    customer_name: customerName?.trim() || null,
    mobile_number: null,
    feedback_text: feedbackText.trim(),
  });

  if (error) {
    console.error("Feedback insert error:", error);
    return NextResponse.json(
      { error: "Could not save feedback. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
