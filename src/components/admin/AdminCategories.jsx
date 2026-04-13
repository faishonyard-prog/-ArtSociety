import React, { useState } from 'react';
import { Plus, Trash2, Tag } from 'lucide-react';

function AdminCategories({ categories, db }) {
  const [newCat, setNewCat] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newCat) return;
    setIsSaving(true);
    await db.insert('categories', { name: newCat });
    setNewCat('');
    setIsSaving(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this category? Products won't be deleted but will lose this assignment.")) {
      await db.delete('categories', id);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h3 className="text-2xl font-serif font-bold text-stone-900">Dynamic Categories</h3>
        <p className="text-stone-500 text-sm">Manage product categories used across the shop.</p>
      </div>

      <form onSubmit={handleAdd} className="flex gap-2 mb-8">
        <div className="relative flex-1">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
          <input 
            type="text" 
            value={newCat} 
            onChange={(e) => setNewCat(e.target.value)} 
            placeholder="New category name..." 
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 outline-none focus:border-rose-500 bg-stone-50"
          />
        </div>
        <button 
          type="submit" 
          disabled={isSaving || !newCat}
          className="bg-stone-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-rose-600 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {isSaving && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
          Add
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {categories.map(cat => (
          <div key={cat.id} className="bg-white p-4 rounded-xl border border-stone-200 flex justify-between items-center shadow-sm">
            <span className="font-bold text-stone-800">{cat.name}</span>
            <button 
              onClick={() => handleDelete(cat.id)}
              className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminCategories;
