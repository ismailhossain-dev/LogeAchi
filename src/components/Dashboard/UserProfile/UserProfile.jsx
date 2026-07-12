"use client"
import React, { useState } from 'react'
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { 
  Mail, Phone, MapPin, Calendar, ShieldCheck, 
  Copy, ShoppingBag, Heart, ShoppingCart, 
  Edit2, X, Loader2, User, Globe 
} from 'lucide-react';
import Link from 'next/link';

const UserProfile = () => {
  const { data: session } = useSession();
  const axiosSecure = useAxiosSecure();
  
  // ফর্ম ওপেন/ক্লোজ এবং সাবমিট লোডিং স্টেট
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: users, isLoading, refetch } = useQuery({
    queryKey: ["user", session?.user?.email || ""], 
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/user?email=${session?.user?.email}`);
      return res.data;
    },
    enabled: !!session?.user?.email, 
  });

  const user = users?.result;

  // React Hook Form সেটআপ (ডিফল্ট ভ্যালুসহ)
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    values: {
      name: user?.name || "",
      phone: user?.phone || "",
      address: user?.address || "",
      district: user?.district || "",
      division: user?.division || "",
    }
  });

  // ফর্ম সাবমিট হ্যান্ডলার (আপডেট API কল)
  const onUpdateProfile = async (data) => {
    setIsSubmitting(true);
    try {
      // আপনার রিয়েল ব্যাকএন্ডের PUT/PATCH রুট অনুযায়ী কল হবে
      await axiosSecure.put(`/api/user?email=${session?.user?.email}`, data);
      await refetch(); // নতুন ডাটা রিফেচ করা
      setIsEditing(false); // ফর্ম ক্লোজ করা
    } catch (error) {
      console.error("Update failed:", error);
      alert("Something went wrong while updating profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // প্রিমিয়াম স্কেলিটন লোডার
  if (!session?.user?.email || isLoading) {
    return (
      <div className="min-h-screen bg-[#070b13] p-4 sm:p-8 flex items-center justify-center animate-pulse">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="h-64 bg-slate-900/60 rounded-xl"></div>
            <div className="h-40 bg-slate-900/60 rounded-xl"></div>
          </div>
          <div className="md:col-span-2 h-[420px] bg-slate-900/60 rounded-xl"></div>
        </div>
      </div>
    );
  }

  // ডেট ফরম্যাটার হেল্পার
  const formatDate = (dateString) => {
    if (!dateString) return "15 Jun 2026";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // একাউন্ট আইডি কপি করার ফাংশন
  const handleCopyId = (id) => {
    if (id) {
      navigator.clipboard.writeText(id);
      alert("Account ID copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-[#070b13] text-slate-300 p-4 sm:p-8 flex items-center justify-center font-sans selection:bg-blue-500/30">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* ================= LEFT SIDE ================= */}
        <div className="md:col-span-4 space-y-6">
          {/* Large Profile Card */}
          <div className="bg-[#0f1524]/60 border border-slate-800/40 rounded-xl overflow-hidden relative shadow-xl">
            <div className="h-64 w-full relative">
              <img
                src={user?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1524] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5 space-y-0.5">
                <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                  {user?.role || "USER"}
                </span>
                <h3 className="text-xl font-bold text-white tracking-wide">
                  {user?.name || "HLW SABBIR"}
                </h3>
              </div>
            </div>
          </div>

          {/* Account Meta Status Card */}
          <div className="bg-[#0f1524]/60 border border-slate-800/40 rounded-xl p-5 space-y-4 shadow-xl text-xs font-semibold">
            <div className="space-y-1.5">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Account ID</span>
              <div className="flex items-center justify-between bg-[#070b13]/50 border border-slate-800/40 px-3 py-2 rounded-lg gap-2">
                <span className="text-slate-400 font-mono text-[11px] truncate select-all">
                  {user?._id || "40Gvcu9o7LYCgjI8Qh8Ew3Ur8Ct2"}
                </span>
                <button 
                  onClick={() => handleCopyId(user?._id || "40Gvcu9o7LYCgjI8Qh8Ew3Ur8Ct2")}
                  className="text-slate-500 hover:text-blue-400 transition-colors cursor-pointer"
                >
                  <Copy size={14} />
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-slate-800/20">
              <span className="text-slate-400 text-[11px] uppercase tracking-wider">Status</span>
              <span className="text-emerald-400 flex items-center gap-1.5 text-[11px] uppercase tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {user?.status || "ACTIVE"}
              </span>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-slate-800/20">
              <span className="text-slate-400 text-[11px] uppercase tracking-wider">Verified</span>
              <span className="text-emerald-400 text-[11px] uppercase tracking-wide">YES</span>
            </div>

            <div className="flex justify-between items-center py-1.5">
              <span className="text-slate-400 text-[11px] uppercase tracking-wider">Role</span>
              <span className="text-blue-500 text-[11px] uppercase tracking-wide font-bold">
                {user?.role || "USER"}
              </span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <Link href="/user/my-orders" className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#0f1524]/40 border border-slate-800/30 hover:bg-[#0f1524]/80 text-slate-400 hover:text-blue-400 transition-all group cursor-pointer">
              <ShoppingBag size={16} className="mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-bold uppercase tracking-wider">Orders</span>
            </Link>
            <Link href="/user/my-wishlist" className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#0f1524]/40 border border-slate-800/30 hover:bg-[#0f1524]/80 text-slate-400 hover:text-rose-400 transition-all group cursor-pointer">
              <Heart size={16} className="mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-bold uppercase tracking-wider">Wishlist</span>
            </Link>
            <Link href="/user/my-cart" className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#0f1524]/40 border border-slate-800/30 hover:bg-[#0f1524]/80 text-slate-400 hover:text-amber-400 transition-all group cursor-pointer">
              <ShoppingCart size={16} className="mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-bold uppercase tracking-wider">Cart</span>
            </Link>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="md:col-span-8 bg-[#0f1524]/40 border border-slate-800/40 rounded-xl p-6 sm:p-8 relative shadow-xl min-h-[460px] flex flex-col justify-between transition-all duration-300">
          
          {/* কন্ডিশনাল রেন্ডারিং: এডিট ফর্ম বনাম প্রোফাইল ভিউ */}
          {isEditing ? (
            /* ================= EDIT FORM WINDOW ================= */
            <form onSubmit={handleSubmit(onUpdateProfile)} className="space-y-5 w-full flex-1 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex justify-between items-center border-b border-slate-800/40 pb-3">
                  <h3 className="text-base font-bold text-white tracking-wide">Edit Profile Information</h3>
                  <button 
                    type="button"
                    onClick={() => { setIsEditing(false); reset(); }}
                    className="p-1.5 bg-slate-900/60 border border-slate-800/50 text-slate-400 hover:text-white rounded-lg cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Grid Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Full Name</label>
                    <div className="relative flex items-center">
                      <User size={14} className="absolute left-3 text-slate-500" />
                      <input 
                        {...register("name", { required: "Name is required" })}
                        type="text" 
                        className="w-full bg-[#070b13]/50 border border-slate-800 focus:border-blue-500/80 rounded-lg py-2 pl-9 pr-3 text-xs outline-none text-slate-200 transition-colors"
                      />
                    </div>
                    {errors.name && <span className="text-rose-500 text-[10px]">{errors.name.message}</span>}
                  </div>

                  {/* Phone Input */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Phone</label>
                    <div className="relative flex items-center">
                      <Phone size={14} className="absolute left-3 text-slate-500" />
                      <input 
                        {...register("phone")}
                        type="text" 
                        placeholder="Not set"
                        className="w-full bg-[#070b13]/50 border border-slate-800 focus:border-blue-500/80 rounded-lg py-2 pl-9 pr-3 text-xs outline-none text-slate-200 transition-colors"
                      />
                    </div>
                  </div>

                  {/* District Input */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">District</label>
                    <div className="relative flex items-center">
                      <MapPin size={14} className="absolute left-3 text-slate-500" />
                      <input 
                        {...register("district")}
                        type="text" 
                        placeholder="Not set"
                        className="w-full bg-[#070b13]/50 border border-slate-800 focus:border-blue-500/80 rounded-lg py-2 pl-9 pr-3 text-xs outline-none text-slate-200 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Division Input */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Division</label>
                    <div className="relative flex items-center">
                      <Globe size={14} className="absolute left-3 text-slate-500" />
                      <input 
                        {...register("division")}
                        type="text" 
                        placeholder="Not set"
                        className="w-full bg-[#070b13]/50 border border-slate-800 focus:border-blue-500/80 rounded-lg py-2 pl-9 pr-3 text-xs outline-none text-slate-200 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Address Full Width Input */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Address</label>
                  <div className="relative flex items-center">
                    <MapPin size={14} className="absolute left-3 text-slate-500" />
                    <input 
                      {...register("address")}
                      type="text" 
                      placeholder="Not set"
                      className="w-full bg-[#070b13]/50 border border-slate-800 focus:border-blue-500/80 rounded-lg py-2 pl-9 pr-3 text-xs outline-none text-slate-200 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons Panel */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800/30 mt-6">
                <button 
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => { setIsEditing(false); reset(); }}
                  className="px-4 py-2 bg-slate-900/60 border border-slate-800 hover:bg-slate-800/80 rounded-lg text-[11px] font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white rounded-lg text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-lg shadow-blue-600/10 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={12} className="animate-spin" />
                      Saving...
                    </>
                  ) : "Save Changes"}
                </button>
              </div>
            </form>
          ) : (
            /* ================= STANDALONE PROFILE VIEW ================= */
            <>
              {/* Edit Trigger Element */}
              <button 
                type="button"
                onClick={() => setIsEditing(true)}
                className="absolute top-6 right-6 p-2 bg-slate-900/60 border border-slate-800/50 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer hover:bg-slate-800/80"
              >
                <Edit2 size={16} />
              </button>

              <div className="space-y-6 flex-1">
                {/* Full Name Display */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-blue-500" />
                    Full Name
                  </span>
                  <p className="text-xl font-bold text-white tracking-wide">
                    {user?.name || "HLW SABBIR"}
                  </p>
                </div>

                {/* Email Display */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-blue-500" />
                    Email
                  </span>
                  <p className="text-sm font-semibold text-slate-200">
                    {user?.email || "programmarsabbir@gmail.com"}
                  </p>
                  <span className="text-[9px] text-slate-500 block tracking-wider font-medium">
                    EMAIL CANNOT BE CHANGED FOR SECURITY
                  </span>
                </div>

                {/* Sub-grid Parameters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 pt-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Phone size={11} className="text-slate-400" />
                      Phone
                    </span>
                    <p className="text-xs font-semibold text-slate-400 capitalize">
                      {user?.phone || "Not set"}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <MapPin size={11} className="text-slate-400" />
                      Address
                    </span>
                    <p className="text-xs font-semibold text-slate-400 capitalize truncate">
                      {user?.address || "Not set"}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <MapPin size={11} className="text-slate-400" />
                      District
                    </span>
                    <p className="text-xs font-semibold text-slate-400 capitalize">
                      {user?.district || "Not set"}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Globe size={11} className="text-slate-400" />
                      Division
                    </span>
                    <p className="text-xs font-semibold text-slate-400 capitalize">
                      {user?.division || "Not set"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Chronology Metadata Footer */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-800/40 text-xs mt-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Calendar size={12} />
                    Member Since
                  </span>
                  <p className="text-[11px] font-semibold text-slate-400">
                    {formatDate(user?.createdAt)}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck size={12} />
                    Last Updated
                  </span>
                  <p className="text-[11px] font-semibold text-slate-400">
                    {formatDate(user?.updatedAt)}
                  </p>
                </div>
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  )
}

export default UserProfile;