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
                className="btn w-full sm:flex-1 h-14  disabled:cursor-not-allowed "
              >
                {stock ? 'Add to Cart' : 'Out of Stock'}
              </button>
     
        </Link>
    );
};

export default AddToCart;