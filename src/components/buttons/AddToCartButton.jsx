"use client";

import useAxiosSecure from '@/hooks/useAxiosSecure';
import React, { useState } from 'react';
import { BsCart3 } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { toast } from 'react-toastify';

const AddToCartButton = ({ product }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { data: session, status } = useSession();
  

  if (status === "loading") {
    return <p className="text-center py-2 text-sm text-gray-500">Loading...</p>;
  }

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session?.user?.email) {
      toast.error("Please login to add products to cart!");
      return;
    }

    try {
      const res = await axiosSecure.post("/api/cart", {
        productId: product._id,
        title: product.title,
        price: product.price,
        size: product.size,
        image: product.image,
        userEmail: session?.user?.email,
        userName: session?.user?.name,
        createdAt: new Date().toISOString(),
      });

      // সফলভাবে ইনসার্ট হলে
      if (res.data.result?.acknowledged === true) {
        setIsAddedToCart(true);
        return toast.success("Product added to Cart!");
      }

    } catch (error) {
      console.error("Error adding to cart:", error);

      // 🛠️ ফিক্সড: যদি ব্যাকএন্ড থেকে ৪০০ (Already Exist) রেসপন্স আসে
      if (error.response?.status === 400) {
        // ব্যাকএন্ডে যে কাস্টম মেসেজ লিখেছেন সেটি দেখাবে (যেমন: "This item already exists in your cart")
        toast.warning(error.response.data?.message || "This item is already in your cart!");
        setIsAddedToCart(true); // অলরেডি থাকলে বাটন গ্রিন করে দিতে পারেন
      } else {
        toast.error(error.response?.data?.message || "Failed to add to cart. Try again!");
      }
    }
  };

  return (
    <div>
      <button 
        onClick={handleAddToCart} 
        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 delay-150 focus:outline-none cursor-pointer ${
          isAddedToCart 
            ? 'bg-green-600 text-white scale-105' 
            : 'bg-white text-gray-700 hover:bg-[#ff6801] hover:text-white'
        }`}
      >
        <BsCart3 className={`w-5 h-5 transition-transform duration-300 ${isAddedToCart ? 'scale-110' : 'group-hover:scale-110'}`} />
      </button>
    </div>
  );
};

export default AddToCartButton;