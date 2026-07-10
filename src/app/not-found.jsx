import Link from 'next/link';
import React from 'react';

function PageNotFound() {
  return (
    <div className=" min-h-screen w-full bg-[#050508] flex items-center justify-center  relative overflow-hidden font-sans select-none">
      
      {/* 🌌 Cyberpunk / Premium Grid Background Overlay */}
      <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:32px_32px]"></div>
      
      {/* 🔮 Dynamic Ambient Glow Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[600px] bg-gradient-to-tr from-orange-500/5 to-transparent blur-[160px] rounded-full pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* 📦 Ultra-Premium Full Width Glassmorphic Content Card */}
      {/* max-w-xl থেকে পরিবর্তন করে max-w-7xl এবং w-full করা হয়েছে */}
      <div className="max-w-7xl w-full text-center bg-gradient-to-b from-white/[0.03] to-transparent backdrop-blur-3xl border border-white/[0.06] p-12  rounded-[40px] shadow-[0_32px_100px_-20px_rgba(0,0,0,0.8)] relative z-10 transition-all duration-500 hover:border-white/[0.12] group">
        
        {/* 404 Large Typography Component */}
        <div className="relative  flex justify-center items-center">
          <h1 className="text-[22vw] sm:text-[14vw] font-black tracking-[-0.06em] leading-none select-none relative z-10">
            <span className="bg-gradient-to-b from-[#fca311] via-white to-white bg-clip-text text-transparent drop-shadow-[0_8px_24px_rgba(252,163,17,0.15)]">
              4
            </span>
            <span className="inline-block relative text-white mx-[-0.01em] opacity-90">
              0
              {/* Central Glowing Oracle Core inside the '0' */}
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 sm:w-8 h-4 sm:h-8 rounded-full bg-[#fca311] shadow-[0_0_40px_10px_rgba(252,163,17,0.6)] group-hover:scale-125 transition-transform duration-500"></span>
            </span>
            <span className="bg-gradient-to-b from-[#fca311] via-white to-white bg-clip-text text-transparent drop-shadow-[0_8px_24px_rgba(252,163,17,0.15)]">
              4
            </span>
          </h1>
        </div>

        {/* Messaging & Descriptions */}
        <div className="space-y-6 mb-12 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-bold text-[#fca311] tracking-[0.25em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#fca311] animate-ping"></span>
            Error Code: Route_Not_Found
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Lost In The Besto?
          </h2>
          
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
            The masterpiece you are looking for might have been archived, deleted, or never existed in our digital collection. Let's redirect you back to active trends.
          </p>
        </div>

        {/* 🛠️ Modern Call To Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-8 border-t border-white/[0.06] max-w-md mx-auto">
          
          {/* Primary Action Button */}
          <Link 
            href="/" 
            className="group/btn w-full sm:w-auto px-10 py-4.5 bg-[#fca311] hover:bg-white text-black font-bold text-xs tracking-[0.15em] uppercase rounded-xl transition-all duration-300 active:scale-95 text-center flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(252,163,17,0.25)] hover:shadow-[0_4px_30px_rgba(255,255,255,0.2)]"
          >
            Back To Home
            <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover/btn:translate-x-1">
              <path d="M1 6H13M13 6L8.5 1.5M13 6L8.5 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>

          {/* Secondary Action Button */}
          <Link 
            href="/all-collection" 
            className="w-full sm:w-auto px-10 py-4.5 bg-transparent hover:bg-white/[0.04] text-white border border-white/[0.08] hover:border-white/[0.2] font-bold text-xs tracking-[0.15em] uppercase rounded-xl transition-all duration-300 active:scale-95 text-center"
          >
            Explore Shop
          </Link>
          
        </div>

      </div>
    </div>
  );
}

export default PageNotFound;