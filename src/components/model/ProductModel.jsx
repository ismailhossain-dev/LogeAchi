"use client"
import React from "react";
import Image from "next/image";
import { BsCart3 } from "react-icons/bs";
import { FiMinus, FiPlus } from "react-icons/fi";
import { MdClose } from "react-icons/md";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
      {/* ব্যাকড্রপ ওভারলে (ব্লার ব্যাকগ্রাউন্ড) */}
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity" onClick={onClose} />

      {/* মডাল মেইন বক্স */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] md:max-h-[85vh] overflow-y-auto md:overflow-hidden z-10 transform transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* ক্লোজ বাটন (X) */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 z-30 w-9 h-9 bg-white/90 hover:bg-red-500 hover:text-white text-gray-800 rounded-full flex items-center justify-center transition-all shadow-md border border-gray-100 focus:outline-none active:scale-95"
          aria-label="Close modal"
        >
          <MdClose className="text-xl font-bold" />
        </button>

        {/* মডাল লেআউট গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          
          {/* বাম পাশ: প্রোডাক্ট ইমেজ */}
          <div className="relative w-full h-64 sm:h-80 md:h-full min-h-[260px] md:min-h-[450px] bg-[#fdfdfd] flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
            <Image src={image} alt={title} fill className="object-cover" priority />
          </div>

          {/* ডান পাশ: প্রোডাক্ট ইনফরমেশন ও ফর্ম */}
          <div className="p-5 sm:p-7 flex flex-col justify-between md:max-h-[500px] md:overflow-y-auto bg-[#0f172a]">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff6801] bg-[#ff6801]/10 px-2.5 py-1 rounded-md">Quick Shop</span>
                <h2 className="text-lg md:text-2xl font-bold text-secondary mt-2.5 leading-tight">{title}</h2>
                <p className="text-xl md:text-2xl font-extrabold text-secondary mt-1.5">${price}</p>
              </div>
              
              {/* ডেসক্রিপশন */}
              <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 md:line-clamp-none">
                {description || "Discover the perfect blend of style and comfort with this premium product. Crafted with care using high-quality materials to ensure long-lasting durability."}
              </p>
              
              <hr className="border-gray-100" />

              {/* সিলেক্ট সাইজ গ্রুপ */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Select Size</span>
                  {selectedSize && <span className="text-xs font-semibold text-[#ff6801]">Selected: {selectedSize}</span>}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[40px] h-9 px-2.5 text-xs font-semibold rounded-md border transition-all flex items-center justify-center ${
                        selectedSize === size
                          ? "bg-gray-900 text-white border-gray-900 shadow-sm"
                          : "bg-white text-gray-700 border-gray-200 hover:border-gray-900"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* সিলেক্ট কোয়ান্টিটি গ্রুপ */}
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Select Quantity</span>
                <div className="flex items-center w-28 h-9 border border-gray-200 rounded-md overflow-hidden bg-gray-50">
                  <button onClick={decreaseQty} className="flex-1 h-full flex items-center justify-center hover:bg-gray-200 text-gray-600 transition-colors">
                    <FiMinus className="text-xs" />
                  </button>
                  <span className="flex-1 text-center font-bold text-xs text-gray-800">{quantity}</span>
                  <button onClick={increaseQty} className="flex-1 h-full flex items-center justify-center hover:bg-gray-200 text-gray-600 transition-colors">
                    <FiPlus className="text-xs" />
                  </button>
                </div>
              </div>
            </div>

            {/* অ্যাকশন বাটন গ্রুপ */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-5 mt-auto">
              <button
                onClick={() => {
                  setIsAddedToCart(true);
                  onClose();
                }}
                className="btn flex items-center gap-2"
              >
                <BsCart3 className="text-sm" /> Add To Cart
              </button>
              
              <button
                onClick={() => {
                  alert(`Proceeding to buy ${quantity} unit(s) of size ${selectedSize || 'Not Selected'}`);
                  onClose();
                }}
                className="btn"
              >
                Buy Now
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductModel;