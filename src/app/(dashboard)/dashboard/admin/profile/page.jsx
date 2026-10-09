import UserProfile from "@/components/Dashboard/UserProfile/UserProfile";
import React from "react";

const AdminProfile = () => {
  return (
    <div>
      <h1 className="text-3xl text-white italic font-bold md:text-5xl ml-7 uppercase">
        My <span className="text-blue-500">Proflie</span>
      </h1>

      <div className="border-b-2 border-[#0f1524] shadow-lg my-3"></div>

      <UserProfile />
    </div>
  );
};

export default AdminProfile;
