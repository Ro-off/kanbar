import { takeEvery } from "redux-saga/effects";
import { ColumnIds } from "@types";

import {
  AddTaskAction,
  RemoveTaskAction,
  Task,
  TaskAction,
  TasksState,
  UpdateTaskAction,
} from "../types";

import { store } from "./configureStore";

const ADD_TASK = "ADD_TASK";
const REMOVE_TASK = "REMOVE_TASK";
const UPDATE_TASK = "UPDATE_TASK";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const updateTask = (id: string, updatedFields: Partial<Task>) => {
  store.dispatch({
    type: UPDATE_TASK,
    payload: {
      id,
      ...updatedFields,
    },
  });
};

export const deleteTask = (id: string) => {
  store.dispatch({
    type: REMOVE_TASK,
    payload: id,
  });
};

export const createTask = (columnId: ColumnIds) =>
  store.dispatch({
    type: ADD_TASK,
    payload: columnId,
  });

export const updateTaskOnBack = async (
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

export const getTasksOnBack = async (): Promise<Task[] | undefined> => {
  await delay(1000);

  const tasksStr = localStorage.getItem("tasks");

  if (!tasksStr) {
    return undefined;
  }

  return JSON.parse(tasksStr);
};

export const removeTaskOnBack = async (action: RemoveTaskAction) => {
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

function* updateTaskWorker(action: UpdateTaskAction) {
  yield delay(1000);
  updateTaskOnBack(action);
}

function* removeTaskWorker(action: RemoveTaskAction) {
  yield delay(1000);
  removeTaskOnBack(action);
}

export function* tasksWatcher() {
  yield takeEvery("REMOVE_TASK", removeTaskWorker);
  yield takeEvery("UPDATE_TASK", updateTaskWorker);
}

let initialState: TasksState = {
  tasks: (await getTasksOnBack()) ?? [],
};

const tasksReducer = (
  state: TasksState = initialState,
  action: TaskAction,
): TasksState => {
  switch (action.type) {
    case ADD_TASK:
      return {
        tasks: [
          {
            id: self.crypto.randomUUID(),
            description: "",
            columnId: action.payload as AddTaskAction["payload"],
            newField: true,
          },
          ...state.tasks,
        ],
      };
    case REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case UPDATE_TASK:
      let taskArray = [...state.tasks];
      const payload = action.payload as UpdateTaskAction["payload"];
      const oldTask = taskArray.find((task) => task.id === payload.id);

      if (!oldTask) {
        return state;
      }
      const newTask = { ...oldTask, ...payload, newField: false };

      const oldIndex = taskArray.indexOf(oldTask);
      const newIndex = payload.index !== undefined ? payload.index : oldIndex;

      taskArray.splice(oldIndex, 1);

      return {
        ...state,
        tasks: [
          ...taskArray.slice(0, newIndex),
          newTask,
          ...taskArray.slice(newIndex, taskArray.length),
        ],
      };

    default:
      return state;
  }
};

export default tasksReducer;
