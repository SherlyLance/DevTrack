// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../config/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState(localStorage.getItem('token')); // State to hold the token

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Attempt to fetch user data using the token to verify its validity
          const response = await axios.get(`${API_URL}/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
          setAuthToken(token); // Ensure authToken state is set
          localStorage.setItem('user', JSON.stringify(response.data)); // Update stored user data
        }
      } catch (error) {
        console.error("Failed to initialize authentication or token invalid:", error);
        // If token is invalid or expired, clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthToken(null);
        setUser(null);
        toast.error('Session expired or invalid. Please log in again.');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []); // Run only once on component mount

  const register = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      const { token, user: registeredUser } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(registeredUser));
      setUser(registeredUser);
      setAuthToken(token); // Update authToken state

      toast.success('Registration successful!');
      return { success: true, user: registeredUser };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      console.error('Registration error:', errorMessage);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { token, user: loggedInUser } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      setAuthToken(token); // Update authToken state

      toast.success('Login successful!');
      return { success: true, user: loggedInUser };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      console.error('Login error:', errorMessage);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setAuthToken(null); // Clear authToken state
    toast.info('You have been logged out.'); // Changed to info for less intrusive notification
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!user,
    authToken, // Provide the token to other contexts
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Only render children when authentication initialization is complete */}
      {!loading && children}
    </AuthContext.Provider>
  );
};
