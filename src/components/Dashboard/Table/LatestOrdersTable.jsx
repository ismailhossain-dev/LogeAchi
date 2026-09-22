import React from 'react';

const LatestOrdersTable = ({ data }) => {
  const orders = data?.latestOrders || [];

  return (
    <div className="w-full bg-white/[0.01] border border-white/10 rounded-2xl backdrop-blur-md overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <tbody className="divide-y divide-white/5">
            {orders.map((order, index) => (
              <tr 
                key={order._id || index} 
                className="group hover:bg-white/[0.02] transition-colors duration-200"
              >
                <td className="py-4 pl-4 w-10 text-xs font-mono font-bold text-slate-500 group-hover:text-orange-500 transition-colors">
                  {(index + 1).toString().padStart(2, '0')}
                </td>

                <td className="py-4 px-3 flex items-center gap-3.5">
                  <div className="w-10 h-12 rounded-lg bg-slate-800 border border-white/10 overflow-hidden relative shrink-0">
                    {order.image || order.productImage ? (
                      <img 
                        src={order.image || order.productImage} 
                        alt={order.productTitle} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-600 text-[10px]">
                        👕
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold text-white truncate max-w-[160px] sm:max-w-xs group-hover:text-orange-400 transition-colors">
                      {order.productTitle || "Unknown Product"}
                    </span>
                    {order.createdAt && (
                      <span className="text-[10px] text-slate-500 font-mono mt-0.5">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    )}
                  </div>
                </td>

                <td className="py-4 pr-4 text-right text-sm font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">
                  ৳{(order.productPrice || order.price)?.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LatestOrdersTable;