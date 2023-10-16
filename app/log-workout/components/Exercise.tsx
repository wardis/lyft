"use client";

import React, { useEffect, useState } from "react";

import { Avatar } from "@nextui-org/avatar";
import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { Controller, useFormContext } from "react-hook-form";
import { BiDotsVertical, BiDumbbell, BiPlus } from "react-icons/bi";
import { MdDone } from "react-icons/md";

import { Button } from "@/components/ui/Button";

import RestTimer from "./RestTimer";
import SelectSetType from "./SelectSetType";

type ExerciseSet = {
  position: number;
  weight?: string;
  reps?: string;
  isDone: boolean;
  type?: "normal" | "warmup" | "failure" | "drop";
};

export const setTypeMap = {
  normal: (position: string) => (
    <p className="font-bold w-5 text-center">{position}</p>
  ),
  warmup: <p className="text-warning font-bold w-5 text-center">W</p>,
  failure: <p className="text-danger font-bold w-5 text-center">F</p>,
  drop: <p className=" text-cyan-500 font-bold w-5 text-center">D</p>,
};

const columns = [
  { name: "SET", uid: "set" },
  { name: "PREVIOUS", uid: "previous" },
  {
    name: (
      <div className="flex items-center gap-1">
        <BiDumbbell />
        KG
      </div>
    ),
    uid: "weight",
    large: true,
  },
  { name: "REPS", uid: "reps" },
  { name: <MdDone />, uid: "done" },
];

const formatPreviousSet = ({ weight, reps } = { weight: "", reps: "" }) =>
  weight && reps ? `${weight}kg x ${reps}` : null;

type Props = {
  exercise: any;
  onMetaUpdate: (meta: { volume: number; sets: number }) => void;
  exerciseIndex: number;
};

export default function Exercise({
  exercise,
  onMetaUpdate,
  exerciseIndex,
}: Props) {
  const [sets, setSets] = useState<ExerciseSet[]>([
    {
      position: 1,
      isDone: false,
    },
  ]);
  const [notes, setNotes] = useState(exercise.notes ?? "");
  const [restDuration, setRestDuration] = useState<Selection>(new Set([]));

  const { register, setValue, control } = useFormContext();

  const exerciseMeta = sets.reduce(
    (acc, set) => {
      if (set.isDone) {
        return {
          volume: acc.volume + parseInt(set.weight) * parseInt(set.reps),
          sets: acc.sets + 1,
        };
      }
      return acc;
    },
    { volume: 0, sets: 0 }
  );
  // useEffect(() => onMetaUpdate({ ...exerciseMeta, notes }), [exerciseMeta]);

  const addSet = () => {
    setSets([
      ...sets,
      {
        position: sets.length + 1,
        isDone: false,
      },
    ]);
  };

  const deleteSet = (position: number) => {
    setSets((oldSets) =>
      oldSets
        .filter((set) => set.position !== position)
        .map((set, index) => ({ ...set, position: index + 1 }))
    );
  };

  const renderCell = (set: ExerciseSet, columnKey: React.Key) => {
    const cellValue = set[columnKey as keyof ExerciseSet];

    switch (columnKey) {
      case "set": {
        const { name } = register(
          `exercises.${exerciseIndex}.sets.${set.position}.type`
        );
        return <SelectSetType name={name} index={set.position} />;
      }
      case "previous":
        return (
          <p className=" text-gray-400">
            {formatPreviousSet(exercise.previousSet) ?? "-"}
          </p>
        );
      case "weight":
        return (
          <Input
            {...register(
              `exercises.${exerciseIndex}.sets.${set.position}.weight`
            )}
            size="sm"
            variant="flat"
            classNames={{
              inputWrapper: "bg-transparent shadow-none",
            }}
            placeholder={exercise.previousSet?.weight ?? "0"}
          />
        );
      case "reps":
        return (
          <Input
            {...register(
              `exercises.${exerciseIndex}.sets.${set.position}.reps`
            )}
            size="sm"
            classNames={{
              inputWrapper: "bg-transparent shadow-none",
            }}
            placeholder={exercise.previousSet?.reps ?? "0"}
          />
        );
      case "done":
        return (
          <Controller
            control={control}
            name={`exercises.${exerciseIndex}.sets.${set.position}.isDone`}
            render={({ field: { onChange, value } }) => (
              <Checkbox checked={value} onChange={onChange} />
            )}
          />
        );

      default:
        return cellValue;
    }
  };

  return (
    <div className="flex-col gap-2 flex">
      <div className="flex items-center gap-2 justify-start">
        <Avatar
          size="sm"
          src="/assets/dumbbell.svg"
          style={{ padding: "4px" }}
        />
        <p className="text-primary flex-grow">{exercise.name}</p>
        <BiDotsVertical className="text-primary" size="24" />
      </div>
      <div className="grid grid-cols-10 gap-2">
        <RestTimer
          name={"exercises." + exerciseIndex + ".restTimer"}
          restDuration={restDuration}
          setRestDuration={setRestDuration}
        />
        <Input
          size="sm"
          variant="flat"
          className="col-span-7"
          classNames={{
            inputWrapper: "bg-transparent shadow-none w-full text-sm h-[3rem]",
          }}
          value={exercise.notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add notes here..."
        />
      </div>

      <div className=" relative">
        <Table
          removeWrapper
          aria-label="sets"
          isCompact
          classNames={{
            base: "text-center",
            th: "bg-transparent text-center",
          }}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={sets}>
            {(set) => (
              <TableRow key={set.position}>
                {(columnKey) => (
                  <TableCell>{renderCell(set, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Button
        size="sm"
        className=" w-2/4 mx-auto"
        onClick={() => {
          addSet();
        }}
      >
        <BiPlus /> Add Set
      </Button>
    </div>
  );
}
