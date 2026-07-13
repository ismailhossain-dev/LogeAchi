import RegisterForm from '@/components/auth/RegisterForm/RegisterForm';
import React from 'react';
import { Suspense } from 'react';
const RegisterPage = () => {
    return (
        <div>
          {/* 🟢 Suspense বাউন্ডারি যুক্ত করা হলো  karone vercel deploy hoitese na tai*/}
      <Suspense fallback={<p>Loading registration form...</p>}>
        <RegisterForm />
      </Suspense>
        </div>
    );
};

export default RegisterPage;