import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BsCart3 } from 'react-icons/bs';
import { FiHeart, FiEye } from 'react-icons/fi';

const ProductCard = ({ product }) => {
    const { title, price, image } = product;
    
    return (
        // মেইন প্যারেন্ট কার্ড
        <div className='group flex flex-col justify-center cursor-pointer max-w-[300px] mx-auto relative'>
            
            {/* Image Container: w-[300px] h-[300px] */}
            <div className='bg-[#f6f6f6] rounded-lg overflow-hidden relative w-[300px] h-[300px] flex items-center justify-center'>
                
                {/* ১. প্রথম (বড়) ইমেজ কন্টেইনার - এটিকে full width & height দেওয়া হয়েছে এবং প্যাডিং সরানো হয়েছে */}
                <div className='w-full h-full transition-all duration-500 group-hover:opacity-0 group-hover:scale-95 relative'>
                    <Image 
                        src={image} 
                        layout="fill" // ইমেজটিকে কন্টেইনারের ফুল সাইজ করার জন্য
                        alt='product-image'
                        className='object-cover w-full h-full' // object-cover ব্যবহার করলে পুরো জায়গা জুড়ে পারফেক্টলি বসবে
                    />
                </div>

                {/* ২. দ্বিতীয় ইমেজ কন্টেইনার (হোভার করলে পুরো কার্ডের সমান হবে) */}
                <div className='absolute bottom-4 left-4 z-10 w-[60px] h-[60px] transition-all duration-500 ease-in-out p-1 bg-white rounded-md border border-gray-200
                    group-hover:bottom-0 group-hover:left-0 group-hover:w-full group-hover:h-full group-hover:p-0 group-hover:bg-[#f6f6f6] group-hover:border-none group-hover:rounded-lg'>
                    
                    <Image 
                        src={image}
                        layout="fill"
                        alt='product-image-hover'
                        className='object-cover' // এটিকে ও কভার করা হয়েছে যাতে হোভারে সমান দেখায়
                    />
                </div>

                {/* ৩. Love এবং Eye আইকন গ্রুপ */}
                <div className='absolute top-4 right-4 z-20 flex flex-col gap-2 opacity-0 translate-x-4 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-0'>
                    {/* Love Icon */}
                    <button className='w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-[#ff6801] hover:text-white shadow-md transition-all duration-205'>
                        <FiHeart className="w-5 h-5" />
                    </button>
                    {/* Eye Icon */}
                    <Link href={"/product-details"} className='w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-[#ff6801] hover:text-white shadow-md transition-all duration-205'>
                        <FiEye className="w-5 h-5" />
                    </Link>
                </div>

            </div>

            {/* Product Information */} 
            <div className='text-center mt-4'>
                <h3 className='text-[16px] text-gray-800 font-medium line-clamp-1'>{title}</h3>
                <p className='text-[17px] font-bold mt-2 text-[#ff6801]'>${price}</p>
                
                {/* Add to Cart Button */}
                <div className='flex items-center justify-center gap-2 border-2 border-[#e5e5e5] bg-transparent text-black hover:bg-[#ff6801] hover:text-white px-5 py-2.5 rounded-lg transition-all duration-300 ease-in-out cursor-pointer mt-4'>
                    <Link href={"/product-details"}>Add to Cart</Link>
                    <span><BsCart3 className="w-5 h-5" /></span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;