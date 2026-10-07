"use client";

import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const WishListButton = ({ product }) => {
  const axiosSecure = useAxiosSecure();
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();

  const [isAdding, setIsAdding] = useState(false);

  const actualId = product?._id || product?.id;
  const email = session?.user?.email;

  const { data: userWishlist = [], isLoading: wishlistLoading } = useQuery({
    queryKey: ["user-wishlist", email],

    queryFn: async () => {
      const res = await axiosSecure.get(`/api/wishlist?email=${email}`);

      return res.data?.result || [];
    },

    enabled: !!email && !!actualId,
  });

  const isWishlisted = userWishlist.some(
    (item) => item.productId === actualId
  );

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (status === "loading" || wishlistLoading || isAdding) return;

    if (!session?.user) {
      toast.error("Please login first to add to wishlist!");
      return;
    }

    if (!actualId) {
      toast.error("Product ID not found!");
      return;
    }

    if (isWishlisted) {
      toast.info("This item is already in your wishlist!");
      return;
    }

    try {
      setIsAdding(true);

      const res = await axiosSecure.post("/api/wishlist", {
        productId: actualId,
        title: product.title,
        price: product.price,
        image: product.image,
        size: product.size,
        email: email,
        name: session.user.name,
        createdAt: new Date().toISOString(),
      });

      if (res.data?.isWishlisted) {
        toast.success("Product added to wishlist!");

        await queryClient.invalidateQueries({
          queryKey: ["user-wishlist", email],
        });
      }
    } catch (error) {
      if (error.response?.status === 400) {
        toast.info("This item is already in your wishlist!");
      } else {
        toast.error("Failed to add to wishlist. Try again!");
      }
    } finally {
      setIsAdding(false);
    }
  };

  if (!product) return null;

  if (status === "loading" || wishlistLoading) {
    return (
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg">
        <span className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleWishlist}
      disabled={isAdding}
      aria-label={
        isWishlisted ? "Remove from wishlist" : "Add to wishlist"
      }
      title={
        isWishlisted ? "Already in wishlist" : "Add to wishlist"
      }
      className={`
        w-10 h-10
        rounded-full
        flex items-center justify-center
        shadow-lg
        transition-all duration-300
        focus:outline-none
        focus:ring-2 focus:ring-orange-400
        cursor-pointer
        disabled:cursor-not-allowed
        disabled:opacity-70

        opacity-100 translate-x-0
        lg:opacity-0
        lg:translate-x-8
        lg:group-hover:translate-x-0
        lg:group-hover:opacity-100

        ${
          isWishlisted
            ? "bg-[#ff6801] text-white scale-105"
            : "bg-white text-gray-700 hover:bg-gray-100 hover:scale-105"
        }
      `}
    >
      {isAdding ? (
        <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <FiHeart
          className={`
            w-5 h-5
            transition-all duration-300
            ${
              isWishlisted
                ? "fill-current scale-110"
                : "group-hover:scale-110"
            }
          `}
        />
      )}
    </button>
  );
};

export default WishListButton;