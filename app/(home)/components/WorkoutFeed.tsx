import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/card";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { BiShareAlt } from "react-icons/bi";

import { WorkoutSummary } from "@/components/ui/WorkoutSummary";

const EXERCISES_PER_CARD = 3;

type Props = { workouts: any[]; user: User };

export const WorkoutFeed = ({ workouts, user }: Props) => {
  return (
    <div>
      <div className="mb-2">
        <small>
          {new Date().toLocaleDateString("en-GB", {
            dateStyle: "medium",
          })}
        </small>
        <p className=" text-lg">Hi, {user.user_metadata.full_name}</p>
        <p>Good to see you here again! </p>
      </div>
      {workouts.map((workout, index) => (
        <div key={index} className="py-2">
          <Card className="rounded-md">
            <CardHeader className="border-b-1">
              <div className="flex-col flex-1 gap-2 items-start">
                <p className=" font-bold">
                  {workout.name ?? "Workout of the day"}
                </p>
                <WorkoutSummary
                  duration={workout.duration}
                  records={workout.records}
                  volume={workout.volume}
                />
              </div>
              <Button variant="light" isIconOnly>
                <BiShareAlt size={24} />
              </Button>
            </CardHeader>
            <CardBody>
              <small>Workout</small>
              {workout.exercises
                .slice(0, EXERCISES_PER_CARD)
                .map((exercise, index) => (
                  <div key={index} className="flex gap-2 items-center py-1">
                    <Avatar src="/assets/dumbbell.svg" className="p-1" />
                    <p>{exercise.base?.name}</p>
                  </div>
                ))}
              {workout.exercises.length - EXERCISES_PER_CARD > 0 ? (
                <Link href="/">
                  <small>
                    See {workout.exercises.length - EXERCISES_PER_CARD} more
                    exercise
                    {workout.exercises.length - EXERCISES_PER_CARD > 1 && "s"}.
                  </small>
                </Link>
              ) : null}
            </CardBody>
          </Card>
        </div>
      ))}
    </div>
  );
};
