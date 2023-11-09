import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export const RequiresAuth = ({ children }) => {
  const location = useLocation();
  const token = useSelector((state) => state?.auth?.token);
  return token ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location?.pathname }} replace />
  );
};

export default RequiresAuth;
