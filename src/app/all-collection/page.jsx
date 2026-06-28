import ProductCard from '@/components/cards/ProductCard/ProductCard';
import SearchBar from '@/components/SearchBar/SearchBar';

import Footer from '@/components/shared/Footer/Footer';
import Title from '@/components/Title/Title';
import React from 'react';

// Next.js সার্ভার কম্পোনেন্টে searchParams প্রপ্স হিসেবে সরাসরি পাওয়া যায়
const allCollectionPage = async ({ searchParams }) => {
  const params = await searchParams; 
  const searchQuery = params?.search?.toLowerCase() || "";

  const res = await fetch("http://localhost:3000/api/homeProducts", {
    cache: "no-store" // প্রতিবার নতুন সার্চের ডাটা পাওয়ার জন্য
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  
  // এপিআই থেকে আসা ডাটাকে সার্চ কুয়েরি অনুযায়ী ফিল্টার করা হচ্ছে
  const filteredProducts = data.result.filter((product) =>
    product.title.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className='max-w-7xl mx-auto overflow-hidden px-5 w-full flex-grow '>
        
       <div  className=' flex justify-between items-center'>
        <Title>Shop All Collection</Title>
         {/* সার্চ বার কম্পোনেন্ট */}
        <SearchBar/>
       </div>

        {/* প্রোডাক্ট লিস্ট বা গ্রিড */}
        {filteredProducts.length > 0 ? (
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 items-center my-10'>
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 font-medium text-gray-500">
            No products found matching &quot;{searchQuery}&quot;
          </div>
        )}
        
      </div>
      <Footer/>
    </div>
  );
};

export default allCollectionPage;