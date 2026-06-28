"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // URL-এ আগে থেকে কোনো সার্চ কুয়েরি থাকলে তা ইনিশিয়াল স্টেট হিসেবে সেট হবে
  const [text, setText] = useState(searchParams.get("search") || "");

  // যদি ইউজার URL থেকে সার্চ কুয়েরি মুছে দেয়, তবে ইনপুট বক্সও খালি হয়ে যাবে
  useEffect(() => {
    setText(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!text.trim()) {
      // ইনপুট খালি থাকলে মূল পেজে রিডাইরেক্ট করবে (সব প্রোডাক্ট দেখানোর জন্য)
      router.push("/all-collection");
    } else {
      // URL-এ সার্চ কুয়েরি যোগ করবে
      router.push(`/all-collection?search=${encodeURIComponent(text.trim())}`);
    }
  };

  return (
   <form onSubmit={handleSearch} className="w-full md:max-w-md px-2">
  <div className="relative flex items-center w-full bg-white rounded-xl shadow-sm border border-gray-200 focus-within:border-[#ff6801] focus-within:ring-1 focus-within:ring-[#ff6801] transition-all duration-200">
    {/* বাকি ভেতরের কোড একদম এক থাকবে */}
    <input
      type="text"
      placeholder="Search products by title..."
      value={text}
      onChange={(e) => setText(e.target.value)}
      className="w-full h-11 pl-4 pr-12 rounded-xl text-sm text-gray-800 bg-transparent focus:outline-none"
    />
    <button
      type="submit"
      className="absolute right-1.5 w-8 h-8 bg-[#ff6801] hover:bg-[#e05b00] text-white rounded-lg flex items-center justify-center transition-colors focus:outline-none active:scale-95"
      aria-label="Search"
    >
      <FiSearch className="text-sm" />
    </button>
  </div>
</form>
  );
};

export default SearchBar;