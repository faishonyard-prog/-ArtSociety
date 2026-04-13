import React from 'react';
import { Instagram, Youtube, MessageCircle, ArrowRight, Lock } from 'lucide-react';
import BrandLogo from '../common/BrandLogo';

function Footer({ setCurrentView, currentUser }) {
  return (
    <footer className="bg-stone-900 text-stone-400 py-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <BrandLogo className="h-16 w-16" />
            <span className="font-serif text-2xl font-bold text-white tracking-tighter">
              Art <span className="text-rose-500 italic font-light">Society</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed">
            Turning cherished memories into timeless, handcrafted art. Every brushstroke tells your story.
          </p>
          <div className="flex space-x-4 pt-2">
            <a href="https://www.instagram.com/art___society?igsh=eTF4ejlyN3huOXZx&utm_source=qr" target="_blank" rel="noreferrer" className="hover:text-rose-400 transition-colors"><Instagram size={20} /></a>
            <a href="https://youtube.com/@art___society02?si=qP5CHryMkTWB-lOL" target="_blank" rel="noreferrer" className="hover:text-rose-400 transition-colors"><Youtube size={20} /></a>
            <a href="mailto:sv963006102@gmail.com" className="hover:text-rose-400 transition-colors"><MessageCircle size={20} /></a>
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-medium mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><button onClick={() => setCurrentView('shop')} className="hover:text-rose-400 transition-colors">Shop Gallery</button></li>
            <li><button onClick={() => setCurrentView('custom')} className="hover:text-rose-400 transition-colors">Commission Art</button></li>
            <li><button onClick={() => setCurrentView('about')} className="hover:text-rose-400 transition-colors">About the Artist</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-4">Customer Care</h4>
          <ul className="space-y-2 text-sm">
            <li><button className="hover:text-rose-400 transition-colors">Shipping & Returns</button></li>
            <li><button className="hover:text-rose-400 transition-colors">FAQ</button></li>
            <li><button onClick={() => setCurrentView('contact')} className="hover:text-rose-400 transition-colors">Contact Us</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-4">Newsletter</h4>
          <p className="text-sm mb-3">Subscribe for exclusive updates and art releases.</p>
          <div className="flex">
            <input type="email" placeholder="Your email" className="bg-stone-800 border-none rounded-l-md px-3 py-2 text-sm text-white w-full focus:ring-1 focus:ring-rose-500 outline-none" />
            <button className="bg-rose-700 hover:bg-rose-600 text-white px-4 py-2 rounded-r-md transition-colors">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-8 mt-8 border-t border-stone-800 text-sm flex justify-between items-center">
        <p>© {new Date().getFullYear()} Art Society. All rights reserved.</p>
        <button 
          onClick={() => setCurrentView(currentUser?.role === 'Admin' ? 'admin' : 'auth')} 
          className="opacity-30 hover:opacity-100 flex items-center gap-1"
        >
          <Lock size={12}/> Admin Portal
        </button>
      </div>
    </footer>
  );
}

export default Footer;
