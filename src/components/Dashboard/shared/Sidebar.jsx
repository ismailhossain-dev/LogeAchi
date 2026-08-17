"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/Logo/Logo';

// Heroicons (hi2) theke reliable ebong modern icon import kora holo
import { 
  HiOutlineHome, 
  HiOutlineUser, 
  HiOutlineClipboardDocumentList, 
  HiOutlineHeart, 
  HiOutlineShoppingCart, 
  HiOutlineArrowLeftOnRectangle 
} from 'react-icons/hi2';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useSession } from 'next-auth/react';

const Sidebar = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const axioSecure = useAxiosSecure();
   const { data: session, status } = useSession();
const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const res = await axioSecure.get(`/api/dashboardOverview?email=${session.user.email}`);
          setUserRole(res.data?.role);
        } catch (error) {
          console.error("Failed to fetch user role", error);
        }
      }
    };

    fetchUserRole();
  }, [session, status, axioSecure]);

  if (status === "loading") {
    return <p className="text-white p-4">Loading...</p>;
  }

  console.log("hello user role " , userRole)

  

  const menuGroups = [
    {
      groupName: 'User Dashboard',
      items: [
        {
          name: 'Overview', 
          href: '/user',
          icon: <HiOutlineHome className="w-5 h-5" />
        },
        { 
          name: 'My Profile', 
          href: '/user/my-profile',
          icon: <HiOutlineUser className="w-5 h-5" />
        },
        {
          name: 'My Orders', 
          href: '/user/my-orders',
          icon: <HiOutlineClipboardDocumentList className="w-5 h-5" />
        },
        { 
          name: 'My Wishlist', 
          href: '/user/my-wishlist',
          icon: <HiOutlineHeart className="w-5 h-5" />
        },
        { 
          name: 'My Cart', 
          href: '/user/my-cart',
          icon: <HiOutlineShoppingCart className="w-5 h-5" />
        },
      ]
    }
  ];

  return (
    <>
      {/* 🏢 মেইন সাইডবার কন্টেইনার */}
      <aside className={`
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
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}>
        
        {/* লোগো সেকশন */}
        <div className="p-6 border-b border-gray-800/60 flex items-center justify-between h-[73px]">
          <div className="flex items-center gap-3">
            <div className="m-0 text-xl font-bold tracking-wide text-white">
              <Logo/>
            </div>
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
          {menuGroups.map((group, index) => (
            <div key={index} className="flex flex-col gap-4">
              {/* গ্রুপের টাইটেল */}
              <span className="px-4 text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-1">
                {group.groupName}
              </span>
              
              {group.items?.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200 text-left outline-none group
                      ${isActive 
                        ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' 
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

          {/* লগআউট বাটন */}
          <Link
            href="/auth/logout"
            className="flex items-center py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200 text-left outline-none mt-auto text-rose-400 bg-rose-500/10 hover:text-rose-300 group"
          >
            <span className="mr-3 text-rose-400/80 group-hover:text-rose-400">
              <HiOutlineArrowLeftOnRectangle className="w-5 h-5" />
            </span>
            <span>Logout</span>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;