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
      <LogWorkoutContent
        allExercises={allExercises}
        fetchedWorkoutExercises={workoutExercises}
      />
    </div>
  );
}
