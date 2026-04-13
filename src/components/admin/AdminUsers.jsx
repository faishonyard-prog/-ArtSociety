import React, { useState } from 'react';
import { Search, Plus, X, Key, User, Trash2, Edit2 } from 'lucide-react';

function AdminUsers({ users, db }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', role: 'Customer' });

  const roles = ['All', 'Admin', 'Customer', 'Student'];
  const filtered = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'All' || u.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    let success = false;
    
    if (editingId) {
      success = await db.update('users', editingId, { name: form.name, email: form.email, role: form.role });
    } else {
      success = await db.insert('users', { 
        ...form, 
        joined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) 
      });
    }
    
    if (success) resetForm();
    setIsSaving(false);
  };

  const resetForm = () => {
    setIsAdding(false);
    setEditingId(null);
    setForm({ name: '', email: '', role: 'Customer' });
  };

  const handleEdit = (u) => {
    setEditingId(u.id);
    setForm({ name: u.name, email: u.email, role: u.role });
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete user?")) {
      await db.delete('users', id);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h3 className="text-2xl font-serif font-bold text-stone-900">User Management</h3>
          <p className="text-stone-500 text-sm">{users.length} registered accounts</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={14} />
            <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-rose-500 text-sm w-48" />
          </div>
          <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm outline-none">
            {roles.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <button onClick={() => { setIsAdding(!isAdding); if (isAdding) resetForm(); }} className="bg-stone-900 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-rose-600 transition-colors">
            {isAdding ? <X size={16} /> : <Plus size={16} />} {isAdding ? 'Cancel' : 'Add User'}
          </button>
          <button onClick={() => alert("CSV Export Triggered (Simulated)")} className="bg-stone-100 text-stone-700 px-4 py-2 rounded-xl text-sm font-bold hover:bg-stone-200">Export</button>
        </div>
      </div>

      {isAdding && (
        <form onSubmit={handleSave} className="bg-stone-50 p-6 rounded-2xl border border-stone-200 mb-6 animate-fade-in shadow-inner">
          <h4 className="font-bold text-stone-800 mb-4">{editingId ? 'Edit User' : 'Add New User'}</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-500 mb-1 uppercase">Name *</label>
              <input required type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full p-3 rounded-xl border border-stone-200 outline-none focus:border-rose-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-500 mb-1 uppercase">Email *</label>
              <input required type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="w-full p-3 rounded-xl border border-stone-200 outline-none focus:border-rose-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-500 mb-1 uppercase">Role *</label>
              <select value={form.role} onChange={(e) => setForm({...form, role: e.target.value})} className="w-full p-3 rounded-xl border border-stone-200 outline-none focus:border-rose-500 bg-white">
                <option value="Customer">Customer</option>
                <option value="Student">Student</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <button type="submit" disabled={isSaving} className="bg-rose-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-rose-700 shadow-lg disabled:opacity-50">
              {editingId ? 'Update User' : 'Save User'}
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto rounded-2xl border border-stone-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-stone-50 text-stone-500 text-xs uppercase tracking-wider border-b border-stone-200">
              <th className="p-4 font-bold">Name</th>
              <th className="p-4 font-bold">Email</th>
              <th className="p-4 font-bold">Role</th>
              <th className="p-4 font-bold">Joined</th>
              <th className="p-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filtered.map(user => (
              <tr key={user.id} className="hover:bg-stone-50 transition-colors">
                <td className="p-4 font-bold text-stone-900 flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-stone-500 text-xs font-bold">{user.name.charAt(0)}</div>
                  {user.name}
                </td>
                <td className="p-4 text-stone-600 text-sm">{user.email}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-max ${user.role === 'Admin' ? 'bg-rose-100 text-rose-700' : user.role === 'Student' ? 'bg-purple-100 text-purple-700' : 'bg-stone-200 text-stone-700'}`}>
                    {user.role === 'Admin' ? <Key size={10}/> : <User size={10}/>} {user.role}
                  </span>
                </td>
                <td className="p-4 text-stone-500 text-sm">{user.joined}</td>
                <td className="p-4 text-right space-x-1">
                  <button onClick={() => handleEdit(user)} className="text-stone-500 hover:text-stone-900 p-2 bg-stone-100 rounded-lg hover:bg-stone-200"><Edit2 size={14} /></button>
                  <button onClick={() => handleDelete(user.id)} className="text-stone-500 hover:text-red-600 p-2 bg-stone-100 rounded-lg hover:bg-red-50"><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filtered.length === 0 && <p className="text-center text-stone-400 py-8">No users found.</p>}
    </div>
  );
}

export default AdminUsers;
