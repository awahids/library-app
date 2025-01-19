'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon, BookOpenIcon, UsersIcon, CreditCardIcon, ClockIcon, HomeIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} bg-gray-800 text-white h-full`}>
      {/* Toggle Sidebar Button */}
      <button
        className="lg:hidden p-2 absolute top-4 left-4 text-white"
        onClick={toggleSidebar}
      >
        {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
      </button>

      {/* Sidebar Content */}
      <div className="flex flex-col p-4 mt-10">
        {/* Sidebar Header */}
        {/* <div className="text-2xl font-bold mb-6 mt-10">
          <h2>{isOpen ? 'Admin Panel' : ''}</h2>
        </div> */}

        {/* Menu Items */}
        <nav className="flex flex-col space-y-4">
          <Link href="/" className="flex items-center space-x-2 text-gray-300 hover:text-white">
            <HomeIcon className="w-5 h-5" />
            <span>{isOpen ? 'Dashboard' : <HomeIcon />}</span>
          </Link>
          <Link href="/books" className="flex items-center space-x-2 text-gray-300 hover:text-white">
            <BookOpenIcon className="h-5 w-5" />
            <span>{isOpen ? 'Books' : <BookOpenIcon />}</span>
          </Link>
          <Link href="/students" className="flex items-center space-x-2 text-gray-300 hover:text-white">
            <UsersIcon className="h-5 w-5" />
            <span>{isOpen ? 'Students' : <UsersIcon />}</span>
          </Link>
          <Link href="/transactions" className="flex items-center space-x-2 text-gray-300 hover:text-white">
            <CreditCardIcon className="h-5 w-5" />
            <span>{isOpen ? 'Transactions' : <CreditCardIcon />}</span>
          </Link>
          <Link href="/history" className="flex items-center space-x-2 text-gray-300 hover:text-white">
            <ClockIcon className="h-5 w-5" />
            <span>{isOpen ? 'Borrow History' : <ClockIcon />}</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
