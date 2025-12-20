import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user || user.role !== 'ROLE_ADMIN') {
        // Redirect to home if not admin (or not logged in)
        return <Navigate to="/" />;
    }

    return children;
};

export default AdminRoute;
