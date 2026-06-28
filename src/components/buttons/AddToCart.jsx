"use client"
import Link from 'next/link';
import React from 'react';

const AddToCart = ({product}) => {
    const {stock} = product;
    // console.log("add to cart button ", product);
    return (
        <Link href={`/checkout`} className='flex flex-col sm:flex-row items-center gap-3 w-full'>

               <button
                type="button"
                disabled={!stock}
                className="w-full sm:flex-1 h-14 bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-sm tracking-widest uppercase rounded-xl shadow-sm transition-all duration-300 disabled:bg-neutral-100 disabled:text-neutral-400 disabled:cursor-not-allowed transform active:scale-[0.99]"
              >
                {stock ? 'Add to Cart' : 'Out of Stock'}
              </button>
     
        </Link>
    );
};

export default AddToCart;