import { BiMedal } from "react-icons/bi";

import { humanize } from "@/utils/helpers";

type Props = { duration: number; volume: number; records?: number };

export const WorkoutSummary = ({ duration, volume, records }: Props) => {
  return (
    <div className="grid grid-cols-3 w-full">
      {duration ? (
        <div className="">
          <small>Time</small>
          <p className="text-sm">{humanize(duration)}</p>
        </div>
      ) : null}
      {volume ? (
        <div className="">
          <small>Volume</small>
          <p className="text-sm">{volume}kg</p>
        </div>
      ) : null}
      {records ? (
        <div className="">
          <small>Records</small>
          <p className="flex items-center gap-1 text-sm">
            {records} <BiMedal />
          </p>
        </div>
      ) : null}
    </div>
  );
};
