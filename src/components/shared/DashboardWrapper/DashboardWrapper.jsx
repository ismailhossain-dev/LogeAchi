"use client";

import Navbar from "@/components/Dashboard/shared/Navbar";
import Sidebar from "@/components/Dashboard/shared/Sidebar";
import React, { useState } from "react";

const DashboardWrapper = ({ children }) => {
  //etar mardome mobile menu ta setup koresi 
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[#090a0f] overflow-hidden">

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <Sidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />

      <div className="flex flex-col flex-1 overflow-hidden md:ml-[280px]">
        <Navbar setIsOpen={setIsOpen} />

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>

    </div>
  );
};

export default DashboardWrapper;