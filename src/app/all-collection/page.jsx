import ProductCard from '@/components/cards/ProductCard/ProductCard';
import SearchBar from '@/components/SearchBar/SearchBar';
import Footer from '@/components/shared/Footer/Footer';
import Title from '@/components/Title/Title';
import Link from 'next/link';
import React from 'react';

const allCollectionPage = async ({ searchParams }) => {
  const params = await searchParams; 
  const searchQuery = params?.search?.toLowerCase() || "";
  const selectedCategory = params?.category || ""; 

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/all-products`, {
    cache: "no-store" 
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  
  // ১. সার্চ ফিল্টারিং
  let filteredProducts = data.result.filter((product) =>
    product.title.toLowerCase().includes(searchQuery)
  );

  // ইউনিক ক্যাটাগরি লিস্ট
  const getCategory = filteredProducts.map((cate) => cate.category);
  const finalCategory = [...new Set(getCategory)];

  // ২. ক্যাটাগরি ফিল্টারিং
  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }

  //console.log(finalCategory)//ekane sob category pabo

  return (
    <div className="flex flex-col min-h-screen text-white ">
      {/* 🛠️ আল্ট্রা-স্মুথ প্রোডাক্ট ফেইড এবং মোবাইলের জন্য প্রিমিয়াম স্ক্রোলবার স্টাইল */}
      <style>{`
        @keyframes ultraSmoothReveal {
          0% {
            opacity: 0;
            filter: blur(4px);
            transform: translateY(16px);
          }
          100% {
            opacity: 1;
            filter: blur(0);
            transform: translateY(0);
          }
        }
        .product-card-animate {
          animation: ultraSmoothReveal 0.5s cubic-bezier(0.215, 0.610, 0.355, 1) forwards;
          opacity: 0;
        }
        
        /* 📱 মোবাইলের জন্য কাস্টম স্ক্রোলবার ভিজ্যুয়াল ইফেক্ট */
        .mobile-scrollbar::-webkit-scrollbar {
          height: 5px !important; /* স্ক্রোলবারের থিকনেস */
          display: block !important;
        }
        .mobile-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 99px;
        }
        .mobile-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.4); /* ব্লু থিম থিম কালার */
          border-radius: 99px;
        }
        .mobile-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.7);
        }
      `}</style>

      <div className='max-w-7xl mx-auto px-5 w-full flex-grow'>
        
        {/* হেডার ও সার্চ বার */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center italic my-8 gap-4 border-b border-white/5 pb-6'>
          <Title>Shop <br/> <span className='text-blue-500 font-bold'>All Collection</span></Title>
          <SearchBar/>
        </div>

        {/* 🌟 মেইন লেআউট কন্টেইনার */}
        <div className='flex flex-col md:grid md:grid-cols-4 gap-8 my-6 items-start'>
          
          {/* 📁 ক্যাটাগরি সেকশন (ডেস্কটপে সাইডবার, মোবাইলে টপ স্ক্রোল রো) */}
          {/* 🛠️ ফিক্স: মোবাইলের জন্য overflow-hidden বাদ দিয়ে overflow-x-auto করা হয়েছে */}
          <div className='w-full md:col-span-1 bg-[#0f172a] border border-white/5 md:rounded-xl md:p-2 md:sticky md:top-24 z-10 overflow-x-auto md:overflow-hidden shadow-2xl'>
            
            <h3 className='hidden md:block text-[10px] font-bold uppercase tracking-widest text-gray-500 p-4 pb-2 select-none'>
              Browse Categories
            </h3>
            
            {/* 🛠️ ফিক্স: ফ্লেক্স আইটেমগুলোর সর্বোচ্চ উইথ ব্লক হওয়া রোধ করতে w-max যোগ করা হয়েছে */}
            <div className='w-full flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible md:overflow-y-auto mobile-scrollbar scroll-smooth flex-nowrap pb-3 md:pb-0 min-w-full w-max md:w-full'>
              
              {/* "ALL" Products বাটন */}
              <Link
                href={`?search=${searchQuery}`}
                className={`px-6 py-4 text-xs md:text-sm font-bold tracking-wider transition-colors duration-200 flex items-center justify-between gap-4 shrink-0 whitespace-nowrap uppercase
                  ${!selectedCategory 
                    ? 'bg-white/[0.04] text-white border-b-2 md:border-b-0 md:border-l-2 border-blue-500' 
                    : 'text-gray-400 border-b-2 md:border-b-0 md:border-l-2 border-transparent hover:text-white hover:bg-white/[0.02]'
                  }`}
              >
                <span className="flex items-center gap-2">ALL</span>
                <span className={`text-[10px] transition-transform duration-300 hidden md:inline ${!selectedCategory ? 'translate-x-0 text-blue-500' : 'translate-x-2 text-transparent'}`}>
                  ➔
                </span>
              </Link>

              {/* ডায়নামিক ক্যাটাগরি লিস্ট */}
              {finalCategory.map((category, index) => {
                const isActive = selectedCategory.toLowerCase() === category.toLowerCase();
                
                return (
                  <Link
                    key={index}
                    href={`?search=${searchQuery}&category=${encodeURIComponent(category)}`}
                    className={`px-6 py-4 text-xs md:text-sm font-bold tracking-wider transition-colors duration-200 flex items-center justify-between gap-8 shrink-0 whitespace-nowrap uppercase group
                      ${isActive 
                        ? 'bg-white/[0.04] text-white border-b-2 md:border-b-0 md:border-l-2 border-blue-500' 
                        : 'text-gray-400 border-b-2 md:border-b-0 md:border-l-2 border-transparent hover:text-white hover:bg-white/[0.02]'
                      }`}
                  >
                    <span>{category}</span>
                    <span className={`text-[10px] transition-all duration-300 hidden md:inline ${isActive ? 'translate-x-0 text-blue-500' : 'translate-x-2 text-gray-600 group-hover:text-gray-400 group-hover:translate-x-0'}`}>
                      ➔
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
          
          {/* 📦 ডান পাশের প্রোডাক্ট গ্রিড */}
          <div className='w-full md:col-span-3'>
            {filteredProducts.length > 0 ? (
              <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
                {filteredProducts.map((product, index) => (
                  <div 
                    key={product._id} 
                    className="product-card-animate"
                    style={{ animationDelay: `${Math.min(index * 30, 300)}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 font-medium text-gray-500 bg-[#0d0d11] border border-white/5 rounded-xl w-full product-card-animate">
                No products found matching your selection.
              </div>
            )}
          </div>

        </div>
        
      </div>
      <Footer/>
    </div>
  );
};

export default allCollectionPage;