// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink for active styling
import { useAuth } from '../context/AuthContext'; // Import useAuth

import {
  DashboardIcon,
  ProjectsIcon,
  IssuesIcon,
  CreateProjectIcon,
  ReportsIcon,
  SettingsIcon, // Assuming you want settings in sidebar
  InfoIcon,     // Assuming you want learn more in sidebar
  UserIcon      // For user profile section
} from './Icons'; // Import all necessary icons from your Icons.jsx

const Sidebar = () => {
  const { isAuthenticated, user } = useAuth(); // Get isAuthenticated and user from AuthContext

  // Helper function to apply active styling
  const getNavLinkClass = ({ isActive }) =>
    `w-full text-left py-2 px-4 rounded-lg flex items-center transition-all duration-200 ${
      isActive ? 'bg-indigo-700 text-white shadow-inner' : 'hover:bg-gray-700 text-gray-300'
    }`;

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: DashboardIcon },
    { path: '/projects', label: 'Projects', icon: ProjectsIcon },
    { path: '/issues', label: 'Issues', icon: IssuesIcon },
    { path: '/create-project', label: 'Create Project', icon: CreateProjectIcon },
    { path: '/reports', label: 'Reports', icon: ReportsIcon },
    { path: '/settings', label: 'Settings', icon: SettingsIcon }, // Added Settings
    { path: '/learn-more', label: 'Learn More', icon: InfoIcon }, // Added Learn More
  ];

  if (!isAuthenticated) return null; // Sidebar only shows if authenticated

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4 flex flex-col rounded-r-lg shadow-lg">
      <div className="flex items-center mb-8">
        <img src="https://placehold.co/40x40/6366f1/ffffff?text=DT" alt="DevTrack Logo" className="w-10 h-10 rounded-full mr-3" />
        <h1 className="text-3xl font-bold text-indigo-400">DevTrack</h1>
      </div>
      <nav className="flex-grow">
        <ul>
          {navItems.map((item) => (
            <li key={item.path} className="mb-2">
              <NavLink to={item.path} className={getNavLinkClass}>
                <item.icon className="mr-3" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {/* User profile section at the bottom of the sidebar */}
      {user && (
        <div className="mt-auto pt-4 border-t border-gray-700">
          <div className="flex items-center cursor-pointer p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200">
            <img
              src={`https://placehold.co/40x40/6366f1/ffffff?text=${user.name ? user.name.charAt(0).toUpperCase() : '?'}`} // Dynamic user avatar
              alt="User Avatar"
              className="w-10 h-10 rounded-full mr-3 border-2 border-indigo-400"
            />
            <div>
              <p className="font-semibold text-gray-200">{user.name || 'Guest'}</p>
              <p className="text-sm text-gray-400">{user.role || 'User'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
