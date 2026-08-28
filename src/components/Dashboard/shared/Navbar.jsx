"use client";
import { useSession } from "next-auth/react";
import React from "react";

const Navbar = ({ setIsOpen }) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="text-center py-2 text-sm text-gray-500">Loading...</p>;
  }
  // console.log("dasborad navbar user", session);

  return (
    <header className="flex justify-between items-center bg-[#0f111a]/80 backdrop-blur-md px-6 py-4 shadow-lg font-sans border-b border-gray-800/60 select-none sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsOpen(true)}
          className="block md:hidden text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-800/50 outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-white tracking-wide m-0 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Overview
        </h1>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <button className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-800/40 rounded-xl transition-all outline-none">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="absolute top-2 right-2 bg-indigo-500 w-2 h-2 rounded-full ring-2 ring-[#0f111a]"></span>
        </button>

        <div className="flex items-center gap-3 cursor-pointer group">
          <img
            className="w-9 h-9 rounded-full object-cover border-2 border-indigo-600 p-[1px] group-hover:border-indigo-400 transition-colors shadow-md"
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
            alt="User Profile"
          />
          <div className="hidden sm:flex flex-col">
            <span className="text-[10px] text-gray-500 mt-0.5 font-bold tracking-wider uppercase">
              Customer
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
