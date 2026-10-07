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
import { MdMenu as MdMenuIcon, MdClose as MdCloseIcon } from "react-icons/md";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Container from '@/components/Dashboard/shared/container/Container';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const [isCartOpen, setIsCartOpen] = useState(false); 
  const pathname = usePathname();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { data: session, status, isLoading: isSessionLoading } = useSession();


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


const handleDeleteCartItem = async (itemId) => {
  try {
    const res = await axiosSecure.delete('/api/cart', { data: { id: itemId } });
    
    if (res.status === 200) {
      toast.success("Item removed from cart");
  
      queryClient.invalidateQueries(["cart", session?.user?.email]);
    }
  } catch (error) {
    console.error("Delete error:", error);
    toast.error("Failed to remove item");
  }
};

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCart = () => {
    const nextCartState = !isCartOpen;
    setIsCartOpen(nextCartState);

    if (nextCartState) {
      refetch(); 
    }
  };


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
    { id: 2, name: "SHOP", href: "/all-collection" },
    { id: 3, name: "MENS", href: "/mens-collections" },
    { id: 4, name: "WOMENS", href: "/womens-collections" },
    { id: 5, name: "ABOUT US", href: "/about-us" },
    // { id: 6, name: "Admin Dashboard", href: "/admin" }
  ];

  return (
    <>

      <nav className="fixed top-0 left-0 w-full bg-[#0f172a] border-slate-800/60 backdrop-blur-md border-b py-4 z-40 shadow-md select-none">
      <Container>
        <div className="flex justify-between items-center ">
          

          <div className="transition-transform duration-200 hover:scale-105">
            <Logo />
          </div>
          
  
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
    
          <div className='flex items-center gap-4 sm:gap-5 text-white text-xl sm:text-2xl'>
            
         
            <div 
              onClick={handleCart}
              className="relative cursor-pointer text-white p-1.5 transition-transform active:scale-95"
            >
              <BsCart3 className="w-5 h-5 sm:w-6 sm:h-6" />
       
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
        </Container>
      </nav>


      <div className="bg-[#0f172a] h-20 w-full" />

   
      <div 
        onClick={handleCart} 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`} 
      />

      
      <div className={`fixed top-0 right-0 h-full w-[380px] bg-[#0f172a] border-l border-slate-800/60 z-50 p-6 flex flex-col justify-between text-white shadow-2xl transition-transform duration-300 ease-in-out ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/60">
            <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
              <BsCart3 className="text-orange-500" /> Your Cart ({cartItems.length})
            </h3>
            <button 
              onClick={handleCart}
              className="text-slate-400 hover:text-orange-500 hover:bg-white/5 p-1 rounded-full transition-colors focus:outline-none"
            >
              <MdCloseIcon className="text-2xl" />
            </button>
          </div>

          <div className="mt-6 space-y-4 overflow-y-auto max-h-[calc(100vh-220px)] pr-1">
            {isCartLoading ? (
              <p className="text-sm text-slate-400 text-center py-8">Cart is Loading...</p>
            ) : cartItems.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-8">
               Your shopping cart is currently empty
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
          <Link href="/user/my-cart" className="w-full py-5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-lg text-center block cursor-pointer">
            GO TO CART & CHEEKOUT
          </Link>
        </div>
      </div>


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