import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const ProtectedRoute = () => {
    const { isAuthenticated } = useContext(AuthContext);

    // If the user is authenticated, render the child routes using Outlet
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
