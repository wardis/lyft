"use client";

import React, { ReactNode, useEffect, useMemo, useState } from "react";

import { Avatar } from "@nextui-org/avatar";
import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import { SelectItem } from "@nextui-org/select";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import dynamic from "next/dynamic";
import { Controller, useFormContext } from "react-hook-form";
import { BiDotsVertical, BiDumbbell, BiPlus, BiTrash } from "react-icons/bi";
import { CgTimer } from "react-icons/cg";
import { MdDone } from "react-icons/md";

import { Button } from "@/components/ui/Button";

import SelectSetType from "./SelectSetType";

const Select = dynamic(() =>
  import("@nextui-org/select").then((mod) => mod.Select)
);

const durationOptions = [
  { value: "OFF", label: "off" },
  ...Array.from(Array(24).keys()).map((i) => ({
    value: (i + 1) * 5,
    label: "" + (i + 1) * 5 + "s",
  })),
  ...Array.from(Array(12).keys()).map((i) => ({
    value: 120 + (i + 1) * 15,
    label: "" + 120 + (i + 1) * 15 + "s",
  })),
];

export type ExerciseSet = {
  position: number;
  weight?: string;
  reps?: string;
  isDone: boolean;
  type?: "normal" | "warmup" | "failure" | "drop";
};

export const setTypeMap: Record<string, any> = {
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
  // exerciseIndex: number;
  onDelete: (index: number) => void;
};

export default function Exercise({ exercise, onDelete }: Props) {
  const [sets, setSets] = useState<ExerciseSet[]>([
    {
      position: 0,
      isDone: false,
    },
  ]);
  const [restDuration, setRestDuration] = useState<Set<string>>(new Set([]));
  const { register, control } = useFormContext();

  const addSet = () => {
    setSets((prev) => [
      ...prev,
      {
        position: prev.length,
        isDone: false,
      },
    ]);
  };

  const deleteSet = (position: number) => () => {
    setSets(
      (prev) => prev.filter((set) => set.position !== position)
      // .map((set, index) => ({ ...set, position: index })) // TODO: rethink key position when deleting a set
      // indexOf? uuid ?
    );
  };

  const renderCell = (set: ExerciseSet, columnKey: React.Key) => {
    const cellValue = set[columnKey as keyof ExerciseSet];

    switch (columnKey) {
      case "set": {
        const { name } = register(
          `exercises.${exercise.exerciseKey}.sets.${set.position}.type`
        );
        return (
          <SelectSetType
            name={name}
            index={set.position}
            deleteSet={deleteSet(set.position)}
          />
        );
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
              `exercises.${exercise.exerciseKey}.sets.${set.position}.weight`
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
              `exercises.${exercise.exerciseKey}.sets.${set.position}.reps`
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
            name={`exercises.${exercise.exerciseKey}.sets.${set.position}.isDone`}
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
        <Avatar size="sm" src="/assets/dumbbell.svg" className="p-1" />
        <p className="text-primary flex-grow">{exercise.name}</p>
        <Button onClick={onDelete} variant="light" isIconOnly>
          <BiTrash className="text-primary" size="20" />
        </Button>
      </div>
      <div className="grid grid-cols-10 gap-2">
        <Select
          className="text-primary h-3 col-span-3"
          startContent={<CgTimer size={24} />}
          label="Rest timer"
          placeholder="Duration"
          selectedKeys={restDuration}
          size="sm"
          onSelectionChange={setRestDuration}
          {...register("exercises." + exercise.exerciseKey + ".restTimer")}
        >
          {durationOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </Select>
        <Input
          size="sm"
          variant="flat"
          className="col-span-7"
          classNames={{
            inputWrapper: "bg-transparent shadow-none w-full text-sm h-[3rem]",
          }}
          // value={exercise.notes}
          {...register("exercises." + exercise.exerciseKey + ".notes")}
          // onChange={(e) => setNotes(e.target.value)}
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
