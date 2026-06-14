import ProductCard from '@/components/cards/ProductCard/ProductCard';
import React from 'react';

const allCollectionPage = async() => {
const res = await fetch("http://localhost:3000/api/homeProducts");

  if (!res.ok) {
    throw new Error("Failed to all products fetch products");
  }

  const data = await res.json();
//   console.log("all products data",data.result);
//   console.log("all products", data);
    return (
        <div className='max-w-7xl mx-auto overflow-hidden px-5'>
           <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 items-center my-10'>
            {
                data.result.map((product)=> <ProductCard key={product._id} product={product}></ProductCard>)
            }
           </div>
           <h1>Hello</h1>
        </div>
    );
};

export default allCollectionPage;