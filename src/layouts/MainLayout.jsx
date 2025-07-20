import React, { useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar'; // Assuming Sidebar is in src/components/Sidebar
import Navbar from '../components/Navbar';   // Assuming Navbar is in src/components/Navbar

const MainLayout = () => {
  const { logout, isAuthenticated, user: currentUser } = useAuth(); // Renamed 'currentUser' for clarity with 'user' from context
  const navigate = useNavigate();
  const location = useLocation();

  // Handle user logout
  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  // Effect to redirect unauthenticated users from protected routes
  useEffect(() => {
    // List of protected routes that require authentication
    // Note: This list should ideally be managed centrally or dynamically if many routes exist.
    const protectedRoutes = [
      '/dashboard',
      '/projects',
      '/projects/', // Base path for project details
      '/create-project',
      '/issues',
      '/create-issue',
      '/reports',
      '/settings', // Added settings to protected routes
      '/learn-more', // Added learn-more to protected routes
    ];

    // Check if the current path is a protected route
    const isProtectedRoute = protectedRoutes.some(route => {
      // Handle dynamic routes like /projects/:id
      if (route.endsWith('/')) { // If route ends with '/', it's a base path for dynamic routes
        return location.pathname.startsWith(route);
      }
      return location.pathname === route;
    });

    // If on a protected route and not authenticated, redirect to login
    if (isProtectedRoute && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, location.pathname, navigate]); // Dependencies for useEffect

  return (
    // Main container for the entire layout
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar - Only render if user is authenticated */}
      {isAuthenticated && <Sidebar />}

      {/* Main content area, adjusts margin based on sidebar presence */}
      <div className={`flex-1 flex flex-col ${isAuthenticated ? 'md:ml-64' : ''}`}> {/* Added md:ml-64 for responsiveness */}
        {/* Top Navigation Bar */}
        <nav className="bg-gray-800 h-16 flex items-center justify-between px-6 shadow-md">
          {/* Welcome Message */}
          <div className="flex-1">
            {isAuthenticated && currentUser && (
              <span className="text-gray-200 text-lg font-medium">Welcome, {currentUser.name}</span>
            )}
          </div>

          {/* Right Side - User/Logout/Notification Icons */}
          <div className="flex items-center ml-6 space-x-4"> {/* Added space-x-4 for spacing */}
            {/* Notification Icon (Placeholder) */}
            <button className="p-1 rounded-full text-gray-400 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
              <span className="sr-only">View notifications</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
            </button>

            {/* User Profile Icon (Placeholder) */}
            <button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full object-cover" // Added object-cover for better image fitting
                src="https://placehold.co/256x256/4A5568/CBD5E0?text=User" // Placeholder image for consistency
                alt="User Avatar"
              />
            </button>

            {/* Logout/Login Button */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Login
              </Link>
            )}
          </div>
        </nav>

        {/* Main Content Area where nested routes will render */}
        <main className="flex-1 p-8 overflow-y-auto bg-gray-900"> {/* Changed background to gray-900 */}
          <div className="max-w-7xl mx-auto">
            <Outlet /> {/* This is where the content of nested routes will be displayed */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
