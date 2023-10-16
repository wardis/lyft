import Link from "next/link";
import { BiDumbbell } from "react-icons/bi";

import { Button } from "@/components/ui/Button";

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
      <div className="p-4">...list workouts feed.</div>
      <Button href="/workout" as={Link}>
        <BiDumbbell />
        Workout
      </Button>
    </div>
  );
}
