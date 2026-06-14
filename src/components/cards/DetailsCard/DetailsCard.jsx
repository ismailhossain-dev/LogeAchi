'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const DetailsCard = ({ product }) => {
  // প্রোপস থেকে সব ডেটা ডাইনামিকালি ডিস্ট্রাকচার করা হচ্ছে এবং ব্যাকআপ ভ্যালু রাখা হয়েছে

  if(!product) return <div> DETAILS LOADING...</div>
  const { 
    title = "Product Title", 
    price = 0, 
    oldPrice: customOldPrice, // যদি ব্যাকএন্ড থেকে ওল্ড প্রাইস আসে
    image = "", 
    images: productImages = [], // ডাইনামিক ইমেজ অ্যারে
    colors = [], // ডাইনামিক কালার অ্যারে (যেমন: [{ name: 'Black', class: 'bg-black' }])
    category = "General", 
    stock = false, 
    size = [], 
    description = "",
    sku = "N/A",
    tags = []
  } = product || {};

  // যদি আলাদা করে ৪টি ইমেজের অ্যারে না থাকে, তবে মূল ইমেজটিকেই গ্যালারি বানাবে
  const galleryImages = productImages.length >= 4 
    ? productImages.slice(0, 4) 
    : [image, image, image, image].filter(Boolean);

  // স্টেট ম্যানেজমেন্ট (ডাইনামিক ডেটার ওপর ভিত্তি করে)
  const [mainImage, setMainImage] = useState(image);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  // যখনই প্রোডাক্ট পরিবর্তন হবে, স্টেটগুলো স্বয়ংক্রিয়ভাবে আপডেট হবে
  useEffect(() => {
    if (image) setMainImage(image);
    if (colors && colors.length > 0) setSelectedColor(colors[0].name);
    if (size && size.length > 0) setSelectedSize(size[0]);
    setQuantity(1);
  }, [product, image, colors, size]);

  // যদি ওল্ড প্রাইস না দেওয়া থাকে, তবে আসল দামের চেয়ে ২৫% বাড়িয়ে ফেক ওল্ড প্রাইস দেখাবে
  const displayedOldPrice = customOldPrice 
    ? Number(customOldPrice).toFixed(2) 
    : (price * 1.25).toFixed(2);

  // কোয়ান্টিটি কন্ট্রোল
  const handleDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        
        {/* বাম পাশ: ডাইনামিক ইমেজ গ্যালারি */}
        <div className="flex flex-col gap-4">
          {/* মেইন ইমেজ */}
          <div className="relative group aspect-square w-full overflow-hidden rounded-2xl bg-gray-100 border border-gray-200">
            {mainImage ? (
              <Image
                src={mainImage}
                alt={title}
                fill
                priority
                sizes="(max-w-7xl) 50vw, 100vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">No Image Available</div>
            )}
            
            {/* হোভার জুম আইকন */}
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
              <div className="bg-white/90 p-3 rounded-full shadow-md backdrop-blur-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-800">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637zM10.5 7.5v6m3-3h-6" />
                </svg>
              </div>
            </div>
          </div>

          {/* থাম্বনেইল লিস্ট */}
          {/* <div className="grid grid-cols-4 gap-4">
            {galleryImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setMainImage(img)}
                className={`relative aspect-square rounded-xl overflow-hidden bg-gray-50 border-2 transition-all ${
                  mainImage === img ? 'border-black ring-2 ring-black/10' : 'border-transparent hover:border-gray-300'
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  sizes="25vw"
                  className="object-cover object-center"
                />
              </button>
            ))}
          </div> */}
        </div>

        {/* ডান পাশ: প্রোডাক্ট ইনফরমেশন */}
        <div className="flex flex-col justify-between">
          <div>
            {/* ক্যাটাগরি এবং স্টক স্ট্যাটাস */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold tracking-wider text-gray-500 uppercase">{category}</span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-wide ${
                stock 
                  ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20' 
                  : 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${stock ? 'bg-green-600' : 'bg-red-600'}`}></span>
                {stock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* টাইটেল */}
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-3">{title}</h1>

            {/* রেটিং (স্ট্যাটিক ৪.৮ স্টার) */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-medium text-gray-600">4.8 (124 reviews)</span>
            </div>

            {/* প্রাইস */}
            <div className="flex items-baseline gap-4 mb-6 pb-6 border-b border-gray-200">
              <span className="text-3xl font-bold tracking-tight text-gray-900">${Number(price).toFixed(2)}</span>
              <span className="text-lg text-gray-400 line-through">${displayedOldPrice}</span>
            </div>

            {/* ডেসক্রিপশন */}
            <div className="mb-8">
              <h3 className="sr-only">Description</h3>
              <p className="text-base text-gray-600 leading-relaxed">{description}</p>
            </div>

            {/* ডাইনামিক কালার সিলেক্টর (যদি কালার ডেটা থাকে) */}
            {colors && colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Color: <span className="text-gray-500 font-normal">{selectedColor}</span></h3>
                <div className="flex items-center gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-8 h-8 rounded-full transition-transform ${color.class || 'bg-gray-200'} ${
                        selectedColor === color.name 
                          ? 'scale-110 ring-2 ring-offset-2 ring-black' 
                          : 'hover:scale-105'
                      }`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ডাইনামিক সাইজ সিলেক্টর */}
            {size && size.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <button className="text-xs font-semibold text-gray-500 hover:text-black underline uppercase tracking-wider">Size Guide</button>
                </div>
                <div className="grid grid-cols-5 gap-2 sm:gap-3">
                  {size.map((sz) => (
                    <button
                      key={sz}
                      disabled={!stock}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-3 text-sm font-semibold rounded-lg border transition-all uppercase ${
                        !stock 
                          ? 'bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed'
                          : selectedSize === sz
                          ? 'bg-black border-black text-white shadow-sm'
                          : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50 hover:border-gray-300'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* কোয়ান্টিটি এবং অ্যাড টু কার্ট */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {/* প্লাস মাইনাস কাউন্টার */}
              <div className="flex items-center justify-between sm:justify-start border border-gray-200 rounded-lg p-1 bg-white h-14 sm:w-36">
                <button
                  onClick={handleDecrement}
                  disabled={!stock || quantity <= 1}
                  className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-black disabled:opacity-30 disabled:pointer-events-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                  </svg>
                </button>
                <span className="w-12 text-center text-base font-semibold text-gray-950 select-none">{quantity}</span>
                <button
                  onClick={handleIncrement}
                  disabled={!stock}
                  className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-black disabled:opacity-30"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </button>
              </div>

              {/* বাটন */}
              <button
                disabled={!stock}
                className="flex-1 h-14 bg-black hover:bg-neutral-800 text-white font-semibold rounded-lg tracking-wide shadow-md transition-colors disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                {stock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>

            {/* উইশলিস্ট ও শেয়ার */}
            <div className="flex items-center gap-4 py-4 border-t border-b border-gray-100 mb-8">
              <button className="flex flex-1 items-center justify-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition-colors py-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                Add to Wishlist
              </button>
              <div className="h-4 w-px bg-gray-200" />
              <button className="flex flex-1 items-center justify-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition-colors py-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186l5.566-2.783m-5.566 2.783l5.566 2.783m3.133-1.033a2.25 2.25 0 100-2.186m0 2.186l-5.566 2.783m5.566-2.783a2.25 2.25 0 100-2.186" />
                </svg>
                Share Product
              </button>
            </div>
          </div>

        
        </div>

      </div>
    </div>
  );
};

export default DetailsCard;