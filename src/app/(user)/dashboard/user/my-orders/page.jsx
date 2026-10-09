import OrdersTable from '@/components/Dashboard/Table/OrdersTable';

import React from 'react';

const dashboardOrdersPage = () => {
      
    return (
        <div>
         <div>
              <h1 className='text-3xl text-white italic font-bold md:text-5xl ml-7 uppercase'>My  <span className='text-blue-500'>Orders</span></h1>

      <div className='border-b-2 border-[#0f1524] shadow-lg my-3'></div>
         </div>
           <OrdersTable/>
        </div>
    );
};

export default dashboardOrdersPage;