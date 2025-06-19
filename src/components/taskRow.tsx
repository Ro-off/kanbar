import { Card, CardHeader, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Button } from "@heroui/button";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { TaskCard, PlusIcon } from "@components";
import { useSelector } from "react-redux";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { TasksState, TaskRowProps, rowVariants } from "@types";
import { createTask } from "@store";

type withId = {
  id: string;
  columnId: keyof typeof rowVariants;
  description?: string;
  newField?: boolean;
};

export const TaskRow = ({ columnId }: TaskRowProps) => {
  const { title, headerColor } = rowVariants[columnId] || {
    title: "Invalid column Id",
    headerColor: "bg-danger-500",
  };

  const taskList = useSelector((state: TasksState) =>
    state.tasks.filter((task: withId) => task.columnId === columnId),
  );

  const { setNodeRef } = useDroppable({
    id: columnId,
  });

  return (
    <Card disableRipple className="xl:w-96 w-72 h-full ">
      <CardHeader
        className={`flex flex-row justify-between opacity-80 ${headerColor} p-4 rounded-t-lg`}
      >
        <h2 className="text-lg font-semibold">{title}</h2>
        <Button
          isIconOnly
          className="mt-2"
          color="default"
          radius="full"
          variant="light"
          onPress={() => {
            createTask(columnId);
          }}
        >
          <PlusIcon className="h-5 w-5" />
          <span className="sr-only">Add Task</span>
        </Button>
      </CardHeader>
      <Divider />
      <CardBody className="p-0 w-full ">
        <ScrollShadow
          ref={setNodeRef}
          className="h-full"
          orientation="vertical"
        >
          <div className="w-full overflow-x-hidden h-full">
            {taskList && taskList.length > 0 ? (
              <SortableContext id={columnId} items={taskList}>
                {taskList.map((task, index) => (
                  <TaskCard
                    key={task.id}
                    columnId={task.columnId}
                    description={task.description}
                    id={task.id}
                    index={index}
                    newField={task.newField}
                  />
                ))}
              </SortableContext>
            ) : (
              <p className="text-gray-500 text-center m-4">
                No tasks available.
              </p>
            )}
          </div>
        </ScrollShadow>
      </CardBody>
    </Card>
  );
};
