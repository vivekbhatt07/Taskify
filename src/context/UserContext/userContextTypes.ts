import { Dispatch } from "react";
import { User, LogInUserParamsType } from "../../types";

export interface UserActionType {
  type: "SET_USERS" | "SET_USER" | "SET_USER_ERROR";
  payload?: any;
}

export interface UserStateType {
  userList: User[];
  user: User;
  token: string;
  error: null;
}

export interface UserContextType {
  state: any;
  dispatch: Dispatch<UserActionType>;
  isLoading: boolean;
  logInUserHandler: ({ email, password }: LogInUserParamsType) => void;
  signUpUserHandler: (user: User) => void;
  logOutUserHandler: () => void;
}
