//sessionProvider use for user authentication and looking evrywhere in the app
"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

const NextAuthProvider = ({ children }) => {

    //sessionProvider coming with next auth 
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;