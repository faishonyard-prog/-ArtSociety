import React, { useState } from 'react';
import { CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';

function Checkout({ cart, total, setCart, setCurrentView, onAddOrder, currentUser }) {
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({ 
    firstName: currentUser ? currentUser.name.split(' ')[0] : '', 
    lastName: currentUser && currentUser.name.split(' ')[1] ? currentUser.name.split(' ')[1] : '', 
    email: currentUser ? currentUser.email : '' 
  });

  const handlePayment = (e) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      onAddOrder({
        customer: `${formData.firstName} ${formData.lastName}`,
        item: cart.length === 1 ? cart[0].name : `${cart.length} Items`,
        amount: total
      });
      setCart([]); 
    }, 2000);
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center animate-fade-in">
         <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
           <CheckCircle size={50} />
         </div>
         <h1 className="text-5xl font-serif font-bold text-stone-900 mb-4">Payment Successful</h1>
         <p className="text-stone-600 text-lg mb-8">Thank you for your order! Your memories are in safe hands. You will receive an email confirmation shortly.</p>
         <button onClick={() => setCurrentView('home')} className="bg-stone-900 text-white px-8 py-3 rounded-full font-bold hover:bg-stone-800">
           Return Home
         </button>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12 animate-fade-in">
      <div>
        <h1 className="text-3xl font-serif font-bold text-stone-900 mb-8">Checkout</h1>
        <form id="checkout-form" onSubmit={handlePayment} className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
            <h3 className="font-bold mb-4 border-b pb-2">Shipping Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <input required type="text" placeholder="First Name" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg outline-none focus:border-rose-500" />
              <input required type="text" placeholder="Last Name" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg outline-none focus:border-rose-500" />
              <input required type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="col-span-2 w-full p-3 bg-stone-50 border border-stone-200 rounded-lg outline-none focus:border-rose-500" />
              <input required type="text" placeholder="Address" className="col-span-2 w-full p-3 bg-stone-50 border border-stone-200 rounded-lg outline-none focus:border-rose-500" />
              <input required type="text" placeholder="City" className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg outline-none focus:border-rose-500" />
              <input required type="text" placeholder="ZIP Code" className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg outline-none focus:border-rose-500" />
            </div>
          </div>
        </form>
      </div>

      <div className="bg-stone-900 p-8 rounded-3xl text-white self-start sticky top-28 shadow-2xl">
        <h3 className="text-xl font-serif font-bold mb-6">Order Summary</h3>
        <div className="space-y-4 mb-6 border-b border-stone-700 pb-6">
          {cart.map(item => (
            <div key={item.cartId} className="flex justify-between items-center">
              <span className="text-stone-300 text-sm">{item.name}</span>
              <span className="font-medium">₹{item.discountPrice || item.price}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-end mb-8">
          <span className="text-stone-400">Total</span>
          <span className="text-4xl font-serif font-bold text-rose-400">₹{total}</span>
        </div>
        
        <button 
          form="checkout-form"
          disabled={processing || cart.length === 0}
          className={`w-full py-4 rounded-xl font-bold flex justify-center items-center gap-2 transition-all ${
            processing ? 'bg-stone-700 text-stone-400 cursor-wait' : 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-900/50'
          }`}
        >
          {processing ? 'Processing Secure Payment...' : `Pay ₹${total} via Razorpay`}
        </button>
        <p className="text-center text-xs text-stone-500 mt-4 flex items-center justify-center gap-1"><ShieldCheck size={12}/> Secure 256-bit SSL Encryption</p>
      </div>
    </div>
  );
}

export default Checkout;
