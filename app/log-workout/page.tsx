"use client";

import { Button } from "@/components/ui/Button";
import { Divider } from "@nextui-org/divider";
import { BiDumbbell, BiPlus } from "react-icons/bi";

import { Link } from "@nextui-org/link";
import { useState } from "react";
import Exercise from "./components/Exercise";

type Exercise = {
  id: number;
  name: string;
};

const mockExercises = [
  { id: 1, name: "Bench Press (Barbell)" },
  { id: 2, name: "Shoulder Press (Dumbell)" },
  { id: 3, name: "Front Squat", previousSet: { weight: 150, reps: 14 } },
  { id: 4, name: "Romanian Deadlift" },
];

export default function LogWorkout() {
  const [exercises, setExercises] = useState<Exercise[]>([mockExercises[0]]);

  const addExercise = () => {
    setExercises([
      ...exercises,
      {
        ...mockExercises[Math.floor(Math.random() * mockExercises.length)],
      },
    ]);
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
      <div className="bg-background text-center">
        <div className="grid grid-cols-3 py-2">
          <div>
            <p>Duration</p>
            <p>1h 13min 6s</p>
          </div>
          <div>
            <p>Volume</p>
            <p>0 kg</p>
          </div>
          <div>
            <p>Sets</p>
            <p>0</p>
          </div>
        </div>
        <Divider />
      </div>

      {exercises.length === 0 ? (
        <div className="py-4 flex flex-col items-center">
          <BiDumbbell size={32} />
          <h2 className="font-bold">Get started</h2>
          <p>Add an exercise to start you workout</p>
        </div>
      ) : (
        <div className="py-4 flex flex-col gap-8">
          {exercises.map((exercise, index) => (
            <Exercise key={`${index}-${exercise.name}`} exercise={exercise} />
          ))}
        </div>
      )}
      <div className="pt-4 flex flex-col gap-4">
        <Button
          color="primary"
          variant="solid"
          className="w-full"
          onClick={addExercise}
        >
          <BiPlus />
          Add Exercise
        </Button>
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
