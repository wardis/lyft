import React, { useEffect, useMemo, useState } from "react";

import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useFormContext } from "react-hook-form";
import { MdDeleteOutline } from "react-icons/md";

import { setTypeMap } from "./Exercise";

type Props = {
  name: string;
  index: number;
  deleteSet: () => void;
};

export default function SelectSetType({ name, index, deleteSet }: Props) {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["normal"]));
  const { setValue, getValues } = useFormContext();

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(""),
    [selectedKeys]
  );

  useEffect(() => {
    if (selectedValue == "delete") return deleteSet();
    setValue(name, selectedValue);
  }, [selectedValue, name, setValue, deleteSet]);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light">
          {!["drop", "failure", "warmup"].includes(selectedValue)
            ? setTypeMap["normal"](String(index + 1))
            : setTypeMap[selectedValue]}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Select set type"
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <DropdownItem key="warmup" value="warmup" textValue="warmup">
          <div className="flex gap-2">{setTypeMap["warmup"]} Warm Up Set</div>
        </DropdownItem>
        <DropdownItem key="normal" value="normal" textValue="normal">
          <div className="flex gap-2">
            {setTypeMap["normal"]("1")} Normal Set
          </div>
        </DropdownItem>
        <DropdownItem key="failure" value="failure" textValue="failure">
          <div className="flex gap-2">{setTypeMap["failure"]} Failure Set</div>
        </DropdownItem>
        <DropdownItem key="drop" value="drop" textValue="drop">
          <div className="flex gap-2">{setTypeMap["drop"]} Drop Set</div>
        </DropdownItem>
        <DropdownItem key="delete" value="delete" textValue="delete">
          <div className="flex gap-2">
            {<MdDeleteOutline size="1.2rem" />} Remove Set
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
