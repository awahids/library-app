'use client';
import { useState } from 'react';

const AddStudentModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    nim: '',
    isActive: 'true',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formDataToSubmit = {
      ...formData,
      isActive: formData.isActive === 'true'
    };

    try {
      const response = await fetch('http://localhost:3000/api/v1/student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSubmit),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        if (errorResponse.errors && Array.isArray(errorResponse.errors)) {
          const errorMessages = errorResponse.errors
            .map((err) => `${err.path}: ${err.msg}`)
            .join(', ');
          throw new Error(errorMessages);
        }
        throw new Error(errorResponse.message || 'Failed to add student');
      }

      alert('Student added successfully!');
      onClose();
    } catch (error) {
      console.error('Error adding student:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Add Student</h2>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* NIM */}
          <div className="mb-4">
            <label htmlFor="nim" className="block text-gray-700">NIM</label>
            <input
              type="text"
              id="nim"
              name="nim"
              value={formData.nim}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Active Status */}
          <div className="mb-4">
            <label htmlFor="isActive" className="block text-gray-700">Active Status</label>
            <select
              id="isActive"
              name="isActive"
              value={formData.isActive}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 mb-4">
              {error.split(',').map((msg, idx) => (
                <p key={idx}>{msg.trim()}</p>
              ))}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentModal;
