import React from 'react';

const ProjectSelector = () => {
  // Placeholder for project selection logic
  const projects = [
    { id: 1, name: 'All Projects' },
    { id: 2, name: 'DevTrack Backend' },
    { id: 3, name: 'DevTrack Frontend' },
  ];

  const [selectedProject, setSelectedProject] = React.useState(projects[0].id);

  const handleChange = (event) => {
    setSelectedProject(event.target.value);
    // TODO: Implement logic to filter content based on selected project
  };

  return (
    <div className="relative">
      <select
        id="project-selector"
        name="project-selector"
        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        value={selectedProject}
        onChange={handleChange}
      >
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProjectSelector;
