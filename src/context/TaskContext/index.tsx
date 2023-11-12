import {
  useState,
  useContext,
  createContext,
  useEffect,
  FC,
  ReactNode,
  useReducer,
  Dispatch,
} from "react";

import { useParams } from "react-router-dom";

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

import { Task } from "../../types";
import { useProject } from "..";

interface TaskAction {
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

interface TaskState {
  toDoList: Task[];
  inProgressList: Task[];
  doneList: Task[];
}

interface TaskContextType {
  state: TaskState;
  isLoading: boolean;
  dispatch: Dispatch<TaskAction>;
  addToDoTaskHandler: (task: Task, projectId: string) => void;
  addInProgressTaskHandler: (task: Task, projectId: string) => void;
  addDoneTaskHandler: (task: Task, projectId: string) => void;
  deleteToDoTaskHandler: (taskId: string) => void;
  deleteInProgressTaskHandler: (taskId: string) => void;
  deleteDoneTaskHandler: (taskId: string) => void;
  updateToDoTaskHandler: (taskId: string, updatedFields: Task) => void;
  updateInProgressTaskHandler: (taskId: string, updatedFields: Task) => void;
  updateDoneTaskHandler: (taskId: string, updatedFields: Task) => void;
  getProjectDataHandler: (projectId: string) => void;
}

const TextContext = createContext<TaskContextType | undefined>(undefined);

const initialTaskState = {
  toDoList: [],
  inProgressList: [],
  doneList: [],
};

const taskReducer = (state: TaskState, { type, payload }: TaskAction) => {
  switch (type) {
    case "SET_LIST_DATA": {
      return {
        ...state,
        toDoList: payload.toDoList,
        inProgressList: payload.inProgressList,
        doneList: payload.doneList,
      };
    }

    case "ADD_TODO_TASK": {
      return {
        ...state,
        toDoList: [...state.toDoList, payload],
      };
    }

    case "ADD_INPROGRESS_TASK": {
      return {
        ...state,
        inProgressList: [...state.inProgressList, payload],
      };
    }

    case "ADD_DONE_TASK": {
      return {
        ...state,
        doneList: [...state.doneList, payload],
      };
    }

    case "DELETE_TODO_TASK": {
      return {
        ...state,
        toDoList: state.toDoList.filter((toDo) => toDo._id !== payload),
      };
    }

    case "DELETE_INPROGRESS_TASK": {
      return {
        ...state,
        inProgressList: state.inProgressList.filter(
          (inProgress) => inProgress._id !== payload
        ),
      };
    }

    case "DELETE_DONE_TASK": {
      return {
        ...state,
        doneList: state.doneList.filter((done) => done._id !== payload),
      };
    }

    case "UPDATE_TODO_TASK": {
      return {
        ...state,
        toDoList: state.toDoList.map((toDo) =>
          toDo._id === payload._id ? payload : toDo
        ),
      };
    }

    case "UPDATE_INPROGRESS_TASK": {
      return {
        ...state,
        inProgressList: state.inProgressList.map((inProgress) =>
          inProgress._id === payload._id ? payload : inProgress
        ),
      };
    }

    case "UPDATE_DONE_TASK": {
      return {
        ...state,
        doneList: state.doneList.map((done) =>
          done._id === payload._id ? payload : done
        ),
      };
    }
  }
};

const TaskProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

  const getProjectDataHandler = async (projectId: string) => {
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
    }
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addToDoTaskHandler = async (task: Task, projectId: string) => {
    try {
      const response = await addToDoTaskApiResponse({ task, projectId });
      console.log(response);
      if (response.status === 201) {
        dispatch({
          type: "ADD_TODO_TASK",
          payload: { variant: "TODO", task: response.data.task },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addInProgressTaskHandler = async (task: Task, projectId: string) => {
    try {
      const response = await addInProgressTaskApiResponse({ task, projectId });
      console.log(response);
      if (response.status === 201) {
        dispatch({
          type: "ADD_INPROGRESS_TASK",
          payload: { variant: "INPROGRESS", task: response.data.task },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addDoneTaskHandler = async (task: Task, projectId: string) => {
    try {
      const response = await addDoneTaskApiResponse({ task, projectId });
      console.log(response);
      if (response.status === 201) {
        dispatch({
          type: "ADD_DONE_TASK",
          payload: { variant: "DONE", task: response.data.task },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteToDoTaskHandler = async (taskId: string) => {
    try {
      const response = await deleteToDoTaskApiResponse(taskId);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteInProgressTaskHandler = async (taskId: string) => {
    try {
      const response = await deleteInProgressTaskApiResponse(taskId);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteDoneTaskHandler = async (taskId: string) => {
    try {
      const response = await deleteDoneTaskApiResponse(taskId);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const updateToDoTaskHandler = async (taskId: string, updatedFields: Task) => {
    try {
      const response = await updateToDoTaskApiResponse(taskId, updatedFields);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const updateInProgressTaskHandler = async (
    taskId: string,
    updatedFields: Task
  ) => {
    try {
      const response = await updateInProgressTaskApiResponse(
        taskId,
        updatedFields
      );
      console.log(response);
      if (response.status === 201) {
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateDoneTaskHandler = async (taskId: string, updatedFields: Task) => {
    try {
      const response = await updateDoneTaskApiResponse(taskId, updatedFields);
      console.log(response);
      if (response.status === 201) {
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
