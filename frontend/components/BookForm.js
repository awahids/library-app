'use client';
import { useState, useEffect } from 'react';

const AddBookModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    rackUuid: '',
    title: '',
    author: '',
    publishedAt: '',
    stock: 0,
  });
  const [racks, setRacks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRacksLoading, setIsRacksLoading] = useState(true);

  // Fetch rack data
  useEffect(() => {
    const fetchRacks = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/raks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch racks data');
        }

        const result = await response.json();
        setRacks(result.data);
      } catch (error) {
        setError("Failed to fetch racks data");
      } finally {
        setIsRacksLoading(false);
      }
    };

    if (isOpen) {
      fetchRacks();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/v1/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        if (errorResponse.errors && Array.isArray(errorResponse.errors)) {
          const errorMessages = errorResponse.errors.map((err) => `${err.path}: ${err.msg}`).join(', ');
          throw new Error(errorMessages);
        }
        throw new Error(errorResponse.message || 'Failed to submit book data');
      }

      alert('Book added successfully!');
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Add Book</h2>

        <form onSubmit={handleSubmit}>
          {/* Rack UUID Dropdown */}
          <div className="mb-4">
            <label htmlFor="rackUuid" className="block text-gray-700">Rack UUID</label>
            <select
              id="rackUuid"
              name="rackUuid"
              value={formData.rackUuid}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Rack</option>
              {isRacksLoading ? (
                <option value="" disabled>Loading racks...</option>
              ) : (
                racks.map((rack) => (
                  <option key={rack.uuid} value={rack.uuid}>
                    {rack.name}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Author */}
          <div className="mb-4">
            <label htmlFor="author" className="block text-gray-700">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Published Date */}
          <div className="mb-4">
            <label htmlFor="publishedAt" className="block text-gray-700">Published Date</label>
            <input
              type="date"
              id="publishedAt"
              name="publishedAt"
              value={formData.publishedAt}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Stock */}
          <div className="mb-4">
            <label htmlFor="stock" className="block text-gray-700">Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
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

export default AddBookModal;
