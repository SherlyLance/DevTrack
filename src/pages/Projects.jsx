import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest', 'oldest', 'alpha', 'total-issues'
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterAssignee, setFilterAssignee] = useState('All');
  const [filterCreatedAt, setFilterCreatedAt] = useState('All'); // 'All', 'last-month', 'last-3-months', 'last-year'

  const projects = [
    { id: 1, title: 'DevTrack Backend', description: 'Backend API for the bug tracker', status: 'In Progress', members: ['Alice', 'Bob', 'Charlie'], createdAt: '2023-01-15', totalIssues: 50, bugs: 10, features: 20, tasks: 20, todo: 15, inProgress: 20, done: 15 },
    { id: 2, title: 'DevTrack Frontend', description: 'Frontend UI for the bug tracker', status: 'To Do', members: ['Charlie', 'David', 'Alice'], createdAt: '2023-02-01', totalIssues: 40, bugs: 5, features: 15, tasks: 20, todo: 10, inProgress: 15, done: 15 },
    { id: 3, title: 'Mobile App Integration', description: 'Integrate with mobile application', status: 'Done', members: ['Eve', 'Bob'], createdAt: '2023-03-10', totalIssues: 30, bugs: 2, features: 10, tasks: 18, todo: 0, inProgress: 0, done: 30 },
    { id: 4, title: 'Database Optimization', description: 'Optimize database queries for performance', status: 'In Progress', members: ['Alice'], createdAt: '2023-04-05', totalIssues: 25, bugs: 3, features: 10, tasks: 12, todo: 5, inProgress: 10, done: 10 },
    { id: 5, title: 'User Authentication Module', description: 'Develop and integrate user authentication', status: 'To Do', members: ['David'], createdAt: '2023-04-20', totalIssues: 35, bugs: 8, features: 15, tasks: 12, todo: 15, inProgress: 10, done: 10 },
  ];

  const uniqueAssignees = useMemo(() => {
    const assignees = new Set();
    projects.forEach(project => {
      project.members.forEach(member => assignees.add(member));
    });
    return Array.from(assignees).sort();
  }, [projects]);

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'All' || project.status === filterStatus;
      const matchesAssignee = filterAssignee === 'All' || project.members.includes(filterAssignee);

      const projectDate = new Date(project.createdAt);
      const now = new Date();
      let matchesCreatedAt = true;
      if (filterCreatedAt === 'last-month') {
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        matchesCreatedAt = projectDate >= lastMonth;
      } else if (filterCreatedAt === 'last-3-months') {
        const last3Months = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
        matchesCreatedAt = projectDate >= last3Months;
      } else if (filterCreatedAt === 'last-year') {
        const lastYear = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        matchesCreatedAt = projectDate >= lastYear;
      }

      return matchesSearch && matchesStatus && matchesAssignee && matchesCreatedAt;
    });

    // Sorting
    filtered.sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortOrder === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortOrder === 'alpha') {
        return a.title.localeCompare(b.title);
      } else if (sortOrder === 'total-issues') {
        return b.totalIssues - a.totalIssues;
      }
      return 0;
    });

    return filtered;
  }, [projects, searchTerm, sortOrder, filterStatus, filterAssignee, filterCreatedAt]);

  return (
    <div className="container mx-auto px-6 py-8 bg-[#f9fafb]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-700 text-3xl font-medium">Projects</h3>
        <Link
          to="/create-project"
          className="px-4 py-2 bg-accent-[#3b82f6] text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
        >
          Create New Project
        </Link>
      </div>

      {/* Search, Filter, and Sort Bar */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Search Box */}
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border-2 border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base bg-white"
            >
              <option value="All">Status: All</option>
              <option value="To Do">Status: To Do</option>
              <option value="In Progress">Status: In Progress</option>
              <option value="Done">Status: Done</option>
            </select>

            <select
              value={filterAssignee}
              onChange={(e) => setFilterAssignee(e.target.value)}
              className="px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base bg-white"
            >
              <option value="All">Assignee: All</option>
              {uniqueAssignees.map(assignee => (
                <option key={assignee} value={assignee}>Assignee: {assignee}</option>
              ))}
            </select>

            <select
              value={filterCreatedAt}
              onChange={(e) => setFilterCreatedAt(e.target.value)}
              className="px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base bg-white"
            >
              <option value="All">Date: All Time</option>
              <option value="last-month">Date: Last Month</option>
              <option value="last-3-months">Date: Last 3 Months</option>
              <option value="last-year">Date: Last Year</option>
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base bg-white"
            >
              <option value="newest">Sort: Newest</option>
              <option value="oldest">Sort: Oldest</option>
              <option value="alpha">Sort: Name A-Z</option>
              <option value="total-issues">Sort: Total Issues</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
