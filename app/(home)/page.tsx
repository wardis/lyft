import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { homeFeedWorkouts } from "@/data/mock-data";

import { WorkoutFeed } from "./components/WorkoutFeed";

import { createServerSupabaseClient, getSession } from "../supabase-server";

export default async function Home() {
  const session = await getSession();
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase.from("users").select();

  return session ? (
    <WorkoutFeed workouts={homeFeedWorkouts} />
  ) : (
    <section className="flex flex-col items-center gap-4 py-8 md:py-10">
      <h1>Lyft - Workout Tracker</h1>
      <p>Signin in to start tracking you workouts</p>

      <Button as={Link} href="/signin">
        Signin
      </Button>
    </section>
  );
}
