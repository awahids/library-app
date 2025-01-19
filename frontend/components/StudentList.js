'use client';
import { useState, useEffect } from 'react';
import AddStudentModal from './StudentForm';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    name: '',
    nim: '',
    isActive: '',
  });
  const [perPage, setPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/api/v1/students?page=${page}&per_page=${perPage}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            filters: Object.keys(filters)
              .filter((key) => filters[key] !== '')
              .map((key) => {
                if (key === 'isActive') {
                  const value = filters[key] === 'true';
                  return { field: key, value };
                }
                if (key === 'name') {
                  return { field: key, value: filters[key], type: 'like' };
                }
                return { field: key, value: filters[key], type: 'like' };
              }),
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }

        const result = await response.json();
        setStudents(result.data);
        setTotalPages(Math.ceil(result.meta.pagination.total / perPage));
      } catch (error) {
        setError('Failed to fetch students');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [page, filters, perPage]);

  const handleFilterChange = (e, field) => {
    const value = e.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setPage(1);
  };

  const handleAddStudent = () => {
    alert('Navigating to Add Student form');
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
        <h1 className="text-2xl font-bold text-gray-700">Student List</h1>
        <button
          onClick={openModal}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Add Student
        </button>

        {/* Modal Component */}
        <AddStudentModal isOpen={isModalOpen} onClose={closeModal} />
      </div>

      {/* Filter Section */}
      <div className="mb-4 flex space-x-4 mt-10">
        {Object.keys(filters).map((field) => (
          <div key={field} className="flex flex-col">
            {field === 'isActive' ? (
              <select
                value={filters[field]}
                onChange={(e) => handleFilterChange(e, field)}
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">All Status</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            ) : (
              <input
                type="text"
                placeholder={`Filter by ${field}`}
                value={filters[field]}
                onChange={(e) => handleFilterChange(e, field)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Nama</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">NIM</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.uuid} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2 text-sm text-gray-700">{student.name}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{student.nim}</td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${student.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                      }`}
                  >
                    {student.isActive ? 'Aktif' : 'Tidak Aktif'}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  <button className="px-3 py-1 text-blue-600 hover:underline">Edit</button>
                  <button className="px-3 py-1 text-red-600 hover:underline">Delete</button>
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

export default StudentList;
