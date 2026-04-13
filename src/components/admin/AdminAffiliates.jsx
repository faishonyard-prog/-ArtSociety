import React, { useState } from 'react';
import { Plus, X, Edit2, Trash2, ExternalLink, Eye, EyeOff } from 'lucide-react';

function AdminAffiliates({ affiliates, setAffiliates }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', img: '', url: '', price: '', isActive: true });

  const handleSave = (e) => {
    e.preventDefault();
    const data = { ...form, price: form.price ? Number(form.price) : null };
    if (editingId) {
      setAffiliates(affiliates.map(a => a.id === editingId ? { ...a, ...data } : a));
    } else {
      setAffiliates([...affiliates, { id: Date.now(), ...data }]);
    }
    resetForm();
  };

  const resetForm = () => {
    setIsAdding(false);
    setEditingId(null);
    setForm({ name: '', img: '', url: '', price: '', isActive: true });
  };

  const handleEdit = (a) => {
    setEditingId(a.id);
    setForm({ name: a.name, img: a.img, url: a.url, price: a.price || '', isActive: a.isActive });
    setIsAdding(true);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-serif font-bold text-stone-900">Affiliate Products</h3>
          <p className="text-stone-500 text-sm">{affiliates.length} affiliate listings</p>
        </div>
        <button onClick={() => { setIsAdding(!isAdding); if (isAdding) resetForm(); }} className="bg-stone-900 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-rose-600 transition-colors">
          {isAdding ? <X size={16} /> : <Plus size={16} />} {isAdding ? 'Cancel' : 'Add Affiliate'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSave} className="bg-stone-50 p-6 rounded-2xl border border-stone-200 mb-8 space-y-4 shadow-inner animate-fade-in">
          <h4 className="font-bold text-stone-800">{editingId ? 'Edit Affiliate' : 'Add Affiliate Product'}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-500 mb-1 uppercase">Product Name *</label>
              <input required type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full p-3 rounded-xl border border-stone-200 outline-none focus:border-rose-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-500 mb-1 uppercase">Price (₹) (Optional)</label>
              <input type="number" min="0" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} className="w-full p-3 rounded-xl border border-stone-200 outline-none focus:border-rose-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-500 mb-1 uppercase">External URL *</label>
              <input required type="url" value={form.url} onChange={(e) => setForm({...form, url: e.target.value})} placeholder="https://www.amazon.in/..." className="w-full p-3 rounded-xl border border-stone-200 outline-none focus:border-rose-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-500 mb-1 uppercase">Image URL *</label>
              <input required type="url" value={form.img} onChange={(e) => setForm({...form, img: e.target.value})} className="w-full p-3 rounded-xl border border-stone-200 outline-none focus:border-rose-500" />
            </div>
          </div>
          {form.img && <img src={form.img} alt="Preview" className="h-16 w-16 rounded-xl object-cover shadow border border-stone-200" />}
          <div className="flex justify-end pt-2">
            <button type="submit" className="bg-rose-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-rose-700 shadow-lg">{editingId ? 'Update' : 'Save'}</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {affiliates.map(a => (
          <div key={a.id} className={`bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow ${!a.isActive && 'opacity-50'}`}>
            <div className="aspect-video relative">
              <img src={a.img} alt={a.name} className="w-full h-full object-cover" />
              <span className="absolute top-2 right-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1"><ExternalLink size={8} />Affiliate</span>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-stone-900 text-sm mb-1">{a.name}</h4>
              {a.price && <p className="text-rose-600 font-bold text-sm mb-2">₹{a.price.toLocaleString()}</p>}
              <a href={a.url} target="_blank" rel="noreferrer" className="text-blue-600 text-xs hover:underline truncate block mb-3">{a.url}</a>
              <div className="flex gap-1">
                <button onClick={() => setAffiliates(affiliates.map(x => x.id === a.id ? { ...x, isActive: !x.isActive } : x))} className={`p-1.5 rounded-lg ${a.isActive ? 'bg-green-50 text-green-600' : 'bg-stone-100 text-stone-400'}`}>
                  {a.isActive ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
                <button onClick={() => handleEdit(a)} className="p-1.5 bg-stone-100 rounded-lg hover:bg-stone-200 text-stone-500"><Edit2 size={14} /></button>
                <button onClick={() => setAffiliates(affiliates.filter(x => x.id !== a.id))} className="p-1.5 bg-stone-100 rounded-lg hover:bg-red-50 text-stone-500 hover:text-red-600"><Trash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {affiliates.length === 0 && <p className="text-center text-stone-400 py-8">No affiliate products. Add one above.</p>}
    </div>
  );
}

export default AdminAffiliates;
