"use client"
import AuthButton from '@/components/auth/AuthButton/AuthButton';
import Logo from '@/components/Logo/Logo';
import Link from 'next/link';
import React, { useState } from 'react';
import { BsCart3 } from 'react-icons/bs';
import { FiHeart } from 'react-icons/fi';
import { MdMenu, MdClose } from "react-icons/md";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // প্রোফাইল ড্রপডাউনের স্টেট

  // মোবাইল মেনু ওপেন/ক্লোজ হ্যান্ডলার 
  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navbarLinks = [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: "Shop", href: "/all-collection" },
    { id: 3, name: "Collection", href: "/collection" },
    { id: 4, name: "Blogs", href: "/blogs" }
  ];

  // ইউজার ড্রপডাউন রাউটস ও প্রিমিয়াম SVG আইকন
  const userRoutes = [
    {
      name: 'Overview Dashboard',
      href: '/dashboard',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
        </svg>
      )
    },
    {
      name: 'My Profile',
      href: '/user/my-profile',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      name: 'My Orders',
      href: '/user/my-orders',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    }
  ];

  return (
    <>
      {/* মেইন নেভিগেশন বার - FIXED POSITION */}
      <nav className="fixed top-0 left-0 w-full bg-[#1a1a1a]/95 backdrop-blur-md border-b border-white/5 py-4 z-40 shadow-md select-none">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-5 sm:px-8">
          
          {/* ১. লোগো */}
          <div className="transition-transform duration-200 hover:scale-105">
            <Logo />
          </div>
          
          {/* ২. ডেস্কটপ লিংকস */}
          <div className='hidden lg:flex items-center gap-8 text-white/90 font-medium tracking-wide text-sm'>
            {navbarLinks.map((item) => (
              <Link 
                key={item.id} 
                href={item.href}
                className="relative py-2 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-red-500 after:transition-all hover:after:w-full hover:text-white transition-colors"
              >
                {item.name.toUpperCase()}
              </Link>
            ))}
          </div>
          
          {/* ৩. আইকন, ডাইনামিক অন্ত বাটন এবং প্রোফাইল ড্রপডাউন */}
          <div className='flex items-center gap-4 sm:gap-5 text-white text-xl sm:text-2xl relative'>
            <div className="relative cursor-pointer hover:text-red-500 transition-colors p-1">
              <FiHeart />
            </div>
            <div className="relative cursor-pointer hover:text-red-500 transition-colors p-1">
              <BsCart3 />
            </div> 
            
            {/* ডাইনামিক Auth Button (লগইন স্টেট এরিয়া) */}
            <div className="ml-1 text-sm">
              <AuthButton />
            </div>

            {/* 👤 ইউজার প্রোফাইল মেনু বাটন */}
            <div className="relative flex items-center">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center justify-center focus:outline-none transition-all p-1 text-white/80 hover:text-white bg-white/5 hover:bg-white/10 rounded-full border border-white/10"
                aria-label="User Menu"
              >
                {/* প্রফেশনাল ইউজার আইকন (যাতে কোনো ডাইনামিক ইমেজ বা ডেটা ব্রেক না হয়) */}
                <svg className="w-5 h-5 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>

              {/* 💎 ড্রপডাউন মেনু লিস্ট */}
              {isProfileOpen && (
                <>
                  {/* ড্রপডাউন এর বাইরে ক্লিক করলে তা বন্ধ করার জন্য ক্লিকেবল ব্যাকড্রপ */}
                  <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)} />
                  
                  <div className="absolute right-0 top-full mt-3 w-52 bg-[#222222] border border-white/5 rounded-xl shadow-2xl py-1.5 z-20 transition-all duration-200 ease-out origin-top-right">
                    <div className="px-4 py-2 border-b border-white/5 flex flex-col mb-1.5">
                      <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Account Menu</span>
                    </div>

                    {userRoutes.map((route) => (
                      <Link
                        key={route.name}
                        href={route.href}
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-all font-medium group"
                      >
                        <span className="text-gray-400 group-hover:text-red-500 transition-colors">
                          {route.icon}
                        </span>
                        <span>{route.name}</span>
                      </Link>
                    ))}
                    
                    <div className="border-t border-white/5 mt-1.5 pt-1.5">
                      <Link 
                        href="/auth/logout"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all font-medium"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* মোবাইল হ্যামবার্গার মেনু বাটন */}
            <button 
              onClick={handleMenu} 
              className='lg:hidden p-1 text-white hover:text-red-500 transition-colors focus:outline-none'
              aria-label="Open Menu"
            >
              <MdMenu className="text-3xl" />
            </button>
          </div>
        </div>
      </nav>

      {/* স্পেসার ডিভ */}
      <div className="h-20 sm:h-24 w-full" />

      {/* --- মোবাইল রেসপন্সিভ সাইডবার ড্রয়ার --- */}
      <div 
        onClick={handleMenu} 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`} 
      />

      <div className={`fixed top-0 right-0 h-full w-[280px] bg-[#222222] z-50 p-6 pt-20 flex flex-col gap-5 text-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        <button 
          onClick={handleMenu} 
          className="absolute top-5 right-6 text-white hover:text-red-500 transition-colors focus:outline-none"
          aria-label="Close Menu"
        >
          <MdClose className="text-3xl" />
        </button>

        {/* মোবাইল মেনু লিংকস */}
        <div className="flex flex-col mt-4">
          {navbarLinks.map((item) => (
            <Link 
              key={item.id} 
              href={item.href}
              onClick={handleMenu}
              className="text-lg font-medium tracking-wide py-3 border-b border-white/5 hover:text-red-500 hover:pl-2 transition-all block w-full"
            >
              {item.name.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;