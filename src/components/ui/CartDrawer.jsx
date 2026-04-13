import React from 'react';
import { ShoppingCart, X, Trash2, ArrowRight } from 'lucide-react';

function CartDrawer({ cart, total, onClose, onRemove, onCheckout }) {
  return (
    <>
      <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 animate-fade-in" onClick={onClose}></div>
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300">
        <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50">
          <h2 className="text-2xl font-serif font-bold text-stone-900">Your Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-stone-200 rounded-full transition-colors"><X size={24} /></button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center text-stone-500 py-12 flex flex-col items-center">
              <ShoppingCart size={48} className="text-stone-300 mb-4" />
              <p>Your cart is empty.</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.cartId} className="flex gap-4 items-center">
                <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded-lg border border-stone-200" />
                <div className="flex-grow">
                  <h4 className="font-bold text-stone-800 leading-tight">{item.name}</h4>
                  <p className="text-rose-600 font-medium">₹{item.discountPrice || item.price}</p>
                  {item.custom && <p className="text-xs text-stone-500 mt-1">Custom Commission</p>}
                </div>
                <button onClick={() => onRemove(item.cartId)} className="text-stone-400 hover:text-red-500 p-2"><Trash2 size={18} /></button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 bg-stone-50 border-t border-stone-200">
            <div className="flex justify-between items-center mb-6 text-lg">
              <span className="font-bold text-stone-700">Subtotal</span>
              <span className="font-serif font-bold text-2xl text-stone-900">₹{total}</span>
            </div>
            <button onClick={onCheckout} className="w-full bg-rose-600 hover:bg-rose-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
              Proceed to Checkout <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartDrawer;
