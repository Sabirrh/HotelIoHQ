import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  return auth && auth.token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;