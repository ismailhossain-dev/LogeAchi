"use client"
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shirt, Eye, ShieldCheck, Truck, RefreshCw, 
  CreditCard, Headphones, Star, ChevronDown, 
  ArrowRight, Sparkles, ShoppingBag 
} from 'lucide-react';
import Footer from '@/components/shared/Footer/Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const CounterItem = ({ target, suffix, title }) => {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = parseFloat(target);
      const isDecimal = target.includes('.');
      const duration = 2000;
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentCount = progress * (end - start) + start;
        setCount(isDecimal ? currentCount.toFixed(1) : Math.floor(currentCount));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [inView, target]);

  return (
    <div ref={elementRef} className="text-center p-6 bg-white/[0.02] border border-white/10 rounded-2xl backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:border-blue-500/30 transition-colors duration-300">
      <motion.h3 
        className="text-3xl sm:text-5xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-200 to-white mb-2"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        {count}{suffix}
      </motion.h3>
      <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-widest">{title}</p>
    </div>
  );
};

const Testimonials = () => {
  const reviews = [
    { text: "The quality exceeded my expectations. Fast delivery and amazing service.", author: "Sarah Ahmed" },
    { text: "My favorite online clothing store. Excellent products.", author: "Hasan Mahmud" },
    { text: "Beautiful designs with premium quality. Highly recommended.", author: "Nabila Islam" }
  ];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  return (
    <div className="relative overflow-hidden w-full max-w-3xl mx-auto min-h-[240px] flex items-center justify-center bg-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-center space-y-4"
        >
          <div className="flex justify-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
          </div>
          <p className="text-base sm:text-xl text-slate-200 font-medium italic max-w-2xl leading-relaxed">
            "{reviews[active].text}"
          </p>
          <h5 className="text-xs sm:text-sm font-bold tracking-widest uppercase text-blue-400 pt-2">
            — {reviews[active].author}
          </h5>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
        {reviews.map((_, idx) => (
          <button 
            key={idx} 
            onClick={() => setActive(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${idx === active ? 'w-6 bg-blue-500' : 'w-1.5 bg-slate-700'}`}
          />
        ))}
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-5 text-left text-sm sm:text-base font-bold text-white hover:text-blue-400 transition-colors group"
      >
        <span className="pr-4">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={18} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="bg-[#0f172a] text-white min-h-screen font-sans antialiased overflow-x-hidden selection:bg-blue-500/30">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-[1500px] right-1/4 w-[600px] h-[600px] bg-indigo-500/10 blur-[180px] rounded-full pointer-events-none z-0" />


      {/* Our Story Section */}
      <section className="max-w-6xl mx-auto px-4 py-24 sm:py-32 grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
        <motion.div 
          className="md:col-span-6 space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeUp} className="text-xs font-bold uppercase tracking-widest text-blue-500">
            Genesis
          </motion.h2>
          <motion.h3 variants={fadeUp} className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            Our Story
          </motion.h3>
          <motion.div variants={fadeUp} className="space-y-4 text-sm sm:text-base text-slate-400 leading-relaxed font-medium">
            <p>Our journey started with a simple vision—to make premium fashion accessible for everyone.</p>
            <p>We believe clothing is more than just fabric. It represents confidence, personality, and lifestyle.</p>
            <p>From carefully selected materials to modern designs, every collection reflects our passion for quality and customer satisfaction.</p>
            <p>Today, we continue to create stylish apparel that combines comfort, durability, and affordability.</p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="md:col-span-6 overflow-hidden rounded-3xl border border-white/10 shadow-2xl relative aspect-[4/5] md:aspect-square lg:aspect-[4/5]"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img 
            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop" 
            alt="Fashion Story Image" 
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/60 via-transparent to-transparent" />
        </motion.div>
      </section>

      {/* Core Values Section */}
      <section className="max-w-6xl mx-auto px-4 py-24 sm:py-32 space-y-12 relative z-10">
        <div className="text-center space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">Core Values</h2>
          <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">Why Choose Us</h3>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {[
            { icon: <Sparkles size={20} />, title: "Premium Quality", desc: "We use carefully selected fabrics for maximum comfort." },
            { icon: <ShieldCheck size={20} />, title: "Affordable Prices", desc: "Luxury fashion without premium pricing." },
            { icon: <Truck size={20} />, title: "Fast Delivery", desc: "Quick nationwide shipping." },
            { icon: <RefreshCw size={20} />, title: "Easy Returns", desc: "Hassle-free return policy." },
            { icon: <CreditCard size={20} />, title: "Secure Payment", desc: "100% secure checkout experience." },
            { icon: <Headphones size={20} />, title: "24/7 Support", desc: "Our support team is always ready to help." }
          ].map((feature, i) => (
            <motion.div 
              key={i} 
              variants={fadeUp}
              className="p-6 bg-white/[0.01] border border-white/10 rounded-2xl hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 shadow-md group"
            >
              <div className="text-slate-400 group-hover:text-blue-400 transition-colors mb-4">{feature.icon}</div>
              <h5 className="text-sm font-bold uppercase tracking-wider text-white mb-1.5">{feature.title}</h5>
              <p className="text-xs text-slate-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Luxury Collection Grid Section */}
      <section className="max-w-6xl mx-auto px-4 py-12 space-y-12 relative z-10">
        <div className="text-center space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-500">Curation</h2>
          <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">Our Collections</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "Men Collection",
             desc: "Premium Shirts, T-Shirts, Panjabi, Pants",
              img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=500&auto=format&fit=crop",
               path: "/mens-collections" },
            { name: "Women Collection", 
              desc: "Tops, T-Shirts, Jeans & Fusion Wear", 
              img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=500&auto=format&fit=crop", 
              path: "/womens-collections" },
            { name: "New Arrivals", 
              desc: "Explore the latest global fashion trends.",
             img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=500&auto=format&fit=crop",
              path: "/all-collection" }
          ].map((col, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <Link 
                href={col.path}
                className="block relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group cursor-pointer bg-slate-800"
              >
                {/* Image Component */}
                <img 
                  src={col.img} 
                  alt={col.name} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-[0.85] group-hover:brightness-75"
                  loading="lazy"
                />
                
                {/* Glow Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/30 to-transparent p-6 flex flex-col justify-end transition-opacity duration-300" />
                
                {/* Bottom Card Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10 space-y-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base sm:text-lg font-black uppercase text-white tracking-wide group-hover:text-blue-400 transition-colors">
                      {col.name}
                    </h4>
                    <div className="p-1.5 bg-white/10 text-white rounded-full opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal opacity-90 line-clamp-2">
                    {col.desc}
                  </p>
                </div>

                {/* Neon Border Effect */}
                <div className="absolute inset-0 border border-transparent group-hover:border-blue-500/40 rounded-2xl transition-all duration-300 pointer-events-none" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-4 py-24 sm:py-32 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          <CounterItem target="15" suffix="K+" title="Happy Customers" />
          <CounterItem target="8" suffix="K+" title="Orders Delivered" />
          <CounterItem target="500" suffix="+" title="Premium Products" />
          <CounterItem target="4.9" suffix="★" title="Average Rating" />
          <div className="col-span-2 lg:col-span-1">
            <CounterItem target="98" suffix="%" title="Customer Satisfaction" />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-6xl mx-auto px-4 py-12 space-y-10 relative z-10">
        <div className="text-center space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">Endorsements</h2>
          <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">Client Reviews</h3>
        </div>
        <Testimonials />
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-4 py-24 sm:py-32 space-y-12 relative z-10">
        <div className="text-center space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-500">Information</h2>
          <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">Frequently Asked</h3>
        </div>

        <div className="bg-white/[0.01] border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
          {[
            { q: "How long does delivery take?", a: "Standard delivery typically takes 2-4 business days nationwide. Express delivery methods are available at checkout." },
            { q: "What payment methods do you accept?", a: "We accept Visa, Mastercard, American Express, mobile banking (bKash, Nagad), and cash on delivery." },
            { q: "Can I return a product?", a: "Yes, we offer a hassle-free 7-day return policy for unused items with tags attached." },
            { q: "Do you offer cash on delivery?", a: "Yes, we provide cash on delivery nationwide across the country." },
            { q: "How can I track my order?", a: "Once dispatched, you will receive an SMS and email containing a tracking link to follow your parcel." },
            { q: "Is my payment secure?", a: "Absolutely. We employ 256-bit SSL encryption infrastructure to process payments securely without storing raw credentials." }
          ].map((faq, index) => (
            <FAQItem key={index} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </section>
        
        <Footer/>
    </div>
  );
};

export default AboutPage;