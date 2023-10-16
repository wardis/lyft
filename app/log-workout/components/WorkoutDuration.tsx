import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useStopwatch } from "react-timer-hook";

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
      <p className="text-primary">
        {[
          totalSeconds >= 86400 ? `${days}d` : null,
          totalSeconds >= 3600 ? `${hours}h` : null,
          totalSeconds >= 60 ? `${minutes}min` : null,
          `${seconds}s `,
        ].join(" ")}
      </p>
    </>
  );
}
