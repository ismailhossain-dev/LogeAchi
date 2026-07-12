"use client";

import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function CheckOutForm({ productData }) {
  // Safe destructuring with fallback values
  const { _id, title, image, price, size = [] } = productData || {};
  const { data: session, status } = useSession();
  const axiosSecure = useAxiosSecure();
  const router = useRouter()

  const [selectedSize, setSelectedSize] = useState("");

  if (status === "loading") {
    <p className="text-center py-2 text-sm text-gray-500">Loading...</p>;
  }

  if (!axiosSecure) {
    toast.info("Axios secure connection error...");
    return;
  }

  // console.log("checkout form main user", session)
  // Sync selected size if productData updates dynamically
  useEffect(() => {
    if (size.length > 0) {
      setSelectedSize(size[0]);
    }
  }, [size]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async(formData) => {

    // console.log(formData)


    // Combines user details with relevant product metrics
    // const finalOrderData = {
    //   ...formData,
    //   productId: _id,
    //   productTitle: title,
    //   productPrice: price,
    //   productSize: selectedSize,
    // };
    // console.log("Complete Order & Product Data:", finalOrderData);

    //send data in mongod 

    try {
      const res = await axiosSecure.post ("/api/checkout", {
        
        name: formData.fullName , 
        email:session?.user?.email, 
        number:formData.phoneNumber , 
        address:formData.fullAddress ,
        city: formData.city,
        division: formData.state, 
        zipcode: formData.zipCode ,
        status: "pending", 
        createdAt: new Date().toISOString(),
      })

        if (res.data.result?.acknowledged === true) {
           toast.success("Order Conform!");
          //  router.push("/user/my-orders")
           return;
      
            }
      
      
    } catch (error) {
      console.log("checkout data fetch error " , error)
    }
  };

  return (
    <div className="w-full bg-[#0f172a] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans antialiased text-slate-200">
      <div className="w-full max-w-6xl bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.7)] overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* ================= LEFT SIDE: Product Information Summary ================= */}
          <div className="w-full lg:w-5/12 bg-slate-950/50 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-orange-500 uppercase tracking-wider mb-6">
                1. Product Summary
              </h4>

              {/* Product Image */}
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-slate-800 mb-6 bg-slate-900">
                <img
                  src={
                    image ||
                    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=500"
                  }
                  alt={title || "Product Preview"}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Title & Price */}
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {title || "Premium Apparel"}
                </h2>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-orange-500">
                    ৳{price || 0}
                  </span>
                  <span className="text-xs text-slate-400">
                    BDT (VAT Included)
                  </span>
                </div>
              </div>

              {/* Size Selection */}
              {size.length > 0 && (
                <div className="mt-6">
                  <p className="text-xs font-bold text-slate-400 mb-2.5">
                    Select Size:
                  </p>
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

            {/* Price Breakdown Breakdown */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-3">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Subtotal</span>
                <span>৳{price || 0}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Delivery Fee</span>
                <span className="text-green-400">Free</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800/40">
                <span>Total Amount</span>
                <span className="text-orange-500 text-base">৳{price || 0}</span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE: Shipping Information Form ================= */}
          <div className="w-full lg:w-7/12 p-6 sm:p-10">
            <h3 className="text-xl font-black text-white tracking-tight mb-6 border-b border-slate-800 pb-4">
              2. Shipping & Payment Details
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Personal Info Row */}
              <div className="grid grid-cols-1  gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    Full Name *
                  </label>
                  <input
                    {...register("fullName", {
                      required: "Full name is required",
                    })}
                    type="text"
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 focus:border-orange-500 rounded-xl text-sm text-slate-200 outline-none transition-all"
                  />
                  {errors.fullName && (
                    <span className="text-red-400 text-xs">
                      {errors.fullName.message}
                    </span>
                  )}
                </div>

               
              </div>

              {/* Contact Info Row */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-300">
                  Phone Number *
                </label>
                <input
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                  })}
                  type="tel"
                  placeholder="e.g. +88017XXXXXXXX"
                  className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 focus:border-orange-500 rounded-xl text-sm text-slate-200 outline-none transition-all"
                />
                {errors.phoneNumber && (
                  <span className="text-red-400 text-xs">
                    {errors.phoneNumber.message}
                  </span>
                )}
              </div>

              {/* Geographic Info Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    Division / State *
                  </label>
                  <input
                    {...register("state", {
                      required: "Division or state is required",
                    })}
                    type="text"
                    placeholder="e.g. Dhaka"
                    className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 focus:border-orange-500 rounded-xl text-sm text-slate-200 outline-none transition-all"
                  />
                  {errors.state && (
                    <span className="text-red-400 text-xs">
                      {errors.state.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    City / District *
                  </label>
                  <input
                    {...register("city", {
                      required: "City or district is required",
                    })}
                    type="text"
                    placeholder="e.g. Mirpur"
                    className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 focus:border-orange-500 rounded-xl text-sm text-slate-200 outline-none transition-all"
                  />
                  {errors.city && (
                    <span className="text-red-400 text-xs">
                      {errors.city.message}
                    </span>
                  )}
                </div>
              </div>

              {/* ZIP and Full Address Info */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-300">
                  Postal / ZIP Code (Optional)
                </label>
                <input
                  {...register("zipCode")}
                  type="text"
                  placeholder="e.g. 1216"
                  className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 focus:border-orange-500 rounded-xl text-sm text-slate-200 outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-300">
                  Full Delivery Address *
                </label>
                <textarea
                  {...register("fullAddress", {
                    required: "Full delivery address is required",
                  })}
                  rows={3}
                  placeholder="House No, Road No, Area, Landmark details..."
                  className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 focus:border-orange-500 rounded-xl text-sm text-slate-200 outline-none transition-all resize-none"
                />
                {errors.fullAddress && (
                  <span className="text-red-400 text-xs">
                    {errors.fullAddress.message}
                  </span>
                )}
              </div>

              {/* Action Button */}
              <button
                type="submit"
                className="w-full py-3.5 mt-2 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-lg shadow-orange-600/20 active:scale-[0.99] cursor-pointer"
              >
                Confirm Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOutForm;
