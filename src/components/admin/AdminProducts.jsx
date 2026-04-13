import React, { useState } from 'react';
import { Plus, X, Edit2, Eye, EyeOff, Trash2, ExternalLink } from 'lucide-react';

function AdminProducts({ products, setProducts }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');
  const [form, setForm] = useState({ name: '', price: '', discountPrice: '', category: '', img: '', isVisible: true, isAffiliate: false, affiliateUrl: '', description: '' });

  const categories = ['Resin', 'Painting', 'Jewelry', 'Handmade', 'Artist Essentials'];
  const filtered = filterCategory === 'All' ? products : products.filter(p => p.category === filterCategory);

  const handleSave = (e) => {
    e.preventDefault();
    const data = { ...form, price: Number(form.price), discountPrice: form.discountPrice ? Number(form.discountPrice) : null };
    if (editingId) {
      setProducts(products.map(p => p.id === editingId ? { ...p, ...data } : p));
    } else {
      setProducts([{ id: Date.now(), ...data, img: data.img || 'https://placehold.co/400x400?text=Product' }, ...products]);
    }
    resetForm();
  };

  const resetForm = () => {
    setIsAdding(false);
    setEditingId(null);
    setForm({ name: '', price: '', discountPrice: '', category: '', img: '', isVisible: true, isAffiliate: false, affiliateUrl: '', description: '' });
  };

  const handleEdit = (p) => {
    setEditingId(p.id);
    setForm({ name: p.name, price: p.price, discountPrice: p.discountPrice || '', category: p.category, img: p.img, isVisible: p.isVisible, isAffiliate: p.isAffiliate || false, affiliateUrl: p.affiliateUrl || '', description: p.description || '' });
    setIsAdding(true);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h3 className="text-2xl font-serif font-bold text-stone-900">Product Management</h3>
        <div className="flex gap-2">
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm outline-none">
            <option value="All">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <button onClick={() => { setIsAdding(!isAdding); if (isAdding) resetForm(); }} className="bg-stone-900 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-rose-600 transition-colors">
            {isAdding ? <X size={16} /> : <Plus size={16} />} {isAdding ? 'Cancel' : 'Add Product'}
          </button>
        </div>
      </div>

      {isAdding && (
        <form onSubmit={handleSave} className="bg-stone-50 p-6 rounded-2xl border border-stone-200 mb-8 space-y-4 shadow-inner animate-fade-in">
          <h4 className="font-bold text-stone-800">{editingId ? 'Edit Product' : 'Create New Product'}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-500 mb-1 uppercase">Product Name *</label>
              <input required type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full p-3 rounded-xl border border-stone-200 outline-none focus:border-rose-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-500 mb-1 uppercase">Category *</label>
              <select required value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="w-full p-3 rounded-xl border border-stone-200 outline-none focus:border-rose-500 bg-white">
                <option value="">Select Category</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-500 mb-1 uppercase">Price (₹) *</label>
              <input required type="number" min="0" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} className="w-full p-3 rounded-xl border border-stone-200 outline-none focus:border-rose-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-500 mb-1 uppercase">Discount Price (₹)</label>
              <input type="number" min="0" value={form.discountPrice} onChange={(e) => setForm({...form, discountPrice: e.target.value})} className="w-full p-3 rounded-xl border border-stone-200 outline-none focus:border-rose-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-stone-500 mb-1 uppercase">Description</label>
              <textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} rows="3" className="w-full p-3 rounded-xl border border-stone-200 outline-none focus:border-rose-500 resize-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-stone-500 mb-1 uppercase">Image URL *</label>
              <input required type="url" value={form.img} onChange={(e) => setForm({...form, img: e.target.value})} className="w-full p-3 rounded-xl border border-stone-200 outline-none focus:border-rose-500" />
              {form.img && <img src={form.img} alt="Preview" className="h-20 w-20 mt-2 rounded-xl object-cover shadow border border-stone-200" />}
            </div>
            {/* Affiliate Toggle */}
            <div className="md:col-span-2 flex items-center gap-4 bg-white p-4 rounded-xl border border-stone-200">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.isAffiliate} onChange={(e) => setForm({...form, isAffiliate: e.target.checked})} className="w-4 h-4 accent-rose-600" />
                <span className="text-sm font-bold text-stone-700">Affiliate Product</span>
              </label>
              {form.isAffiliate && (
                <input type="url" value={form.affiliateUrl} onChange={(e) => setForm({...form, affiliateUrl: e.target.value})} placeholder="External URL (Amazon/Flipkart)" className="flex-1 p-2 rounded-lg border border-stone-200 outline-none focus:border-rose-500 text-sm" />
              )}
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button type="submit" className="bg-rose-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-rose-700 shadow-lg">{editingId ? 'Update Product' : 'Save Product'}</button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto rounded-2xl border border-stone-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-stone-50 text-stone-500 text-xs uppercase tracking-wider border-b border-stone-200">
              <th className="p-4 font-bold">Product</th>
              <th className="p-4 font-bold">Category</th>
              <th className="p-4 font-bold">Price</th>
              <th className="p-4 font-bold text-center">Visible</th>
              <th className="p-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filtered.map(p => (
              <tr key={p.id} className={`hover:bg-stone-50 transition-colors ${!p.isVisible && 'opacity-50 bg-stone-50'}`}>
                <td className="p-4 flex items-center gap-3">
                  <img src={p.img} alt="" className="w-10 h-10 rounded-lg object-cover border border-stone-200" />
                  <div>
                    <span className="font-bold text-stone-900 block text-sm">{p.name}</span>
                    <div className="flex gap-1 mt-0.5">
                      {p.discountPrice && <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">Sale</span>}
                      {p.isAffiliate && <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded flex items-center gap-0.5"><ExternalLink size={8}/>Affiliate</span>}
                    </div>
                  </div>
                </td>
                <td className="p-4 text-stone-600 text-sm">{p.category}</td>
                <td className="p-4">
                  {p.discountPrice ? (
                    <div className="flex flex-col"><span className="font-bold text-rose-600 text-sm">₹{p.discountPrice}</span><span className="text-xs text-stone-400 line-through">₹{p.price}</span></div>
                  ) : <span className="font-bold text-stone-900 text-sm">₹{p.price}</span>}
                </td>
                <td className="p-4 text-center">
                  <button onClick={() => setProducts(products.map(x => x.id === p.id ? { ...x, isVisible: !x.isVisible } : x))} className={`p-2 rounded-full ${p.isVisible ? 'text-green-600 hover:bg-green-50' : 'text-stone-400 hover:bg-stone-200'}`}>
                    {p.isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </td>
                <td className="p-4 text-right space-x-1">
                  <button onClick={() => handleEdit(p)} className="text-stone-500 hover:text-stone-900 p-2 bg-stone-100 rounded-lg hover:bg-stone-200"><Edit2 size={14} /></button>
                  <button onClick={() => setProducts(products.filter(x => x.id !== p.id))} className="text-stone-500 hover:text-red-600 p-2 bg-stone-100 rounded-lg hover:bg-red-50"><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-stone-400 mt-3 text-right">{filtered.length} product(s) displayed</p>
    </div>
  );
}

export default AdminProducts;
