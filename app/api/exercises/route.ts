import { createServerSupabaseClient } from "@/app/supabase-server";
import { NextResponse } from "next/server";

const exercises = [
  {
    id: 1,
    name: "Lat Pulldown (Machine)",
    target: "Lats",
    image: "/assets/dumbbell.svg",
  },
  {
    id: 2,
    name: "Seated Row (Machine)",
    target: "Upper Back",
    image: "/assets/dumbbell.svg",
  },
  {
    id: 3,
    name: "Shrug (Dumbbell)",
    target: "Traps",
    image: "/assets/dumbbell.svg",
  },
  {
    id: 4,
    name: "Bicep Curl (Dumbbell)",
    target: "Biceps",
    image: "/assets/dumbbell.svg",
  },
  {
    id: 5,
    name: "Bench Press (Barbell)",
    target: "Chest",
    image: "/assets/dumbbell.svg",
  },
  {
    id: 6,
    name: "Incline Bench Press (Dumbbell)",
    target: "Chest",
    image: "/assets/dumbbell.svg",
  },
  {
    id: 7,
    name: "Shoulder Press (Dumbbell)",
    target: "Shoulder",
    image: "/assets/dumbbell.svg",
  },
  {
    id: 8,
    name: "Front Squat",
    target: "Quadriceps",
    image: "/assets/dumbbell.svg",
  },
  {
    id: 9,
    name: "Bulgarian Split Squat",
    target: "Quadriceps",
    image: "/assets/dumbbell.svg",
  },
  {
    id: 10,
    name: "Romanian Deadlift",
    target: "Hamstrings",
    image: "/assets/dumbbell.svg",
  },
  {
    id: 11,
    name: "Walking",
    target: "Cardio",
    image: "/assets/dumbbell.svg",
  },
];

export async function GET() {
  // const supabase = createServerSupabaseClient();

  // const { data } = await supabase.from("exercices").select();

  return NextResponse.json(exercises);
}
