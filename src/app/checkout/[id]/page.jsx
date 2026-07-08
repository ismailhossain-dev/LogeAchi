
import CheckOutForm from '@/components/Forms/CheckOutForm/CheckOutForm';
import Footer from '@/components/shared/Footer/Footer';
import Navbar from '@/components/shared/Navbar/Navbar';
import React from 'react';
//params er mardome uporer url tar teke id access kortesi most import work
const checkoutPage = async({params}) => {

const {id} = await params; 

// console.log("checkout url id ", id);

const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/homeProducts/${id}`)

const data = await res.json();

const checkoutData = data.result; 


// console.log(checkoutData);


    return (
        <div >
            <Navbar/>
          <CheckOutForm/>
          <Footer/>
        </div>
    );
};

export default checkoutPage;