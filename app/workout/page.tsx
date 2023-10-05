"use client";
import { Button } from "@nextui-org/button";
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
    <div>
      <h1>Workout</h1>

      <div className="mt-4">
        <h2 className="mb-2">Quick Start</h2>
        <Button>
          <BiPlus />
          Start Empty Workout
        </Button>
      </div>

      <div className="mt-4">
        <h2 className="mb-2">Routines</h2>
        <div className="flex gap-4">
          <Button>
            <HiOutlineClipboardList /> New Routine
          </Button>
          <Button>
            <BiSearch /> Explore
          </Button>
        </div>
      </div>

      <div className="mt-4">
        <Accordion>
          <AccordionItem title={"My Routines (" + userRoutines.length + ")"}>
            {userRoutines.map((routine) => (
              <div key={routine.id} className="mb-4">
                <Card>
                  <CardHeader className="px-5">{routine.name}</CardHeader>
                  <CardBody className="text-small py-0">
                    {routine.description}
                  </CardBody>
                  <CardFooter>
                    <Button fullWidth>Start Routine</Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
