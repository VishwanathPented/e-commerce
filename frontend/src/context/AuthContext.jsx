import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in (hydrate state from token/localStorage)
        // Ideally, we might verify token validty with backend.
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        // Simple hydration for now. In real app, fetch /api/me
        if (token) {
            setUser({ role, token }); // Minimal user object
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token, role, message } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            setUser({ token, role });
            return { success: true, message };
        } catch (error) {
            console.error("Login failed", error);
            return { success: false, message: error.response?.data?.message || 'Login failed' };
        }
    };

    const register = async (fullName, email, password) => {
        try {
            const response = await api.post('/auth/register', { fullName, email, password });
            const { token, role, message } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            setUser({ token, role });
            return { success: true, message };
        } catch (error) {
            console.error("Registration failed", error);
            return { success: false, message: error.response?.data?.message || 'Registration failed' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
