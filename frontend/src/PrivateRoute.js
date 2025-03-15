import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // const user  = null;
  const  user  = {name:"Rona",lastName:"Rushiti",roles:["User","Employer","Admin"]};
  const location = useLocation();
//   console.log(!user);
  if (!user) {
    return <Navigate to="/logIn" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
