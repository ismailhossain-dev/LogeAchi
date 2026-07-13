"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [text, setText] = useState(searchParams.get("search") || "");

  useEffect(() => {
    setText(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      router.push("/all-collection");
    } else {
      router.push(`/all-collection?search=${encodeURIComponent(text.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full md:max-w-sm px-1">
      <div className="relative flex items-center w-full bg-[#0f172a]/80 backdrop-blur-md rounded-xl border border-blue-500/50 focus-within:border-blue-500/50 focus-within:ring-2 focus-within:ring-blue-500/10 shadow-lg shadow-black/20 transition-all duration-300 group">
        
        {/* 🔍 ইনপুট ফিল্ড */}
        <input
          type="text"
          placeholder="Search products..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-11 pl-4 pr-12 text-xs md:text-sm text-gray-200 placeholder-gray-500 bg-transparent focus:outline-none tracking-wide"
        />
        
        {/* 🚀 প্রিমিয়াম সার্চ বাটন */}
        <button
          type="submit"
          className="absolute right-2 w-7 h-7 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center transition-all duration-200 active:scale-90 shadow-md shadow-blue-500/20 group-focus-within:scale-105"
          aria-label="Search"
        >
          <FiSearch className="text-xs transition-transform duration-300 group-hover:scale-110" />
        </button>

        {/* 🪄 বাটনের পেছনে হালকা গ্লো ইফেক্ট (যখন ইনপুট অ্যাক্টিভ হবে) */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/0 to-blue-500/5 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </form>
  );
};

export default SearchBar;