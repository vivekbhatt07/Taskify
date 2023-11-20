import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context";

type PrivateRouteType = {
  element: ReactNode;
};

const PrivateRoute: FC<PrivateRouteType> = ({ element }) => {
  const { state } = useUser();
  const isAuthenticated = state?.token;
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
