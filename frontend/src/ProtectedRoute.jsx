import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = () => {
    const token = Cookies.get('auth-token');
    return token ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;