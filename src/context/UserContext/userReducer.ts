import { UserStateType, UserActionType } from "./userContextTypes";

const initialUserState = {
  userList: [],
  user: JSON.parse(localStorage.getItem("userCredentials"))?.user,
  token: JSON.parse(localStorage.getItem("userCredentials"))?.token,
  error: null,
};

const userReducer = (
  state: UserStateType,
  { type, payload }: UserActionType
) => {
  switch (type) {
    case "SET_USERS": {
      return { ...state, userList: payload };
    }

    case "SET_USER": {
      return { ...state, user: payload.userData, token: payload.token };
    }
    case "SET_USER_ERROR": {
      return { ...state, error: payload };
    }
  }
};

export { initialUserState, userReducer };
