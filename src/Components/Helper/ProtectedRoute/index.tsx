import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet  } from 'react-router-dom';

const ProtectedRoute = () => {
  const { error, data } = useSelector((state: any) => state.user)

  if (!error && data?.token) return <Outlet />;
  else if (data?.token === null) return <Navigate to="/login" />;
  else return <Navigate to="/login" />;
}

export default ProtectedRoute;