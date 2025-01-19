'use client';
import { useState, useEffect } from 'react';
import AddBookModal from './BookForm';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [titleFilter, setTitleFilter] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [perPage, setPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/api/v1/books?page=${page}&per_page=${perPage}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            filters: [
              titleFilter ? { field: 'title', value: titleFilter, type: 'like' } : null,
              authorFilter ? { field: 'author', value: authorFilter, type: 'like' } : null,
            ].filter(Boolean),
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }

        const result = await response.json();
        setBooks(result.data);
        setTotalPages(Math.ceil(result.meta.pagination.total / perPage));
      } catch (error) {
        setError('Failed to fetch books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [page, titleFilter, authorFilter, perPage]);

  const handleFilterChange = (e, type) => {
    const value = e.target.value;
    if (type === 'title') {
      setTitleFilter(value);
    } else if (type === 'author') {
      setAuthorFilter(value);
    }
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setPage(1);
  };

  const handleAddBook = () => {
    alert('Navigating to Add Book form');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="overflow-x-auto px-4 py-6 text-gray-800 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-700">Book List</h1>
        <button
          onClick={openModal}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Add Book
        </button>

        {/* Komponen Modal */}
        <AddBookModal isOpen={isModalOpen} onClose={closeModal} />
      </div>

      {/* Filter Section */}
      <div className="mb-4 flex space-x-4 mt-10">
        <input
          type="text"
          placeholder="Filter by title..."
          value={titleFilter}
          onChange={(e) => handleFilterChange(e, 'title')}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Filter by author..."
          value={authorFilter}
          onChange={(e) => handleFilterChange(e, 'author')}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={perPage}
          onChange={handlePerPageChange}
          className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>

      {/* Scrollable Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Title</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Author</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Published Date</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Stock</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Rack</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.uuid} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2 text-sm text-gray-700">{book.title}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{book.author}</td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {new Date(book.publishedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">{book.stock}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{book.rak.name}</td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  <button className="px-3 py-1 text-blue-600 hover:underline">Edit</button>
                  <button className="px-3 py-1 text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="mt-4 flex justify-center space-x-2">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-sm font-medium text-gray-600">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookList;
