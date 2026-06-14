"use client"
import LoginButton from '@/components/buttons/LoginButton';
import Logo from '@/components/Logo/Logo'
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { BsCart3 } from 'react-icons/bs';
import { FiHeart } from 'react-icons/fi';
import { MdMenu, MdClose } from "react-icons/md";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // মোবাইল মেনু ওপেন/ক্লোজ হ্যান্ডলার 
  const handleMenu = () => {
    setIsOpen(!isOpen)
  }

  // স্ক্রোল ট্র্যাকিং (১২০ পিক্সেল স্ক্রোল করলেই স্টিকি অ্যাক্টিভ হবে)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navbarLinks = [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: "Shop", href: "/all-collection" },
    { id: 3, name: "Collection", href: "/collection" },
    { id: 4, name: "Blogs", href: "/blogs" }
  ]

  return (
    <>
      {/* ১. সাধারণ বা নরমাল অবস্থায় যে নেভিগেশন বারটি স্ক্রিনের শুরুতে দেখাবে */}
      <nav className="w-full bg-[#222222] py-5 relative z-30">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-5">
          {/* Logo */}
          <div>
            <Logo />
          </div>
          
          {/* Desktop Links */}
          <div className='hidden lg:flex gap-6 text-white font-medium'>
            {navbarLinks.map((item) => (
              <div key={item.id} className="hover:text-red-500 transition-colors">
                <Link href={item.href}>{item.name.toUpperCase()}</Link>
              </div>
            ))}
          </div>
          
          {/* Icons & Login */}
          <div className='flex items-center justify-center gap-4 sm:gap-6 text-white text-2xl sm:text-3xl'>
            <FiHeart className="cursor-pointer hover:text-red-500 transition-colors" />
            <BsCart3 className="cursor-pointer hover:text-red-500 transition-colors" /> 
            
            {/* Login Button - এখন সব ডিভাইসেই দেখাবে */}
            <LoginButton/>

            {/* Hamburger / Close Menu Button */}
            <button onClick={handleMenu} className='lg:hidden focus:outline-none z-50 relative'>
              {isOpen ? <MdClose className="text-red-500 text-3xl" /> : <MdMenu className="text-3xl" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ২. স্টিকি নেভিগেশন বার */}
      <nav className={`fixed top-0 left-0 w-full z-50 bg-[#1a1a1a]/95 backdrop-blur-md shadow-md py-3 transition-transform ease-in-out ${
        isScrolled 
          ? 'translate-y-0 duration-500' 
          : '-translate-y-full duration-0' 
      }`}>
        <div className="flex justify-between items-center max-w-7xl mx-auto px-5">
          <div>
            <Logo />
          </div>
          <div className='hidden lg:flex gap-6 text-white font-medium'>
            {navbarLinks.map((item) => (
              <div key={item.id} className="hover:text-red-500 transition-colors">
                <Link href={item.href}>{item.name.toUpperCase()}</Link>
              </div>
            ))}
          </div>
          <div className='flex items-center justify-center gap-4 sm:gap-6 text-white text-2xl sm:text-3xl'>
            <FiHeart className="cursor-pointer hover:text-red-500 transition-colors" />
            <BsCart3 className="cursor-pointer hover:text-red-500 transition-colors" /> 
            
            {/* Sticky বার-এও Login Button যুক্ত করা হয়েছে */}
            <LoginButton/>

            <button onClick={handleMenu} className='lg:hidden focus:outline-none z-50 relative'>
              {isOpen ? <MdClose className="text-red-500 text-3xl" /> : <MdMenu className="text-3xl" />}
            </button>
          </div>
        </div>
      </nav>

      {/* --- MOBILE RESPONSIVE SIDEBAR DRAWER --- */}
      
      {/* Background Overlay */}
      <div 
        onClick={handleMenu} 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`} 
      />

      {/* Side Navbar Drawer */}
      <div className={`fixed top-0 right-0 h-full w-[280px] bg-[#222222] z-40 p-6 pt-24 flex flex-col gap-6 text-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
        isOpen ? 'transform translate-x-0' : 'transform translate-x-full'
      }`}>
        {/* Mobile Navbar Links */}
        {navbarLinks.map((item) => (
          <div key={item.id} onClick={handleMenu} className="text-xl font-medium border-b border-gray-700 pb-3 hover:text-red-500 transition-colors">
            <Link href={item.href} className="block w-full">{item.name.toUpperCase()}</Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default Navbar;