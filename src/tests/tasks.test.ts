import { expect, test } from "vitest";
import {
  store,
  createTask,
  deleteTask,
  updateTask,
  updateTaskOnBack,
  getTasksOnBack,
  removeTaskOnBack,
} from "@store";

import { RemoveTaskAction, Task, UpdateTaskAction } from "@/types";

const testTask: Task = {
  id: "1234-1234-1234-1234",
  columnId: "todo",
  description: "Test task description",
  newField: false,
};

const updateTaskAction: UpdateTaskAction = {
  type: "UPDATE_TASK",
  payload: {
    id: testTask.id,
    columnId: testTask.columnId,
    newField: false,
    data: {
      description: testTask.description,
    },
  },
};

const removeTaskAction: RemoveTaskAction = {
  type: "REMOVE_TASK",
  payload: testTask.id,
};

const getTasksFromReduxStore = () => {
  const state = store.getState();

  return state.tasks;
};

const cleanUpReduxStore = (taskId: string) => {
  deleteTask(taskId);
};

const createTaskOnBack = async (action: UpdateTaskAction) => {
  await updateTaskOnBack(action);
};

const cleanUpOnBack = () => {
  localStorage.clear();
};

test("it should create task in Redux store", () => {
  createTask(testTask.columnId);
  const tasksInStore = getTasksFromReduxStore();

  expect(tasksInStore.length).toBe(1);
  cleanUpReduxStore(tasksInStore[0].id);
  cleanUpOnBack();
});

test("it should delete task from Redux store", () => {
  createTask(testTask.columnId);
  const tasksInStoreBeforeCleanUp = getTasksFromReduxStore();

  cleanUpReduxStore(tasksInStoreBeforeCleanUp[0].id);
  cleanUpOnBack();

  const tasksInStoreAfterCleanUp = getTasksFromReduxStore();

  expect(
    tasksInStoreAfterCleanUp.find(
      (task) => task.id === tasksInStoreBeforeCleanUp[0].id,
    ),
  ).toBeFalsy;
});

test("it should update task in Redux store", () => {
  createTask(testTask.columnId);
  const taskBeforeEdit = getTasksFromReduxStore()[0];

  updateTask(taskBeforeEdit.id, { description: testTask.description });

  const taskAfterEdit = getTasksFromReduxStore()[0];

  cleanUpOnBack();

  expect(taskAfterEdit.description).toBe(testTask.description);
});

test("it should create task in LocalStorage", async () => {
  await createTaskOnBack(updateTaskAction);
  const tasksString = localStorage.getItem("tasks");
  const tasks = tasksString ? JSON.parse(tasksString) : [];

  cleanUpOnBack();

  expect(JSON.stringify(tasks[0])).toBe(
    JSON.stringify(updateTaskAction.payload),
  );
});

test("it should create multiple tasks in LocalStorage", async () => {
  await createTaskOnBack({
    ...updateTaskAction,
    payload: {
      ...updateTaskAction.payload,
      id: "first-task",
    },
  });
  await createTaskOnBack({
    ...updateTaskAction,
    payload: {
      ...updateTaskAction.payload,
      id: "second-task",
    },
  });

  const tasksString = localStorage.getItem("tasks");
  const tasks = tasksString ? JSON.parse(tasksString) : [];

  cleanUpOnBack();

  expect(tasks.length).toBeGreaterThan(1);
});

test("it should retrieve tasks from LocalStorage", async () => {
  localStorage.setItem("tasks", JSON.stringify([updateTaskAction.payload]));

  const tasks = (await getTasksOnBack()) ?? "";

  expect(tasks[0]).toBeDefined;
  cleanUpOnBack();
});

test("it should delete task from LocalStorage", async () => {
  localStorage.setItem("tasks", JSON.stringify([updateTaskAction.payload]));
  removeTaskOnBack(removeTaskAction);
  const tasksStr = localStorage.getItem("tasks") ?? "";
  const tasks = JSON.parse(tasksStr);

  expect(tasks.find((task: Task) => task.id === testTask.id)).toBeFalsy;
});
