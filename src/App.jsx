import React, { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';

// Layout & UI Components
import TopBanner from './components/layout/TopBanner';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/ui/WhatsAppButton';
import CartDrawer from './components/ui/CartDrawer';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import CustomOrder from './pages/CustomOrder';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import AuthScreen from './pages/AuthScreen';
import AdminDashboard from './pages/AdminDashboard';
import Academy from './pages/Academy';
import NgoSocietyArt from './pages/NgoSocietyArt';
import UserDashboard from './pages/UserDashboard';

// Supabase
import { supabase } from './lib/supabase';

import bgSwirl from './assets/bg-swirl.png';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Auth State
  const [currentUser, setCurrentUser] = useState(null);

  // Global State for Admin Management
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [affiliates, setAffiliates] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState([]);
  const [configError, setConfigError] = useState(false);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  // Fetch from Supabase
  useEffect(() => {
    const fetchSupabaseData = async () => {
      // Check if supabase is initialized correctly (robust client will return data: null)
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        setConfigError(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const [
          { data: productsData },
          { data: blogsData },
          { data: ordersData },
          { data: usersData },
          { data: coursesData },
          { data: enrollmentsData },
          { data: affiliatesData },
          { data: galleryData },
          { data: categoriesData }
        ] = await Promise.all([
          supabase.from('products').select('*').order('id', { ascending: true }),
          supabase.from('blogs').select('*').order('id', { ascending: true }),
          supabase.from('orders').select('*').order('date', { ascending: false }),
          supabase.from('users').select('*').order('id', { ascending: true }),
          supabase.from('courses').select('*').order('id', { ascending: true }),
          supabase.from('enrollments').select('*').order('id', { ascending: true }),
          supabase.from('affiliates').select('*').order('id', { ascending: true }),
          supabase.from('gallery').select('*').order('order', { ascending: true }),
          supabase.from('categories').select('*').order('name', { ascending: true })
        ]);

        if (productsData) setProducts(productsData.map(p => ({ ...p, discountPrice: p.discount_price, isVisible: p.is_visible, isAffiliate: p.is_affiliate, affiliateUrl: p.affiliate_url })));
        if (blogsData) setBlogs(blogsData);
        if (ordersData) setOrders(ordersData);
        if (usersData) setUsers(usersData);
        if (coursesData) setCourses(coursesData.map(c => ({...c, firstMonth: c.first_month, isActive: c.is_active })));
        if (enrollmentsData) setEnrollments(enrollmentsData.map(e => ({...e, studentName: e.student_name, courseId: e.course_id, courseName: e.course_name, paymentStatus: e.payment_status, enrolledDate: e.enrolled_date })));
        if (affiliatesData) setAffiliates(affiliatesData.map(a => ({...a, isActive: a.is_active })));
        if (galleryData) setGallery(galleryData);
        if (categoriesData) setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching Supabase data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSupabaseData();
  }, []);

  const refreshData = async (table) => {
    const { data } = await supabase.from(table).select('*').order(table === 'gallery' ? 'order' : 'id', { ascending: true });
    if (!data) return;
    
    switch(table) {
      case 'products': 
        setProducts(data.map(p => ({ ...p, discountPrice: p.discount_price, isVisible: p.is_visible, isAffiliate: p.is_affiliate, affiliateUrl: p.affiliate_url })));
        break;
      case 'blogs': setBlogs(data); break;
      case 'orders': setOrders(data); break;
      case 'users': setUsers(data); break;
      case 'courses': setCourses(data.map(c => ({...c, firstMonth: c.first_month, isActive: c.is_active }))); break;
      case 'enrollments': setEnrollments(data.map(e => ({...e, studentName: e.student_name, courseId: e.course_id, courseName: e.course_name, paymentStatus: e.payment_status, enrolledDate: e.enrolled_date }))); break;
      case 'affiliates': setAffiliates(data.map(a => ({...a, isActive: a.is_active }))); break;
      case 'gallery': setGallery(data); break;
      case 'categories': setCategories(data); break;
    }
  };

  const dbUpdate = async (table, id, data, idField = 'id') => {
    try {
      const { error } = await supabase.from(table).update(data).eq(idField, id);
      if (error) throw error;
      await refreshData(table);
      showToast(`${table.slice(0, -1)} updated successfully`);
      return true;
    } catch (e) {
      showToast(e.message, 'error');
      return false;
    }
  };

  const dbInsert = async (table, data) => {
    try {
      const { error } = await supabase.from(table).insert([data]);
      if (error) throw error;
      await refreshData(table);
      showToast(`${table.slice(0, -1)} added successfully`);
      return true;
    } catch (e) {
      showToast(e.message, 'error');
      return false;
    }
  };

  const dbDelete = async (table, id, idField = 'id') => {
    try {
      const { error } = await supabase.from(table).delete().eq(idField, id);
      if (error) throw error;
      await refreshData(table);
      showToast(`${table.slice(0, -1)} deleted`);
      return true;
    } catch (e) {
      showToast(e.message, 'error');
      return false;
    }
  };

  // Inject Branding Meta Tags & Favicon dynamically into the Head
  useEffect(() => {
    const setMetaTag = (property, content, isName = false) => {
      const attr = isName ? 'name' : 'property';
      let tag = document.querySelector(`meta[${attr}="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    let favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      document.head.appendChild(favicon);
    }
    favicon.href = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M20 80L50 20L80 80" stroke="%231C1917" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><path d="M40 55H60" stroke="%23E11D48" stroke-width="6" stroke-linecap="round"/><path d="M30 70C30 70 45 85 70 70C95 55 80 40 80 40" stroke="%231C1917" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    setMetaTag('og:title', 'Art Society | Intelligent Handcrafted Art');
    setMetaTag('og:description', 'Turn your memories into timeless art with premium digital intelligence and handcrafted expertise.');
    setMetaTag('og:image', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=630&q=80');
    setMetaTag('twitter:card', 'summary_large_image');
  }, []);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const addToCart = (item) => {
    setCart([...cart, { ...item, cartId: Date.now() }]);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const handleAddOrder = (orderData) => {
    setOrders([{ id: `#${1042 + orders.length}`, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), status: 'Pending', ...orderData }, ...orders]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.discountPrice || item.price), 0);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-stone-800 font-sans selection:bg-rose-200 relative">
      {/* Global Aesthetic Background Texture */}
      <div 
        className="fixed inset-0 opacity-[0.12] pointer-events-none z-0 grayscale-[0.2]"
        style={{ 
          backgroundImage: `url(${bgSwirl})`,
          backgroundSize: '800px',
          backgroundRepeat: 'repeat',
          mixBlendMode: 'multiply'
        }}
      />

      <div className="relative z-10">
        <TopBanner setCurrentView={setCurrentView} />
        <Navbar 
          currentView={currentView} 
          setCurrentView={setCurrentView} 
          cartCount={cart.length} 
          setIsCartOpen={setIsCartOpen} 
          currentUser={currentUser}
          onLogout={() => { setCurrentUser(null); setCurrentView('home'); showToast('Successfully logged out'); }}
        />

        {configError ? (
          <div className="flex items-center justify-center min-h-[80vh] flex-col text-center px-6">
            <div className="bg-rose-50 text-rose-600 p-6 rounded-3xl border border-rose-100 max-w-md shadow-xl">
              <h2 className="text-3xl font-serif font-bold mb-4">Configuration Required</h2>
              <p className="text-stone-600 mb-6 leading-relaxed">
                Supabase environment variables are missing! The website cannot load data without a backend connection.
              </p>
              <div className="bg-white p-4 rounded-xl text-left text-xs font-mono border border-stone-200 mb-6 overflow-auto">
                VITE_SUPABASE_URL=...<br/>
                VITE_SUPABASE_ANON_KEY=...
              </div>
              <p className="text-xs text-rose-400 font-bold uppercase tracking-widest px-4">
                Please set these in your Vercel dashboard and redeploy.
              </p>
            </div>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-rose-600"></div>
          </div>
        ) : (
          <main className="min-h-[80vh]">
            {currentView === 'home' && <Home setCurrentView={setCurrentView} products={products.filter(p => p.isVisible)} setSelectedProduct={setSelectedProduct} />}
          {currentView === 'shop' && <Shop addToCart={addToCart} products={products.filter(p => p.isVisible)} setCurrentView={setCurrentView} setSelectedProduct={setSelectedProduct} />}
          {currentView === 'academy' && <Academy />}
          {currentView === 'product' && <ProductDetail product={selectedProduct} setCurrentView={setCurrentView} addToCart={addToCart} />}
          {currentView === 'custom' && <CustomOrder addToCart={addToCart} />}
          {currentView === 'about' && <About />}
          {currentView === 'blog' && <Blog blogs={blogs} setBlogs={setBlogs} currentUser={currentUser} setCurrentView={setCurrentView} />}
          {currentView === 'contact' && <Contact />}
          {currentView === 'ngosocietyart' && <NgoSocietyArt setCurrentView={setCurrentView} />}
          {currentView === 'checkout' && <Checkout cart={cart} total={cartTotal} setCart={setCart} setCurrentView={setCurrentView} onAddOrder={handleAddOrder} currentUser={currentUser} />}
          
          {/* User Dashboard */}
          {currentView === 'profile' && (
            currentUser ? (
              <UserDashboard 
                currentUser={currentUser} 
                orders={orders} 
                enrollments={enrollments} 
                setCurrentView={setCurrentView}
              />
            ) : (
              <div className="flex items-center justify-center min-h-[60vh]">
                <button onClick={() => setCurrentView('auth')} className="bg-rose-600 text-white px-8 py-3 rounded-xl font-bold">Please Login to view Profile</button>
              </div>
            )
          )}
          
          {/* Auth Route */}
          {currentView === 'auth' && (
            <AuthScreen 
              setCurrentUser={setCurrentUser} 
              setCurrentView={setCurrentView} 
              users={users} 
              setUsers={setUsers}
            />
          )}

          {/* Secure Admin Route */}
          {currentView === 'admin' && (
            currentUser?.role === 'Admin' ? (
              <AdminDashboard 
                products={products} setProducts={setProducts}
                orders={orders} setOrders={setOrders}
                users={users} setUsers={setUsers}
                courses={courses} setCourses={setCourses}
                enrollments={enrollments} setEnrollments={setEnrollments}
                affiliates={affiliates} setAffiliates={setAffiliates}
                gallery={gallery} setGallery={setGallery}
                categories={categories} setCategories={setCategories}
                currentUser={currentUser}
                onLogout={() => { setCurrentUser(null); setCurrentView('home'); }}
                db={{ update: dbUpdate, insert: dbInsert, delete: dbDelete, refresh: refreshData }}
              />
            ) : (
              <div className="flex items-center justify-center min-h-[60vh] flex-col text-center px-4">
                <Lock size={64} className="text-stone-300 mb-6" />
                <h2 className="text-3xl font-serif font-bold text-stone-900 mb-2">Access Denied</h2>
                <p className="text-stone-500 mb-6">You must be an administrator to view this portal.</p>
                <button onClick={() => setCurrentView('auth')} className="bg-rose-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-rose-700">
                  Login as Admin
                </button>
              </div>
            )
          )}
        </main>
        )}

        <Footer setCurrentView={setCurrentView} currentUser={currentUser} />
        <WhatsAppButton />
      </div>
      
      {/* Cart Drawer */}
      {isCartOpen && (
        <CartDrawer 
          cart={cart} 
          total={cartTotal} 
          onClose={() => setIsCartOpen(false)} 
          onRemove={removeFromCart}
          onCheckout={() => {
            setIsCartOpen(false);
            setCurrentView('checkout');
          }}
        />
      )}

      {/* Toast Notifications */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        {toasts.map(t => (
          <div key={t.id} className={`px-6 py-4 rounded-2xl shadow-2xl text-white font-bold text-sm animate-fade-in-up flex items-center gap-3 border pointer-events-auto ${
            t.type === 'success' ? 'bg-stone-900 border-stone-800' : 'bg-rose-600 border-rose-500'
          }`}>
            <div className={`w-2 h-2 rounded-full ${t.type === 'success' ? 'bg-green-500' : 'bg-white'}`}></div>
            {t.message}
          </div>
        ))}
      </div>
    </div>
  );
}
