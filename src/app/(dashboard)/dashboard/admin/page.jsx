import SalesAnalyticsChart from "@/components/admin/chart/SalesAnalyticsChart/SalesAnalyticsChart";
import React from "react";
import Link from "next/link";
import { 
  HiOutlineShoppingBag, 
  HiOutlineUsers, 
  HiOutlineShoppingCart, 
  HiOutlineHeart, 
  HiOutlineArrowUpRight 
} from "react-icons/hi2";

// server components data fetch
async function getOverviewData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/admin/overview`, {
      cache: "no-store", // রিয়েল-টাইম ডাটার জন্য নো-ক্যাশ
    });

    if (!res.ok) {
      throw new Error("Failed to fetch overview data");
    }

    const data = await res.json();
    return data?.data || data;
  } catch (error) {
    console.log("Error fetching overview:", error);
    return null;
  }
}

const AdminOverview = async () => {
  const overview = await getOverviewData();

  //console.log(overview, "overview");

  const stats = [
    {
      title: "Total Cart Items",
      value: overview?.cart || "0",
      change: "+12.5%",
      isPositive: true,
      icon: <HiOutlineShoppingCart className="w-6 h-6 text-red-500" />,
      href: "/dashboard/admin/manage-cart", // আপনার রুট অনুযায়ী পাথ দিন
    },
    {
      title: "Total Orders",
      value: overview?.orders || "0",
      change: "+8.2%",
      isPositive: true,
      icon: <HiOutlineShoppingBag className="w-6 h-6 text-red-500" />,
      href: "/dashboard/admin/manage-orders",
    },
    {
      title: "Registered Users",
      value: overview?.users || "0",
      change: "+5.4%",
      isPositive: true,
      icon: <HiOutlineUsers className="w-6 h-6 text-red-500" />,
      href: "/dashboard/admin/manage-users",
    },
    {
      title: "Wishlist Items",
      value: overview?.wishlist || "0",
      change: "-1.2%",
      isPositive: false,
      icon: <HiOutlineHeart className="w-6 h-6 text-red-500" />,
      href: "/dashboard/admin/manage-wishlist",
    },
  ];

  return (
    <div className="min-h-screen text-slate-200 p-4 sm:p-6 lg:p-8 font-sans antialiased space-y-8">
      
      {/* Top Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-950/40 backdrop-blur-xl border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-1 relative z-10">
          <span className="inline-block px-3 py-1 rounded-full bg-red-600/10 border border-red-500/30 text-red-500 text-[10px] font-black tracking-widest uppercase">
            Admin Control Center
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Dashboard <span className="text-red-600">Overview</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm font-medium">
            Welcome back, Admin. Here is the real-time analytics and performance metrics of your clothing store.
          </p>
        </div>
        <div className="flex items-center gap-3 relative z-10">
          <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-2xl text-xs font-mono font-bold text-slate-300 shadow-inner">
            Status: <span className="text-emerald-400">● Live</span>
          </div>
        </div>
      </div>

      {/* Stat Cards Grid with Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((item, idx) => (
          <Link 
            key={idx}
            href={item.href}
            className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 p-6 rounded-3xl shadow-xl hover:border-red-500/50 hover:bg-slate-900/60 transition-all duration-300 group flex flex-col justify-between space-y-4 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-2xl shadow-inner group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <span className={`inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2.5 py-1 rounded-xl ${
                item.isPositive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}>
                {item.change}
                <HiOutlineArrowUpRight className="w-3 h-3" />
              </span>
            </div>

            <div className="space-y-1">
              <p className="text-[11px] uppercase tracking-wider font-bold text-slate-500">{item.title}</p>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-mono">{item.value}</h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Order & Sales Chart Component */}
      <SalesAnalyticsChart />

    </div>
  );
};

export default AdminOverview;