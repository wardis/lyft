"use client";

import React, { useState, useId } from "react";

import { Button } from "@/components/ui/Button";
import { Button as NextUIButton } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  DropdownSection,
} from "@nextui-org/dropdown";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { BiDotsVertical, BiDumbbell, BiPlus } from "react-icons/bi";
import { MdDelete, MdDeleteOutline, MdDone } from "react-icons/md";
import { CgTimer } from "react-icons/cg";
import { Input } from "@nextui-org/input";

type Set = {
  position: number;
  weight?: string;
  reps?: string;
  isDone: boolean;
  type?: "normal" | "warmup" | "failure" | "drop";
};

type Props = {
  exercise: any;
};

const setTypeMap = {
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
  const changeType = (position: number, value: Set["type"]) => {
    setSets((oldSets) =>
      oldSets.map((set) => {
        if (set.position === position) {
          return { ...set, type: value };
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
          <Dropdown backdrop="blur">
            <DropdownTrigger>
              <NextUIButton isIconOnly size="sm" variant="light">
                {!["drop", "failure", "warmup"].includes(set.type)
                  ? setTypeMap["normal"](String(set.position))
                  : setTypeMap[set.type]}
              </NextUIButton>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Set action menu"
              onAction={(key) => {
                if (key === "delete") return deleteSet(set.position);
                changeType(set.position, key as Set["type"]);
                // setSets(
                //   sets.map((prevSet) => {
                //     if (prevSet.position === set.position)
                //       return { ...prevSet, type: key as Set["type"] };
                //     return prevSet;
                //   })
                // );
              }}
            >
              <DropdownSection
                title="Select set type"
                classNames={{ heading: "text-center" }}
              >
                <DropdownItem key="warmup" startContent={setTypeMap["warmup"]}>
                  Warm Up Set
                </DropdownItem>
                <DropdownItem
                  key="normal"
                  startContent={setTypeMap["normal"]("1")}
                >
                  Normal Set
                </DropdownItem>
                <DropdownItem
                  key="failure"
                  startContent={setTypeMap["failure"]}
                >
                  Failure Set
                </DropdownItem>
                <DropdownItem key="drop" startContent={setTypeMap["drop"]}>
                  Drop Set
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  startContent={<MdDeleteOutline size="1.2rem" />}
                >
                  Remove Set
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        );
      case "previous":
        return (
          <p className=" text-gray-400">
            {formatPreviousSet(exercise.previousSet) ?? "-"}
          </p>
        );
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
