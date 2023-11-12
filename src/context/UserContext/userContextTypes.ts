import { Dispatch } from "react";
import { User } from "../../types";

export interface UserActionType {
  type: "SET_USERS" | "SET_USER";
  payload?: any;
}

export interface UserStateType {
  userList: User[];
  user: User | undefined;
  token: string | undefined;
}

export interface UserContextType {
  state: any;
  dispatch: Dispatch<UserActionType>;
  isLoading: boolean;
  logInUserHandler: (email: string, password: string) => void;
  signUpUserHandler: (user: User) => void;
}
