// src/pages/Projects.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard'; // Assuming this component exists and handles project display
import { useProjects } from '../context/ProjectsContext';
import { ProjectsIcon } from '../components/Icons'; // Import icon

const Projects = () => {
  const { projects: allProjects, loading, error, fetchProjects } = useProjects();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterAssignee, setFilterAssignee] = useState('All'); // This will need backend integration for user list
  const [filterCreatedAt, setFilterCreatedAt] = useState('All');

  useEffect(() => {
    // Fetch projects when the component mounts or dependencies change
    // ProjectsContext already handles initial fetch based on auth, but explicit call ensures fresh data
    fetchProjects();
  }, [fetchProjects]);

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = allProjects.filter(project => {
      const projectTitle = project?.title || '';
      const projectDescription = project?.description || '';

      const matchesSearch = projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            projectDescription.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'All' || project?.status === filterStatus;

      // This part needs actual user IDs from backend for filtering by assignee
      // For now, it will filter by the _id of the member if filterAssignee is an ID
      const matchesAssignee = filterAssignee === 'All' ||
                              (project?.teamMembers && project.teamMembers.some(member => member._id === filterAssignee));

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
      const aTitle = a?.title || '';
      const bTitle = b?.title || '';

      if (sortOrder === 'newest') {
        return new Date(b?.createdAt) - new Date(a?.createdAt);
      } else if (sortOrder === 'oldest') {
        return new Date(a?.createdAt) - new Date(b?.createdAt);
      } else if (sortOrder === 'alpha') {
        return aTitle.localeCompare(bTitle);
      } else if (sortOrder === 'total-issues') {
        // Assuming totalIssues is available on the project object (from backend)
        return (b?.totalIssues || 0) - (a?.totalIssues || 0);
      }
      return 0;
    });

    return filtered;
  }, [allProjects, searchTerm, sortOrder, filterStatus, filterAssignee, filterCreatedAt]);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8 bg-[#f9fafb] flex justify-center items-center h-full">
        <p className="text-xl text-gray-700">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-8 bg-[#f9fafb] flex justify-center items-center h-full text-red-600">
        <p className="text-xl">Error loading projects: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8 bg-[#f9fafb]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-700 text-3xl font-medium flex items-center">
          <ProjectsIcon className="mr-2 text-indigo-500" />
          Projects
        </h3>
        <Link
          to="/create-project"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
        >
          Create New Project
        </Link>
      </div>
      {/* Search and Filter/Sort Controls - Add these if you want to make them functional */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="search" className="sr-only">Search Projects</label>
          <input
            type="text"
            id="search"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="filterStatus" className="sr-only">Filter by Status</label>
          <select
            id="filterStatus"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="All">All Statuses</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
          </select>
        </div>
        <div>
          <label htmlFor="sortOrder" className="sr-only">Sort By</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="alpha">Alphabetical</option>
            <option value="total-issues">Total Issues</option>
          </select>
        </div>
        {/* You can add filterAssignee and filterCreatedAt dropdowns here if needed */}
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedProjects.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-8">No projects found matching your criteria.</div>
        ) : (
          filteredAndSortedProjects.map((project) => (
            // Ensure ProjectCard can handle project data from backend (e.g., project._id)
            <ProjectCard key={project._id} project={project} />
          ))
        )}
      </div>
    </div>
  );
};

export default Projects;
