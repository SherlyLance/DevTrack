// src/pages/Reports.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PieController } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { ReportsIcon } from '../components/Icons'; // Import ReportsIcon
import { useIssues } from '../context/IssuesContext'; // Import useIssues
import { useProjects } from '../context/ProjectsContext'; // Import useProjects to get project names

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PieController);

const Reports = () => {
  const { issues, loading: issuesLoading, error: issuesError, fetchIssues } = useIssues();
  const { projects, loading: projectsLoading, error: projectsError } = useProjects();

  const [filterProject, setFilterProject] = useState('All');
  const [filterAssignee, setFilterAssignee] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    fetchIssues(); // Ensure issues are fetched
  }, [fetchIssues]);

  // Chart Colors (consistent with Dashboard.jsx)
  const chartColors = {
    toDo: '#3B82F6', // Blue
    inProgress: '#F59E0B', // Amber
    done: '#10B981', // Emerald Green
    bug: '#EF4444', // Red
    feature: '#6366F1', // Indigo
    task: '#64748B', // Slate
    others: '#06B6D4', // Cyan
    resolved: '#10B981', // Emerald Green
    unresolved: '#EF4444', // Rose/Red
  };

  // Memoize filtered issues for performance
  const filteredIssues = useMemo(() => {
    return issues.filter(issue => {
      const matchesProject = filterProject === 'All' || issue.projectId === filterProject;
      const matchesAssignee = filterAssignee === 'All' || issue.assignee?._id === filterAssignee; // Match by assignee ID
      const matchesStatus = filterStatus === 'All' || issue.status === filterStatus;
      return matchesProject && matchesAssignee && matchesStatus;
    });
  }, [issues, filterProject, filterAssignee, filterStatus]);

  // Data for Resolved vs Unresolved Issues Chart
  const resolvedCount = filteredIssues.filter(issue => issue.status === 'Done').length; // Assuming 'Done' means resolved
  const unresolvedCount = filteredIssues.filter(issue => issue.status !== 'Done').length;
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
  // This would require fetching comments for each ticket or having a comment count on the issue object
  // For now, let's just create a mock for demonstration or assume 'comments' field exists
  const commentsData = {
    labels: filteredIssues.map(issue => issue.title), // Use issue title as label
    datasets: [
      {
        label: 'Comments Count',
        data: filteredIssues.map(issue => issue.comments ? issue.comments.length : 0), // Assuming issue.comments is an array
        backgroundColor: chartColors.toDo,
        borderColor: chartColors.toDo,
        borderWidth: 1,
      },
    ],
  };

  // Data for Tickets per Developer
  const ticketsPerDeveloper = filteredIssues.reduce((acc, issue) => {
    if (issue.assignee && issue.assignee.name) { // Ensure assignee is populated and has a name
      acc[issue.assignee.name] = (acc[issue.assignee.name] || 0) + 1;
    }
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

  // Unique values for filters (from fetched data)
  const uniqueProjects = useMemo(() => ['All', ...new Set(projects.map(p => p._id))], [projects]);
  const uniqueProjectNames = useMemo(() => ['All', ...new Set(projects.map(p => p.title))], [projects]);
  const uniqueAssignees = useMemo(() => {
    const assignees = issues.map(issue => issue.assignee).filter(Boolean);
    const uniqueIds = [...new Set(assignees.map(a => a._id))];
    return ['All', ...uniqueIds];
  }, [issues]);

  const uniqueAssigneeNames = useMemo(() => {
    const assignees = issues.map(issue => issue.assignee).filter(Boolean);
    const uniqueNames = [...new Set(assignees.map(a => a.name))];
    return ['All', ...uniqueNames];
  }, [issues]);


  const uniqueStatuses = useMemo(() => ['All', ...new Set(issues.map(issue => issue.status))], [issues]);

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
    scales: { // Add scales configuration for bar charts
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleDownloadReport = () => {
    alert('Generating report... (Backend integration for actual report generation needed)');
  };

  if (issuesLoading || projectsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <p className="text-xl text-gray-700">Loading reports data...</p>
      </div>
    );
  }

  if (issuesError || projectsError) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center text-red-600">
        <p className="text-xl">Error loading reports: {issuesError || projectsError}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
          <ReportsIcon className="mr-3 text-indigo-500" />
          Reports & Analytics
        </h1>

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
              {uniqueProjects.slice(1).map((id) => {
                const project = projects.find(p => p._id === id);
                return project ? <option key={id} value={id}>{project.title}</option> : null;
              })}
            </select>
            <select
              value={filterAssignee}
              onChange={(e) => setFilterAssignee(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="All">All Assignees</option>
              {uniqueAssignees.slice(1).map((id) => {
                const assignee = issues.find(issue => issue.assignee?._id === id)?.assignee;
                return assignee ? <option key={id} value={id}>{assignee.name}</option> : null;
              })}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="All">All Statuses</option>
              {uniqueStatuses.slice(1).map(status => <option key={status}>{status}</option>)}
            </select>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleDownloadReport}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
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
