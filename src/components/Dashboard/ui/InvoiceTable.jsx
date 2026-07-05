"use client"
import { useState } from "react";
import { Eye, Trash2, ShoppingCart, Plus, Minus, Calendar, Layers } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function InvoiceTable({ wish }) {
  // ডেমো ডেটা অ্যারে (উইশলিস্টে একাধিক প্রোডাক্ট থাকলে যেন লুপ হতে পারে)
  const [items, setItems] = useState([
    {
      id: "1",
      image: wish?.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60", 
      title: wish?.title || "Premium Smart Watch",
      size: wish?.size || "XL",
      basePrice: 250,
      quantity: 1,
      date: wish?.createdAt || "2026-07-05",
    }
  ]);

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
  const handleDelete = (id, title) => {
    alert(`${title} deleted!`);
    setItems(items.filter(item => item.id !== id));
  };
  const handlePurchase = (title, qty, price) => {
    alert(`Purchasing ${qty}x ${title} for $${(price * qty).toFixed(2)}`);
  };

  return (
    <div className="w-full p-6 bg-[#0a0a0a] text-zinc-100 rounded-2xl border border-zinc-800/80 shadow-2xl backdrop-blur-md">
      
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
              <TableRow key={item.id} className="border-b border-zinc-900/60 hover:bg-zinc-900/40 transition-all duration-300">
                {/* 1. Image */}
                <TableCell>
                  <div className="relative group overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 p-0.5">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-14 object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </TableCell>
                
                {/* 2. Title */}
                <TableCell className="font-medium text-zinc-200 max-w-[220px] truncate">
                  {item.title}
                </TableCell>
                
                {/* 3. Size */}
                <TableCell>
                  <span className="px-2.5 py-1 text-xs font-semibold bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-md shadow-inner">
                    {item.size}
                  </span>
                </TableCell>
                
                {/* 4. Quantity Controls */}
                <TableCell>
                  <div className="flex items-center justify-center gap-1.5">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center font-semibold text-sm text-zinc-100">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </TableCell>
                
                {/* 5. Dynamic Price */}
                <TableCell className="font-semibold text-zinc-100 tracking-wide">
                  ${(item.basePrice * item.quantity).toFixed(2)}
                </TableCell>
                
                {/* 6. Date */}
                <TableCell className="text-zinc-500 text-sm">
                  {item.date}
                </TableCell>
                
                {/* 7. Actions */}
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleView(item.title)}
                      className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-sky-400 hover:bg-sky-500/10 hover:border-sky-500/30 transition shadow-sm"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id, item.title)}
                      className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30 transition shadow-sm"
                      title="Delete Item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handlePurchase(item.title, item.quantity, item.basePrice)}
                      className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/30 transition shadow-sm"
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
          <div key={item.id} className="p-4 border border-zinc-800/80 rounded-2xl bg-[#0e0e0e] shadow-lg flex flex-col gap-4">
            
            <div className="flex gap-4">
              {/* Product Image */}
              <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 p-0.5 shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              </div>
              
              {/* Product Details */}
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div>
                  <h4 className="font-semibold text-zinc-100 text-base leading-tight truncate">{item.title}</h4>
                  
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-xs text-zinc-400 bg-zinc-900 border border-zinc-800/60 px-2 py-0.5 rounded-md">
                      <Layers className="h-3 w-3 text-zinc-500" /> {item.size}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-zinc-500">
                      <Calendar className="h-3 w-3" /> {item.date}
                    </span>
                  </div>
                </div>
                
                {/* Dynamic Price */}
                <div className="text-lg font-bold text-zinc-100 tracking-wide mt-2">
                  ${(item.basePrice * item.quantity).toFixed(2)}
                </div>
              </div>
            </div>

            <div className="h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

            {/* Bottom Actions & Quantity */}
            <div className="flex items-center justify-between gap-2 pt-0.5">
              
              {/* Modern Quantity Selector */}
              <div className="flex items-center gap-1 bg-zinc-900/80 border border-zinc-800 p-1 rounded-xl">
                <button 
                  onClick={() => updateQuantity(item.id, -1)}
                  className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 active:text-zinc-200 transition"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-7 text-center font-bold text-sm text-zinc-200">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, 1)}
                  className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 active:text-zinc-200 transition"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Action Buttons with subtle glow/colors on black bg */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleView(item.title)}
                  className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sky-400 active:bg-sky-500/20 active:border-sky-500/40 transition"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => handleDelete(item.id, item.title)}
                  className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-rose-400 active:bg-rose-500/20 active:border-rose-500/40 transition"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => handlePurchase(item.title, item.quantity, item.basePrice)}
                  className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-emerald-400 active:bg-emerald-500/20 active:border-emerald-500/40 transition"
                >
                  <ShoppingCart className="h-4 w-4" />
                </button>
              </div>
              
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}