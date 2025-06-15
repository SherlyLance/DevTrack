import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PieController } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PieController);

const Reports = () => {
  const [filterProject, setFilterProject] = useState('All');
  const [filterAssignee, setFilterAssignee] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  // Placeholder Data for reports
  const issues = [
    { id: 1, status: 'Resolved', comments: 5, developer: 'John Doe', project: 'Project A' },
    { id: 2, status: 'Unresolved', comments: 2, developer: 'Jane Smith', project: 'Project B' },
    { id: 3, status: 'Resolved', comments: 10, developer: 'John Doe', project: 'Project A' },
    { id: 4, status: 'Unresolved', comments: 1, developer: 'Peter Jones', project: 'Project C' },
    { id: 5, status: 'Resolved', comments: 3, developer: 'Jane Smith', project: 'Project B' },
    { id: 6, status: 'Resolved', comments: 7, developer: 'John Doe', project: 'Project A' },
    { id: 7, status: 'Unresolved', comments: 4, developer: 'Jane Smith', project: 'Project A' },
    { id: 8, status: 'Resolved', comments: 6, developer: 'Peter Jones', project: 'Project B' },
  ];

  // Chart Colors (consistent with Dashboard.jsx)
  const chartColors = {
    toDo: '#3B82F6',
    inProgress: '#F59E0B',
    done: '#10B981',
    bug: '#EF4444',
    feature: '#6366F1',
    task: '#64748B',
    others: '#06B6D4',
    resolved: '#10B981', // Emerald Green
    unresolved: '#EF4444', // Rose/Red
  };

  // Filtered issues based on state
  const filteredIssues = issues.filter(issue => {
    const matchesProject = filterProject === 'All' || issue.project === filterProject;
    const matchesAssignee = filterAssignee === 'All' || issue.developer === filterAssignee;
    const matchesStatus = filterStatus === 'All' || issue.status === filterStatus;
    return matchesProject && matchesAssignee && matchesStatus;
  });

  // Data for Resolved vs Unresolved Issues Chart
  const resolvedCount = filteredIssues.filter(issue => issue.status === 'Resolved').length;
  const unresolvedCount = filteredIssues.filter(issue => issue.status === 'Unresolved').length;
  const resolvedUnresolvedData = {
    labels: ['Resolved', 'Unresolved'],
    datasets: [
      {
        data: [resolvedCount, unresolvedCount],
        backgroundColor: [chartColors.resolved, chartColors.unresolved],
        borderColor: [chartColors.resolved, chartColors.unresolved],
        borderWidth: 1,
      },
    ],
  };

  // Data for Comments per Ticket (Average/Distribution - simplified for bar chart)
  const commentsData = {
    labels: filteredIssues.map(issue => `Issue ${issue.id}`),
    datasets: [
      {
        label: 'Comments',
        data: filteredIssues.map(issue => issue.comments),
        backgroundColor: chartColors.toDo,
        borderColor: chartColors.toDo,
        borderWidth: 1,
      },
    ],
  };

  // Data for Tickets per Developer
  const ticketsPerDeveloper = filteredIssues.reduce((acc, issue) => {
    acc[issue.developer] = (acc[issue.developer] || 0) + 1;
    return acc;
  }, {});
  const ticketsPerDeveloperData = {
    labels: Object.keys(ticketsPerDeveloper),
    datasets: [
      {
        label: 'Tickets Assigned',
        data: Object.values(ticketsPerDeveloper),
        backgroundColor: chartColors.feature,
        borderColor: chartColors.feature,
        borderWidth: 1,
      },
    ],
  };

  // Unique values for filters
  const uniqueProjects = [...new Set(issues.map(issue => issue.project))];
  const uniqueAssignees = [...new Set(issues.map(issue => issue.developer))];
  const uniqueStatuses = [...new Set(issues.map(issue => issue.status))];

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#111827',
        bodyColor: '#374151',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw}`;
          }
        }
      },
    },
  };

  const handleDownloadReport = () => {
    // Placeholder for report generation logic
    alert('Generating report... (This is a placeholder action)');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Reports & Analytics</h1>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Filter Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={filterProject}
              onChange={(e) => setFilterProject(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="All">All Projects</option>
              {uniqueProjects.map(project => <option key={project}>{project}</option>)}
            </select>
            <select
              value={filterAssignee}
              onChange={(e) => setFilterAssignee(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="All">All Assignees</option>
              {uniqueAssignees.map(assignee => <option key={assignee}>{assignee}</option>)}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="All">All Statuses</option>
              {uniqueStatuses.map(status => <option key={status}>{status}</option>)}
            </select>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleDownloadReport}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
              Download Report
            </button>
          </div>
        </div>

        {/* Visual Summaries */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Resolved vs. Unresolved Issues</h2>
            <div className="h-64 flex items-center justify-center">
              {resolvedCount > 0 || unresolvedCount > 0 ? (
                <Pie data={resolvedUnresolvedData} options={chartOptions} />
              ) : (
                <p className="text-gray-500">No data available for this filter.</p>
              )}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Tickets per Developer</h2>
            <div className="h-64 flex items-center justify-center">
              {Object.keys(ticketsPerDeveloper).length > 0 ? (
                <Bar data={ticketsPerDeveloperData} options={chartOptions} />
              ) : (
                <p className="text-gray-500">No data available for this filter.</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100 hover:shadow-md transition-all duration-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Comments per Ticket</h2>
          <div className="h-64 flex items-center justify-center">
            {filteredIssues.length > 0 ? (
              <Bar data={commentsData} options={chartOptions} />
            ) : (
              <p className="text-gray-500">No data available for this filter.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
