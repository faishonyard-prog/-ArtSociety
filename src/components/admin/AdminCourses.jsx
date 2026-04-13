import React, { useState } from 'react';
import { Plus, X, Edit2, Trash2, GraduationCap, Users } from 'lucide-react';

function AdminCourses({ courses, setCourses, enrollments, setEnrollments }) {
  const [view, setView] = useState('courses'); // courses | enrollments
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: '', price: '', firstMonth: '', tag: 'Beginner', duration: '', batches: [], desc: '', isActive: true });
  const [enrollFilter, setEnrollFilter] = useState('All');

  const handleSave = (e) => {
    e.preventDefault();
    const data = { ...form, price: Number(form.price), firstMonth: Number(form.firstMonth) };
    if (editingId) {
      setCourses(courses.map(c => c.id === editingId ? { ...c, ...data } : c));
    } else {
      setCourses([...courses, { id: Date.now(), ...data }]);
    }
    resetForm();
  };

  const resetForm = () => {
    setIsAdding(false);
    setEditingId(null);
    setForm({ title: '', price: '', firstMonth: '', tag: 'Beginner', duration: '', batches: [], desc: '', isActive: true });
  };

  const handleEdit = (c) => {
    setEditingId(c.id);
    setForm({ title: c.title, price: c.price, firstMonth: c.firstMonth, tag: c.tag, duration: c.duration, batches: c.batches, desc: c.desc, isActive: c.isActive });
    setIsAdding(true);
  };

  const toggleBatch = (b) => {
    setForm({ ...form, batches: form.batches.includes(b) ? form.batches.filter(x => x !== b) : [...form.batches, b] });
  };

  const handlePaymentToggle = (id) => {
    setEnrollments(enrollments.map(e => e.id === id ? { ...e, paymentStatus: e.paymentStatus === 'Paid' ? 'Pending' : 'Paid' } : e));
  };

  const filteredEnrollments = enrollFilter === 'All' ? enrollments : enrollments.filter(e => e.courseName === enrollFilter);

  return (
    <div className="animate-fade-in">
      {/* Tab Toggle */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => setView('courses')} className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-colors ${view === 'courses' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}>
          <GraduationCap size={16} /> Courses ({courses.length})
        </button>
        <button onClick={() => setView('enrollments')} className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-colors ${view === 'enrollments' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}>
          <Users size={16} /> Enrollments ({enrollments.length})
        </button>
      </div>

      {/* COURSES VIEW */}
      {view === 'courses' && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-serif font-bold text-stone-900">Course Management</h3>
            <button onClick={() => { setIsAdding(!isAdding); if (isAdding) resetForm(); }} className="bg-stone-900 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-rose-600 transition-colors">
              {isAdding ? <X size={16} /> : <Plus size={16} />} {isAdding ? 'Cancel' : 'Add Course'}
            </button>
          </div>

          {isAdding && (
            <form onSubmit={handleSave} className="bg-stone-50 p-6 rounded-2xl border border-stone-200 mb-8 space-y-4 shadow-inner animate-fade-in">
              <h4 className="font-bold text-stone-800">{editingId ? 'Edit Course' : 'Create New Course'}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-500 mb-1 uppercase">Course Title *</label>
                  <input required type="text" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} className="w-full p-3 rounded-xl border border-stone-200 outline-none focus:border-rose-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-500 mb-1 uppercase">Tag *</label>
                  <select value={form.tag} onChange={(e) => setForm({...form, tag: e.target.value})} className="w-full p-3 rounded-xl border border-stone-200 outline-none focus:border-rose-500 bg-white">
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Creative">Creative</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-500 mb-1 uppercase">Monthly Price (₹) *</label>
                  <input required type="number" min="0" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} className="w-full p-3 rounded-xl border border-stone-200 outline-none focus:border-rose-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-500 mb-1 uppercase">First Month Price (₹) *</label>
                  <input required type="number" min="0" value={form.firstMonth} onChange={(e) => setForm({...form, firstMonth: e.target.value})} className="w-full p-3 rounded-xl border border-stone-200 outline-none focus:border-rose-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-500 mb-1 uppercase">Duration *</label>
                  <input required type="text" value={form.duration} placeholder="e.g. 3 months" onChange={(e) => setForm({...form, duration: e.target.value})} className="w-full p-3 rounded-xl border border-stone-200 outline-none focus:border-rose-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-500 mb-1 uppercase">Batch Timings</label>
                  <div className="flex gap-2 mt-1">
                    {['Morning', 'Afternoon', 'Evening'].map(b => (
                      <button key={b} type="button" onClick={() => toggleBatch(b)} className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${form.batches.includes(b) ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-600 border-stone-200'}`}>{b}</button>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-stone-500 mb-1 uppercase">Description</label>
                  <textarea value={form.desc} onChange={(e) => setForm({...form, desc: e.target.value})} rows="2" className="w-full p-3 rounded-xl border border-stone-200 outline-none focus:border-rose-500 resize-none" />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button type="submit" className="bg-rose-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-rose-700 shadow-lg">{editingId ? 'Update Course' : 'Save Course'}</button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map(c => (
              <div key={c.id} className={`bg-white rounded-2xl border border-stone-200 p-5 shadow-sm hover:shadow-md transition-shadow ${!c.isActive && 'opacity-50'}`}>
                <div className="flex justify-between items-start mb-3">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${c.tag === 'Beginner' ? 'bg-emerald-50 text-emerald-700' : c.tag === 'Intermediate' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'}`}>{c.tag}</span>
                  <div className="flex gap-1">
                    <button onClick={() => handleEdit(c)} className="p-1.5 bg-stone-100 rounded-lg hover:bg-stone-200 text-stone-500"><Edit2 size={12} /></button>
                    <button onClick={() => setCourses(courses.filter(x => x.id !== c.id))} className="p-1.5 bg-stone-100 rounded-lg hover:bg-red-50 text-stone-500 hover:text-red-600"><Trash2 size={12} /></button>
                  </div>
                </div>
                <h4 className="font-serif font-bold text-stone-900 text-lg mb-1">{c.title}</h4>
                <p className="text-stone-500 text-xs mb-3">{c.desc}</p>
                <div className="bg-stone-50 rounded-xl p-3 space-y-1.5 text-sm">
                  <div className="flex justify-between"><span className="text-stone-500">Monthly</span><span className="font-bold">₹{c.price}/mo</span></div>
                  <div className="flex justify-between bg-rose-50 rounded-lg px-2 py-1"><span className="text-rose-700 text-xs font-bold">1st Month</span><span className="font-bold text-rose-700">₹{c.firstMonth}</span></div>
                  <div className="flex justify-between"><span className="text-stone-500">Duration</span><span className="font-semibold">{c.duration}</span></div>
                  <div className="flex justify-between"><span className="text-stone-500">Batches</span><span className="font-semibold">{c.batches.join(', ')}</span></div>
                </div>
                <p className="text-[10px] text-stone-400 mt-2">{enrollments.filter(e => e.courseId === c.id).length} enrolled</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ENROLLMENTS VIEW */}
      {view === 'enrollments' && (
        <>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h3 className="text-2xl font-serif font-bold text-stone-900">Student Enrollments</h3>
            <select value={enrollFilter} onChange={(e) => setEnrollFilter(e.target.value)} className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm outline-none">
              <option value="All">All Courses</option>
              {courses.map(c => <option key={c.id} value={c.title}>{c.title}</option>)}
            </select>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-stone-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50 text-stone-500 text-xs uppercase tracking-wider border-b border-stone-200">
                  <th className="p-4 font-bold">Student</th>
                  <th className="p-4 font-bold">Phone</th>
                  <th className="p-4 font-bold">Course</th>
                  <th className="p-4 font-bold">Batch</th>
                  <th className="p-4 font-bold">Type</th>
                  <th className="p-4 font-bold">Payment</th>
                  <th className="p-4 font-bold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredEnrollments.map(e => (
                  <tr key={e.id} className="hover:bg-stone-50 transition-colors">
                    <td className="p-4 font-bold text-stone-900 text-sm">{e.studentName}</td>
                    <td className="p-4 text-stone-600 text-sm">{e.phone}</td>
                    <td className="p-4 text-stone-700 text-sm">{e.courseName}</td>
                    <td className="p-4 text-stone-600 text-sm">{e.batch}</td>
                    <td className="p-4"><span className={`px-2 py-1 rounded-full text-[10px] font-bold ${e.type === 'Online' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'}`}>{e.type}</span></td>
                    <td className="p-4">
                      <button onClick={() => handlePaymentToggle(e.id)} className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer ${e.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {e.paymentStatus}
                      </button>
                    </td>
                    <td className="p-4 text-stone-500 text-sm">{e.enrolledDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredEnrollments.length === 0 && <p className="text-center text-stone-400 py-8">No enrollments found.</p>}
        </>
      )}
    </div>
  );
}

export default AdminCourses;
