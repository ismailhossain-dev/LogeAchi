"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsCart3 } from "react-icons/bs";
import { FiMinus, FiPlus } from "react-icons/fi";
import { Calendar, Tag } from "lucide-react";

const DetailsCard = ({ product }) => {
  if (!product) {
    return (
      <div className="min-h-[500px] flex items-center justify-center bg-[#0f172a]">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold text-slate-400 tracking-wider uppercase font-mono">
            Loading Premium Details...
          </p>
        </div>
      </div>
    );
  }

  const {
    title = "Product Title",
    price = 0,
    oldPrice: customOldPrice,
    image = "",
    images: productImages = [],
    colors = [],
    category = "General",
    stock = false,
    size: sizes = [],
    description = "",
    sku = "N/A",
    date,
    _id,
  } = product;

  // থাম্বনেইল গ্যালারি সেটআপ
  const galleryImages = productImages.length > 0 ? productImages : [image].filter(Boolean);

  // স্টেট ম্যানেজমেন্ট
  const [mainImage, setMainImage] = useState(image);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (image) setMainImage(image);
    if (colors?.length > 0) setSelectedColor(colors[0].name);
    if (sizes?.length > 0) setSelectedSize(sizes[0]);
    setQuantity(1);
  }, [product._id, title, image]);

  // ওল্ড প্রাইস ক্যালকুলেশন
  const displayedOldPrice = customOldPrice
    ? Number(customOldPrice).toFixed(2)
    : (price * 1.25).toFixed(2);

  return (
    <div className="bg-[#0f172a] min-h-screen text-slate-100 antialiased relative overflow-hidden py-12 sm:py-16">
      
      {/* 🔮 Integrated Luxury Ambient Glows (Optimized for #0f172a) */}
      <div className="absolute top-10 left-10 w-[400px] h-[400px] bg-blue-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[350px] h-[350px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start">
          
          {/* ================= বাম পাশ: ইমেজ গ্যালারি ================= */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-[#1e293b]/30 border border-slate-700/50 p-1.5 shadow-2xl group">
              {mainImage ? (
                <Image
                  src={mainImage}
                  alt={title}
                  fill
                  priority
                  sizes="(max-w-7xl) 50vw, 100vw"
                  className="object-cover object-center rounded-2xl transition-transform duration-700 ease-out group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500 font-medium font-mono text-sm">
                  No Preview Image Available
                </div>
              )}

              {/* স্ট্যাটাস ব্যাজ ওভারলে */}
              {!stock && (
                <div className="absolute top-5 left-5 bg-red-600/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-xl shadow-lg border border-red-500/30">
                  Sold Out
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* থাম্বনেইল লিস্ট */}
            {galleryImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3 sm:gap-4">
                {galleryImages.map((img, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setMainImage(img)}
                    className={`relative aspect-square rounded-2xl overflow-hidden bg-[#1e293b]/40 p-0.5 border transition-all duration-300 cursor-pointer ${
                      mainImage === img
                        ? "border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)] scale-[0.96]"
                        : "border-slate-700/60 opacity-60 hover:opacity-100 hover:border-slate-500"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      sizes="20vw"
                      className="object-cover rounded-xl"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ================= ডান পাশ: প্রোডাক্ট ইনফরমেশন ================= */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6 lg:space-y-8">
            
            <div className="space-y-4">
              {/* ক্যাটাগরি ও স্টক স্ট্যাটাস */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1e293b]/60 border border-slate-700/50 text-slate-300 rounded-lg text-xs font-bold tracking-widest uppercase font-mono">
                  <Tag size={12} className="text-blue-400" /> {category}
                </span>
                
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide border font-mono ${
                    stock
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full mr-2 ${stock ? "bg-emerald-400 animate-pulse" : "bg-rose-400"}`} />
                  {stock ? "In Stock" : "Unavailable"}
                </span>
              </div>

              {/* প্রোডাক্ট মেইন টাইটেল */}
              <h1 className="text-2xl sm:text-4xl font-black tracking-wide text-white leading-tight">
                {title}
              </h1>

              {/* SKU & Date */}
              <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                <span>SKU: <span className="text-slate-200">{sku}</span></span>
                {date && (
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {date}
                  </span>
                )}
              </div>

              {/* থিম ম্যাচিং জোরালো প্রাইস কার্ড */}
              <div className="flex items-center gap-4 bg-[#1e293b]/40 p-4 sm:p-5 rounded-2xl border border-slate-700/50 shadow-inner relative">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-mono">
                    ৳{Number(price).toFixed(2)}
                  </span>
                  <span className="text-sm sm:text-base text-slate-400 line-through font-medium font-mono">
                    ৳{displayedOldPrice}
                  </span>
                </div>
                <span className="ml-auto text-[10px] font-black text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-md tracking-wider font-mono">
                  25% SAVED
                </span>
              </div>

              {/* ডেসক্রিপশন বক্স */}
              <div className="pt-2">
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {description || "Discover the perfect blend of style and comfort with this premium product. Crafted with care using high-quality materials to ensure long-lasting durability."}
                </p>
              </div>
            </div>

            {/* কনফিগারেশন সেকশন */}
            <div className="space-y-6 border-t border-slate-800 pt-6">
              
              {/* কালার সিলেক্টর */}
              {colors?.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-3 font-mono">
                    Color Variation: <span className="text-blue-400 font-semibold">{selectedColor}</span>
                  </h3>
                  <div className="flex flex-wrap items-center gap-3">
                    {colors.map((color) => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-8 h-8 rounded-full transition-all duration-300 relative cursor-pointer ${color.class || "bg-slate-700"} ${
                          selectedColor === color.name
                            ? "ring-2 ring-offset-4 ring-offset-[#0f172a] ring-blue-500 scale-110 shadow-lg"
                            : "hover:scale-105 opacity-80 hover:opacity-100"
                        }`}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* সাইজ সিলেক্টর */}
              {sizes?.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold tracking-wider text-slate-400 uppercase font-mono">
                      Select Size
                    </span>
                    {selectedSize && (
                      <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-md font-mono">
                        Active: {selectedSize}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[46px] h-10 px-3.5 text-xs font-bold rounded-xl border transition-all duration-300 uppercase tracking-wide flex items-center justify-center cursor-pointer ${
                          selectedSize === size
                            ? "bg-blue-600 text-white border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                            : "bg-[#0f172a] text-slate-300 border-slate-700 hover:border-slate-500 hover:bg-[#1e293b]"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* কোয়ান্টিটি সিলেক্টর */}
              <div>
                <span className="text-xs font-bold tracking-wider text-slate-400 uppercase block mb-3 font-mono">
                  Quantity
                </span>
                <div className="flex items-center w-32 h-11 border border-slate-700/60 bg-[#0f172a] rounded-xl p-1 shadow-inner">
                  <button
                    type="button"
                    onClick={() => quantity > 1 && setQuantity((p) => p - 1)}
                    disabled={quantity <= 1}
                    className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#1e293b] rounded-lg transition-colors cursor-pointer disabled:opacity-20 disabled:hover:bg-transparent"
                  >
                    <FiMinus size={14} />
                  </button>
                  <span className="flex-1 text-center font-bold text-sm text-white font-mono select-none">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((p) => p + 1)}
                    className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#1e293b] rounded-lg transition-colors cursor-pointer"
                  >
                    <FiPlus size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* কার্ট বাটন সেকশন */}
            <div className="pt-4">
              <Link href={`/checkout/${_id}`} className="block w-full">
                <button
                  type="button"
                  disabled={!stock}
                  className={`w-full h-14 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all duration-300 border cursor-pointer active:scale-[0.99] ${
                    stock
                      ? "btn "
                      : "bg-slate-800 text-slate-500 border-slate-700/40 cursor-not-allowed"
                  }`}
                >
                  <BsCart3 size={15} />
                  {stock ? 'Add to Cart / Proceed' : 'Out of Stock'}
                </button>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsCard;