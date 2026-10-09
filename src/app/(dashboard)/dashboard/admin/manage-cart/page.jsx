import CartTable from "@/components/admin/Tables/CartTable/CartTable";
import React from "react";


const AdminManageCart = async () => {
  let initialCart = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/admin/cart`, {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      initialCart = data?.data || data?.result || [];
    }
  } catch (error) {
    console.log("Failed to fetch cart data:", error);
  }

  return <CartTable initialCart={initialCart} />;
};

export default AdminManageCart;