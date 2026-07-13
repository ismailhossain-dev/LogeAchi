"use client"
import React, { useState } from 'react'
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { Trash2, ShoppingBag, CreditCard, ArrowRight, Plus, Minus, ChevronDown } from 'lucide-react';
import { toast } from 'react-toastify';

function UserCartPage() {
  const axiosSecure = useAxiosSecure();
  const { data: session, status } = useSession();

  // লোকাল স্টেট
  const [quantities, setQuantities] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});

  const {
    data: cartData,
    isLoading: isCartLoading,
    refetch
  } = useQuery({
    queryKey: ["wishlist", session?.user?.email || ""],
    enabled: status === "authenticated" && !!session?.user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/cart?email=${session?.user?.email}`);
      return res.data;
    },
  });

  const cartItems = cartData?.result || [];

  const handleQuantityChange = (id, type, currentQty = 1) => {
    const prevQty = quantities[id] !== undefined ? quantities[id] : currentQty;
    if (type === 'minus' && prevQty <= 1) return;
    
    setQuantities({
      ...quantities,
      [id]: type === 'plus' ? prevQty + 1 : prevQty - 1
    });
  };

  const handleSizeChange = (id, size) => {
    setSelectedSizes({
      ...selectedSizes,
      [id]: size
    });
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const qty = quantities[item._id] !== undefined ? quantities[item._id] : 1;
    return acc + ((item.price || 0) * qty);
  }, 0);
  
  const deliveryCharge = cartItems.length > 0 ? 120 : 0;
  const totalAmount = subtotal + deliveryCharge;

  const handleDeleteCartItem = async (itemId) => {
    try {
      const res = await axiosSecure.delete('/api/cart', { data: { id: itemId } });
      
      if (res.status === 200) {
        toast.success("Item removed from cart");
        refetch();
        return; 
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to remove item");
    }
  };

  if (status === "loading" || isCartLoading) {
    return (
      <div className="min-h-screen bg-[#070b13] flex items-center justify-center text-slate-400 font-medium">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs tracking-widest uppercase font-bold text-slate-500">Loading Luxury Cart...</span>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-[#070b13] flex items-center justify-center text-slate-400">
        <div className="text-center p-8 bg-[#0f1524]/60 border border-slate-800/40 rounded-xl max-w-sm">
          <p className="font-semibold mb-4">Please login to view your cart items.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b13] text-slate-300 p-4 sm:p-8 lg:p-12 font-sans antialiased selection:bg-blue-500/20">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* লিকুইড হেডার ডিজাইন */}
        <div className="flex items-center justify-between border-b border-slate-800/60 pb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500/10 to-indigo-500/5 text-blue-400 rounded-2xl border border-blue-500/20 shadow-inner">
              <ShoppingBag size={24} />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight">Shopping Bag</h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Review your selected items and options</p>
            </div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 px-4 py-1.5 rounded-full text-xs font-bold text-slate-400 tracking-wide">
            {cartItems.length} ITEMS
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-[#0f1524]/10 border border-dashed border-slate-800/60 rounded-3xl backdrop-blur-sm">
            <p className="text-slate-500 text-sm font-medium tracking-wide">Your shopping cart looks empty!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT PANEL: PRODUCT LIST */}
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map((item) => {
                const currentQty = quantities[item._id] !== undefined ? quantities[item._id] : 1;
                const activeSize = selectedSizes[item._id] || (Array.isArray(item.size) ? item.size[0] : item.size);

                return (
                  <div 
                    key={item._id} 
                    className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gradient-to-r from-[#0f1524]/60 to-[#0f1524]/30 border border-slate-800/50 rounded-2xl gap-5 hover:border-slate-700/60 transition-all duration-300 shadow-xl group relative overflow-hidden"
                  >
                    {/* বাম পার্ট: প্রোডাক্ট ইমেজ + টাইটেল + সাইজ */}
                    <div className="flex items-center gap-5 w-full sm:w-auto flex-1 min-w-0">
                      <div className="w-20 h-24 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-800 relative">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <div className="space-y-2 flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-white tracking-wide truncate max-w-full">
                          {item.title}
                        </h3>
                        
                        {/* সাইজ সিলেক্টর ড্রপডাউন */}
                        <div className="relative inline-block">
                          <span className="text-[9px] text-slate-500 block uppercase tracking-wider font-bold mb-1">Select Size</span>
                          <div className="relative flex items-center">
                            <select
                              value={activeSize}
                              onChange={(e) => handleSizeChange(item._id, e.target.value)}
                              className="appearance-none bg-[#070b13] border border-slate-800 text-[11px] font-bold text-slate-300 pl-2.5 pr-7 py-1 rounded-lg outline-none cursor-pointer hover:border-slate-700 transition-colors tracking-wide focus:border-blue-500/50"
                            >
                              {Array.isArray(item.size) ? (
                                item.size.map((s, idx) => (
                                  <option key={idx} value={s}>{s}</option>
                                ))
                              ) : (
                                <option value={item.size}>{item.size}</option>
                              )}
                            </select>
                            <ChevronDown size={11} className="absolute right-2 text-slate-500 pointer-events-none" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ডান পার্ট: কোয়ান্টিটি, প্রাইস এবং ডিলিট বাটন */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-slate-800/40 pt-4 sm:pt-0 shrink-0">
                      
                      {/* কোয়ান্টিটি বাটন মেকানিজম */}
                      <div className="space-y-1">
                        <span className="text-[9px] text-slate-500 block uppercase tracking-wider font-bold text-center sm:text-left">Quantity</span>
                        <div className="flex items-center bg-[#070b13] border border-slate-800 rounded-xl p-1 gap-1">
                          <button 
                            type="button"
                            onClick={() => handleQuantityChange(item._id, 'minus', currentQty)}
                            className="p-1.5 hover:bg-slate-800/60 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-7 text-center font-mono text-xs font-bold text-white">
                            {currentQty}
                          </span>
                          <button 
                            type="button"
                            onClick={() => handleQuantityChange(item._id, 'plus', currentQty)}
                            className="p-1.5 hover:bg-slate-800/60 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>

                      {/* প্রাইসিং প্যানেল */}
                      <div className="text-right min-w-[75px]">
                        <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Subtotal</span>
                        <span className="text-sm font-extrabold text-white font-mono">
                          ৳{item.price * currentQty}
                        </span>
                      </div>
                      
                      {/* ডিলিট বাটন (ফিক্সড: mt-3 সরিয়ে রেসপনসিভ পজিশনিং করা হয়েছে) */}
                      <button 
                        onClick={() => handleDeleteCartItem(item._id)}
                        className="p-2.5 bg-slate-900/60 border border-slate-800/80 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT PANEL: SUMMARY */}
            <div className="lg:col-span-4 bg-gradient-to-b from-[#0f1524]/70 to-[#0f1524]/30 border border-slate-800/50 rounded-2xl p-6 shadow-2xl space-y-6 sticky top-6 backdrop-blur-md">
              <h2 className="text-xs font-bold text-white uppercase tracking-widest pb-3.5 border-b border-slate-800/50 flex items-center gap-2">
                <CreditCard size={14} className="text-blue-400" />
                Checkout Details
              </h2>

              <div className="space-y-3.5 text-xs font-semibold">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="text-slate-200 font-mono">৳{subtotal}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Shipping Estimate</span>
                  <span className="text-slate-200 font-mono">৳{deliveryCharge}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Platform Tax</span>
                  <span className="text-emerald-500 text-[10px] uppercase font-bold tracking-wider">Free</span>
                </div>

                <div className="h-[1px] bg-slate-800/40 my-1" />

                <div className="flex justify-between items-end pt-2">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Order Total</span>
                  <span className="text-xl font-black text-blue-400 font-mono tracking-tight">৳{totalAmount}</span>
                </div>
              </div>

              <button 
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-blue-600/10 transition-all cursor-pointer group"
              >
                Proceed To Checkout
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              <p className="text-[9px] text-center text-slate-500 tracking-wider font-medium">
                Tax calculated upon checkout workflow.
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}

export default UserCartPage;