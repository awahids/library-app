'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon, BookOpenIcon, UsersIcon, CreditCardIcon, ClockIcon, HomeIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = () => {
    setIsOpen(false);
  };

  return (
    <div className={`transition-all duration-200 ${isOpen ? 'w-64' : 'w-20'} bg-gray-800 text-white h-full fixed`}>
      {/* Toggle Sidebar Button */}
      <div className="absolute top-4 left-4">
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full shadow-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500 transition-all"
        >
          {isOpen ? (
            <XMarkIcon className="h-4 w-4 text-white transition-transform transform rotate-0 duration-300" />
          ) : (
            <Bars3Icon className="h-4 w-4 text-white transition-transform transform rotate-0 duration-300" />
          )}
        </button>
      </div>

      {/* Sidebar Content */}
      <div className="flex flex-col p-4 mt-16">
        {/* Menu Items */}
        <nav className={`flex flex-col space-y-4 mt-6 ${isOpen ? 'items-start' : 'items-center'}`}>
          <Link href="/" onClick={handleMenuClick} className="flex items-center space-x-4 text-gray-300 hover:text-white">
            <HomeIcon className="w-6 h-6" />
            {isOpen && <span>Dashboard</span>}
          </Link>
          <Link href="/books" onClick={handleMenuClick} className="flex items-center space-x-4 text-gray-300 hover:text-white">
            <BookOpenIcon className="h-6 w-6" />
            {isOpen && <span>Books</span>}
          </Link>
          <Link href="/students" onClick={handleMenuClick} className="flex items-center space-x-4 text-gray-300 hover:text-white">
            <UsersIcon className="h-6 w-6" />
            {isOpen && <span>Students</span>}
          </Link>
          <Link href="/transaction-histories" onClick={handleMenuClick} className="flex items-center space-x-4 text-gray-300 hover:text-white">
            <ClockIcon className="h-6 w-6" />
            {isOpen && <span>Borrow History</span>}
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
