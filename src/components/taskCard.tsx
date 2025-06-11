import { Card, CardFooter, CardBody } from "@heroui/card";
import { Textarea } from "@heroui/input";
import { useState } from "react";
import { Button } from "@heroui/button";

export function TaskCard({ description, newField }: TaskCardProps) {
  const [value, setValue] = useState(description || "");
  const [isEditing, setIsEditing] = useState(!!newField);
  const [isInvalid, setIsInvalid] = useState(false);

  const onSubmit = () => {
    if (value.length < 1) {
      setIsInvalid(true);

      return;
    } else {
      setIsInvalid(false);
      setIsEditing(!isEditing);
    }
  };

  const onValueChange = (newValue: string) => {
    setValue(newValue);
    if (newValue.length > 0) {
      setIsInvalid(false);
    }
  };

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
      <CardFooter className="flex justify-end">
        <Button
          className="btn btn-primary"
          size="sm"
          variant="flat"
          onPressEnd={() => {
            onSubmit();
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
};
