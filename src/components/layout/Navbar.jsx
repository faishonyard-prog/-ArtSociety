import React, { useState } from 'react';
import { ShoppingCart, Menu, X, User, LogOut, LayoutDashboard, History, ChevronDown } from 'lucide-react';
import BrandLogo from '../common/BrandLogo';

function Navbar({ currentView, setCurrentView, cartCount, setIsCartOpen, currentUser, onLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'academy', label: 'Art Classes' },
    { id: 'shop', label: 'Shop Gallery' },
    { id: 'custom', label: 'Custom Art' },
    { id: 'ngosocietyart', label: 'NGO-SocietyArt' },
    { id: 'about', label: 'Meet Sakshi' },
    { id: 'blog', label: 'Journal' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer gap-4 group"
            onClick={() => setCurrentView('home')}
          >
            <BrandLogo className="h-16 w-16 transform group-hover:scale-105 transition-transform shadow-md border-2 border-stone-200" />
            <span className="font-serif text-3xl font-bold tracking-tighter text-stone-900 hidden sm:block">
              Art <span className="text-rose-700 italic font-light">Society</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setCurrentView(link.id)}
                className={`text-sm font-medium transition-colors hover:text-rose-700 ${
                  currentView === link.id ? 'text-rose-700 border-b-2 border-rose-700' : 'text-stone-600'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Icons & Auth */}
          <div className="flex items-center space-x-4 md:space-x-5">
            {currentUser ? (
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="hidden md:flex items-center gap-2 text-sm font-bold text-stone-700 hover:text-rose-600 bg-stone-100 px-3 py-1.5 rounded-full transition-all hover:bg-white hover:shadow-sm border border-transparent hover:border-stone-200"
                >
                  <div className="w-6 h-6 bg-rose-100 rounded-full flex items-center justify-center text-rose-600">
                    <User size={14} />
                  </div>
                  {currentUser.name.split(' ')[0]}
                  <ChevronDown size={14} className={`transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* User Dropdown Desktop */}
                {isUserMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsUserMenuOpen(false)}></div>
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-stone-100 py-2 z-20 animate-fade-in-up origin-top-right">
                      <div className="px-4 py-3 border-b border-stone-50 mb-1">
                        <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Signed in as</p>
                        <p className="text-sm font-bold text-stone-900 truncate">{currentUser.email}</p>
                      </div>
                      
                      <button 
                        onClick={() => { setCurrentView('profile'); setIsUserMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 hover:text-rose-600 transition-colors"
                      >
                        <History size={16} /> My Activity
                      </button>

                      {currentUser.role === 'Admin' && (
                        <button 
                          onClick={() => { setCurrentView('admin'); setIsUserMenuOpen(false); }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 hover:text-rose-600 transition-colors"
                        >
                          <LayoutDashboard size={16} /> Admin Panel
                        </button>
                      )}

                      <div className="border-t border-stone-50 mt-1 pt-1">
                        <button 
                          onClick={() => { onLogout(); setIsUserMenuOpen(false); }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors font-bold"
                        >
                          <LogOut size={16} /> Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button 
                onClick={() => setCurrentView('auth')}
                className="hidden md:block text-sm font-bold text-stone-700 hover:text-rose-600 px-4 py-2 rounded-full border border-stone-200 hover:border-rose-300 transition-all"
              >
                Login
              </button>
            )}

            <button 
              onClick={() => setIsCartOpen(true)}
              className="text-stone-600 hover:text-rose-700 relative transition-transform hover:scale-110"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            
            <button className="md:hidden text-stone-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-1 shadow-xl">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => { setCurrentView(link.id); setIsMobileMenuOpen(false); }}
                className="block w-full text-left px-3 py-3 text-base font-medium text-stone-700 hover:bg-stone-50 hover:text-rose-700"
              >
                {link.label}
              </button>
            ))}
            <div className="border-t border-stone-100 mt-2 pt-2">
              <button
                onClick={() => { setCurrentView(currentUser ? (currentUser.role === 'Admin' ? 'admin' : 'home') : 'auth'); setIsMobileMenuOpen(false); }}
                className="block w-full text-left px-3 py-3 text-base font-bold text-rose-600 hover:bg-stone-50"
              >
                {currentUser ? (currentUser.role === 'Admin' ? 'Admin Dashboard' : 'My Account') : 'Login / Signup'}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
