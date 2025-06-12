import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import { tasksWatcher } from "./sagas/tasksSaga";
import { tasksReducer } from "./reducers/tasksReducer";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: tasksReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(tasksWatcher);
