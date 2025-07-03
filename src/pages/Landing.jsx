import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  const features = [
    {
      title: 'Project Management',
      description: 'Organize and track your projects with ease. Set milestones, assign tasks, and monitor progress.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 112-2h2a2 2 0 112 2" />
        </svg>
      ),
    },
    {
      title: 'Issue Tracking',
      description: 'Efficiently manage and resolve issues. Track bugs, feature requests, and improvements.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
    },
    {
      title: 'Team Collaboration',
      description: 'Work together seamlessly. Share updates, assign tasks, and communicate effectively.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div>
      {/* Hero Section - Full screen with blurred background and central content */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Blurred Background Image - UPDATED */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80)`,
            filter: 'blur(3px)',
            zIndex: 0,
          }}
        ></div>

        {/* Optional: Overlay for contrast if needed */}
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

        {/* Content Box - NOT blurred */}
        <div className="relative z-20 bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 p-8 md:p-12 rounded-lg shadow-xl text-center max-w-lg mx-auto transform -translate-y-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-800 dark:text-indigo-300 mb-4 tracking-tight">
            DevTrack
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8">
            Track bugs, manage tasks, ship faster.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-dark-800 transition-colors duration-200"
          >
            Get Started / Login
          </Link>
        </div>
      </div>

      {/* Feature Section */}
      <div className="bg-gray-50 dark:bg-gray-900 py-12 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-10">
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
              Everything you need to manage your projects
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
              Powerful tools to help you and your team stay organized and productive.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {features.map((feature) => (
                <div key={feature.title} className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-dark-soft">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    {feature.icon}
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">{feature.title}</h3>
                    <p className="mt-2 text-base text-gray-500 dark:text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 dark:text-gray-500">
          &copy; {new Date().getFullYear()} DevTrack. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Landing;