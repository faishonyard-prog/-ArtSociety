import React, { useState } from 'react';
import { Plus, X, Edit2, Trash2, Eye, FileText, Upload, ImageIcon, Save } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function AdminArticles({ blogs, db, setCurrentView }) {
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ 
    title: '', 
    excerpt: '', 
    content: '', 
    img: '', 
    author: 'Admin' 
  });

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content) return;
    
    setIsSaving(true);
    const payload = {
      title: form.title,
      excerpt: form.excerpt,
      content: form.content,
      img: form.img,
      author: form.author,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };

    let success = false;
    if (editingId) {
      success = await db.update('blogs', editingId, payload);
    } else {
      success = await db.insert('blogs', payload);
    }

    if (success) {
      resetForm();
      db.refresh('blogs');
    }
    setIsSaving(false);
  };

  const resetForm = () => {
    setIsAdding(false);
    setEditingId(null);
    setForm({ title: '', excerpt: '', content: '', img: '', author: 'Admin' });
  };

  const handleEdit = (post) => {
    setEditingId(post.id);
    setForm({
      title: post.title,
      excerpt: post.excerpt || '',
      content: post.content,
      img: post.img || '',
      author: post.author || 'Admin'
    });
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      await db.delete('blogs', id);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const url = await db.uploadImage(file, 'articles');
    if (url) {
      setForm({ ...form, img: url });
    }
    setIsUploading(false);
  };

  // Quill modules for a rich experience
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-2xl font-serif font-bold text-stone-900">Articles & Journal</h3>
          <p className="text-stone-500 text-sm">Manage your studio stories and updates</p>
        </div>
        <button 
          onClick={() => { setIsAdding(!isAdding); if (isAdding) resetForm(); }} 
          className="bg-stone-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-rose-600 transition-all shadow-md"
        >
          {isAdding ? <X size={16} /> : <Plus size={16} />} 
          {isAdding ? 'Cancel' : 'Write New Article'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSave} className="bg-stone-50 p-8 rounded-3xl border border-stone-200 mb-10 space-y-6 shadow-sm animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-stone-500 mb-2 uppercase tracking-wider">Article Title *</label>
              <input 
                required 
                type="text" 
                value={form.title} 
                onChange={(e) => setForm({...form, title: e.target.value})} 
                placeholder="Enter a captivating title..."
                className="w-full p-4 rounded-xl border border-stone-200 outline-none focus:border-rose-500 bg-white text-lg font-serif" 
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-500 mb-2 uppercase tracking-wider">Excerpt / Short Description</label>
              <textarea 
                value={form.excerpt} 
                onChange={(e) => setForm({...form, excerpt: e.target.value})} 
                placeholder="A brief summary for the preview card..."
                rows="3"
                className="w-full p-4 rounded-xl border border-stone-200 outline-none focus:border-rose-500 bg-white resize-none" 
              />
            </div>

            <div className="space-y-4">
              <label className="block text-xs font-bold text-stone-500 mb-2 uppercase tracking-wider">Cover Image</label>
              <div className="flex gap-4 items-start">
                <div className="flex-1 space-y-2">
                   <div className="relative">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileUpload}
                        className="hidden" 
                        id="article-img-upload" 
                      />
                      <label 
                        htmlFor="article-img-upload"
                        className={`flex items-center justify-center gap-2 w-full p-4 rounded-xl border-2 border-dashed transition-all cursor-pointer ${
                          isUploading ? 'bg-stone-100 border-stone-300' : 'bg-white border-stone-200 hover:border-rose-300 hover:bg-rose-50'
                        }`}
                      >
                        {isUploading ? <div className="animate-spin rounded-full h-5 w-5 border-2 border-rose-600 border-t-transparent" /> : <Upload size={18} className="text-rose-600" />}
                        <span className="text-sm font-bold text-stone-700">{isUploading ? 'Uploading...' : 'Upload Cover Image'}</span>
                      </label>
                   </div>
                   <input 
                    type="url" 
                    value={form.img} 
                    onChange={(e) => setForm({...form, img: e.target.value})} 
                    placeholder="Or paste image URL..."
                    className="w-full p-2 text-xs rounded-lg border border-stone-200 outline-none"
                   />
                </div>
                {form.img && <img src={form.img} className="w-24 h-24 rounded-xl object-cover border border-stone-200 shadow-sm" />}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-500 mb-2 uppercase tracking-wider">Article Content *</label>
            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden min-h-[400px]">
              <ReactQuill 
                theme="snow" 
                value={form.content} 
                onChange={(content) => setForm({...form, content})} 
                modules={modules}
                style={{ height: '350px', marginBottom: '50px' }}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button 
              type="submit" 
              disabled={isSaving || isUploading} 
              className="bg-rose-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-rose-700 shadow-xl disabled:opacity-50 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              {isSaving ? <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white" /> : <Save size={20} />}
              {editingId ? 'Update Article' : 'Publish Article'}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 gap-6">
        {blogs.map(post => (
          <div key={post.id} className="bg-white p-5 rounded-2xl border border-stone-200 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
            <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0 border border-stone-100">
              <img src={post.img || 'https://via.placeholder.com/400x300'} className="w-full h-full object-cover" alt="" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                   <h4 className="text-xl font-bold text-stone-900 truncate pr-4">{post.title}</h4>
                   <p className="text-xs text-stone-400 font-bold uppercase tracking-widest mt-1">{post.date} • By {post.author || 'Admin'}</p>
                </div>
                <div className="flex gap-2">
                   <button onClick={() => handleEdit(post)} className="p-2 bg-stone-50 text-stone-600 rounded-lg hover:bg-stone-100 hover:text-stone-900 transition-colors"><Edit2 size={16} /></button>
                   <button onClick={() => handleDelete(post.id)} className="p-2 bg-stone-50 text-stone-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
                </div>
              </div>
              <p className="text-sm text-stone-600 line-clamp-2 mt-2 leading-relaxed italic">{post.excerpt}</p>
            </div>
          </div>
        ))}
        {blogs.length === 0 && (
          <div className="text-center py-20 bg-stone-50 rounded-3xl border border-dashed border-stone-300">
             <FileText size={48} className="mx-auto text-stone-300 mb-4" />
             <p className="text-stone-500">No articles yet. Start sharing your stories!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminArticles;
