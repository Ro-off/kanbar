import { Card, CardHeader, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Button } from "@heroui/button";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { useState } from "react";

import { TaskCard, TaskCardProps } from "./taskCard";
import { PlusIcon } from "./icons";

export function TaskRow({
  title,
  headerColor,
  // taskList,
}: {
  title: string;
  headerColor?: string;
  // taskList?: any[];
}) {
  const [taskList, setTaskList] = useState<TaskCardProps[]>([
    { description: "Task 1", newField: false, date: new Date() },
    { description: "Task 2", newField: false, date: new Date() },
    { description: "Task 3", newField: false, date: new Date() },
  ]);

  return (
    <Card className="variant w-72 h-full ">
      <CardHeader
        className={`flex flex-row justify-between opacity-80 ${headerColor ?? "bg-gray-100"}`}
      >
        <h2 className="text-lg font-semibold">{title}</h2>
        <Button
          isIconOnly
          className="mt-2"
          color="default"
          radius="full"
          variant="light"
          onPress={() => {
            setTaskList([
              { description: "", newField: true, date: new Date() },
              ...taskList,
            ]);
          }}
        >
          <PlusIcon className="h-5 w-5" />
          <span className="sr-only">Add Task</span>
        </Button>
      </CardHeader>
      <Divider />

      <CardBody className="p-0 ">
        <ScrollShadow className="h-full ">
          {taskList && taskList.length > 0 ? (
            taskList.map((task) => (
              <TaskCard
                key={task.description + task.date.toISOString()}
                date={task.date}
                description={task.description}
                newField={task.newField}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center m-4">No tasks available.</p>
          )}
        </ScrollShadow>
      </CardBody>
    </Card>
  );
}
