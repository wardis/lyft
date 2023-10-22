import React, { useEffect } from "react";

import { useFormContext } from "react-hook-form";
import { useStopwatch } from "react-timer-hook";

import { humanize } from "@/utils/helpers";

export default function WorkoutDuration() {
  const { days, hours, minutes, seconds, totalSeconds } = useStopwatch({
    autoStart: true,
  });
  const { setValue } = useFormContext();

  useEffect(() => {
    setValue("workoutDuration", totalSeconds);
  }, [totalSeconds, setValue]);

  return (
    <>
      <p className="text-primary">{humanize(totalSeconds)}</p>
    </>
  );
}
