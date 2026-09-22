"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  ArrowLeft,
  Sparkles,
  EyeOff,
  Eye,
  Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { postUser } from "@/actions/server/auth";
import GoogleLogin from "../GoogleLogin/GoogleLogin";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);


  const [loading, setIsLoading] = useState(false);


  const [rawImageFile, setRawImageFile] = useState(null);

  const router = useRouter();
  const params = useSearchParams();
  const callBackUrl = params.get("callbackUrl") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
   
      setRawImageFile(file); 

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {

    if (!rawImageFile) {
      toast.error("Please upload a profile picture first!");
      return;
    }


    setIsLoading(true);

    const formData = new FormData();
    formData.append("image", rawImageFile);

    try {
      const IMAGE_API_URL = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`;

      const imgResponse = await fetch(IMAGE_API_URL, {
        method: "POST",
        body: formData,
      });

      const imgResult = await imgResponse.json();

      if (!imgResponse.ok || !imgResult.data) {
        throw new Error(imgResult.error?.message || "ImgBB upload failed");
      }

      const imageUrl = imgResult.data.url;

      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
        image: imageUrl,
      };

      const result = await postUser(userData);

      // ========== auto login ==============
      if (result?.insertedId) {
        await signIn("credentials", {
          email: data.email,
          password: data.password,
          callbackUrl: callBackUrl,
        });
        toast.success("Successfully Registered");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error(error.message || "Registration failed!");
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
        className="flex w-full max-w-5xl min-h-[700px] bg-slate-900/60 backdrop-blur-xl rounded-3xl overflow-hidden shadow-[0_25px_70px_-15px_rgba(0,0,0,0.7)] border border-slate-800"
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
          <button
            type="button"
            onClick={() => router.back()}
            className="absolute top-6 left-6 sm:left-10 flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-orange-500 transition-colors group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
            Go Back
          </button>

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
                Create an account ✔️
              </h3>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Premium Image Upload Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-300 tracking-wide">
                  Profile Picture
                </label>
                <div className="relative group w-full h-24 flex items-center justify-center border border-dashed border-slate-700 hover:border-orange-500 rounded-xl bg-slate-950/50 p-4 transition-all duration-300 cursor-pointer overflow-hidden">
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={handleImageChange}
                  />

                  {imagePreview ? (
                    <div className="flex items-center gap-4 z-0 w-full">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-16 h-16 object-cover rounded-full border-2 border-orange-500 p-0.5"
                      />
                      <span className="text-xs text-orange-500 font-semibold group-hover:underline">
                        Change Photo
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 text-slate-400 z-0 pointer-events-none">
                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 group-hover:border-orange-500/50 transition-colors">
                        <ImageIcon
                          size={20}
                          className="text-slate-400 group-hover:text-orange-500"
                        />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-semibold text-slate-300">
                          <span className="text-orange-500">
                            Click to upload
                          </span>{" "}
                          profile image
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Supports PNG, JPG (Max 5MB)
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Full Name Input Box */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-300 tracking-wide">
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <User size={16} className="absolute left-4 text-slate-500" />
                  <input
                    {...register("name", { required: "Name is required" })}
                    type="text"
                    placeholder="Input your name"
                    className="w-full pl-11 pr-4 py-3 bg-slate-950/40 border border-slate-800 focus:border-orange-500 rounded-xl text-sm text-slate-200 outline-none placeholder:text-slate-600 font-medium transition-all shadow-inner focus:shadow-[0_0_0_3px_rgba(249,115,22,0.15)]"
                  />
                </div>
                {errors.name && (
                  <span className="text-red-400 text-xs font-medium mt-0.5 pl-1 block">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Mail Address Input Box */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-300 tracking-wide">
                  Mail address
                </label>
                <div className="relative flex items-center">
                  <Mail size={16} className="absolute left-4 text-slate-500" />
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
                        box-shadow="color"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="mt-4">
              <GoogleLogin />
            </div>

            <p className="mt-6 text-center text-xs font-semibold text-slate-400">
              Already a member?{" "}
              <Link
                href="/login"
                className="text-orange-500 font-bold hover:underline underline-offset-4 ml-1"
              >
                Login
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterForm;
