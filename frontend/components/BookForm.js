'use client';
import { useState, useEffect } from 'react';

const BookForm = () => {
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

  // Ambil data rak dari API
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
        setRacks(result.data); // Menyimpan data rak yang diterima
      } catch (error) {
        setError('Failed to fetch racks');
      } finally {
        setIsRacksLoading(false);
      }
    };

    fetchRacks();
  }, []);

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
        body: JSON.stringify(formData), // Kirim form data termasuk rackUuid yang dipilih
      });

      if (!response.ok) {
        throw new Error('Failed to submit book data');
      }

      const result = await response.json();
      console.log('Book submitted successfully:', result);
      alert('Book data submitted successfully!');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md text-gray-900">
      <h2 className="text-xl font-bold mb-4">Add Book</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* Rack UUID Dropdown */}
        <div className="mb-4">
          <label htmlFor="rackUuid" className="block text-gray-700">Rack UUID</label>
          <select
            id="rackUuid"
            name="rackUuid"
            value={formData.rackUuid} // Pilih rak yang dipilih
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
