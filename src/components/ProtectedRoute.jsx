import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If token exists, render the children (protected component)
  // Otherwise, redirect to login page
  return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
