import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Cog6ToothIcon, TrashIcon, ArrowUturnLeftIcon, PlusIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const ProjectDetails = () => {
  const { id } = useParams();

  // This would typically come from your backend API
  const project = {
    id,
    name: 'Sample Project',
    description: 'This is a detailed sample project description, outlining its purpose, scope, and key objectives. It provides a comprehensive overview for all stakeholders involved.',
    dateCreated: '2024-01-01',
    startDate: '2024-01-15',
    endDate: '2024-12-31',
    status: 'In Progress',
    teamMembers: [
      { id: 1, name: 'Alice Smith', role: 'Lead Developer', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29329?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { id: 2, name: 'Bob Johnson', role: 'QA Engineer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80' },
      { id: 3, name: 'Charlie Brown', role: 'UI/UX Designer', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { id: 4, name: 'David Lee', role: 'Project Manager', avatar: 'https://images.unsplash.com/photo-1517841905240-a50677c75627?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    ],
    issues: [
      { id: 'issue-101', title: 'Implement user authentication', type: 'Feature', status: 'To Do', assignee: 'Alice Smith', priority: 'High', createdAt: '2024-01-15', description: 'Develop and integrate the user authentication module, including registration, login, and password reset functionalities.', comments: [{ author: 'Alice Smith', text: 'Starting work on this next week.', timestamp: '2024-01-12' }] },
      { id: 'issue-102', title: 'Fix dashboard chart display bug', type: 'Bug', status: 'In Progress', assignee: 'Bob Johnson', priority: 'High', createdAt: '2024-01-20', description: 'The dashboard charts are not rendering correctly on certain screen resolutions. Needs immediate attention.', comments: [{ author: 'Bob Johnson', text: 'Investigating the issue now.', timestamp: '2024-01-21' }] },
      { id: 'issue-103', title: 'Add project filtering options', type: 'Feature', status: 'Done', assignee: 'Charlie Brown', priority: 'Medium', createdAt: '2024-02-01', description: 'Implement advanced filtering options for projects based on status, assignee, and date created.', comments: [{ author: 'Charlie Brown', text: 'Feature implemented and tested.', timestamp: '2024-02-05' }] },
      { id: 'issue-104', title: 'Database performance tuning', type: 'Task', status: 'To Do', assignee: 'Alice Smith', priority: 'Medium', createdAt: '2024-02-10', description: 'Optimize database queries and indexing to improve application performance.', comments: [] },
      { id: 'issue-105', title: 'Update UI for issues page', type: 'Task', status: 'In Progress', assignee: 'Charlie Brown', priority: 'Low', createdAt: '2024-02-15', description: 'Refresh the user interface of the issues listing page for better user experience.', comments: [{ author: 'Charlie Brown', text: 'Working on mockups.', timestamp: '2024-02-16' }] },
      { id: 'issue-106', title: 'API documentation for projects', type: 'Task', status: 'Done', assignee: 'David Lee', priority: 'Low', createdAt: '2024-02-20', description: 'Create comprehensive API documentation for all project-related endpoints.', comments: [] },
    ],
    activityLog: [
      { id: 1, description: 'Project created by David Lee', timestamp: '2024-01-01 09:00 AM' },
      { id: 2, description: 'Issue #101 created: Implement user authentication', timestamp: '2024-01-15 10:30 AM' },
      { id: 3, description: 'Issue #101 status changed to In Progress', timestamp: '2024-01-16 11:00 AM' },
      { id: 4, description: 'Issue #102 created: Fix dashboard chart display bug', timestamp: '2024-01-20 02:15 PM' },
      { id: 5, description: 'Issue #102 assigned to Bob Johnson', timestamp: '2024-01-20 02:30 PM' },
      { id: 6, description: 'Issue #103 created: Add project filtering options', timestamp: '2024-02-01 09:45 AM' },
      { id: 7, description: 'Issue #103 status changed to Done', timestamp: '2024-02-05 04:00 PM' },
    ],
  };

  const totalIssues = project.issues.length;
  const bugs = project.issues.filter(issue => issue.type === 'Bug').length;
  const features = project.issues.filter(issue => issue.type === 'Feature').length;
  const tasks = project.issues.filter(issue => issue.type === 'Task').length;

  const todoIssues = project.issues.filter(issue => issue.status === 'To Do').length;
  const inProgressIssues = project.issues.filter(issue => issue.status === 'In Progress').length;
  const doneIssues = project.issues.filter(issue => issue.status === 'Done').length;

  const ticketTypeData = {
    labels: ['Bugs', 'Features', 'Tasks'],
    datasets: [
      {
        label: 'Issues by Type',
        data: [bugs, features, tasks],
        backgroundColor: [
          '#EF4444', // Red for Bugs
          '#3B82F6', // Blue for Features
          '#22C55E', // Green for Tasks
        ],
        borderColor: [
          '#EF4444',
          '#3B82F6',
          '#22C55E',
        ],
        borderWidth: 1,
      },
    ],
  };

  const completionStatusData = {
    labels: ['To Do', 'In Progress', 'Done'],
    datasets: [
      {
        label: 'Completion Status',
        data: [todoIssues, inProgressIssues, doneIssues],
        backgroundColor: [
          '#F59E0B', // Amber for To Do
          '#60A5FA', // Blue for In Progress
          '#10B981', // Emerald for Done
        ],
        borderColor: [
          '#F59E0B',
          '#60A5FA',
          '#10B981',
        ],
        borderWidth: 1,
      },
    ],
  };

  const handleDeleteProject = () => {
    if (window.confirm(`Are you sure you want to delete "${project.name}"? This action cannot be undone.`)) {
      // Here you would typically make an API call to delete the project
      console.log(`Deleting project ${project.id}`);
      // After successful deletion, navigate back to the projects list
      // navigate('/projects');
      alert('Project deletion simulated.');
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 bg-[#f9fafb]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
        <div className="flex space-x-4">
          <Link
            to="/projects"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center"
          >
            <ArrowUturnLeftIcon className="h-5 w-5 mr-1" />
            Back to Projects
          </Link>
          <Link
            to={`/projects/${id}/edit`}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center"
          >
            <Cog6ToothIcon className="h-5 w-5 mr-1" />
            Edit Project
          </Link>
          <Link
            to={`/create-issue?projectId=${project.id}`}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-1" />
            Add New Issue
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center"
          >
            <ArrowPathIcon className="h-5 w-5 mr-1" />
            Refresh
          </button>
          <button
            onClick={handleDeleteProject}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center"
          >
            <TrashIcon className="h-5 w-5 mr-1" />
            Delete Project
          </button>
        </div>
      </div>

      {/* Project Overview */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Project Overview</h2>
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-500 mb-2">Description</p>
          <p className="text-base text-gray-900 leading-relaxed">{project.description}</p>
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Date Created</p>
              <p className="mt-1 text-base text-gray-900">{project.dateCreated}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Start Date</p>
              <p className="mt-1 text-base text-gray-900">{project.startDate}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">End Date</p>
              <p className="mt-1 text-base text-gray-900">{project.endDate}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <span className={`mt-1 px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                project.status === 'In Progress'
                  ? 'bg-blue-100 text-blue-800'
                  : project.status === 'Completed'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {project.status}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Issues</p>
              <p className="mt-1 text-base text-gray-900 font-bold">{totalIssues}</p>
            </div>
            <div>{/* Empty column for alignment */}</div>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Team Members</h2>
        <div className="flex flex-wrap gap-4">
          {project.teamMembers.map(member => (
            <div key={member.id} className="flex items-center space-x-3 bg-gray-50 rounded-full pr-4 py-2 pl-2 shadow-sm">
              <img className="h-10 w-10 rounded-full" src={member.avatar} alt={member.name} />
              <div>
                <p className="text-sm font-medium text-gray-900">{member.name}</p>
                <p className="text-xs text-gray-500">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Issue Breakdown - Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Issue Type Distribution</h2>
          <div className="h-64 flex items-center justify-center">
            <Pie data={ticketTypeData} options={{ maintainAspectRatio: false, responsive: true }} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Issue Completion Status</h2>
          <div className="h-64 flex items-center justify-center">
            <Pie data={completionStatusData} options={{ maintainAspectRatio: false, responsive: true }} />
          </div>
        </div>
      </div>

      {/* Detailed Issue Table */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Kanban Board</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* To Do Column */}
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">To Do ({todoIssues.length})</h3>
            <div className="space-y-4">
              {project.issues.filter(issue => issue.status === 'To Do').map(issue => (
                <div key={issue.id} className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                  <h4 className="text-md font-semibold text-gray-900 mb-1">{issue.title}</h4>
                  <p className="text-sm text-gray-600">Type: {issue.type}</p>
                  <p className="text-sm text-gray-600">Assignee: {issue.assignee}</p>
                  <span className={`mt-2 px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    issue.priority === 'High'
                      ? 'bg-red-100 text-red-800'
                      : issue.priority === 'Medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {issue.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* In Progress Column */}
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">In Progress ({inProgressIssues.length})</h3>
            <div className="space-y-4">
              {project.issues.filter(issue => issue.status === 'In Progress').map(issue => (
                <div key={issue.id} className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                  <h4 className="text-md font-semibold text-gray-900 mb-1">{issue.title}</h4>
                  <p className="text-sm text-gray-600">Type: {issue.type}</p>
                  <p className="text-sm text-gray-600">Assignee: {issue.assignee}</p>
                  <span className={`mt-2 px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    issue.priority === 'High'
                      ? 'bg-red-100 text-red-800'
                      : issue.priority === 'Medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {issue.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Done Column */}
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Done ({doneIssues.length})</h3>
            <div className="space-y-4">
              {project.issues.filter(issue => issue.status === 'Done').map(issue => (
                <div key={issue.id} className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                  <h4 className="text-md font-semibold text-gray-900 mb-1">{issue.title}</h4>
                  <p className="text-sm text-gray-600">Type: {issue.type}</p>
                  <p className="text-sm text-gray-600">Assignee: {issue.assignee}</p>
                  <span className={`mt-2 px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    issue.priority === 'High'
                      ? 'bg-red-100 text-red-800'
                      : issue.priority === 'Medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {issue.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Activity Log</h2>
        <ul className="divide-y divide-gray-200">
          {project.activityLog.map(activity => (
            <li key={activity.id} className="py-3 text-sm text-gray-800">
              <span className="font-medium">{activity.description}</span>
              <span className="text-gray-500 ml-2">{activity.timestamp}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Comment Section */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Comments</h2>
        <div className="space-y-4 mb-6">
          {project.issues.flatMap(issue => issue.comments.map((comment, index) => (
            <div key={`${issue.id}-${index}`} className="bg-gray-50 p-3 rounded-md border border-gray-200">
              <p className="text-sm font-medium text-gray-900">{comment.author} <span className="text-gray-500 text-xs ml-2">{comment.timestamp}</span></p>
              <p className="text-sm text-gray-800 mt-1">{comment.text}</p>
            </div>
          )))}
        </div>
        <div className="mt-4">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="Add a comment..."
          ></textarea>
          <button
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails; 