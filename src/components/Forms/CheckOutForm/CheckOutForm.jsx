"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

function CheckOutForm({ productData }) {
  // যদি সার্ভার থেকে ডাটা আসতে দেরি হয় বা না থাকে, তার জন্য ডিফোল্ট সেফটি চেক
  const { _id, title, image, price, size = [] } = productData || {};
  
  const [selectedSize, setSelectedSize] = useState(size[0] || "");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    // ফর্মের তথ্যের সাথে প্রোডাক্টের আইডি, টাইটেল, দাম এবং সিলেক্টেড সাইজ একসাথে কনসোলে দেখাবে
    const finalOrderData = {
      ...formData,
      productId: _id,
      productTitle: title,
      productPrice: price,
      productSize: selectedSize,
    };
    console.log("অর্ডার এবং প্রোডাক্টের সম্পূর্ণ ডেটা:", finalOrderData);
  };

  return (
    <div className="w-full bg-[#0f172a] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans antialiased text-slate-200">
      <div className="w-full max-w-6xl bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.7)] overflow-hidden">
        
        <div className="flex flex-col lg:flex-row">
          
          {/* বাম পাশ: প্রোডাক্ট ইনফরমেশন সামারি */}
          <div className="w-full lg:w-5/12 bg-slate-950/50 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-orange-500 uppercase tracking-wider mb-6">
                ১. প্রোডাক্টের বিবরণ
              </h4>
              
              {/* প্রোডাক্ট ইমেজ */}
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-slate-800 mb-6 bg-slate-900">
                <img
                  src={image || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=500"}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* প্রোডাক্ট টাইটেল ও প্রাইস */}
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {title || "Men's Polo T-Shirt"}
                </h2>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-orange-500">৳{price || 0}</span>
                  <span className="text-xs text-slate-400">BDT (VAT অন্তর্ভুক্ত)</span>
                </div>
              </div>

              {/* সাইজ সিলেকশন অপশন */}
              {size.length > 0 && (
                <div className="mt-6">
                  <p className="text-xs font-bold text-slate-400 mb-2.5">সাইজ সিলেক্ট করুন:</p>
                  <div className="flex flex-wrap gap-2">
                    {size.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`px-4 py-2 text-xs font-bold rounded-xl transition-all border ${
                          selectedSize === s
                            ? "bg-orange-600 border-orange-500 text-white shadow-lg shadow-orange-600/20"
                            : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* সংক্ষিপ্ত রিসিট সামারি */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-3">
              <div className="flex justify-between text-xs text-slate-400">
                <span>উপমোট (Subtotal)</span>
                <span>৳{price || 0}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>ডেলিভারি চার্জ</span>
                <span className="text-green-400">ফ্রি</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800/40">
                <span>সর্বমোট (Total)</span>
                <span className="text-orange-500 text-base">৳{price || 0}</span>
              </div>
            </div>
          </div>

          {/* ডান পাশ: আপনার বাংলা চেকআউট ফর্ম */}
          <div className="w-full lg:w-7/12 p-6 sm:p-10">
            <h3 className="text-xl font-black text-white tracking-tight mb-6 border-b border-slate-800 pb-4">
              ২. ডেলিভারি ও পেমেন্ট তথ্য
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              {/* ব্যক্তিগত তথ্য সেকশন */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-300">আপনার পুরো নাম *</label>
                  <input
                    {...register("fullName", { required: "আপনার নাম দেওয়া আবশ্যক" })}
                    type="text"
                    placeholder="যেমন: মোঃ করিম"
                    className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 focus:border-orange-500 rounded-xl text-sm text-slate-200 outline-none transition-all"
                  />
                  {errors.fullName && <span className="text-red-400 text-xs">{errors.fullName.message}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-300">ইমেইল ঠিকানা *</label>
                  <input
                    {...register("email", { 
                      required: "ইমেইল ঠিকানা দেওয়া আবশ্যক",
                      pattern: { value: /^\S+@\S+$/i, message: "সঠিক ইমেইল ঠিকানা লিখুন" }
                    })}
                    type="email"
                    placeholder="example@mail.com"
                    className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 focus:border-orange-500 rounded-xl text-sm text-slate-200 outline-none transition-all"
                  />
                  {errors.email && <span className="text-red-400 text-xs">{errors.email.message}</span>}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-300">মোবাইল নাম্বার *</label>
                <input
                  {...register("phoneNumber", { required: "মোবাইল নাম্বার দেওয়া আবশ্যক" })}
                  type="tel"
                  placeholder="যেমন: ০১৭XXXXXXXX"
                  className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 focus:border-orange-500 rounded-xl text-sm text-slate-200 outline-none transition-all"
                />
                {errors.phoneNumber && <span className="text-red-400 text-xs">{errors.phoneNumber.message}</span>}
              </div>

              {/* ঠিকানা সেকশন */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-300">দেশ *</label>
                  <input
                    {...register("country", { required: "দেশের নাম দেওয়া আবশ্যক" })}
                    type="text"
                    placeholder="যেমন: বাংলাদেশ"
                    className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 focus:border-orange-500 rounded-xl text-sm text-slate-200 outline-none transition-all"
                  />
                  {errors.country && <span className="text-red-400 text-xs">{errors.country.message}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-300">বিভাগ *</label>
                  <input
                    {...register("state", { required: "বিভাগের নাম দেওয়া আবশ্যক" })}
                    type="text"
                    placeholder="যেমন: ঢাকা"
                    className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 focus:border-orange-500 rounded-xl text-sm text-slate-200 outline-none transition-all"
                  />
                  {errors.state && <span className="text-red-400 text-xs">{errors.state.message}</span>}
                </div>
              </div>

              {/* ২-কলামের জেলা এবং পোস্টাল কোড */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-300">জেলা / শহর *</label>
                  <input
                    {...register("city", { required: "জেলা অথবা শহরের নাম দেওয়া আবশ্যক" })}
                    type="text"
                    placeholder="যেমন: মিরপুর, ঢাকা"
                    className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 focus:border-orange-500 rounded-xl text-sm text-slate-200 outline-none transition-all"
                  />
                  {errors.city && <span className="text-red-400 text-xs">{errors.city.message}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-300">পোস্টাল / জিপ কোড (ঐচ্ছিক)</label>
                  <input
                    {...register("zipCode")}
                    type="text"
                    placeholder="যেমন: ১২১৬"
                    className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 focus:border-orange-500 rounded-xl text-sm text-slate-200 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-300">পূর্ণাঙ্গ ঠিকানা *</label>
                <textarea
                  {...register("fullAddress", { required: "পূর্ণাঙ্গ ডেলিভারি ঠিকানা দেওয়া আবশ্যক" })}
                  rows={3}
                  placeholder="বাসা নং, রোড নং, গ্রাম বা এলাকার নাম বিস্তারিত লিখুন..."
                  className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 focus:border-orange-500 rounded-xl text-sm text-slate-200 outline-none transition-all resize-none"
                />
                {errors.fullAddress && <span className="text-red-400 text-xs">{errors.fullAddress.message}</span>}
              </div>

              {/* সাবমিট বাটন */}
              <button
                type="submit"
                className="w-full py-3.5 mt-2 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-lg shadow-orange-600/20 active:scale-[0.99] cursor-pointer"
              >
                অর্ডার নিশ্চিত করুন
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CheckOutForm;