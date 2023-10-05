import { BiDumbbell } from "react-icons/bi";
import { createServerSupabaseClient } from "../supabase-server";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

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
