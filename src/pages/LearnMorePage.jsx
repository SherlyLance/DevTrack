import React from 'react';

// Learn More page component
const LearnMore = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-xl p-8 animate-fade-in">
        <h1 className="text-4xl font-extrabold text-indigo-400 mb-8 text-center">
          <i className="lucide-info text-5xl mr-2"></i>
          Learn More About DevTrack
        </h1>

        <p className="text-lg text-gray-300 mb-6 text-center">
          Discover the power of efficient project and issue management.
        </p>

        <div className="space-y-8 mb-8">
          <section className="bg-gray-700 p-6 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-purple-300 mb-3">What is DevTrack?</h2>
            <p className="text-gray-400 leading-relaxed">
              DevTrack is a comprehensive issue tracking and project management solution designed
              to streamline your development workflow. From bug reporting to feature requests and
              task assignments, DevTrack helps teams collaborate effectively and deliver projects
              on time. Its intuitive interface and powerful features make it easy to
              manage complex projects with clarity and control.
            </p>
          </section>

          <section className="bg-gray-700 p-6 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-teal-300 mb-3">Key Features</h2>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li>Centralized Issue Tracking: Log, categorize, and prioritize issues effortlessly.</li>
              <li>Project Management: Create and manage multiple projects with dedicated teams.</li>
              <li>Team Collaboration: Assign tasks, add comments, and track activity in real-time.</li>
              <li>Customizable Workflows: Adapt DevTrack to your team's unique processes.</li>
              <li>Reporting & Analytics: Gain insights into project progress and team performance.</li>
            </ul>
          </section>

          <section className="bg-gray-700 p-6 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-orange-300 mb-3">Getting Started</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Ready to boost your team's productivity? Here are some quick steps to get you started:
            </p>
            <ol className="list-decimal list-inside text-gray-400 space-y-2">
              <li>**Create a Project:** Define your first project and invite your team members.</li>
              <li>**Log an Issue:** Start by adding your first bug, task, or feature request.</li>
              <li>**Assign & Collaborate:** Assign issues to team members and use comments for discussion.</li>
              <li>**Track Progress:** Monitor issue statuses and project timelines from your dashboard.</li>
            </ol>
          </section>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            For more detailed documentation and support, please visit our help center.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;
