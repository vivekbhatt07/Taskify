import {
  useState,
  useContext,
  createContext,
  FC,
  ReactNode,
  useReducer,
} from "react";

import {
  addToDoTaskApiResponse,
  addInProgressTaskApiResponse,
  addDoneTaskApiResponse,
  updateToDoTaskApiResponse,
  updateInProgressTaskApiResponse,
  updateDoneTaskApiResponse,
  deleteToDoTaskApiResponse,
  deleteInProgressTaskApiResponse,
  deleteDoneTaskApiResponse,
} from "../../apiResponse/taskApiResponse";

import { getProjectListDataResponse } from "../../apiResponse/projectApiResponse";

import {
  AddTaskParamsType,
  DeleteTaskParamsType,
  UpdateTaskParamsType,
} from "../../types";

import { TaskContextType } from "./taskContextTypes";
import { initialTaskState, taskReducer } from "./taskReducer";

const TextContext = createContext<TaskContextType | undefined>(undefined);

const TaskProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getProjectDataHandler = async (projectId: string) => {
    setIsLoading(true);
    try {
      const response = await getProjectListDataResponse(projectId);
      if (response.status === 200) {
        console.log(response);
        dispatch({
          type: "SET_LIST_DATA",
          payload: response.data,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToDoTaskHandler = async ({ task, projectId }: AddTaskParamsType) => {
    try {
      const response = await addToDoTaskApiResponse({ task, projectId });
      if (response.status === 201) {
        dispatch({
          type: "ADD_TODO_TASK",
          payload: response.data.task,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addInProgressTaskHandler = async ({
    task,
    projectId,
  }: AddTaskParamsType) => {
    try {
      const response = await addInProgressTaskApiResponse({ task, projectId });
      if (response.status === 201) {
        dispatch({
          type: "ADD_INPROGRESS_TASK",
          payload: response.data.task,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addDoneTaskHandler = async ({ task, projectId }: AddTaskParamsType) => {
    try {
      const response = await addDoneTaskApiResponse({ task, projectId });
      if (response.status === 201) {
        dispatch({
          type: "ADD_DONE_TASK",
          payload: response.data.task,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteToDoTaskHandler = async (taskId: DeleteTaskParamsType) => {
    try {
      const response = await deleteToDoTaskApiResponse(taskId);
      if (response.status === 200) {
        dispatch({
          type: "DELETE_TODO_TASK",
          payload: response.data.deletedTask._id,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteInProgressTaskHandler = async (taskId: DeleteTaskParamsType) => {
    try {
      const response = await deleteInProgressTaskApiResponse(taskId);
      if (response.status === 200) {
        dispatch({
          type: "DELETE_INPROGRESS_TASK",
          payload: response.data.deletedTask._id,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteDoneTaskHandler = async (taskId: DeleteTaskParamsType) => {
    try {
      const response = await deleteDoneTaskApiResponse(taskId);
      if (response.status === 200) {
        dispatch({
          type: "DELETE_DONE_TASK",
          payload: response.data.deletedTask._id,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateToDoTaskHandler = async ({
    taskId,
    updatedFields,
  }: UpdateTaskParamsType) => {
    try {
      const response = await updateToDoTaskApiResponse({
        taskId,
        updatedFields,
      });
      if (response.status === 200) {
        dispatch({
          type: "UPDATE_TODO_TASK",
          payload: response.data.updatedTask,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateInProgressTaskHandler = async ({
    taskId,
    updatedFields,
  }: UpdateTaskParamsType) => {
    try {
      const response = await updateInProgressTaskApiResponse({
        taskId,
        updatedFields,
      });
      if (response.status === 200) {
        dispatch({
          type: "UPDATE_INPROGRESS_TASK",
          payload: response.data.updatedTask,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateDoneTaskHandler = async ({
    taskId,
    updatedFields,
  }: UpdateTaskParamsType) => {
    try {
      const response = await updateDoneTaskApiResponse({
        taskId,
        updatedFields,
      });
      if (response.status === 200) {
        dispatch({
          type: "UPDATE_DONE_TASK",
          payload: response.data.updatedTask,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TextContext.Provider
      value={{
        state,
        dispatch,
        isLoading,
        addToDoTaskHandler,
        addInProgressTaskHandler,
        addDoneTaskHandler,
        deleteToDoTaskHandler,
        deleteInProgressTaskHandler,
        deleteDoneTaskHandler,
        updateToDoTaskHandler,
        updateInProgressTaskHandler,
        updateDoneTaskHandler,
        getProjectDataHandler,
      }}
    >
      {children}
    </TextContext.Provider>
  );
};

const useTask = () => {
  const context = useContext(TextContext);
  if (!context) {
    throw new Error("useMode must be used within a TaskProvider");
  }
  return context;
};

export { useTask, TaskProvider };
