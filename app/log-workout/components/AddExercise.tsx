import React, { useState } from "react";

import { Avatar } from "@nextui-org/avatar";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { BiSearch } from "react-icons/bi";

import { Button } from "@/components/ui/Button";

import { Exercise } from "../page";

type Props = {
  exercises: (Exercise & { image?: string; target?: string })[];
  onSubmit: (ids: string[]) => void;
};

export default function AddExercise({ exercises, onSubmit }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedExerciseIds, setSelectedExerciseIds] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");
  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <Button onPress={onOpen}>Add Exercice</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="blur"
        scrollBehavior="inside"
      >
        <ModalContent className="relative">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-3 ">
                <p>Add Exercise</p>
                <Input
                  startContent={<BiSearch />}
                  placeholder="Search exercise"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <div className="flex gap-1">
                  <Button className="flex-1">All Equipment</Button>
                  <Button className="flex-1">All Muscles</Button>
                </div>
              </ModalHeader>
              <ModalBody>
                <p>Recent Exercises</p>
                <Listbox
                  aria-label="exercise selection"
                  variant="solid"
                  className=" flex flex-col divide-y"
                  itemClasses={{
                    base: " py-3 rounded-none",
                  }}
                  selectionMode="multiple"
                  selectedKeys={selectedExerciseIds}
                  onSelectionChange={setSelectedExerciseIds as any}
                >
                  {filteredExercises.map(({ name, id, image, target }) => (
                    <ListboxItem key={id} textValue={name}>
                      <div className="flex gap-3">
                        <Avatar src={image} className="p-2 bg-blue-200" />
                        <div className="flex flex-col">
                          <p className="font-bold">{name}</p>
                          <p>{target}</p>
                        </div>
                      </div>
                    </ListboxItem>
                  ))}
                </Listbox>

                <div className="py-4">
                  {Array.from(selectedExerciseIds).length ? (
                    <Button
                      className="py-4 absolute m-auto w-60 left-0 right-0 bottom-4 z-10"
                      variant="solid"
                      color="primary"
                      onClick={() => {
                        onSubmit(Array.from(selectedExerciseIds));
                        onClose();
                        setSelectedExerciseIds([]);
                      }}
                    >
                      Add exercise(s)
                    </Button>
                  ) : null}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
