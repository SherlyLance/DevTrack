import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { PaperClipIcon, XMarkIcon } from '@heroicons/react/24/outline';

const IssueForm = ({ issue, onSubmit }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  const initialValues = issue ? {
    title: issue.title || '',
    description: issue.description || '',
    priority: issue.priority || 'Medium',
    assignee: issue.assignee || '',
    status: issue.status || 'To Do',
    attachments: issue.attachments || null,
  } : {
    title: '',
    description: '',
    priority: 'Medium',
    assignee: '',
    status: 'To Do',
    attachments: null,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    priority: Yup.string().required('Priority is required'),
    assignee: Yup.string().nullable(),
    status: Yup.string().required('Status is required'),
    attachments: Yup.mixed()
      .nullable()
      .test('fileSize', 'File size is too large', value => {
        if (!value) return true;
        return value.size <= 10 * 1024 * 1024; // 10MB
      })
      .test('fileType', 'Unsupported file type', value => {
        if (!value) return true;
        return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
      }),
  });

  // Placeholder for project members. In a real app, this would come from props or a context.
  const projectMembers = ['John Doe', 'Jane Smith', 'Peter Jones', 'Alice', 'Bob', 'Charlie', 'David', 'Eve'];

  const handleFileChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setFieldValue('attachments', file);
      // Create preview URL for images
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const removeFile = (setFieldValue) => {
    setFieldValue('attachments', null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">{issue ? 'Edit Issue' : 'Create New Issue'}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <div className="mb-5">
              <label htmlFor="title" className="block text-gray-700 text-sm font-semibold mb-2">Title</label>
              <Field
                type="text"
                id="title"
                name="title"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter issue title"
              />
              <ErrorMessage name="title" component="p" className="text-red-600 text-sm mt-1" />
            </div>

            <div className="mb-5">
              <label htmlFor="description" className="block text-gray-700 text-sm font-semibold mb-2">Description</label>
              <Field
                as="textarea"
                id="description"
                name="description"
                rows="4"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter issue description"
              />
              <ErrorMessage name="description" component="p" className="text-red-600 text-sm mt-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <div>
                <label htmlFor="priority" className="block text-gray-700 text-sm font-semibold mb-2">Priority</label>
                <Field
                  as="select"
                  id="priority"
                  name="priority"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </Field>
                <ErrorMessage name="priority" component="p" className="text-red-600 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="assignee" className="block text-gray-700 text-sm font-semibold mb-2">Assignee</label>
                <Field
                  as="select"
                  id="assignee"
                  name="assignee"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Unassigned</option>
                  {projectMembers.map(member => (
                    <option key={member} value={member}>{member}</option>
                  ))}
                </Field>
                <ErrorMessage name="assignee" component="p" className="text-red-600 text-sm mt-1" />
              </div>
            </div>

            <div className="mb-5">
              <label htmlFor="status" className="block text-gray-700 text-sm font-semibold mb-2">Status</label>
              <Field
                as="select"
                id="status"
                name="status"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </Field>
              <ErrorMessage name="status" component="p" className="text-red-600 text-sm mt-1" />
            </div>

            <div className="mb-6">
              <label htmlFor="attachments" className="block text-gray-700 text-sm font-semibold mb-2">Attachments (Optional)</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {!values.attachments ? (
                    <>
                      <PaperClipIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <span>Upload a file</span>
                          <input 
                            id="file-upload" 
                            name="file-upload" 
                            type="file" 
                            className="sr-only" 
                            accept="image/jpeg,image/png,image/gif"
                            onChange={(event) => handleFileChange(event, setFieldValue)} 
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </>
                  ) : (
                    <div className="relative">
                      {previewUrl ? (
                        <div className="relative">
                          <img 
                            src={previewUrl} 
                            alt="Preview" 
                            className="mx-auto h-32 w-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeFile(setFieldValue)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <PaperClipIcon className="h-6 w-6 text-gray-400" />
                          <span className="text-sm text-gray-600">{values.attachments.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(setFieldValue)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <ErrorMessage name="attachments" component="p" className="text-red-600 text-sm mt-1" />
            </div>

            <div className="flex items-center justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50"
              >
                {issue ? 'Update Issue' : 'Create Issue'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default IssueForm;