import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context";

const RequiresAuth: FC<{ children: ReactNode }> = ({ children }) => {
  const { state } = useUser();

  return state?.token ? children : <Navigate to="/login" replace={true} />;
};

export default RequiresAuth;
