import React, { useState } from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, Image } from 'lucide-react';

function AdminGallery({ gallery, setGallery }) {
  const [newUrl, setNewUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newUrl) return;
    setGallery([...gallery, { id: Date.now(), url: newUrl, caption: newCaption, order: gallery.length + 1 }]);
    setNewUrl('');
    setNewCaption('');
  };

  const handleDelete = (id) => {
    setGallery(gallery.filter(g => g.id !== id));
  };

  const moveUp = (idx) => {
    if (idx === 0) return;
    const arr = [...gallery];
    [arr[idx], arr[idx - 1]] = [arr[idx - 1], arr[idx]];
    setGallery(arr.map((g, i) => ({ ...g, order: i + 1 })));
  };

  const moveDown = (idx) => {
    if (idx === gallery.length - 1) return;
    const arr = [...gallery];
    [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
    setGallery(arr.map((g, i) => ({ ...g, order: i + 1 })));
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-serif font-bold text-stone-900">Gallery / Slider Manager</h3>
          <p className="text-stone-500 text-sm">{gallery.length} images in slider</p>
        </div>
      </div>

      {/* Add Form */}
      <form onSubmit={handleAdd} className="bg-stone-50 p-6 rounded-2xl border border-stone-200 mb-8 shadow-inner">
        <h4 className="font-bold text-stone-800 mb-4 flex items-center gap-2"><Image size={18} /> Add New Image</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-stone-500 mb-1 uppercase">Image URL *</label>
            <input required type="text" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="/images/products/example.jpg or https://..." className="w-full p-3 rounded-xl border border-stone-200 outline-none focus:border-rose-500" />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-500 mb-1 uppercase">Caption</label>
            <input type="text" value={newCaption} onChange={(e) => setNewCaption(e.target.value)} placeholder="Optional caption" className="w-full p-3 rounded-xl border border-stone-200 outline-none focus:border-rose-500" />
          </div>
        </div>
        {newUrl && (
          <div className="mt-4 p-3 bg-white rounded-xl border border-stone-200">
            <p className="text-xs font-bold text-stone-500 mb-2 uppercase">Preview</p>
            <img src={newUrl} alt="Preview" className="h-24 rounded-lg object-cover shadow" onError={(e) => e.target.style.display='none'} />
          </div>
        )}
        <div className="flex justify-end pt-4">
          <button type="submit" className="bg-rose-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-rose-700 shadow-lg flex items-center gap-2"><Plus size={16} /> Add to Slider</button>
        </div>
      </form>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {gallery.sort((a, b) => a.order - b.order).map((img, idx) => (
          <div key={img.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm group hover:shadow-md transition-shadow">
            <div className="aspect-video relative">
              <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 bg-stone-900/70 text-white text-[10px] font-bold px-2 py-1 rounded-full">#{img.order}</div>
            </div>
            <div className="p-3 flex items-center justify-between">
              <span className="text-sm text-stone-700 font-medium truncate">{img.caption || 'No caption'}</span>
              <div className="flex gap-1">
                <button onClick={() => moveUp(idx)} className="p-1.5 bg-stone-100 rounded-lg hover:bg-stone-200 text-stone-500" title="Move Up"><ArrowUp size={12} /></button>
                <button onClick={() => moveDown(idx)} className="p-1.5 bg-stone-100 rounded-lg hover:bg-stone-200 text-stone-500" title="Move Down"><ArrowDown size={12} /></button>
                <button onClick={() => handleDelete(img.id)} className="p-1.5 bg-stone-100 rounded-lg hover:bg-red-50 text-stone-500 hover:text-red-600" title="Delete"><Trash2 size={12} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {gallery.length === 0 && <p className="text-center text-stone-400 py-8">No images in the slider. Add one above.</p>}
    </div>
  );
}

export default AdminGallery;
