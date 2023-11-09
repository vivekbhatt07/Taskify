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

interface UserContextType {
  state: any;
  dispatch: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const initialUserState = {
  userList: [],
  user: null,
  token: null,
};

const userReducer = (state, { type, payload }) => {
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
  const [isLoading, setIsLoading] = useState<Boolean>(false);
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

  const logInUserHandler = async (email: String, password: String) => {
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

  const signUpUserHandler = async (user) => {
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
