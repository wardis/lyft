import { BiDumbbell } from "react-icons/bi";
import { createServerSupabaseClient } from "../supabase-server";
import Link from "next/link";

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
      <div className="p-4">...list workouts you've done. feed.</div>
      <Link href="/workout" className="flex items-center gap-1">
        <BiDumbbell />
        Workout
      </Link>
    </div>
  );
}
