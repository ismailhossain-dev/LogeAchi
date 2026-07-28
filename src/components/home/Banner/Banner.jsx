"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  const banners = [
    {
      id: 1,
      img: "/assets/hero-banner-3.png",
      // title: "Luxury Collection 2026",
      // subtitle: "Exclusive Premium Products",
      // desc: "Experience the ultimate sophistication with our curated selection.",
    },
  ];

  return (
    <div className="w-full overflow-clip px-6 md:px-0">
      {/* ১. সেকশনে একটি হালকা সফট বর্ডার ও শ্যাডো দেওয়া হয়েছে যা লাইট থিমে সুন্দর দেখায় */}
      <section className="relative max-w-7xl mx-auto h-[420px] overflow-hidden md:rounded-3xl border border-slate-200/60 shadow-sm ">
        <Swiper
          modules={[Pagination, Autoplay, EffectFade]}
          effect={"fade"}
          fadeEffect={{ crossFade: true }}
          speed={1500}
          // loop={true}
          // autoplay={{
          //   delay: 5000,
          //   disableOnInteraction: false,
          // }}
          // pagination={{
          //   clickable: true,
          // }}
          className="w-full h-full mySwiper"
          style={{ width: "100%" }}
        >
          {banners.map((slide) => (
            <SwiperSlide key={slide.id} className="overflow-hidden">
              <div className="relative w-full h-full">
                <div className="absolute inset-0">
                  <Image
                    src={slide.img}
                    alt="Banner"
                    loading="eager"
                    fill
                    priority
                    className="object-cover object-center"
                  />
                  {/* ২. ডার্ক গ্রেডিয়েন্ট পরিবর্তন করে লাইট-টু-সেমি-ট্রান্সপারেন্ট ওভারলে করা হয়েছে */}
                  {/* এটি হোয়াইট/অফ-হোয়াইট ব্যাকগ্রাউন্ডের সাথে টেক্সটকে নিখুঁত কন্ট্রাস্ট দেবে */}
                  <div className="absolute inset-0"></div>
                </div>

                <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16">
                  <div className="max-w-xl space-y-3">
                    {/* ৩. সাবটাইটেল ব্যাজ কালার ব্লু থেকে অরেঞ্জ থিমে পরিবর্তন করা হয়েছে */}
                    <span className="inline-block px-3 py-1 rounded-full bg-orange-50 text-orange-600 border border-orange-200 text-xs font-bold tracking-widest uppercase">
                      {slide.subtitle}
                    </span>

                    {/* ৪. টাইটেল এবং ডেসক্রিপশন কালার ডার্ক স্লেট (Slate-900 & Slate-600) করা হয়েছে */}
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                      {slide.title}
                    </h1>
                    <p className="text-sm md:text-base text-slate-600 max-w-md line-clamp-2 font-medium">
                      {slide.desc}
                    </p>

                    {/* ৫. বাটনের স্টাইল আপনার লগইন পেজের থিমের সাথে ম্যাচ করে সলিড ব্ল্যাক এবং মডার্ন বর্ডার দেওয়া হয়েছে */}
                    <div className="flex flex-wrap gap-4 pt-20 items-center justify-start ">
                      {/* 🧡 Shop Now Button (Premium Gradient & Glow Effect) */}
                      <Link
                        href="/all-collection"
                        className=" w-full lg:w-auto group relative inline-flex items-center justify-center px-8 py-3.5 
               bg-gradient-to-r from-orange-500 to-red-600 
               text-white text-xs font-extrabold tracking-widest uppercase rounded-xl 
               transition-all duration-300 ease-out
               hover:from-orange-600 hover:to-red-700
               hover:shadow-[0_0_20px_rgba(234,88,12,0.5)] 
               active:scale-95 cursor-pointer overflow-hidden"
                      >
                        {/* শাইনি গ্লাস ইফেক্ট (Hover করলে একটি লাইট স্লাইড করবে) */}
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />

                        <span className="relative flex items-center gap-2 ">
                          Shop Now
                          {/* একটি ডানদিকের ছোট অ্যারো যা হোভার করলে ডানপাশে সরবে */}
                          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                            →
                          </span>
                        </span>
                      </Link>

                      {/* 🤍 About US Button (Modern Glassmorphism & Cyber Outline) */}
                      <Link
                        href="/about-us"
                        className=" w-full lg:w-auto group relative inline-flex items-center justify-center px-8 py-3.5 
               bg-slate-900/40 backdrop-blur-md hover:bg-slate-800/60
               text-slate-200 hover:text-white text-xs font-extrabold tracking-widest uppercase rounded-xl 
               border border-slate-700 hover:border-orange-500/50 
               transition-all duration-300 ease-out
               hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]
               active:scale-95 cursor-pointer"
                      >
                        <span className="relative flex items-center gap-2">
                          About US
                          {/* হোভার করলে প্লাস বা অন্য আইকন ঘুরবে */}
                          <span className="inline-block transition-transform duration-500 group-hover:rotate-180 text-orange-500">
                            +
                          </span>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ৬. পেজিনেশন ডট (Bullets) কালার লাইট থিমের উপযোগী করা হয়েছে */}
        <style jsx global>{`
          html,
          body {
            max-width: 100% !important;
            overflow-x: hidden !important;
          }

          .swiper-pagination-bullet {
            background: #000000 !important;
            opacity: 0.2;
          }
          .swiper-pagination-bullet-active {
            width: 25px !important;
            border-radius: 5px !important;
            background: #ea580c !important; /* Tailwind orange-600 */
            opacity: 1 !important;
          }
        `}</style>
      </section>
    </div>
  );
};

export default Banner;
