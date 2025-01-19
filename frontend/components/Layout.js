'use client';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 p-6 bg-gray-100 text-slate-800">
        {children}
      </div>
    </div>
  );
};

export default Layout;
