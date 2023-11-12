import { UserStateType, UserActionType } from "./userContextTypes";

const initialUserState = {
  userList: [],
  user: JSON.parse(localStorage.getItem("userCredentials"))?.user,
  token: JSON.parse(localStorage.getItem("userCredentials"))?.token,
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
  }
};

export { initialUserState, userReducer };
