"use client";

import Title from '@/components/Title/Title';
import React from 'react';
import { FiTruck, FiRefreshCw, FiShield } from 'react-icons/fi';
import { TbTruckDelivery } from 'react-icons/tb';

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
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full font-sans antialiased">
      {/* Section Header */}
      <div className=" italic mb-16 uppercase ">
        <Title >Our <br/> <span className='text-blue-500 font-bold'>Premium Services</span></Title>
        <p className="text-xs sm:text-sm text-slate-400 mt-3 tracking-wide uppercase">
          Why Shop With Us
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <div 
            key={service.id} 
            className="group flex flex-col p-6 bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-slate-800/60 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-500/40 hover:shadow-[0_20px_50px_-10px_rgba(249,115,22,0.1)]"
          >
            {/* Icon Container */}
            <div className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 bg-slate-800 text-orange-500 border border-slate-700/50 group-hover:bg-orange-600 group-hover:text-white group-hover:border-transparent group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-orange-600/20">
              {service.icon}
            </div>

            {/* Service Details */}
            <h3 className="text-base sm:text-lg font-black text-white mt-6 tracking-tight transition-colors duration-300 group-hover:text-orange-500">
              {service.title}
            </h3>
            
            <p className="text-xs sm:text-sm text-slate-400 mt-2.5 leading-relaxed font-medium flex-grow">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;