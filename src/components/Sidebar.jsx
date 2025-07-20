import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  HomeIcon,
  FolderIcon,
  ClipboardDocumentListIcon,
  PlusIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: HomeIcon },
    { path: '/projects', label: 'Projects', icon: FolderIcon },
    { path: '/issues', label: 'Issues', icon: ClipboardDocumentListIcon },
    { path: '/create-project', label: 'Create Project', icon: PlusIcon },
    { path: '/reports', label: 'Reports', icon: ChartBarIcon },
  ];

  if (!isAuthenticated) return null; // Sidebar only shows if authenticated

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-[#202938] shadow-lg flex flex-col">
      {/* DevTrack Header */}
      <div className="h-16 flex items-center justify-center text-white text-xl font-bold border-b border-gray-700">
        DevTrack
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors group ${
                isActive(item.path)
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <item.icon
                className={`h-6 w-6 ${
                  isActive(item.path) ? 'text-white' : 'text-gray-400 group-hover:text-white'
                }`}
              />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
