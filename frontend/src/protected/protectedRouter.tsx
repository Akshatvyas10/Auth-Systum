import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[]; // The roles allowed to access this route
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isLogin = localStorage.getItem('token');
 

  // Check if the user is logged in
  if (!isLogin) {
    return <Navigate to="/" />;
  }



  return <>{children}</>;
};
