// src/pages/CreateIssuePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CreateProjectIcon } from '../components/Icons'; // Reusing CreateProjectIcon as a generic "Add" icon for issues
import { useIssues } from '../context/IssuesContext'; // Import useIssues
import { useProjects } from '../context/ProjectsContext'; // Import useProjects to get project list for dropdown

const CreateIssuePage = () => {
  const navigate = useNavigate();
  const location = useLocation(); // To get projectId from URL query params
  const { createIssue } = useIssues();
  const { projects, loading: projectsLoading, error: projectsError } = useProjects();

  // Extract projectId from URL query params if available (e.g., /create-issue?projectId=xyz)
  const queryParams = new URLSearchParams(location.search);
  const initialProjectId = queryParams.get('projectId') || '';

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      projectId: initialProjectId, // Pre-fill if coming from project details
      type: 'Bug',
      status: 'To Do',
      priority: 'Medium',
      assignee: '', // Will be user ID
      reporter: '', // Will be user ID, could default to current user
      dueDate: '',
      tags: '', // Comma-separated string
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Issue title is required'),
      description: Yup.string().required('Description is required'),
      projectId: Yup.string().required('Project is required'),
      type: Yup.string().oneOf(['Bug', 'Feature', 'Task']).required('Type is required'),
      status: Yup.string().oneOf(['To Do', 'In Progress', 'Done']).required('Status is required'),
      priority: Yup.string().oneOf(['High', 'Medium', 'Low']).required('Priority is required'),
      assignee: Yup.string().required('Assignee is required'), // Assuming assignee is mandatory
      reporter: Yup.string().required('Reporter is required'), // Assuming reporter is mandatory
      dueDate: Yup.date().nullable(),
      tags: Yup.string().nullable(),
    }),
    onSubmit: async (values) => {
      // Prepare data for backend
      const issueDataToSend = {
        title: values.title,
        description: values.description,
        projectId: values.projectId,
        type: values.type,
        status: values.status,
        priority: values.priority,
        assignee: values.assignee, // This should be a user ID from your backend
        reporter: values.reporter, // This should be a user ID from your backend
        dueDate: values.dueDate || null, // Send null if empty
        tags: values.tags ? values.tags.split(',').map(tag => tag.trim()) : [], // Convert comma-separated string to array
      };

      const result = await createIssue(issueDataToSend);
      if (result.success) {
        navigate('/issues'); // Navigate back to issues list on success
      }
      // Toast messages are handled by IssuesContext
    },
  });

  // Mock users for assignee/reporter dropdowns (replace with actual users from backend)
  const mockUsers = [
    { _id: 'user1', name: 'Alice Smith' },
    { _id: 'user2', name: 'Bob Johnson' },
    { _id: 'user3', name: 'Charlie Brown' },
    { _id: 'user4', name: 'David Lee' },
  ];

  if (projectsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <p className="text-xl text-gray-700">Loading projects for issue creation...</p>
      </div>
    );
  }

  if (projectsError) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center text-red-600">
        <p className="text-xl">Error loading projects: {projectsError}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
          <CreateProjectIcon className="mr-3 text-indigo-500" /> {/* Reusing icon */}
          Create New Issue
        </h1>
        <div className="bg-white rounded-lg shadow-sm p-8">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Issue Details */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Issue Title</label>
              <input
                type="text"
                id="title"
                name="title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base px-4 py-3"
              />
              {formik.touched.title && formik.errors.title && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.title}</div>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base px-4 py-3"
              />
              {formik.touched.description && formik.errors.description && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
              )}
            </div>

            {/* Project Selection */}
            <div>
              <label htmlFor="projectId" className="block text-sm font-medium text-gray-700">Project</label>
              <select
                id="projectId"
                name="projectId"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.projectId}
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base px-4 py-3"
              >
                <option value="">Select a Project</option>
                {projects.map(project => (
                  <option key={project._id} value={project._id}>{project.title}</option>
                ))}
              </select>
              {formik.touched.projectId && formik.errors.projectId && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.projectId}</div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Type */}
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  id="type"
                  name="type"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.type}
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base px-4 py-3"
                >
                  <option value="Bug">Bug</option>
                  <option value="Feature">Feature</option>
                  <option value="Task">Task</option>
                </select>
                {formik.touched.type && formik.errors.type && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.type}</div>
                )}
              </div>

              {/* Status */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  id="status"
                  name="status"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.status}
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base px-4 py-3"
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
                {formik.touched.status && formik.errors.status && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.status}</div>
                )}
              </div>

              {/* Priority */}
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                <select
                  id="priority"
                  name="priority"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.priority}
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base px-4 py-3"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                {formik.touched.priority && formik.errors.priority && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.priority}</div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Assignee */}
              <div>
                <label htmlFor="assignee" className="block text-sm font-medium text-gray-700">Assignee</label>
                <select
                  id="assignee"
                  name="assignee"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.assignee}
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base px-4 py-3"
                >
                  <option value="">Select Assignee</option>
                  {mockUsers.map(user => (
                    <option key={user._id} value={user._id}>{user.name}</option>
                  ))}
                </select>
                {formik.touched.assignee && formik.errors.assignee && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.assignee}</div>
                )}
              </div>

              {/* Reporter */}
              <div>
                <label htmlFor="reporter" className="block text-sm font-medium text-gray-700">Reporter</label>
                <select
                  id="reporter"
                  name="reporter"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.reporter}
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-ring-blue-500 text-base px-4 py-3"
                >
                  <option value="">Select Reporter</option>
                  {mockUsers.map(user => (
                    <option key={user._id} value={user._id}>{user.name}</option>
                  ))}
                </select>
                {formik.touched.reporter && formik.errors.reporter && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.reporter}</div>
                )}
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date (Optional)</label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dueDate}
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base px-4 py-3"
              />
              {formik.touched.dueDate && formik.errors.dueDate && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.dueDate}</div>
              )}
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
              <input
                type="text"
                id="tags"
                name="tags"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.tags}
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base px-4 py-3"
                placeholder="e.g., frontend, bug, critical"
              />
              {formik.touched.tags && formik.errors.tags && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.tags}</div>
              )}
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/issues')}
                className="px-6 py-3 border border-gray-300 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create Issue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateIssuePage;
