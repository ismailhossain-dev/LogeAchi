import RegisterForm from '@/components/auth/RegisterForm/RegisterForm';
import React from 'react';
import { Suspense } from 'react';
const RegisterPage = () => {
    return (
        <div>
      <Suspense fallback={<p>Loading registration form...</p>}>
        <RegisterForm />
      </Suspense>
        </div>
    );
};

export default RegisterPage;