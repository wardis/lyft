// "use client";

// import React from "react";

// import { Select, SelectItem } from "@nextui-org/select";
// import { CgTimer } from "react-icons/cg";

// const durationOptions = [
//   { value: "OFF", label: "off" },
//   ...Array.from(Array(24).keys()).map((i) => ({
//     value: (i + 1) * 5,
//     label: "" + (i + 1) * 5 + "s",
//   })),
//   ...Array.from(Array(12).keys()).map((i) => ({
//     value: 120 + (i + 1) * 15,
//     label: "" + 120 + (i + 1) * 15 + "s",
//   })),
// ];

// type Props = {
//   restDuration: any;
//   setRestDuration: any;
//   restTimerMethods: any;
// };

// export default function RestTimer({
//   restDuration,
//   setRestDuration,
//   restTimerMethods,
// }: Props) {
//   const value = Array.from(restDuration)[0];

//   return (
//     <>
//       <Select
//         className="text-primary h-3 col-span-3"
//         startContent={<CgTimer size={24} />}
//         label="Rest timer"
//         placeholder="Duration"
//         selectedKeys={restDuration}
//         size="sm"
//         onSelectionChange={setRestDuration}
//         {...restTimerMethods}
//       >
//         {durationOptions.map((option) => (
//           <SelectItem key={option.value} value={option.value}>
//             {option.label}
//           </SelectItem>
//         ))}
//       </Select>
//     </>
//   );
// }
