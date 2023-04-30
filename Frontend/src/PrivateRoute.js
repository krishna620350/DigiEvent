import React from "react";
import { useAuth } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  console.log("current user is  ", currentUser);
  return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
