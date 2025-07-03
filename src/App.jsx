import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { IssuesProvider } from './context/IssuesContext';
import { ProjectsProvider } from './context/ProjectsContext';
import { SocketProvider } from './context/SocketContext';
import MainLayout from './layouts/MainLayout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Issues from './pages/Issues';
import CreateProjectPage from './pages/CreateProjectPage';
import CreateIssuePage from './pages/CreateIssuePage';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <AuthProvider>
        <SocketProvider>
          <ToastContainer />
          <Routes>
            {/* Public Routes outside MainLayout */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes inside MainLayout, wrapped by ProjectsProvider */}
            <Route element={<ProjectsProvider><MainLayout /></ProjectsProvider>}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetails />} />
              <Route path="/create-project" element={<CreateProjectPage />} />
              <Route path="/issues" element={<IssuesProvider><Issues /></IssuesProvider>} />
              <Route path="/create-issue" element={<CreateIssuePage />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} /> {/* Add this line */}
            </Route>
          </Routes>
        </SocketProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
