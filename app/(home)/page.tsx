import { Avatar, AvatarGroup } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import Link from "next/link";

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
    <WorkoutFeed workouts={homeFeedWorkouts} user={user} />
  ) : (
    <section className="flex flex-col  gap-4 py-8 md:py-10">
      <h1 className="text-5xl font-bold">
        Track Workouts
        <br /> <span className=" text-primary">make progress</span>
      </h1>

      <p>
        Lift is a free workout tracker & planner for web iOS and Android. Build
        routines and track progress.
      </p>

      <p>Sign in and start tracking your workouts</p>

      <Button as={Link} href="/signin" color="primary" className="">
        Signin
      </Button>

      <div className="flex gap-2 mt-6">
        <AvatarGroup size="sm">
          <Avatar src="https://i.pravatar.cc/150?u=name@pravatar.com" />
          <Avatar src="https://i.pravatar.cc/150?u=muscle@pravatar.com" />
          <Avatar src="https://i.pravatar.cc/150?u=cherryl@pravatar.com" />
        </AvatarGroup>
        <p className=" text-xs">
          The #1 workout tracker.
          <br />
          Loved by +2 million athletes like you.
        </p>
      </div>
    </section>
  );
}
