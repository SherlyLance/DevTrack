import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { IssuesProvider } from './context/IssuesContext';
import { ProjectsProvider } from './context/ProjectsContext';
import { SocketProvider } from './context/SocketContext';

// Layouts
import MainLayout from './layouts/MainLayout';

// Page Components
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails'; // Assuming this component exists
import Issues from './pages/Issues';
import CreateProjectPage from './pages/CreateProjectPage'; // Assuming this component exists
import CreateIssuePage from './pages/CreateIssuePage'; // Assuming this component exists
import Reports from './pages/Reports';
import Settings from './pages/Settings'; // Import the Settings component
import LearnMore from './pages/LearnMore'; // Import the LearnMore component

function App() {
  return (
    <Router>
      {/* ToastContainer for notifications */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      <AuthProvider> {/* AuthProvider should be the outermost for authentication */}
        <SocketProvider> {/* SocketProvider can be inside AuthProvider */}
          <ProjectsProvider> {/* ProjectsProvider wraps routes that need project data */}
            <IssuesProvider> {/* IssuesProvider wraps routes that need issues data */}
              <Routes>
                {/* Public Routes (outside MainLayout) */}
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes (inside MainLayout) */}
                {/* MainLayout itself will be the parent for these routes */}
                <Route element={<MainLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:id" element={<ProjectDetails />} />
                  <Route path="/create-project" element={<CreateProjectPage />} />
                  <Route path="/issues" element={<Issues />} />
                  <Route path="/create-issue" element={<CreateIssuePage />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/settings" element={<Settings />} /> {/* Added Settings Route */}
                  <Route path="/learn-more" element={<LearnMore />} /> {/* Added Learn More Route */}
                </Route>
              </Routes>
            </IssuesProvider>
          </ProjectsProvider>
        </SocketProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
