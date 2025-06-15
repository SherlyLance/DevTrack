import React, { createContext, useContext, useState } from 'react';

const IssuesContext = createContext();

export const useIssues = () => {
  const context = useContext(IssuesContext);
  if (!context) {
    throw new Error('useIssues must be used within an IssuesProvider');
  }
  return context;
};

export const IssuesProvider = ({ children }) => {
  const [issues, setIssues] = useState([
    { 
      id: 'issue-1', 
      title: 'Bug: Login not working', 
      description: 'Users cannot log in to the application.', 
      status: 'to-do', 
      priority: 'High', 
      assignee: 'John Doe', 
      dueDate: '2023-04-25', 
      project: 'Login App', 
      labels: ['Bug', 'Frontend'] 
    },
    { 
      id: 'issue-2', 
      title: 'Feature: Implement user profiles', 
      description: 'Allow users to create and manage their profiles.', 
      status: 'in-progress', 
      priority: 'Medium', 
      assignee: 'Jane Smith', 
      dueDate: '2023-04-28', 
      project: 'E-commerce', 
      labels: ['Feature', 'Backend'] 
    },
    { 
      id: 'issue-3', 
      title: 'Task: Update documentation', 
      description: 'Review and update existing documentation.', 
      status: 'done', 
      priority: 'Low', 
      assignee: 'Peter Jones', 
      dueDate: '2023-04-20', 
      project: 'Login App', 
      labels: ['Documentation', 'Task'] 
    },
    { 
      id: 'issue-4', 
      title: 'Bug: Dashboard chart not loading', 
      description: 'Chart on dashboard fails to render.', 
      status: 'to-do', 
      priority: 'High', 
      assignee: 'John Doe', 
      dueDate: '2023-04-26', 
      project: 'E-commerce', 
      labels: ['Bug', 'UI'] 
    },
  ]);

  const addIssue = (newIssue) => {
    const issue = {
      ...newIssue,
      id: `issue-${Date.now()}`,
      status: 'to-do',
      labels: newIssue.labels || [],
    };
    setIssues(prevIssues => [...prevIssues, issue]);
  };

  const updateIssue = (updatedIssue) => {
    setIssues(prevIssues =>
      prevIssues.map(issue =>
        issue.id === updatedIssue.id ? updatedIssue : issue
      )
    );
  };

  const deleteIssue = (issueId) => {
    setIssues(prevIssues =>
      prevIssues.filter(issue => issue.id !== issueId)
    );
  };

  return (
    <IssuesContext.Provider value={{ issues, addIssue, updateIssue, deleteIssue }}>
      {children}
    </IssuesContext.Provider>
  );
};

export default IssuesContext; 