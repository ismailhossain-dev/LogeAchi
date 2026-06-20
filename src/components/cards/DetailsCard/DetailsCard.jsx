"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import AddToCart from "@/components/buttons/AddToCart";

const DetailsCard = ({ product }) => {
  if (!product) {
    return (
      <div className="min-h-[450px] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-gray-500 tracking-wider uppercase">
            Loading Details...
          </p>
        </div>
      </div>
    );
  }

  const {
    title = "Product Title",
    price = 0,
    oldPrice: customOldPrice,
    image = "",
    images: productImages = [],
    colors = [],
    category = "General",
    stock = false,
    size: sizes = [],
    description = "",
    sku = "N/A",
    _id,
  } = product;

  // থাম্বনেইল গ্যালারি সেটআপ
  const galleryImages =
    productImages.length > 0 ? productImages : [image].filter(Boolean);

  // স্টেট ম্যানেজমেন্ট
  const [mainImage, setMainImage] = useState(image);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  // 🔴 ফিক্সড useEffect: শুধুমাত্র প্রোডাক্ট আইডি বা টাইটেল চেঞ্জ হলে ইনিশিয়াল স্টেট সেট হবে
  const prevProductIdRef = useRef(product.id || title);
  useEffect(() => {
    if (image) setMainImage(image);
    if (colors?.length > 0) setSelectedColor(colors[0].name);
    if (sizes?.length > 0) setSelectedSize(sizes[0]);
    setQuantity(1);
  }, [product.id, title]); // সাইজ বা কালার স্টেট চেঞ্জে যেন রিসেট না হয়

  // ওল্ড প্রাইস ক্যালকুলেশন
  const displayedOldPrice = customOldPrice
    ? Number(customOldPrice).toFixed(2)
    : (price * 1.25).toFixed(2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 antialiased">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16">
        {/* ================= বাম পাশ: ইমেজ গ্যালারি (Premium Look) ================= */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-50 border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md">
            {mainImage ? (
              <Image
                src={mainImage}
                alt={title}
                fill
                priority
                sizes="(max-w-7xl) 50vw, 100vw"
                className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium">
                No Image Available
              </div>
            )}

            {!stock && (
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-md shadow-sm">
                Sold Out
              </div>
            )}
          </div>

          {/* থাম্বনেইল লিস্ট (যদি একাধিক ইমেজ থাকে) */}
          {galleryImages.length > 1 && (
            <div className="grid grid-cols-4 gap-3 sm:gap-4">
              {galleryImages.map((img, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setMainImage(img)}
                  className={`relative aspect-square rounded-xl overflow-hidden bg-white border-2 transition-all duration-200 ${
                    mainImage === img
                      ? "border-black scale-[0.98] shadow-sm"
                      : "border-gray-200/60 opacity-70 hover:opacity-100 hover:border-gray-400"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    sizes="20vw"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ================= ডান পাশ: প্রোডাক্ট ইনফরমেশন ================= */}
        <div className="lg:col-span-6 flex flex-col justify-between py-2">
          <div>
            {/* ক্যাটাগরি ও স্টক ব্যাজ */}
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="text-xs sm:text-sm font-bold tracking-widest text-neutral-400 uppercase">
                {category}
              </span>
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide border ${
                  stock
                    ? "bg-emerald-50/60 text-emerald-700 border-emerald-200/60"
                    : "bg-rose-50 text-rose-700 border-rose-200/60"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full mr-2 ${stock ? "bg-emerald-500" : "bg-rose-500"}`}
                ></span>
                {stock ? "Available" : "Out of Stock"}
              </span>
            </div>

            {/* প্রোডাক্ট টাইটেল */}
            <h1 className="text-2xl sm:text-3xl xl:text-4xl font-extrabold tracking-tight text-neutral-900 leading-tight mb-4">
              {title}
            </h1>

            {/* প্রাইস সেকশন */}
            <div className="flex items-baseline gap-3 mb-6 bg-neutral-50 p-3 sm:p-4 rounded-xl border border-neutral-100">
              <span className="text-2xl sm:text-3xl font-black text-neutral-950">
                ${Number(price).toFixed(2)}
              </span>
              <span className="text-base text-neutral-400 line-through font-medium">
                ${displayedOldPrice}
              </span>
              <span className="ml-auto text-xs font-bold text-emerald-600 bg-emerald-100/60 px-2 py-0.5 rounded">
                25% OFF
              </span>
            </div>

            {/* ডেসক্রিপশন */}
            <div className="mb-6">
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                {description || "No description provided for this product."}
              </p>
            </div>

            <hr className="border-neutral-200/80 mb-6" />

            {/* কালার সিলেক্টর */}
            {colors?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs font-bold tracking-wider text-neutral-800 uppercase mb-3">
                  Color:{" "}
                  <span className="text-neutral-500 font-semibold lowercase first-letter:uppercase">
                    {selectedColor}
                  </span>
                </h3>
                <div className="flex items-center gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-7 h-7 rounded-full transition-all duration-200 ${color.class || "bg-gray-200"} ${
                        selectedColor === color.name
                          ? "ring-2 ring-offset-2 ring-neutral-950 scale-110 shadow-sm"
                          : "hover:scale-105 opacity-90"
                      }`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* সাইজ সিলেক্টর (স্মুথ ডিজাইন ও ওয়ার্কিং) */}
            {sizes?.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold tracking-wider text-neutral-800 uppercase">
                    Select Size
                  </span>
                  {selectedSize && (
                    <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                      Selected: {selectedSize}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[48px] h-10 px-3.5 text-xs font-bold rounded-xl border transition-all duration-200 uppercase tracking-wide flex items-center justify-center ${
                        selectedSize === size
                          ? "bg-neutral-950 text-white border-neutral-950 shadow-sm"
                          : "bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* কোয়ান্টিটি সিলেক্টর */}
            <div className="mb-8">
              <span className="text-xs font-bold tracking-wider text-neutral-800 uppercase block mb-3">
                Quantity
              </span>
              <div className="flex items-center w-32 h-11 border border-neutral-200 bg-white rounded-xl shadow-sm p-1.5">
                <button
                  type="button"
                  onClick={() => quantity > 1 && setQuantity((p) => p - 1)}
                  disabled={quantity <= 1}
                  className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:text-neutral-950 hover:bg-neutral-100 rounded-lg transition-colors disabled:opacity-20 disabled:hover:bg-transparent"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="w-3.5 h-3.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 12h-15"
                    />
                  </svg>
                </button>
                <span className="flex-1 text-center font-bold text-sm text-neutral-900 select-none">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((p) => p + 1)}
                  className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:text-neutral-950 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="w-3.5 h-3.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {/* Add to Cart button  */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
              <AddToCart stock={stock} id={_id} />

              <button
                type="button"
                className="w-full sm:w-14 h-14 border border-neutral-200 bg-white hover:border-neutral-400 text-neutral-600 hover:text-neutral-900 rounded-xl flex items-center justify-center transition-all duration-200 shadow-sm transform active:scale-[0.99]"
                title="Add to Wishlist"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </button>
            </div>

            {/* SKU বা অতিরিক্ত বিবরণ */}
            {sku && sku !== "N/A" && (
              <p className="mt-6 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                SKU: <span className="text-neutral-600 font-medium">{sku}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsCard;
