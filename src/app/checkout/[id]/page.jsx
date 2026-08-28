import CheckOutForm from '@/components/Forms/CheckOutForm/CheckOutForm';
import Footer from '@/components/shared/Footer/Footer';
import Navbar from '@/components/shared/Navbar/Navbar';
import React from 'react';

const checkoutPage = async ({ params }) => {
  const { id } = await params; 

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/homeProducts/${id}`);
  const data = await res.json();
  const checkoutData = data.result; 

  return (
    <div className="bg-[#0f172a] min-h-screen flex flex-col justify-between">
      <Navbar />
      
      <main className="flex-grow">
        <CheckOutForm productData={checkoutData} />
      </main>

      <Footer />
    </div>
  );
};

export default checkoutPage;