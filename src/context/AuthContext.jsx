import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import jwt_decode from 'jwt-decode';

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    return storedAuth ? JSON.parse(storedAuth) : false;
  });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Hardcoded credentials for testing purposes
      if (email === 'test@example.com' && password === 'password') {
        setIsAuthenticated(true);
        setUser({ email: email, name: 'Test User' });
        console.log('Login successful');
        return true; // Indicate successful login
      } else {
        console.log('Login failed: Invalid credentials');
        return false; // Indicate failed login
      }
    } catch (error) {
      console.error('Login error:', error);
      return false; // Indicate failed login due to error
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    // Simulate API call for registration
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Registering user:', userData);
        resolve({ success: true });
      }, 500);
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    console.log('Logged out');
    // Removed automatic navigation, Login/App will handle it
  };

  const value = {
    isAuthenticated,
    user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
