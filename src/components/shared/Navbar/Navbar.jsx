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

  return (
    <>
      {/* মেইন নেভিগেশন বার - FIXED POSITION */}
      <nav className="fixed top-0 left-0 w-full bg-[#1a1a1a]/95 backdrop-blur-md border-b border-white/5 py-4 z-40 shadow-md">
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
          
          {/* ৩. আইকন এবং লগইন বাটন */}
          <div className='flex items-center gap-4 sm:gap-6 text-white text-xl sm:text-2xl'>
            <div className="relative cursor-pointer hover:text-red-500 transition-colors p-1">
              <FiHeart />
            </div>
            <div className="relative cursor-pointer hover:text-red-500 transition-colors p-1">
              <BsCart3 />
            </div> 
            
            {/* Auth Button */}
            <div className="ml-2">
              <AuthButton />
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

      {/* নিচের এই খালি div-টি একটি অদৃশ্য দেওয়াল বা Spacer হিসেবে কাজ করবে। 
        যেহেতু নেভিগেশন বারটি fixed, তাই এই h-20 (Height 80px) বা h-24 সাইজের div-টি 
        নিচের প্রোডাক্ট কার্ডগুলোকে স্বয়ংক্রিয়ভাবে ধাক্কা দিয়ে নিচে নামিয়ে দেবে।
      */}
      <div className="h-20 sm:h-24 w-full" />

      {/* --- মোবাইল রেসপন্সিভ সাইডবার ড্রয়ার --- */}
      
      {/* ব্যাকগ্রাউন্ড ওভারলে */}
      <div 
        onClick={handleMenu} 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`} 
      />

      {/* সাইড ড্রয়ার মেনু */}
      <div className={`fixed top-0 right-0 h-full w-[280px] bg-[#222222] z-50 p-6 pt-20 flex flex-col gap-5 text-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* ক্লোজ (X) বাটন */}
        <button 
          onClick={handleMenu} 
          className="absolute top-5 right-6 text-white hover:text-red-500 transition-colors focus:outline-none"
          aria-label="Close Menu"
        >
          <MdClose className="text-3xl" />
        </button>

        {/* মোবাইল নেভিগেশন লিংকস */}
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