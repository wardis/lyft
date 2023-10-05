"use client";
import { Button } from "@/components/ui/Button";
import {
  Accordion,
  AccordionItem,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { BiPlus, BiSearch } from "react-icons/bi";
import { HiOutlineClipboardList } from "react-icons/hi";

const userRoutines = [
  {
    id: 1,
    name: "Full Body",
    description:
      "Front squat, RDL, Barbell curl, Bulgarian split squat, Single Leg Extension, Seated Calf Raises",
  },
  {
    id: 2,
    name: "Legs",
    description:
      "Front squat, RDL, Barbell curl, Bulgarian split squat, Single Leg Extension, Seated Calf Raises",
  },
  {
    id: 3,
    name: "Pull",
    description:
      "Front squat, RDL, Barbell curl, Bulgarian split squat, Single Leg Extension, Seated Calf Raises",
  },
  {
    id: 4,
    name: "Push",
    description:
      "Front squat, RDL, Barbell curl, Bulgarian split squat, Single Leg Extension, Seated Calf Raises",
  },
];

export default function Workout() {
  return (
    <>
      <h1>Workout</h1>

      <div className="mt-4">
        <h2 className="mb-2">Quick Start</h2>
        <Button className="w-full">
          <BiPlus />
          Start Empty Workout
        </Button>
      </div>

      <div className="mt-4">
        <h2 className="mb-2">Routines</h2>
        <div className="flex gap-4">
          <Button className="flex-1">
            <HiOutlineClipboardList /> New Routine
          </Button>
          <Button className="flex-1">
            <BiSearch /> Explore
          </Button>
        </div>
      </div>

      <div className="mt-4">
        <Accordion isCompact>
          <AccordionItem title={"My Routines (" + userRoutines.length + ")"}>
            {userRoutines.map((routine) => (
              <div key={routine.id} className="mb-4 border rounded-lg p-4">
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold">{routine.name}</h3>
                  <p className="text-small py-0 line-clamp-2">
                    {routine.description}
                  </p>
                  <div>
                    <Button fullWidth>Start Routine</Button>
                  </div>
                </div>
              </div>
            ))}
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
