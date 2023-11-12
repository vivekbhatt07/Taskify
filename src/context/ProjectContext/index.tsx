import {
  useState,
  useContext,
  createContext,
  useEffect,
  FC,
  ReactNode,
  useReducer,
} from "react";

import {
  getAllProjectsApiResponse,
  deleteProjectApiResponse,
  addProjectApiResponse,
  updateProjectApiResponse,
} from "../../apiResponse/projectApiResponse";

import {
  AddProjectParamsType,
  DeleteProjectParamsType,
  UpdateProjectParamsType,
} from "../../types";

import { ProjectContextType } from "./projectContextTypes";

import { initialProjectState, projectReducer } from "./projectReducer";

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const ProjectProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, initialProjectState);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // GET ALL PROJECTS:
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

  // ADD PROJECT HANDLER:
  const addProjectHandler = async ({
    project,
    userId,
  }: AddProjectParamsType) => {
    try {
      const response = await addProjectApiResponse({ project, userId });
      if (response.status === 201) {
        dispatch({ type: "ADD_PROJECT", payload: response.data.project });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // DELETE PROJECT HANDLER:
  const deleteProjectHandler = async (projectId: DeleteProjectParamsType) => {
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

  // UPDATE PROJECT HANDLER:
  const updateProjectHandler = async ({
    projectId,
    project,
  }: UpdateProjectParamsType) => {
    try {
      const response = await updateProjectApiResponse({ projectId, project });
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
