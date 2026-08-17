import Navbar from "@/components/Dashboard/shared/Navbar";
import Sidebar from "@/components/Dashboard/shared/Sidebar";
import React from "react";

function DashboardWrapper({ children }) {
  return (
    <div className="min-h-screen  text-white overflow-hidden flex">
      {/*sidebar*/}
        <Sidebar/>
      {/* main content area */}
      <div className="flex-1 flex-col min-w-0 h-screen overflow-hidden ">
        {/* dasbord navbar */}
       <Navbar/>

        {/* Scrollable Main content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar bg-[#0b0c10]">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default DashboardWrapper;
