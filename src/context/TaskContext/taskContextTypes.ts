import { Dispatch } from "react";
import {
  Task,
  AddTaskParamsType,
  DeleteTaskParamsType,
  UpdateTaskParamsType,
} from "../../types";

export interface TaskAction {
  type:
    | "SET_LIST_DATA"
    | "ADD_TODO_TASK"
    | "ADD_INPROGRESS_TASK"
    | "ADD_DONE_TASK"
    | "DELETE_TODO_TASK"
    | "DELETE_INPROGRESS_TASK"
    | "DELETE_DONE_TASK"
    | "UPDATE_TODO_TASK"
    | "UPDATE_INPROGRESS_TASK"
    | "UPDATE_DONE_TASK";
  payload?: any;
}

export interface TaskState {
  toDoList: Task[];
  inProgressList: Task[];
  doneList: Task[];
}

export interface TaskContextType {
  state: TaskState;
  isLoading: boolean;
  dispatch: Dispatch<TaskAction>;
  addToDoTaskHandler: ({ task, projectId }: AddTaskParamsType) => void;
  addInProgressTaskHandler: ({ task, projectId }: AddTaskParamsType) => void;
  addDoneTaskHandler: ({ task, projectId }: AddTaskParamsType) => void;
  deleteToDoTaskHandler: (taskId: DeleteTaskParamsType) => void;
  deleteInProgressTaskHandler: (taskId: DeleteTaskParamsType) => void;
  deleteDoneTaskHandler: (taskId: DeleteTaskParamsType) => void;
  updateToDoTaskHandler: ({
    taskId,
    updatedFields,
  }: UpdateTaskParamsType) => void;
  updateInProgressTaskHandler: ({
    taskId,
    updatedFields,
  }: UpdateTaskParamsType) => void;
  updateDoneTaskHandler: ({
    taskId,
    updatedFields,
  }: UpdateTaskParamsType) => void;
  getProjectDataHandler: (projectId: string) => void;
}
