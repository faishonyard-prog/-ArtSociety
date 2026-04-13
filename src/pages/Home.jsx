import React from 'react';
import { ShieldCheck, Heart, Star, Clock, CheckCircle, ArrowRight, ChevronRight, Quote, Instagram } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import { MOCK_TESTIMONIALS } from '../data/mockData';
import bgCircular from '../assets/bg-circular.jpg';

function Home({ setCurrentView, products, setSelectedProduct }) {
  return (
    <div className="animate-fade-in relative">
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=2000" 
            alt="Artist workspace" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-stone-900/40"></div>
        </div>
        
        <div className="relative z-10 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="text-center lg:text-left lg:flex-1">
            <span className="inline-block text-rose-200 font-medium tracking-widest uppercase text-xs sm:text-sm mb-4 bg-rose-900/40 px-3 py-1 rounded-full backdrop-blur-md border border-rose-500/20">Art Society</span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif text-white font-bold mb-6 drop-shadow-lg leading-[1.1]">
              Turn Your Memories <br/> Into <span className="text-rose-300 italic">Timeless Art</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-stone-100 mb-10 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              Handcrafted custom portraits, mesmerizing resin pieces, and bespoke gifts created with passion and soul.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button 
                onClick={() => setCurrentView('custom')}
                className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 rounded-full font-bold transition-all hover:shadow-xl hover:-translate-y-1"
              >
                Start Custom Order
              </button>
              <button 
                onClick={() => setCurrentView('shop')}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full font-bold transition-all"
              >
                Explore Gallery
              </button>
            </div>
          </div>

          <div className="w-full max-w-md lg:w-[400px]">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-rose-500/20 blur-[80px] rounded-full group-hover:bg-rose-500/30 transition-colors"></div>
              <h3 className="text-2xl font-serif font-bold text-white mb-2 relative z-10">Join the Society</h3>
              <p className="text-stone-300 text-sm mb-6 font-light relative z-10">Subscribe for early access to drops and exclusive custom slots.</p>
              <form className="space-y-4 relative z-10" onSubmit={(e) => { e.preventDefault(); alert('Welcome to the Art Society!'); }}>
                <div className="space-y-1">
                  <input type="text" placeholder="Your Name" className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500/50 transition-all text-sm" required />
                </div>
                <div className="space-y-1">
                  <input type="email" placeholder="Email Address" className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500/50 transition-all text-sm" required />
                </div>
                <button type="submit" className="w-full bg-white text-stone-900 py-4 rounded-2xl font-bold hover:bg-rose-500 hover:text-white transition-all transform active:scale-[0.98]">Join Now</button>
                <p className="text-[10px] text-stone-400 text-center uppercase tracking-widest mt-4">Protected by Art Society Privacy</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 border-b border-stone-100 relative z-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center gap-12 md:gap-24 opacity-70">
          <div className="flex flex-col items-center gap-2"><ShieldCheck size={28} className="text-rose-700"/> <span className="text-sm font-medium">100% Satisfaction</span></div>
          <div className="flex flex-col items-center gap-2"><Heart size={28} className="text-rose-700"/> <span className="text-sm font-medium">Handmade with Love</span></div>
          <div className="flex flex-col items-center gap-2"><Star size={28} className="text-rose-700"/> <span className="text-sm font-medium">500+ Happy Clients</span></div>
          <div className="flex flex-col items-center gap-2"><Clock size={28} className="text-rose-700"/> <span className="text-sm font-medium">Timely Delivery</span></div>
        </div>
      </section>

      <section className="py-24 bg-stone-50 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-stone-900 mb-4">From Photo to Masterpiece</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">We breathe life into your flat photographs, turning them into textured, emotional works of art that last generations.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative group rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-stone-900/50 to-transparent z-10 pointer-events-none"></div>
              <div className="flex h-[400px]">
                <div className="w-1/2 relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800" alt="Before" className="absolute inset-0 w-[200%] h-full object-cover max-w-none grayscale opacity-80" />
                  <span className="absolute bottom-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm z-20">Original Photo</span>
                </div>
                <div className="w-1/2 relative overflow-hidden border-l-4 border-rose-500">
                  <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800" alt="After" className="absolute inset-0 w-[200%] h-full object-cover max-w-none -ml-[100%] contrast-125 saturate-150" style={{filter: 'contrast(1.2) saturate(1.4) sepia(0.3)'}} />
                   <span className="absolute bottom-4 right-4 bg-rose-600/90 text-white text-xs px-2 py-1 rounded backdrop-blur-sm z-20">Oil Painting</span>
                </div>
              </div>
            </div>
            <div className="space-y-6 pl-0 md:pl-8">
              <h3 className="text-3xl font-serif font-bold text-stone-800">The Ultimate Personalized Gift</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3"><CheckCircle className="text-rose-600 mt-1 flex-shrink-0" size={20} /><p className="text-stone-600">Perfect for anniversaries, birthdays, or memorial pieces.</p></li>
                <li className="flex items-start gap-3"><CheckCircle className="text-rose-600 mt-1 flex-shrink-0" size={20} /><p className="text-stone-600">Choose your style: Charcoal, Watercolor, Oil, or Digital Illustration.</p></li>
                <li className="flex items-start gap-3"><CheckCircle className="text-rose-600 mt-1 flex-shrink-0" size={20} /><p className="text-stone-600">Preview the sketch before the final color application.</p></li>
              </ul>
              <button onClick={() => setCurrentView('custom')} className="mt-4 flex items-center gap-2 text-rose-700 font-bold hover:text-rose-800 group">Commission Your Piece <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></button>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section with Aesthetic Circular Background */}
      {/* Philosophy Section with Aesthetic Circular Background */}
      <section className="py-20 relative overflow-hidden z-10">
        <div className="absolute inset-0 z-0">
          <img 
            src={bgCircular} 
            alt="Background texture" 
            className="w-full h-full object-cover opacity-20 grayscale brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6">The Philosophy of Art</h2>
          <p className="text-xl text-stone-600 italic leading-relaxed font-light">"Art is not what you see, but what you make others see. At Art Society, we don't just create images; we capture the essence of a soul."</p>
          <div className="mt-8 w-24 h-px bg-rose-300 mx-auto"></div>
        </div>
      </section>

      {/* Modern Artwork Slideshow Grid */}
      <section className="py-12 bg-white overflow-hidden relative border-y border-stone-200">
        <div className="absolute inset-0 z-0 opacity-100">
          <img src="/images/bg-slider-white.png" alt="Artistic Texture" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]"></div>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes slideLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          @keyframes slideRight { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
          .animate-slide-left { animation: slideLeft 40s linear infinite; display: flex; width: max-content; }
          .animate-slide-right { animation: slideRight 40s linear infinite; display: flex; width: max-content; }
          .animate-slide-left:hover, .animate-slide-right:hover { animation-play-state: paused; }
        `}} />
        
        <div className="w-full flex justify-center mb-8 relative z-10">
          <span className="bg-stone-900/80 backdrop-blur-md text-white font-bold tracking-widest uppercase text-[10px] px-6 py-1.5 rounded-full shadow-lg border border-white/20">Inspiring Creations</span>
        </div>

        <div className="flex flex-col gap-4 transform rotate-[-1.5deg] scale-105 opacity-90 transition-all duration-700 hover:opacity-100 hover:rotate-[0deg] hover:scale-100 relative z-10">
          {/* Row 1 - Left */}
          <div className="animate-slide-left gap-4 px-2">
            {[
              "/images/products/couple_calendar.jpg",
              "/images/products/crochet_sunflower_bouquet.jpg",
              "/images/products/resin_floral_bracelet.jpg",
              "/images/products/resin_nail_coaster.jpg",
              "/images/products/couple_resin_frame.jpg",
              "/images/products/couple_calendar.jpg",
              "/images/products/crochet_sunflower_bouquet.jpg",
              "/images/products/resin_floral_bracelet.jpg",
              "/images/products/resin_nail_coaster.jpg",
              "/images/products/couple_resin_frame.jpg"
            ].map((url, idx) => (
              <div key={`r1-${idx}`} className={`w-56 sm:w-64 rounded-2xl overflow-hidden shadow-xl flex-shrink-0 cursor-pointer ${idx % 2 === 0 ? 'h-36' : 'h-48'} group border border-stone-200/50 bg-white/40`}>
                <img src={url} alt="Gallery Art" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>

          {/* Row 2 - Right */}
          <div className="animate-slide-right gap-4 px-2 ml-[-80px]">
            {[
              "/images/products/couple_wall_hanging.jpg",
              "/images/products/rose_petal_earrings.jpg",
              "/images/products/heart_pendant_necklace.jpg",
              "/images/products/couple_resin_frame2.jpg",
              "/images/products/paintbrushes.png",
              "/images/products/couple_wall_hanging.jpg",
              "/images/products/rose_petal_earrings.jpg",
              "/images/products/heart_pendant_necklace.jpg",
              "/images/products/couple_resin_frame2.jpg",
              "/images/products/paintbrushes.png"
            ].map((url, idx) => (
              <div key={`r2-${idx}`} className={`w-56 sm:w-64 rounded-2xl overflow-hidden shadow-xl flex-shrink-0 cursor-pointer ${idx % 2 === 0 ? 'h-48' : 'h-36'} group border border-stone-200/50 bg-white/40`}>
                <img src={url} alt="Gallery Art" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-serif font-bold text-stone-900 mb-2">Featured Artworks</h2>
              <p className="text-stone-500">Ready to ship handmade creations.</p>
            </div>
            <button onClick={() => setCurrentView('shop')} className="hidden sm:flex items-center gap-1 text-stone-500 hover:text-stone-900 font-medium">View All <ChevronRight size={16}/></button>
          </div>
          
          <div className="flex flex-col gap-6">
            {/* Grid Style 1: Asymmetrical Showcase (3 Items) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[400px]">
              {products.slice(0, 3).map((product, idx) => (
                <div 
                  key={product.id} 
                  onClick={() => { setSelectedProduct(product); setCurrentView('product'); }}
                  className={`${idx === 0 ? 'md:col-span-6 lg:col-span-8' : 'md:col-span-3 lg:col-span-2'} relative group rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 h-64 md:h-full`}
                >
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <span className="text-rose-300 text-[10px] uppercase tracking-widest font-bold mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{product.category}</span>
                    <h3 className={`font-serif font-bold text-white ${idx === 0 ? 'text-2xl md:text-3xl' : 'text-lg'} mb-1`}>{product.name}</h3>
                    <div className="flex items-center gap-3">
                      <span className="text-white font-medium text-sm">₹{product.discountPrice || product.price}</span>
                      {product.discountPrice && <span className="text-white/50 line-through text-xs">₹{product.price}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Grid Style 2: Compact Gallery (4 Items) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.slice(3, 7).map((product) => (
                <div 
                  key={product.id} 
                  onClick={() => { setSelectedProduct(product); setCurrentView('product'); }}
                  className="group cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-md mb-4 bg-stone-100">
                    <img src={product.img} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-sm text-stone-900 text-xs font-bold px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
                        Quick View
                      </div>
                    </div>
                    {product.discountPrice && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider shadow-sm">Sale</span>
                    )}
                  </div>
                  <div className="px-1">
                    <span className="text-stone-400 text-[10px] uppercase tracking-wider font-semibold mb-1 block">{product.category}</span>
                    <h3 className="font-serif font-bold text-stone-900 text-base mb-1 truncate group-hover:text-rose-600 transition-colors">{product.name}</h3>
                    <div className="flex items-center gap-2">
                       <span className="text-stone-900 font-semibold text-sm">₹{product.discountPrice || product.price}</span>
                       {product.discountPrice && <span className="text-stone-400 line-through text-xs">₹{product.price}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="sm:hidden mt-6 text-center">
              <button onClick={() => setCurrentView('shop')} className="w-full py-4 border-2 border-stone-200 rounded-2xl text-stone-700 font-bold hover:bg-stone-50 transition-colors">View All Artworks</button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-stone-900 text-stone-50 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Quote className="text-rose-500/50 mx-auto mb-4" size={32} />
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">Stories of Joy</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {MOCK_TESTIMONIALS.map(testimonial => (
              <div key={testimonial.id} className="bg-stone-800 p-5 rounded-2xl text-left border border-stone-700">
                <div className="flex gap-1 mb-3 text-rose-400">
                  {[...Array(testimonial.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-stone-300 italic mb-4 text-sm">"{testimonial.text}"</p>
                <p className="font-medium text-white text-sm">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-stone-50 overflow-hidden relative z-10">
        <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
          <a href="https://www.instagram.com/art___society?igsh=eTF4ejlyN3huOXZx&utm_source=qr" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-2xl font-serif font-bold hover:text-rose-700 transition-colors">
            <Instagram className="text-rose-600" /> @art___society
          </a>
          <p className="text-stone-500 mt-2">Follow our behind-the-scenes journey.</p>
        </div>
        <div className="flex gap-4 px-4 overflow-x-auto pb-8 snap-x">
           {[
             "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&q=80",
             "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=400&q=80",
             "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80",
             "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&q=80&w=400&q=80",
             "https://images.unsplash.com/photo-1537832816519-689ad163238b?auto=format&fit=crop&q=80&w=400&q=80",
             "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=400&q=80"
           ].map((imgSrc, i) => (
             <div key={i} className="min-w-[250px] aspect-square rounded-xl overflow-hidden relative group cursor-pointer snap-center">
               <img src={imgSrc} alt={`Instagram post ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <Heart className="text-white" fill="white" size={32} />
               </div>
             </div>
           ))}
        </div>
      </section>

      {/* Featured NGO Section */}
      <section className="relative z-10 overflow-hidden border-t border-rose-900/20">
        <div className="absolute inset-0 z-0">
           <img 
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" 
              alt="SocietyArt NGO Children"
              className="w-full h-full object-cover opacity-80"
           />
           <div className="absolute inset-0 bg-stone-900/80 mix-blend-multiply"></div>
           <div className="absolute inset-0 bg-gradient-to-r from-rose-900/60 to-stone-900/80"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6 min-h-[140px]">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block bg-rose-600/30 text-rose-100 border border-rose-500/30 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-full mb-3 backdrop-blur-sm">
              SocietyArt Initiative
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2 leading-tight">
              Art that <span className="text-rose-300 italic">Empowers</span>
            </h2>
            <p className="text-stone-300 block max-w-xl mx-auto md:mx-0 text-sm leading-relaxed font-light">
              We are dedicated to bringing education, skill development, and hope to underprivileged children. Join us in coloring their futures.
            </p>
          </div>
          <button 
            onClick={() => setCurrentView('ngosocietyart')}
            className="group flex flex-shrink-0 flex-nowrap whitespace-nowrap items-center gap-2 bg-white text-stone-900 px-6 py-3.5 rounded-xl font-bold transition-all hover:bg-rose-50 hover:text-rose-700 shadow-xl w-full md:w-auto justify-center"
          >
            <Heart className="w-4 h-4 text-rose-500 group-hover:scale-110 transition-transform" fill="currentColor" />
            Discover SocietyArt
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
