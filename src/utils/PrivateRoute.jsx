/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
  const isAuthenticated = sessionStorage.getItem("authenticated") || false;
  return isAuthenticated === "true" ? children : <Navigate to="/" replace />
}

export default PrivateRoute;