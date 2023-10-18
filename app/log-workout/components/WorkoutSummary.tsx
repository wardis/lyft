"use client";

import React from "react";

import { Divider } from "@nextui-org/divider";
import { Progress } from "@nextui-org/progress";
import { useFormContext } from "react-hook-form";

import { ExerciseSet } from "./Exercise";
import WorkoutDuration from "./WorkoutDuration";

import { WorkoutExercise } from "../page";

type Props = {};

export default function WorkoutSummary({}: Props) {
  // workoutVolume, workoutSets;
  const { getValues, watch } = useFormContext();

  const formValues = getValues();
  const watchAll = watch(["exercises"]);
  const allSets =
    formValues.exercises?.flatMap(
      (exercise: WorkoutExercise) => exercise.sets
    ) || [];
  const totalSetCount = allSets.length;
  const completedSets = allSets.filter((set: ExerciseSet) => set.isDone);
  const completedSetCount = completedSets.length;
  const workoutVolume = completedSets.reduce(
    (total: number, set: ExerciseSet) =>
      total + parseInt(set.weight || "0") * parseInt(set.reps || "0"),
    0
  );

  return (
    <div>
      <div className="bg-background ">
        <Progress
          size="sm"
          aria-label="workout-progress"
          value={(completedSetCount / totalSetCount) * 100}
        />
        <div className="grid grid-cols-3 py-2">
          <div>
            <p>Duration</p>
            <WorkoutDuration />
          </div>
          <div>
            <p>Volume</p>
            <p>{workoutVolume} kg</p>
          </div>
          <div>
            <p>Sets</p>
            <p>
              {completedSetCount} / {totalSetCount}
            </p>
          </div>
        </div>
        <Divider />
      </div>
    </div>
  );
}
