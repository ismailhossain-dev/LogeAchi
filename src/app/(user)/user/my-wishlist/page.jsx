"use client"
import WishListTable from '@/components/Dashboard/ui/WishListTable';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import React from 'react';

const dashboarWishListPage = () => {
    const axiosSecure = useAxiosSecure()

    const {data: session, status} = useSession()
    if(status === "loading"){
      <p className="text-center py-2 text-sm text-gray-500">Loading...</p>;
    }

    // console.log(session);

    //url = http://localhost:3000/api/wishlist?email=sabbirvai69k@gmail.com

  //tanstack use because i need retetch for data delete
const {
  data: wishlistData,
  isLoading,
  refetch,
} = useQuery({
  queryKey: ["wishlist", session?.user?.email],
  queryFn: async () => {
    // Query Params use kore data get korbo 
  const res = await axiosSecure.get(
  `/api/wishlist?email=${session.user?.email}`
);
    return res.data;
  },
});

const wishlist = wishlistData?.result || [];

// console.log(wishlist);

    return (
        <div className='text-white'>
          {/* shadcn table use */}
          
            <div>
              
             <WishListTable wishlist={wishlist} refetch={refetch}></WishListTable>
            </div>
        </div>
    );
};

export default dashboarWishListPage;