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

import {
  getAllProjectsApiResponse,
  getProjectListDataResponse,
  deleteProjectApiResponse,
  addProjectApiResponse,
  updateProjectApiResponse,
} from "../../apiResponse/projectApiResponse";

import {
  addToDoTaskApiResponse,
  addInProgressTaskApiResponse,
  addDoneTaskApiResponse,
} from "../../apiResponse/taskApiResponse";

interface ProjectAction {
  type:
    | "SET_PROJECTS"
    | "ADD_PROJECT"
    | "DELETE_PROJECT"
    | "UPDATE_PROJECT"
    | "SET_PROJECT_LISTDATA"
    | "SET_PROJECT"
    | "ADD_TODO_TASK"
    | "ADD_INPROGRESS_TASK"
    | "ADD_DONE_TASK";
  payload?: any;
}

interface Project {
  _id: string;
  title: string;
  description: string;
}

interface ProjectState {
  projectList: Project[];
}

interface ProjectContextType {
  state: ProjectState;
  isLoading: boolean;
  dispatch: Dispatch<ProjectAction>;
  addProjectHandler: (project: Project) => void;
  deleteProjectHandler: (projectId: string) => void;
  updateProjectHandler: (projectId: string, project: Project) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const initialProjectState = {
  projectList: [],
  currentProject: null,
  taskListData: null,
};

const projectReducer = (
  state: ProjectState,
  { type, payload }: ProjectAction
) => {
  switch (type) {
    case "SET_PROJECT": {
      return {
        ...state,
        currentProject: state.projectList.filter(
          (project) => project._id === payload
        ),
      };
    }

    case "SET_PROJECTS": {
      return { ...state, projectList: payload };
    }

    case "SET_PROJECT_LISTDATA": {
      return { ...state, taskListData: payload };
    }

    case "ADD_PROJECT": {
      return { ...state, projectList: [...state.projectList, payload] };
    }

    case "DELETE_PROJECT": {
      return {
        ...state,
        projectList: state.projectList.filter((project: Project) => {
          return project._id !== payload;
        }),
      };
    }

    case "UPDATE_PROJECT": {
      return {
        ...state,
        projectList: state.projectList.map((project: Project) => {
          return project._id === payload._id ? payload : project;
        }),
      };
    }

    case `ADD_${payload.variant}_TASK`: {
      if (payload.variant === "TODO") {
        return {
          ...state,
          taskListData: {
            ...state.taskListData,
            toDoList: [...state.taskListData.toDoList, payload.task],
          },
        };
      }
      if (payload.variant === "INPROGRESS") {
        return {
          ...state,
          taskListData: {
            ...state.taskListData,
            inProgressList: [
              ...state.taskListData.inProgressList,
              payload.task,
            ],
          },
        };
      }
      if (payload.variant === "DONE") {
        return {
          ...state,
          taskListData: {
            ...state.taskListData,
            doneList: [...state.taskListData.doneList, payload.task],
          },
        };
      }
    }
  }
};

const ProjectProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, initialProjectState);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAllProjectsHandler = async () => {
    setIsLoading(true);
    try {
      const response = await getAllProjectsApiResponse();
      console.log(response);
      if (response.status === 200) {
        dispatch({ type: "SET_PROJECTS", payload: response.data });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addProjectHandler = async (project: Project) => {
    try {
      const response = await addProjectApiResponse(project);
      if (response.status === 201) {
        dispatch({ type: "ADD_PROJECT", payload: response.data.project });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProjectHandler = async (projectId: string) => {
    try {
      const response = await deleteProjectApiResponse(projectId);
      if (response.status === 200) {
        dispatch({
          type: "DELETE_PROJECT",
          payload: response.data.deletedProject._id,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getProjectDataHandler = async (projectId: string) => {
    try {
      const response = await getProjectListDataResponse(projectId);
      if (response.status === 200) {
        dispatch({ type: "SET_PROJECT_LISTDATA", payload: response.data });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateProjectHandler = async (projectId: string, project: Project) => {
    try {
      const response = await updateProjectApiResponse(projectId, project);
      if (response.status === 200) {
        dispatch({
          type: "UPDATE_PROJECT",
          payload: response.data.updatedProject,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addToDoTaskHandler = async (task, projectId) => {
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

  const addInProgressTaskHandler = async (task, projectId) => {
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

  const addDoneTaskHandler = async (task, projectId) => {
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

  useEffect(() => {
    getAllProjectsHandler();
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        state,
        dispatch,
        isLoading,
        addProjectHandler,
        deleteProjectHandler,
        updateProjectHandler,
        getProjectDataHandler,
        addToDoTaskHandler,
        addInProgressTaskHandler,
        addDoneTaskHandler,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useMode must be used within a ProjectProvider");
  }
  return context;
};

export { useProject, ProjectProvider };
