import { Button } from "@/components/ui/Button";

import { Link } from "@nextui-org/link";
import LogWorkoutContent from "./components/LogWorkoutContent";

export type Exercise = {
  id: number;
  name: string;
};

export type WorkoutExercise = Exercise & {
  volume: number;
  sets: number;
  notes?: string;
};

export default async function LogWorkout() {
  const allExercises: Exercise[] = await fetch(
    "http://localhost:3000/api/exercises"
  ).then((res) => res.json());

  const workoutExercises = [
    { ...allExercises[0], volume: 0, sets: 0, notes: "" },
    { ...allExercises[1], volume: 0, sets: 0, notes: "" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h1>Log Workout</h1>
        <Button
          href="/workout"
          size="sm"
          variant="solid"
          color="primary"
          as={Link}
          className=""
        >
          Finish
        </Button>
      </div>

      <LogWorkoutContent
        allExercises={allExercises}
        fetchedWorkoutExercises={workoutExercises}
      />
    </div>
  );
}
