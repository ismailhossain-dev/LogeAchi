import Link from 'next/link';
import React from 'react';
import { ShoppingBag, ArrowRight, Home } from 'lucide-react';

function PageNotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden font-sans select-none bg-[#0b0c10] px-4">
      
      {/* Background Decorative Grids & Glows */}
      <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:32px_32px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[500px] bg-gradient-to-tr from-red-600/10 to-transparent blur-[160px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-red-500/5 blur-[120px] pointer-events-none" />

      {/* Main Container Card */}
      <div className="max-w-4xl w-full text-center bg-[#141620]/80 backdrop-blur-3xl border border-white/10 p-8 sm:p-14 rounded-[36px] shadow-[0_32px_100px_-20px_rgba(0,0,0,0.9)] relative z-10 transition-all duration-500 hover:border-red-500/30 group">
        
        {/* 404 Large Typography */}
        <div className="relative flex justify-center items-center">
          <h1 className="text-[24vw] sm:text-[14vw] font-black tracking-[-0.06em] leading-none select-none relative z-10">
            <span className="bg-gradient-to-b from-red-600 via-white to-white bg-clip-text text-transparent drop-shadow-[0_8px_24px_rgba(220,38,38,0.25)]">
              4
            </span>
            <span className="inline-block relative text-white mx-[-0.02em] opacity-90">
              0
              {/* Glowing Red Core inside the '0' */}
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 sm:w-8 h-4 sm:h-8 rounded-full bg-red-600 shadow-[0_0_40px_15px_rgba(220,38,38,0.6)] group-hover:scale-125 transition-transform duration-500"></span>
            </span>
            <span className="bg-gradient-to-b from-red-600 via-white to-white bg-clip-text text-transparent drop-shadow-[0_8px_24px_rgba(220,38,38,0.25)]">
              4
            </span>
          </h1>
        </div>

        {/* Messaging & Descriptions tailored for Clothing E-commerce */}
        <div className="space-y-4 mb-10 max-w-xl mx-auto -mt-4 sm:-mt-8">
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-600/10 border border-red-500/30 text-red-500 text-xs font-black tracking-widest uppercase">
            Page Not Found
          </span>
          
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
            Lost Your Style Path?
          </h2>
          
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-medium">
            The collection or page you are looking for might have been moved, sold out, or is temporarily unavailable. Let us guide you back to our latest trends.
          </p>
        </div>

        {/* Call To Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-white/10 max-w-md mx-auto">
          
          {/* Primary Action Button */}
          <Link 
            href="/" 
            className="group/btn w-full sm:w-auto px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs tracking-widest uppercase rounded-xl transition-all duration-300 active:scale-95 text-center flex items-center justify-center gap-2 shadow-lg shadow-red-600/25 cursor-pointer"
          >
            <Home size={16} />
            Back To Home
            <ArrowRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>

          {/* Secondary Action Button */}
          <Link 
            href="/all-collection" 
            className="w-full sm:w-auto px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 font-bold text-xs tracking-widest uppercase rounded-xl transition-all duration-300 active:scale-95 text-center flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag size={16} className="text-red-500" />
            Explore Collection
          </Link>
          
        </div>

      </div>
    </div>
  );
}

export default PageNotFound;