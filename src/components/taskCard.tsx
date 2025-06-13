import { Card, CardFooter, CardBody } from "@heroui/card";
import { Textarea } from "@heroui/input";
import { useState } from "react";
import { Button } from "@heroui/button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { TaskCardProps } from "../types";
import { deleteTask, updateTask } from "../actions/tasksActions";

export function TaskCard({
  id,
  columnId,
  description,
  newField = false,
  index,
}: TaskCardProps) {
  const [value, setValue] = useState(description || "");
  const [isEditing, setIsEditing] = useState(!!newField);
  const [isInvalid, setIsInvalid] = useState(false);

  const handleSubmit = () => {
    if (value.length < 1) {
      setIsInvalid(true);

      return;
    } else {
      setIsInvalid(false);
      updateTask(id, {
        description: value,
        newField: true,
        columnId,
      });
      setIsEditing(!isEditing);
    }
  };

  const onValueChange = (newValue: string) => {
    setValue(newValue);
    if (newValue.length > 0) {
      setIsInvalid(false);
    }
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      index,
      oldColumnId: columnId,
    },
    disabled: isEditing,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    ...(isDragging
      ? { visibility: "hidden" as React.CSSProperties["visibility"] }
      : {}),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className=" relative z-50"
    >
      <Card className="mx-4 my-2">
        <CardBody>
          <Textarea
            classNames={
              !isEditing
                ? { inputWrapper: "bg-transparent shadow-none" }
                : undefined
            }
            isDisabled={!isEditing}
            isInvalid={isInvalid}
            minRows={1}
            size="sm"
            validate={(value) => {
              if (value.length < 1) {
                setIsInvalid(true);

                return "Task description cannot be empty.";
              }

              return true;
            }}
            value={value}
            variant="flat"
            onValueChange={onValueChange}
          />
        </CardBody>
        <CardFooter className="flex justify-between">
          <Button
            className="btn btn-secondary"
            size="sm"
            variant="flat"
            onPressEnd={() => {
              deleteTask(id);
            }}
          >
            Delete
          </Button>
          <Button
            className="btn btn-primary"
            size="sm"
            variant="flat"
            onPressEnd={handleSubmit}
          >
            {isEditing ? "Save" : "Edit"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
