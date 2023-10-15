"use client";

import { Button } from "@/components/ui/Button";
import { Divider } from "@nextui-org/divider";
import { BiDumbbell, BiPlus } from "react-icons/bi";

import { Link } from "@nextui-org/link";
import { useEffect, useState } from "react";
import Exercise from "./components/Exercise";
import AddExercise from "./components/AddExercise";
import WorkoutDuration from "./components/WorkoutDuration";

type Exercise = {
  id: number;
  name: string;
};

export default function LogWorkout() {
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const [workoutExercises, setWorkoutExercises] = useState<
    (Exercise & {
      volume?: number;
    })[]
  >([]);
  const workoutVolumes = workoutExercises.map(
    (exercise) => 0 + parseInt(exercise.volume)
  );

  const workoutVolume = workoutExercises.reduce(
    (total, exercise) => total + (exercise.volume ?? 0),
    0
  );

  useEffect(() => {
    const fetchExercises = async () => {
      const exercises = await fetch("/api/exercises");
      const { data } = await exercises.json();
      return data;
    };
    fetchExercises().then((exercises) => {
      setAllExercises(exercises);
      setWorkoutExercises([
        { ...exercises[0], volume: 0 },
        { ...exercises[1], volume: 0 },
      ]); // TODO: remove after testing
    });
  }, []);

  const addExercises = (list: string[]) => {
    const intIds = list.map((id) => parseInt(id));
    setWorkoutExercises((oldWorkoutExercises) => [
      ...oldWorkoutExercises,
      ...allExercises.filter((exercise) => intIds.includes(exercise.id)),
    ]);
  };

  const updateExerciseVolume = (exerciseIndex, value) => {
    setWorkoutExercises((oldWorkoutExercises) =>
      oldWorkoutExercises.map((exercise, index) => {
        if (index === exerciseIndex)
          return {
            ...exercise,
            volume: value,
          };
        return exercise;
      })
    );
  };

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
      <div className="bg-background ">
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
            <p>0</p>
          </div>
        </div>
        <Divider />
      </div>

      {workoutExercises.length === 0 ? (
        <div className="py-4 flex flex-col items-center">
          <BiDumbbell size={32} />
          <h2 className="font-bold">Get started</h2>
          <p>Add an exercise to start you workout</p>
        </div>
      ) : (
        <div className="py-4 flex flex-col gap-8">
          <p>{workoutVolumes.join(", ")}</p>
          {workoutExercises.map((exercise, index) => (
            <Exercise
              key={`${index}-${exercise.name}`}
              exercise={exercise}
              onVolumeUpdate={(exerciseVolume) =>
                updateExerciseVolume(index, exerciseVolume)
              }
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
