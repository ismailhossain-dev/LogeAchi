"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FiLogIn, FiLogOut, FiUser, FiChevronDown } from "react-icons/fi";

const AuthButton = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  // ইউজারের নামের প্রথম অক্ষর নেওয়ার জন্য (যদি নাম থাকে)
  const userInitial = session?.user?.name ? session.user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="relative inline-block text-left">
      {status === "authenticated" ? (
        <div>
          {/* প্রোফাইল ট্রিগার বাটন */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 p-1.5 pr-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full transition-all duration-200 select-none border border-gray-200 dark:border-gray-700"
          >
            {/* ইউজার ইমেজ প্লেসহোল্ডার (ভবিষ্যতে এখানে img ট্যাগ বসাতে পারবেন) */}
            <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              {userInitial}
            </div>
            
            {/* <span className="text-sm font-medium text-gray-700 dark:text-gray-200 max-w-[100px] truncate">
              {session?.user?.name || "User"}
            </span> */}
            <FiChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
          </button>

          {/* ড্রপডাউন মেনু */}
          {isOpen && (
            <>
              {/* ব্যাকড্রপ - বাইরে ক্লিক করলে মেনু বন্ধ হওয়ার জন্য */}
              <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>

              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 z-20 py-2 overflow-hidden transform origin-top-right transition-all duration-300">
                {/* ইউজার ইনফো সেকশন */}
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg">
                    {userInitial}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                      {session?.user?.name || "No Name"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {session?.user?.email || "No Email"}
                    </p>
                  </div>
                </div>

                {/* মেনু অপশনস */}
                <div className="p-1">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <FiUser className="w-4 h-4 text-gray-400" />
                    My Profile
                  </Link>

                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors text-left"
                  >
                    <FiLogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        /* লগইন বাটন */
        <Link
          href="/login"
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-orange-600 text-white font-semibold text-[16px] rounded-xl transition-all duration-300 shadow-md hover:shadow-orange-600/20 active:scale-[0.98]"
        >
          <FiLogIn className="w-4 h-4" />
          Login
        </Link>
      )}
    </div>
  );
};

export default AuthButton;