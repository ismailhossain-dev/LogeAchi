import Navbar from '@/components/Dashboard/shared/Navbar';
import Sidebar from '@/components/Dashboard/shared/Sidebar';
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen w-full bg-[#090a0f] overflow-hidden font-sans">

      <div className="hidden md:block shrink-0">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 h-full overflow-hidden">
      
        <Navbar />

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 text-gray-200">
          {children}
        </main>
        
      </div>
    </div>
  );
};

export default Layout;