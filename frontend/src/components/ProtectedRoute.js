import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  if (!props.isLoggedIn) {
    return <Navigate to="/sign-in" replace />;
  }
  return props.children;
};

export default ProtectedRoute;
