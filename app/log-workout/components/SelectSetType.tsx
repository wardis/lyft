import React, { useEffect, useMemo, useState } from "react";

import { Button } from "@nextui-org/button";
import { setTypeMap } from "./Exercise";
import { MdDeleteOutline } from "react-icons/md";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useFormContext } from "react-hook-form";

type Props = {
  name: string;
  index: number;
};

export default function SelectSetType({ name, index }: Props) {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["normal"]));
  const { setValue, getValues } = useFormContext();

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(""),
    [selectedKeys]
  );

  useEffect(() => {
    setValue(name, selectedValue);
  }, [selectedValue, name, setValue]);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light">
          {!["drop", "failure", "warmup"].includes(selectedValue)
            ? setTypeMap["normal"](String(index))
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
          {setTypeMap["warmup"]} Warm Up Set
        </DropdownItem>
        <DropdownItem key="normal" value="normal" textValue="normal">
          {setTypeMap["normal"]("1")} Normal Set
        </DropdownItem>
        <DropdownItem key="failure" value="failure" textValue="failure">
          {setTypeMap["failure"]} Failure Set
        </DropdownItem>
        <DropdownItem key="drop" value="drop" textValue="drop">
          {setTypeMap["drop"]} Drop Set
        </DropdownItem>
        <DropdownItem key="delete" value="delete" textValue="delete">
          {<MdDeleteOutline size="1.2rem" />} Remove Set
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
