"use client";

import { Button } from "@/components/ui/Button";
import { Divider } from "@nextui-org/divider";
import { Avatar } from "@nextui-org/avatar";
import { Checkbox } from "@nextui-org/checkbox";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { useState } from "react";
import { BiDotsVertical, BiDumbbell, BiPlus } from "react-icons/bi";
import { MdDone } from "react-icons/md";
import { CgTimer } from "react-icons/cg";

const mockExercises = [
  { id: 1, name: "Bench Press (Barbell)", sets: [] },
  {
    id: 2,
    name: "Shoulder Press (Dumbell)",
    sets: [],
    previousSet: { weight: 50, reps: 12 },
  },
  { id: 3, name: "Front Squat", sets: [] },
  { id: 4, name: "Romanian Deadlift", sets: [] },
];

const defaultSet = { weight: 0, reps: 0, done: false };

const formatPreviousSet = ({
  weight,
  reps,
}: {
  weight: number;
  reps: number;
}) => `${weight}kg x ${reps}`;

export default function LogWorkout() {
  const [exercises, setExercises] = useState<typeof mockExercises>([
    {
      id: 1,
      name: "Bench Press (Barbell)",
      sets: [{ ...defaultSet }],
    },
  ]);

  console.clear();
  console.table(exercises);

  const addExercise = () => {
    setExercises([
      ...exercises,
      {
        ...mockExercises[Math.floor(Math.random() * mockExercises.length)],
        sets: [{ ...defaultSet }],
      },
    ]);
  };

  const addSet = (exerciseIndex: number) => {
    setExercises(
      exercises.map((exercise, index) => {
        if (index === exerciseIndex)
          return {
            ...exercise,
            sets: [...exercise.sets, { ...defaultSet }],
          };
        else return { ...exercise };
      })
    );
  };

  return (
    <div>
      <h1>Log Workout</h1>
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

      {exercises.length === 0 ? (
        <div className="py-4 flex flex-col items-center">
          <BiDumbbell size={32} />
          <h2 className="font-bold">Get started</h2>
          <p>Add an exercise to start you workout</p>
        </div>
      ) : (
        <div className="py-4 flex flex-col gap-8">
          {exercises.map((exercise, index) => (
            <div
              key={`${index}-${exercise.name}`}
              className="flex-col gap-2 flex"
            >
              <div className="flex items-center gap-2 justify-start">
                <Avatar size="sm" name={exercise.name} />
                <p className="text-primary flex-grow">{exercise.name}</p>
                <BiDotsVertical className="text-primary" size="24" />
              </div>

              <input
                placeholder="Add notes here..."
                className="bg-transparent w-full text-sm"
              />

              <div className="text-primary flex items-center gap-2">
                <CgTimer />
                <p className=" text-sm">Rest Timer: 35s</p>
              </div>

              <Table removeWrapper aria-label="sets">
                <TableHeader>
                  <TableColumn className="uppercase">Set</TableColumn>
                  <TableColumn className="uppercase">Previous</TableColumn>
                  <TableColumn className="uppercase">
                    <div className="flex items-center gap-1">
                      <BiDumbbell />
                      kg
                    </div>
                  </TableColumn>
                  <TableColumn className="uppercase">Reps</TableColumn>
                  <TableColumn className="uppercase">
                    <MdDone />
                  </TableColumn>
                </TableHeader>
                <TableBody>
                  {exercise.sets.length === 0 ? (
                    <TableRow key="1">
                      <TableCell>1</TableCell>
                      <TableCell className="text-default-300">
                        {exercise.previousSet
                          ? formatPreviousSet(exercise.previousSet)
                          : "--"}
                      </TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                    </TableRow>
                  ) : (
                    exercise.sets.map((set, index) => (
                      <TableRow key={index + 1}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="text-default-300">
                          {exercise.previousSet
                            ? formatPreviousSet(exercise.previousSet)
                            : "--"}
                        </TableCell>
                        <TableCell>
                          {exercise.previousSet?.weight || 0}
                        </TableCell>
                        <TableCell>{exercise.previousSet?.reps || 0}</TableCell>
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>

              <Button
                size="sm"
                className=" w-2/4 mx-auto"
                onClick={() => {
                  console.log(index);
                  addSet(index);
                }}
              >
                <BiPlus /> Add Set
              </Button>
            </div>
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
