import UsersTable from "@/components/admin/Tables/UsersTable/UsersTable";
import React from "react";


const AdminManageUsers = async () => {
  let users = [];

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/admin/users`,
      {
        cache: "no-store",
      }
    );

    if (response.ok) {
      const data = await response.json();
      users = data?.data || [];
    }
  } catch (error) {
    console.log("Failed to fetch admin users", error);
  }

  return <UsersTable initialUsers={users} />;
};

export default AdminManageUsers;