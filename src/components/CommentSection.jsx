import React, { useState } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';

const CommentSection = ({ comments: initialComments = [], onAddComment }) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(initialComments);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const commentToAdd = {
        id: comments.length + 1, // Simple ID generation
        author: 'Current User', // Placeholder for current user
        timestamp: new Date().toLocaleString(),
        text: newComment.trim(),
      };
      setComments([...comments, commentToAdd]);
      setNewComment('');
      if (onAddComment) {
        onAddComment(commentToAdd);
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Comments</h2>
      <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-sm">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex space-x-3">
              <div className="flex-shrink-0">
                <UserCircleIcon className="h-8 w-8 text-gray-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">{comment.author}</p>
                <p className="text-sm text-gray-500">{comment.timestamp}</p>
                <p className="text-sm text-gray-700 mt-1">{comment.text}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="border-t border-gray-200 pt-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows="3"
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mb-3"
          placeholder="Write a comment..."
        ></textarea>
        <button
          onClick={handleAddComment}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default CommentSection; 