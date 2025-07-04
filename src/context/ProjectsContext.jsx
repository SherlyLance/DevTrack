// src/context/ProjectsContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../config/api';
import { useAuth } from './AuthContext'; // Import useAuth to get the token

const ProjectsContext = createContext(null);

export const useProjects = () => {
  return useContext(ProjectsContext);
};

export const ProjectsProvider = ({ children }) => {
  const { authToken, isAuthenticated, loading: authLoading } = useAuth(); // Get token and auth status
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch projects from the backend
  const fetchProjects = useCallback(async () => {
    if (!isAuthenticated || authLoading) {
      setLoading(false); // Ensure loading is false if not authenticated
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/projects`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setProjects(response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch projects';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  }, [authToken, isAuthenticated, authLoading]); // Re-run if token or auth status changes

  // useEffect to call fetchProjects when component mounts or auth state changes
  useEffect(() => {
    if (!authLoading) { // Only attempt to fetch if auth state has been determined
      fetchProjects();
    }
  }, [fetchProjects, authLoading]);

  // Function to add a new project to the backend
  const addProject = async (projectData) => {
    setLoading(true); // Set loading while creating project
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/projects`, projectData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      const newProject = response.data;
      setProjects((prevProjects) => [...prevProjects, newProject]);
      toast.success(`Project '${newProject.title}' created successfully!`);
      return { success: true, project: newProject };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create project';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error creating project:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false); // Reset loading after creation attempt
    }
  };

  const value = {
    projects,
    loading, // Expose loading state
    error,   // Expose error state
    fetchProjects, // Expose fetch function for manual refresh if needed
    addProject,
  };

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>;
};
