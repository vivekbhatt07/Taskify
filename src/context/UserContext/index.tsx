import {
  useState,
  useContext,
  createContext,
  useEffect,
  FC,
  ReactNode,
  useReducer,
} from "react";
import { useNavigate } from "react-router-dom";

import { initialUserState, userReducer } from "./userReducer";
import { UserContextType } from "./userContextTypes";

import {
  getAllUsersApiResponse,
  logInUserApiResponse,
  signUpUserApiResponse,
} from "../../apiResponse/userApiResponse";

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // GET ALL USERS:

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

  // LOGIN USER:

  const logInUserHandler = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await logInUserApiResponse(email, password);
      if (response.status === 201) {
        localStorage.setItem(
          "userCredentials",
          JSON.stringify({
            user: response.data.user,
            token: response.data.token,
          })
        );
        dispatch({
          type: "SET_USER",
          payload: {
            userData: response.data.user,
            token: response.data.token,
          },
        });
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

  // SIGNUP USER:

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
