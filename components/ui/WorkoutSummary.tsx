import { BiMedal } from "react-icons/bi";

type Props = { duration: number; volume: number; records?: number };

export const WorkoutSummary = ({ duration, volume, records }: Props) => {
  return (
    <div className="grid grid-cols-4 w-full">
      {duration ? (
        <div className="">
          <small>Time</small>
          <p className="text-sm">{duration}min</p>
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
