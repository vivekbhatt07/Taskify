import {
  useState,
  useContext,
  createContext,
  useEffect,
  FC,
  ReactNode,
  useReducer,
  Dispatch,
} from "react";
import { useNavigate } from "react-router-dom";

import {
  getAllUsersApiResponse,
  getUserApiResponse,
  logInUserApiResponse,
  signUpUserApiResponse,
} from "../../apiResponse/userApiResponse";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

interface UserAction {
  type: "SET_USERS" | "SET_USER";
  payload?: any;
}

interface UserState {
  userList: User[];
  user: User;
  token: string;
}

interface UserContextType {
  state: any;
  dispatch: Dispatch<UserAction>;
  isLoading: boolean;
  logInUserHandler: (email: string, password: string) => void;
  signUpUserHandler: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const initialUserState = {
  userList: [],
  user: null,
  token: null,
};

const userReducer = (state: UserState, { type, payload }: UserAction) => {
  switch (type) {
    case "SET_USERS": {
      return { ...state, userList: payload };
    }

    case "SET_USER": {
      return { ...state, user: payload.userData, token: payload.token };
    }
  }
};

const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const getAllUsersHandler = async () => {
    setIsLoading(true);
    try {
      const response = await getAllUsersApiResponse();
      if (response.status === 201) {
        dispatch({ type: "SET_USERS", payload: response.data.users });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logInUserHandler = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await logInUserApiResponse(email, password);
      console.log(response);
      if (response.status === 201) {
        dispatch({
          type: "SET_USER",
          payload: {
            userData: response.data.user,
            token: response.data.token,
          },
        });
        console.log(state.token);
      }
      if (state.token) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signUpUserHandler = async (user: User) => {
    setIsLoading(true);
    try {
      const response = await signUpUserApiResponse(user);

      if (response.status === 201) {
        dispatch({
          type: "SET_USER",
          payload: {
            userData: response.data.user,
            token: response.data.token,
          },
        });
        if (state.token) {
          navigate("/");
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(state);

  useEffect(() => {
    getAllUsersHandler();
  }, []);

  useEffect(() => {
    if (state.token) {
      navigate("/");
    }
  }, [state.token]);

  return (
    <UserContext.Provider
      value={{
        state,
        dispatch,
        isLoading,
        logInUserHandler,
        signUpUserHandler,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useMode must be used within a UserProvider");
  }
  return context;
};

export { useUser, UserProvider };
