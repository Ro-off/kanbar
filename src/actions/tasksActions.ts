import { store } from "../store";
import { Task } from "../types";

import { ColumnIds } from "@/components/taskRow";

export const updateTask = (id: string, updatedFields: Partial<Task>) => {
  store.dispatch({
    type: "UPDATE_TASK",
    payload: {
      id,
      //   data: updatedFields,
      ...updatedFields,
    },
  });
};

export const deleteTask = (id: string) => {
  store.dispatch({
    type: "REMOVE_TASK",
    payload: id,
  });
};

export const createTask = (columnId: ColumnIds) =>
  store.dispatch({
    type: "ADD_TASK",
    payload: columnId,
  });
