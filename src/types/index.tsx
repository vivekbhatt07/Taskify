export interface Project {
  title: string;
  description: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface Task {
  title: string;
  description: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  variant: "ToDo" | "InProgress" | "Done";
  labels: string[];
}

export type AddProjectParamsType = {
  project: {
    _id: string;
    title: string;
    description: string;
  };
  userId: string;
};

export type DeleteProjectParamsType = string;

export type UpdateProjectParamsType = {
  projectId: string;
  project: {
    _id: string;
    title: string;
    description: string;
  };
};
