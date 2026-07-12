"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Eye, X, CheckCircle, Clock, Shirt, Layers } from "lucide-react";

const OrdersTable = () => {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      const fetchOrders = async () => {
        try {
          setLoadingOrders(true);
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_APP_URL}/api/checkout?email=${session.user.email}`
          );

          if (!res.ok) {
            throw new Error("Failed to fetch products");
          }

          const data = await res.json();
          
          if (data?.result) {
            setOrders(Array.isArray(data.result) ? data.result : [data.result]);
          } else {
            setOrders([]);
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoadingOrders(false);
        }
      };

      fetchOrders();
    } else if (status === "unauthenticated") {
      setLoadingOrders(false);
      setError("Please login to view your orders.");
    }
  }, [session, status]);

  if (status === "loading" || loadingOrders) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4  min-h-screen">
        <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
        <p className="text-xs text-slate-400 tracking-[3px] uppercase font-black animate-pulse">Synchronizing Orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center shadow-xl">
          <p className="text-sm text-red-400 font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  text-slate-200 p-4 sm:p-6 lg:p-8 font-sans antialiased">
      <div className="max-w-6xl mx-auto">
        
        {orders.length === 0 ? (
          <div className="bg-slate-900/20 backdrop-blur-xl p-16 rounded-3xl border border-slate-800/60 text-center space-y-4 shadow-inner">
            <div className="w-16 h-16 bg-slate-950 border border-slate-800 text-slate-600 rounded-full flex items-center justify-center mx-auto shadow-md">
              <Shirt size={24} />
            </div>
            <p className="text-slate-400 text-sm font-medium max-w-xs mx-auto">
              No recent placement records discovered in your profile.
            </p>
          </div>
        ) : (
          <>
            {/* ================= 1. MOBILE CARD VIEW (md:hidden) ================= */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {orders.map((order) => (
                <div 
                  key={order._id} 
                  className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-4 hover:border-slate-700/50 transition-all duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-[10px] font-mono font-bold text-orange-500 tracking-wider">
                        #{order._id?.slice(-8).toUpperCase()}
                      </p>
                      <h3 className="text-base font-bold text-white tracking-tight">{order.productTitle || "Product Name"}</h3>
                      <div className="inline-flex items-center gap-1 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-[11px] text-slate-400">
                        <Layers size={10} className="text-slate-500" />
                        <span>Size: <strong className="text-slate-200">{order.productSize || "N/A"}</strong></span>
                      </div>
                    </div>
                    
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wider ${
                      order.status === "pending" 
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" 
                        : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    }`}>
                      {order.status === "pending" ? <Clock size={8} /> : <CheckCircle size={8} />}
                      {order.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-3.5 border-t border-slate-800/60">
                    <div>
                      <p className="text-[9px] text-slate-500 uppercase tracking-wider font-bold">Price</p>
                      <p className="text-lg font-black text-white font-mono">৳{order.productPrice || "0.00"}</p>
                    </div>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-300 bg-slate-950 border border-slate-800 rounded-xl hover:bg-orange-600 hover:text-white transition-all duration-200 cursor-pointer active:scale-95 shadow-md"
                    >
                      <Eye size={12} /> Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ================= 2. DESKTOP TABLE VIEW (hidden md:block) ================= */}
            <div className="hidden md:block overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/20 backdrop-blur-xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/80 text-[10px] font-extrabold uppercase tracking-[2px] text-slate-400">
                    <th className="p-5">Order ID</th>
                    <th className="p-5">Product Title</th>
                    <th className="p-5">Size</th>
                    <th className="p-5">Status</th>
                    <th className="p-5">Price</th>
                    <th className="p-5 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 text-sm text-slate-300">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-slate-800/10 transition-all duration-200 group">
                      <td className="p-5 font-mono text-xs font-bold text-orange-500 tracking-wide">
                        #{order._id?.slice(-8).toUpperCase()}
                      </td>
                      <td className="p-5">
                        <div>
                          <p className="font-bold text-slate-100 tracking-tight">{order.productTitle || "Generic Item"}</p>
                          <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-US", {
                              year: 'numeric', month: 'short', day: 'numeric'
                            }) : "N/A"}
                          </p>
                        </div>
                      </td>
                      <td className="p-5 font-mono text-xs font-bold text-slate-400">
                        <span className="bg-slate-950/60 border border-slate-800/80 px-2.5 py-1 rounded-md text-slate-300">
                          {order.productSize || "N/A"}
                        </span>
                      </td>
                      <td className="p-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                          order.status === "pending" 
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" 
                            : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        }`}>
                          {order.status === "pending" ? <Clock size={10} /> : <CheckCircle size={10} />}
                          {order.status}
                        </span>
                      </td>
                      <td className="p-5 font-black text-slate-100 font-mono text-sm">
                        ৳{order.productPrice || "0.00"}
                      </td>
                      <td className="p-5 text-center">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-slate-950 border border-slate-800 hover:border-orange-500/50 hover:bg-orange-600 text-slate-400 hover:text-white transition-all duration-300 group cursor-pointer active:scale-95 shadow-md"
                          title="View Details"
                        >
                          <Eye size={14} className="group-hover:scale-110 transition-transform" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ================= 3. EXTENDED DETAILS MODAL ================= */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md transition-all duration-300">
            <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-[0_0_80px_-10px_rgba(249,115,22,0.15)] animate-in fade-in zoom-in-95 duration-200">
              
              <div className="h-1.5 w-full bg-gradient-to-r from-orange-600 to-amber-400"></div>

              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-800/80">
                <div>
                  <p className="text-[9px] font-extrabold uppercase tracking-[2px] text-orange-500">Metadata Specs</p>
                  <h3 className="text-lg font-black text-white mt-0.5 flex items-center gap-2">
                    Order <span className="font-mono text-slate-400">#{selectedOrder._id?.toUpperCase()}</span>
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer active:scale-95"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3.5 max-h-[60vh] overflow-y-auto custom-scrollbar">
                {[
                  { label: "Product Title", value: selectedOrder.productTitle, highlight: true },
                  { label: "Selected Size", value: selectedOrder.productSize },
                  { label: "Price", value: `$${selectedOrder.productPrice}` },
                  { label: "Customer Name", value: selectedOrder.name },
                  { label: "Mail Address", value: selectedOrder.email, breakable: true },
                  { label: "Contact Phone", value: selectedOrder.number },
                  { label: "Shipping Street", value: selectedOrder.address },
                  { label: "Destination", value: `${selectedOrder.city}, ${selectedOrder.division} (${selectedOrder.zipcode})` },
                  { label: "Timestamp", value: selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleString() : "N/A" },
                ].map((item, idx) => (
                  <div key={idx} className="grid grid-cols-3 items-center bg-slate-950/30 p-3 rounded-xl border border-slate-800/50 hover:border-slate-800 transition-colors">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">{item.label}</span>
                    <span className={`col-span-2 text-xs text-slate-200 font-medium ${item.highlight ? 'text-orange-400 font-bold' : ''} ${item.breakable ? 'break-all' : ''}`}>
                      {item.value || "---"}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-slate-800/80 bg-slate-950/40 flex justify-end">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[10px] tracking-widest uppercase rounded-xl transition-all active:scale-[0.98] cursor-pointer"
                >
                  X
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersTable;