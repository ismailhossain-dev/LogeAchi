import WishlistTable from "@/components/admin/Tables/WishlistTable/WishlistTable";
import React from "react";


const AdminWishlist = async () => {
  let wishlist = [];

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/admin/wishlist`,
      {
        cache: "no-store",
      },
    );
    
    if (response.ok) {
      const data = await response.json();
      wishlist = data?.data || [];
    }
  } catch (error) {
    console.log("Failed to fetch Admin wishlist:", error);
  }

  return <WishlistTable initialWishlist={wishlist} />;
};

export default AdminWishlist;