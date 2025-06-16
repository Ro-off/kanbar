import { SVGProps } from "react";

export const rowVariants = {
  todo: {
    title: "To Do",
    headerColor: "bg-blue-100",
  },
  inProgress: {
    title: "In Progress",
    headerColor: "bg-yellow-100",
  },
  done: {
    title: "Done",
    headerColor: "bg-green-100",
  },
};

export type ColumnIds = keyof typeof rowVariants;

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Task {
  id: string;
  description?: string;
  newField?: boolean;
  columnId: ColumnIds;

  [key: string]: any;
}

export interface TaskRowProps {
  columnId: ColumnIds;
}

export interface AddTaskAction {
  type: "ADD_TASK";
  payload: ColumnIds;
}

export interface RemoveTaskAction {
  type: "REMOVE_TASK";
  payload: string;
}

export interface UpdateTaskAction {
  type: "UPDATE_TASK";
  payload: {
    id: string;
    data: Partial<Task>;
    index?: number;
    newField: boolean;
    columnId: ColumnIds;
  };
}

export type TaskAction = AddTaskAction | RemoveTaskAction | UpdateTaskAction;

export type TasksState = {
  tasks: Task[];
};

export interface TaskCardProps extends Task {
  isEditing?: boolean;
  index?: number;
}
