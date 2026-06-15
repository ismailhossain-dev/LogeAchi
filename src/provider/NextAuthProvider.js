"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

const NextAuthProvider = ({ children }) => {
    // user for lookin user
    //sessionProvider coming with next auth 
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;