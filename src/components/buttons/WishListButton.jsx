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

  // ১. সেফটি চেক: লোডিং অবস্থায় বা প্রোডাক্ট না থাকলে আগেই রিটার্ন করবে
  if (status === "loading") {
    return <p className="text-center py-2 text-sm text-gray-500">Loading...</p>;
  }

  if (!product) return null;

  // ২. প্রোডাক্ট অবজেক্ট থেকে ডেটা ডিস্ট্রাকচার
  const { _id, id, title, price, image } = product;
  const actualId = _id || id; 

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // ইউজার লগইন চেক
    if (!session?.user) {
      toast.error("Please login first to add to wishlist!");
      return;
    }

    if (!axiosSecure) {
      toast.info("Axios secure connection error...");
      return;
    }

    // অপটিমিস্টিক আপডেট (ক্লিক করলেই আগে ট্রু করে দেওয়া হলো)
    setIsWishlisted(true);

    try {
      const res = await axiosSecure.post("/api/wishlist", {
        productId: actualId,
        title: title,
        price: price,
        image: image,
        userEmail: session?.user?.email,
        userName: session?.user?.name,
      });

      if (res.status === 200) {
        toast.success("Product added to wishlist!");
      }
    } catch (error) {
      console.error("Wishlist Error:", error);
      setIsWishlisted(false); // এরর বা অলরেডি এক্সিস্ট হলে আবার false (ডিফল্ট) হয়ে যাবে

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
        // কন্ডিশনাল ক্লাসে চেঞ্জ আনা হয়েছে: 
        // True হলে: ব্যাকগ্রাউন্ড কমলা (#ff6801) এবং হার্ট আইকন সাদা হবে।
        // False (ডিফল্ট) হলে: ব্যাকগ্রাউন্ড সাদা এবং হার্ট আইকন কালো/ধূসর থাকবে।
        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 delay-75 focus:outline-none ${
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