export interface Project {
  _id: string;
  title: string;
  description: string;
}

export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface Task {
  _id?: string | undefined;
  title: string;
  description: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  variant: "ToDo" | "InProgress" | "Done";
  labels: string[];
}

// ADD PROJECT TYPES:

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

// ADD USER TYPES:

export type GetUserParamsType = string;

export type LogInUserParamsType = {
  email: string;
  password: string;
};

// TODO PARAM TYPES:

export type AddTaskParamsType = {
  task: Task;
  projectId: string;
};

export type DeleteTaskParamsType = {
  taskId: string;
};

export type UpdateTaskParamsType = {
  taskId: string;
  updatedFields: Task;
};
