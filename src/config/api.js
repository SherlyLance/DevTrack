// API Configuration for DevTrack
const isDevelopment = process.env.NODE_ENV === 'development';
console.log('Runtime NODE_ENV:', process.env.NODE_ENV);

// Backend URLs
export const API_BASE_URL = isDevelopment 
  ? 'http://localhost:5000' 
  :  process.env.REACT_APP_SOCKET_URL;

console.log('API_BASE_URL in config (runtime):', API_BASE_URL);
console.log('Value of process.env.REACT_APP_SOCKET_URL (runtime):', process.env.REACT_APP_SOCKET_URL);

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