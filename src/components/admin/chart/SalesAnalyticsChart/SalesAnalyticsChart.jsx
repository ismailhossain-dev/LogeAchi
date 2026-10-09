"use client";

import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
  { name: "Mon", sales: 1200, orders: 4 },
  { name: "Tue", sales: 2100, orders: 8 },
  { name: "Wed", sales: 1800, orders: 6 },
  { name: "Thu", sales: 3200, orders: 12 },
  { name: "Fri", sales: 2900, orders: 10 },
  { name: "Sat", sales: 4500, orders: 16 },
  { name: "Sun", sales: 3800, orders: 14 },
];

const SalesAnalyticsChart = () => {
  return (
    <div className="bg-slate-900/30 backdrop-blur-xl border border-slate-800/80 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-black text-white uppercase tracking-tight">Sales & Order Analytics</h3>
          <p className="text-slate-400 text-xs mt-0.5">Overview of weekly performance and revenue trends.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-600/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-wider">
            Live Stream
          </span>
        </div>
      </div>

      <div className="w-full h-[300px] sm:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#dc2626" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#dc2626" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="name" stroke="#64748b" textAnchor="end" tick={{ fontSize: 12 }} />
            <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", color: "#fff" }}
              itemStyle={{ color: "#f8fafc", fontSize: "12px" }}
            />
            <Area type="monotone" dataKey="sales" stroke="#dc2626" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesAnalyticsChart;