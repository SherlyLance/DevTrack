import React from 'react';
import { useNavigate } from 'react-router-dom';
import IssueForm from '../components/IssueForm';
import { toast } from 'react-toastify';

const CreateIssuePage = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log('New Issue Data:', values);
    // In a real application, you would send this data to your backend API
    toast.success('Issue created successfully!');
    navigate('/issues'); // Navigate back to the issues list after creation
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Issue</h1>
        <IssueForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CreateIssuePage; 