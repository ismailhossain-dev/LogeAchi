"use client";
import React from 'react';
import { ComposedChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const data = [
  { month: 'Jan', orders: 4, delivered: 3 },
  { month: 'Feb', orders: 7, delivered: 6 },
  { month: 'Mar', orders: 5, delivered: 5 },
  { month: 'Apr', orders: 12, delivered: 10 }, 
  { month: 'May', orders: 9, delivered: 8 },
  { month: 'Jun', orders: 15, delivered: 12 },
  { month: 'Jul', orders: 8, delivered: 7 },
  { month: 'Aug', orders: 10, delivered: 10 },
  { month: 'Sep', orders: 6, delivered: 4 },
  { month: 'Oct', orders: 14, delivered: 11 },
  { month: 'Nov', orders: 18, delivered: 15 },
  { month: 'Dec', orders: 22, delivered: 20 },
];

export default function UserOrderOverviewChart() {
  return (
    <div className="w-full bg-[#121214] border border-zinc-800/80 rounded-2xl p-4 sm:p-6 shadow-lg">
      
      <div className="mb-6 space-y-1">
        <h4 className="text-lg font-bold text-zinc-100 tracking-tight">Orders Analytics</h4>
        <p className="text-xs text-zinc-500">Monthly breakdown of your total orders vs successful deliveries.</p>
      </div>


      <div className="w-full h-[300px] sm:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 5, left: -25, bottom: 0 }}
          >
            <CartesianGrid stroke="#1e1e22" strokeDasharray="3 3" vertical={false} />
            
            <XAxis 
              dataKey="month" 
              tick={{ fill: '#71717a', fontSize: 12, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            
            <YAxis 
              tick={{ fill: '#71717a', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            
            <Tooltip
              contentStyle={{
                backgroundColor: '#161619',
                borderColor: '#27272a',
                borderRadius: '12px',
                color: '#f4f4f5',
                fontSize: '13px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
              }}
              cursor={{ stroke: '#27272a', strokeWidth: 1 }}
            />

            <Area 
              type="monotone" 
              dataKey="orders" 
              name="Total Orders"
              fill="url(#orderGradient)" 
              stroke="#6366f1" 
              strokeWidth={2}
            />
            
            <Bar 
              dataKey="delivered" 
              name="Delivered"
              fill="#10b981" 
              barSize={12} 
              radius={[4, 4, 0, 0]} 
            />

            <defs>
              <linearGradient id="orderGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}