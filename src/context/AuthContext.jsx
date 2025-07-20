import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import { toast } from 'react-toastify';
import { API_URL } from '../config/api'; // Import API configuration
// import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (token && storedUser) {
          // Optionally, verify token with backend or decode it for immediate user info
          // For now, trust the stored user if token exists
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to initialize authentication from local storage:", error);
        // Clear any corrupted data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const register = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      const { token, user: registeredUser } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(registeredUser));
      setUser(registeredUser);

      return { success: true, user: registeredUser };
    } catch (error) {
      console.error('Registration error:', error.response?.data?.message || error.message);
      return { success: false, error: error.response?.data?.message || 'Registration failed' };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      const { token, user: loggedInUser } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      setUser(loggedInUser);

      return { success: true, user: loggedInUser };
    } catch (error) {
      console.error('Login error:', error.response?.data?.message || error.message);
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logout successful!');
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
