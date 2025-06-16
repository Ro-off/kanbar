import { expect, test } from "vitest";
import { store } from "@store";

import { createTask, deleteTask, updateTask } from "../tasks";

import { Task } from "@/types";

const testTask: Task = {
  id: "1234-1234-1234-1234",
  columnId: "todo",
  description: "Test task description",
  newField: false,
};

const getTasksFromReduxStore = () => {
  const state = store.getState();

  return state.tasks;
};

const cleanUpReduxStore = (taskId: string) => {
  deleteTask(taskId);
};

test("Check ability to create task in Redux store", () => {
  createTask(testTask.columnId);
  const tasksInStore = getTasksFromReduxStore();

  expect(tasksInStore.length).toBe(1);
  cleanUpReduxStore(tasksInStore[0].id);
});

test("Check ability to delete task in Redux store", () => {
  createTask(testTask.columnId);
  const tasksInStoreBeforeCleanUp = getTasksFromReduxStore();

  cleanUpReduxStore(tasksInStoreBeforeCleanUp[0].id);
  const tasksInStoreAfterCleanUp = getTasksFromReduxStore();

  expect(
    tasksInStoreAfterCleanUp.find(
      (task) => task.id === tasksInStoreBeforeCleanUp[0].id,
    ),
  ).toBeFalsy;
});

test("Check ability to update task in Redux store", () => {
  createTask(testTask.columnId);
  const taskBeforeEdit = getTasksFromReduxStore()[0];

  updateTask(taskBeforeEdit.id, { description: testTask.description });

  const taskAfterEdit = getTasksFromReduxStore()[0];

  expect(taskAfterEdit.description).toBe(testTask.description);
});
