"use client";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { FiHeart } from "react-icons/fi";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const WishListButton = ({ product }) => {
  const axiosSecure = useAxiosSecure();
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) return null;

  const { _id, id, title, price, image, size } = product;
  const actualId = _id || id;

  // 📡 ১. ইউজারের ডাটাবেজ থেকে সম্পূর্ণ উইশলিস্ট ফেচ করা
  const { data: userWishlist = [] } = useQuery({
    queryKey: ["user-wishlist", session?.user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/wishlist?email=${session?.user?.email}`);
      return res.data; // আশা করা হচ্ছে এটি একটি অ্যারে রিটার্ন করে
    },
    //eta korle ekta sobida holo jotokon user email pabe totokon data fetch hobe na
    enabled: !!session?.user?.email && !!axiosSecure,
  });

  // 🔄 ২. রিলোড বা পেজ লোডের পর ডাটাবেজের তথ্যের সাথে ম্যাচ করানো
  useEffect(() => {
    if (userWishlist.length > 0 && actualId) {
      // আপনার এপিআই রেসপন্স অনুযায়ী `item.productId` অথবা `item._id` চেক করবেন
      const exists = userWishlist.some(
        (item) => item.productId === actualId || item._id === actualId
      );
      setIsWishlisted(exists);
    } else {
      setIsWishlisted(false);
    }
  }, [userWishlist, actualId]);

  // 🚀 ৩. উইশলিস্টে ডেটা পোস্ট করার হ্যান্ডলার
  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (status === "loading") return;

    if (!session?.user) {
      toast.error("Please login first to add to wishlist!");
      return;
    }

    if (!axiosSecure) {
      toast.info("Axios secure connection error...");
      return;
    }

    // যদি অলরেডি উইশলিস্টেড থাকে, তবে বাটন ক্লিক করলে ইউজারকে অ্যালার্ট করবে
    if (isWishlisted) {
      toast.info("This item is already in your wishlist!");
      return;
    }

    try {
      const res = await axiosSecure.post("/api/wishlist", {
        productId: actualId,
        title: title,
        price: price,
        image: image,
        size: size,
        email: session?.user?.email,
        name: session?.user?.name,
        createdAt: new Date().toISOString(),
      });

      if (res.data.result?.acknowledged === true) {
        toast.success("Product added to wishlist!");
        setIsWishlisted(true); // 🟢 লোকাল স্টেট সাথে সাথে কালারড করবে
        
        // React Query এর ক্যাশ রি-ফেচ করবে যাতে রিলোড ছাড়াও অন্য পেজে সিন্ক থাকে
        queryClient.invalidateQueries(["user-wishlist", session?.user?.email]);
        return;
      }
    } catch (error) {
      if (error.response?.status === 400) {
        toast.warning("This item is already in your wishlist!");
        setIsWishlisted(true); // 🟢 ডাটাবেজে অলরেডি থাকলে কালারড করে দেবে
      } else {
        toast.error("Failed to add to wishlist. Try again!");
      }
    }
  };

  if (status === "loading") {
    return (
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg">
        <span className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></span>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={handleWishlist}
        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 focus:outline-none cursor-pointer 
          opacity-100 translate-x-0 
          lg:opacity-0 lg:translate-x-8 lg:group-hover:translate-x-0 lg:group-hover:opacity-100 delay-75 ${
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