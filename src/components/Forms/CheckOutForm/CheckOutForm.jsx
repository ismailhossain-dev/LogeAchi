"use client";

import React from "react";
import { useForm } from "react-hook-form";

function CheckOutForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("চেকআউট ফর্ম ডেটা:", data);
  };

  return (
    <div className="min-h-screen w-full bg-[#0f172a] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans antialiased text-slate-200">
    
      <div className="w-full max-w-2xl bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.7)]">
        
        <h3 className="text-2xl font-black text-white tracking-tight mb-8 border-b border-slate-800 pb-4 text-center">
          অর্ডার সম্পন্ন করুন
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* ১. ব্যক্তিগত তথ্য */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-orange-500 uppercase tracking-wider">১. ব্যক্তিগত তথ্য</h4>
            
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
          </div>

          {/* ২. ডেলিভারি ঠিকানা */}
          <div className="space-y-4 pt-4 border-t border-slate-800/60">
            <h4 className="text-sm font-bold text-orange-500 uppercase tracking-wider">২. ডেলিভারি ঠিকানা</h4>
            
            <div className="grid grid-cols-1  gap-4">
           

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

            {/* ৩টি ইনপুটের পরিবর্তে এখানে ২টি ইনপুট গ্রিড ব্যবহার করা হয়েছে */}
            <div className="grid grid-cols-1  gap-4">
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
          </div>

          {/* সাবমিট বাটন */}
          <button
            type="submit"
            className="w-full py-3.5 mt-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-lg shadow-orange-600/20 active:scale-[0.99] cursor-pointer"
          >
            অর্ডার নিশ্চিত করুন
          </button>
        </form>

      </div>
    </div>
  );
}

export default CheckOutForm;