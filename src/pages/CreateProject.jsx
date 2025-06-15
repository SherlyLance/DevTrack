import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateProject = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    projectName: Yup.string().required('Project Name is required'),
    description: Yup.string().required('Description is required'),
    startDate: Yup.date().nullable().required('Start Date is required'),
    endDate: Yup.date()
      .nullable()
      .min(Yup.ref('startDate'), 'End Date cannot be before Start Date')
      .required('End Date is required'),
    status: Yup.string().required('Status is required'),
  });

  const formik = useFormik({
    initialValues: {
      projectName: '',
      description: '',
      startDate: '',
      endDate: '',
      status: 'Active',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Project Data:', { ...values });
      toast.success('Project created successfully!');
      navigate('/projects');
    },
  });

  return (
    
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Project</h1>
        <div className="bg-white rounded-xl shadow-sm px-8 py-8 border border-gray-100">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Project Name */}
            <div>
              <label htmlFor="projectName" className="block text-gray-700 text-base font-semibold mb-2">Project Name</label>
              <input
                type="text"
                id="projectName"
                name="projectName"
                {...formik.getFieldProps('projectName')}
                className="block w-full px-4 py-3 text-base border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter project name"
              />
              {formik.touched.projectName && formik.errors.projectName && (
                <p className="text-red-600 text-sm mt-1">{formik.errors.projectName}</p>

                
              )}
            </div>
         

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-gray-700 text-base font-semibold mb-2">Description</label>
              <textarea
                id="description"
                name="description"
                rows="5"
                {...formik.getFieldProps('description')}
                className="block w-full px-4 py-3 text-base border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter project description"
              ></textarea>
              {formik.touched.description && formik.errors.description && (
                <p className="text-red-600 text-sm mt-1">{formik.errors.description}</p>
              )}
            </div>

            {/* Start & End Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Start Date */}
              <div>
                <label htmlFor="startDate" className="block text-gray-700 text-base font-semibold mb-2">Start Date</label>
                <input
                  type="text"
                  id="startDate"
                  name="startDate"
                  {...formik.getFieldProps('startDate')}
                  className="block w-full px-4 py-3 text-base border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="dd-mm-yyyy"
                />
                {formik.touched.startDate && formik.errors.startDate && (
                  <p className="text-red-600 text-sm mt-1">{formik.errors.startDate}</p>
                )}
              </div>

              {/* End Date */}
              <div>
                <label htmlFor="endDate" className="block text-gray-700 text-base font-semibold mb-2">End Date</label>
                <input
                  type="text"
                  id="endDate"
                  name="endDate"
                  {...formik.getFieldProps('endDate')}
                  className="block w-full px-4 py-3 text-base border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="dd-mm-yyyy"
                />
                {formik.touched.endDate && formik.errors.endDate && (
                  <p className="text-red-600 text-sm mt-1">{formik.errors.endDate}</p>
                )}
              </div>
            </div>

            {/* Status Dropdown */}
            <div>
              <label htmlFor="status" className="block text-gray-700 text-base font-semibold mb-2">Status</label>
              <select
                id="status"
                name="status"
                {...formik.getFieldProps('status')}
                className="block w-full px-4 py-3 text-base border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
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

export default CreateProject;

