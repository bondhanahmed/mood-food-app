import React, { createContext, useContext, useState } from 'react';

// Context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [token, setToken] = useState(() => localStorage.getItem('token'));

    const login = (userData, jwt) => {
        setUser(userData);
        setToken(jwt);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', jwt);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
        {children}
    </AuthContext.Provider>
    );
};

// Hooking to use auth state
export const useAuth = () => useContext(AuthContext);
