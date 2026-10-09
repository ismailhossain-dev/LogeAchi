"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const Banner = () => {
  const banners = [
    {
      id: 1,
      subtitle: "New Collection 2026",
      title: "THEY WILL STARE, MAKE IT WORTH!",
      desc: "We design clothing that looks good and feels comfortable on a daily basis. The true goal is to inspire people to live with unique style.",
      image: "https://res.cloudinary.com/ddfgi0gdr/image/upload/v1791539379/premium_photo-1727967291566-f9667986d9f9_daf9me.avif",
    },
    {
      id: 2,
      subtitle: "Exclusive Trend",
      title: "ELEVATE YOUR EVERYDAY STYLE",
      desc: "Discover premium fabrics, modern cuts, and timeless fashion pieces designed to make you stand out effortlessly.",
      image: "https://res.cloudinary.com/ddfgi0gdr/image/upload/v1791539379/photo-1777969382420-baf6511198bb_ysxwtc.avif",
    },
  ];

  return (
    <div className="w-full overflow-hidden bg-[#0b0c10]">
      <section className="relative w-full h-[480px] sm:h-[560px] lg:h-[600px] overflow-hidden shadow-2xl">
        <Swiper
          modules={[Pagination, Autoplay, EffectFade]}
          effect={"fade"}
          fadeEffect={{ crossFade: true }}
          speed={1500}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="w-full h-full mySwiper"
        >
          {banners.map((slide) => (
            <SwiperSlide key={slide.id} className="relative w-full h-full overflow-hidden">
              
              {/* Full Width & Height Image covering entire container */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  loading="eager"
                  fill
                  priority
                  className="object-cover object-center scale-105 hover:scale-100 transition-transform duration-1000"
                />
              </div>

              {/* Dark Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/65 to-black/30 z-10" />

              {/* Content Area */}
              <div className="relative z-20 h-full flex flex-col justify-center px-6 sm:px-16 lg:px-24 max-w-3xl">
                <div className="space-y-4">
                  {/* Subtitle Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-500/30 text-red-500 text-xs font-black tracking-widest uppercase backdrop-blur-md">
                    <Sparkles size={14} />
                    {slide.subtitle}
                  </div>

                  {/* Main Title */}
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-lg uppercase">
                    {slide.title.split(" ").slice(0, 3).join(" ")}{" "}
                    <span className="text-red-600 block sm:inline">
                      {slide.title.split(" ").slice(3).join(" ")}
                    </span>
                  </h1>

                  {/* Description */}
                  <p className="text-slate-300 text-xs sm:text-sm font-medium max-w-lg line-clamp-3 leading-relaxed">
                    {slide.desc}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <Link
                      href="/all-collection"
                      className="bg-white hover:bg-slate-100 text-slate-900 font-extrabold uppercase text-xs tracking-widest py-3.5 px-8 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 group cursor-pointer"
                    >
                      Explore New Collection
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-red-600" />
                    </Link>

                    <Link
                      href="/mens-collections"
                      className="bg-transparent hover:bg-white/10 text-white font-extrabold uppercase text-xs tracking-widest py-3.5 px-8 rounded-xl backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Swiper Pagination Styling */}
        <style jsx global>{`
          .swiper-pagination {
            bottom: 24px !important;
            left: auto !important;
            right: 40px !important;
            width: auto !important;
            text-align: right !important;
          }
          .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            background: rgba(255, 255, 255, 0.4) !important;
            opacity: 1;
            transition: all 0.3s ease;
          }
          .swiper-pagination-bullet-active {
            width: 32px !important;
            border-radius: 6px !important;
            background: #dc2626 !important;
          }
        `}</style>
      </section>
    </div>
  );
};

export default Banner;