import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedAdmin = ({ children }) => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedAdmin;
