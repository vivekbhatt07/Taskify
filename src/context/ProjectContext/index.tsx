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
  deleteProjectApiResponse,
  addProjectApiResponse,
  updateProjectApiResponse,
} from "../../apiResponse/projectApiResponse";

interface ProjectContextType {
  state: any;
  dispatch: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const initialProjectState = {
  projectList: [],
};

const projectReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_PROJECTS": {
      return { ...state, projectList: payload };
    }

    case "ADD_PROJECT": {
      return { ...state, projectList: [...state.projectList, payload] };
    }

    case "DELETE_PROJECT": {
      return {
        ...state,
        projectList: state.projectList.filter((project) => {
          return project._id !== payload;
        }),
      };
    }

    case "UPDATE_PROJECT": {
      return {
        ...state,
        projectList: state.projectList.map((project) => {
          return project._id === payload._id ? payload : project;
        }),
      };
    }
  }
};

const ProjectProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, initialProjectState);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const getAllProjectsHandler = async () => {
    setIsLoading(true);
    try {
      const response = await getAllProjectsApiResponse();
      if (response.status === 200) {
        dispatch({ type: "SET_PROJECTS", payload: response.data });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addProjectHandler = async (project) => {
    try {
      const response = await addProjectApiResponse(project);
      if (response.status === 201) {
        dispatch({ type: "ADD_PROJECT", payload: response.data.project });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProjectHandler = async (projectId: String) => {
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

  const updateProjectHandler = async (projectId: String, project) => {
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
