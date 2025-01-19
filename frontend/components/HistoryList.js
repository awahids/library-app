'use client';
import { useState, useEffect } from 'react';
import BorrowBookModal from './BorrowBookForm';

const HistoryList = () => {
  const [histories, setHistories] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    nim: '',
    name: '',
    uuid: '',
    title: '',
    borrowDate: '',
    returnDate: '',
    duration: '',
  });
  const [perPage, setPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    // Fetch students data
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/students', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        const result = await response.json();
        if (result.success) {
          setStudents(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch students:', error);
      }
    };

    // Fetch books data
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/books', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        const result = await response.json();
        if (result.success) {
          setBooks(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
    };

    fetchStudents();
    fetchBooks();
  }, []);

  useEffect(() => {
    const fetchHistories = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/api/v1/transactions?page=${page}&per_page=${perPage}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            filters: Object.keys(filters)
              .filter((key) => filters[key] !== '')
              .map((key) => {
                if (key === 'nim' || key === 'name') {
                  return { parent1: 'student', field: key, value: filters[key], type: 'like' };
                }
                if (key === 'uuid' || key === 'title') {
                  return key == "title" ?
                    { parent1: 'book', field: key, value: filters[key], type: 'like' }
                    :
                    { parent1: 'book', field: key, value: filters[key] };
                }
                if (key === 'borrowDate' || key === 'returnDate') {
                  return { field: key, value: filters[key], type: 'gte' };
                }
                if (key === 'duration') {
                  return { field: key, value: Number(filters[key]) };
                }
                return { field: key, value: filters[key], type: 'like' };
              }),
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }

        const result = await response.json();
        setHistories(result.data);
        setTotalPages(Math.ceil(result.meta.pagination.total / perPage));
      } catch (error) {
        setError('Failed to fetch transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchHistories();
  }, [page, filters, perPage]);

  const handleFilterChange = (e, field) => {
    const value = e.target.value;

    if (field === 'borrowDate' || field === 'returnDate') {
      const formattedDate = new Date(value).toISOString();
      setFilters((prevFilters) => ({
        ...prevFilters,
        [field]: formattedDate,
      }));
    } else if (field === 'title') {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [field]: value,
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [field]: value,
      }));
    }

    setPage(1);
  };

  const handleBookChange = (e) => {
    const bookUuid = e.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      uuid: bookUuid,
      title: '',
    }));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setPage(1);
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
        <h1 className="text-2xl font-bold text-gray-700">History Transaction List</h1>
        <button
          onClick={openModal}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Tambah Data
        </button>

        <BorrowBookModal isOpen={isModalOpen} onClose={closeModal} />
      </div>

      {/* Filter Section */}
      <div className="mb-4 flex flex-wrap gap-4 mt-10">
        {Object.keys(filters).map((field) => (
          <div key={field} className="flex flex-col">
            {field === 'name' ? (
              <select
                value={filters[field]}
                onChange={(e) => handleFilterChange(e, field)}
                className="w-48 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Student</option>
                {students.map((student) => (
                  <option key={student.uuid} value={student.name}>
                    {student.name}
                  </option>
                ))}
              </select>
            ) : field === 'title' ? (
              <input
                type="text"
                placeholder="Filter by Book Title"
                value={filters[field]}
                onChange={(e) => handleFilterChange(e, field)}
                className="w-48 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            ) : field === 'uuid' ? (
              <select
                value={filters[field]}
                onChange={handleBookChange}
                className="w-48 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Book</option>
                {books.map((book) => (
                  <option key={book.uuid} value={book.uuid}>
                    {book.title}
                  </option>
                ))}
              </select>
            ) : field === 'borrowDate' || field === 'returnDate' ? (
              <input
                type="date"
                value={filters[field]}
                onChange={(e) => handleFilterChange(e, field)}
                className="w-48 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            ) : (
              <input
                type="text"
                placeholder={`Filter by ${field}`}
                value={filters[field]}
                onChange={(e) => handleFilterChange(e, field)}
                className="w-48 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            )}
          </div>
        ))}
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
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Buku</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Mahasiswa</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">NIM</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Durasi</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Tanggal Pinjaman</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Tanggal Pengembalian</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {histories.map((history) => (
              <tr key={history.uuid} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2 text-sm text-gray-600">{history?.book?.title}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{history?.student?.name}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{history?.student?.nim}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{history?.duration}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{new Date(history?.borrowDate).toLocaleDateString()}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{history?.returnDate ? new Date(history?.returnDate).toLocaleDateString() : '-'}</td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  <button className="px-3 py-1 text-blue-600 hover:underline">Detail</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-300 text-gray-600 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 bg-gray-300 text-gray-600 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryList;
