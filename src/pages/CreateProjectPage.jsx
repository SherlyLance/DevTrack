// src/pages/CreateProjectPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useProjects } from '../context/ProjectsContext'; // Import useProjects
import { CreateProjectIcon } from '../components/Icons'; // Import icon

const CreateProjectPage = () => {
  const navigate = useNavigate();
  const { addProject } = useProjects(); // Use addProject from context

  // Mock data for existing users (for frontend UI only, not sent to backend on project creation)
  const mockUsers = [
    { id: 'u1', name: 'Alice Smith', email: 'alice@example.com' },
    { id: 'u2', name: 'Bob Johnson', email: 'bob@example.com' },
    { id: 'u3', name: 'Charlie Brown', email: 'charlie@example.com' },
    { id: 'u4', name: 'David Lee', email: 'david@example.com' },
    { id: 'u5', name: 'Eve Davis', email: 'eve@example.com' },
  ];

  // State for managing project members (frontend UI only for now)
  const [projectMembers, setProjectMembers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(''); // ID of the user selected from dropdown
  const [selectedRole, setSelectedRole] = useState('Developer'); // Default role

  const roles = ['Admin', 'Developer', 'QA', 'Viewer'];

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      status: 'active',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Project name is required'),
      description: Yup.string().required('Description is required'),
      startDate: Yup.date().required('Start date is required'),
      endDate: Yup.date()
        .min(Yup.ref('startDate'), 'End date must be after start date')
        .required('End date is required'),
      status: Yup.string().required('Status is required'),
    }),
    onSubmit: async (values) => {
      // Data to send to the backend for project creation
      const projectDataToSend = {
        title: values.name, // Backend expects 'title'
        description: values.description,
        startDate: values.startDate,
        endDate: values.endDate,
        status: values.status,
        // teamMembers are NOT sent here, as backend's POST /projects handles initial creator
        // and a separate endpoint would be used for adding more members later.
      };

      const result = await addProject(projectDataToSend); // Call addProject from context
      if (result.success) {
        navigate('/projects'); // Navigate to projects list on success
      }
      // Toast messages are handled by ProjectsContext
    },
  });

  const handleAddMember = () => {
    if (!selectedUser) {
      // toast.error('Please select a user to add.'); // Toast now handled by context if we were to send this there
      return;
    }

    const userToAdd = mockUsers.find(user => user.id === selectedUser);

    if (projectMembers.some(member => member.id === userToAdd.id)) {
      // toast.warn(`${userToAdd.name} is already a member of this project.`);
      return;
    }

    setProjectMembers([...projectMembers, { ...userToAdd, role: selectedRole }]);
    setSelectedUser(''); // Reset selected user
    setSelectedRole('Developer'); // Reset role to default
    // toast.success(`${userToAdd.name} added as ${selectedRole}.`); // Toast now handled by context if we were to send this there
  };

  const handleRemoveMember = (memberId) => {
    const updatedMembers = projectMembers.filter(member => member.id !== memberId);
    setProjectMembers(updatedMembers);
    // You might want to get the name of the removed member for a toast message here
    // toast.info(`${removedMember.name} removed from the project.`); // Toast now handled by context if we were to send this there
  };

  return (
    <div className="h-full w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
            <CreateProjectIcon className="mr-3 text-indigo-500" /> {/* Icon added */}
            Create New Project
          </h1>
          <form onSubmit={formik.handleSubmit} className="space-y-8">
            {/* Project Details Section */}
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base px-4 py-3"
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="6"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base px-4 py-3"
                />
                {formik.touched.description && formik.errors.description && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.startDate}
                    className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base px-4 py-3"
                  />
                  {formik.touched.startDate && formik.errors.startDate && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.startDate}</div>
                  )}
                </div>

                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.endDate}
                    className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base px-4 py-3"
                  />
                  {formik.touched.endDate && formik.errors.endDate && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.endDate}</div>
                  )}
                </div>

                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.status}
                    className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base px-4 py-3"
                  >
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="on-hold">On Hold</option>
                  </select>
                  {formik.touched.status && formik.errors.status && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.status}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Team Members Section (UI only for now, backend integration is a separate step) */}
            <div className="space-y-6 pt-8 border-t border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Team Members (Frontend Preview)</h2>

              {/* Add Member Form */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                  <label htmlFor="user-select" className="block text-sm font-medium text-gray-700 mb-2">
                    Select User
                  </label>
                  <select
                    id="user-select"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base px-4 py-3"
                  >
                    <option value="">-- Select a user --</option>
                    {mockUsers.map(user => (
                      <option key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="role-select" className="block text-sm font-medium text-gray-700 mb-2">
                    Assign Role
                  </label>
                  <select
                    id="role-select"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base px-4 py-3"
                  >
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={handleAddMember}
                    className="w-full inline-flex justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Add Member
                  </button>
                </div>
              </div>

              {/* Current Members List */}
              <div className="pt-4">
                <h3 className="text-lg font-medium text-gray-700 mb-3">Current Members</h3>
                {projectMembers.length === 0 ? (
                  <p className="text-gray-500">No members added yet.</p>
                ) : (
                  <ul className="border border-gray-200 rounded-md divide-y divide-gray-200 shadow-sm">
                    {projectMembers.map((member) => (
                      <li key={member.id} className="px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center">
                          {/* Placeholder for Profile Picture/Avatar */}
                          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-gray-700 mr-3">
                            {member.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{member.name}</p>
                            <p className="text-sm text-gray-500">{member.role}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveMember(member.id)}
                          className="ml-4 text-red-600 hover:text-red-900 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/projects')}
                className="px-6 py-3 border border-gray-300 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectPage;
