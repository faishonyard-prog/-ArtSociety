import React, { useState } from 'react';

function AdminOrders({ orders, setOrders }) {
  const [filterStatus, setFilterStatus] = useState('All');
  const statuses = ['All', 'Pending', 'In Progress', 'Shipped', 'Delivered', 'Cancelled'];
  const filtered = filterStatus === 'All' ? orders : orders.filter(o => o.status === filterStatus);

  const handleStatusChange = (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h3 className="text-2xl font-serif font-bold text-stone-900">Order Management</h3>
          <p className="text-stone-500 text-sm">{orders.length} total orders</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {statuses.map(s => (
            <button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${filterStatus === s ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'}`}>
              {s} {s !== 'All' && `(${orders.filter(o => o.status === s).length})`}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-stone-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-stone-50 text-stone-500 text-xs uppercase tracking-wider border-b border-stone-200">
              <th className="p-4 font-bold">Order ID</th>
              <th className="p-4 font-bold">Date</th>
              <th className="p-4 font-bold">Customer</th>
              <th className="p-4 font-bold">Item</th>
              <th className="p-4 font-bold">Amount</th>
              <th className="p-4 font-bold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filtered.map(order => (
              <tr key={order.id} className="hover:bg-stone-50 transition-colors">
                <td className="p-4 font-bold text-stone-900 text-sm">{order.id}</td>
                <td className="p-4 text-stone-500 text-sm">{order.date}</td>
                <td className="p-4 text-stone-700 text-sm">{order.customer}</td>
                <td className="p-4 text-stone-600 text-sm truncate max-w-[160px]">{order.item}</td>
                <td className="p-4 font-bold text-sm">₹{order.amount.toLocaleString()}</td>
                <td className="p-4">
                  <select value={order.status} onChange={(e) => handleStatusChange(order.id, e.target.value)} className={`px-3 py-1.5 rounded-full text-xs font-bold outline-none cursor-pointer border-r-8 border-transparent ${
                    order.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                    order.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                    order.status === 'Shipped' ? 'bg-indigo-100 text-indigo-700' :
                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filtered.length === 0 && <p className="text-center text-stone-400 py-8">No orders matching this filter.</p>}
    </div>
  );
}

export default AdminOrders;
