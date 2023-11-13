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
import { LogInUserParamsType, User } from "../../types";

import { initialUserState, userReducer } from "./userReducer";
import { UserContextType } from "./userContextTypes";

import {
  getAllUsersApiResponse,
  logInUserApiResponse,
  signUpUserApiResponse,
} from "../../apiResponse/userApiResponse";

import { toastHandler } from "../../utils";

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

  const logInUserHandler = async ({ email, password }: LogInUserParamsType) => {
    setIsLoading(true);
    try {
      const response = await logInUserApiResponse({ email, password });
      if (response.status === 201) {
        localStorage.setItem(
          "userCredentials",
          JSON.stringify({
            user: response.data.user,
            token: response.data.token,
          })
        );
        if (state.error) {
          dispatch({ type: "SET_USER_ERROR", payload: null });
        }
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
      dispatch({ type: "SET_USER_ERROR", payload: error });
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

  // LOGOUT USER:

  const logOutUserHandler = () => {
    dispatch({
      type: "SET_USER",
      payload: {
        userData: null,
        token: "",
      },
    });
    dispatch({ type: "SET_USERS", payload: [] });
    localStorage.removeItem("userCredentials");
    navigate("/login");
    toastHandler("success", "Logout Success");
  };

  useEffect(() => {
    getAllUsersHandler();
  }, []);

  useEffect(() => {
    if (state.error) {
      toastHandler("error", "Invalid LogIn Credentials");
    }
    if (state.token) {
      navigate("/");
      toastHandler(
        "success",
        `LogIn Success, Welcome ${state.user.firstName} ${state.user.lastName}`
      );
    }
    if (!state.token && !state.error) {
      navigate("/login");
    }
  }, [state.token, state.error]);

  return (
    <UserContext.Provider
      value={{
        state,
        dispatch,
        isLoading,
        logInUserHandler,
        signUpUserHandler,
        logOutUserHandler,
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
