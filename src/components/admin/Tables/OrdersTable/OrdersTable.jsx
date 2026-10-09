"use client";

import React, { useState } from "react";
import { Eye, X, ShoppingBag, CheckCircle, Clock, Layers, MapPin, Phone, Mail } from "lucide-react";

const OrdersTable = ({ initialOrders = [] }) => {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="min-h-screen text-slate-200 p-4 sm:p-6 lg:p-8 font-sans antialiased">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl shadow-xl">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Manage <span className="text-red-600">Orders</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Track, review, and manage customer purchases and fulfillment status.
            </p>
          </div>
          <div className="bg-red-600/10 border border-red-500/30 text-red-500 font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl w-fit">
            Total Orders: {orders.length}
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-slate-900/20 backdrop-blur-xl p-16 rounded-3xl border border-slate-800/60 text-center space-y-4 shadow-inner">
            <div className="w-16 h-16 bg-slate-950 border border-slate-800 text-slate-600 rounded-full flex items-center justify-center mx-auto shadow-md">
              <ShoppingBag size={24} />
            </div>
            <p className="text-slate-400 text-sm font-medium max-w-xs mx-auto">
              No orders found in the database.
            </p>
          </div>
        ) : (
          <>
            {/* ================= MOBILE CARD VIEW ================= */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {orders.map((order) => (
                <div 
                  key={order._id} 
                  className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-[10px] font-mono font-bold text-red-500 tracking-wider">
                        #{order._id?.slice(-8).toUpperCase()}
                      </p>
                      <h3 className="text-sm font-bold text-white line-clamp-1">{order.productTitle || order.title || "Product Item"}</h3>
                      <p className="text-xs text-slate-400 font-medium">{order.name || order.email}</p>
                    </div>

                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wider ${
                      order.status === "pending" 
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" 
                        : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    }`}>
                      {order.status === "pending" ? <Clock size={8} /> : <CheckCircle size={8} />}
                      {order.status || "pending"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-3.5 border-t border-slate-800/60">
                    <div>
                      <p className="text-[9px] text-slate-500 uppercase tracking-wider font-bold">Total Price</p>
                      <p className="text-base font-black text-white font-mono">৳{order.productPrice || order.price || "0"}</p>
                    </div>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-300 bg-slate-950 border border-slate-800 rounded-xl hover:bg-red-600 hover:text-white transition-all cursor-pointer shadow-md"
                    >
                      <Eye size={12} /> Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ================= DESKTOP TABLE VIEW ================= */}
            <div className="hidden md:block overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/20 backdrop-blur-xl shadow-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/80 text-[10px] font-extrabold uppercase tracking-[2px] text-slate-400">
                    <th className="p-5">Order ID</th>
                    <th className="p-5">Customer</th>
                    <th className="p-5">Product Title</th>
                    <th className="p-5">Status</th>
                    <th className="p-5">Price</th>
                    <th className="p-5 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 text-sm text-slate-300">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-slate-800/10 transition-all group">
                      <td className="p-5 font-mono text-xs font-bold text-red-500 tracking-wide">
                        #{order._id?.slice(-8).toUpperCase()}
                      </td>
                      <td className="p-5">
                        <p className="font-bold text-slate-100 tracking-tight">{order.name || "N/A"}</p>
                        <p className="text-[10px] font-mono text-slate-500">{order.email}</p>
                      </td>
                      <td className="p-5">
                        <p className="font-bold text-slate-200 line-clamp-1">{order.productTitle || order.title || "Product Item"}</p>
                        <p className="text-[10px] text-slate-500">
                          {order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-US", {
                            year: 'numeric', month: 'short', day: 'numeric'
                          }) : "N/A"}
                        </p>
                      </td>
                      <td className="p-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                          order.status === "pending" 
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" 
                            : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        }`}>
                          {order.status === "pending" ? <Clock size={10} /> : <CheckCircle size={10} />}
                          {order.status || "pending"}
                        </span>
                      </td>
                      <td className="p-5 font-black text-white font-mono text-sm">
                        ৳{order.productPrice || order.price || "0"}
                      </td>
                      <td className="p-5 text-center">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-slate-950 border border-slate-800 hover:border-red-500/50 hover:bg-red-600 text-slate-400 hover:text-white transition-all cursor-pointer shadow-md"
                          title="View Details"
                        >
                          <Eye size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ================= ORDER DETAILS MODAL ================= */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
              <div className="h-1.5 w-full bg-gradient-to-r from-red-600 to-rose-400"></div>

              <div className="flex items-center justify-between p-6 border-b border-slate-800">
                <div>
                  <p className="text-[9px] font-extrabold uppercase tracking-[2px] text-red-500">Order Manifest</p>
                  <h3 className="text-lg font-black text-white mt-0.5">Transaction Details</h3>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
                {[
                  { label: "Product Title", value: selectedOrder.productTitle || selectedOrder.title, highlight: true },
                  { label: "Price", value: `৳${selectedOrder.productPrice || selectedOrder.price || 0}` },
                  { label: "Size", value: selectedOrder.productSize || selectedOrder.size || "N/A" },
                  { label: "Customer Name", value: selectedOrder.name },
                  { label: "Email Address", value: selectedOrder.email, breakable: true },
                  { label: "Phone Number", value: selectedOrder.number || selectedOrder.phone },
                  { label: "Shipping Address", value: selectedOrder.address },
                  { label: "Location", value: `${selectedOrder.city || ""}, ${selectedOrder.division || ""} (${selectedOrder.zipcode || ""})` },
                  { label: "Order Status", value: selectedOrder.status || "pending" },
                  { label: "Order Date", value: selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleString() : "N/A" },
                  { label: "Order ID", value: selectedOrder._id, breakable: true },
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
                  onClick={() => setSelectedOrder(null)}
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

export default OrdersTable;