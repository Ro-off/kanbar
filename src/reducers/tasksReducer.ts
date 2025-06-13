import {
  TasksState,
  TaskAction,
  AddTaskAction,
  UpdateTaskAction,
} from "../types/";

const initialState: TasksState = {
  tasks: [],
};

const actions = {
  ADD_TASK: "ADD_TASK",
  REMOVE_TASK: "REMOVE_TASK",
  GET_TASKS_BY_COLUMN: "GET_TASKS_BY_COLUMN",
  UPDATE_TASK: "UPDATE_TASK",
  MOVE_TASK: "MOVE_TASK",
};

export const tasksReducer = (
  state: TasksState = initialState,
  action: TaskAction,
): TasksState => {
  switch (action.type) {
    case actions.ADD_TASK:
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
    case actions.REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    // case actions.UPDATE_TASK:
    //   return {
    //     ...state,
    //     tasks: state.tasks.map((task) =>
    //       typeof action.payload === "object" &&
    //       "id" in action.payload &&
    //       task.id === action.payload.id
    //         ? {
    //             ...task,
    //             newField: false,
    //             ...(action.payload.data as UpdateTaskAction["payload"]),
    //           }
    //         : task,
    //     ),
    //   };

    case actions.UPDATE_TASK:
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

      console.log("UPDATE_TASK action:", {
        payload,
        oldTask,
        newTask,
        oldIndex,
        newIndex,
        tasksBefore: state,
        taskArrayAfter: taskArray,
      });

      return {
        tasks: taskArray
          .slice(0, newIndex)
          .concat([newTask])
          .concat(state.tasks.slice(newIndex + 1, state.tasks.length)),
      };

    default:
      return state;
  }
};
