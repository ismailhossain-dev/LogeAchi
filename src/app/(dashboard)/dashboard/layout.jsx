"use client";

import DashboardWrapper from "@/components/shared/DashboardWrapper/DashboardWrapper";


const Layout = ({ children }) => {

  return (
   <DashboardWrapper>
    {children}
   </DashboardWrapper>
  );
};

export default Layout;