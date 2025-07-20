// API Configuration for DevTrack
const isDevelopment = process.env.NODE_ENV === 'development';

// Backend URLs
export const API_BASE_URL = isDevelopment 
  ? 'http://localhost:5000' 
  : 'https://devtrack-backend-cspa.onrender.com';

export const API_URL = `${API_BASE_URL}/api/auth`;
export const SOCKET_URL = API_BASE_URL;

// API endpoints
export const ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_URL}/register`,
    LOGIN: `${API_URL}/login`,
    LOGOUT: `${API_URL}/logout`,
  },
  PROJECTS: `${API_BASE_URL}/api/projects`,
  TICKETS: `${API_BASE_URL}/api/tickets`,
};

const config = {
  API_BASE_URL,
  API_URL,
  SOCKET_URL,
  ENDPOINTS,
};

export default config; 