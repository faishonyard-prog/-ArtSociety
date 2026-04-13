import React, { useState } from 'react';
import { LayoutDashboard, ShoppingBag, Package, Users, LogOut, GraduationCap, Image, LinkIcon } from 'lucide-react';

import AdminOverview from '../components/admin/AdminOverview';
import AdminProducts from '../components/admin/AdminProducts';
import AdminOrders from '../components/admin/AdminOrders';
import AdminUsers from '../components/admin/AdminUsers';
import AdminCourses from '../components/admin/AdminCourses';
import AdminGallery from '../components/admin/AdminGallery';
import AdminAffiliates from '../components/admin/AdminAffiliates';

function AdminDashboard({ products, setProducts, orders, setOrders, users, setUsers, currentUser, onLogout, courses, setCourses, enrollments, setEnrollments, affiliates, setAffiliates, gallery, setGallery }) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'courses', label: 'Courses', icon: GraduationCap },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'affiliates', label: 'Affiliates', icon: LinkIcon },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8 animate-fade-in flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <div className="w-full md:w-56 flex flex-col gap-1.5 flex-shrink-0">
        <div className="mb-4 px-4 py-4 bg-stone-900 rounded-2xl text-white shadow-xl">
          <p className="text-[10px] text-rose-400 font-bold uppercase tracking-wider mb-1">Admin Portal</p>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-rose-600 flex items-center justify-center font-bold text-sm">{currentUser.name.charAt(0)}</div>
            <div>
              <h2 className="font-serif font-bold leading-tight text-sm">{currentUser.name}</h2>
              <p className="text-[10px] text-stone-400">{currentUser.email}</p>
            </div>
          </div>
        </div>

        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeTab === tab.id ? 'bg-rose-600 text-white shadow-md' : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <Icon size={16} /> {tab.label}
            </button>
          );
        })}
        <button onClick={onLogout} className="mt-4 flex items-center gap-2.5 px-3.5 py-2.5 text-stone-500 hover:bg-red-50 hover:text-red-600 rounded-xl font-medium text-sm transition-colors">
          <LogOut size={16} /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white rounded-3xl shadow-sm border border-stone-200 p-6 md:p-8 min-h-[75vh]">
        {activeTab === 'overview' && <AdminOverview products={products} orders={orders} users={users} courses={courses} enrollments={enrollments} affiliates={affiliates} gallery={gallery} setActiveTab={setActiveTab} />}
        {activeTab === 'orders' && <AdminOrders orders={orders} setOrders={setOrders} />}
        {activeTab === 'products' && <AdminProducts products={products} setProducts={setProducts} />}
        {activeTab === 'users' && <AdminUsers users={users} setUsers={setUsers} />}
        {activeTab === 'courses' && <AdminCourses courses={courses} setCourses={setCourses} enrollments={enrollments} setEnrollments={setEnrollments} />}
        {activeTab === 'gallery' && <AdminGallery gallery={gallery} setGallery={setGallery} />}
        {activeTab === 'affiliates' && <AdminAffiliates affiliates={affiliates} setAffiliates={setAffiliates} />}
      </div>
    </div>
  );
}

export default AdminDashboard;
