"use client";
// ========use Auth use kore data fatch update delte korbo
import { createContext, useContext } from "react";

const AuthContext = createContext(null);

export default AuthContext;

export const useAuth = () => {
    return useContext(AuthContext);
};