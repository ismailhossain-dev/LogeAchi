import Title from '@/components/Title/Title';
import React from 'react';
import { FiTruck, FiRefreshCw, FiShield, FiHeadphones } from 'react-icons/fi';
import { TbTruckDelivery, TbAward, TbCreditCard } from 'react-icons/tb';

const OurServices = () => {
  const services = [
    {
      id: 1,
      icon: <TbTruckDelivery className="text-3xl" />,
      title: "First Order Offer",
      description: "Get flat 30% OFF on your very first order with absolutely free delivery charge."
    },
    {
      id: 2,
      icon: <FiTruck className="text-3xl" />,
      title: "Fast Delivery",
      description: "Enjoy free shipping on orders over 1500+ BDT or super-fast home delivery within 48 hours."
    },
    {
      id: 3,
      icon: <FiRefreshCw className="text-3xl" />,
      title: "7-Day Exchange",
      description: "No worries about size or fitting. Hassle-free product exchange guarantee within 7 days."
    },
    {
      id: 4,
      icon: <FiShield className="text-3xl" />,
      title: "Cash on Delivery",
      description: "Shop with confidence. Check and receive your product at your doorstep before payment."
    },
    {
      id: 5,
      icon: <TbAward className="text-3xl" />,
      title: "Premium Quality",
      description: "100% premium fabric and flawless stitching guaranteed. What you see is what you get."
    },
  
    {
      id: 6,
      icon: <FiHeadphones className="text-3xl" />,
      title: "24/12 Dedicated Support",
      description: "Get instant solutions to your queries through Live Chat, WhatsApp, or direct call support."
    }
  ];

  return (
    <section className="bg-gradient-to-b from-white to-gray-50/50 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
     
       <Title>

          Our Premium Services
       </Title>
     
     
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {services.map((service) => (
          <div 
            key={service.id} 
            className={`group flex flex-col p-6 bg-white rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
              service.id === 1 
                ? "border-[#ff6801]/30 bg-gradient-to-br from-white to-[#ff6801]/5 shadow-sm ring-1 ring-[#ff6801]/20 sm:col-span-2 lg:col-span-1" 
                : "border-gray-100 shadow-sm"
            }`}
          >
            {/* Icon Container */}
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${
              service.id === 1 
                ? "bg-[#ff6801] text-white" 
                : "bg-gray-50 text-[#ff6801] group-hover:bg-[#ff6801] group-hover:text-white"
            }`}>
              {service.icon}
            </div>

            {/* Service Details */}
            <h3 className="text-lg font-bold text-gray-800 mt-5 flex items-center gap-2">
              {service.title}
              {service.id === 1 && (
                <span className="text-[9px] font-extrabold text-white bg-[#ff6801] px-1.5 py-0.5 rounded uppercase tracking-wider animate-pulse">
                  Hot
                </span>
              )}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-2.5 leading-relaxed flex-grow">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;