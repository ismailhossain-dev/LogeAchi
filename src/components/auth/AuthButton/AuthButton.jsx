"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {
  FiLogIn,
  FiLogOut,
  FiUser,
  FiChevronDown,
  FiGrid,
  FiShoppingBag,
  FiHeart,
  FiShield,
} from "react-icons/fi";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

const AuthButton = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  const { data: users, isLoading: isUserLoading } = useQuery({
    queryKey: ["user", session?.user?.email || ""],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/user?email=${session?.user?.email}`,
      );
      return res.data;
    },
    enabled: !!session?.user?.email,
  });

  if (status === "loading") {
    return (
      <div className="w-8 h-8 flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-red-500/20 border-t-red-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  const userProfileImage = users?.result?.image || users?.image;
  const userName =
    users?.result?.name || users?.name || session?.user?.name || "User";
  const userEmail =
    users?.result?.email || users?.email || session?.user?.email || "No Email";
  
  // ইউজারের রোল চেক করা (admin বা user)
  const userRole = users?.result?.role || users?.role || "user";
  const isAdmin = userRole === "admin";

  // রোল অনুযায়ী ডায়নামিক ড্রপডাউন সেকশন
  const dropdownSections = isAdmin
    ? [
        {
          title: "Admin Control",
          items: [
            {
              name: "Dashboard Overview",
              href: "/dashboard/admin",
              icon: <FiGrid className="w-4 h-4" />,
            },
            {
              name: "Manage Orders",
              href: "/dashboard/admin/manage-orders",
              icon: <FiShoppingBag className="w-4 h-4" />,
            },
            {
              name: "Manage Users",
              href: "/dashboard/admin/manage-users",
              icon: <FiUser className="w-4 h-4" />,
            },
            {
              name: "Manage Wishlist",
              href: "/dashboard/admin/manage-wishlist",
              icon: <FiHeart className="w-4 h-4" />,
            },
          ],
        },
      ]
    : [
        {
          title: "Personal Space",
          items: [
            {
              name: "Overview",
              href: "/dashboard/user",
              icon: <FiGrid className="w-4 h-4" />,
            },
            {
              name: "My Profile",
              href: "/dashboard/user/my-profile",
              icon: <FiUser className="w-4 h-4" />,
            },
          ],
        },
        {
          title: "Shopping Activity",
          items: [
            {
              name: "My Orders",
              href: "/dashboard/user/my-orders",
              icon: <FiShoppingBag className="w-4 h-4" />,
            },
            {
              name: "My Wishlist",
              href: "/dashboard/user/my-wishlist",
              icon: <FiHeart className="w-4 h-4" />,
            },
          ],
        },
      ];

  return (
    <div className="relative inline-block text-left select-none">
      {status === "authenticated" ? (
        <div className="relative flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center gap-2.5 p-1 pr-3 rounded-full border transition-all duration-300 backdrop-blur-md focus:outline-none
              ${
                isOpen
                  ? "bg-red-600/10 border-red-500/40 text-white"
                  : "bg-white/5 hover:bg-white/10 border-white/10 text-white/90"
              }`}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 text-white flex items-center justify-center font-bold text-sm shadow-inner overflow-hidden relative shrink-0">
              {isUserLoading ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : userProfileImage ? (
                <Image
                  src={userProfileImage}
                  alt="profile image"
                  fill
                  sizes="32px"
                  className="object-cover"
                  priority
                />
              ) : (
                <span className="uppercase">{userName.charAt(0)}</span>
              )}
            </div>

            <FiChevronDown
              className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-red-500" : ""}`}
            />
          </button>

          {isOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsOpen(false)}
              ></div>

              <div className="absolute right-0 top-full mt-2.5 w-64 bg-[#121214] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl py-3 z-20 origin-top-right animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 pb-3 mb-2 border-b border-white/5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-600/10 text-red-500 flex items-center justify-center font-bold text-lg border border-red-500/20 overflow-hidden relative shrink-0">
                    {isUserLoading ? (
                      <div className="w-4 h-4 border-2 border-red-500/20 border-t-red-500 rounded-full animate-spin"></div>
                    ) : userProfileImage ? (
                      <Image
                        src={userProfileImage}
                        alt="profile"
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="uppercase">{userName.charAt(0)}</span>
                    )}
                  </div>

                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold text-white truncate">
                        {userName}
                      </p>
                      {isAdmin && (
                        <span className="bg-red-600/20 text-red-400 text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded border border-red-500/30">
                          Admin
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-400 truncate mt-0.5">
                      {userEmail}
                    </p>
                  </div>
                </div>

                {dropdownSections.map((section, idx) => (
                  <div
                    key={section.title}
                    className={`${idx > 0 ? "border-t border-white/5 mt-2.5 pt-2.5" : ""}`}
                  >
                    <span className="block px-4 text-[9px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">
                      {section.title}
                    </span>

                    {section.items.map((route) => (
                      <Link
                        key={route.name}
                        href={route.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-white/5 text-gray-300 hover:text-white transition-all group"
                      >
                        <span className="text-gray-400 group-hover:text-red-500 transition-colors duration-200 shrink-0">
                          {route.icon}
                        </span>
                        <span className="text-sm font-medium">
                          {route.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                ))}

                <div className="border-t border-white/5 mt-3 pt-2">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      signOut({ callbackUrl: "/login" });
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all font-medium group text-left cursor-pointer"
                  >
                    <FiLogOut className="w-4 h-4 text-red-400/70 group-hover:text-red-400 transition-colors shrink-0" />
                    <div>
                      <p className="leading-none font-semibold">Logout</p>
                      <p className="text-[9px] text-red-400/40 mt-1">
                        End your current session
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <Link
          href="/login"
          className="inline-flex items-center justify-center gap-2 px-5 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs tracking-wider rounded-full transition-all duration-300 shadow-lg shadow-red-950/20 active:scale-95 border border-red-500/20 cursor-pointer"
        >
          <FiLogIn className="w-3.5 h-3.5" />
          LOGIN
        </Link>
      )}
    </div>
  );
};

export default AuthButton;