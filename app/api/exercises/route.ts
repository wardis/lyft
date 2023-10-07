import { createServerSupabaseClient } from "@/app/supabase-server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createServerSupabaseClient();

  const { data } = await supabase.from("exercices").select();

  return NextResponse.json({ data });
}
