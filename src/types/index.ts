import { SVGProps } from "react";

import { ColumnIds } from "@/components/taskRow";

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
