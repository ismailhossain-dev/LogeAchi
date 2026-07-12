"use client"
import { useState, useEffect } from "react";
import { Eye, Trash2, ShoppingCart, Plus, Minus, Calendar, Layers, Heart } from "lucide-react";
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
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (wishlist && wishlist.length > 0) {
      setItems(wishlist.map((item, index) => ({
        id: item._id || index, // মেইন ডাটাবেজের আইডি
        title: item.title || "Unknown Product", // 👈 এই লাইনটি আগে মিসিং ছিল!
        image: item.image,
        size: item.size,
        basePrice: item.price,
        quantity: item.quantity || 1,
        date: item.createdAt || "2026-07-05",
      })));
    } else {
      setItems([]); // উইশলিস্ট খালি হলে স্টেটও খালি করা ভালো
    }
  }, [wishlist]);



  // Quantity পরিবর্তনের ফাংশন
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

  const handleView = (title) => alert(`Viewing details for: ${title}`);

  const handleDelete = async (id, title) => {
    try {
      // ব্যাকএন্ডে ডেটা বডি পাঠানোর সঠিক নিয়ম: { data: { id } }
      const res = await axiosSecure.delete(`/api/wishlist`, { data: { id } });
      
      // আপনার ব্যাকএন্ড যদি acknowledgment হিসেবে deletedCount দেয়
      if (res.data?.deletedCount > 0) {
        toast.success(`Deleted ${title} from wishlist`);
        refetch(); 
      } else {
        // যদি deletedCount না এসে অন্য সাকসেস রেসপন্স আসে (যেমন: message)
        toast.success(`Deleted ${title} successfully!`);
        refetch();
      }
    } catch (error) {
      console.error("Error deleting wishlist item:", error.message);
    }
  };

  const handlePurchase = (title, qty, price) => {
    alert(`Purchasing ${qty}x ${title} for $${(price * qty).toFixed(2)}`);
  };

  return (
    <div className="w-full space-y-6 p-6 bg-[#09090b] text-zinc-100 rounded-3xl border border-zinc-800/60 shadow-[0_0_50px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl relative overflow-hidden">
      
      {/* 🔮 Background Premium Glow */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-rose-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

      {/* 🏷️ Premium Dashboard Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-800/50">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-rose-500/10 rounded-xl border border-rose-500/20 text-rose-400">
              <Heart className="h-5 w-5 fill-rose-500/10" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Favorites Wishlist
            </h1>
          </div>
          <p className="text-sm text-zinc-400 mt-1 pl-1">
            Manage your saved items, adjust quantities, and move them to cart.
          </p>
        </div>
        
        {/* Quick Stats Badge */}
        <div className="self-start sm:self-center px-4 py-2 bg-zinc-900/80 border border-zinc-800 rounded-2xl text-xs font-medium text-zinc-400 flex items-center gap-2 shadow-inner">
          Total Items: <span className="text-zinc-100 font-bold text-sm bg-zinc-800 px-2 py-0.5 rounded-lg">{items.length}</span>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/20">
          <Heart className="h-12 w-12 text-zinc-600 mx-auto mb-3 stroke-[1.5]" />
          <p className="text-zinc-400 font-medium">Your wishlist is currently empty.</p>
        </div>
      ) : (
        <>
          {/* 🖥️ Desktop & Tablet Layout */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-zinc-800 hover:bg-transparent">
                  <TableHead className="w-[100px] text-zinc-400 font-medium">Image</TableHead>
                  <TableHead className="text-zinc-400 font-medium">Product</TableHead>
                  <TableHead className="text-zinc-400 font-medium">Size</TableHead>
                  <TableHead className="text-center text-zinc-400 font-medium">Quantity</TableHead>
                  <TableHead className="text-zinc-400 font-medium">Price</TableHead>
                  <TableHead className="text-zinc-400 font-medium">Date</TableHead>
                  <TableHead className="text-right text-zinc-400 font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id} className="border-b border-zinc-900/60 hover:bg-zinc-900/40 transition-all duration-300 group">
                    {/* 1. Image */}
                    <TableCell>
                      <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/80 p-0.5 w-14 h-14 shadow-md">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </TableCell>
                    
                    {/* 2. Title */}
                    <TableCell className="font-semibold text-zinc-200 max-w-[220px] truncate transition-colors group-hover:text-zinc-100">
                      {item.title}
                    </TableCell>
                    
                    {/* 3. Size */}
                    <TableCell>
                      <span className="px-2.5 py-1 text-xs font-bold bg-zinc-900/90 border border-zinc-800 text-zinc-400 rounded-lg shadow-inner">
                        {item.size}
                      </span>
                    </TableCell>
                    
                    {/* 4. Quantity Controls */}
                    <TableCell>
                      <div className="flex items-center justify-center gap-1">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 active:scale-95 transition"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center font-bold text-sm text-zinc-200">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 active:scale-95 transition"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </TableCell>
                    
                    {/* 5. Dynamic Price */}
                    <TableCell className="font-bold text-zinc-100 tracking-wide text-[15px]">
                      ${(item.basePrice * item.quantity).toFixed(2)}
                    </TableCell>
                    
                    {/* 6. Date */}
                    <TableCell className="text-zinc-500 text-xs font-medium">
                      {item.date}
                    </TableCell>
                    
                    {/* 7. Actions */}
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleView(item.title)}
                          className="p-2 rounded-xl bg-zinc-900/80 border border-zinc-800 text-sky-400 hover:bg-sky-500/10 hover:border-sky-500/30 transition shadow-sm active:scale-95"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id, item.title)}
                          className="p-2 rounded-xl bg-zinc-900/80 border border-zinc-800 text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30 transition shadow-sm active:scale-95"
                          title="Delete Item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handlePurchase(item.title, item.quantity, item.basePrice)}
                          className="p-2 rounded-xl bg-zinc-900/80 border border-zinc-800 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/30 transition shadow-sm active:scale-95"
                          title="Purchase Now"
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* 📱 Ultra-Clean Mobile Responsive Cards */}
          <div className="block md:hidden space-y-4">
            {items.map((item) => (
              <div key={item.id} className="p-4 border border-zinc-850 bg-[#0c0c0e]/90 rounded-2xl shadow-md flex flex-col gap-4 relative overflow-hidden">
                
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 p-0.5 shrink-0 w-20 h-20 shadow-inner">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h4 className="font-bold text-zinc-200 text-base leading-tight truncate">{item.title}</h4>
                      
                      <div className="flex flex-wrap items-center gap-2.5 mt-2">
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-md">
                          <Layers className="h-3 w-3 text-zinc-500" /> {item.size}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] font-medium text-zinc-500">
                          <Calendar className="h-3 w-3" /> {item.date}
                        </span>
                      </div>
                    </div>
                    
                    {/* Dynamic Price */}
                    <div className="text-lg font-extrabold text-zinc-100 tracking-wide mt-2">
                      ${(item.basePrice * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="h-[1px] bg-gradient-to-r from-transparent via-zinc-800/80 to-transparent" />

                {/* Bottom Actions & Quantity */}
                <div className="flex items-center justify-between gap-2 pt-0.5">
                  
                  {/* Modern Quantity Selector */}
                  <div className="flex items-center gap-0.5 bg-zinc-900/90 border border-zinc-800 p-1 rounded-xl shadow-inner">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 active:text-zinc-200 active:scale-90 transition"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-7 text-center font-extrabold text-sm text-zinc-200">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 active:text-zinc-200 active:scale-90 transition"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleView(item.title)}
                      className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-sky-400 active:bg-sky-500/20 active:border-sky-500/40 transition active:scale-95"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id, item.title)}
                      className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-rose-400 active:bg-rose-500/20 active:border-rose-500/40 transition active:scale-95"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handlePurchase(item.title, item.quantity, item.basePrice)}
                      className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-emerald-400 active:bg-emerald-500/20 active:border-emerald-500/40 transition active:scale-95"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </button>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}