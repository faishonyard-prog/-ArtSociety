import React, { useState } from 'react';
import { MessageCircle, Instagram, Youtube, CheckCircle } from 'lucide-react';

function Contact() {
  const [sent, setSent] = useState(false);
  
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 animate-fade-in grid md:grid-cols-2 gap-16">
      <div>
        <h1 className="text-5xl font-serif font-bold text-stone-900 mb-6">Let's Connect</h1>
        <p className="text-stone-600 text-lg mb-8">Have a question about a custom order, or just want to say hi? I'd love to hear from you.</p>
        
        <div className="space-y-6 text-stone-700">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center"><MessageCircle /></div>
            <div><p className="font-bold">Email</p><p><a href="mailto:sv963006102@gmail.com" className="hover:text-rose-600 transition-colors">sv963006102@gmail.com</a></p></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center"><Instagram /></div>
            <div><p className="font-bold">Instagram</p><p><a href="https://www.instagram.com/art___society?igsh=eTF4ejlyN3huOXZx&utm_source=qr" target="_blank" rel="noreferrer" className="hover:text-rose-600 transition-colors">@art___society</a></p></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center"><Youtube /></div>
            <div><p className="font-bold">YouTube</p><p><a href="https://youtube.com/@art___society02?si=qP5CHryMkTWB-lOL" target="_blank" rel="noreferrer" className="hover:text-rose-600 transition-colors">@art___society02</a></p></div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-stone-100">
        {sent ? (
           <div className="text-center py-16 animate-fade-in">
             <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
             <h3 className="text-2xl font-serif font-bold mb-2">Message Sent!</h3>
             <p className="text-stone-600">I'll get back to you within 24 hours.</p>
           </div>
        ) : (
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">Name</label>
              <input type="text" required className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">Email</label>
              <input type="email" required className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">Message</label>
              <textarea required rows="4" className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none resize-none"></textarea>
            </div>
            <button type="submit" className="w-full bg-stone-900 text-white font-bold py-4 rounded-xl hover:bg-rose-700 transition-colors">
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Contact;
