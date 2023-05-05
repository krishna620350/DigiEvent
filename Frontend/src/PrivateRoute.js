import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  console.log("current user is  ", currentUser);
  return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
