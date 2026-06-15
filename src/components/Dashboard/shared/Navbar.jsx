"use client"
import React, { useState } from 'react';

const Navbar = () => {
  // মোবাইলে মেনু ওপেন/ক্লোজ করার জন্য স্টেট
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="flex justify-between items-center bg-[#0f111a] px-6 py-4 shadow-xl font-sans relative border-b border-gray-800/40 select-none">
      
      {/* বাম পাশের অংশ: টগল বাটন ও টাইটেল */}
      <div className="flex items-center gap-3">
        <button 
          className="block md:hidden bg-transparent border-none text-2xl cursor-pointer text-gray-300 p-0 select-none outline-none hover:text-white transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
        <h1 className="text-lg font-semibold text-white tracking-wide m-0">Overview</h1>
      </div>

      {/* মাঝখানের অংশ: প্রফেশনাল ডার্ক সার্চ বার (ডেস্কটপের জন্য) */}
      <div className="hidden md:flex items-center bg-gray-800/30 px-4 py-2 rounded-xl w-[300px] transition-all duration-300 focus-within:ring-2 focus-within:ring-indigo-500/20 border border-gray-800/60 focus-within:border-indigo-500/50">
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input 
          type="text" 
          placeholder="Search items, orders..." 
          className="border-none bg-transparent outline-none w-full ml-2.5 text-sm text-gray-200 placeholder-gray-500"
        />
      </div>

      {/* ডান পাশের অংশ: নোটিফিকেশন ও প্রোফাইল (রেসপনসিভ ড্রপডাউন সহ) */}
      <div className={`
        ${isMobileMenuOpen 
          ? 'flex flex-col absolute top-full right-0 bg-[#0f111a] w-[220px] shadow-2xl p-5 gap-5 items-start rounded-bl-xl z-50 border-l border-b border-gray-800/40' 
          : 'hidden'
        } md:flex md:flex-row md:static md:bg-transparent md:w-auto md:shadow-none md:p-0 md:gap-6 md:items-center md:z-auto md:border-none`}
      >
        {/* আইকন বাটনসমূহ (SVG আইকন সহ) */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-start md:justify-end">
          {/* নোটিফিকেশন */}
          <button className="relative bg-transparent border-none cursor-pointer p-1.5 text-gray-400 hover:text-white hover:bg-gray-800/40 rounded-lg transition-all outline-none">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1.5 right-1.5 bg-rose-500 w-2 h-2 rounded-full ring-2 ring-[#0f111a]"></span>
          </button>
          
          {/* মেসেজ */}
          <button className="relative bg-transparent border-none cursor-pointer p-1.5 text-gray-400 hover:text-white hover:bg-gray-800/40 rounded-lg transition-all outline-none">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
        
        {/* ইউজার প্রোফাইল সেকশন */}
        <div className="flex items-center gap-3 cursor-pointer pt-4 border-t border-gray-800/40 w-full md:pt-0 md:border-none md:w-auto group">
          <img 
            className="w-9 h-9 rounded-full object-cover border-2 border-indigo-600 p-[1px] group-hover:border-indigo-500 transition-colors" 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
            alt="User Profile" 
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors leading-tight">Arif Rahman</span>
            <span className="text-[11px] text-gray-500 mt-0.5 font-medium tracking-wide uppercase">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;