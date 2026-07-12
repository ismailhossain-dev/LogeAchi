"use client"
import React from "react";
import Image from "next/image";
import { BsCart3 } from "react-icons/bs";
import { FiMinus, FiPlus } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { Calendar } from "lucide-react";

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
  // মডাল ওপেন না থাকলে কিছুই রেন্ডার হবে না
  if (!showModal || !product) return null;

  const { title, price, image, sizes = ["S", "M", "L", "XL"], description } = product;

  const decreaseQty = () => quantity > 1 && setQuantity(quantity - 1);
  const increaseQty = () => setQuantity(quantity + 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      {/* ব্যাকড্রপ ওভারলে */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* মডাল মেইন বক্স (সর্বোচ্চ বড় এবং লাক্সারি লুকের জন্য max-w-4xl করা হয়েছে) */}
      <div className="bg-[#070b13] border border-slate-800/80 w-full max-w-[600px] md:max-w-3xl rounded-3xl overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300 z-10">
        
        {/* 🔮 Background Premium Glow */}
        <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />

        {/* ক্লোজ বাটন */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white rounded-xl transition cursor-pointer z-20 hover:scale-105 active:scale-[0.95]"
          aria-label="Close modal"
        >
          <MdClose size={18} />
        </button>

        {/* গ্রিড লেআউট (Mobile-এ উপরে-নিচে, Desktop-এ পাশাপাশি সমান সাইজ) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 p-6 sm:p-10 max-h-[90vh] overflow-y-auto">
          
          {/* 🖼️ বাম পাশ: প্রিমিয়াম বিগ ইমেজ প্রিভিউ */}
       <div className="md:col-span-5 flex items-center justify-center w-full">
  {/* মোবাইল স্ক্রিনে ফিক্সড হাইট h-[380px] এবং md স্ক্রিন থেকে প্রিমিয়াম aspect-[3/5] কাজ করবে */}
  <div className="w-full h-[380px] md:h-auto md:aspect-[3/5] rounded-2xl overflow-hidden bg-slate-950 border border-slate-700/50 p-1 shadow-2xl relative group">
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

          {/* 📝 ডান পাশ: প্রোডাক্ট ইনফরমেশন ও ফর্ম কন্ট্রোল */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              
              <h2 className="text-xl sm:text-3xl font-black text-white tracking-wide leading-tight">
                {title}
              </h2>
              
              

              {/* ডেসক্রিপশন */}
              <p className="text-xs text-slate-400 leading-relaxed">
                {description || "Discover the perfect blend of style and comfort with this premium product. Crafted with care using high-quality materials to ensure long-lasting durability."}
              </p>
            </div>

            {/* 🏷️ সাইজ এবং কোয়ান্টিটি সিলেক্টর এরিয়া */}
            <div className="space-y-4 border-t border-slate-800/40 pt-4">
              {/* সিলেক্ট সাইজ */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Size</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[42px] h-9 px-3 text-xs font-bold rounded-lg border transition-all flex items-center justify-center cursor-pointer ${
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

              {/* সিলেক্ট কোয়ান্টিটি */}
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Quantity Requested</span>
                <div className="flex items-center w-28 h-9 border border-slate-800 rounded-xl p-1 bg-[#070b13]">
                  <button onClick={decreaseQty} className="flex-1 h-full flex items-center justify-center hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition cursor-pointer">
                    <FiMinus className="text-xs" />
                  </button>
                  <span className="flex-1 text-center font-mono text-xs font-bold text-white">{quantity}</span>
                  <button onClick={increaseQty} className="flex-1 h-full flex items-center justify-center hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition cursor-pointer">
                    <FiPlus className="text-xs" />
                  </button>
                </div>
              </div>
            </div>

            {/* 💰 প্রাইসিং সামারি এবং অ্যাকশন বাটন কার্ড */}
            <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-5 space-y-4 shadow-inner relative">
              <div className="flex justify-between items-end">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Price</span>
                <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-mono">
                  ৳{price * quantity}
                </span>
              </div>

              {/* বাটন গ্রুপ */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  onClick={() => {
                    setIsAddedToCart(true);
                    onClose();
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_20px_rgba(37,99,235,0.2)] cursor-pointer active:scale-[0.99]"
                >
                  <BsCart3 className="text-sm" /> Add To Cart
                </button>
                
              
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductModel;