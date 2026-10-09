"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Trash2, Layers, Eye, X } from "lucide-react";

const CartTable = ({ initialCart = [] }) => {
  const [cartItems, setCartItems] = useState(initialCart);
  const [loadingId, setLoadingId] = useState(null);
  const [clearingAll, setClearingAll] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Single Item Delete Handler
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      setLoadingId(id);
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/admin/cart/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setCartItems((prev) => prev.filter((item) => item._id !== id));
      } else {
        alert("Failed to delete item");
      }
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setLoadingId(null);
    }
  };

  // Clear All / Delete All Cart Items Handler
  const handleDeleteAll = async () => {
    if (!confirm("WARNING: Are you sure you want to delete ALL cart items?")) return;

    try {
      setClearingAll(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/admin/cart`, {
        method: "DELETE",
      });

      if (res.ok) {
        setCartItems([]);
      } else {
        alert("Failed to clear cart");
      }
    } catch (error) {
      console.error("Clear all error:", error);
    } finally {
      setClearingAll(false);
    }
  };

  return (
    <div className="min-h-screen text-slate-200 p-4 sm:p-6 lg:p-8 font-sans antialiased">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl shadow-xl">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Manage <span className="text-red-600">Cart Items</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Review and manage user active shopping cart items.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-red-600/10 border border-red-500/30 text-red-500 font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl">
              Total Items: {cartItems.length}
            </div>

            {/* {cartItems.length > 0 && (
              <button
                onClick={handleDeleteAll}
                disabled={clearingAll}
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs tracking-wider uppercase px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-lg shadow-red-600/20 active:scale-95 disabled:opacity-50 flex items-center gap-2"
              >
                <Trash2 size={14} />
                {clearingAll ? "Clearing..." : "Delete All"}
              </button>
            )} */}
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-slate-900/20 backdrop-blur-xl p-16 rounded-3xl border border-slate-800/60 text-center space-y-4 shadow-inner">
            <div className="w-16 h-16 bg-slate-950 border border-slate-800 text-slate-600 rounded-full flex items-center justify-center mx-auto shadow-md">
              <ShoppingCart size={24} />
            </div>
            <p className="text-slate-400 text-sm font-medium max-w-xs mx-auto">
              No active cart items found in the database.
            </p>
          </div>
        ) : (
          <>
            {/* ================= MOBILE CARD VIEW ================= */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {cartItems.map((item) => (
                <div 
                  key={item._id} 
                  className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative w-16 h-16 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.jpg"}
                        alt={item.title || "Product"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-1 overflow-hidden">
                      <p className="text-[10px] font-mono font-bold text-red-500 truncate">{item.email}</p>
                      <h3 className="text-sm font-bold text-white truncate">{item.title}</h3>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                          Size: <strong className="text-slate-200">{item.size || "N/A"}</strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3.5 border-t border-slate-800/60">
                    <div>
                      <p className="text-[9px] text-slate-500 uppercase tracking-wider font-bold">Price</p>
                      <p className="text-base font-black text-white font-mono">৳{item.price || "0"}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="p-2 text-xs font-bold text-slate-300 bg-slate-950 border border-slate-800 rounded-xl hover:bg-slate-800 transition-all cursor-pointer"
                        title="View Details"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        disabled={loadingId === item._id}
                        className="p-2 text-xs font-bold text-red-400 bg-red-600/10 border border-red-500/30 rounded-xl hover:bg-red-600 hover:text-white transition-all cursor-pointer disabled:opacity-50"
                        title="Delete Item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ================= DESKTOP TABLE VIEW ================= */}
            <div className="hidden md:block overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/20 backdrop-blur-xl shadow-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/80 text-[10px] font-extrabold uppercase tracking-[2px] text-slate-400">
                    <th className="p-5">Product</th>
                    <th className="p-5">User Email</th>
                    <th className="p-5">Size</th>
                    <th className="p-5">Price</th>
                    <th className="p-5">Added Date</th>
                    <th className="p-5 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 text-sm text-slate-300">
                  {cartItems.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-800/10 transition-all group">
                      <td className="p-5 flex items-center gap-3.5">
                        <div className="relative w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.jpg"}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-slate-100 tracking-tight line-clamp-1">{item.title}</p>
                          <p className="text-[10px] font-mono text-slate-500">ID: {item.productId?.slice(-8)}</p>
                        </div>
                      </td>
                      <td className="p-5 font-mono text-xs text-slate-400">
                        {item.email}
                      </td>
                      <td className="p-5 text-xs">
                        <span className="bg-slate-950/60 border border-slate-800 px-2.5 py-1 rounded-md text-slate-300 font-mono">
                          {item.size || "N/A"}
                        </span>
                      </td>
                      <td className="p-5 font-black text-white font-mono text-sm">
                        ৳{item.price}
                      </td>
                      <td className="p-5 text-xs text-slate-400">
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-US", {
                          year: 'numeric', month: 'short', day: 'numeric'
                        }) : "N/A"}
                      </td>
                      <td className="p-5 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setSelectedItem(item)}
                            className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer shadow-md"
                            title="View Details"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            disabled={loadingId === item._id}
                            className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-red-600/10 border border-red-500/30 hover:bg-red-600 text-red-400 hover:text-white transition-all cursor-pointer shadow-md disabled:opacity-50"
                            title="Delete Item"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ================= DETAILS MODAL ================= */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
              <div className="h-1.5 w-full bg-gradient-to-r from-red-600 to-rose-400"></div>

              <div className="flex items-center justify-between p-6 border-b border-slate-800">
                <div>
                  <p className="text-[9px] font-extrabold uppercase tracking-[2px] text-red-500">Cart Item Specs</p>
                  <h3 className="text-lg font-black text-white mt-0.5">Item Overview</h3>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
                {[
                  { label: "Product Title", value: selectedItem.title, highlight: true },
                  { label: "Price", value: `৳${selectedItem.price}` },
                  { label: "Selected Size", value: selectedItem.size || "N/A" },
                  { label: "User Name", value: selectedItem.name },
                  { label: "User Email", value: selectedItem.email, breakable: true },
                  { label: "Product ID", value: selectedItem.productId, breakable: true },
                  { label: "Cart ID", value: selectedItem._id, breakable: true },
                  { label: "Added Date", value: selectedItem.createdAt ? new Date(selectedItem.createdAt).toLocaleString() : "N/A" },
                ].map((row, idx) => (
                  <div key={idx} className="grid grid-cols-3 items-center bg-slate-950/40 p-3 rounded-xl border border-slate-800/50">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">{row.label}</span>
                    <span className={`col-span-2 text-xs text-slate-200 font-medium ${row.highlight ? 'text-red-400 font-bold' : ''} ${row.breakable ? 'break-all font-mono text-[10px]' : ''}`}>
                      {row.value || "---"}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-6 border-t border-slate-800 bg-slate-950/40 flex justify-end">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[10px] tracking-widest uppercase rounded-xl cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CartTable;