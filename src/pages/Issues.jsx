// src/pages/Issues.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useIssues } from '../context/IssuesContext'; // Re-enabled for issue data
import { IssuesIcon, PlusIcon } from '../components/Icons'; // Import necessary icons
import { useProjects } from '../context/ProjectsContext'; // To get project names for filter

const Issues = () => {
  const { issues, loading, error, fetchIssues } = useIssues(); // Get issues from context
  const { projects: allProjects, loading: projectsLoading } = useProjects(); // Get projects for filter options

  // State for filters and search
  const [searchTerm, setSearchTerm] = useState('');
  const [projectFilter, setProjectFilter] = useState('All Projects');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [assigneeFilter, setAssigneeFilter] = useState('All');
  const [reporterFilter, setReporterFilter] = useState('All');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');
  const [tagsFilter, setTagsFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Newest First');

  // Derived state for filter options (to be populated dynamically)
  const [projectOptions, setProjectOptions] = useState(['All Projects']);
  const [assigneeOptions, setAssigneeOptions] = useState(['All', 'Unassigned']);
  const [reporterOptions, setReporterOptions] = useState(['All']);
  const [tagOptions, setTagOptions] = useState(['All']);

  useEffect(() => {
    fetchIssues(); // Ensure issues are fetched when component mounts
  }, [fetchIssues]);

  useEffect(() => {
    // Dynamically populate filter options from issues and projects data
    if (issues.length > 0) {
      const uniqueProjectIds = [...new Set(issues.map(issue => issue.projectId).filter(Boolean))];
      const projectNames = uniqueProjectIds.map(id => {
        const project = allProjects.find(p => p._id === id);
        return project ? project.title : null;
      }).filter(Boolean);
      setProjectOptions(['All Projects', ...projectNames]);

      const uniqueAssignees = [...new Set(issues.map(issue => issue.assignee?.name).filter(Boolean))]; // Assuming assignee is populated
      setAssigneeOptions(['All', 'Unassigned', ...uniqueAssignees]);

      const uniqueReporters = [...new Set(issues.map(issue => issue.reporter?.name).filter(Boolean))]; // Assuming reporter is populated
      setReporterOptions(['All', ...uniqueReporters]);

      const uniqueTags = [...new Set(issues.flatMap(issue => issue.tags || []).filter(Boolean))];
      setTagOptions(['All', ...uniqueTags]);
    }
  }, [issues, allProjects]);


  // Filtering logic
  const filteredIssues = useMemo(() => {
    return issues.filter(issue => {
      const matchesSearchTerm = searchTerm === '' ||
        (issue.title && issue.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (issue.description && issue.description.toLowerCase().includes(searchTerm.toLowerCase()));

      const issueProjectName = allProjects.find(p => p._id === issue.projectId)?.title;
      const matchesProject = projectFilter === 'All Projects' || (issueProjectName === projectFilter);

      const matchesStatus = statusFilter === 'All' || (issue.status && issue.status.toLowerCase() === statusFilter.toLowerCase());

      const matchesPriority = priorityFilter === 'All' || (issue.priority && issue.priority.toLowerCase() === priorityFilter.toLowerCase());

      const matchesAssignee = assigneeFilter === 'All' ||
        (assigneeFilter === 'Unassigned' && (!issue.assignee || !issue.assignee.name)) ||
        (issue.assignee?.name === assigneeFilter); // Match by assignee name

      const matchesReporter = reporterFilter === 'All' || (issue.reporter?.name === reporterFilter);

      const matchesTags = tagsFilter === 'All' || (issue.tags && issue.tags.includes(tagsFilter));

      const issueCreatedAt = issue.createdAt ? new Date(issue.createdAt) : null;

      const matchesStartDate = !startDateFilter || (issueCreatedAt && issueCreatedAt >= new Date(startDateFilter));
      const matchesEndDate = !endDateFilter || (issueCreatedAt && issueCreatedAt <= new Date(endDateFilter));

      return matchesSearchTerm && matchesProject && matchesStatus && matchesPriority &&
             matchesAssignee && matchesReporter && matchesTags && matchesStartDate && matchesEndDate;
    });
  }, [issues, searchTerm, projectFilter, statusFilter, priorityFilter, assigneeFilter, reporterFilter, startDateFilter, endDateFilter, tagsFilter, allProjects]);

  // Sorting logic
  const sortedIssues = useMemo(() => {
    return [...filteredIssues].sort((a, b) => {
      if (sortBy === 'Newest First') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === 'Oldest First') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortBy === 'Priority: High to Low') {
        const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
        return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
      } else if (sortBy === 'Status') {
        // Define a custom order for statuses if needed, otherwise alphabetical
        const statusOrder = { 'to-do': 1, 'in-progress': 2, 'done': 3 };
        return (statusOrder[a.status] || 0) - (statusOrder[b.status] || 0) || a.status.localeCompare(b.status);
      }
      return 0; // No sorting applied if sortBy is not recognized
    });
  }, [filteredIssues, sortBy]);

  // Format issues for Kanban board
  const columns = {
    'To Do': {
      id: 'To Do',
      title: 'To Do',
      tasks: sortedIssues.filter(issue => issue.status === 'To Do'),
    },
    'In Progress': {
      id: 'In Progress',
      title: 'In Progress',
      tasks: sortedIssues.filter(issue => issue.status === 'In Progress'),
    },
    'Done': {
      id: 'Done',
      title: 'Done',
      tasks: sortedIssues.filter(issue => issue.status === 'Done'),
    },
  };

  if (loading || projectsLoading) {
    return (
      <div className="container mx-auto p-8 bg-[#f9fafb] min-h-screen flex justify-center items-center">
        <p className="text-xl text-gray-700">Loading issues...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8 bg-[#f9fafb] min-h-screen flex justify-center items-center text-red-600">
        <p className="text-xl">Error loading issues: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 bg-[#f9fafb] min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <IssuesIcon className="mr-3 text-indigo-500" />
          Issues
        </h1>
        <Link
          to="/create-issue"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Create New Issue
        </Link>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-x-4 gap-y-6 items-end">
          {/* Search Input */}
          <div className="relative col-span-full xl:col-span-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input
              type="text"
              placeholder="Search issues..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Project Filter */}
          <div className="relative">
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-200 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
            >
              <option value="All Projects">Project</option>
              {projectOptions.slice(1).map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-200 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>

          {/* Priority Filter */}
          <div className="relative">
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-200 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="All">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>

          {/* Assignee Filter */}
          <div className="relative">
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-200 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
              value={assigneeFilter}
              onChange={(e) => setAssigneeFilter(e.target.value)}
            >
              <option value="All">Assigned To</option>
              {assigneeOptions.slice(1).map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>

          {/* Reporter Filter */}
          <div className="relative">
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
              value={reporterFilter}
              onChange={(e) => setReporterFilter(e.target.value)}
            >
              <option value="All">Reported By</option>
              {reporterOptions.slice(1).map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>

          {/* Date Created / Due Date Filter */}
          <div className="col-span-full xl:col-span-2 flex flex-col justify-end">
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Date Created / Due Date</label>
            <div className="flex space-x-2">
              <div className="relative w-1/2">
                <input
                  type="date" // Changed to type="date" for native date picker
                  id="startDate"
                  className="block w-full pl-3 pr-3 py-2 border border-gray-200 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="dd-mm-yyyy"
                  value={startDateFilter}
                  onChange={(e) => setStartDateFilter(e.target.value)}
                />
              </div>
              <div className="relative w-1/2">
                <input
                  type="date" // Changed to type="date"
                  id="endDate"
                  className="block w-full pl-3 pr-3 py-2 border border-gray-200 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="dd-mm-yyyy"
                  value={endDateFilter}
                  onChange={(e) => setEndDateFilter(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Tags / Labels Filter */}
          <div className="relative">
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-200 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
              value={tagsFilter}
              onChange={(e) => setTagsFilter(e.target.value)}
            >
              <option value="All">Tags</option>
              {tagOptions.slice(1).map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>

          {/* Sort By Filter */}
          <div className="relative">
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-200 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="Newest First">Newest First</option>
              <option value="Oldest First">Oldest First</option>
              <option value="Priority: High to Low">Priority: High to Low</option>
              <option value="Status">Status</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>

        </div>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.keys(columns).map(columnKey => (
          <div key={columnKey} className="flex flex-col bg-gray-100 rounded-xl shadow-sm p-4 h-full border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{columns[columnKey].title} ({columns[columnKey].tasks.length})</h2>
            <div className="flex-1 space-y-4">
              {columns[columnKey].tasks.length > 0 ? (
                columns[columnKey].tasks.map(task => (
                  <Link to={`/issues/${task._id}`} key={task._id} className="block bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer">
                    <h4 className="font-medium text-gray-800">{task.title}</h4>
                    <p className="text-sm text-gray-600">Project: {allProjects.find(p => p._id === task.projectId)?.title || 'N/A'}</p>
                    <p className="text-sm text-gray-600">Assignee: {task.assignee?.name || 'Unassigned'}</p>
                    <span className={`mt-2 px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      task.priority === 'High' ? 'bg-red-100 text-red-800' :
                      task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.priority}
                    </span>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No issues in this column.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Issues;
