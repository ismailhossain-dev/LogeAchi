import { signIn } from 'next-auth/react';
import React from 'react';
import { FcGoogle } from "react-icons/fc";
const GoogleLogin = () => {
    return (
       
        <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="mt-5 flex w-full items-center justify-center gap-3 rounded-xl border border-zinc-800 bg-[#18181b] px-5 py-3 text-sm font-semibold text-zinc-200 shadow-lg shadow-black/20 transition-all duration-300 hover:bg-[#202024] hover:text-white hover:border-zinc-700 active:scale-[0.98]"
            >
              <FcGoogle size={20} className="shrink-0" />
              <span>Sign in with Google</span>
            </button>
     
    );
};

export default GoogleLogin;