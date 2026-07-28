"use client"
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom"; // 🟢 পোর্টাল তৈরি করার জন্য ইম্পোর্ট
import Image from "next/image";
import { BsCart3 } from "react-icons/bs";
import { FiMinus, FiPlus } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import Link from "next/link";

const ProductModel = ({ 
  showModal, 
  onClose, 
  product, 
  selectedSize, 
  setSelectedSize, 
  quantity, 
  setQuantity, 
  setIsAddedToCart 
}) => {
  const [mounted, setMounted] = useState(false);

  // Next.js SSR (Server-Side Rendering) হ্যান্ডেল করার জন্য মাউন্ট চেক
  useEffect(() => {
    setMounted(true);
    
    // মডাল যখন ওপেন থাকবে তখন পেছনের মেইন বডি স্ক্রোল হওয়া বন্ধ রাখবে
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showModal]);

  // মডাল ওপেন না থাকলে বা ক্লায়েন্ট সাইডে মাউন্ট না হলে কিছুই রেন্ডার হবে না
  if (!showModal || !product || !mounted) return null;

  const { title,_id,  price, image, sizes = ["S", "M", "L", "XL"], description } = product;

  const decreaseQty = () => quantity > 1 && setQuantity(quantity - 1);
  const increaseQty = () => setQuantity(quantity + 1);

  // 🟢 মডালের মূল UI কন্টেন্ট
  const modalContent = (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* ব্যাকড্রপ ওভারলে ক্লিক করলে মডাল ক্লোজ হবে */}
      <div className="fixed inset-0 cursor-pointer" onClick={onClose} />

      {/* মডাল মেইন বক্স */}
      <div className="bg-[#070b13] border border-slate-800/80 w-full max-w-[450px] md:max-w-3xl rounded-3xl shadow-2xl relative my-auto animate-in zoom-in-95 duration-200 z-10 overflow-hidden">
        
        {/* 🔮 Background Premium Glow */}
        <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />

        {/* ক্লোজ বাটন */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-white rounded-xl transition cursor-pointer z-30 hover:scale-105 active:scale-[0.95]"
          aria-label="Close modal"
        >
          <MdClose size={18} />
        </button>

        {/* কন্টেন্ট গ্রিড লেআউট */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 p-5 sm:p-8 max-h-[90vh] md:max-h-[85vh] overflow-y-auto mobile-scrollbar">
          
          {/* 🖼️ বাম পাশ: ইমেজ */}
          <div className="md:col-span-5 flex items-center justify-center w-full">
            <div className="w-full h-[260px] sm:h-[320px] md:h-auto md:aspect-[3/5] rounded-2xl overflow-hidden bg-slate-950 border border-slate-700/50 p-1 shadow-2xl relative group shrink-0">
              <Image 
                src={image} 
                alt={title} 
                fill 
                className="object-cover rounded-xl transition-transform duration-700 group-hover:scale-105" 
                priority 
                sizes="(max-w-768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* 📝 ডান পাশ: প্রোডাক্ট ইনফো */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <h2 className="text-lg sm:text-2xl font-black text-white tracking-wide leading-tight pr-10">
                {title}
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed max-h-[80px] overflow-y-auto">
                {description || "Discover the perfect blend of style and comfort with this premium product."}
              </p>
            </div>

            {/* 🏷️ সাইজ এবং কোয়ান্টিটি */}
            <div className="space-y-3 border-t border-slate-800/40 pt-3">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Select Size</span>
                <div className="flex flex-wrap gap-1.5">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[38px] h-8 px-2.5 text-[11px] font-bold rounded-lg border transition-all flex items-center justify-center cursor-pointer ${
                        selectedSize === size
                          ? "bg-blue-600 text-white border-blue-500 shadow-[0_0_12px_rgba(37,99,235,0.3)]"
                          : "bg-[#070b13] text-slate-300 border-slate-800 hover:border-slate-600"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Quantity Requested</span>
                <div className="flex items-center w-24 h-8 border border-slate-800 rounded-xl p-0.5 bg-[#070b13]">
                  <button onClick={decreaseQty} className="flex-1 h-full flex items-center justify-center hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition cursor-pointer">
                    <FiMinus className="text-[10px]" />
                  </button>
                  <span className="flex-1 text-center font-mono text-[11px] font-bold text-white">{quantity}</span>
                  <button onClick={increaseQty} className="flex-1 h-full flex items-center justify-center hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition cursor-pointer">
                    <FiPlus className="text-[10px]" />
                  </button>
                </div>
              </div>
            </div>

            {/* 💰 প্রাইস ও অ্যাকশন বাটন */}
            <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-4 space-y-3 shadow-inner">
              <div className="flex justify-between items-end">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Price</span>
                <span className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-mono">
                  ৳{price * quantity}
                </span>
              </div>

              <div className="flex gap-2">
                <Link href={`/checkout/${_id}`}
                  onClick={() => {
                    setIsAddedToCart(true);
                    onClose();
                  }}
                  className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_20px_rgba(37,99,235,0.2)] cursor-pointer active:scale-[0.99]"
                >
                  <BsCart3 className="text-xs" /> Add To Cart
                </Link>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );

  // 🟢 createPortal ব্যবহার করে কন্টেন্ট সরাসরি document.body তে পাঠিয়ে দেওয়া হলো
  return createPortal(modalContent, document.body);
};

export default ProductModel;