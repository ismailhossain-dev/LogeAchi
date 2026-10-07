"use client";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useSession } from "next-auth/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { toast } from "react-toastify";
const AddToCartButton = ({ product }) => {
  const axiosSecure = useAxiosSecure();
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const productId = product?._id || product?.id;
  const userEmail = session?.user?.email;
  const { data: cartStatus } = useQuery({
    queryKey: ["cart-status", userEmail, productId],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/cart?userEmail=${userEmail}&productId=${productId}`,
      );
      return res.data;
    },
    enabled: !!userEmail && !!productId && !!axiosSecure,
  });
  const isAddedToCart = cartStatus?.isAddedToCart === true;
  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (status === "loading" || isAdding) return;
    if (!session?.user?.email) {
      toast.error("Please login to add products to cart!");
      return;
    }
    if (!productId) {
      toast.error("Product ID not found!");
      return;
    }
    if (isAddedToCart) {
      toast.info("This item is already in your cart!");
      return;
    }
    try {
      setIsAdding(true);
      const res = await axiosSecure.post("/api/cart", {
        productId,
        title: product.title,
        price: product.price,
        size: product.size,
        image: product.image,
        userEmail,
        userName: session.user.name,
        createdAt: new Date().toISOString(),
      });
      if (res.data?.isAddedToCart) {
        toast.success("Product added to cart!");
        await queryClient.invalidateQueries({
          queryKey: ["cart-status", userEmail, productId],
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      if (error.response?.status === 400) {
        toast.info(
          error.response.data?.message || "This item is already in your cart!",
        );
        await queryClient.invalidateQueries({
          queryKey: ["cart-status", userEmail, productId],
        });
      } else {
        toast.error(
          error.response?.data?.message || "Failed to add to cart. Try again!",
        );
      }
    } finally {
      setIsAdding(false);
    }
  };
  if (status === "loading") {
    return (
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg">
        {" "}
        <span className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />{" "}
      </div>
    );
  }
  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={isAdding}
      aria-label={isAddedToCart ? "Already added to cart" : "Add to cart"}
      title={isAddedToCart ? "Already added to cart" : "Add to cart"}
      className={` w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 opacity-100 translate-x-0 lg:opacity-0 lg:translate-x-8 lg:group-hover:translate-x-0 lg:group-hover:opacity-100 delay-150 ${isAddedToCart ? "bg-green-600 text-white scale-105" : "bg-white text-gray-700 hover:bg-[#ff6801] hover:text-white hover:scale-105"} `}
    >
      {" "}
      {isAdding ? (
        <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <BsCart3
          className={` w-5 h-5 transition-transform duration-300 ${isAddedToCart ? "scale-110" : "group-hover:scale-110"} `}
        />
      )}{" "}
    </button>
  );
};
export default AddToCartButton;
