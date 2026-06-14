"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Mail,  ArrowLeft, Sparkles, LockIcon } from "lucide-react";
import Link from "next/link";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Data:", data);

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    console.log(result);
  };

  return (
    // মূল ব্যাকগ্রাউন্ড একটু অফ-হোয়াইট রাখা হয়েছে যাতে মেইন কার্ডটি পরিষ্কার ফুটে ওঠে
    //first dev p-4 sm:p-6 lg:p-8
    <div className="min-h-screen w-full bg-slate-100 flex items-center justify-center  font-sans">
      {/* সেন্ট্রাল কন্টেইনার কার্ড */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex w-full max-w-5xl min-h-[600px] bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-200/50"
      >
        {/* Left Side: Cinematic Hero Image */}
        <div className="hidden lg:block relative flex-1 min-w-[450px] bg-slate-50">
          <img
            src="https://res.cloudinary.com/ddfgi0gdr/image/upload/v1775072212/Men_s_Shorts-9_muvocd.avif"
            alt="Fashion Hero"
            className="w-full h-full object-cover"
          />
          {/* লাইট গ্রেডিয়েন্ট ওভারলে - যা ইমেজ ও টেক্সট দুটোকেই নিখুঁত কন্ট্রাস্ট দেয় */}
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-100/90 via-slate-100/40 to-transparent flex flex-col justify-end p-12">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-slate-900 text-4xl xl:text-5xl font-black leading-tight tracking-tight">
                The <br /> Modern <br /> dream.
              </h2>
              <p className="text-slate-600 font-medium mt-4 max-w-sm text-sm leading-relaxed">
                Step into a world where fashion meets fine art. Your curated
                journey starts here.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Side: Form Section */}
        <div className="flex-1 flex flex-col justify-center p-8 sm:p-12 lg:p-14 bg-white relative">
          {/* ১. Go Back বাটন (উপরের বাম কোণায়) */}
          <Link
            href={"/"}
            className="absolute top-6 left-8 sm:left-12 flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-orange-600 transition-colors group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
            Go Back
          </Link>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-md mx-auto w-full mt-6"
          >
            {/* টপ হেডার ও ব্যাজ */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3 py-1 rounded-md mb-2.5">
                <Sparkles size={12} className="text-orange-500" />
                <span className="text-[9px] font-extrabold tracking-[2px] uppercase">
                  Exclusive Access
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Login Now ✓
              </h3>
            </div>

            {/* মেইন লগইন ফর্ম */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email Input Box */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 tracking-wide">
                  Mail address
                </label>
                <div className="relative flex items-center">
                  <Mail
                    size={16}
                    className="absolute left-4 text-slate-400 group-focus-within:text-orange-500 transition-colors"
                  />
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Please enter a valid email address",
                      },
                    })}
                    type="email"
                    placeholder="Input email"
                    className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 focus:border-orange-500 rounded-xl text-sm text-slate-800 outline-none placeholder:text-slate-400 font-medium transition-all shadow-sm focus:shadow-[0_0_0_3px_rgba(249,115,22,0.1)]"
                  />
                </div>
                {errors.email && (
                  <span className="text-red-500 text-xs font-medium mt-0.5 pl-1 block animate-fade-in">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Password Input Box */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 tracking-wide">
                  Lock password
                </label>

                <div className="relative flex items-center">
                  <LockIcon size={16} className="absolute left-4 text-slate-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Minimum 6 characters required",
                      },
                    })}
                    placeholder="Input password"
                    className="w-full pl-11 pr-10 py-3 bg-white border border-slate-200 focus:border-orange-500 rounded-xl text-sm text-slate-800 outline-none placeholder:text-slate-400 font-medium transition-all shadow-sm focus:shadow-[0_0_0_3px_rgba(249,115,22,0.1)]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-slate-400 hover:text-slate-600 transition"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {errors.password && (
                  <span className="text-red-500 text-xs font-medium mt-0.5 pl-1 block">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* সাবমিট বাটন (সলিড ব্ল্যাক থিম) */}
              <button
                type="submit"
                className="w-full py-3.5 mt-2 bg-black hover:bg-orange-600 text-white rounded-xl font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-orange-600/10 active:scale-[0.99]"
              >
                Login Account
              </button>
            </form>

            {/* রেজিস্টার ফুটার লিঙ্ক */}
            <p className="mt-8 text-center text-xs font-semibold text-slate-500">
              Not a member yet?{" "}
              <Link
                href="/register"
                className="text-orange-600 font-bold hover:underline underline-offset-4 ml-1"
              >
                Register
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
