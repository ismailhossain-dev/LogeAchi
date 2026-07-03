"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/Logo/Logo';

const Sidebar = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  const menuGroups = [
    {
      groupName: "Core",
      items: [
        { 
          name: 'Dashboard', 
          href: '/dashboard',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
            </svg>
          )
        },
        { 
          name: 'My Profile', 
          href: '/user/my-profile',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          )
        },
      ]
    },
    {
      groupName: "Shopping",
      items: [
        { 
          name: 'My Orders', 
          href: '/user/my-orders',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          )
        },
        { 
          name: 'My Wishlist', 
          href: '/user/my-wishlist',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          )
        },
        { 
          name: 'My Cart', 
          href: '/user/my-cart',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          )
        },
      ]
    },
    {
      groupName: "Preferences",
      items: [
        { 
          name: 'Settings', 
          href: '/dashboard/settings',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )
        },
      ]
    }
  ];
  // <div 
  //         className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
  //         onClick={onClose}
  //       />
  return (
    <>


      {/* 🏢 মেইন সাইডবার কন্টেইনার */}
      <aside  className={`
    fixed top-0 left-0
    z-50
    w-[280px]
    h-screen
    bg-[#0f111a]
    border-r border-gray-800/60
    flex flex-col

    transform
    transition-transform
    duration-300
    ease-in-out

    ${
      isOpen
        ? "translate-x-0"
        : "-translate-x-full"
    }

    md:translate-x-0
  `}>
        
        {/* লোগো সেকশন */}
        <div className="p-6 border-b border-gray-800/60 flex items-center justify-between h-[73px]">
          <div className="flex items-center gap-3">
            <h2 className="m-0 text-xl font-bold tracking-wide text-white">
              <Logo/>
            </h2>
          </div>
          
          {/* মোবাইল ক্লোজ বাটন */}
          <button 
            onClick={onClose}
            className="md:hidden text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800/50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* নেভিগেশন মেনু গ্রুপসমূহ */}
        <div className="flex-1 py-6 px-4 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
          {menuGroups.map((group) => (
            <div key={group.groupName} className="flex flex-col gap-1.5">
              <span className="px-4 text-[10px] font-bold uppercase tracking-widest text-gray-600">
                {group.groupName}
              </span>
              
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose} // মোবাইলে লিংকে ক্লিক করলে ক্লোজ হবে
                    className={`flex items-center py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200 text-left outline-none group
                      ${isActive 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                        : 'text-gray-400 hover:bg-gray-800/30 hover:text-white'
                      }`}
                  >
                    <span className={`mr-3 transition-colors duration-200 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          ))}

          {/* লগআউট বাটন (সবসময় নিচে থাকবে) */}
          <Link
            href="/auth/logout"
            className="flex items-center py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200 text-left outline-none mt-auto text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 group"
          >
            <span className="mr-3 text-rose-400/80 group-hover:text-rose-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </span>
            <span>Logout</span>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;