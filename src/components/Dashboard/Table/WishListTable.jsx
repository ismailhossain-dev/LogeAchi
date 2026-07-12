"use client"
import React, { useState, useEffect } from "react";
import { Eye, Trash2, ShoppingCart, Plus, Minus, Calendar, Heart, ChevronDown, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { toast } from "react-toastify";

export default function WishListTable({ wishlist = [], refetch }) {
  const [items, setItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // মোডাল স্টেট
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (wishlist && wishlist.length > 0) {
      setItems(wishlist.map((item, index) => {
        // 🌟 FIX: যদি item.size একটি অ্যারে হয়, তবে তার প্রথম উপাদানটি ডিফল্ট ভ্যালু হিসেবে সেট হবে
        const defaultSize = Array.isArray(item.size) ? item.size[0] : (item.size || "M");
        
        return {
          id: item._id || index,
          productId: item.productId || "",
          title: item.title || "Unknown Product",
          image: item.image,
          allSizes: Array.isArray(item.size) ? item.size : [item.size || "M"], // ড্রপডাউনের অপশনের জন্য পুরো অ্যারে
          size: defaultSize, // <select value={...}> এর জন্য সিঙ্গেল স্ট্রিং ভ্যালু
          basePrice: item.price || 0,
          quantity: item.quantity || 1,
          date: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "2026-07-05",
        };
      }));
    } else {
      setItems([]);
    }
  }, [wishlist]);

  // Quantity কন্ট্রোল ফাংশন
  const updateQuantity = (id, change) => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + change;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  // সাইজ ড্রপডাউন হ্যান্ডলার
  const handleSizeChange = (id, newSize) => {
    setItems(prevItems =>
      prevItems.map(item => (item.id === id ? { ...item, size: newSize } : item))
    );
  };

  const handleDelete = async (id, title) => {
    try {
      const res = await axiosSecure.delete(`/api/wishlist`, { data: { id } });
      if (res.data?.deletedCount > 0 || res.status === 200) {
        toast.success(`Deleted ${title} successfully!`);
        refetch(); 
      }
    } catch (error) {
      console.error("Error deleting item:", error.message);
      toast.error("Failed to delete item");
    }
  };

  const handlePurchase = (title, qty, price) => {
    toast.info(`Moving ${qty}x ${title} to Cart...`);
  };

  return (
    <div className="w-full space-y-8 p-4 sm:p-8 bg-[#070b13] text-slate-300 rounded-2xl border border-slate-800/50 shadow-2xl relative overflow-hidden font-sans antialiased">
      
      {/* 🔮 Background Premium Glow */}
      <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />

      {/* 🏷️ Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800/40">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-rose-500/10 to-transparent text-rose-400 rounded-xl border border-rose-500/10">
            <Heart className="h-6 w-6 fill-rose-500/10" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">Favorites Wishlist</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Manage your saved items, alter options or move to cart</p>
          </div>
        </div>
        
        <div className="bg-slate-900/60 border border-slate-800 px-4 py-1.5 rounded-full text-xs font-bold text-slate-400 tracking-wide self-start sm:self-center">
          {items.length} SAVED ITEMS
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-[#0f1524]/10 border border-dashed border-slate-800/60 rounded-3xl backdrop-blur-sm">
          <Heart className="h-12 w-12 text-slate-600 mx-auto mb-3 stroke-[1.5]" />
          <p className="text-slate-500 text-sm font-medium tracking-wide">Your wishlist is currently empty.</p>
        </div>
      ) : (
        <>
          {/* 🖥️ Desktop & Tablet Layout */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-slate-800/40 hover:bg-transparent">
                  <TableHead className="w-[100px] text-slate-500 font-bold uppercase text-[10px] tracking-wider">Image</TableHead>
                  <TableHead className="text-slate-500 font-bold uppercase text-[10px] tracking-wider">Product</TableHead>
                  <TableHead className="text-slate-500 font-bold uppercase text-[10px] tracking-wider">Size</TableHead>
                  <TableHead className="text-center text-slate-500 font-bold uppercase text-[10px] tracking-wider">Quantity</TableHead>
                  <TableHead className="text-slate-500 font-bold uppercase text-[10px] tracking-wider">Total Price</TableHead>
                  <TableHead className="text-slate-500 font-bold uppercase text-[10px] tracking-wider">Added Date</TableHead>
                  <TableHead className="text-right text-slate-500 font-bold uppercase text-[10px] tracking-wider">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id} className="border-b border-[#0f1524]/60 hover:bg-[#0f1524]/30 transition-all duration-300 group">
                    
                    {/* Image */}
                    <TableCell>
                      <div className="relative overflow-hidden rounded-xl border border-slate-800/80 bg-slate-950 p-0.5 w-14 h-16 shadow-inner">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    </TableCell>
                    
                    {/* Title */}
                    <TableCell className="font-bold text-white text-sm max-w-[200px] truncate">
                      {item.title}
                    </TableCell>
                    
                    {/* Size Select */}
                    <TableCell>
                      <div className="relative inline-flex items-center">
                        <select
                          value={item.size}
                          onChange={(e) => handleSizeChange(item.id, e.target.value)}
                          className="appearance-none bg-[#070b13] border border-slate-800 text-[11px] font-bold text-slate-300 pl-2.5 pr-7 py-1 rounded-lg outline-none cursor-pointer hover:border-slate-700 transition-colors"
                        >
                          {item.allSizes.map((s, idx) => (
                            <option key={idx} value={s}>{s}</option>
                          ))}
                        </select>
                        <ChevronDown size={11} className="absolute right-2 text-slate-500 pointer-events-none" />
                      </div>
                    </TableCell>
                    
                    {/* Quantity */}
                    <TableCell>
                      <div className="flex items-center justify-center gap-1 bg-[#070b13] border border-slate-800 rounded-xl p-1 max-w-[100px] mx-auto">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center font-mono text-xs font-bold text-white">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </TableCell>
                    
                    {/* Price */}
                    <TableCell className="font-black text-white font-mono text-sm">
                      ৳{item.basePrice * item.quantity}
                    </TableCell>
                    
                    {/* Date */}
                    <TableCell className="text-slate-500 text-xs font-medium font-mono">
                      {item.date}
                    </TableCell>
                    
                    {/* Actions */}
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => setSelectedProduct(item)} className="p-2.5 bg-slate-900/60 border border-slate-800 text-sky-400 hover:bg-sky-500/10 rounded-xl transition cursor-pointer" title="View Details">
                          <Eye size={14} />
                        </button>
                        <button onClick={() => handleDelete(item.id, item.title)} className="p-2.5 bg-slate-900/60 border border-slate-800 text-rose-500 hover:bg-rose-500/10 rounded-xl transition cursor-pointer" title="Delete Item">
                          <Trash2 size={14} />
                        </button>
                        <button onClick={() => handlePurchase(item.title, item.quantity, item.basePrice)} className="p-2.5 bg-slate-900/60 border border-slate-800 text-emerald-400 hover:bg-emerald-500/10 rounded-xl transition cursor-pointer" title="Add to Cart">
                          <ShoppingCart size={14} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* 📱 Mobile Responsive View */}
          <div className="block md:hidden space-y-4">
            {items.map((item) => (
              <div key={item.id} className="p-4 bg-gradient-to-r from-[#0f1524]/50 to-[#0f1524]/20 border border-slate-800/50 rounded-2xl flex flex-col gap-4 shadow-xl">
                <div className="flex gap-4">
                  <div className="w-16 h-20 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-800 p-0.5">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-white text-sm tracking-wide truncate">{item.title}</h4>
                      <div className="flex items-center gap-2.5 mt-2">
                        <div className="relative inline-flex items-center">
                          <select
                            value={item.size}
                            onChange={(e) => handleSizeChange(item.id, e.target.value)}
                            className="appearance-none bg-[#070b13] border border-slate-800 text-[10px] font-bold text-slate-400 pl-2 pr-6 py-0.5 rounded-md outline-none"
                          >
                            {item.allSizes.map((s, idx) => (
                              <option key={idx} value={s}>{s}</option>
                            ))}
                          </select>
                          <ChevronDown size={10} className="absolute right-1.5 text-slate-500 pointer-events-none" />
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                          <Calendar size={11} /> {item.date}
                        </span>
                      </div>
                    </div>
                    <div className="text-base font-black text-white font-mono mt-2">
                      ৳{item.basePrice * item.quantity}
                    </div>
                  </div>
                </div>

                <div className="h-[1px] bg-slate-800/40" />

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center bg-[#070b13] border border-slate-800 p-1 rounded-xl">
                    <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 cursor-pointer">
                      <Minus size={12} />
                    </button>
                    <span className="w-6 text-center font-bold text-xs text-white font-mono">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 cursor-pointer">
                      <Plus size={12} />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button onClick={() => setSelectedProduct(item)} className="p-2 bg-slate-900/60 border border-slate-800 text-sky-400 rounded-xl cursor-pointer">
                      <Eye size={14} />
                    </button>
                    <button onClick={() => handleDelete(item.id, item.title)} className="p-2 bg-slate-900/60 border border-slate-800 text-rose-500 rounded-xl cursor-pointer">
                      <Trash2 size={14} />
                    </button>
                    <button onClick={() => handlePurchase(item.title, item.quantity, item.basePrice)} className="p-2 bg-slate-900/60 border border-slate-800 text-emerald-400 rounded-xl cursor-pointer">
                      <ShoppingCart size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ================= 💎 XL LUXURY LIVE PRODUCT DETAILS MODAL ================= */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-[#070b13] border border-slate-800/80 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 right-5 p-2.5 bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white rounded-xl transition cursor-pointer z-20 hover:scale-105 active:scale-95"
            >
              <X size={18} />
            </button>

            {/* Grid Layout (Responsive: Mobile-এ উপরে নিচে, Desktop-এ পাশাপাশি সমান সাইজ) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-10 max-h-[90vh] overflow-y-auto">
              
              {/* Left Side: Premium Big Image Preview */}
              <div className="md:col-span-5 flex items-center justify-center">
                <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 p-1 shadow-2xl relative group">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.title} 
                    className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Right Side: Detailed Product Specs & Checkout Option */}
              <div className="md:col-span-7 flex flex-col justify-between space-y-6">
                
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                    Premium Master Preview
                  </div>
                  
                  <h2 className="text-xl sm:text-3xl font-black text-white tracking-wide leading-tight">
                    {selectedProduct.title}
                  </h2>
                  
                  <div className="flex flex-wrap gap-3 text-xs text-slate-400 font-mono">
                    <span className="bg-slate-900 px-3 py-1 rounded-md border border-slate-800">
                      ID: {selectedProduct.productId || selectedProduct.id}
                    </span>
                    <span className="bg-slate-900 px-3 py-1 rounded-md border border-slate-800 flex items-center gap-1">
                      <Calendar size={13} /> {selectedProduct.date}
                    </span>
                  </div>
                </div>

                {/* Pricing and Attributes Table Card */}
                <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-5 space-y-3 shadow-inner relative">
                  <div className="flex justify-between items-center text-sm border-b border-slate-800/50 pb-2.5">
                    <span className="text-slate-500 font-medium">Selected Size</span>
                    <span className="text-white font-extrabold uppercase bg-blue-600/10 border border-blue-500/30 px-3 py-0.5 rounded-lg tracking-wider text-xs">
                      {selectedProduct.size}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm border-b border-slate-800/50 pb-2.5">
                    <span className="text-slate-500 font-medium">Unit Price</span>
                    <span className="text-slate-300 font-mono font-bold">৳{selectedProduct.basePrice}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm border-b border-slate-800/50 pb-2.5">
                    <span className="text-slate-500 font-medium">Desired Quantity</span>
                    <span className="text-slate-300 font-mono font-bold">{selectedProduct.quantity} Pcs</span>
                  </div>

                  <div className="flex justify-between items-end pt-2">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Estimated Total</span>
                    <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-mono">
                      ৳{selectedProduct.basePrice * selectedProduct.quantity}
                    </span>
                  </div>
                </div>

                {/* Modal Footer CTA Button */}
                <div className="pt-2">
                  <button 
                    onClick={() => {
                      handlePurchase(selectedProduct.title, selectedProduct.quantity, selectedProduct.basePrice);
                      setSelectedProduct(null);
                    }}
                    className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_20px_rgba(37,99,235,0.2)] cursor-pointer active:scale-[0.99]"
                  >
                    <ShoppingCart size={15} /> Add to bag & proceed
                  </button>
                </div>
                
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}