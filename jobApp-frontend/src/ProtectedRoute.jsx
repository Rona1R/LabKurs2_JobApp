import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children, roles }) => {
    // const user = null;
  //  const user  = {name:"Rona",lastName:"Rushiti",roles:["User","Admin","Employer"]};
  // statik ja kom jep userin per me simulu
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/logIn" replace />;
  }
  // Check if the user's role is one of the roles required by the route
  if (roles && !roles.some(role => user.role.includes(role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
