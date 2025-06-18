import React, { useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';

const MainLayout = () => {
  const { logout, isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Redirect unauthenticated users from protected routes
  useEffect(() => {
    const protectedRoutes = [
      '/dashboard',
      '/projects',
      '/projects/:id',
      '/create-project',
      '/issues',
      '/create-issue',
      '/reports',
    ];

    const isProtectedRoute = protectedRoutes.some(route => {
      if (route.includes(':id')) {
        const baseRoute = route.split(':')[0];
        return location.pathname.startsWith(baseRoute);
      }
      return location.pathname === route;
    });

    if (isProtectedRoute && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {isAuthenticated && <Sidebar />}

      <div className={`flex-1 flex flex-col ${isAuthenticated ? 'ml-64' : ''}`}>
        {/* Top Navigation Bar for content area */}
        <nav className="bg-white h-16 flex items-center justify-between px-6">
          {/* Welcome Message */}
          <div className="flex-1">
            {isAuthenticated && currentUser && (
              <span className="text-gray-800 text-lg font-medium">Welcome, {currentUser.name}</span>
            )}
          </div>

          {/* Right Side - User/Logout/Notification Icons */}
          <div className="flex items-center ml-6">
            {/* Notification Icon (Placeholder) */}
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <span className="sr-only">View notifications</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
            </button>

            {/* User Profile Icon (Placeholder) */}
            <button className="ml-3 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </button>

            {/* Logout Button */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Login
              </Link>
            )}
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout; 