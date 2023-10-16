import React from "react";
import WorkoutDuration from "./WorkoutDuration";
import { Divider } from "@nextui-org/divider";

type Props = {
  workoutVolume: number;
  workoutSets: number;
};

export default function WorkoutSummary({ workoutVolume, workoutSets }: Props) {
  return (
    <div>
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
            <p>{workoutSets}</p>
          </div>
        </div>
        <Divider />
      </div>
    </div>
  );
}
