// src/context/IssuesContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
// Corrected import: Import the default 'config' object
import config from '../config/api';
import { useAuth } from './AuthContext'; // To get the auth token

const IssuesContext = createContext(null);

export const useIssues = () => {
  return useContext(IssuesContext);
};

export const IssuesProvider = ({ children }) => {
  const { authToken, isAuthenticated, loading: authLoading } = useAuth();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch issues from the backend
  const fetchIssues = useCallback(async () => {
    if (!isAuthenticated || authLoading) {
      setLoading(false); // Ensure loading is false if not authenticated
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // CORRECTED: Use config.ENDPOINTS.TICKETS.BASE
      const response = await axios.get(config.ENDPOINTS.TICKETS.BASE, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setIssues(response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch issues';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error fetching issues:', err);
    } finally {
      setLoading(false);
    }
  }, [authToken, isAuthenticated, authLoading]);

  // useEffect to call fetchIssues when component mounts or auth state changes
  useEffect(() => {
    if (!authLoading) {
      fetchIssues();
    }
  }, [fetchIssues, authLoading]);

  // Function to create a new issue
  const createIssue = async (issueData) => {
    setLoading(true);
    setError(null);
    try {
      // CORRECTED: Use config.ENDPOINTS.TICKETS.BASE
      const response = await axios.post(config.ENDPOINTS.TICKETS.BASE, issueData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      const newIssue = response.data;
      setIssues((prevIssues) => [...prevIssues, newIssue]);
      toast.success(`Issue '${newIssue.title}' created successfully!`);
      return { success: true, issue: newIssue };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create issue';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error creating issue:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Function to update an issue
  const updateIssue = async (issueId, updateData) => {
    setLoading(true);
    setError(null);
    try {
      // CORRECTED: Construct URL dynamically using config.ENDPOINTS.TICKETS.BASE
      const response = await axios.put(`${config.ENDPOINTS.TICKETS.BASE}/${issueId}`, updateData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      const updatedIssue = response.data;
      setIssues((prevIssues) =>
        prevIssues.map((issue) => (issue._id === issueId ? updatedIssue : issue))
      );
      toast.success(`Issue '${updatedIssue.title}' updated successfully!`);
      return { success: true, issue: updatedIssue };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update issue';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error updating issue:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Function to delete an issue
  const deleteIssue = async (issueId) => {
    setLoading(true);
    setError(null);
    try {
      // CORRECTED: Construct URL dynamically using config.ENDPOINTS.TICKETS.BASE
      await axios.delete(`${config.ENDPOINTS.TICKETS.BASE}/${issueId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setIssues((prevIssues) => prevIssues.filter((issue) => issue._id !== issueId));
      toast.success('Issue deleted successfully!');
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to delete issue';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error deleting issue:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    issues,
    loading,
    error,
    fetchIssues,
    createIssue,
    updateIssue,
    deleteIssue,
  };

  return <IssuesContext.Provider value={value}>{children}</IssuesContext.Provider>;
};
