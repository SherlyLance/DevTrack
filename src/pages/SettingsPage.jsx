import React from 'react';

// Settings page component
const Settings = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-xl p-8 animate-fade-in">
        <h1 className="text-4xl font-extrabold text-purple-400 mb-8 text-center">
          <i className="lucide-settings text-5xl mr-2"></i>
          Settings
        </h1>

        <p className="text-lg text-gray-300 mb-6 text-center">
          Manage your DevTrack experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-700 p-6 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-blue-300 mb-3">Profile Management</h2>
            <p className="text-gray-400 mb-4">Update your personal information, email, and password.</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300">
              Go to Profile
            </button>
          </div>

          <div className="bg-gray-700 p-6 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-green-300 mb-3">Notification Preferences</h2>
            <p className="text-gray-400 mb-4">Configure how you receive alerts and updates from DevTrack.</p>
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300">
              Manage Notifications
            </button>
          </div>

          <div className="bg-gray-700 p-6 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-yellow-300 mb-3">Theme & Appearance</h2>
            <p className="text-gray-400 mb-4">Customize the look and feel of your dashboard.</p>
            <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300">
              Change Theme
            </button>
          </div>

          <div className="bg-gray-700 p-6 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-red-300 mb-3">Account Security</h2>
            <p className="text-gray-400 mb-4">Review security logs and manage connected devices.</p>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300">
              Security Dashboard
            </button>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Future updates will bring even more customization options!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
