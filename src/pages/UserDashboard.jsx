import React from 'react';
import { Package, GraduationCap, Clock, CheckCircle, ArrowRight, User, Mail } from 'lucide-react';

function UserDashboard({ currentUser, orders, enrollments, setCurrentView }) {
  // Filter data for the current user
  const userOrders = orders.filter(o => o.email === currentUser.email || o.customer === currentUser.name);
  const userEnrollments = enrollments.filter(e => e.email === currentUser.email || e.student_name === currentUser.name);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Profile Sidebar */}
        <div className="lg:col-span-1 border-stone-200">
          <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm sticky top-28">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center text-rose-600 mb-4 border-2 border-rose-100">
                <User size={48} />
              </div>
              <h2 className="text-2xl font-serif font-bold text-stone-900">{currentUser.name}</h2>
              <p className="text-stone-500 flex items-center gap-2 mt-1 justify-center">
                <Mail size={14} /> {currentUser.email}
              </p>
              <span className="mt-4 px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold rounded-full uppercase tracking-widest border border-stone-200">
                {currentUser.role} Account
              </span>
            </div>

            <div className="space-y-4 pt-4 border-t border-stone-100">
              <div className="flex justify-between items-center text-sm">
                <span className="text-stone-500">Member Since</span>
                <span className="font-bold">April 2024</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-stone-500">Orders placed</span>
                <span className="font-bold">{userOrders.length}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-stone-500">Active Enrollments</span>
                <span className="font-bold">{userEnrollments.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Recent Orders Section */}
          <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2">
                <Package className="text-rose-600" size={24} /> My Recent Orders
              </h3>
              <button 
                onClick={() => setCurrentView('shop')}
                className="text-stone-500 hover:text-rose-600 text-sm font-bold flex items-center gap-1 transition-colors"
               >
                Shop More <ArrowRight size={14} />
              </button>
            </div>

            {userOrders.length > 0 ? (
              <div className="space-y-4">
                {userOrders.map((order, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row justify-between md:items-center p-4 rounded-2xl bg-stone-50 border border-stone-100 hover:border-stone-200 transition-colors">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-stone-900">{order.id}</span>
                        <span className="text-xs text-stone-400 font-medium">• {order.date}</span>
                      </div>
                      <p className="text-sm text-stone-600">{order.item}</p>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-6 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-stone-200">
                      <div className="text-right">
                        <p className="font-bold text-stone-900">₹{order.amount.toLocaleString()}</p>
                        <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Total Amount</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                <Package className="mx-auto text-stone-300 mb-4" size={48} />
                <p className="text-stone-500 font-medium">You haven't placed any orders yet.</p>
                <button onClick={() => setCurrentView('shop')} className="mt-4 text-rose-600 font-bold hover:underline">Explore the Shop</button>
              </div>
            )}
          </div>

          {/* Active Enrollments Section */}
          <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2">
                <GraduationCap className="text-rose-600" size={24} /> Academy Enrollments
              </h3>
              <button 
                onClick={() => setCurrentView('academy')}
                className="text-stone-500 hover:text-rose-600 text-sm font-bold flex items-center gap-1 transition-colors"
               >
                Browse Academy <ArrowRight size={14} />
              </button>
            </div>

            {userEnrollments.length > 0 ? (
              <div className="space-y-4">
                {userEnrollments.map((enroll, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-stone-50 border border-stone-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex gap-4 items-start">
                      <div className="bg-rose-100 text-rose-600 p-3 rounded-2xl">
                        <Clock size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-stone-900">{enroll.courseName}</h4>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                          <span className="text-xs text-stone-500 flex items-center gap-1"><Clock size={12}/> {enroll.batch} Batch</span>
                          <span className="text-xs text-stone-500 flex items-center gap-1 font-medium">{enroll.enrolledDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        enroll.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-rose-50 text-rose-600 animate-pulse'
                      }`}>
                        {enroll.paymentStatus === 'Paid' ? <CheckCircle size={12}/> : <Clock size={12}/>}
                        Payment: {enroll.paymentStatus}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                <GraduationCap className="mx-auto text-stone-300 mb-4" size={48} />
                <p className="text-stone-500 font-medium">No active course enrollments.</p>
                <button onClick={() => setCurrentView('academy')} className="mt-4 text-rose-600 font-bold hover:underline">Start Learning</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
