"use client"
import AuthButton from '@/components/auth/AuthButton/AuthButton';
import Logo from '@/components/Logo/Logo';
import Link from 'next/link';
import React, { useState } from 'react';
import { BsCart3 } from 'react-icons/bs';
import { FiHeart, FiChevronRight } from 'react-icons/fi'; // অ্যারো আইকন ইম্পোর্ট করা হয়েছে
import { MdMenu, MdClose } from "react-icons/md";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // মোবাইল মেনু ওপেন/ক্লোজ হ্যান্ডলার 
  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  // মেইন নেভিগেশন লিংকস
  const navbarLinks = [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: "Shop", href: "/all-collection" },
    { id: 3, name: "Collection", href: "/collection" },
    { id: 4, name: "Blogs", href: "/blogs" }
  ];

  return (
    // bg-[#1a1a1a] border-white/5
    <>
      {/* 🌟 মেইন নেভিগেশন বার - FIXED POSITION */}
      <nav className="fixed top-0 left-0 w-full bg-[#0b0f19] border-slate-800/60 /95 backdrop-blur-md border-b  py-4 z-40  shadow-md select-none">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-5 sm:px-8">
          
          {/* ১. ব্র্যান্ড লোগো */}
          <div className="transition-transform duration-200 hover:scale-105">
            <Logo />
          </div>
          
          {/* ২. ডেস্কটপ নেভিগেশন লিংকস (অ্যারো আইকন সহ) */}
          <div className='hidden lg:flex items-center gap-6 text-white/90 font-medium tracking-wide text-sm'>
            {navbarLinks.map((item) => (
              <Link 
                key={item.id} 
                href={item.href}
                className="group relative flex items-center gap-1 py-2 text-white/80 hover:text-white transition-colors"
              >
                <span>{item.name.toUpperCase()}</span>
                {/* ➡️ স্মুথ মুভিং অ্যারো আইকন */}
                {/* <FiChevronRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-orange-500 transform group-hover:translate-x-0.5 transition-transform duration-200" /> */}
                
                {/* বটম বর্ডার অ্যানিমেশন */}
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-orange-500 transition-all duration-200 group-hover:w-full" />
              </Link>
            ))}
          </div>
          
          {/* ৩. রাইট সাইড অ্যাকশন বাটন এবং ইউজার প্রোফাইল */}
          <div className='flex items-center gap-4 sm:gap-5 text-white text-xl sm:text-2xl'>
            {/* উইশলিস্ট আইকন */}
            <div className="relative cursor-pointer hover:text-orange-500 transition-colors p-1.5 hover:bg-white/5 rounded-full">
              <FiHeart className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            
            {/* কার্ট আইকন */}
            <div className="relative cursor-pointer hover:text-orange-500 transition-colors p-1.5 hover:bg-white/5 rounded-full">
              <BsCart3 className="w-5 h-5 sm:w-6 sm:h-6" />
            </div> 
            
            {/* 🧡 ডাইনামিক Auth Button এবং ইউজার ড্রপডাউন */}
            <div className="ml-1">
              <AuthButton />
            </div>

            {/* মোবাইল হ্যামবার্গার মেনু বাটন */}
            <button 
              onClick={handleMenu} 
              className='lg:hidden p-1.5 text-white hover:text-orange-500 hover:bg-white/5 rounded-full transition-colors focus:outline-none'
              aria-label="Open Menu"
            >
              <MdMenu className="text-3xl" />
            </button>
          </div>
        </div>
      </nav>

      {/* 🧱 অদৃশ্য স্পেসার দেওয়াল */}
      <div className="h-20 sm:h-24 w-full" />

      {/* --- 📱 মোবাইল রেসপন্সিভ সাইডবার ড্রয়ার --- */}
      <div 
        onClick={handleMenu} 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`} 
      />

      {/* সাইড ড্রয়ার প্যানেল */}
      <div className={`fixed top-0 right-0 h-full w-[280px] bg-[#1e1e1e] border-l border-white/5 z-50 p-6 pt-20 flex flex-col gap-5 text-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* ক্লোজ (X) বাটন */}
        <button 
          onClick={handleMenu} 
          className="absolute top-5 right-6 text-white hover:text-orange-500 hover:bg-white/5 p-1 rounded-full transition-colors focus:outline-none"
          aria-label="Close Menu"
        >
          <MdClose className="text-3xl" />
        </button>

        {/* মোবাইল নেভিগেশন লিংকস (রাইট সাইড অ্যারো আইকন সহ) */}
        <div className="flex flex-col mt-4">
          {navbarLinks.map((item) => (
            <Link 
              key={item.id} 
              href={item.href}
              onClick={handleMenu}
              className="group flex items-center justify-between text-base font-medium tracking-wide py-3.5 border-b border-white/5 hover:text-orange-500 transition-all block w-full"
            >
              <span>{item.name.toUpperCase()}</span>
              {/* মোবাইল স্ক্রিনের জন্য নিট অ্যারো */}
              <FiChevronRight className="w-4 h-4 text-gray-500 group-hover:text-orange-500 transform group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;