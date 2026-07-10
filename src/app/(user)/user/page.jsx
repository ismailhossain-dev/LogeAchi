import React from 'react';
import { ShoppingBag, Hourglass, CheckCircle2, Heart, ShoppingCart } from 'lucide-react';
import UserOrderOverviewChart from '@/components/Dashboard/Charts/UserOrderOverviewChart/UserOrderOverviewChart';
import Link from 'next/link';

export default function Dashboard() {
  // প্রতিটি কার্ডের জন্য একদম আলাদা এবং পারফেক্ট আইকন সেট করা হয়েছে
  const stats = [
    {
      id: 1,
      title: 'Total Orders',
      href: "/user/my-orders",
      value: '12',
      icon: ShoppingBag, // অর্ডারের জন্য শপিং ব্যাগ আইকন
      iconColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      borderColor: 'group-hover:border-indigo-500/40 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]',
    },
    {
      id: 2,
      title: 'Pending Orders',
       href: "/user/my-orders",
      value: '2',
      icon: Hourglass, // পেন্ডিংয়ের জন্য ওয়েটিং আওয়ারগ্লাস আইকন
      iconColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      borderColor: 'group-hover:border-amber-500/40 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]',
    },
    {
      id: 3,
      title: 'Delivered',
        href: "/user/my-orders",
      value: '10',
      icon: CheckCircle2, // সাকসেসফুল ডেলিভারির জন্য সার্কেল চেক আইকন
      iconColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      borderColor: 'group-hover:border-emerald-500/40 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]',
    },
    {
      id: 4,
      title: 'Wishlist',
       href: "user/my-wishlist",
      value: '4',
      icon: Heart, // উইশলিস্টের জন্য মডার্ন হার্ট আইকন
      iconColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      borderColor: 'group-hover:border-rose-500/40 group-hover:shadow-[0_0_20px_rgba(244,63,94,0.15)]',
    },
    {
      id: 5,
      title: 'Cart',
       href: "/user/my-cart",
      value: '3',
      icon: ShoppingCart, // কার্টের জন্য শপিং কার্ট আইকন
      iconColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
      borderColor: 'group-hover:border-sky-500/40 group-hover:shadow-[0_0_20px_rgba(14,165,233,0.15)]',
    },
  ];

  return (
    
    <div className="min-h-screen bg-[#09090b] text-zinc-100 p-4 sm:p-6 md:p-10 lg:p-12 relative overflow-hidden antialiased selection:bg-zinc-800 selection:text-white">
      
      <div className="max-w-7xl mx-auto space-y-10 md:space-y-12 relative z-10 mb-10">
        
        {/* 🏆 Clean Header Section */}
        <header className="space-y-2 border-b border-zinc-800/60 pb-6">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-zinc-100">
            WELCOME BACK, HLW SABBIR
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs font-bold tracking-widest uppercase text-zinc-500">
            <span>Collector Overview</span>
            <span className="text-zinc-800">/</span>
            <span className="text-zinc-400">Intelligence System v3.0</span>
          </div>
        </header>

        {/* 📊 Ultra-Clean 5-Column Stats Grid */}
        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 md:gap-6">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <Link href={stat.href }
                key={stat.id}
                className={`group relative rounded-2xl border border-zinc-800/80 bg-[#121214] p-6 
                transition-all duration-400 ease-out hover:-translate-y-1 hover:bg-[#161619] ${stat.borderColor}`}
              >
                {/* Card Content Layout */}
                <div className="flex flex-col justify-between h-full space-y-8 relative z-10">
                  
                  {/* Top Row: Icon & Dot */}
                  <div className="flex items-center justify-between">
                    <div className={`w-11 h-11 rounded-xl border flex items-center justify-center backdrop-blur-md transition-all duration-500 group-hover:scale-105 ${stat.iconColor}`}>
                      <IconComponent className="w-5 h-5 transition-transform duration-300" />
                    </div>
                    {/* Micro dot decoration */}
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover:bg-zinc-600 transition-colors duration-300" />
                  </div>

                  {/* Bottom Row: Text & Figures */}
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
        
      </div>

      {/* ekane ami 5ta recnt order show koro */}
      <p className='text-blue-500 text-3xl font-bold text-center my-20'>ekane ami 5ta recnt order show koro</p>

      {/* 1 years chart */}
      <UserOrderOverviewChart/>
    </div>
  );
}