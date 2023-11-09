import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../context";

const RequiresAuth = ({ children }) => {
  const location = useLocation();
  const { state } = useUser();
  console.log(state);

  return state.token ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location?.pathname }} replace />
  );
};

export default RequiresAuth;
