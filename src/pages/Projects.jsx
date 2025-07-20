import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import { useProjects } from '../context/ProjectsContext';

const Projects = () => {
  const { projects: allProjects } = useProjects();
  const [searchTerm] = useState('');
  const [sortOrder] = useState('newest');
  const [filterStatus] = useState('All');
  const [filterAssignee] = useState('All');
  const [filterCreatedAt] = useState('All');

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
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
        >
          Create New Project
        </Link>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedProjects.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-8">No projects found.</div>
        ) : (
          filteredAndSortedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        )}
      </div>
    </div>
  );
};

export default Projects;
