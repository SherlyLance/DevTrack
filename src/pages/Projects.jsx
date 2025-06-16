import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useProjects } from '../context/ProjectsContext';

const Projects = () => {
  const { projects: allProjects } = useProjects();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest', 'oldest', 'alpha', 'total-issues'
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterAssignee, setFilterAssignee] = useState('All');
  const [filterCreatedAt, setFilterCreatedAt] = useState('All'); // 'All', 'last-month', 'last-3-months', 'last-year'

  const uniqueAssignees = useMemo(() => {
    const assignees = new Set();
    allProjects.forEach(project => {
      // Ensure project and project.members exist before iterating
      if (project && project.members) {
        // Add member.id to the set for unique assignees
        project.members.forEach(member => assignees.add(member.id));
      }
    });
    // Map the IDs back to the full user objects from a central list (e.g., mockUsers in CreateProjectPage)
    // For this example, we'll construct mock user objects if not found directly.
    const uniqueIds = Array.from(assignees);
    return uniqueIds.map(id => {
      // Find the user object by ID from a master list (e.g., the mockUsers from CreateProjectPage)
      // This is a simplified approach. In a real app, you'd fetch a list of all users.
      // For now, let's assume the member objects we put in `allProjects` are the source.
      // We need to flatten `allProjects` members to find the full user object.
      const foundMember = allProjects.flatMap(p => p.members).find(m => m.id === id);
      return foundMember || { id, name: `Unknown User ${id}` }; // Fallback for safety
    }).sort((a, b) => (a.name || '').localeCompare(b.name || ''));

  }, [allProjects]);

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = allProjects.filter(project => {
      // Add defensive checks for project.title and project.description
      const projectTitle = project?.title || '';
      const projectDescription = project?.description || '';

      const matchesSearch = projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            projectDescription.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'All' || project?.status === filterStatus;
      // Correctly check if the project has the filtered assignee by ID
      const matchesAssignee = filterAssignee === 'All' || (project?.members && project.members.some(member => member.id === filterAssignee));

      const projectDate = new Date(project?.createdAt);
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
      // Add defensive checks for a.title and b.title
      const aTitle = a?.title || '';
      const bTitle = b?.title || '';

      if (sortOrder === 'newest') {
        return new Date(b?.createdAt) - new Date(a?.createdAt);
      } else if (sortOrder === 'oldest') {
        return new Date(a?.createdAt) - new Date(b?.createdAt);
      } else if (sortOrder === 'alpha') {
        return aTitle.localeCompare(bTitle);
      } else if (sortOrder === 'total-issues') {
        return (b?.totalIssues || 0) - (a?.totalIssues || 0);
      }
      return 0;
    });

    return filtered;
  }, [allProjects, searchTerm, sortOrder, filterStatus, filterAssignee, filterCreatedAt]);

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
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          {/* Search Box */}
          <div className="flex-1">
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
          <div className="flex flex-wrap flex-nowrap gap-4 justify-end">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base bg-white w-auto flex-grow"
            >
              <option value="All">Status</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>

            <select
              value={filterAssignee}
              onChange={(e) => setFilterAssignee(e.target.value)}
              className="px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base bg-white w-auto flex-grow"
            >
              <option value="All">Assignee</option>
              {uniqueAssignees.map(assignee => (
                <option key={assignee.id} value={assignee.id}>{assignee.name}</option>
              ))}
            </select>

            <select
              value={filterCreatedAt}
              onChange={(e) => setFilterCreatedAt(e.target.value)}
              className="px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base bg-white w-auto flex-grow"
            >
              <option value="All">Date</option>
              <option value="last-month">Last Month</option>
              <option value="last-3-months">Last 3 Months</option>
              <option value="last-year">Last Year</option>
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base bg-white w-auto flex-grow"
            >
              <option value="newest">Sort</option>
              <option value="oldest">Oldest First</option>
              <option value="alpha">Name (A-Z)</option>
              <option value="total-issues">Total Issues</option>
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
