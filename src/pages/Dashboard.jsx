// src/pages/Dashboard.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { useProjects } from '../context/ProjectsContext'; // Import useProjects
import { useIssues } from '../context/IssuesContext'; // Assuming you have/will create IssuesContext
import {
  ProjectsIcon,
  IssuesIcon,
  CheckCircleIcon,
  PlusIcon,
  CreateProjectIcon,
  ReportsIcon,
  ListBulletIcon
} from '../components/Icons'; // Import all necessary icons

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Dashboard = () => {
  const { projects, loading: projectsLoading, error: projectsError, fetchProjects } = useProjects();
  // Assuming IssuesContext provides issues, loading, and error states
  const { issues, loading: issuesLoading, error: issuesError, fetchIssues } = useIssues();

  useEffect(() => {
    // Fetch projects and issues when the component mounts or dependencies change
    // The contexts themselves already handle initial fetching based on auth state,
    // but explicit calls here ensure data is fresh when navigating to dashboard.
    fetchProjects();
    fetchIssues();
  }, [fetchProjects, fetchIssues]);

  // Handle loading and error states
  if (projectsLoading || issuesLoading) {
    return (
      <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen rounded-lg shadow-inner flex justify-center items-center">
        <p className="text-xl text-gray-700">Loading dashboard data...</p>
      </div>
    );
  }

  if (projectsError || issuesError) {
    return (
      <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen rounded-lg shadow-inner flex justify-center items-center text-red-600">
        <p className="text-xl">Error loading data: {projectsError || issuesError}</p>
      </div>
    );
  }

  // Aggregate data from fetched projects and issues
  const totalProjects = projects.length;
  const totalIssues = issues.length;
  const todoIssuesCount = issues.filter(issue => issue.status === 'To Do').length;
  const inProgressIssuesCount = issues.filter(issue => issue.status === 'In Progress').length;
  const doneIssuesCount = issues.filter(issue => issue.status === 'Done').length;

  // Placeholder for "My Assigned Tasks" - ideally this comes from a user-specific filter or endpoint
  // For now, let's just count issues assigned to the current user (if user context provided user ID)
  // Assuming 'issues' objects have an 'assignee' field that matches a user ID or name
  // For this example, let's just count all 'To Do' and 'In Progress' issues as "assigned to me" for simplicity
  const myAssignedTasksCount = todoIssuesCount + inProgressIssuesCount;


  // Chart Data Examples
  const chartColors = {
    toDo: '#F87171', // Red-400
    inProgress: '#60A5FA', // Blue-400
    done: '#4ADE80', // Green-400
    high: '#FB923C', // Orange-400
    medium: '#A78BFA', // Purple-400
    low: '#FCD34D', // Yellow-400
  };

  const ticketStatusData = {
    labels: ['To Do', 'In Progress', 'Done'],
    datasets: [
      {
        label: 'Tickets by Status',
        data: [todoIssuesCount, inProgressIssuesCount, doneIssuesCount],
        backgroundColor: [
          chartColors.toDo,
          chartColors.inProgress,
          chartColors.done,
        ],
        borderColor: [
          chartColors.toDo,
          chartColors.inProgress,
          chartColors.done,
        ],
        borderWidth: 1,
      },
    ],
  };

  // For priority data, you'd need issue objects to have a 'priority' field
  // For now, using a static placeholder for priority distribution as issues context is not yet detailed
  const highPriorityIssues = issues.filter(issue => issue.priority === 'High').length;
  const mediumPriorityIssues = issues.filter(issue => issue.priority === 'Medium').length;
  const lowPriorityIssues = issues.filter(issue => issue.priority === 'Low').length;

  const ticketPriorityData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [
      {
        label: 'Tickets by Priority',
        data: [highPriorityIssues, mediumPriorityIssues, lowPriorityIssues],
        backgroundColor: [
          chartColors.high,
          chartColors.medium,
          chartColors.low,
        ],
        borderColor: [
          chartColors.high,
          chartColors.medium,
          chartColors.low,
        ],
        borderWidth: 1,
      },
    ],
  };

  // My Tasks (from issues assigned to current user, or just 'To Do'/'In Progress' for now)
  const myTasks = issues.filter(issue => issue.status === 'To Do' || issue.status === 'In Progress'); // Simplified for now

  // Recent Activity (This would ideally come from an activity log endpoint)
  // For now, let's generate some mock activities based on fetched issues
  const recentActivities = issues.slice(0, 5).map(issue => ({
    id: issue._id, // Assuming _id from MongoDB
    description: `Issue "${issue.title}" status changed to ${issue.status}.`,
    timestamp: new Date(issue.updatedAt || issue.createdAt).toLocaleString(), // Use actual timestamps
  }));


  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen rounded-lg shadow-inner">
      <h2 className="text-5xl font-extrabold text-gray-900 mb-8 pb-4 border-b-4 border-indigo-300">
        Dashboard Overview
      </h2>

      {/* Quick Actions Section */}
      <div className="mb-10">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/create-issue" className="flex items-center justify-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 border border-blue-200">
            <PlusIcon className="mr-2 text-blue-500" />
            <span className="text-lg font-medium text-gray-700">New Issue</span>
          </Link>
          <Link to="/create-project" className="flex items-center justify-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 border border-green-200">
            <CreateProjectIcon className="mr-2 text-green-500" />
            <span className="text-lg font-medium text-gray-700">New Project</span>
          </Link>
          <Link to="/reports" className="flex items-center justify-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 border border-purple-200">
            <ReportsIcon className="mr-2 text-purple-500" />
            <span className="text-lg font-medium text-gray-700">View Reports</span>
          </Link>
          <Link to="/issues" className="flex items-center justify-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 border border-yellow-200">
            <ListBulletIcon className="mr-2 text-yellow-500" />
            <span className="text-lg font-medium text-gray-700">My Tasks</span>
          </Link>
        </div>
      </div>

      {/* Key Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
            <ProjectsIcon className="mr-2 text-indigo-500" /> Total Projects
          </h3>
          <p className="text-6xl font-bold text-indigo-700 animate-fade-in">{totalProjects}</p>
          <p className="text-sm text-gray-500 mt-2">Currently active projects</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
            <IssuesIcon className="mr-2 text-red-500" /> Open Issues
          </h3>
          <p className="text-6xl font-bold text-red-600 animate-fade-in">{todoIssuesCount + inProgressIssuesCount}</p>
          <p className="text-sm text-gray-500 mt-2">Issues awaiting resolution</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
            <CheckCircleIcon className="mr-2 text-green-500" />
            Completed Tasks
          </h3>
          <p className="text-6xl font-bold text-green-700 animate-fade-in">{doneIssuesCount}</p>
          <p className="text-sm text-gray-500 mt-2">Tasks completed overall</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Issue Distribution by Status</h4>
          <div className="h-64 flex items-center justify-center">
            {totalIssues > 0 ? (
              <Pie data={ticketStatusData} options={{ maintainAspectRatio: false, responsive: true }} />
            ) : (
              <p className="text-gray-400">No issues to display chart.</p>
            )}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Issue Priority Breakdown</h4>
          <div className="h-64 flex items-center justify-center">
            {totalIssues > 0 ? (
              <Bar data={ticketPriorityData} options={{ maintainAspectRatio: false, responsive: true, scales: { y: { beginAtZero: true } } }} />
            ) : (
              <p className="text-gray-400">No issues to display chart.</p>
            )}
          </div>
        </div>
      </div>

      {/* My Tasks */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">My Tasks</h4>
        <ul className="divide-y divide-gray-200">
          {myTasks.length > 0 ? (
            myTasks.map((task) => (
              <li key={task._id} className="py-3">
                <h5 className="text-lg font-medium text-gray-900">{task.title}</h5>
                <p className="text-sm text-gray-600">Priority: {task.priority} | Status: {task.status}</p>
                <span className="text-xs text-gray-500">Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</span>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No tasks assigned to you or in progress.</p>
          )}
        </ul>
      </div>

      {/* Recent Activity Feed */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h3>
        <ul className="space-y-4">
          {recentActivities.length > 0 ? (
            recentActivities.map((activity) => (
              <li key={activity.id} className="flex items-start text-gray-700">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3"></div>
                <div>
                  <p className="text-gray-800">{activity.description}</p>
                  <span className="text-xs text-gray-500">{activity.timestamp}</span>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No recent activity.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
