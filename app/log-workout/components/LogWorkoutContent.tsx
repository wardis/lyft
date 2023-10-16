"use client";

import { FormProvider, useForm } from "react-hook-form";

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
  const methods = useForm();

  const onSubmit = methods.handleSubmit((data) =>
    console.dir(data, { depth: null })
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

  methods.register("workoutDuration");

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <div className="flex justify-between items-center mb-3">
          <h1>Log Workout</h1>
          <Button
            size="sm"
            variant="solid"
            color="primary"
            className=""
            type="submit"
          >
            Finish
          </Button>
        </div>

        <WorkoutSummary
          workoutSets={workoutSets}
          workoutVolume={workoutVolume}
        />

        {workoutExercises.length === 0 ? (
          <div className="py-4 flex flex-col items-center">
            <BiDumbbell size={32} />
            <h2 className="font-bold">Get started</h2>
            <p>Add an exercise to start you workout</p>
          </div>
        ) : (
          <div className="py-4 flex flex-col gap-8">
            {workoutExercises.map((exercise, index) => {
              methods.register("exercises." + index + ".base", {
                value: { id: exercise.id, name: exercise.name },
              });
              return (
                <Exercise
                  key={index}
                  exercise={exercise}
                  exerciseIndex={index}
                  // onMetaUpdate={(meta) => updateExerciseMeta(index, meta)}
                />
              );
            })}
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
      </form>
    </FormProvider>
  );
}
