import useAxiosSecure from '@/hooks/useAxiosSecure';
import React, { useState } from 'react';
import { BsCart3 } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { toast } from 'react-toastify';
const AddToCartButton = ({product}) => {


const [isAddedToCart, setIsAddedToCart] = useState(false);

const axiosSecure = useAxiosSecure()
// provider er mardome kaj ta korchi but eta astese next auth teke 
const { data: session , status} = useSession()

 if (status === "loading") {
    return <p className="text-center py-2 text-sm text-gray-500">Loading...</p>;
  }

  //check user ache kin nai

  // if (!session?.user) {
  //       toast.error("Please login first to add to cart!");
  //       return;
  // }

  // console.log("user", session)

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddedToCart(!isAddedToCart);

    try {
      const res = axiosSecure.post("/api/cart", {
        productId: product._id,
        title: product.title,
        price: product.price,
        image: product.image,
        userEmail: session?.user?.email,
        userName: session?.user?.name,
        createdAt: new Date().toISOString(),
      });
      
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
    return (
        <div>
          <button onClick={handleAddToCart} className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 delay-150 focus:outline-none ${isAddedToCart ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-[#ff6801] hover:text-white'}`}>
                <BsCart3 className="w-5 h-5 group-hover:scale-110" />
              </button>
        </div>
    );
};

export default AddToCartButton;