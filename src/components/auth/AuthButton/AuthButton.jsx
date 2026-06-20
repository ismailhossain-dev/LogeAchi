"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FiLogIn, FiLogOut, FiUser, FiChevronDown, FiGrid, FiShoppingBag, FiHeart } from "react-icons/fi";

const AuthButton = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  // ইউজারের নামের প্রথম অক্ষর নেওয়ার জন্য
  const userInitial = session?.user?.name ? session.user.name.charAt(0).toUpperCase() : "U";

  // সেকশন ভিত্তিক বড় ও প্রিমিয়াম ড্রপডাউন আইটেমগুলোর লিস্ট
  const dropdownSections = [
    {
      title: "Personal Space",
      items: [
        {
          name: 'Overview Dashboard',
          href: '/user',
          desc: 'View your main analytics',
          icon: <FiGrid className="w-4 h-4" />
        },
        {
          name: 'My Profile',
          href: '/user/my-profile',
          desc: 'Manage account settings',
          icon: <FiUser className="w-4 h-4" />
        }
      ]
    },
    {
      title: "Shopping Activity",
      items: [
        {
          name: 'My Orders',
          href: '/user/my-orders',
          desc: 'Track purchases & history',
          icon: <FiShoppingBag className="w-4 h-4" />
        },
        {
          name: 'My Wishlist',
          href: '/user/my-wishlist',
          desc: 'Items you saved for later',
          icon: <FiHeart className="w-4 h-4" />
        }
      ]
    }
  ];

  return (
    <div className="relative inline-block text-left select-none">
      {status === "authenticated" ? (
        <div className="relative flex items-center">
          {/* 👤 প্রোফাইল ট্রিগার বাটন */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center gap-2 p-1 pr-3 rounded-full border transition-all duration-300 focus:outline-none
              ${isOpen 
                ? 'bg-orange-500/10 border-orange-500/50 text-white' 
                : 'bg-white/5 hover:bg-white/10 text-white/90 border-white/10'
              }`}
          >
            {/* ইউজার ইমেজ বা ইনিশিয়াল সার্কেল */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 text-white flex items-center justify-center font-bold text-sm shadow-md transition-transform duration-300 group-hover:scale-105">
              {userInitial}
            </div>
            
            <FiChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-orange-500" : ""}`} />
          </button>

          {/* 💎 সুন্দর, বড় ও আল্ট্রা-প্রফেশনাল ড্রপডাউন মেনু */}
          {isOpen && (
            <>
              {/* ব্যাকড্রপ - বাইরে ক্লিক করলে মেনু বন্ধ হওয়ার জন্য */}
              <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>

              <div className="absolute right-0 top-full mt-3 w-64 bg-[#1e1e1e] border border-white/10 rounded-2xl shadow-2xl py-3 z-20 animate-in fade-in slide-in-from-top-2 duration-200 origin-top-right">
                
                {/* ১. ইউজার ইনফো হেডার সেকশন */}
                <div className="px-4 pb-3 mb-2 border-b border-white/5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold text-lg border border-orange-500/20">
                    {userInitial}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <p className="text-sm font-semibold text-white truncate">
                      {session?.user?.name || "User"}
                    </p>
                    <p className="text-[11px] text-gray-400 truncate mt-0.5">
                      {session?.user?.email || "No Email Email"}
                    </p>
                  </div>
                </div>

                {/* ২. লুপের মাধ্যমে সেকশন ও রাউটগুলো রেন্ডার */}
                {dropdownSections.map((section, idx) => (
                  <div key={section.title} className={`${idx > 0 ? 'border-t border-white/5 mt-2.5 pt-2.5' : ''}`}>
                    <span className="block px-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">
                      {section.title}
                    </span>
                    
                    {section.items.map((route) => (
                      <Link
                        key={route.name}
                        href={route.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-start gap-3.5 px-4 py-2 hover:bg-white/5 text-gray-300 hover:text-white transition-all group"
                      >
                        <span className="text-gray-400 group-hover:text-orange-500 mt-0.5 transition-colors duration-200 shrink-0">
                          {route.icon}
                        </span>
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-medium leading-none">{route.name}</span>
                          <span className="text-[11px] text-gray-500 group-hover:text-gray-400 transition-colors mt-1.5 truncate leading-tight">
                            {route.desc}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ))}
                
                {/* ৩. লগআউট বাটন এরিয়া */}
                <div className="border-t border-white/5 mt-3 pt-2">
                  <button 
                    onClick={() => {
                      setIsOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="w-full flex items-center gap-3.5 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all font-medium group text-left"
                  >
                    <FiLogOut className="w-5 h-5 text-red-400/70 group-hover:text-red-400 transition-colors shrink-0" />
                    <div>
                      <p className="leading-none font-semibold">Logout</p>
                      <p className="text-[10px] text-red-400/50 mt-1">End your current session</p>
                    </div>
                  </button>
                </div>

              </div>
            </>
          )}
        </div>
      ) : (
        /* 🧡 প্রিমিয়াম সাইন-ইন বাটন */
        <Link
          href="/login"
          className="inline-flex items-center justify-center gap-2 px-5 py-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-medium text-[14px] tracking-wide rounded-full transition-all duration-300 shadow-md hover:shadow-orange-600/20 active:scale-[0.97] border border-orange-500/30"
        >
          <FiLogIn className="w-4 h-4" />
          LOGIN
        </Link>
      )}
    </div>
  );
};

export default AuthButton;