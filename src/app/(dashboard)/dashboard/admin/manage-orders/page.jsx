import OrdersTable from "@/components/admin/Tables/OrdersTable/OrdersTable";
import React from "react";


const AdminManageOrders = async () => {
  let orders = [];

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/admin/orders`,
      {
        cache: "no-store",
      }
    );

    if (response.ok) {
      const data = await response.json();
      orders = data?.data || data?.result || [];
    }
  } catch (error) {
    console.log("Failed to fetch admin orders", error);
  }

  return <OrdersTable initialOrders={orders} />;
};

export default AdminManageOrders;