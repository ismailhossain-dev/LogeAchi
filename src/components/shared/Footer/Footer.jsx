"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";

import Logo from "@/components/Logo/Logo"; // পাথটি আপনার প্রোজেক্ট অনুযায়ী চেক করে নিবেন

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);
  const currentYear = new Date().getFullYear();

  // Scroll to top বাটনের ভিজিবিলিটি চেক
  useEffect(() => {
    const checkScrollTop = () => {
      if (window.scrollY > 400) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, []);

  // Scroll to top হ্যান্ডলার
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // নিউজলেটার সাবমিট হ্যান্ডলার
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing to BookCourier!");
    e.target.reset();
  };

  return (
    <footer className="bg-[#0f172a]  text-slate-300 pt-20 pb-8 px-4 sm:px-6 lg:px-8 border-t border-slate-800/60 mt-16 relative w-full font-sans antialiased selection:bg-green-500 selection:text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16 max-w-7xl mx-auto">
        {/* Column 1: Brand & About */}
        <div className="space-y-6">
          <div
            href="/"
            className="inline-block hover:opacity-90 transition-opacity focus:outline-none"
          >
            <Logo />
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-slate-400 max-w-xs">
            Your premium gateway to the world of literature. We deliver passion,
            knowledge, and stories right to your doorstep.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3 pt-2">
            {[
              {
                Icon: FaFacebookF,
                to: "https://web.facebook.com/md.sabbir.926093",
              },
              {
                Icon: FaInstagram,
                to: "https://www.instagram.com/sabbir.69k/",
              },
              { Icon: FaXTwitter, to: "https://x.com" },
              {
                Icon: FaLinkedinIn,
                to: "https://www.linkedin.com/in/mohammad-ismail-hossain-475183396/",
              },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.to}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:bg-green-500 hover:text-white hover:border-green-500 hover:-translate-y-1 transition-all duration-350 shadow-sm"
              >
                <social.Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="lg:pl-8">
          <h3 className="text-white text-base font-bold tracking-wider uppercase mb-7 relative inline-block">
            Quick Explore
            <span className="absolute -bottom-2 left-0 w-8 h-[3px] bg-green-500 rounded-full"></span>
          </h3>
          <ul className="space-y-3.5 text-sm sm:text-base">
            {[
            
              {  name: "Home",    path: "/" },
              {  name: "SHOP",    path: "/all-collection" },
              {  name: "MENS",    path: "/mens-collections" },
              {  name: "WOMENS",  path: "/womens-collections" },
              {  name: "ABOUT US",path: "/about-us" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className="text-slate-400 hover:text-green-400 flex items-center gap-2 group transition-colors duration-200"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 opacity-0 -ml-3 group-hover:ml-0 group-hover:opacity-100 transition-all duration-200"></span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h3 className="text-white text-base font-bold tracking-wider uppercase mb-7 relative inline-block">
            Contact Detail
            <span className="absolute -bottom-2 left-0 w-8 h-[3px] bg-green-500 rounded-full"></span>
          </h3>
          <ul className="space-y-4 text-sm sm:text-base">
            <li className="flex items-start gap-4 group">
              <div className="mt-0.5 w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-green-500 group-hover:bg-green-500 group-hover:text-white group-hover:border-green-500 transition-all duration-300">
                <FiMail size={16} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">
                  Email us
                </p>
                <a
                  href="mailto:ismail.dev69k@gmail.com"
                  className="text-slate-300 hover:text-green-400 break-all block transition-colors duration-200"
                >
                  ismail.dev69k@gmail.com
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4 group">
              <div className="mt-0.5 w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-green-500 group-hover:bg-green-500 group-hover:text-white group-hover:border-green-500 transition-all duration-300">
                <FiPhone size={16} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">
                  Call us
                </p>
                <a
                  href="tel:+8801619408991"
                  className="text-slate-300 hover:text-green-400 transition-colors duration-200"
                >
                  +880 1619 408 991
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="mt-0.5 w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-green-500">
                <FiMapPin size={16} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">
                  Our Studio
                </p>
                <span className="text-slate-300">Dhaka, Bangladesh</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div>
          <h3 className="text-white text-base font-bold tracking-wider uppercase mb-7 relative inline-block">
            Newsletter
            <span className="absolute -bottom-2 left-0 w-8 h-[3px] bg-green-500 rounded-full"></span>
          </h3>
          <form onSubmit={handleSubscribe} className="relative mt-2">
            <input
              type="email"
              required
              placeholder="Your email address"
              className="w-full bg-slate-900 border border-slate-800/80 rounded-xl py-3.5 pl-4 pr-12 text-sm outline-none focus:border-green-500/50 text-white placeholder-slate-500 transition-all"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="absolute right-1.5 top-1.5 bottom-1.5 px-3.5 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors flex items-center justify-center shadow-md active:scale-95"
            >
              <FiSend size={16} />
            </button>
          </form>
          <p className="text-[11px] text-slate-500 mt-4 leading-relaxed italic">
            * Join our mailing list for the latest book arrivals and exclusive
            offers.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
        <p className="text-xs sm:text-sm font-medium text-slate-500 text-center md:text-left">
          © {currentYear}{" "}
          <Link
            href="/"
            className="text-slate-400 hover:text-green-500 transition-colors duration-200"
          >
            BookCourier
          </Link>
          . All rights reserved.
        </p>

        <div className="flex items-center gap-6 text-[11px] font-bold uppercase tracking-widest text-slate-500">
          <Link
            href="/privacy"
            className="hover:text-green-500 transition-colors duration-200"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="hover:text-green-500 transition-colors duration-200"
          >
            Terms
          </Link>
          <Link
            href="/faq"
            className="hover:text-green-500 transition-colors duration-200"
          >
            FAQ
          </Link>
        </div>

        <p className="text-xs sm:text-sm font-medium text-slate-500 italic text-center md:text-right">
          Developed with ❤️ by{" "}
          <a
            href="https://github.com/ismailhossain-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 font-bold not-italic hover:underline decoration-2 underline-offset-4"
          >
            Sabbir
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
