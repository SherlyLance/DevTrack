// src/pages/LearnMorePage.jsx
import React from 'react';
import { InfoIcon, FileTextIcon, BookOpenIcon, HelpCircleIcon, MailIcon } from '../components/Icons';

const LearnMorePage = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen rounded-lg shadow-inner">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-8 pb-4 border-b-2 border-indigo-200">
        <InfoIcon className="inline-block mr-3 text-indigo-500"></InfoIcon>
        Learn More About DevTrack
      </h2>

      {/* About DevTrack Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
          <FileTextIcon className="inline-block mr-2 text-blue-500"></FileTextIcon>
          About DevTrack
        </h3>
        <p className="text-gray-600 leading-relaxed">
          DevTrack is a modern, feature-rich project management dashboard designed to streamline your development workflow. From intuitive project setup and team collaboration to advanced issue tracking with Kanban boards and comprehensive analytics, DevTrack empowers teams to deliver projects efficiently and effectively. Our goal is to provide a seamless experience for developers, project managers, and stakeholders to collaborate in real-time and achieve their objectives.
        </p>
      </div>

      {/* How to Use Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
          <BookOpenIcon className="inline-block mr-2 text-green-500"></BookOpenIcon>
          How to Use DevTrack
        </h3>
        <ul className="list-disc list-inside text-gray-600 space-y-3 leading-relaxed">
          <li>
            <strong>Dashboard:</strong> Your central hub for quick insights. View project summaries, issue distribution, and your assigned tasks at a glance.
          </li>
          <li>
            <strong>Projects:</strong> Create, manage, and track the progress of all your development projects. Invite team members, assign roles, and monitor project health.
          </li>
          <li>
            <strong>Issues:</strong> Utilize the powerful Kanban board to visualize and manage tasks and bugs. Drag-and-drop issues between statuses, filter by priority, assignee, and project, and add detailed descriptions and attachments.
          </li>
          <li>
            <strong>Reports & Analytics:</strong> Generate insightful reports to understand team productivity, issue trends, and project completion rates. Export data for further analysis.
          </li>
          <li>
            <strong>Real-time Collaboration:</strong> Stay updated with live notifications and instant communication features, ensuring everyone is on the same page.
          </li>
        </ul>
      </div>

      {/* FAQ Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
          <HelpCircleIcon className="inline-block mr-2 text-purple-500"></HelpCircleIcon>
          Frequently Asked Questions (FAQ)
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800">Q: How do I invite team members to a project?</h4>
            <p className="text-gray-600">
              A: Navigate to the "Projects" section, select your project, and then go to the "Team" tab. You'll find an option to invite members via email.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Q: Can I customize the issue statuses?</h4>
            <p className="text-gray-600">
              A: Currently, DevTrack supports "To Do", "In Progress", and "Done" statuses. Custom statuses are a planned feature for future updates.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Q: Is there a mobile app available?</h4>
            <p className="text-gray-600">
              A: DevTrack is fully responsive and optimized for mobile browsers, providing a seamless experience across devices. A dedicated mobile app is under consideration.
            </p>
          </div>
        </div>
      </div>

      {/* Contact & Legal Section */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
          <MailIcon className="inline-block mr-2 text-red-500"></MailIcon>
          Contact & Legal
        </h3>
        <p className="text-gray-600 mb-2">
          For support or inquiries, please contact us at: <a href="mailto:support@devtrack.com" className="text-indigo-600 hover:underline">support@devtrack.com</a>
        </p>
        <p className="text-gray-600">
          Read our <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a> and <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default LearnMorePage;
