import React from "react";
import Link from "next/link";
import { FiLogIn } from "react-icons/fi"; // react-icons ইনস্টল করা থাকলে এটি ব্যবহার করতে পারেন
const LoginButton = () => {
  return (
    <Link
      href="/login"
      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-orange-600 text-white font-semibold text-[16px] rounded-xl transition-all duration-300 shadow-md hover:shadow-orange-600/20 active:scale-[0.98]"
    >
      <FiLogIn className="w-4 h-4" />
      Login
    </Link>
  );
};

export default LoginButton;
