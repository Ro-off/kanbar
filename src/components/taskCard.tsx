import { Card, CardFooter, CardBody } from "@heroui/card";
import { Textarea } from "@heroui/input";
import { useState } from "react";
import { Button } from "@heroui/button";

export function TaskCard({ description, newField, date }: TaskCardProps) {
  const [value, setValue] = useState(description || "");
  const [isEditing, setIsEditing] = useState(!!newField);

  return (
    <Card className="mx-4 my-2">
      <CardBody>
        <Textarea
          classNames={
            !isEditing
              ? { inputWrapper: "bg-transparent shadow-none" }
              : undefined
          }
          isDisabled={!isEditing}
          minRows={1}
          size="sm"
          value={value}
          variant="flat"
          onValueChange={setValue}
        />
      </CardBody>
      <CardFooter className="flex justify-between items-center">
        <span className="text-xs text-gray-500">
          {date ? date.toLocaleTimeString() : "No date set"}
        </span>
        <Button
          className="btn btn-primary"
          size="sm"
          variant="flat"
          onPressEnd={() => {
            setIsEditing(!isEditing);
          }}
        >
          {isEditing ? "Save" : "Edit"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export type TaskCardProps = {
  description?: string;
  newField?: boolean;
  date: Date;
};
