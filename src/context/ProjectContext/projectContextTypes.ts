import { Dispatch } from "react";
import {
  Project,
  AddProjectParamsType,
  DeleteProjectParamsType,
  UpdateProjectParamsType,
} from "../../types";

export interface ProjectActionType {
  type:
    | "SET_PROJECTS"
    | "ADD_PROJECT"
    | "DELETE_PROJECT"
    | "UPDATE_PROJECT"
    | "SET_PROJECT";
  payload?: any;
}

export interface ProjectStateType {
  projectList: Project[];
}

export interface ProjectContextType {
  state: ProjectStateType;
  isLoading: boolean;
  dispatch: Dispatch<ProjectActionType>;
  addProjectHandler: ({ project, userId }: AddProjectParamsType) => void;
  deleteProjectHandler: (projectId: DeleteProjectParamsType) => void;
  updateProjectHandler: ({
    projectId,
    project,
  }: UpdateProjectParamsType) => void;
}
