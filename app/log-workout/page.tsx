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
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";

type Exercise = {
  id: number;
  name: string;
};

type Set = {
  weight: number;
  reps: number;
  isDone: boolean;
  exerciseIndex: number;
};

const mockExercises = [
  { id: 1, name: "Bench Press (Barbell)" },
  { id: 2, name: "Shoulder Press (Dumbell)" },
  { id: 3, name: "Front Squat" },
  { id: 4, name: "Romanian Deadlift" },
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
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [sets, setSets] = useState<Set[]>([]);

  const addExercise = () => {
    setExercises([
      ...exercises,
      {
        ...mockExercises[Math.floor(Math.random() * mockExercises.length)],
      },
    ]);

    const newExerciseIndex = exercises.length;
    console.log(exercises, newExerciseIndex);
    if (
      sets.filter((set) => set.exerciseIndex === newExerciseIndex).length === 0
    ) {
      addSet(newExerciseIndex);
    }
  };

  const addSet = (exerciseIndex: number) => {
    setSets([
      ...sets,
      {
        weight: 0,
        reps: 0,
        isDone: false,
        exerciseIndex,
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
            <div
              key={`${index}-${exercise.name}`}
              className="flex-col gap-2 flex"
            >
              <div className="flex items-center gap-2 justify-start">
                <Avatar
                  size="sm"
                  src="/assets/dumbbell.svg"
                  style={{ padding: "4px" }}
                />
                <p className="text-primary flex-grow">
                  {exercise.name} {index}
                </p>
                <BiDotsVertical className="text-primary" size="24" />
              </div>

              <Input
                size="sm"
                variant="flat"
                classNames={{
                  inputWrapper: "bg-transparent shadow-none w-full text-sm",
                }}
                placeholder="Add notes here..."
              />

              <div className="text-primary flex items-center gap-2">
                <Button color="primary" variant="light">
                  <CgTimer size={24} />
                  Rest Timer: 35s
                </Button>
              </div>

              <Table
                removeWrapper
                aria-label="sets"
                isCompact
                classNames={{
                  base: "text-center",
                  th: "bg-transparent text-center",
                }}
              >
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
                  {sets
                    .filter((set) => set.exerciseIndex === index)
                    .map((set, index) => (
                      <TableRow key={index + 1}>
                        <TableCell>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            className=""
                            onClick={() => {
                              alert("Remove set ?");
                            }}
                          >
                            {index + 1}
                          </Button>
                        </TableCell>
                        <TableCell className="text-default-300 w-2/6">
                          {exercise.previousSet
                            ? formatPreviousSet(exercise.previousSet)
                            : "--"}
                        </TableCell>
                        <TableCell>
                          <Input
                            size="sm"
                            variant="flat"
                            classNames={{
                              inputWrapper: "bg-transparent shadow-none",
                            }}
                            placeholder={exercise.previousSet?.weight || 0}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            size="sm"
                            classNames={{
                              inputWrapper: "bg-transparent shadow-none",
                            }}
                            placeholder={exercise.previousSet?.reps || 0}
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                      </TableRow>
                    ))}
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
