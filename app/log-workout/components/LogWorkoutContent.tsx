"use client";

import { useState } from "react";

import { FormProvider, useForm } from "react-hook-form";
import { BiDumbbell, BiPlus } from "react-icons/bi";

import { Button } from "@/components/ui/Button";

import AddExercise from "./AddExercise";
import Exercise from "./Exercise";
import WorkoutSummary from "./WorkoutSummary";

import { Exercise as ExerciseType, WorkoutExercise } from "../page";

type Props = {
  allExercises: ExerciseType[];
  fetchedWorkoutExercises: WorkoutExercise[];
};

export default function LogWorkoutContent({
  allExercises,
  fetchedWorkoutExercises,
}: Props) {
  const [workoutExercises, setWorkoutExercises] = useState<
    (WorkoutExercise & { exerciseKey: string })[]
  >(
    fetchedWorkoutExercises.map((exercise, index) => ({
      ...exercise,
      exerciseKey: crypto.randomUUID(),
    }))
  );
  const methods = useForm();

  const onSubmit = methods.handleSubmit((data) => {
    console.log(data);
  });

  const addExercises = (list: string[]) => {
    const intIds = list.map((id) => parseInt(id));
    setWorkoutExercises((prev) => [
      ...prev,
      ...allExercises
        .filter((exercise) => intIds.includes(exercise.id))
        .map((exercise, index) => ({
          ...exercise,
          notes: "",
          volume: 0,
          sets: 0,
          exerciseKey: crypto.randomUUID(),
        })),
    ]);
  };

  const deleteExercise = (exerciseKey: string) => {
    setWorkoutExercises((prev) =>
      prev.filter((exercise) => exerciseKey !== exercise.exerciseKey)
    );
    methods.unregister(["exercises." + exerciseKey]);
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

        <WorkoutSummary />

        {workoutExercises.length === 0 ? (
          <div className="py-4 flex flex-col items-center">
            <BiDumbbell size={32} />
            <h2 className="font-bold">Get started</h2>
            <p>Add an exercise to start you workout</p>
          </div>
        ) : (
          <div className="py-4 flex flex-col gap-8">
            {workoutExercises.map((exercise, index) => {
              methods.register("exercises." + exercise.exerciseKey + ".base", {
                value: { id: exercise.id, name: exercise.name },
              });
              return (
                <Exercise
                  key={exercise.exerciseKey}
                  exercise={exercise}
                  onDelete={() => deleteExercise(exercise.exerciseKey)}
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
