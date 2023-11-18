import { UserStateType, UserActionType } from "./userContextTypes";

const storedUserCredentialsRaw = localStorage.getItem("userCredentials");

const storedUserCredentials = storedUserCredentialsRaw
  ? JSON.parse(storedUserCredentialsRaw)
  : { user: null, token: null };

const initialUserState = {
  userList: [],
  user: storedUserCredentials?.user,
  token: storedUserCredentials?.token,
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
