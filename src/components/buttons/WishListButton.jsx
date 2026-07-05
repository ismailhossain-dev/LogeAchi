"use client";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { toast } from "react-toastify";

const WishListButton = ({ product }) => {
  const axiosSecure = useAxiosSecure();
  const { data: session, status } = useSession();
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (status === "loading") {
    return <p className="text-center py-2 text-sm text-gray-500">Loading...</p>;
  }

  if (!product) return null;

  const { _id, id, title, price, image } = product;
  const actualId = _id || id; 

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session?.user) {
      toast.error("Please login first to add to wishlist!");
      return;
    }

    if (!axiosSecure) {
      toast.info("Axios secure connection error...");
      return;
    }


    try {
      const res = await axiosSecure.post("/api/wishlist", {
        productId: actualId,
        title: title,
        price: price,
        image: image,
        userEmail: session?.user?.email,
        userName: session?.user?.name,
       createdAt: new Date().toISOString(),
      });

      //axios er mardome data sent korle eta data mardome response dei 
      if (res.data.result?.acknowledged === true) {
     toast.success("Product added to wishlist!");
     setIsWishlisted(true); 

      }

      if(res.status === 400) {
      toast.warning("This item is already in your wishlist!");
        
      }
     
    } catch (error) {

      // যদি ব্যাকএন্ড থেকে ৪০০ (Already Exist) রেসপন্স আসে
      if (error.response?.status === 400) {
        toast.warning("This item is already in your wishlist!");
        // যদি চান অলরেডি উইশলিস্টেড থাকলে বাটনটি রঙিনই থাকবে, তবে এই লাইনের নিচে `setIsWishlisted(true)` দিতে পারেন।
      } else {
        toast.error("Failed to add to wishlist. Try again!");
      }
    }
  };

  return (
    <div>
      <button
        onClick={handleWishlist}
        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 delay-75 focus:outline-none cursor-pointer ${
          isWishlisted
            ? "bg-[#ff6801] text-white scale-105"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        <FiHeart
          className={`w-5 h-5 transition-transform duration-300 ${
            isWishlisted ? "scale-110 fill-current" : "group-hover:scale-110"
          }`}
        />
      </button>
    </div>
  );
};

export default WishListButton;