import Navbar from '@/components/Dashboard/shared/Navbar';
import Sidebar from '@/components/Dashboard/shared/Sidebar';
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen w-full bg-[#090a0f] overflow-hidden font-sans">
      
      {/* ১. বাম পাশে ফিক্সড সাইডবার (ডেস্কটপের জন্য দৃশ্যমান, মোবাইলে হাইড থাকবে যদি আপনার সাইডবার রেসপনসিভ না হয়) */}
      <div className="hidden md:block shrink-0">
        <Sidebar />
      </div>

      {/* ২. ডান পাশের মেইন কন্টেন্ট এরিয়া */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        
        {/* টপ ন্যাভবার */}
        <Navbar />

        {/* ডাইনামিক পেজ কন্টেন্ট (যেখানে বিভিন্ন পেজের ডেটা শো করবে) */}
           {/* etar mardome amra route click korle data gola majkane deka jai */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 text-gray-200">
          {children}
        </main>
        
      </div>
    </div>
  );
};

export default Layout;