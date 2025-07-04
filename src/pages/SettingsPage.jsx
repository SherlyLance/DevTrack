// src/pages/SettingsPage.jsx
import React from 'react';
import { UserIcon, BellIcon, SunIcon, DatabaseIcon, SettingsIcon } from '../components/Icons';

const SettingsPage = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen rounded-lg shadow-inner">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-8 pb-4 border-b-2 border-indigo-200">
        <SettingsIcon className="inline-block mr-3 text-indigo-500"></SettingsIcon>
        Settings
      </h2>

      {/* User Profile Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
          <UserIcon className="inline-block mr-2 text-blue-500"></UserIcon>
          User Profile
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              defaultValue="John Doe"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              defaultValue="john.doe@example.com"
            />
          </div>
        </div>
        <button className="mt-6 px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200">
          Update Profile
        </button>
        <button className="mt-6 ml-4 px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-colors duration-200">
          Change Password
        </button>
      </div>

      {/* Notification Preferences Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
          <BellIcon className="inline-block mr-2 text-yellow-500"></BellIcon>
          Notification Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              id="notify-new-issue"
              name="notify-new-issue"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              defaultChecked
            />
            <label htmlFor="notify-new-issue" className="ml-3 block text-base text-gray-700">
              Email me when a new issue is assigned to me
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="notify-status-change"
              name="notify-status-change"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="notify-status-change" className="ml-3 block text-base text-gray-700">
              Email me on issue status changes
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="notify-mentions"
              name="notify-mentions"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              defaultChecked
            />
            <label htmlFor="notify-mentions" className="ml-3 block text-base text-gray-700">
              Email me when I am mentioned in a comment
            </label>
          </div>
        </div>
      </div>

      {/* Theme Selection Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
          <SunIcon className="inline-block mr-2 text-orange-500"></SunIcon>
          App Theme
        </h3>
        <div className="flex space-x-6">
          <div className="flex items-center">
            <input
              id="theme-light"
              name="theme"
              type="radio"
              className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              defaultChecked
            />
            <label htmlFor="theme-light" className="ml-3 block text-base text-gray-700">
              Light Mode
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="theme-dark"
              name="theme"
              type="radio"
              className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
            />
            <label htmlFor="theme-dark" className="ml-3 block text-base text-gray-700">
              Dark Mode
            </label>
          </div>
        </div>
      </div>

      {/* Data Management Section */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
          <DatabaseIcon className="inline-block mr-2 text-green-500"></DatabaseIcon>
          Data Management
        </h3>
        <p className="text-gray-600 mb-4">
          You can export your personal data associated with DevTrack here.
        </p>
        <button className="px-6 py-2 bg-purple-600 text-white font-medium rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200">
          Export My Data
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
