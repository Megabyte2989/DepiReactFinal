import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "./services/getCurrentUser.js";

function ProtectedRoute({ requiredRole }) {
  const currentUser = getCurrentUser();
  // If the user is not logged in Or is not have required role, redirect to login page
  if (!currentUser || currentUser.role !== requiredRole) {
    return <Navigate to="/login" />;
  }

  // If the user is authenticated and has the correct role, render the child components
  return <Outlet />;
}

export default ProtectedRoute;
