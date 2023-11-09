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
};

const userReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_USERS": {
      return { ...state, userList: payload };
    }

    case "SET_USER": {
      return { ...state, user: payload };
    }
  }
};

const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const getAllUsersHandler = async () => {
    setIsLoading(true);
    try {
      const response = await getAllUsersApiResponse();
      if (response.status === 201) {
        console.log(response.data.users);
        dispatch({ type: "SET_USERS", payload: response.data.users });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logInUserHandler = async (user) => {
    setIsLoading(true);
    try {
      const response = await logInUserApiResponse(user);
      if (response.status === 201) {
        // dispatch({ type: "SET_USERS", payload: response.data.users });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signInUserHandler = async (user) => {
    setIsLoading(true);
    try {
      const response = await signInUserHandler(user);
      if (response.status === 201) {
        // dispatch({ type: "SET_USERS", payload: response.data.users });
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

  return (
    <UserContext.Provider
      value={{
        state,
        dispatch,
        isLoading,
        logInUserHandler,
        signInUserHandler,
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
