import React, { useState } from 'react';
import BrandLogo from '../components/common/BrandLogo';

function AuthScreen({ setCurrentUser, setCurrentView, users, setUsers }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleAuth = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // Mock Login Logic
      const user = users.find(u => u.email === formData.email);
      if (user) {
        if (formData.password === 'admin123' || formData.password === 'password') {
          setCurrentUser(user);
          setCurrentView(user.role === 'Admin' ? 'admin' : 'home');
        } else {
          setError('Invalid credentials.');
        }
      } else {
        setError('User not found. Try admin@artsociety.com / admin123');
      }
    } else {
      // Mock Signup Logic
      if (users.find(u => u.email === formData.email)) {
        setError('Email already exists.');
        return;
      }
      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        role: 'Customer',
        joined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      setUsers([...users, newUser]);
      setCurrentUser(newUser);
      setCurrentView('home');
    }
  };

  const handleGoogleAuth = () => {
    // Mock Google OAuth
    const googleUser = { id: 999, name: 'Google User', email: 'user@gmail.com', role: 'Customer', joined: 'Today' };
    setCurrentUser(googleUser);
    setCurrentView('home');
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 animate-fade-in bg-stone-50">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-stone-100 max-w-md w-full">
        <div className="text-center mb-8">
          <BrandLogo className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-3xl font-serif font-bold text-stone-900">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-stone-500 mt-2">{isLogin ? 'Sign in to access your orders and saved items.' : 'Join the Art Society community.'}</p>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm font-medium">{error}</div>}

        <form onSubmit={handleAuth} className="space-y-4 mb-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-1">Full Name</label>
              <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-rose-500" />
            </div>
          )}
          <div>
            <label className="block text-sm font-bold text-stone-700 mb-1">Email Address</label>
            <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-rose-500" />
          </div>
          <div>
            <label className="block text-sm font-bold text-stone-700 mb-1">Password</label>
            <input required type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-rose-500" />
          </div>
          <button type="submit" className="w-full bg-stone-900 text-white font-bold py-3.5 rounded-xl hover:bg-stone-800 transition-colors mt-2">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-stone-200"></div></div>
          <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-stone-500">Or continue with</span></div>
        </div>

        <button onClick={handleGoogleAuth} type="button" className="w-full bg-white border border-stone-200 text-stone-700 font-bold py-3.5 rounded-xl hover:bg-stone-50 transition-colors flex items-center justify-center gap-3">
          <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
          Google
        </button>

        <p className="text-center text-sm text-stone-500 mt-8">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-rose-600 font-bold hover:underline">
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthScreen;
