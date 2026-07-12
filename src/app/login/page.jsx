import LoginForm from '@/components/auth/LoginForm/LoginForm';
import React, { Suspense } from 'react';

// Next.js কে বলা হচ্ছে এই পেজটি স্ট্যাটিক্যালি প্রিরেন্ডার না করতে
export const dynamic = "force-dynamic";

const LoginPage = () => {
    //suspense use for vercel deploy
    return (
        <div>
            <Suspense fallback={
                <div className="flex items-center justify-center min-h-screen bg-[#0f172a]">
                    <div className="w-8 h-8 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
                </div>
            }>
                <LoginForm />
            </Suspense>
        </div>
    );
};

export default LoginPage;