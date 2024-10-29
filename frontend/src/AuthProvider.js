import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);

    // Function to login and retrieve the token
    const login = async (credentials) => {
        try {            
            const jwtToken = credentials;
            setToken(jwtToken);
            localStorage.setItem('token', jwtToken);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Login failed:', error);
            setIsAuthenticated(false);
        }
    };

    // Function to log out the user
    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    // Set up an axios interceptor to attach the token to every request
    useEffect(() => {
        const interceptor = axios.interceptors.request.use(
            (config) => {
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        return () => axios.interceptors.request.eject(interceptor);
    }, [token]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
