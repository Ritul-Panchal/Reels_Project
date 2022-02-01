import React, { useContext } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
function PrivateRoute() {
    const { user } = useContext(AuthContext);
    return user ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute;
