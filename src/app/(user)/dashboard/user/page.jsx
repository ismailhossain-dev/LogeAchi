"use client";
import React from "react";
import {
  ShoppingBag,
  Hourglass,
  CheckCircle2,
  Heart,
  ShoppingCart,
  Loader2,
} from "lucide-react";
import UserOrderOverviewChart from "@/components/Dashboard/Charts/UserOrderOverviewChart/UserOrderOverviewChart";
import Link from "next/link";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import LatestOrdersTable from "@/components/Dashboard/Table/LatestOrdersTable";

export default function Dashboard() {
  const axiosSecure = useAxiosSecure();
  const { data: session, status } = useSession();

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-overview", session?.user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `api/dashboardOverview?email=${session.user.email}`,
      );
      return res.data;
    },
    enabled: !!session?.user?.email,
  });

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center gap-3 text-zinc-400 font-medium">
        <div className="flex flex-col items-center justify-center py-24 space-y-4  min-h-screen">
          <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
          <p className="text-xs text-slate-400 tracking-[3px] uppercase font-black animate-pulse">
            Synchronizing Orders...
          </p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      id: 1,
      title: "Total Orders",
      href: "/dashboard/user/my-orders",
      value: data?.totalOrders || 0,
      icon: ShoppingBag,
      iconColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
      borderColor:
        "group-hover:border-indigo-500/40 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]",
    },
    {
      id: 2,
      title: "Pending Orders",
      href: "/dashboard/user/my-orders",
      value: data?.pendingOrders || 0,
      icon: Hourglass,
      iconColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      borderColor:
        "group-hover:border-amber-500/40 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]",
    },
    {
      id: 3,
      title: "Delivered",
      href: "/dashboard/user/my-orders",
      value: data?.deliveredOrders || 0, // dynamic delivered count
      icon: CheckCircle2,
      iconColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      borderColor:
        "group-hover:border-emerald-500/40 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]",
    },
    {
      id: 4,
      title: "Wishlist",
      href: "/dashboard/user/my-wishlist",
      value: data?.totalWishlist || 0,
      icon: Heart,
      iconColor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
      borderColor:
        "group-hover:border-rose-500/40 group-hover:shadow-[0_0_20px_rgba(244,63,94,0.15)]",
    },
    {
      id: 5,
      title: "Cart",
      href: "/dashboard/user/my-cart",
      value: data?.totalCart || 0,
      icon: ShoppingCart,
      iconColor: "text-sky-400 bg-sky-500/10 border-sky-500/20",
      borderColor:
        "group-hover:border-sky-500/40 group-hover:shadow-[0_0_20px_rgba(14,165,233,0.15)]",
    },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 p-4 sm:p-6 md:p-10 lg:p-12 relative overflow-hidden antialiased selection:bg-zinc-800 selection:text-white">
      <div className="max-w-7xl mx-auto space-y-10 md:space-y-12 relative z-10 mb-10">
        {/* 🏆 Header Section */}
        <header className="space-y-2 border-b border-zinc-800/60 pb-6">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-zinc-100 uppercase">
            WELCOME BACK, {data?.userName || "Collector"}
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs font-bold tracking-widest uppercase text-zinc-500">
            <span>Collector Overview</span>
            <span className="text-zinc-800">/</span>
            <span className="text-zinc-400">Intelligence System v3.0</span>
          </div>
        </header>

        {/* 📊 5-Column Stats Grid */}
        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 md:gap-6">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <Link
                href={stat.href}
                key={stat.id}
                className={`group relative rounded-2xl border border-zinc-800/80 bg-[#121214] p-6 
                transition-all duration-400 ease-out hover:-translate-y-1 hover:bg-[#161619] ${stat.borderColor}`}
              >
                <div className="flex flex-col justify-between h-full space-y-8 relative z-10">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-11 h-11 rounded-xl border flex items-center justify-center backdrop-blur-md transition-all duration-500 group-hover:scale-105 ${stat.iconColor}`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover:bg-zinc-600 transition-colors duration-300" />
                  </div>

                  <div className="space-y-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300">
                      {stat.title}
                    </p>
                    <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-mono">
                      {stat.value}
                    </h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </main>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Latest Orders
            </h2>
          </div>

          <LatestOrdersTable data={data} />
        </section>

        <section className="border-t border-zinc-800/60 pt-8">
          <UserOrderOverviewChart />
        </section>
      </div>
    </div>
  );
}
