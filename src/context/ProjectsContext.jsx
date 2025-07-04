import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

const ProjectsContext = createContext(null);

export const useProjects = () => {
  return useContext(ProjectsContext);
};

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([
    { id: 1, title: 'DevTrack Backend', description: 'Backend API for the bug tracker', status: 'In Progress', members: ['Alice', 'Bob', 'Charlie'], createdAt: '2023-01-15', totalIssues: 50, bugs: 10, features: 20, tasks: 20, todo: 15, inProgress: 20, done: 15 },
    { id: 2, title: 'DevTrack Frontend', description: 'Frontend UI for the bug tracker', status: 'To Do', members: ['Charlie', 'David', 'Alice'], createdAt: '2023-02-01', totalIssues: 40, bugs: 5, features: 15, tasks: 20, todo: 10, inProgress: 15, done: 15 },
    { id: 3, title: 'Mobile App Integration', description: 'Integrate with mobile application', status: 'Done', members: ['Eve', 'Bob'], createdAt: '2023-03-10', totalIssues: 30, bugs: 2, features: 10, tasks: 18, todo: 0, inProgress: 0, done: 30 },
    { id: 4, title: 'Database Optimization', description: 'Optimize database queries for performance', status: 'In Progress', members: ['Alice'], createdAt: '2023-04-05', totalIssues: 25, bugs: 3, features: 10, tasks: 12, todo: 5, inProgress: 10, done: 10 },
    { id: 5, title: 'User Authentication Module', description: 'Develop and integrate user authentication', status: 'To Do', members: ['David'], createdAt: '2023-04-20', totalIssues: 35, bugs: 8, features: 15, tasks: 12, todo: 15, inProgress: 10, done: 10 },
  ]);

  const addProject = (newProject) => {
    const id = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    const projectToStore = {
      id,
      title: newProject.name,
      description: newProject.description,
      startDate: newProject.startDate,
      endDate: newProject.endDate,
      status: newProject.status,
      members: newProject.members,
      createdAt: new Date().toISOString().slice(0, 10),
      totalIssues: 0,
      bugs: 0,
      features: 0,
      tasks: 0,
      todo: 0,
      inProgress: 0,
      done: 0,
    };
    setProjects((prevProjects) => [...prevProjects, projectToStore]);
    toast.success(`Project '${projectToStore.title}' created successfully!`);
  };

  const value = {
    projects,
    addProject,
  };

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>;
}; 