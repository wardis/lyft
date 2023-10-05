import { Database } from "@/types_db";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import { createServerSupabaseClient } from "../supabase-server";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase.from("users").select();

  return (
    <div>
      <div>Dashboard</div>
      ...list workouts you've done. feed.
    </div>
  );
}
