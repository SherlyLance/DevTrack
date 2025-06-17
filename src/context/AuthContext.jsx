import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    try {
      // Store user data in localStorage
      const userToStore = {
        id: Date.now().toString(), // Generate a unique ID
        name: userData.name,
        email: userData.email,
        role: userData.role || 'Team Member' // Use provided role or default to 'Team Member'
      };
      localStorage.setItem('user', JSON.stringify(userToStore));
      setUser(userToStore);
      return { success: true, user: userToStore };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Registration failed' };
    }
  };

  const login = async (credentials) => {
    try {
      // Check if user exists in localStorage
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        return { success: false, error: 'Please register first' };
      }

      // Any credentials are valid after registration
      const userData = JSON.parse(storedUser);
      setUser(userData);
      localStorage.setItem('isAuthenticated', 'true');
      return { success: true, user: userData };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    setUser(null);
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
