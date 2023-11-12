import { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../context";

const RequiresAuth: FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { state } = useUser();

  return state.token ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location?.pathname }} replace />
  );
};

export default RequiresAuth;
