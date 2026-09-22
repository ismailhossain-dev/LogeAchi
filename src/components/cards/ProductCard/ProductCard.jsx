"use client"
import AddToCartButton from "@/components/buttons/AddToCartButton";
import WishListButton from "@/components/buttons/WishListButton";
import ProductModel from "@/components/model/ProductModel";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FiEye } from "react-icons/fi";

const ProductCard = ({ product }) => {
  const { title, price, image, _id } = product;
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const openQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(true);
  };

  return (
    <>
      <Link href={`/all-collection/${_id}`} className="block w-full max-w-[300px] mx-auto">
        <div className="group flex flex-col justify-center cursor-pointer relative w-full">
          
          <div className="bg-[#f6f6f6] rounded-lg overflow-hidden relative w-full aspect-square flex items-center justify-center shadow-sm">
            
            <div className="w-full h-full transition-all duration-500 lg:group-hover:opacity-0 lg:group-hover:scale-95 relative">
              <Image src={image} fill sizes="300px" alt={title} className="object-cover" />
            </div>

            <div className="absolute transition-all duration-500 ease-in-out p-1 bg-white rounded-md border border-gray-200
                            bottom-0 left-0 w-full h-full p-0 bg-[#f6f6f6] border-none rounded-lg opacity-0 lg:opacity-100
                            lg:bottom-4 lg:left-4 lg:w-[60px] lg:h-[60px] lg:bg-white lg:rounded-md lg:border lg:border-gray-200
                            lg:group-hover:bottom-0 lg:group-hover:left-0 lg:group-hover:w-full lg:group-hover:h-full lg:group-hover:p-0 lg:group-hover:bg-[#f6f6f6] lg:group-hover:border-none lg:group-hover:rounded-lg">
              <Image src={image} fill sizes="300px" alt={`${title}-hover`} className="object-cover" />
            </div>

            <div className="absolute top-4 right-4 z-20 flex flex-col gap-2.5">
              
              <WishListButton product={product}/>

              <button 
                onClick={openQuickView} 
                className="w-10 h-10 bg-white hover:bg-[#ff6801] text-gray-700 hover:text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 focus:outline-none
                           opacity-100 translate-x-0 
                           lg:opacity-0 lg:translate-x-8 lg:group-hover:translate-x-0 lg:group-hover:opacity-100 delay-100"
              >
                <FiEye className="w-5 h-5 group-hover:scale-110" />
              </button>

              <AddToCartButton product={product}/>
            </div>
          </div>

          <div className="text-center mt-4">
            <h3 className="text-[16px] text-secondary font-medium line-clamp-1">{title}</h3>
            <p className="text-[17px] font-bold mt-2 text-secondary">৳ {price}</p>
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