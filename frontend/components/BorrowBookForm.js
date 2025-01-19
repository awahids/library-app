'use client';
import { useState, useEffect } from 'react';

const BorrowBookModal = ({ isOpen, onClose }) => {
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedBooks, setSelectedBooks] = useState([{ bookUuid: '', duration: 1 }]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchStudents();
      fetchBooks();
    }
  }, [isOpen]);

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

  const handleStudentChange = (e) => {
    setSelectedStudent(e.target.value);
  };

  const handleBookChange = (e, index) => {
    const { name, value } = e.target;
    const updatedBooks = [...selectedBooks];
    updatedBooks[index] = { ...updatedBooks[index], [name]: value };
    setSelectedBooks(updatedBooks);
  };

  const handleAddBook = () => {
    setSelectedBooks([...selectedBooks, { bookUuid: '', duration: 1 }]);
  };

  const handleRemoveBook = (index) => {
    const updatedBooks = selectedBooks.filter((_, i) => i !== index);
    setSelectedBooks(updatedBooks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Ensure the duration is a number
    const validBooks = selectedBooks.map((book) => ({
      ...book,
      duration: Number(book.duration),
    }));

    const payload = {
      studentUuid: selectedStudent,
      data: validBooks,
    };

    try {
      const response = await fetch('http://localhost:3000/api/v1/book/borrow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        alert('Books borrowed successfully!');
        onClose();
      } else {
        if (result.error.includes("out of stock")) {
          setError(`The book "${result.error.split(" is out of stock")[0]}" is out of stock`);
        } else {
          setError(result.errors[0]?.msg || 'Failed to borrow books');
        }
      }
    } catch (error) {
      console.error('Error borrowing books:', error);
      setError('An error occurred while borrowing books');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Borrow Books</h2>

        <form onSubmit={handleSubmit}>
          {/* Select Student */}
          <div className="mb-4">
            <label htmlFor="studentUuid" className="block text-gray-700">Student</label>
            <select
              id="studentUuid"
              value={selectedStudent}
              onChange={handleStudentChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select a student</option>
              {students.length > 0 ? (
                students.map((student) => (
                  <option key={student.uuid} value={student.uuid}>
                    {student.name} ({student.nim})
                  </option>
                ))
              ) : (
                <option value="" disabled>No students available</option>
              )}
            </select>
          </div>

          {/* Select Books */}
          {selectedBooks.map((book, index) => (
            <div key={index} className="mb-4">
              <div className="flex gap-4">
                <div className="w-full">
                  <label htmlFor={`bookUuid-${index}`} className="block text-gray-700">Book</label>
                  <select
                    id={`bookUuid-${index}`}
                    name="bookUuid"
                    value={book.bookUuid}
                    onChange={(e) => handleBookChange(e, index)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  >
                    <option value="">Select a book</option>
                    {books.length > 0 ? (
                      books.map((book) => (
                        <option key={book.uuid} value={book.uuid}>
                          {book.title} by {book.author}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>No books available</option>
                    )}
                  </select>
                </div>
                <div className="w-1/4">
                  <label htmlFor={`duration-${index}`} className="block text-gray-700">Hari</label>
                  <input
                    type="number"
                    id={`duration-${index}`}
                    name="duration"
                    value={book.duration}
                    onChange={(e) => handleBookChange(e, index)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    min="1"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveBook(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Add Book Button */}
          <div className="mb-4">
            <button
              type="button"
              onClick={handleAddBook}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Add Another Book
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 mb-4 bg-red-100 p-3 rounded-lg border border-red-300">
              <p>{error}</p>
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

export default BorrowBookModal;
