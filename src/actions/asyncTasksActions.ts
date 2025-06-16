import { RemoveTaskAction, Task, UpdateTaskAction } from "@/types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const updateTaskAsync = async (
  action: UpdateTaskAction,
): Promise<Task[] | undefined> => {
  await delay(1000);

  const tasksStr = localStorage.getItem("tasks");

  if (!tasksStr) {
    localStorage.setItem(
      "tasks",
      JSON.stringify([{ ...action.payload, newField: false }]),
    );

    return;
  }
  const oldTasks: Task[] = JSON.parse(tasksStr);
  const oldIndex = oldTasks.findIndex((task) => task.id === action.payload.id);

  if (oldIndex === -1) {
    const newTasks = [{ ...action.payload, newField: false }, ...oldTasks];

    localStorage.setItem("tasks", JSON.stringify(newTasks));

    return newTasks;
  }

  const oldTask = oldTasks[oldIndex];
  const newTask = { ...oldTask, ...action.payload, newField: false };
  const newIndex =
    action.payload.index !== undefined ? action.payload.index : oldIndex;

  const tasksWithoutOld = [
    ...oldTasks.slice(0, oldIndex),
    ...oldTasks.slice(oldIndex + 1),
  ];

  const newTasks = [
    ...tasksWithoutOld.slice(0, newIndex),
    newTask,
    ...tasksWithoutOld.slice(newIndex),
  ];

  localStorage.setItem("tasks", JSON.stringify(newTasks));

  return newTasks;
};

export const getTasksAsync = async (): Promise<Task[] | undefined> => {
  await delay(1000);

  const tasksStr = localStorage.getItem("tasks");

  if (!tasksStr) {
    return undefined;
  }

  return JSON.parse(tasksStr);
};

export const removeTaskAsync = async (action: RemoveTaskAction) => {
  await delay(1000);

  const tasksStr = localStorage.getItem("tasks");

  if (!tasksStr) {
    return;
  }

  const oldTasks: Task[] = JSON.parse(tasksStr);
  const oldIndex = oldTasks.findIndex((task) => task.id === action.payload);

  if (oldIndex === -1) {
    return;
  }

  const tasksWithoutOld = [
    ...oldTasks.slice(0, oldIndex),
    ...oldTasks.slice(oldIndex + 1),
  ];

  localStorage.setItem("tasks", JSON.stringify(tasksWithoutOld));
};
