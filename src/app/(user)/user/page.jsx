import React from 'react';
import { Layers, Activity, ShieldCheck, Gem } from 'lucide-react';

export default function Dashboard() {
  // আপগ্রেড করা প্রিমিয়াম ডেটা অবজেক্ট
  const stats = [
    {
      id: 1,
      title: 'Total Orders',
      value: '1,248',
      icon: Layers, // Modern stacked layers icon
      iconColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      glowColor: 'group-hover:shadow-indigo-500/15 group-hover:border-indigo-500/40',
      gradient: 'from-indigo-500/5 to-transparent',
    },
    {
      id: 2,
      title: 'Pending Orders',
      value: '42',
      icon: Activity, // Live activity pulse icon
      iconColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      glowColor: 'group-hover:shadow-amber-500/15 group-hover:border-amber-500/40',
      gradient: 'from-amber-500/5 to-transparent',
    },
    {
      id: 3,
      title: 'Delivered Orders',
      value: '1,186',
      icon: ShieldCheck, // Verified delivery status icon
      iconColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      glowColor: 'group-hover:shadow-emerald-500/15 group-hover:border-emerald-500/40',
      gradient: 'from-emerald-500/5 to-transparent',
    },
    {
      id: 4,
      title: 'Wishlist / Premium Cart',
      value: '352',
      icon: Gem, // Premium diamond/gem icon for wishlist
      iconColor: 'text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20',
      glowColor: 'group-hover:shadow-fuchsia-500/15 group-hover:border-fuchsia-500/40',
      gradient: 'from-fuchsia-500/5 to-transparent',
    },
  ];

  return (
    <div className="min-h-screen bg-[#030303] text-slate-100 p-6 md:p-12 relative overflow-hidden antialiased 0">
      
      {/* Premium Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-fuchsia-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Header Section */}
        <header className="space-y-2">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
            WELCOME BACK, HLW SABBIR
          </h1>
          <div className="flex items-center gap-2 text-xs md:text-sm font-bold tracking-widest uppercase">
            <span className="text-neutral-500">Collector Overview</span>
            <span className="text-neutral-700">/</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-fuchsia-400">Intelligence System</span>
          </div>
        </header>

        {/* Stats Grid */}
        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.id}
                className={`group relative rounded-2xl border border-neutral-800/60 bg-gradient-to-b from-neutral-900/50 to-neutral-950/70 backdrop-blur-xl p-6 
                transition-all duration-500 ease-out hover:-translate-y-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.5)] ${stat.glowColor}`}
              >
                {/* Dynamic Inner Hover Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none`} />
                
                {/* Card Content Layout */}
                <div className="flex flex-col justify-between h-full space-y-6 relative z-10">
                  
                  {/* Top Row: Icon */}
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center backdrop-blur-md transition-all duration-500 group-hover:scale-110 ${stat.iconColor}`}>
                      <IconComponent className="w-5 h-5 transition-transform duration-500 group-hover:-translate-y-0.5" />
                    </div>
                    {/* Micro dot decoration */}
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-800 group-hover:bg-neutral-600 transition-colors" />
                  </div>

                  {/* Bottom Row: Text & Figures */}
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 group-hover:text-neutral-400 transition-colors duration-300">
                      {stat.title}
                    </p>
                    <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-mono">
                      {stat.value}
                    </h3>
                  </div>

                </div>
              </div>
            );
          })}
        </main>
        
      </div>
    </div>
  );
}