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

interface TaskContextType {
  initialTaskState: any;
  dispatch: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const initialTaskState = {
  projectList: [],
};

const taskReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_PROJECTS": {
      return { ...state, projectList: payload };
    }
  }
};

const TaskProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useMode must be used within a TaskProvider");
  }
  return context;
};

export { useTask, TaskProvider };
