// src/pages/ProjectDetails.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useProjects } from '../context/ProjectsContext'; // To fetch project details
import { useIssues } from '../context/IssuesContext'; // To fetch issues related to the project
import { useAuth } from '../context/AuthContext'; // To get current user for comments
import {
  SettingsIcon, // Used for Edit Project (Cog6ToothIcon equivalent)
  TrashIcon,
  DashboardIcon, // Used for Back to Projects (ArrowUturnLeftIcon equivalent in spirit)
  PlusIcon,
  ReportsIcon // Used for Refresh (ArrowPathIcon equivalent in spirit)
} from '../components/Icons'; // Import necessary icons

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const ProjectDetails = () => {
  const { id } = useParams(); // Get project ID from URL
  const navigate = useNavigate();
  const { user: currentUser } = useAuth(); // Get current authenticated user
  const { projects, loading: projectsLoading, error: projectsError } = useProjects();
  // Assuming updateIssue is available from IssuesContext
  const { issues, loading: issuesLoading, error: issuesError, updateIssue, fetchIssues } = useIssues();

  const [project, setProject] = useState(null);
  const [projectIssues, setProjectIssues] = useState([]);
  const [currentComment, setCurrentComment] = useState(''); // State for new comment input

  useEffect(() => {
    if (projects && id) {
      const foundProject = projects.find(p => p._id === id); // Find project by _id from backend
      setProject(foundProject);
    }
  }, [projects, id]);

  useEffect(() => {
    if (issues && project) {
      // Filter issues relevant to this project
      const filteredIssues = issues.filter(issue => issue.projectId === project._id);
      setProjectIssues(filteredIssues);
    }
  }, [issues, project]);


  // Handle loading and error states
  if (projectsLoading || issuesLoading) {
    return (
      <div className="container mx-auto px-6 py-8 bg-[#f9fafb] flex justify-center items-center h-full">
        <p className="text-xl text-gray-700">Loading project details...</p>
      </div>
    );
  }

  if (projectsError || issuesError) {
    return (
      <div className="container mx-auto px-6 py-8 bg-[#f9fafb] flex justify-center items-center text-red-600">
        <p className="text-xl">Error loading project: {projectsError || issuesError}</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto px-6 py-8 bg-[#f9fafb] flex justify-center items-center h-full">
        <p className="text-xl text-gray-700">Project not found.</p>
      </div>
    );
  }

  // Aggregate data from fetched project and its issues
  const totalIssues = projectIssues.length;
  const bugs = projectIssues.filter(issue => issue.type === 'Bug').length;
  const features = projectIssues.filter(issue => issue.type === 'Feature').length;
  const tasks = projectIssues.filter(issue => issue.type === 'Task').length;

  const todoIssuesCount = projectIssues.filter(issue => issue.status === 'To Do').length;
  const inProgressIssuesCount = projectIssues.filter(issue => issue.status === 'In Progress').length;
  const doneIssuesCount = projectIssues.filter(issue => issue.status === 'Done').length;

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
        data: [todoIssuesCount, inProgressIssuesCount, doneIssuesCount],
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
    // This would typically be a function from ProjectsContext
    if (window.confirm(`Are you sure you want to delete "${project.title}"? This action cannot be undone.`)) {
      console.log(`Simulating deletion of project ${project._id}`);
      // Call a deleteProject function from ProjectsContext here
      // e.g., deleteProject(project._id);
      // Then navigate back to projects list on success
      navigate('/projects');
      alert('Project deletion simulated. Backend integration required for actual deletion.'); // Use a custom modal instead of alert in real app
    }
  };

  const handleAddComment = async () => {
    if (currentComment.trim() && currentUser && project) {
      // For simplicity, let's assume comments are added to the first issue for now, or a general project comment system
      // A more robust solution would involve selecting an issue or having a dedicated project comment model.
      // For now, let's simulate adding to a specific issue or if no issues, just log.

      if (projectIssues.length > 0) {
        const targetIssue = projectIssues[0]; // Example: Add to the first issue
        const newComment = {
          author: currentUser.id, // Use current user's ID
          text: currentComment.trim(),
          timestamp: new Date().toISOString()
        };

        // Create a new array of comments including the new one
        const updatedComments = [...(targetIssue.comments || []), newComment];

        try {
          // Call updateIssue from IssuesContext to add the comment
          // Note: The backend's /tickets/:id/comments endpoint is more suitable for this.
          // This current frontend approach (updating the whole comments array via updateIssue)
          // works if your PUT /tickets/:id endpoint accepts the full comments array.
          // If you want to use the dedicated POST /tickets/:id/comments, you'd need a new function in IssuesContext.
          await updateIssue(targetIssue._id, { comments: updatedComments });
          setCurrentComment(''); // Clear input
          alert('Comment added successfully!'); // Replace with toast
          fetchIssues(); // Re-fetch issues to get the updated comments
        } catch (error) {
          console.error('Error adding comment:', error);
          alert('Failed to add comment.'); // Replace with toast
        }
      } else {
        alert('No issues in this project to add a comment to. (Backend integration for general project comments needed)');
        setCurrentComment('');
      }
    } else {
      alert('Please write a comment and ensure you are logged in.');
    }
  };


  return (
    <div className="container mx-auto px-6 py-8 bg-[#f9fafb]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1> {/* Use project.title */}
        <div className="flex space-x-4">
          <Link
            to="/projects"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center"
          >
            <DashboardIcon className="h-5 w-5 mr-1" /> {/* Changed icon */}
            Back to Projects
          </Link>
          {/* Assuming you'll have an edit project page */}
          <Link
            to={`/projects/${project._id}/edit`}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center"
          >
            <SettingsIcon className="h-5 w-5 mr-1" /> {/* Changed icon */}
            Edit Project
          </Link>
          <Link
            to={`/create-issue?projectId=${project._id}`}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-1" />
            Add New Issue
          </Link>
          <button
            onClick={() => { /* Implement refresh logic, e.g., refetch project/issues */ alert('Refresh simulated. Implement refetch logic.'); }}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center"
          >
            <ReportsIcon className="h-5 w-5 mr-1" /> {/* Changed icon */}
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
              <p className="mt-1 text-base text-gray-900">{new Date(project.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Start Date</p>
              <p className="mt-1 text-base text-gray-900">{new Date(project.startDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">End Date</p>
              <p className="mt-1 text-base text-gray-900">{new Date(project.endDate).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <span className={`mt-1 px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                project.status === 'In Progress'
                  ? 'bg-blue-100 text-blue-800'
                  : project.status === 'completed' // Use 'completed' as per backend model
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800' // For 'active' or 'on-hold'
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
          {project.teamMembers && project.teamMembers.length > 0 ? (
            project.teamMembers.map(member => (
              <div key={member._id} className="flex items-center space-x-3 bg-gray-50 rounded-full pr-4 py-2 pl-2 shadow-sm">
                <img className="h-10 w-10 rounded-full" src={`https://placehold.co/40x40/6366f1/ffffff?text=${member.name.charAt(0).toUpperCase()}`} alt={member.name} />
                <div>
                  <p className="text-sm font-medium text-gray-900">{member.name}</p>
                  <p className="text-xs text-gray-500">{member.role || 'Member'}</p> {/* Assuming role might not be populated */}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No team members assigned yet.</p>
          )}
        </div>
      </div>

      {/* Issue Breakdown - Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Issue Type Distribution</h2>
          <div className="h-64 flex items-center justify-center">
            {totalIssues > 0 ? (
              <Pie data={ticketTypeData} options={{ maintainAspectRatio: false, responsive: true }} />
            ) : (
              <p className="text-gray-400">No issues to display chart.</p>
            )}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Issue Completion Status</h2>
          <div className="h-64 flex items-center justify-center">
            {totalIssues > 0 ? (
              <Pie data={completionStatusData} options={{ maintainAspectRatio: false, responsive: true }} />
            ) : (
              <p className="text-gray-400">No issues to display chart.</p>
            )}
          </div>
        </div>
      </div>

      {/* Detailed Issue Kanban Board */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Kanban Board</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* To Do Column */}
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">To Do ({todoIssuesCount})</h3>
            <div className="space-y-4">
              {projectIssues.filter(issue => issue.status === 'To Do').length > 0 ? (
                projectIssues.filter(issue => issue.status === 'To Do').map(issue => (
                  <Link to={`/issues/${issue._id}`} key={issue._id} className="block bg-white p-4 rounded-md shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer">
                    <h4 className="text-md font-semibold text-gray-900 mb-1">{issue.title}</h4>
                    <p className="text-sm text-gray-600">Type: {issue.type}</p>
                    <p className="text-sm text-gray-600">Assignee: {issue.assignee?.name || 'Unassigned'}</p> {/* Use assignee.name */}
                    <span className={`mt-2 px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      issue.priority === 'High'
                        ? 'bg-red-100 text-red-800'
                        : issue.priority === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {issue.priority}
                    </span>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No 'To Do' issues.</p>
              )}
            </div>
          </div>

          {/* In Progress Column */}
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">In Progress ({inProgressIssuesCount})</h3>
            <div className="space-y-4">
              {projectIssues.filter(issue => issue.status === 'In Progress').length > 0 ? (
                projectIssues.filter(issue => issue.status === 'In Progress').map(issue => (
                  <Link to={`/issues/${issue._id}`} key={issue._id} className="block bg-white p-4 rounded-md shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer">
                    <h4 className="text-md font-semibold text-gray-900 mb-1">{issue.title}</h4>
                    <p className="text-sm text-gray-600">Type: {issue.type}</p>
                    <p className="text-sm text-gray-600">Assignee: {issue.assignee?.name || 'Unassigned'}</p>
                    <span className={`mt-2 px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      issue.priority === 'High'
                        ? 'bg-red-100 text-red-800'
                        : issue.priority === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {issue.priority}
                    </span>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No 'In Progress' issues.</p>
              )}
            </div>
          </div>

          {/* Done Column */}
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Done ({doneIssuesCount})</h3>
            <div className="space-y-4">
              {projectIssues.filter(issue => issue.status === 'Done').length > 0 ? (
                projectIssues.filter(issue => issue.status === 'Done').map(issue => (
                  <Link to={`/issues/${issue._id}`} key={issue._id} className="block bg-white p-4 rounded-md shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer">
                    <h4 className="text-md font-semibold text-gray-900 mb-1">{issue.title}</h4>
                    <p className="text-sm text-gray-600">Type: {issue.type}</p>
                    <p className="text-sm text-gray-600">Assignee: {issue.assignee?.name || 'Unassigned'}</p>
                    <span className={`mt-2 px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      issue.priority === 'High'
                        ? 'bg-red-100 text-red-800'
                        : issue.priority === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {issue.priority}
                    </span>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No 'Done' issues.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Activity Log</h2>
        <ul className="divide-y divide-gray-200">
          {project.activityLog && project.activityLog.length > 0 ? (
            project.activityLog.map(activity => ( // Assuming activityLog is part of project details
              <li key={activity.id} className="py-3 text-sm text-gray-800">
                <span className="font-medium">{activity.description}</span>
                <span className="text-gray-500 ml-2">{activity.timestamp}</span>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No activity for this project.</p>
          )}
        </ul>
      </div>

      {/* Comment Section */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Comments</h2>
        <div className="space-y-4 mb-6">
          {projectIssues.some(issue => (issue.comments && issue.comments.length > 0)) ? (
            projectIssues.map(issue => (
              (issue.comments || []).map((comment, commentIndex) => (
                <div key={`${issue._id}-${comment.timestamp}-${commentIndex}`} className="bg-gray-50 p-3 rounded-md border border-gray-200">
                  <p className="text-sm font-medium text-gray-900">{comment.author?.name || 'Unknown'} <span className="text-gray-500 text-xs ml-2">{new Date(comment.timestamp).toLocaleString()}</span></p>
                  <p className="text-sm text-gray-800 mt-1">{comment.text}</p>
                </div>
              ))
            ))
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </div>
        <div className="mt-4">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="Add a comment..."
            value={currentComment}
            onChange={(e) => setCurrentComment(e.target.value)}
          ></textarea>
          <button
            onClick={handleAddComment}
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
