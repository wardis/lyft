"use client";

import { Button } from "@/components/ui/Button";
import { BiDumbbell, BiPlus } from "react-icons/bi";

import Exercise from "./Exercise";
import AddExercise from "./AddExercise";
import WorkoutSummary from "./WorkoutSummary";
import { useState } from "react";
import { Exercise as ExerciseType, WorkoutExercise } from "../page";

type Props = {
  allExercises: ExerciseType[];
  fetchedWorkoutExercises: WorkoutExercise[];
};

export default function LogWorkoutContent({
  allExercises,
  fetchedWorkoutExercises,
}: Props) {
  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>(
    fetchedWorkoutExercises
  );

  const workoutVolume = workoutExercises.reduce(
    (total, exercise) => total + (exercise.volume ?? 0),
    0
  );
  const workoutSets = workoutExercises.reduce(
    (total, exercise) => total + (exercise.sets ?? 0),
    0
  );

  const addExercises = (list: string[]) => {
    const intIds = list.map((id) => parseInt(id));
    setWorkoutExercises((oldWorkoutExercises) => [
      ...oldWorkoutExercises,
      ...allExercises
        .filter((exercise) => intIds.includes(exercise.id))
        .map((exercise) => ({ ...exercise, notes: "", volume: 0, sets: 0 })),
    ]);
  };

  const updateExerciseMeta = (
    exerciseIndex: number,
    meta: { volume: number; sets: number; notes: string }
  ) => {
    setWorkoutExercises((oldWorkoutExercises) =>
      oldWorkoutExercises.map((exercise, index) => {
        if (index === exerciseIndex)
          return {
            ...exercise,
            volume: meta.volume,
            sets: meta.sets,
            notes: meta.notes,
          };
        return exercise;
      })
    );
  };

  return (
    <div>
      <WorkoutSummary workoutSets={workoutSets} workoutVolume={workoutVolume} />

      {workoutExercises.length === 0 ? (
        <div className="py-4 flex flex-col items-center">
          <BiDumbbell size={32} />
          <h2 className="font-bold">Get started</h2>
          <p>Add an exercise to start you workout</p>
        </div>
      ) : (
        <div className="py-4 flex flex-col gap-8">
          {workoutExercises.map((exercise, index) => (
            <Exercise
              key={`${index}-${exercise.name}`}
              exercise={exercise}
              onMetaUpdate={(meta) => updateExerciseMeta(index, meta)}
            />
          ))}
        </div>
      )}
      <div className="pt-4 flex flex-col gap-4">
        <AddExercise exercises={allExercises} onSubmit={addExercises} />
        <div className="flex gap-4">
          <Button className="flex-1" onClick={() => {}}>
            Settings
          </Button>
          <Button color="danger" className="flex-1" onClick={() => {}}>
            <BiPlus />
            Discard Workout
          </Button>
        </div>
      </div>
    </div>
  );
}
