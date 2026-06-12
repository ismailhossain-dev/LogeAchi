"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// react-icons থেকে প্রয়োজনীয় আইকনগুলো ইমপোর্ট করা হয়েছে
import { 
  FaTwitter, 
  FaInstagram, 
  FaFacebookF, 
  FaPinterestP, 
  FaRegCreditCard, 
  FaCcVisa, 
  FaCcPaypal, 
  FaCcMastercard, 
  FaCcDiscover, 
  FaCcAmex 
} from 'react-icons/fa';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { GoChevronUp } from 'react-icons/go';
import Logo from '@/components/Logo/Logo';

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  // Scroll to top বাটনের ভিজিবিলিটি চেক
  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  // Scroll to top হ্যান্ডলার
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // নিউজলেটার সাবমিট হ্যান্ডলার
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
  };

  return (
    <footer className="bg-[#f5f5f5] text-gray-600 font-sans relative w-full pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= TOP SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pb-12 items-center">
          
          {/* 1. Left Side: Follow Us */}
          <div className="flex flex-col items-center lg:items-start gap-4">
            <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wider">
              Follow us
            </h3>
            <div className="flex gap-3">
              {/* Pinterest */}
              <a href="#" className="w-10 h-10 bg-white rounded-md flex items-center justify-center shadow-sm hover:shadow-md text-gray-500 hover:text-[#ff6a00] hover:-translate-y-0.5 transition-all duration-300">
                <FaPinterestP className="w-5 h-5" />
              </a>
              {/* Twitter */}
              <a href="#" className="w-10 h-10 bg-white rounded-md flex items-center justify-center shadow-sm hover:shadow-md text-gray-500 hover:text-[#ff6a00] hover:-translate-y-0.5 transition-all duration-300">
                <FaTwitter className="w-5 h-5" />
              </a>
              {/* Instagram */}
              <a href="#" className="w-10 h-10 bg-white rounded-md flex items-center justify-center shadow-sm hover:shadow-md text-gray-500 hover:text-[#ff6a00] hover:-translate-y-0.5 transition-all duration-300">
                <FaInstagram className="w-5 h-5" />
              </a>
              {/* Facebook */}
              <a href="#" className="w-10 h-10 bg-white rounded-md flex items-center justify-center shadow-sm hover:shadow-md text-gray-500 hover:text-[#ff6a00] hover:-translate-y-0.5 transition-all duration-300">
                <FaFacebookF className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 2. Center: Newsletter */}
          <div className="flex flex-col items-center text-center gap-4 lg:px-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              Sign up for newsletter
            </h2>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row w-full max-w-md gap-2 sm:gap-0 bg-white p-1.5 rounded-lg shadow-sm border border-gray-200">
              <input 
                type="email" 
                placeholder="Your Email Address" 
                required
                className="w-full px-4 py-2 text-gray-700 bg-transparent focus:outline-none text-sm"
              />
              <button 
                type="submit" 
                className="bg-[#ff6a00] text-white font-semibold text-sm px-6 py-2.5 rounded-md sm:rounded-lg hover:bg-[#e05d00] active:scale-[0.98] transition-all duration-200 whitespace-nowrap shadow-sm"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* 3. Right Side: Brand & Quick Contacts */}
          <div className="flex flex-col items-center lg:items-end text-center lg:text-right gap-3">
           <Logo/>
            <p className="text-sm max-w-xs text-gray-500">
              Your ultimate destination for premium products. Quality and trust delivered straight to your doorstep.
            </p>
            <div className="flex flex-col items-center lg:items-end gap-1.5 text-xs text-gray-500 mt-2">
              <span className="flex items-center gap-1.5"><FiMapPin className="w-3.5 h-3.5 text-gray-400" /> 123 Street, Dhaka, Bangladesh</span>
              <span className="flex items-center gap-1.5"><FiPhone className="w-3.5 h-3.5 text-gray-400" /> +880 1234 567890</span>
              <span className="flex items-center gap-1.5"><FiMail className="w-3.5 h-3.5 text-gray-400" /> support@besto.com</span>
            </div>
          </div>

        </div>

        {/* Divider Line */}
        <hr className="border-gray-200 my-0" />

        {/* ================= BOTTOM SECTION ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 py-16">
          
          {/* Column 1: Customer Service */}
          <div>
            <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-5">
              Customer Service
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/account" className="hover:text-[#ff6a00] transition-colors duration-200">Account</Link></li>
              <li><Link href="/cart" className="hover:text-[#ff6a00] transition-colors duration-200">My Cart</Link></li>
              <li><Link href="/orders" className="hover:text-[#ff6a00] transition-colors duration-200">Order History</Link></li>
              <li><Link href="/wishlist" className="hover:text-[#ff6a00] transition-colors duration-200">Wishlist</Link></li>
              <li><Link href="/blog" className="hover:text-[#ff6a00] transition-colors duration-200">Blog</Link></li>
            </ul>
          </div>

          {/* Column 2: My Account */}
          <div>
            <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-5">
              My Account
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/payment-policy" className="hover:text-[#ff6a00] transition-colors duration-200">Payment Policy</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-[#ff6a00] transition-colors duration-200">Privacy Policy</Link></li>
              <li><Link href="/return-policy" className="hover:text-[#ff6a00] transition-colors duration-200">Return Policy</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-[#ff6a00] transition-colors duration-200">Shipping Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#ff6a00] transition-colors duration-200">Terms & Condition</Link></li>
            </ul>
          </div>

          {/* Column 3: Useful Links */}
          <div>
            <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-5">
              Useful Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-[#ff6a00] transition-colors duration-200">About Us</Link></li>
              <li><Link href="/faq" className="hover:text-[#ff6a00] transition-colors duration-200">FAQ's</Link></li>
              <li><Link href="/blogs" className="hover:text-[#ff6a00] transition-colors duration-200">Blogs</Link></li>
              <li><Link href="/return-policy" className="hover:text-[#ff6a00] transition-colors duration-200">Return Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Top Categories */}
          <div>
            <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-5">
              Top Categories
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/category/cloth" className="hover:text-[#ff6a00] transition-colors duration-200">Cloth</Link></li>
              <li><Link href="/category/electronic" className="hover:text-[#ff6a00] transition-colors duration-200">Electronic</Link></li>
              <li><Link href="/category/furniture" className="hover:text-[#ff6a00] transition-colors duration-200">Furniture</Link></li>
              <li><Link href="/category/watch" className="hover:text-[#ff6a00] transition-colors duration-200">Watch</Link></li>
              <li><Link href="/category/jewellery" className="hover:text-[#ff6a00] transition-colors duration-200">Jewellery</Link></li>
            </ul>
          </div>

          {/* Column 5: Contact Info & Payments */}
          <div className="flex flex-col gap-6">
            <div>
              <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">
                Contact Information
              </h4>
              <p className="text-sm leading-relaxed text-gray-500">
                Have questions or need help? Get in touch with our support team available 24/7.
              </p>
            </div>
            
            {/* Payment Method Logos */}
            <div>
              <h5 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <FaRegCreditCard className="w-3.5 h-3.5 text-gray-500" /> Secured Payment
              </h5>
              {/* এখানে পেমেন্ট মেথডগুলোর জন্য রিয়েল ব্র্যান্ডেড রিঅ্যাক্ট আইকন সেট করা হয়েছে */}
              <div className="flex flex-wrap gap-2 text-2xl text-gray-500">
                <FaCcVisa className="hover:text-blue-800 transition-colors cursor-pointer bg-white rounded-sm" />
                <FaCcPaypal className="hover:text-blue-600 transition-colors cursor-pointer bg-white rounded-sm" />
                <FaCcMastercard className="hover:text-red-500 transition-colors cursor-pointer bg-white rounded-sm" />
                <FaCcDiscover className="hover:text-orange-500 transition-colors cursor-pointer bg-white rounded-sm" />
                <FaCcAmex className="hover:text-blue-900 transition-colors cursor-pointer bg-white rounded-sm" />
              </div>
            </div>
          </div>

        </div>

        {/* Final Copyright Bar */}
        <div className="border-t border-gray-200 pt-8 text-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Besto Store. All rights reserved.</p>
        </div>

      </div>

      {/* ================= SCROLL TO TOP BUTTON ================= */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 p-2.5 bg-[#ff6a00] text-white rounded-full shadow-lg hover:bg-[#e05d00] hover:-translate-y-1 active:translate-y-0 transition-all duration-300 ${
          showScroll ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-75 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <GoChevronUp className="w-6 h-6" />
      </button>
    </footer>
  );
};

export default Footer;