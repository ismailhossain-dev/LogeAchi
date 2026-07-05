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
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <Title>Our Premium Services</Title>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {services.map((service) => (
          <div 
            key={service.id} 
            className="group flex flex-col p-6 bg-[#121c34] rounded-2xl border border-transparent shadow-lg  transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            {/* Icon Container */}
            <div className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 bg-[#ff6801] text-white">
              {service.icon}
            </div>

            {/* Service Details */}
            <h3 className="text-lg font-bold text-secondary mt-5 flex items-center gap-2">
              {service.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-2.5 leading-relaxed flex-grow">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;