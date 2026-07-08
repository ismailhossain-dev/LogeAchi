"use client";

import AuthButton from '@/components/auth/AuthButton/AuthButton';
import Logo from '@/components/Logo/Logo';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { BsCart3 } from 'react-icons/bs';
import { FiChevronRight, FiTrash2 } from 'react-icons/fi'; 
// 🛠️ ভুল ইম্পোর্টটি (react-none) এখান থেকে রিমুভ করা হয়েছে
import { MdMenu as MdMenuIcon, MdClose as MdCloseIcon } from "react-icons/md";
// 🛠️ TanStack Query ইমপোর্ট করা হলো
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // মোবাইল মেনু স্টেট
  const [isCartOpen, setIsCartOpen] = useState(false); // কার্ট সাইডবার স্টেট
  const pathname = usePathname();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { data: session, status, isLoading: isSessionLoading } = useSession();

  // 🛠️ TanStack Query Structure
  const {
    data: cartData,
    isLoading: isCartLoading,
    refetch,
  } = useQuery({
    queryKey: ["cart", session?.user?.email],
    enabled: status === "authenticated" && !!session?.user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/cart?email=${session.user?.email}`);
      return res.data;
    },
  });

  const cartItems = cartData?.result || [];

  // 🛠️ কার্ট আইটেম ডিলিট করার ফাংশন
  const handleDeleteCartItem = async (itemId) => {
    try {
      const res = await axiosSecure.delete(`/api/cart/${itemId}`);
      if (res.data?.success || res.status === 200) {
        toast.success("Item removed from cart");
        queryClient.invalidateQueries(["cart", session?.user?.email]); // লাইভ ডাটা রিফ্রেশ
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to remove item");
    }
  };

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  // কার্ট ওপেন/ক্লোজ করার হ্যান্ডলার
  const handleCart = () => {
    const nextCartState = !isCartOpen;
    setIsCartOpen(nextCartState);

    if (nextCartState) {
      refetch(); // কার্ট ওপেন হলেই লেটেস্ট ডাটা রি-ফেচ হবে
    }
  };

  // কার্টের টোটাল প্রাইজ ক্যালকুলেশন
  const totalTaka = cartItems.reduce((total, item) => total + (Number(item.price) || 0), 0);

  if (isSessionLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-2xl font-bold text-orange-500'>Loading...</p>
      </div>
    );
  }

  const navbarLinks = [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: "Shop", href: "/all-collection" },
    { id: 3, name: "Collection", href: "/collection" },
    { id: 4, name: "Blogs", href: "/blogs" }
  ];

  return (
    <>
      {/* 🌟 মেইন নেভিগেশন বার */}
      <nav className="fixed top-0 left-0 w-full bg-[#0b0f19] border-slate-800/60 backdrop-blur-md border-b py-4 z-40 shadow-md select-none">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-5 sm:px-8">
          
          {/* ব্র্যান্ড লোগো */}
          <div className="transition-transform duration-200 hover:scale-105">
            <Logo />
          </div>
          
          {/* ডেস্কটপ নেভিগেশন লিংকস */}
          <div className='hidden lg:flex items-center gap-6 font-medium tracking-wide text-sm'>
            {navbarLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.id} 
                  href={item.href}
                  className={`group relative flex items-center gap-1 py-2 transition-colors ${
                    isActive ? 'text-orange-500 font-bold' : 'text-white/80 hover:text-white'
                  }`}
                >
                  <span>{item.name.toUpperCase()}</span>
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-orange-500 transition-all duration-200 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              );
            })}
          </div>
          
          {/* রাইট সাইড অ্যাকশন বাটন */}
          <div className='flex items-center gap-4 sm:gap-5 text-white text-xl sm:text-2xl'>
            
            {/* কার্ট আইকন বাটন */}
            <div 
              onClick={handleCart}
              className="relative cursor-pointer text-white p-1.5 transition-transform active:scale-95"
            >
              <BsCart3 className="w-5 h-5 sm:w-6 sm:h-6" />
              {/* ডাইনামিক কার্ট কাউন্টার ব্যাজ */}
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold text-white">
                  {cartItems.length}
                </span>
              )}
            </div> 
            
            <div className="ml-1">
              <AuthButton />
            </div>

            <button 
              onClick={handleMenu} 
              className='lg:hidden p-1.5 text-white hover:text-orange-500 hover:bg-white/5 rounded-full transition-colors focus:outline-none'
              aria-label="Open Menu"
            >
              <MdMenuIcon className="text-3xl" />
            </button>
          </div>
        </div>
      </nav>

      <div className="bg-[#0f172a] h-20 w-full" />

      {/* ব্যাকড্রপ ওভারলে */}
      <div 
        onClick={handleCart} 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`} 
      />

      {/* 🛒 কার্ট সাইডবার প্যানেল */}
      <div className={`fixed top-0 right-0 h-full w-[380px] bg-[#0f172a] border-l border-slate-800/60 z-50 p-6 flex flex-col justify-between text-white shadow-2xl transition-transform duration-300 ease-in-out ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/60">
            <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
              <BsCart3 className="text-orange-500" /> আপনার কার্ট ({cartItems.length})
            </h3>
            <button 
              onClick={handleCart}
              className="text-slate-400 hover:text-orange-500 hover:bg-white/5 p-1 rounded-full transition-colors focus:outline-none"
            >
              <MdCloseIcon className="text-2xl" />
            </button>
          </div>

          {/* 🛠️ কার্ট আইটেম ডাইনামিক লিস্ট */}
          <div className="mt-6 space-y-4 overflow-y-auto max-h-[calc(100vh-220px)] pr-1">
            {isCartLoading ? (
              <p className="text-sm text-slate-400 text-center py-8">কার্ট লোড হচ্ছে...</p>
            ) : cartItems.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-8">
                আপনার কার্টটি বর্তমানে খালি আছে।
              </p>
            ) : (
              cartItems.map((item) => (
                <div key={item._id} className="flex gap-3 bg-slate-900/40 p-3 rounded-xl border border-slate-800/60 items-center justify-between group/item">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-slate-800 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white line-clamp-1">{item.title}</h4>
                      <p className="text-xs font-extrabold text-orange-500 mt-1">৳{item.price}</p>
                    </div>
                  </div>
                  
                  {/* 🛠️ ডিলিট বাটন অ্যাকশন */}
                  <button 
                    onClick={() => handleDeleteCartItem(item._id)}
                    className="text-slate-400 hover:text-red-500 p-2 rounded-lg hover:bg-white/5 transition-colors focus:outline-none cursor-pointer"
                    title="Remove item"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800/60 space-y-3">
          <div className="flex justify-between text-sm font-medium text-slate-300">
            <span>Total Taka</span>
            <span className="text-orange-500 font-bold">৳{totalTaka}</span>
          </div>
          <Link href="/user/my-cart" className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-lg text-center block cursor-pointer">
            Order Now
          </Link>
        </div>
      </div>

      {/* মোবাইল ড্রয়ার সাইডবার */}
      <div className={`fixed top-0 right-0 h-full w-[280px] bg-[#101726] border-l border-slate-800/60 z-40 p-6 pt-20 flex flex-col gap-5 text-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <button 
          onClick={handleMenu} 
          className="absolute top-5 right-6 text-white hover:text-orange-500 hover:bg-white/5 p-1 rounded-full transition-colors focus:outline-none"
        >
          <MdCloseIcon className="text-3xl" />
        </button>

        <div className="flex flex-col mt-4">
          {navbarLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.id} 
                href={item.href}
                onClick={handleMenu}
                className={`group flex items-center justify-between text-base font-medium tracking-wide py-3.5 border-b border-slate-800/60 transition-all block w-full ${
                  isActive ? 'text-orange-500 font-bold' : 'text-slate-200 hover:text-orange-500'
                }`}
              >
                <span>{item.name.toUpperCase()}</span>
                <FiChevronRight className={`w-4 h-4 transform transition-transform duration-200 ${
                  isActive ? 'text-orange-500 translate-x-1' : 'text-gray-500 group-hover:text-orange-500 group-hover:translate-x-1'
                }`} />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;