import React, { useState } from 'react';

function Shop({ addToCart, products, setCurrentView, setSelectedProduct }) {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Artist Essentials', 'Resin', 'Jewelry', 'Painting', 'Handmade'];

  const filteredProducts = filter === 'All' ? products : products.filter(p => p.category === filter);

  return (
    <div className="pt-8 pb-24 px-6 max-w-7xl mx-auto animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">Shop Gallery</h1>
        <p className="text-stone-600 max-w-2xl mx-auto">Explore our collection of ready-to-ship handcrafted art pieces. Each item is unique and made with meticulous attention to detail.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              filter === cat ? 'bg-stone-900 text-white shadow-md' : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <div 
            key={product.id} 
            onClick={() => { setSelectedProduct(product); setCurrentView('product'); }}
            className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-stone-100 cursor-pointer"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
              <img src={product.img} alt={product.name} className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
              {product.discountPrice && (
                <div className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">SALE</div>
              )}
              <button 
                onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 w-11/12 bg-white/95 backdrop-blur text-stone-900 font-medium py-3 rounded-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:bg-rose-600 hover:text-white"
              >
                Add to Cart
              </button>
            </div>
            <div className="p-5 flex-grow flex flex-col justify-between">
              <div>
                <span className="text-xs text-rose-600 font-bold uppercase tracking-wider">{product.category}</span>
                <h3 className="text-lg font-serif font-bold text-stone-900 mt-1 mb-2 leading-tight">{product.name}</h3>
              </div>
              <div className="flex items-center gap-2">
                {product.discountPrice ? (
                  <>
                    <span className="text-rose-600 font-bold">₹{product.discountPrice}</span>
                    <span className="text-stone-400 line-through text-sm">₹{product.price}</span>
                  </>
                ) : (
                  <span className="text-stone-600 font-medium">₹{product.price}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;
