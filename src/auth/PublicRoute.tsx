import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context";

type PublicRouteType = {
  element: ReactNode;
};

const PublicRoute: FC<PublicRouteType> = ({ element }) => {
  const { state } = useUser();
  const isAuthenticated = state?.token;
  return isAuthenticated ? <Navigate to="/" replace /> : element;
};

export default PublicRoute;
