import React from 'react';
import { Link } from 'react-router-dom';
import { UsersIcon, ClockIcon, Bars3BottomLeftIcon } from '@heroicons/react/24/outline';

const ProjectCard = ({ project }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'To Do':
        return 'bg-yellow-100 text-yellow-800';
      case 'Done':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const issueTypeColors = {
    bugs: 'bg-red-100 text-red-800',
    features: 'bg-indigo-100 text-indigo-800',
    tasks: 'bg-gray-100 text-gray-800',
    todo: 'bg-blue-100 text-blue-800',
    inProgress: 'bg-amber-100 text-amber-800',
    done: 'bg-green-100 text-green-800',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-200 border border-gray-100">
      <div className="p-6">
        <h4 className="text-xl font-bold text-gray-900 mb-2 truncate">{project.title}</h4>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
        
        <div className="flex items-center text-gray-500 text-xs mb-4">
          <ClockIcon className="h-4 w-4 mr-1 text-gray-400" />
          <span>Created: {project.createdAt}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
          <div className="flex items-center">
            <UsersIcon className="h-5 w-5 mr-2 text-gray-500" />
            <span className="font-medium text-gray-700">Members:</span>
            <span className="ml-1 text-gray-600">{project.members.length}</span>
          </div>
          <div className="flex items-center">
            <Bars3BottomLeftIcon className="h-5 w-5 mr-2 text-gray-500" />
            <span className="font-medium text-gray-700">Issues:</span>
            <span className="ml-1 text-gray-600">{project.totalIssues}</span>
          </div>
        </div>

        {/* Issue Breakdown */}
        {project.totalIssues > 0 && (
          <div className="mb-4 grid grid-cols-3 gap-2 text-xs font-medium text-center">
            <span className={`${issueTypeColors.bugs} px-2 py-1 rounded-full`}>Bugs: {project.bugs || 0}</span>
            <span className={`${issueTypeColors.features} px-2 py-1 rounded-full`}>Features: {project.features || 0}</span>
            <span className={`${issueTypeColors.tasks} px-2 py-1 rounded-full`}>Tasks: {project.tasks || 0}</span>
            <span className={`${issueTypeColors.todo} px-2 py-1 rounded-full`}>To Do: {project.todo || 0}</span>
            <span className={`${issueTypeColors.inProgress} px-2 py-1 rounded-full`}>In Progress: {project.inProgress || 0}</span>
            <span className={`${issueTypeColors.done} px-2 py-1 rounded-full`}>Done: {project.done || 0}</span>
          </div>
        )}

        <div className="flex items-center justify-between mt-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}
          >
            {project.status}
          </span>
          <Link
            to={`/projects/${project.id}`}
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            View Details
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
