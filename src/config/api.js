// apiConfig.js

// Determine if the application is running in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * @constant {string} API_BASE_URL
 * @description The base URL for your backend API.
 * In development, it defaults to localhost:5000.
 * In production, it uses the REACT_APP_API_BASE_URL environment variable.
 * IMPORTANT: Ensure REACT_APP_API_BASE_URL (or REACT_APP_SOCKET_URL if that's what you intend to use for the full API base)
 * is set in your production environment (e.g., Vercel, Render).
 * It should point to the root of your backend, e.g., 'https://devtrack-backend-cspa.onrender.com'
 */
export const API_BASE_URL = isDevelopment
  ? 'http://localhost:5000'
  : process.env.REACT_APP_API_BASE_URL || process.env.REACT_APP_SOCKET_URL; // Fallback to SOCKET_URL if API_BASE_URL not set

/**
 * @constant {string} SOCKET_URL
 * @description The URL for your Socket.IO server.
 * This is typically the same as your API_BASE_URL.
 */
export const SOCKET_URL = API_BASE_URL;

/**
 * @constant {object} ENDPOINTS
 * @description Centralized object containing all specific API endpoints.
 * All endpoints are constructed directly from API_BASE_URL to avoid
 * incorrect path concatenation issues.
 */
export const ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    // If you had a logout endpoint in your backend auth routes:
    // LOGOUT: `${API_BASE_URL}/api/auth/logout`,
    ME: `${API_BASE_URL}/api/auth/me`, // Added /me endpoint
    USERS: `${API_BASE_URL}/api/auth/users`, // Added /users endpoint
  },
  PROJECTS: {
    BASE: `${API_BASE_URL}/api/projects`,
    // Example of how to construct dynamic routes:
    // GET_BY_ID: (id) => `${API_BASE_URL}/api/projects/${id}`,
    // ADD_MEMBER: (id) => `${API_BASE_URL}/api/projects/${id}/members`,
  },
  TICKETS: {
    BASE: `${API_BASE_URL}/api/tickets`,
    // Example of how to construct dynamic routes:
    // GET_BY_ID: (id) => `${API_BASE_URL}/api/tickets/${id}`,
    // GET_BY_PROJECT_ID: (projectId) => `${API_BASE_URL}/api/tickets/project/${projectId}`,
    // ADD_COMMENT: (id) => `${API_BASE_URL}/api/tickets/${id}/comments`,
  },
  // Add other major resource endpoints here as needed
  // E.g., COMMENTS: `${API_BASE_URL}/api/comments`,
};

// Export a single config object for convenience if preferred,
// or use named exports directly. Named exports are generally clearer.
const config = {
  API_BASE_URL,
  SOCKET_URL,
  ENDPOINTS,
};

export default config;
