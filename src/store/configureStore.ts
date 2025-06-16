import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import { tasksWatcher } from "./tasks";
import tasksReducer from "./tasks";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: tasksReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(tasksWatcher);
