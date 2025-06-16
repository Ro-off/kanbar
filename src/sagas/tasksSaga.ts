import { takeEvery } from "redux-saga/effects";

import { RemoveTaskAction, UpdateTaskAction } from "@/types";
import { removeTaskAsync, updateTaskAsync } from "@/actions/asyncTasksActions";

const delay = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

function* updateTaskWorker(action: UpdateTaskAction) {
  yield delay(1000);
  updateTaskAsync(action);
}

function* removeTaskWorker(action: RemoveTaskAction) {
  yield delay(1000);
  removeTaskAsync(action);
}

export function* tasksWatcher() {
  yield takeEvery("REMOVE_TASK", removeTaskWorker);
  yield takeEvery("UPDATE_TASK", updateTaskWorker);
}
