"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Sparkles, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import GoogleLogin from "../GoogleLogin/GoogleLogin";
import { toast } from "react-toastify";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [showPassword, setShowPassword] = useState(false);

  // loading state
  const [loading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.ok) {
        toast.success("Login successfully");
        router.push(callbackUrl);
        router.refresh();
      } else {
        toast.error(result?.error || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0f172a] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans antialiased text-slate-200">
      
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex w-full max-w-5xl min-h-[600px] bg-slate-900/60 backdrop-blur-xl rounded-3xl overflow-hidden shadow-[0_25px_70px_-15px_rgba(0,0,0,0.7)] border border-slate-800"
      >
        
        {/* Left Side: Cinematic Hero Image */}
        <div className="hidden lg:block relative flex-1 min-w-[450px] bg-slate-950">
          <img
            src="https://res.cloudinary.com/ddfgi0gdr/image/upload/v1775072212/Men_s_Shorts-9_muvocd.avif"
            alt="Fashion Hero"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-12">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-white text-4xl xl:text-5xl font-black leading-tight tracking-tight">
                The <br /> Modern <br /> dream.
              </h2>
              <p className="text-slate-400 font-medium mt-4 max-w-sm text-sm leading-relaxed">
                Step into a world where fashion meets fine art. Your curated
                journey starts here.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Side: Form Section */}
        <div className="flex-1 flex flex-col justify-center p-6 sm:p-10 lg:p-12 bg-slate-900/40 relative">
          
          <Link
            href={"/"}
            className="absolute top-6 left-6 sm:left-10 flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-orange-500 transition-colors group"
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
            className="max-w-md mx-auto w-full mt-8"
          >
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/50 text-slate-300 px-3 py-1 rounded-md mb-2.5">
                <Sparkles size={12} className="text-orange-500" />
                <span className="text-[9px] font-extrabold tracking-[2px] uppercase">
                  Exclusive Access
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Login Now ✓
              </h3>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              
              {/* Email Input Box */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-300 tracking-wide">
                  Mail address
                </label>
                <div className="relative flex items-center">
                  <Mail
                    size={16}
                    className="absolute left-4 text-slate-500"
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
                    className="w-full pl-11 pr-4 py-3 bg-slate-950/40 border border-slate-800 focus:border-orange-500 rounded-xl text-sm text-slate-200 outline-none placeholder:text-slate-600 font-medium transition-all shadow-inner focus:shadow-[0_0_0_3px_rgba(249,115,22,0.15)]"
                  />
                </div>
                {errors.email && (
                  <span className="text-red-400 text-xs font-medium mt-0.5 pl-1 block">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Password Input Box */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-300 tracking-wide">
                  Lock password
                </label>

                <div className="relative flex items-center">
                  <Lock size={16} className="absolute left-4 text-slate-500" />

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
                    className="w-full pl-11 pr-10 py-3 bg-slate-950/40 border border-slate-800 focus:border-orange-500 rounded-xl text-sm text-slate-200 outline-none placeholder:text-slate-600 font-medium transition-all shadow-inner focus:shadow-[0_0_0_3px_rgba(249,115,22,0.15)]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-slate-500 hover:text-slate-300 transition"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {errors.password && (
                  <span className="text-red-400 text-xs font-medium mt-0.5 pl-1 block">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 mt-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-orange-600/20 active:scale-[0.99] ${
                  loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Authenticating...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* google login */}
            <div className="mt-4">
              <GoogleLogin />
            </div>

            <p className="mt-6 text-center text-xs font-semibold text-slate-400">
              Not a member yet?{" "}
              <Link
                href="/register"
                className="text-orange-500 font-bold hover:underline underline-offset-4 ml-1"
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