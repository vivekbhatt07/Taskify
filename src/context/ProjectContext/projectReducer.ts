import { Project } from "../../types";
import { ProjectStateType, ProjectActionType } from "./projectContextTypes";

const initialProjectState = {
  projectList: [],
  currentProject: null,
};

const projectReducer = (
  state: ProjectStateType,
  { type, payload }: ProjectActionType
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

    case "RESET_PROJECT": {
      return { projectList: [], currentProject: null };
    }
  }
};

export { initialProjectState, projectReducer };
