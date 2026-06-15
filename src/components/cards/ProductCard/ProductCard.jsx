"use client"
import ProductModel from "@/components/model/ProductModel";
import { useAuth } from "@/hooks/useAuth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { FiHeart, FiEye } from "react-icons/fi";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const axiosSecure = useAuth();

  // ইউজার ডাটা অ্যাক্সেস (এখানে data কে session নামে রিনেম করা হয়েছে)
  const { data: session, status } = useSession();
  
  const userInitial = session?.user?.name ? session.user.name.charAt(0).toUpperCase() : "U";
  // console.log("user data product card ", userInitial);

  const { title, price, image, _id } = product;

  // স্টেটস
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  // মডালের ভেতরের স্টেটগুলো
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  // সেশন লোডিং হ্যান্ডেল
  if (status === "loading") {
    return <p className="text-center py-2">Loading...</p>;
  }

  // এখানে আগে 'data' লিখা ছিল যা ভুল ছিল, এখন 'session?.user' দেওয়া হয়েছে
  console.log("product card user data", session?.user);

  if (!product) {
    return (
      <div className="text-center py-5 font-semibold text-gray-500">
        PRODUCT CARD LOADING....
      </div>
    );
  }

  // ইভেন্ট হ্যান্ডলারস
const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // ১. ইউজার সেশন অথবা axiosSecure না থাকলে রিকোয়েস্ট পাঠাবে না
    if (!session?.user || !axiosSecure) {
      toast.success("Please login first or wait until the session loads!");
      return;
    }

    setIsWishlisted(!isWishlisted);

    try {
      // ২. '.POST' পরিবর্তন করে ছোট হাতের '.post' করা হয়েছে
      const res = await axiosSecure.post("/api/wishlist", {
        productId: _id,
        title: title,
        price: price,
        image: image,
        userEmail: session?.user?.email,
        userName: session?.user?.name
      });
      console.log("Wishlist Response:", res.data);
    } catch (error) {
      console.error("Wishlist Error:", error);
    }
  };
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddedToCart(!isAddedToCart);
  };

  const openQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(true);
  };

  return (
    <>
      {/* মেইন প্যারেন্ট কার্ড */}
      <Link href={`/all-collection/${_id}`}>
        <div className="group flex flex-col justify-center cursor-pointer max-w-[300px] mx-auto relative">
          {/* Image Container */}
          <div className="bg-[#f6f6f6] rounded-lg overflow-hidden relative w-[300px] h-[300px] flex items-center justify-center shadow-sm">
            <div className="w-full h-full transition-all duration-500 group-hover:opacity-0 group-hover:scale-95 relative">
              <Image src={image} fill sizes="300px" alt={title} className="object-cover" />
            </div>
            <div className="absolute bottom-4 left-4 z-10 w-[60px] h-[60px] transition-all duration-500 ease-in-out p-1 bg-white rounded-md border border-gray-200
                        group-hover:bottom-0 group-hover:left-0 group-hover:w-full group-hover:h-full group-hover:p-0 group-hover:bg-[#f6f6f6] group-hover:border-none group-hover:rounded-lg">
              <Image src={image} fill sizes="300px" alt={`${title}-hover`} className="object-cover" />
            </div>

            {/* অ্যাকশন আইকন গ্রুপ */}
            <div className="absolute top-4 right-4 z-20 flex flex-col gap-2.5">
              {/* WishList Button */}
              <button onClick={handleWishlist} className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 delay-75 focus:outline-none ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-[#ff6801] hover:text-white'}`}>
                <FiHeart className={`w-5 h-5 ${isWishlisted ? 'scale-110 fill-current' : 'group-hover:scale-110'}`} />
              </button>

              {/* Details model button */}
              <button onClick={openQuickView} className="w-10 h-10 bg-white hover:bg-[#ff6801] text-gray-700 hover:text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 delay-100 focus:outline-none">
                <FiEye className="w-5 h-5 group-hover:scale-110" />
              </button>

              {/* Add to card button */}
              <button onClick={handleAddToCart} className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 delay-150 focus:outline-none ${isAddedToCart ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-[#ff6801] hover:text-white'}`}>
                <BsCart3 className="w-5 h-5 group-hover:scale-110" />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="text-center mt-4">
            <h3 className="text-[16px] text-gray-800 font-medium line-clamp-1">{title}</h3>
            <p className="text-[17px] font-bold mt-2 text-secondary">${price}</p>
          </div>
        </div>
      </Link>

      {/* Quick View Modal */}
      <ProductModel
        showModal={showModal}
        onClose={() => setShowModal(false)}
        product={product}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        quantity={quantity}
        setQuantity={setQuantity}
        setIsAddedToCart={setIsAddedToCart}
      />
    </>
  );
};

export default ProductCard;