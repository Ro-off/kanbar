import { takeEvery } from "redux-saga/effects";

import { AddTaskAction, RemoveTaskAction } from "@/types";

const delay = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

function* addTaskWorker(action: AddTaskAction) {
  yield delay(1000);

  // yield put({
  //   type: "ADD_TASK",
  //   tasks: [
  //     {
  //       id: self.crypto.randomUUID(),
  //       description: "",
  //       columnId: action.payload as AddTaskAction["payload"],
  //       newField: true,
  //     },
  //     ...store.getState().tasks,
  //   ],

  // });
}
function* removeTaskWorker(action: RemoveTaskAction) {
  yield delay(4000);

  // return {
  //   ...store.getState().tasks,
  //   tasks: store.getState().tasks.filter((task) => task.id !== action.payload),
  // };
}

export function* tasksWatcher() {
  yield takeEvery("ADD_TASK", addTaskWorker);
  yield takeEvery("REMOVE_TASK", removeTaskWorker);
}
