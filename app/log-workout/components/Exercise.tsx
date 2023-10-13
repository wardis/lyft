"use client";

import React, { useState, useId } from "react";

import { Button } from "@/components/ui/Button";
import { Checkbox } from "@nextui-org/checkbox";
import { Avatar } from "@nextui-org/avatar";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { BiDotsVertical, BiDumbbell, BiPlus } from "react-icons/bi";
import { MdDone } from "react-icons/md";
import { CgTimer } from "react-icons/cg";
import { Input } from "@nextui-org/input";

type Set = {
  position: number;
  weight?: string;
  reps?: string;
  isDone: boolean;
};

type Props = {
  exercise: any;
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
  },
  { name: "REPS", uid: "reps" },
  { name: <MdDone />, uid: "done" },
];

const formatPreviousSet = ({
  weight,
  reps,
}: {
  weight: string;
  reps: string;
}) => `${weight}kg x ${reps}`;

export default function Exercise({ exercise }: Props) {
  const [sets, setSets] = useState<Set[]>([
    {
      position: 1,
      isDone: false,
    },
  ]);

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

  const changeWeight = (position: number, value: string) => {
    setSets((oldSets) =>
      oldSets.map((set) => {
        if (set.position === position) {
          return { ...set, weight: value };
        }
        return set;
      })
    );
  };
  const changeReps = (position: number, value: string) => {
    setSets((oldSets) =>
      oldSets.map((set) => {
        if (set.position === position) {
          return { ...set, reps: value };
        }
        return set;
      })
    );
  };
  const changeDone = (position: number, value: boolean) => {
    setSets((oldSets) =>
      oldSets.map((set) => {
        if (set.position === position) {
          return { ...set, isDone: value };
        }
        return set;
      })
    );
  };

  const renderCell = (set: Set, columnKey: React.Key) => {
    const cellValue = set[columnKey as keyof Set];

    switch (columnKey) {
      case "set":
        return (
          <Button
            isIconOnly
            size="sm"
            variant="light"
            className=""
            onClick={() => {
              deleteSet(set.position);
            }}
          >
            {set.position}
          </Button>
        );
      case "previous":
        return "--";
      case "weight":
        return (
          <Input
            size="sm"
            variant="flat"
            classNames={{
              inputWrapper: "bg-transparent shadow-none",
            }}
            placeholder={exercise.previousSet?.weight ?? "0"}
            value={set.weight ?? ""}
            onChange={(e) => changeWeight(set.position, e.target.value)}
          />
        );
      case "reps":
        return (
          <Input
            size="sm"
            classNames={{
              inputWrapper: "bg-transparent shadow-none",
            }}
            type="number"
            placeholder={exercise.previousSet?.reps ?? "0"}
            value={set.reps ?? ""}
            onChange={(e) => changeReps(set.position, e.target.value)}
          />
        );
      case "done":
        return (
          <Checkbox
            checked={set.isDone}
            onChange={(e) => changeDone(set.position, e.target.checked)}
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
