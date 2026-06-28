import useAxiosSecure from '@/hooks/useAxiosSecure';
import React, { useState } from 'react';
import { BsCart3 } from "react-icons/bs";
const AddToCartButton = ({product}) => {

const [isAddedToCart, setIsAddedToCart] = useState(false);

const axiosSecure = useAxiosSecure()


      const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddedToCart(!isAddedToCart);
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