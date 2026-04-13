import React from 'react';
import { TrendingUp, ShoppingBag, Package, Users, GraduationCap, Image, LinkIcon } from 'lucide-react';

function AdminOverview({ products, orders, users, courses, enrollments, affiliates, gallery, setActiveTab }) {
  const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);
  const stats = [
    { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: TrendingUp, color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
    { label: 'Active Orders', value: orders.filter(o => o.status !== 'Delivered').length, icon: ShoppingBag, color: 'bg-rose-50 text-rose-600 border-rose-200' },
    { label: 'Products', value: products.length, icon: Package, color: 'bg-blue-50 text-blue-600 border-blue-200' },
    { label: 'Users', value: users.length, icon: Users, color: 'bg-amber-50 text-amber-600 border-amber-200' },
    { label: 'Courses', value: courses.length, icon: GraduationCap, color: 'bg-purple-50 text-purple-600 border-purple-200' },
    { label: 'Enrollments', value: enrollments.length, icon: GraduationCap, color: 'bg-indigo-50 text-indigo-600 border-indigo-200' },
    { label: 'Gallery Images', value: gallery.length, icon: Image, color: 'bg-teal-50 text-teal-600 border-teal-200' },
    { label: 'Affiliates', value: affiliates.length, icon: LinkIcon, color: 'bg-orange-50 text-orange-600 border-orange-200' },
  ];

  const quickActions = [
    { label: 'Add Product', tab: 'products' },
    { label: 'View Orders', tab: 'orders' },
    { label: 'Manage Courses', tab: 'courses' },
    { label: 'Manage Gallery', tab: 'gallery' },
  ];

  return (
    <div className="animate-fade-in space-y-8">
      <div>
        <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">System Overview</h3>
        <p className="text-stone-500 text-sm">Welcome back! Here's a snapshot of your platform.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className={`p-5 rounded-2xl border ${s.color} transition-transform hover:scale-[1.02]`}>
              <div className="flex items-center justify-between mb-3">
                <Icon size={20} />
              </div>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs font-semibold uppercase tracking-wider opacity-70 mt-1">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Revenue Bar Chart */}
      <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6">
        <h4 className="font-bold text-stone-800 mb-4">Revenue by Order</h4>
        <div className="flex items-end gap-2 h-32">
          {orders.map((o, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[10px] font-bold text-stone-500">₹{o.amount}</span>
              <div className="w-full bg-rose-500 rounded-t-lg transition-all" style={{ height: `${(o.amount / Math.max(...orders.map(x => x.amount))) * 100}%` }}></div>
              <span className="text-[10px] text-stone-400 truncate w-full text-center">{o.customer.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h4 className="font-bold text-stone-800 mb-3">Quick Actions</h4>
        <div className="flex flex-wrap gap-3">
          {quickActions.map((a, i) => (
            <button key={i} onClick={() => setActiveTab(a.tab)} className="bg-stone-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-rose-600 transition-colors">
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6">
        <h4 className="font-bold text-stone-800 mb-4">Recent Orders</h4>
        <div className="space-y-3">
          {orders.slice(0, 5).map(o => (
            <div key={o.id} className="flex justify-between items-center bg-white p-3 rounded-xl border border-stone-100">
              <div>
                <span className="font-bold text-stone-900 text-sm">{o.id}</span>
                <span className="text-stone-500 text-xs ml-2">{o.customer}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-sm">₹{o.amount}</span>
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${o.status === 'Pending' ? 'bg-amber-100 text-amber-700' : o.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{o.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminOverview;
